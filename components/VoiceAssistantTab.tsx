'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { VoiceWaveform } from './VoiceWaveform';
import { SpeechService } from '@/lib/speechService';
import { MockAIService } from '@/lib/mockAI';
import {
  Mic,
  MicOff,
  Send,
  Sparkles,
  Bot,
  User,
  Volume2,
  HelpCircle,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

export const VoiceAssistantTab: React.FC = () => {
  const {
    profile,
    roadmap,
    careerGoal,
    setStage,
    speakText,
    isSpeaking,
    isListening,
    setIsListening
  } = useSkillBridge();

  const [chatLog, setChatLog] = useState<Array<{ id: string; sender: 'ai' | 'user'; text: string }>>([
    {
      id: 'init-1',
      sender: 'ai',
      text: `Hello ${profile.name ? profile.name.split(' ')[0] : 'friend'}! I'm your Skill Bridge AI. How can I help you today?`
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'What should I learn next?',
    'Explain my roadmap',
    'Find opportunities',
    'Change my career goal',
    'Find a skill for me'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog, isThinking]);

  const handleSendPrompt = (prompt: string) => {
    if (!prompt.trim()) return;

    // Add user message
    setChatLog(prev => [
      ...prev,
      {
        id: `u-${Date.now()}`,
        sender: 'user',
        text: prompt
      }
    ]);
    setInputText('');
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      const res = MockAIService.simulateVoiceResponse(prompt, profile, roadmap || undefined);

      setChatLog(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: res.reply
        }
      ]);

      speakText(res.reply);
    }, 900);
  };

  const toggleListening = () => {
    if (isListening) {
      SpeechService.stopListening();
      setIsListening(false);
      return;
    }

    setIsListening(true);
    const started = SpeechService.startListening(
      'en-IN',
      (transcript) => {
        setIsListening(false);
        handleSendPrompt(transcript);
      },
      (err) => {
        setIsListening(false);
        simulateAssistantVoice();
      },
      () => {
        setIsListening(false);
      }
    );

    if (!started) {
      simulateAssistantVoice();
    }
  };

  const simulateAssistantVoice = () => {
    setTimeout(() => {
      setIsListening(false);
      const randomPrompt = suggestedPrompts[Math.floor(Math.random() * suggestedPrompts.length)];
      handleSendPrompt(randomPrompt);
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-50 text-slate-900 select-none pb-20 overflow-hidden relative">
      
      {/* Top AI Status Banner */}
      <div className="bg-white px-5 py-3 border-b border-slate-200/90 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Skill Bridge AI</h2>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Online & Ready to Guide
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setChatLog([
              {
                id: `init-${Date.now()}`,
                sender: 'ai',
                text: "Conversation cleared. How can I help you?"
              }
            ]);
          }}
          className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg text-xs"
          title="Clear conversation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Messages Log Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {chatLog.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-2 max-w-[85%] ${
              msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                msg.sender === 'user' ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`p-3.5 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed shadow-2xs ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-xs'
                  : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {isThinking && (
          <div className="self-start flex items-center gap-2 bg-white px-3 py-2 rounded-2xl border border-slate-200 text-xs text-slate-500 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
            <span>AI Assistant is thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts Strip */}
      <div className="px-4 py-2 bg-slate-100/80 border-t border-slate-200/80">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
          Suggested Questions:
        </span>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSendPrompt(prompt)}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 text-slate-700 hover:text-emerald-800 text-xs font-semibold whitespace-nowrap active:scale-95 transition-all shadow-2xs cursor-pointer shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Center Voice Waveform & Touch Interaction Bar */}
      <div className="bg-white border-t border-slate-200 p-4 shadow-lg flex flex-col gap-3">
        <div className="flex flex-col items-center justify-center">
          <div className="h-5 flex items-center justify-center">
            {isListening ? (
              <span className="text-xs font-bold text-emerald-600 animate-pulse flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Listening... Speak your question
              </span>
            ) : isSpeaking ? (
              <span className="text-xs font-bold text-teal-600 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                Speaking answer...
              </span>
            ) : (
              <span className="text-xs text-slate-400 font-medium">
                Tap microphone to ask anything about your career
              </span>
            )}
          </div>

          <div className="my-1">
            <VoiceWaveform isActive={isListening || isSpeaking} />
          </div>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={toggleListening}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all cursor-pointer ${
              isListening
                ? 'bg-rose-500 text-white ring-4 ring-rose-200 animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
            }`}
            aria-label="Ask AI voice assistant"
          >
            {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
          </motion.button>
        </div>

        {/* Text Fallback Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendPrompt(inputText);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a question for Skill Bridge..."
            className="flex-1 h-11 px-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className={`h-11 w-11 rounded-xl flex items-center justify-center transition-all ${
              inputText.trim()
                ? 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 active:scale-95 cursor-pointer'
                : 'bg-slate-100 text-slate-300 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
