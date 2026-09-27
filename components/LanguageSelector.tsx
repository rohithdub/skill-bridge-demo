'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { SUPPORTED_LANGUAGES } from '@/lib/questions';
import { SupportedLanguage } from '@/types/skillbridge';
import { SpeechService } from '@/lib/speechService';
import { Check, Globe, ArrowRight, Volume2, Search, X, Sparkles } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const { selectedLanguage, setSelectedLanguage, setStage, speakText } = useSkillBridge();
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    SpeechService.preloadGreetings();
  }, []);

  const handleSelectLanguage = (lang: SupportedLanguage, greeting: string) => {
    setSelectedLanguage(lang);
    speakText(greeting, lang);
  };

  const handleContinue = () => {
    setStage('mobile');
  };

  const filteredLanguages = useMemo(() => {
    if (!searchQuery.trim()) return SUPPORTED_LANGUAGES;
    const q = searchQuery.toLowerCase().trim();
    return SUPPORTED_LANGUAGES.filter(
      l => l.name.toLowerCase().includes(q) || l.nativeName.toLowerCase().includes(q) || l.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="flex-1 flex flex-col justify-between p-5 bg-[#F6F8FC] text-[#10152E] select-none overflow-hidden">
      
      {/* Top Header */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#24135F] to-[#3159E8] text-white flex items-center justify-center shadow-sm">
            <Globe className="w-5 h-5 text-[#62E6C8]" />
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#24135F] bg-[#EEEAFE] px-2.5 py-1 rounded-full border border-[#3159E8]/20">
            <Sparkles className="w-3 h-3 text-[#3159E8]" />
            <span>{SUPPORTED_LANGUAGES.length} Indian Languages</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#10152E] tracking-tight">
          Choose your language
        </h1>
        <p className="text-slate-500 text-xs mt-0.5">
          Select your mother tongue or preferred language for AI voice conversations.
        </p>

        {/* Search Bar */}
        <div className="relative mt-3">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search language (e.g. Hindi, Bengali, Tamil)..."
            className="w-full h-10 pl-9 pr-8 bg-white border border-slate-200 rounded-xl text-xs font-medium text-[#10152E] placeholder:text-slate-400 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#3159E8] focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Language Grid (Scrollable with brand styling) */}
      <div className="flex-1 my-3 overflow-y-auto pr-1 grid grid-cols-2 gap-2.5 max-h-[54vh] no-scrollbar">
        {filteredLanguages.map((lang) => {
          const isSelected = selectedLanguage === lang.code;

          return (
            <motion.button
              key={lang.code}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelectLanguage(lang.code, lang.greeting)}
              className={`p-3.5 rounded-2xl flex flex-col items-start justify-between min-h-[86px] text-left transition-all border cursor-pointer relative min-w-0 overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-br from-[#24135F] via-[#3159E8] to-[#13B8B2] text-white border-[#3159E8] shadow-md shadow-[#3159E8]/25 ring-2 ring-[#3159E8] ring-offset-2'
                  : 'bg-white text-[#10152E] border-slate-200/90 hover:border-[#3159E8]/40 hover:bg-[#EEEAFE]/40 shadow-xs'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-white text-[#3159E8] flex items-center justify-center shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}

              <span className={`text-lg font-bold font-sans tracking-tight leading-snug truncate max-w-full ${isSelected ? 'text-white' : 'text-[#10152E]'}`}>
                {lang.nativeName}
              </span>

              <div className="flex items-center justify-between w-full mt-1.5 pt-1 border-t border-slate-100/30 min-w-0">
                <span className={`text-[11px] font-semibold truncate ${isSelected ? 'text-[#62E6C8]' : 'text-slate-500'}`}>
                  {lang.name}
                </span>
                {isSelected && (
                  <Volume2 className="w-3.5 h-3.5 text-[#62E6C8] animate-pulse shrink-0" />
                )}
              </div>
            </motion.button>
          );
        })}

        {filteredLanguages.length === 0 && (
          <div className="col-span-2 text-center py-8 text-slate-400 text-xs">
            No language matching &ldquo;{searchQuery}&rdquo;
          </div>
        )}
      </div>

      {/* Bottom Continue Action */}
      <div className="pt-2 pb-1 border-t border-slate-200/60">
        <button
          onClick={handleContinue}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#24135F] via-[#3159E8] via-[#13B8B2] to-[#62E6C8] hover:opacity-95 active:scale-[0.98] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#3159E8]/25 transition-all cursor-pointer border border-[#62E6C8]/30"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
