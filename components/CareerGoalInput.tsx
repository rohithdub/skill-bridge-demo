'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { POPULAR_CAREER_GOALS } from '@/lib/questions';
import { getUIText, getLocalizedGoalTitle, getAnalyzingPathwaysVoice, getLocalizedJob, getLocalizedSector } from '@/lib/translations';
import { VoiceWaveform } from './VoiceWaveform';
import { SpeechService } from '@/lib/speechService';
import {
  Compass,
  Mic,
  MicOff,
  Sparkles,
  ArrowRight,
  Sun,
  Code,
  Zap,
  Sprout,
  Scissors,
  Truck,
  TrendingUp,
  Heart,
  Wrench,
  Landmark,
  Briefcase
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Sun,
  Code,
  Zap,
  Sprout,
  Scissors,
  Truck,
  TrendingUp,
  Heart,
  Wrench,
  Landmark
};

export const CareerGoalInput: React.FC = () => {
  const {
    profile,
    careerGoal,
    setCareerGoal,
    generateAndSetRoadmap,
    setStage,
    speakText,
    isListening,
    setIsListening,
    isSpeaking,
    selectedLanguage
  } = useSkillBridge();

  const [inputGoal, setInputGoal] = useState<string>(careerGoal || '');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const goalPrompt = getUIText('careerGoalVoicePrompt', selectedLanguage);

  useEffect(() => {
    // Speak on arrival if no career goal set
    if (!careerGoal) {
      speakText(goalPrompt, selectedLanguage);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const generateRoadmapForGoal = (targetGoal: string) => {
    setIsGenerating(true);
    const speech = getAnalyzingPathwaysVoice(profile.currentJob || 'your background', targetGoal, selectedLanguage);
    speakText(speech, selectedLanguage);

    setTimeout(() => {
      generateAndSetRoadmap(targetGoal);
      setIsGenerating(false);
      setStage('main_app');
    }, 1800);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputGoal.trim()) return;
    setCareerGoal(inputGoal.trim());
    generateRoadmapForGoal(inputGoal.trim());
  };

  const handleSelectGoal = (selectedTitle: string) => {
    setInputGoal(selectedTitle);
    setCareerGoal(selectedTitle);
    generateRoadmapForGoal(selectedTitle);
  };

  const toggleListening = () => {
    if (isListening) {
      SpeechService.stopListening();
      setIsListening(false);
      return;
    }

    setIsListening(true);
    SpeechService.startListening(
      selectedLanguage,
      (transcript: string) => {
        setIsListening(false);
        setInputGoal(transcript);
        setCareerGoal(transcript);
        generateRoadmapForGoal(transcript);
      },
      () => {
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );

    // Fallback simulation timer if microphone not permitted
    setTimeout(() => {
      setIsListening(false);
      const recommended = profile.currentJob.toLowerCase().includes('elec')
        ? 'Solar Technician'
        : profile.currentJob.toLowerCase().includes('farm')
        ? 'Agri-Tech Entrepreneur'
        : 'Solar Technician';
      setInputGoal(recommended);
      generateRoadmapForGoal(recommended);
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#F6F8FC] text-[#10152E] select-none overflow-y-auto">
      
      {/* Top Header */}
      <div>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#24135F] to-[#3159E8] text-white flex items-center justify-center mb-3 shadow-sm">
          <Compass className="w-6 h-6 text-[#62E6C8]" />
        </div>

        <h1 className="text-2xl font-black text-[#10152E] tracking-tight">
          {getUIText('careerGoalTitle', selectedLanguage)}
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          {getUIText('careerGoalSubtitle', selectedLanguage)}
        </p>

        {/* Current Job Reference Bridge Card */}
        <div className="mt-4 p-3 rounded-2xl bg-white border border-[#3159E8]/30 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EEEAFE] text-[#24135F] flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div className="flex-1 text-xs">
            <span className="text-slate-400 font-medium">{getUIText('connectingFrom', selectedLanguage)}</span>
            <p className="font-bold text-[#10152E] text-sm">{getLocalizedJob(profile.currentJob || 'Electrical Assistant', selectedLanguage)}</p>
          </div>
          <span className="text-[11px] font-bold text-[#24135F] bg-[#EEEAFE] px-2.5 py-1 rounded-full border border-[#3159E8]/20">
            {getUIText('aiBridge', selectedLanguage)}
          </span>
        </div>
      </div>

      {/* Voice Prompt Area */}
      <div className="my-5 flex flex-col items-center justify-center">
        <VoiceWaveform isActive={isListening || isSpeaking || isGenerating} />

        <div className="mt-2 text-center">
          {isGenerating ? (
            <div className="flex items-center gap-2 text-[#3159E8] font-bold text-sm">
              <Sparkles className="w-4 h-4 animate-spin text-[#62E6C8]" />
              <span>{getUIText('synthesizingRoadmap', selectedLanguage)}</span>
            </div>
          ) : isListening ? (
            <p className="text-xs font-bold text-[#3159E8] animate-pulse">
              {getUIText('listeningCareerGoal', selectedLanguage)}
            </p>
          ) : (
            <p className="text-xs text-slate-400 font-medium">
              {getUIText('tapMicCareerGoal', selectedLanguage)}
            </p>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={toggleListening}
          disabled={isGenerating}
          className={`mt-3 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all ${
            isListening
              ? 'bg-rose-500 text-white ring-4 ring-rose-200 animate-pulse'
              : 'bg-gradient-to-tr from-[#24135F] via-[#3159E8] to-[#13B8B2] text-white shadow-lg shadow-[#3159E8]/30 border border-[#62E6C8]/30'
          }`}
          aria-label={getUIText('speakCareerGoal', selectedLanguage)}
        >
          {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
        </motion.button>
      </div>

      {/* Popular Goals Grid & Text Input */}
      <div>
        <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
          {getUIText('popularGoalsHeader', selectedLanguage)}
        </span>

        <div className="grid grid-cols-2 gap-2 mb-4 max-h-48 overflow-y-auto pr-1">
          {POPULAR_CAREER_GOALS.map((goal) => {
            const IconComp = ICON_MAP[goal.icon] || Compass;
            const isSelected = inputGoal.toLowerCase() === goal.title.toLowerCase();

            return (
              <button
                key={goal.title}
                onClick={() => handleSelectGoal(goal.title)}
                disabled={isGenerating}
                className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 cursor-pointer active:scale-95 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#24135F] via-[#3159E8] to-[#13B8B2] text-white border-[#3159E8] shadow-sm'
                    : 'bg-white text-[#10152E] border-slate-200 hover:border-[#3159E8]/40 hover:bg-[#EEEAFE]/30 shadow-2xs'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#EEEAFE] text-[#3159E8]'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-xs truncate">{getLocalizedGoalTitle(goal.title, selectedLanguage)}</p>
                  <p
                    className={`text-[10px] truncate ${
                      isSelected ? 'text-[#62E6C8]' : 'text-slate-400'
                    }`}
                  >
                    {getLocalizedSector(goal.sector, selectedLanguage)}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Text Fallback */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputGoal}
            onChange={(e) => setInputGoal(e.target.value)}
            placeholder={getUIText('typeCustomGoalPlaceholder', selectedLanguage)}
            disabled={isGenerating}
            className="flex-1 h-12 px-4 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-[#10152E] focus:outline-none focus:ring-2 focus:ring-[#3159E8] shadow-xs"
          />

          <button
            type="submit"
            disabled={!inputGoal.trim() || isGenerating}
            className={`h-12 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 transition-all shadow-md ${
              inputGoal.trim() && !isGenerating
                ? 'bg-gradient-to-r from-[#24135F] via-[#3159E8] via-[#13B8B2] to-[#62E6C8] hover:opacity-95 text-white shadow-[#3159E8]/25 active:scale-95 border border-[#62E6C8]/30'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            <span>{getUIText('buildRoadmapBtn', selectedLanguage)}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
