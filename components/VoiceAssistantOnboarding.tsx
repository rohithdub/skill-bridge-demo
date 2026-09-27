'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { ONBOARDING_QUESTIONS } from '@/lib/questions';
import { getLocalizedQuestion, getUIText } from '@/lib/translations';
import { VoiceWaveform } from './VoiceWaveform';
import { SpeechService } from '@/lib/speechService';
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  Sparkles,
  ArrowRight,
  Check,
  RotateCcw,
  Bot,
  User,
  ChevronRight
} from 'lucide-react';

export const VoiceAssistantOnboarding: React.FC = () => {
  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    profile,
    updateProfileField,
    setStage,
    speakText,
    isSpeaking,
    isListening,
    setIsListening,
    selectedLanguage
  } = useSkillBridge();

  const baseQ = ONBOARDING_QUESTIONS[currentQuestionIndex] || ONBOARDING_QUESTIONS[0];
  const currentQ = getLocalizedQuestion(baseQ, selectedLanguage);
  const [textInput, setTextInput] = useState<string>('');
  const [selectedMulti, setSelectedMulti] = useState<string[]>([]);
  const [limitationSubState, setLimitationSubState] = useState<'prompt' | 'details'>('prompt');
  const [limitationDetailText, setLimitationDetailText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [aiSpokenHistory, setAiSpokenHistory] = useState<Array<{ id: string; sender: 'ai' | 'user'; text: string }>>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat history
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiSpokenHistory, isSpeaking, isListening]);

  // When question changes, speak the prompt and add to local conversation log
  useEffect(() => {
    if (!currentQ) return;

    // Reset inputs
    setTextInput('');
    setSelectedMulti(currentQ.type === 'multi_choice' ? (profile.skills || []) : []);
    setLimitationSubState('prompt');
    setLimitationDetailText('');

    const aiText = currentQ.aiPrompt;
    setAiSpokenHistory(prev => {
      const last = prev[prev.length - 1];
      if (last && last.sender === 'ai' && last.text === aiText) {
        return prev;
      }
      return [
        ...prev,
        {
          id: `q-${currentQ.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          sender: 'ai',
          text: aiText
        }
      ];
    });

    speakText(aiText, selectedLanguage);
  }, [currentQuestionIndex, selectedLanguage]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle advancing to the next question or profile summary
  const advanceToNext = (userAnswerText: string, fieldValue: any) => {
    // Add user answer to chat log
    setAiSpokenHistory(prev => [
      ...prev,
      {
        id: `ans-${currentQ.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        sender: 'user',
        text: userAnswerText
      }
    ]);

    // Update profile
    if (currentQ.field === 'skills') {
      updateProfileField('skills', fieldValue);
    } else if (currentQ.field === 'physicalLimitation') {
      updateProfileField('physicalLimitation', fieldValue);
    } else {
      updateProfileField(currentQ.field as any, fieldValue);
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      if (currentQuestionIndex < ONBOARDING_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // All questions complete!
        setStage('profile_summary');
      }
    }, 700);
  };

  // Microphone toggle & speech recognition / simulation
  const toggleListening = () => {
    if (isListening) {
      SpeechService.stopListening();
      setIsListening(false);
      return;
    }

    setIsListening(true);

    const started = SpeechService.startListening(
      selectedLanguage,
      (transcript) => {
        setIsListening(false);
        handleVoiceInputResult(transcript);
      },
      (err) => {
        setIsListening(false);
        // Fallback simulation if speech recognition is unavailable or blocked
        simulateVoiceResult();
      },
      () => {
        setIsListening(false);
      }
    );

    if (!started) {
      // Simulate listening for 2 seconds then auto-populate demo value
      simulateVoiceResult();
    }
  };

  const simulateVoiceResult = () => {
    setTimeout(() => {
      setIsListening(false);
      let simulatedVal = '';
      if (currentQ.demoValue) {
        if (Array.isArray(currentQ.demoValue)) {
          simulatedVal = currentQ.demoValue.join(', ');
        } else if (typeof currentQ.demoValue === 'object') {
          simulatedVal = 'No physical limitation';
        } else {
          simulatedVal = String(currentQ.demoValue);
        }
      }
      handleVoiceInputResult(simulatedVal || 'Understood');
    }, 2000);
  };

  const handleVoiceInputResult = (transcript: string) => {
    if (!transcript) return;

    if (currentQ.type === 'single_choice' && currentQ.options) {
      // Find matching option or use transcript
      const matched = currentQ.options.find(
        opt => opt.toLowerCase().includes(transcript.toLowerCase()) || transcript.toLowerCase().includes(opt.toLowerCase())
      ) || transcript;
      advanceToNext(transcript, matched);
    } else if (currentQ.type === 'multi_choice') {
      advanceToNext(transcript, [transcript]);
    } else if (currentQ.type === 'special_limitation') {
      if (transcript.toLowerCase().includes('yes')) {
        setLimitationSubState('details');
        speakText(getUIText('limitationPrompt', selectedLanguage), selectedLanguage);
      } else {
        advanceToNext(transcript, { hasLimitation: false });
      }
    } else {
      advanceToNext(transcript, transcript);
    }
  };

  // Text input submission
  const handleTextSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!textInput.trim()) return;
    advanceToNext(textInput.trim(), textInput.trim());
    setTextInput('');
  };

  // Option selection
  const handleSingleOptionSelect = (option: string) => {
    advanceToNext(option, option);
  };

  const toggleMultiOption = (option: string) => {
    if (selectedMulti.includes(option)) {
      setSelectedMulti(selectedMulti.filter(item => item !== option));
    } else {
      setSelectedMulti([...selectedMulti, option]);
    }
  };

  const handleMultiSubmit = () => {
    if (selectedMulti.length === 0) return;
    advanceToNext(selectedMulti.join(', '), selectedMulti);
  };

  const handleLimitationChoice = (choice: string) => {
    if (choice === 'Yes') {
      setLimitationSubState('details');
      speakText(getUIText('limitationPrompt', selectedLanguage), selectedLanguage);
    } else if (choice === 'Prefer not to say') {
      advanceToNext('Prefer not to say', { hasLimitation: false, details: 'Prefer not to say' });
    } else {
      advanceToNext('No limitation', { hasLimitation: false });
    }
  };

  const handleLimitationDetailSubmit = () => {
    const detail = limitationDetailText.trim() || 'Visual / mobility assistance needed';
    advanceToNext(detail, { hasLimitation: true, details: detail });
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-50 text-slate-900 select-none relative overflow-hidden">
      
      {/* Top Bar: Progress Indicator & Step Count */}
      <div className="px-6 pt-3 pb-2 bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-800">
            <Bot className="w-4 h-4 text-sb-blue" />
            <span>{getUIText('aiVoiceOnboarding', selectedLanguage)}</span>
          </div>
          <span className="font-semibold text-sb-indigo bg-sb-lavender px-2.5 py-0.5 rounded-full border border-sb-blue/20">
            {currentQuestionIndex + 1} of {ONBOARDING_QUESTIONS.length}
          </span>
        </div>

        {/* Brand Full Signature Gradient Progress Bar */}
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-sb-signature-h rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / ONBOARDING_QUESTIONS.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Center Conversational Area */}
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
        {/* Intro greeting card for question 1 */}
        {currentQuestionIndex === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-sb-dark text-white p-4 rounded-2xl shadow-sm text-xs leading-relaxed flex items-start gap-3 border border-sb-blue/30"
          >
            <div className="w-8 h-8 rounded-full bg-sb-blue/20 text-sb-mint flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-sb-mint text-sm mb-1">
                Skill Bridge AI
              </p>
              <p className="text-slate-200 leading-relaxed">
                {getUIText('welcomeGreeting', selectedLanguage)}
              </p>
            </div>
          </motion.div>
        )}

        {/* Chat History Messages */}
        {aiSpokenHistory.slice(-4).map((msg, idx) => (
          <motion.div
            key={`${msg.id}-${idx}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-2 max-w-[88%] ${
              msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                msg.sender === 'user'
                  ? 'bg-sb-blue text-white shadow-xs'
                  : 'bg-sb-lavender text-sb-indigo border border-sb-blue/20'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`p-3.5 rounded-2xl text-sm font-medium leading-snug shadow-xs break-words max-w-full min-w-0 ${
                msg.sender === 'user'
                  ? 'bg-sb-blue text-white rounded-tr-xs'
                  : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {/* AI Thinking / Processing Indicator */}
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="self-start flex items-center gap-2 bg-white px-3 py-2 rounded-2xl border border-slate-200 text-xs text-slate-500 shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full bg-sb-indigo animate-bounce"></span>
            <span className="w-2 h-2 rounded-full bg-sb-blue animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-2 h-2 rounded-full bg-sb-teal animate-bounce [animation-delay:0.4s]"></span>
            <span>{getUIText('processing', selectedLanguage)}</span>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Interactive Answering Area (Single Choice, Multi Choice, Voice, Text Fallback) */}
      <div className="bg-white border-t border-slate-200/90 p-4 shadow-lg flex flex-col gap-3 rounded-t-3xl">
        
        {/* Dynamic Options Based on Question Type */}
        <div className="max-h-40 overflow-y-auto pr-1">
          {/* 1. Single Choice Options */}
          {currentQ.type === 'single_choice' && currentQ.options && (
            <div className="flex flex-wrap gap-2">
              {currentQ.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSingleOptionSelect(opt)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-sb-lavender hover:text-sb-indigo hover:border-sb-blue/40 border border-slate-200 text-slate-800 text-sm font-semibold active:scale-95 transition-all text-left flex items-center justify-between gap-2 shadow-2xs cursor-pointer"
                >
                  <span>{opt}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ))}
            </div>
          )}

          {/* 2. Number / Age Suggestions */}
          {currentQ.type === 'number' && currentQ.options && (
            <div className="flex flex-wrap gap-2">
              {currentQ.options.map((ageVal) => (
                <button
                  key={ageVal}
                  onClick={() => advanceToNext(ageVal, ageVal)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-sb-blue hover:text-white border border-slate-200 text-slate-800 text-sm font-bold active:scale-95 transition-all cursor-pointer"
                >
                  {ageVal} {getUIText('yearsSuffix', selectedLanguage)}
                </button>
              ))}
            </div>
          )}

          {/* 3. Multi Choice Chips (Skills & Interests) */}
          {currentQ.type === 'multi_choice' && currentQ.options && (
            <div className="flex flex-col gap-2.5">
              <div className="flex flex-wrap gap-2">
                {currentQ.options.map((skill) => {
                  const isChecked = selectedMulti.includes(skill);
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleMultiOption(skill)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-sb-blue text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                      <span>{skill}</span>
                    </button>
                  );
                })}
              </div>

              {selectedMulti.length > 0 && (
                <button
                  onClick={handleMultiSubmit}
                  className="w-full py-2.5 rounded-xl bg-sb-signature-h hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-all cursor-pointer"
                >
                  <span>{getUIText('confirmSelectedSkills', selectedLanguage)} ({selectedMulti.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* 4. Special Respectful Physical Limitation Handling */}
          {currentQ.type === 'special_limitation' && (
            <div className="flex flex-col gap-2">
              {limitationSubState === 'prompt' ? (
                <div className="grid grid-cols-3 gap-2">
                  {currentQ.options?.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleLimitationChoice(opt)}
                      className="py-2.5 px-2 rounded-xl bg-slate-100 hover:bg-sb-blue hover:text-white border border-slate-200 text-slate-800 text-xs font-bold active:scale-95 transition-all text-center cursor-pointer"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-medium text-slate-600">
                    {getUIText('limitationPrompt', selectedLanguage)}
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={limitationDetailText}
                      onChange={(e) => setLimitationDetailText(e.target.value)}
                      placeholder={getUIText('limitationPlaceholder', selectedLanguage)}
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sb-blue"
                    />
                    <button
                      onClick={handleLimitationDetailSubmit}
                      className="px-4 py-2 rounded-xl bg-sb-blue text-white font-bold text-xs cursor-pointer hover:bg-sb-indigo transition-colors"
                    >
                      {getUIText('save', selectedLanguage)}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Central Voice Wave & Listening Status */}
        <div className="flex flex-col items-center justify-center pt-1">
          {/* Status Label */}
          <div className="h-5 flex items-center justify-center">
            {isListening ? (
              <span className="text-xs font-bold text-sb-blue animate-pulse flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sb-blue animate-ping"></span>
                {getUIText('listening', selectedLanguage)}
              </span>
            ) : isSpeaking ? (
              <span className="text-xs font-bold text-sb-teal flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                {getUIText('speaking', selectedLanguage)}
              </span>
            ) : (
              <span className="text-xs text-slate-400 font-medium">
                {getUIText('tapMicOrType', selectedLanguage)}
              </span>
            )}
          </div>

          {/* Voice Wave Visualizer */}
          <div className="my-1.5">
            <VoiceWaveform isActive={isListening || isSpeaking} />
          </div>

          {/* Centered Large Touch-Friendly Microphone Button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={toggleListening}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all relative cursor-pointer ${
              isListening
                ? 'bg-rose-500 text-white ring-4 ring-rose-300 ring-offset-2 animate-pulse'
                : 'bg-sb-signature text-white shadow-sb-blue/30 hover:shadow-sb-blue/50'
            }`}
            aria-label="Toggle voice input"
          >
            {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
          </motion.button>
        </div>

        {/* Text Input Fallback (for accessibility / noisy surroundings) */}
        <form onSubmit={handleTextSubmit} className="flex items-center gap-2 pt-1">
          <input
            type={currentQ.type === 'number' ? 'number' : 'text'}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder={currentQ.placeholder || getUIText('typeAnswerPlaceholder', selectedLanguage)}
            className="flex-1 h-11 px-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sb-blue focus:bg-white transition-all"
          />

          <button
            type="submit"
            disabled={!textInput.trim()}
            className={`h-11 w-11 rounded-xl flex items-center justify-center transition-all ${
              textInput.trim()
                ? 'bg-sb-blue text-white shadow-sm hover:bg-sb-indigo active:scale-95 cursor-pointer'
                : 'bg-slate-100 text-slate-300 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>

          {/* Quick Demo Pre-fill for this exact question */}
          <button
            type="button"
            onClick={() => {
              if (currentQ.demoValue) {
                if (Array.isArray(currentQ.demoValue)) {
                  advanceToNext(currentQ.demoValue.join(', '), currentQ.demoValue);
                } else if (typeof currentQ.demoValue === 'object') {
                  advanceToNext('No limitation', currentQ.demoValue);
                } else {
                  advanceToNext(String(currentQ.demoValue), currentQ.demoValue);
                }
              }
            }}
            className="h-11 px-3 rounded-xl bg-sb-lavender text-sb-indigo border border-sb-blue/20 text-xs font-semibold hover:bg-sb-blue/10 transition-colors shrink-0 cursor-pointer"
            title="Auto-fill recommended sample answer"
          >
            {getUIText('autoFill', selectedLanguage)}
          </button>
        </form>

      </div>

    </div>
  );
};
