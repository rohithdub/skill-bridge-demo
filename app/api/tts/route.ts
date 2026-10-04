import { NextRequest, NextResponse } from 'next/server';
import https from 'https';

export const dynamic = 'force-static';

// In-memory cache for synthesized audio buffers (max 150 items)
const audioCache = new Map<string, Buffer>();
const MAX_CACHE_SIZE = 150;

const LANG_MAP: Record<string, string> = {
  en: 'en',
  hi: 'hi',
  ta: 'ta',
  te: 'te',
  kn: 'kn',
  ml: 'ml',
  bn: 'bn',
  mr: 'mr',
  gu: 'gu',
  pa: 'pa',
  or: 'or',
  as: 'as',
  ur: 'ur',
  'en-in': 'en',
  'hi-in': 'hi',
  'ta-in': 'ta',
  'te-in': 'te',
  'kn-in': 'kn',
  'ml-in': 'ml',
  'bn-in': 'bn',
  'mr-in': 'mr',
  'gu-in': 'gu',
  'pa-in': 'pa',
  'or-in': 'or',
  'as-in': 'as',
  'ur-in': 'ur'
};

function splitTextIntoChunks(text: string, maxLen: number = 140): string[] {
  if (text.length <= maxLen) return [text];
  
  const chunks: string[] = [];
  let remaining = text.trim();

  while (remaining.length > 0) {
    if (remaining.length <= maxLen) {
      chunks.push(remaining);
      break;
    }

    let slicePoint = -1;
    // Punctuation priority for clean sentence & clause breaks
    const delimiters = ['. ', '! ', '? ', '। ', '، ', ', ', '; ', '\n', ' '];
    for (const d of delimiters) {
      const idx = remaining.lastIndexOf(d, maxLen);
      if (idx > 20) {
        slicePoint = idx + d.length;
        break;
      }
    }

    if (slicePoint === -1) {
      slicePoint = maxLen;
    }

    const chunk = remaining.slice(0, slicePoint).trim();
    if (chunk) chunks.push(chunk);
    remaining = remaining.slice(slicePoint).trim();
  }

  return chunks;
}

function fetchGoogleTtsChunk(textChunk: string, langCode: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${encodeURIComponent(langCode)}&q=${encodeURIComponent(textChunk)}`;
    
    const req = https.get(
      url,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://translate.google.com/'
        },
        timeout: 6000
      },
      (res) => {
        if (res.statusCode !== 200) {
          return reject(new Error(`Google TTS returned HTTP ${res.statusCode}`));
        }
        const dataChunks: Buffer[] = [];
        res.on('data', (chunk) => dataChunks.push(chunk));
        res.on('end', () => resolve(Buffer.concat(dataChunks)));
      }
    );

    req.on('error', (err) => reject(err));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Google TTS request timed out'));
    });
  });
}

function transliterateOdiaToDevanagari(text: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code === 0x0b35 || code === 0x0b71) {
      result += 'व';
    } else if (code >= 0x0b01 && code <= 0x0b70) {
      result += String.fromCharCode(code - 0x0b00 + 0x0900);
    } else {
      result += text[i];
    }
  }
  return result;
}

export async function GET(request: NextRequest) {
  try {
    let rawText: string | null = null;
    let rawLang: string | null = null;
    try {
      const parsedUrl = new URL(request.url);
      rawText = parsedUrl.searchParams.get('text');
      rawLang = parsedUrl.searchParams.get('lang');
    } catch {
      rawText = null;
      rawLang = null;
    }

    if (!rawText || !rawText.trim()) {
      return NextResponse.json({ status: 'ok', message: 'Skill Bridge TTS Endpoint (Provide ?text=&lang= for synthesis)' }, { status: 200 });
    }

    const normalizedLang = (rawLang || 'en').toLowerCase().trim();
    const langCode = LANG_MAP[normalizedLang] || (normalizedLang.includes('-') ? normalizedLang.split('-')[0] : 'en');
    const cleanText = rawText.trim();

    const cacheKey = `${langCode}:${cleanText}`;
    if (audioCache.has(cacheKey)) {
      const cached = audioCache.get(cacheKey)!;
      return new Response(new Uint8Array(cached), {
        status: 200,
        headers: {
          'Content-Type': 'audio/mpeg',
          'Cache-Control': 'public, max-age=86400, immutable',
          'X-TTS-Source': 'cache'
        }
      });
    }

    // Determine target provider language and text representation
    let providerLang = langCode;
    let textToSynthesize = cleanText;

    if (langCode === 'as') {
      // Assamese uses Bengali-Assamese script; synthesize with authentic eastern Indo-Aryan engine
      providerLang = 'bn';
    } else if (langCode === 'or') {
      // Odia characters mapped to ISCII Brahmic Devanagari phonemes for authentic spoken pronunciation
      providerLang = 'hi';
      textToSynthesize = transliterateOdiaToDevanagari(cleanText);
    }

    const chunks = splitTextIntoChunks(textToSynthesize, 140);
    const chunkBuffers: Buffer[] = [];

    for (const chunk of chunks) {
      const buf = await fetchGoogleTtsChunk(chunk, providerLang);
      chunkBuffers.push(buf);
    }

    const combinedBuffer = Buffer.concat(chunkBuffers);

    // Cache the result
    if (audioCache.size >= MAX_CACHE_SIZE) {
      const firstKey = audioCache.keys().next().value;
      if (firstKey) audioCache.delete(firstKey);
    }
    audioCache.set(cacheKey, combinedBuffer);

    return new Response(new Uint8Array(combinedBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400, immutable',
        'X-TTS-Source': 'engine'
      }
    });
  } catch (error: any) {
    const errMessage = error?.message || 'Unknown error';
    const isUnsupported = errMessage.includes('400') || errMessage.includes('404');
    console.error(`[TTS API Error]: ${errMessage}`);
    return NextResponse.json(
      { 
        error: isUnsupported ? 'TTS audio voice not available for this language' : 'Failed to synthesize speech', 
        details: errMessage 
      },
      { status: isUnsupported ? 501 : 500 }
    );
  }
}
