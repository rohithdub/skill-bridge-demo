'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { SUPPORTED_LANGUAGES } from '@/lib/questions';
import { SupportedLanguage } from '@/types/skillbridge';
import { Check, Globe, ArrowRight, Volume2 } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const { selectedLanguage, setSelectedLanguage, setStage, speakText } = useSkillBridge();

  const handleSelectLanguage = (lang: SupportedLanguage, greeting: string) => {
    setSelectedLanguage(lang);
    speakText(greeting);
  };

  const handleContinue = () => {
    setStage('mobile');
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-slate-50 text-slate-900 select-none">
      
      {/* Top Header */}
      <div className="pt-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 shadow-sm">
          <Globe className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Choose your language
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          You can change this later at any time.
        </p>
      </div>

      {/* Language Grid */}
      <div className="my-6 grid grid-cols-2 gap-3.5">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isSelected = selectedLanguage === lang.code;

          return (
            <motion.button
              key={lang.code}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelectLanguage(lang.code, lang.greeting)}
              className={`p-4 rounded-2xl flex flex-col items-start justify-between min-h-[96px] text-left transition-all border cursor-pointer relative ${
                isSelected
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/25 ring-2 ring-emerald-500 ring-offset-2'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 shadow-sm'
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}

              <span className={`text-xl font-bold font-sans ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                {lang.nativeName}
              </span>

              <div className="flex items-center justify-between w-full mt-2">
                <span className={`text-xs font-medium ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                  {lang.name}
                </span>
                {isSelected && (
                  <Volume2 className="w-3.5 h-3.5 text-emerald-100 animate-pulse" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom Continue Action */}
      <div className="pb-4">
        <button
          onClick={handleContinue}
          className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
