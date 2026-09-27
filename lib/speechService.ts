'use client';

// Speech Service with Web Speech API and robust safety fallbacks

export class SpeechService {
  private static synth: SpeechSynthesis | null = null;
  private static recognition: any = null;
  private static isRecognizing: boolean = false;
  private static cachedVoices: SpeechSynthesisVoice[] = [];
  private static isInitialized: boolean = false;

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

  private static getBcp47Lang(lang: string): string {
    const map: Record<string, string> = {
      en: 'en-IN',
      ta: 'ta-IN',
      hi: 'hi-IN',
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
   * Plays a pleasant chime sound via Web Audio API as audio feedback
   */
  public static playAudioFeedback(type: 'tap' | 'success' | 'greeting' = 'tap'): void {
    if (typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'greeting') {
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.15); // E5
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.3); // G5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
      } else {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      }
    } catch (e) {
      // AudioContext not allowed or unsupported
    }
  }

  private static currentAudio: HTMLAudioElement | null = null;
  private static audioCache: Map<string, HTMLAudioElement> = new Map();

  /**
   * Pre-loads the greeting audio for all 6 languages so taps on the language selector respond instantly
   */
  public static preloadGreetings(): void {
    if (typeof window === 'undefined') return;
    const greetings: Array<{ code: string; text: string }> = [
      { code: 'en', text: 'Welcome to Skill Bridge' },
      { code: 'ta', text: 'ஸ்கில் பிரிட்ஜுக்கு வரவேற்கிறோம்' },
      { code: 'hi', text: 'स्किल ब्रिज में आपका स्वागत है' },
      { code: 'te', text: 'స్కిల్ బ్రిడ్జ్‌కి స్వాగతం' },
      { code: 'kn', text: 'ಸ್ಕಿಲ್ ಬ್ರಿಡ್ಜ್‌ಗೆ ಸುಸ್ವಾಗತ' },
      { code: 'ml', text: 'സ്കിൽ ബ്രിഡ്ജിലേക്ക് സ്വാഗതം' }
    ];

    greetings.forEach(({ code, text }) => {
      const url = `/api/tts?lang=${encodeURIComponent(code)}&text=${encodeURIComponent(text)}`;
      if (!this.audioCache.has(url)) {
        try {
          const audio = new Audio();
          audio.preload = 'auto';
          audio.src = url;
          this.audioCache.set(url, audio);
        } catch (e) {
          // ignore prefetch failure
        }
      }
    });
  }

  /**
   * Plays speech using the server-backed TTS API
   */
  public static playTtsAudio(
    text: string,
    lang: string,
    onEnd?: () => void,
    onError?: (err: any) => void
  ): void {
    if (typeof window === 'undefined') return;

    // Stop any existing speech
    this.stopSpeaking();

    const langCode = lang.toLowerCase().split('-')[0];
    const url = `/api/tts?lang=${encodeURIComponent(langCode)}&text=${encodeURIComponent(text)}`;

    let audio: HTMLAudioElement;
    if (this.audioCache.has(url)) {
      audio = this.audioCache.get(url)!;
      audio.currentTime = 0;
    } else {
      audio = new Audio(url);
      // Cache up to 30 audio objects for quick playback
      if (this.audioCache.size < 30) {
        this.audioCache.set(url, audio);
      }
    }

    this.currentAudio = audio;

    let finished = false;
    const cleanup = () => {
      if (!finished) {
        finished = true;
        if (this.currentAudio === audio) {
          this.currentAudio = null;
        }
        if (onEnd) onEnd();
      }
    };

    audio.onended = () => {
      cleanup();
    };

    audio.onerror = (e) => {
      console.warn('TTS Audio playback error:', e);
      if (!finished) {
        finished = true;
        if (this.currentAudio === audio) {
          this.currentAudio = null;
        }
        this.playAudioFeedback('greeting');
        if (onError) onError(e);
        else if (onEnd) onEnd();
      }
    };

    // Safety timeout in case audio stalls
    const safetyTimer = setTimeout(() => {
      cleanup();
    }, 12000);

    const prevOnEnded = audio.onended;
    audio.onended = (ev) => {
      clearTimeout(safetyTimer);
      if (prevOnEnded) (prevOnEnded as any)(ev);
    };

    audio.play().catch((err) => {
      clearTimeout(safetyTimer);
      console.warn('Audio play request was interrupted or failed:', err);
      // If browser blocked autoplay or failed, provide chime feedback
      this.playAudioFeedback('greeting');
      cleanup();
    });
  }

  public static speak(
    text: string, 
    lang: string = 'en-IN', 
    onEnd?: () => void,
    onError?: (err: any) => void
  ): void {
    this.stopSpeaking();

    const targetLang = this.getBcp47Lang(lang);
    const langPrefix = targetLang.split('-')[0].toLowerCase();

    const synth = this.getSynth();
    const voices = synth ? (this.cachedVoices.length > 0 ? this.cachedVoices : synth.getVoices()) : [];

    // Find if the browser has a native voice installed for this language
    const matchedVoice = voices.find(v => {
      const vLang = v.lang.toLowerCase().replace('_', '-');
      return vLang === targetLang.toLowerCase() || vLang.startsWith(langPrefix);
    });

    // If native voice is not installed (typical for ta, te, kn, ml on Windows Chrome),
    // immediately use our high-fidelity TTS audio service!
    if (!matchedVoice) {
      this.playTtsAudio(text, langPrefix, onEnd, onError);
      return;
    }

    // If a native voice exists (e.g. English, or Hindi if installed in OS/browser)
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = targetLang;
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      utterance.voice = matchedVoice;

      let finished = false;
      const safeEnd = () => {
        if (!finished) {
          finished = true;
          if (onEnd) onEnd();
        }
      };

      utterance.onend = () => {
        safeEnd();
      };

      utterance.onerror = (e) => {
        console.warn('Native speech synthesis error, falling back to TTS Audio:', e);
        // Fall back to server TTS if native synthesis fails
        this.playTtsAudio(text, langPrefix, onEnd, onError);
      };

      // Safety timeout to prevent stuck speaking animation
      setTimeout(() => {
        safeEnd();
      }, 8000);

      synth!.speak(utterance);
    } catch (e) {
      console.warn('SpeechSynthesis error, falling back to TTS Audio:', e);
      this.playTtsAudio(text, langPrefix, onEnd, onError);
    }
  }

  public static stopSpeaking(): void {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {
        // ignore
      }
      this.currentAudio = null;
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
