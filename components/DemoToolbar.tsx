'use client';

import React from 'react';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { Sparkles, RotateCcw, Volume2, VolumeX } from 'lucide-react';

export const DemoToolbar: React.FC = () => {
  const { loadDemoProfile, resetAll, soundEnabled, setSoundEnabled, stage } = useSkillBridge();

  return (
    <div className="w-full bg-[#10152E]/95 backdrop-blur-md text-white px-3 py-1.5 flex items-center justify-between text-xs border-b border-[#24135F]/60 z-50 select-none">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1 font-semibold text-[#62E6C8]">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#62E6C8]" />
          <span>Skill Bridge</span>
        </span>
        <span className="hidden sm:inline text-slate-500">•</span>
        <span className="hidden sm:inline text-[#EEEAFE]/70 text-[11px] font-mono">Stage: {stage}</span>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          title={soundEnabled ? 'Mute AI voice' : 'Enable AI voice'}
          className={`p-1 rounded-md transition-colors ${
            soundEnabled ? 'text-[#62E6C8] hover:bg-[#24135F]' : 'text-slate-400 hover:bg-[#24135F]'
          }`}
          aria-label="Toggle voice"
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={loadDemoProfile}
          className="bg-gradient-to-r from-[#24135F] via-[#3159E8] to-[#13B8B2] hover:opacity-95 text-white font-medium px-2 py-0.5 rounded text-[11px] flex items-center gap-1 shadow-sm transition-all active:scale-95 border border-[#3159E8]/40 shrink-0"
          title="Instant pre-fill sample demo profile"
        >
          <Sparkles className="w-3 h-3 text-[#62E6C8]" />
          <span>Quick Demo</span>
        </button>

        <button
          onClick={resetAll}
          className="text-slate-400 hover:text-rose-400 hover:bg-[#24135F] p-1 rounded transition-colors text-[11px] flex items-center gap-1"
          title="Reset to fresh splash screen"
        >
          <RotateCcw className="w-3 h-3" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </div>
  );
};
