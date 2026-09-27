'use client';

import React, { useState } from 'react';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import {
  Sparkles,
  RotateCcw,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Shield,
  Layers,
  ChevronDown
} from 'lucide-react';

export const DemoToolbar: React.FC = () => {
  const {
    loadScenario,
    resetAll,
    soundEnabled,
    setSoundEnabled,
    stage,
    setStage,
    offlineMode,
    setOfflineMode,
    selectedScenario
  } = useSkillBridge();

  const [showScenarioMenu, setShowScenarioMenu] = useState<boolean>(false);

  return (
    <div className="w-full bg-[#10152E]/95 backdrop-blur-md text-white px-3 py-1.5 flex items-center justify-between text-xs border-b border-[#24135F]/60 z-50 select-none">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1 font-semibold text-[#62E6C8]">
          <Sparkles className="w-3.5 h-3.5 text-[#62E6C8]" />
          <span className="font-bold">Skill Bridge</span>
        </span>
        <span className="hidden sm:inline text-slate-500">•</span>
        <span className="hidden md:inline text-[#EEEAFE]/70 text-[11px] font-mono">Stage: {stage}</span>
      </div>

      <div className="flex items-center gap-1 sm:gap-1.5">
        {/* Scenario Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowScenarioMenu(!showScenarioMenu)}
            className="bg-white/10 hover:bg-white/20 text-[#62E6C8] font-medium px-2 py-0.5 rounded text-[11px] flex items-center gap-1 border border-[#3159E8]/30 transition-all cursor-pointer"
            title="Switch demo scenario"
          >
            <span>{selectedScenario === 'solar' ? '⚡ Solar' : '✂️ Tailor'}</span>
            <ChevronDown className="w-2.5 h-2.5" />
          </button>

          {showScenarioMenu && (
            <div className="absolute right-0 top-full mt-1 bg-[#10152E] text-white rounded-xl shadow-xl border border-slate-700 py-1 w-44 z-50 text-[11px]">
              <div className="px-2 py-1 text-[9px] text-slate-400 uppercase font-bold border-b border-white/10">
                SIH End-to-End Scenarios
              </div>
              <button
                onClick={() => {
                  loadScenario('solar');
                  setShowScenarioMenu(false);
                }}
                className={`w-full text-left px-2.5 py-1.5 hover:bg-[#24135F] flex items-center justify-between ${
                  selectedScenario === 'solar' ? 'text-[#62E6C8] font-bold' : 'text-slate-300'
                }`}
              >
                <span>⚡ Scenario A: Solar (Wage)</span>
                {selectedScenario === 'solar' && <span>✓</span>}
              </button>
              <button
                onClick={() => {
                  loadScenario('tailor');
                  setShowScenarioMenu(false);
                }}
                className={`w-full text-left px-2.5 py-1.5 hover:bg-[#24135F] flex items-center justify-between ${
                  selectedScenario === 'tailor' ? 'text-[#62E6C8] font-bold' : 'text-slate-300'
                }`}
              >
                <span>✂️ Scenario B: Tailor (Enterprise)</span>
                {selectedScenario === 'tailor' && <span>✓</span>}
              </button>
            </div>
          )}
        </div>

        {/* Offline Mode Toggle */}
        <button
          onClick={() => setOfflineMode(!offlineMode)}
          className={`px-1.5 py-0.5 rounded text-[11px] flex items-center gap-1 transition-colors cursor-pointer ${
            offlineMode
              ? 'bg-amber-500 text-slate-900 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-white/10'
          }`}
          title={offlineMode ? 'Disable offline simulation' : 'Simulate offline low-connectivity mode'}
        >
          {offlineMode ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
          <span className="hidden sm:inline">{offlineMode ? 'Offline' : 'Online'}</span>
        </button>

        {/* Admin Mode Switcher */}
        <button
          onClick={() => setStage(stage === 'admin_dashboard' ? 'main_app' : 'admin_dashboard')}
          className={`px-2 py-0.5 rounded text-[11px] flex items-center gap-1 transition-colors cursor-pointer ${
            stage === 'admin_dashboard'
              ? 'bg-[#3159E8] text-white font-bold'
              : 'bg-white/10 text-slate-300 hover:text-white hover:bg-white/20'
          }`}
          title={stage === 'admin_dashboard' ? 'Return to Beneficiary App' : 'Open PM-AJAY Admin Dashboard'}
        >
          <Shield className="w-3 h-3 text-[#62E6C8]" />
          <span>{stage === 'admin_dashboard' ? 'App' : 'Admin'}</span>
        </button>

        {/* Audio Toggle */}
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

        {/* Reset */}
        <button
          onClick={resetAll}
          className="text-slate-400 hover:text-rose-400 hover:bg-[#24135F] p-1 rounded transition-colors text-[11px] flex items-center gap-1 cursor-pointer"
          title="Reset to fresh splash screen"
        >
          <RotateCcw className="w-3 h-3" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </div>
  );
};
