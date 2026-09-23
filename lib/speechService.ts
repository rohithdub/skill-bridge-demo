'use client';

// Speech Service with Web Speech API and robust safety fallbacks

export class SpeechService {
  private static synth: SpeechSynthesis | null = null;
  private static recognition: any = null;
  private static isRecognizing: boolean = false;

  private static getSynth(): SpeechSynthesis | null {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      return window.speechSynthesis;
    }
    return null;
  }

  public static speak(
    text: string, 
    lang: string = 'en-IN', 
    onEnd?: () => void,
    onError?: (err: any) => void
  ): void {
    const synth = this.getSynth();
    if (!synth) {
      if (onEnd) setTimeout(onEnd, 1200);
      return;
    }

    try {
      synth.cancel(); // Stop any active speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95; // Clear and accessible speed for learners
      utterance.pitch = 1.05; // Friendly, warm tone

      // Try selecting Indian English or localized voice
      const voices = synth.getVoices();
      const preferredVoice = voices.find(v => 
        (lang.startsWith('en') && (v.lang.includes('en-IN') || v.name.includes('India'))) ||
        v.lang.startsWith(lang)
      ) || voices.find(v => v.lang.startsWith('en')) || voices[0];

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onend = () => {
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis error or cancelled:', e);
        if (onEnd) onEnd();
        if (onError) onError(e);
      };

      synth.speak(utterance);
    } catch (e) {
      console.warn('SpeechSynthesis error:', e);
      if (onEnd) setTimeout(onEnd, 1000);
    }
  }

  public static stopSpeaking(): void {
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
      recognition.lang = lang === 'en' ? 'en-IN' : lang;

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
