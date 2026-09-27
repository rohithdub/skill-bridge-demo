import { NextRequest, NextResponse } from 'next/server';
import https from 'https';

export const dynamic = 'force-static';

// In-memory cache for synthesized audio buffers (max 150 items)
const audioCache = new Map<string, Buffer>();
const MAX_CACHE_SIZE = 150;

const LANG_MAP: Record<string, string> = {
  en: 'en',
  ta: 'ta',
  hi: 'hi',
  te: 'te',
  kn: 'kn',
  ml: 'ml',
  'en-in': 'en',
  'ta-in': 'ta',
  'hi-in': 'hi',
  'te-in': 'te',
  'kn-in': 'kn',
  'ml-in': 'ml'
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawText = searchParams.get('text');
    const rawLang = searchParams.get('lang') || 'en';

    if (!rawText || !rawText.trim()) {
      return NextResponse.json({ error: 'Missing text parameter' }, { status: 400 });
    }

    const normalizedLang = rawLang.toLowerCase().trim();
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

    const chunks = splitTextIntoChunks(cleanText, 140);
    const chunkBuffers: Buffer[] = [];

    for (const chunk of chunks) {
      const buf = await fetchGoogleTtsChunk(chunk, langCode);
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
    console.error('TTS API error:', error);
    return NextResponse.json(
      { error: 'Failed to synthesize speech', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
