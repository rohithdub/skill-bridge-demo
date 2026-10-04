'use client';

// Speech Service with high-fidelity server TTS pipeline, Blob/Object-URL management, and robust safety fallbacks

export class SpeechService {
  private static synth: SpeechSynthesis | null = null;
  private static recognition: any = null;
  private static isRecognizing: boolean = false;
  private static cachedVoices: SpeechSynthesisVoice[] = [];
  private static isInitialized: boolean = false;
  private static currentAudio: HTMLAudioElement | null = null;
  private static currentObjectUrl: string | null = null;
  private static audioBlobCache: Map<string, Blob> = new Map();
  private static currentRequestId: number = 0;

  private static getSynth(): SpeechSynthesis | null {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (!this.isInitialized) {
        this.isInitialized = true;
        this.cachedVoices = window.speechSynthesis.getVoices();
        window.speechSynthesis.onvoiceschanged = () => {
          this.cachedVoices = window.speechSynthesis.getVoices();
        };
      }
      return window.speechSynthesis;
    }
    return null;
  }

  public static getBcp47Lang(lang: string): string {
    const map: Record<string, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      ta: 'ta-IN',
      te: 'te-IN',
      kn: 'kn-IN',
      ml: 'ml-IN',
      bn: 'bn-IN',
      mr: 'mr-IN',
      gu: 'gu-IN',
      pa: 'pa-IN',
      or: 'or-IN',
      as: 'as-IN',
      ur: 'ur-IN'
    };
    return map[lang.toLowerCase()] || (lang.includes('-') ? lang : `${lang}-IN`);
  }

  /**
   * Stop any ongoing speech playback (both HTML5 Audio and Web Speech Synthesis)
   */
  public static stopSpeaking(): void {
    // Invalidate any ongoing in-flight request
    this.currentRequestId++;

    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {
        // ignore
      }
      this.currentAudio = null;
    }

    if (this.currentObjectUrl) {
      try {
        URL.revokeObjectURL(this.currentObjectUrl);
      } catch (e) {
        // ignore
      }
      this.currentObjectUrl = null;
    }

    const synth = this.getSynth();
    if (synth) {
      try {
        synth.cancel();
      } catch (e) {
        // ignore
      }
    }
  }

  /**
   * Plays speech using the primary server-backed TTS API (/api/tts)
   * Converts the server response into a complete Blob before initiating HTMLAudioElement playback.
   * If server TTS fails or is unsupported for the language, deliberately attempts browser SpeechSynthesis
   * with a strictly matching voice.
   */
  public static async playTtsAudio(
    text: string,
    lang: string,
    onEnd?: () => void,
    onError?: (err: any) => void
  ): Promise<void> {
    if (typeof window === 'undefined') return;

    // 1. Cancel and cleanup any currently playing or in-flight speech
    this.stopSpeaking();
    const requestId = this.currentRequestId;

    const langCode = lang.toLowerCase().split('-')[0];
    const cacheKey = `${langCode}:${text.trim()}`;
    
    let basePath = '';
    if (typeof window !== 'undefined') {
      const pathParts = window.location.pathname.split('/').filter(Boolean);
      if (pathParts.length > 0 && (pathParts[0] === 'skill-bridge-demo' || pathParts[0] === 'skill-bridge')) {
        basePath = `/${pathParts[0]}`;
      }
    }
    const url = `${basePath}/api/tts?lang=${encodeURIComponent(langCode)}&text=${encodeURIComponent(text.trim())}`;

    try {
      let audioBlob: Blob;

      if (this.audioBlobCache.has(cacheKey)) {
        audioBlob = this.audioBlobCache.get(cacheKey)!;
      } else {
        const response = await fetch(url);

        // Check if user switched language while fetch was in flight
        if (requestId !== this.currentRequestId) {
          return;
        }

        if (!response.ok) {
          throw new Error(`TTS API returned status ${response.status} (${response.statusText})`);
        }

        audioBlob = await response.blob();

        if (!audioBlob || audioBlob.size === 0) {
          throw new Error('TTS API returned empty audio payload');
        }

        // Cache up to 40 audio blobs for instant re-play without network
        if (this.audioBlobCache.size < 40) {
          this.audioBlobCache.set(cacheKey, audioBlob);
        }
      }

      // Check race condition again after blob read
      if (requestId !== this.currentRequestId) {
        return;
      }

      const objectUrl = URL.createObjectURL(audioBlob);
      this.currentObjectUrl = objectUrl;

      const audio = new Audio(objectUrl);
      this.currentAudio = audio;

      let finished = false;
      const cleanup = () => {
        if (!finished) {
          finished = true;
          if (this.currentAudio === audio) {
            this.currentAudio = null;
          }
          if (this.currentObjectUrl === objectUrl) {
            try {
              URL.revokeObjectURL(objectUrl);
            } catch (e) {}
            this.currentObjectUrl = null;
          }
          if (onEnd) onEnd();
        }
      };

      audio.onended = () => {
        cleanup();
      };

      audio.onerror = (e) => {
        console.warn(`[SkillBridge TTS Error] Audio element error for language "${langCode}":`, e);
        if (!finished) {
          finished = true;
          if (this.currentAudio === audio) {
            this.currentAudio = null;
          }
          if (this.currentObjectUrl === objectUrl) {
            try {
              URL.revokeObjectURL(objectUrl);
            } catch (err) {}
            this.currentObjectUrl = null;
          }
          if (onError) onError(e);
          else if (onEnd) onEnd();
        }
      };

      // Play audio
      await audio.play();
    } catch (error: any) {
      if (requestId !== this.currentRequestId) {
        return;
      }

      console.warn(`[SkillBridge TTS Error] Primary TTS service unavailable for language "${langCode}" (${error?.message || error}). Trying browser voice fallback...`);

      // 2. Deliberate fallback to browser SpeechSynthesis ONLY if a strictly matching regional voice is installed
      const fellBack = this.tryBrowserSpeechFallback(text, langCode, onEnd, onError);
      if (!fellBack) {
        console.warn(`[SkillBridge TTS] No matching speech voice available for language "${langCode}". UI remains fully interactive.`);
        if (onError) onError(error);
        else if (onEnd) onEnd();
      }
    }
  }

  /**
   * Browser SpeechSynthesis fallback with strict regional language voice matching.
   * Returns true if a genuine matching voice was found and spoken, false otherwise.
   */
  private static tryBrowserSpeechFallback(
    text: string,
    langCode: string,
    onEnd?: () => void,
    onError?: (err: any) => void
  ): boolean {
    const synth = this.getSynth();
    if (!synth) return false;

    const targetBcp47 = this.getBcp47Lang(langCode);
    const langPrefix = langCode.toLowerCase();

    const voices = this.cachedVoices.length > 0 ? this.cachedVoices : synth.getVoices();

    // Look for a voice matching this specific language - NEVER match an English voice for regional languages
    const matchedVoice = voices.find(v => {
      const vLang = v.lang.toLowerCase().replace('_', '-');
      return vLang === targetBcp47.toLowerCase() || vLang.startsWith(langPrefix);
    });

    if (!matchedVoice) {
      return false;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = targetBcp47;
      utterance.voice = matchedVoice;
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      let finished = false;
      const safeEnd = () => {
        if (!finished) {
          finished = true;
          if (onEnd) onEnd();
        }
      };

      utterance.onend = safeEnd;
      utterance.onerror = (e) => {
        console.warn(`[SkillBridge TTS Error] Browser speech synthesis failed for "${langCode}":`, e);
        if (!finished) {
          finished = true;
          if (onError) onError(e);
          else if (onEnd) onEnd();
        }
      };

      // Safety timeout to prevent stuck speaking state
      setTimeout(safeEnd, 8000);

      synth.speak(utterance);
      return true;
    } catch (e) {
      console.warn(`[SkillBridge TTS Error] SpeechSynthesis exception for "${langCode}":`, e);
      return false;
    }
  }

  /**
   * Main speak method: Server TTS is primary; Browser Speech is deliberate fallback.
   */
  public static speak(
    text: string,
    lang: string = 'en-IN',
    onEnd?: () => void,
    onError?: (err: any) => void
  ): void {
    const langPrefix = lang.toLowerCase().split('-')[0];
    this.playTtsAudio(text, langPrefix, onEnd, onError);
  }

  public static startListening(
    lang: string = 'en-IN',
    onResult: (transcript: string) => void,
    onError?: (error: any) => void,
    onEnd?: () => void
  ): boolean {
    if (typeof window === 'undefined') return false;

    const SpeechRecognition = 
      (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return false; // Browser doesn't support Web Speech recognition
    }

    try {
      if (this.recognition && this.isRecognizing) {
        this.recognition.stop();
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = this.getBcp47Lang(lang);

      recognition.onstart = () => {
        this.isRecognizing = true;
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          onResult(transcript.trim());
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        this.isRecognizing = false;
        if (onError) onError(event);
      };

      recognition.onend = () => {
        this.isRecognizing = false;
        if (onEnd) onEnd();
      };

      this.recognition = recognition;
      recognition.start();
      return true;
    } catch (err) {
      console.warn('SpeechRecognition failed to start:', err);
      this.isRecognizing = false;
      if (onError) onError(err);
      return false;
    }
  }

  public static stopListening(): void {
    if (this.recognition && this.isRecognizing) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
      this.isRecognizing = false;
    }
  }

  public static isRecognitionSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
  }
}
