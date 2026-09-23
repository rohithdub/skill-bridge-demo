'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { RoadmapStep } from './RoadmapStep';
import confetti from 'canvas-confetti';
import {
  Route,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle,
  TrendingUp,
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
    careerGoal,
    setStage,
    toggleStepCompletion,
    speakText,
    isSpeaking
  } = useSkillBridge();

  const [activeTabFilter, setActiveTabFilter] = useState<'journey' | 'transferable'>('journey');

  if (!roadmap) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50">
        <Route className="w-12 h-12 text-slate-300 mb-3" />
        <h2 className="text-lg font-bold text-slate-700">No Roadmap Generated Yet</h2>
        <p className="text-xs text-slate-400 mt-1 max-w-xs">
          Select or speak your career goal to have Skill Bridge generate your custom pathway.
        </p>
        <button
          onClick={() => setStage('career_goal')}
          className="mt-4 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md"
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
      // Trigger confetti on step completion
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  };

  const handleReadSummary = () => {
    const text = `Roadmap from ${roadmap.currentJob} to ${roadmap.careerGoal}. ${roadmap.transferableInsight} Total duration is ${roadmap.estimatedTotalMonths}.`;
    speakText(text);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 select-none pb-20 overflow-y-auto">
      
      {/* Top Pathway Header Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white p-5 rounded-b-3xl shadow-lg relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between text-xs text-emerald-300 font-semibold mb-2">
          <div className="flex items-center gap-1.5 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Personalized Pathway</span>
          </div>

          <button
            onClick={() => setStage('career_goal')}
            className="flex items-center gap-1 text-[11px] text-emerald-200 hover:text-white bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700 active:scale-95 cursor-pointer"
            title="Change career goal"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Change Goal</span>
          </button>
        </div>

        {/* Current Job -> Target Career Goal Bridge */}
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex-1">
            <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
              Current Work
            </span>
            <p className="text-sm font-bold text-slate-200 truncate">
              {roadmap.currentJob}
            </p>
          </div>

          <div className="flex flex-col items-center px-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/30 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shadow-xs">
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </div>
            <span className="text-[9px] font-black uppercase text-amber-400 tracking-tighter mt-0.5">
              Bridge
            </span>
          </div>

          <div className="flex-1 text-right">
            <span className="text-[11px] uppercase font-bold tracking-wider text-emerald-400 block mb-0.5">
              Target Goal
            </span>
            <p className="text-base font-extrabold text-white truncate">
              {roadmap.careerGoal}
            </p>
          </div>
        </div>

        {/* Earning & Duration Metrics Strip */}
        <div className="mt-4 pt-3 border-t border-slate-800/90 grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
            <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block">Duration</span>
              <span className="font-bold text-slate-100">{roadmap.estimatedTotalMonths}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
            <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block">Income Growth</span>
              <span className="font-bold text-amber-300 text-[11px] leading-tight block truncate">
                {roadmap.potentialSalaryGrowth}
              </span>
            </div>
          </div>
        </div>

        {/* Progress & Voice Listen Audio Strip */}
        <div className="mt-3.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-slate-300 font-semibold text-[11px]">
              {completedCount} of {roadmap.steps.length} completed
            </span>
          </div>

          <button
            onClick={handleReadSummary}
            className="flex items-center gap-1 text-[11px] font-semibold text-emerald-300 hover:text-white bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800 cursor-pointer"
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
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200'
          }`}
        >
          <Route className="w-3.5 h-3.5" />
          <span>Roadmap Path</span>
        </button>

        <button
          onClick={() => setActiveTabFilter('transferable')}
          className={`flex-1 py-2 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTabFilter === 'transferable'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Transferable Skills</span>
        </button>
      </div>

      {/* Main Roadmap Content */}
      <div className="px-5 py-3 flex flex-col gap-4">
        {/* SECTION 1: Transferable Intelligence Banner (Mandatory Requirement 15) */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/90 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-900 mb-1.5">
            <Zap className="w-4 h-4 text-emerald-600 fill-emerald-600" />
            <span>Cognitive Bridge Intelligence</span>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            &ldquo;{roadmap.transferableInsight}&rdquo;
          </p>

          {/* Transferable Skills Chips */}
          <div className="mt-3 pt-2.5 border-t border-emerald-200/60 flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              Your Transferable Assets:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {roadmap.transferableSkills.map((ts, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-white text-emerald-900 border border-emerald-300 rounded-lg text-xs font-semibold shadow-2xs flex items-center gap-1"
                >
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  <span>{ts}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {activeTabFilter === 'journey' ? (
          <div className="flex flex-col gap-1">
            {/* Visual Start Milestone Node */}
            <div className="flex items-center gap-3.5 pl-1 mb-2">
              <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                <Briefcase className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">START POSITION</span>
                <p className="font-bold text-xs text-slate-800">{roadmap.currentJob}</p>
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
            <div className="mt-3 p-4 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-emerald-500/20 to-teal-500/20 border-2 border-dashed border-emerald-400 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shrink-0 shadow-md">
                <Award className="w-6 h-6 text-amber-300" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-extrabold uppercase text-emerald-700 tracking-wider">
                  GOAL DESTINATION
                </span>
                <h4 className="font-extrabold text-sm text-slate-900">
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
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Aligned with {roadmap.alignment}</span>
            </div>
          </div>
        ) : (
          /* Transferable Skills Deep Dive View */
          <div className="flex flex-col gap-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <h4 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Existing Foundation Strengths</span>
              </h4>
              <ul className="flex flex-col gap-2 text-xs text-slate-700">
                {roadmap.transferableSkills.map((skill, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900 block">{skill}</span>
                      <span className="text-slate-500 text-[11px]">Transfers directly from your work in {roadmap.currentJob}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <h4 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>New High-Value Skills to Master</span>
              </h4>
              <ul className="flex flex-col gap-2 text-xs text-slate-700">
                {roadmap.newSkillsToAcquire.map((skill, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900 block">{skill}</span>
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
