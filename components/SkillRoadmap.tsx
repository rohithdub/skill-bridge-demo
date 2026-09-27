'use client';

import React, { useState } from 'react';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { RoadmapStep } from './RoadmapStep';
import confetti from 'canvas-confetti';
import {
  Route,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Clock,
  Award,
  Zap,
  Volume2,
  RefreshCw,
  Briefcase,
  Layers
} from 'lucide-react';

export const SkillRoadmap: React.FC = () => {
  const {
    roadmap,
    profile,
    setStage,
    toggleStepCompletion,
    speakText,
    selectedLanguage
  } = useSkillBridge();

  const [activeTabFilter, setActiveTabFilter] = useState<'journey' | 'transferable'>('journey');

  if (!roadmap) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#F6F8FC]">
        <Route className="w-12 h-12 text-slate-300 mb-3" />
        <h2 className="text-lg font-bold text-slate-700">No Roadmap Generated Yet</h2>
        <p className="text-xs text-slate-400 mt-1 max-w-xs">
          Select or speak your career goal to have Skill Bridge generate your custom pathway.
        </p>
        <button
          onClick={() => setStage('career_goal')}
          className="mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#24135F] via-[#3159E8] to-[#13B8B2] text-white font-bold text-xs shadow-md"
        >
          Choose Career Goal
        </button>
      </div>
    );
  }

  const completedCount = roadmap.steps.filter(s => s.isCompleted).length;
  const progressPercent = Math.round((completedCount / roadmap.steps.length) * 100);

  const handleStepToggle = (id: string) => {
    toggleStepCompletion(id);
    const step = roadmap.steps.find(s => s.id === id);
    if (step && !step.isCompleted) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  };

  const handleReadSummary = () => {
    let summaryText = `Roadmap from ${roadmap.currentJob} to ${roadmap.careerGoal}. ${roadmap.transferableInsight} Total duration is ${roadmap.estimatedTotalMonths}.`;
    if (selectedLanguage === 'ta') {
      summaryText = `${roadmap.currentJob} முதல் ${roadmap.careerGoal} வரையிலான உங்கள் தொழில் பாதை. ${roadmap.transferableInsight} மொத்த காலம் ${roadmap.estimatedTotalMonths}.`;
    } else if (selectedLanguage === 'hi') {
      summaryText = `${roadmap.currentJob} से ${roadmap.careerGoal} तक का आपका रोडमैप। ${roadmap.transferableInsight} कुल अवधि ${roadmap.estimatedTotalMonths} है।`;
    } else if (selectedLanguage === 'te') {
      summaryText = `${roadmap.currentJob} నుండి ${roadmap.careerGoal} వరకు మీ రోడ్‌మ్యాప్. ${roadmap.transferableInsight} మొత్తం వ్యవధి ${roadmap.estimatedTotalMonths}.`;
    } else if (selectedLanguage === 'kn') {
      summaryText = `${roadmap.currentJob} ಇಂದ ${roadmap.careerGoal} ವರೆಗಿನ ನಿಮ್ಮ ಮಾರ್ಗಸೂಚಿ. ${roadmap.transferableInsight} ಒಟ್ಟು ಅವಧಿ ${roadmap.estimatedTotalMonths}.`;
    } else if (selectedLanguage === 'ml') {
      summaryText = `${roadmap.currentJob} മുതൽ ${roadmap.careerGoal} വരെയുള്ള നിങ്ങളുടെ റോഡ്‌മാപ്പ്. ${roadmap.transferableInsight} ആകെ കാലാവധി ${roadmap.estimatedTotalMonths}.`;
    }
    speakText(summaryText, selectedLanguage);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F6F8FC] text-[#10152E] select-none pb-20 overflow-y-auto">
      
      {/* Top Pathway Header Banner with Premium Dark Gradient */}
      <div className="bg-gradient-to-br from-[#10152E] via-[#24135F] to-[#10152E] text-white p-5 rounded-b-3xl shadow-lg relative overflow-hidden border-b border-[#3159E8]/30">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#3159E8]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between text-xs text-[#62E6C8] font-semibold mb-2">
          <div className="flex items-center gap-1.5 bg-[#24135F] px-2.5 py-1 rounded-full border border-[#3159E8]/40 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#62E6C8]" />
            <span>AI Personalized Pathway</span>
          </div>

          <button
            onClick={() => setStage('career_goal')}
            className="flex items-center gap-1 text-[11px] text-[#EEEAFE] hover:text-white bg-[#10152E]/80 px-2.5 py-1 rounded-full border border-[#3159E8]/40 active:scale-95 cursor-pointer transition-colors"
            title="Change career goal"
          >
            <RefreshCw className="w-3 h-3 text-[#62E6C8]" />
            <span>Change Goal</span>
          </button>
        </div>

        {/* Current Job -> Target Career Goal Bridge */}
        <div className="mt-2 flex items-center justify-between gap-2 min-w-0">
          <div className="flex-1 min-w-0">
            <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
              Current Work
            </span>
            <p className="text-sm font-bold text-slate-200 truncate">
              {roadmap.currentJob}
            </p>
          </div>

          <div className="flex flex-col items-center px-2 shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#24135F] to-[#3159E8] border border-[#62E6C8]/40 flex items-center justify-center text-[#62E6C8] shadow-xs">
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </div>
            <span className="text-[9px] font-black uppercase text-[#62E6C8] tracking-tighter mt-0.5">
              Bridge
            </span>
          </div>

          <div className="flex-1 text-right min-w-0">
            <span className="text-[11px] uppercase font-bold tracking-wider text-[#62E6C8] block mb-0.5">
              Target Goal
            </span>
            <p className="text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#62E6C8] to-[#13B8B2] truncate">
              {roadmap.careerGoal}
            </p>
          </div>
        </div>

        {/* Earning & Duration Metrics Strip */}
        <div className="mt-4 pt-3 border-t border-[#3159E8]/30 grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 bg-[#10152E]/80 p-2 rounded-xl border border-[#3159E8]/30 min-w-0">
            <Clock className="w-4 h-4 text-[#62E6C8] shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] text-slate-400 block">Duration</span>
              <span className="font-bold text-white break-words">{roadmap.estimatedTotalMonths}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#10152E]/80 p-2 rounded-xl border border-[#3159E8]/30 min-w-0">
            <Award className="w-4 h-4 text-[#13B8B2] shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] text-slate-400 block">Income Growth</span>
              <span className="font-bold text-[#62E6C8] text-[11px] leading-tight block truncate">
                {roadmap.potentialSalaryGrowth}
              </span>
            </div>
          </div>
        </div>

        {/* Progress & Voice Listen Audio Strip with Signature Gradient */}
        <div className="mt-3.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-[#10152E] rounded-full overflow-hidden border border-[#3159E8]/30">
              <div
                className="h-full bg-gradient-to-r from-[#24135F] via-[#3159E8] via-[#13B8B2] to-[#62E6C8] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-slate-300 font-semibold text-[11px]">
              {completedCount} of {roadmap.steps.length} completed
            </span>
          </div>

          <button
            onClick={handleReadSummary}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#62E6C8] hover:text-white bg-[#24135F] px-2.5 py-1 rounded-full border border-[#3159E8]/40 cursor-pointer transition-colors"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Listen</span>
          </button>
        </div>
      </div>

      {/* Section Tabs: Journey Milestones vs Transferable Skills Insight */}
      <div className="px-5 pt-4 pb-2 flex gap-2">
        <button
          onClick={() => setActiveTabFilter('journey')}
          className={`flex-1 py-2 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTabFilter === 'journey'
              ? 'bg-[#24135F] text-white shadow-sm border border-[#3159E8]'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Route className="w-3.5 h-3.5 text-[#3159E8]" />
          <span>Roadmap Path</span>
        </button>

        <button
          onClick={() => setActiveTabFilter('transferable')}
          className={`flex-1 py-2 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTabFilter === 'transferable'
              ? 'bg-[#24135F] text-white shadow-sm border border-[#3159E8]'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-[#13B8B2]" />
          <span>Transferable Skills</span>
        </button>
      </div>

      {/* Main Roadmap Content */}
      <div className="px-5 py-3 flex flex-col gap-4">
        {/* Transferable Intelligence Banner with Growth / Lavender Gradient */}
        <div className="bg-gradient-to-r from-[#E4FAF5] to-[#EEEAFE] border border-[#13B8B2]/30 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#24135F] mb-1.5">
            <Zap className="w-4 h-4 text-[#13B8B2] fill-[#13B8B2]" />
            <span>Cognitive Bridge Intelligence</span>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            &ldquo;{roadmap.transferableInsight}&rdquo;
          </p>

          {/* Transferable Skills Chips */}
          <div className="mt-3 pt-2.5 border-t border-[#13B8B2]/20 flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#24135F]">
              Your Transferable Assets:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {roadmap.transferableSkills.map((ts, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-white text-[#24135F] border border-[#3159E8]/20 rounded-lg text-xs font-semibold shadow-2xs flex items-center gap-1 break-words max-w-full"
                >
                  <CheckCircle className="w-3 h-3 text-[#13B8B2] shrink-0" />
                  <span className="break-words">{ts}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {activeTabFilter === 'journey' ? (
          <div className="flex flex-col gap-1">
            {/* Visual Start Milestone Node */}
            <div className="flex items-center gap-3.5 pl-1 mb-2">
              <div className="w-7 h-7 rounded-full bg-[#10152E] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                <Briefcase className="w-3.5 h-3.5 text-[#62E6C8]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">START POSITION</span>
                <p className="font-bold text-xs text-[#10152E]">{roadmap.currentJob}</p>
              </div>
            </div>

            {/* Steps 1 to 5 Journey Flow */}
            <div className="flex flex-col">
              {roadmap.steps.map((step, idx) => (
                <RoadmapStep
                  key={step.id}
                  step={step}
                  isLast={idx === roadmap.steps.length - 1}
                  onToggleComplete={handleStepToggle}
                />
              ))}
            </div>

            {/* Visual Goal Destination Milestone */}
            <div className="mt-3 p-4 rounded-2xl bg-gradient-to-tr from-[#EEEAFE]/60 via-[#E4FAF5]/60 to-[#EEEAFE]/60 border-2 border-dashed border-[#13B8B2]/50 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#24135F] via-[#3159E8] to-[#13B8B2] text-white flex items-center justify-center shrink-0 shadow-md">
                <Award className="w-6 h-6 text-[#62E6C8]" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-extrabold uppercase text-[#13B8B2] tracking-wider">
                  GOAL DESTINATION
                </span>
                <h4 className="font-extrabold text-sm text-[#10152E]">
                  Certified {roadmap.careerGoal}
                </h4>
                <p className="text-[11px] text-slate-600 font-medium">
                  {profile.employmentPreference === 'Self-employment'
                    ? 'Autonomous Enterprise & Client Retainers'
                    : 'Formal Wage Employment with Career Upward Mobility'}
                </p>
              </div>
            </div>

            {/* NSDC / Skill India Accreditation Footer Notice */}
            <div className="mt-2 text-center text-[11px] text-slate-500 font-medium flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#3159E8]" />
              <span>Aligned with {roadmap.alignment}</span>
            </div>
          </div>
        ) : (
          /* Transferable Skills Deep Dive View */
          <div className="flex flex-col gap-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <h4 className="font-bold text-sm text-[#10152E] mb-2 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#13B8B2]" />
                <span>Existing Foundation Strengths</span>
              </h4>
              <ul className="flex flex-col gap-2 text-xs text-slate-700">
                {roadmap.transferableSkills.map((skill, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-[#E4FAF5]/60 p-2.5 rounded-xl border border-[#13B8B2]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#13B8B2] mt-1.5 shrink-0" />
                    <div>
                      <span className="font-bold text-[#10152E] block">{skill}</span>
                      <span className="text-slate-500 text-[11px]">Transfers directly from your work in {roadmap.currentJob}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <h4 className="font-bold text-sm text-[#10152E] mb-2 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#3159E8]" />
                <span>New High-Value Skills to Master</span>
              </h4>
              <ul className="flex flex-col gap-2 text-xs text-slate-700">
                {roadmap.newSkillsToAcquire.map((skill, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-[#EEEAFE]/60 p-2.5 rounded-xl border border-[#3159E8]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3159E8] mt-1.5 shrink-0" />
                    <div>
                      <span className="font-bold text-[#10152E] block">{skill}</span>
                      <span className="text-slate-500 text-[11px]">Earns you industry grade accreditation and salary jump</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
