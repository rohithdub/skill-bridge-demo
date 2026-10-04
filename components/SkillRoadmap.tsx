'use client';

import React, { useState } from 'react';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { RoadmapStep } from './RoadmapStep';
import { normalizeRoadmap, toDisplayString } from '@/lib/normalization';
import {
  getRoadmapSummaryVoice,
  getUIText,
  getLocalizedJob,
  getLocalizedGoalTitle,
  getLocalizedSkill,
  getLocalizedTask,
  getLocalizedCertification,
  getLocalizedPlacement,
  getLocalizedEnterprise,
  getLocalizedDuration,
  getLocalizedSkillGapExplanation
} from '@/lib/translations';
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
  Layers,
  Store,
  FileCheck,
  CheckCircle2
} from 'lucide-react';

export const SkillRoadmap: React.FC = () => {
  const {
    roadmap,
    profile,
    skillGap,
    setStage,
    toggleStepCompletion,
    speakText,
    selectedLanguage,
    setActiveTab
  } = useSkillBridge();

  const [activeTabFilter, setActiveTabFilter] = useState<'journey' | 'skillgap' | 'outcomes'>('journey');

  const normalizedRoadmap = React.useMemo(() => normalizeRoadmap(roadmap), [roadmap]);

  if (!normalizedRoadmap) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#F6F8FC]">
        <Route className="w-12 h-12 text-slate-300 mb-3" />
        <h2 className="text-lg font-bold text-slate-700">{getUIText('noRoadmapTitle', selectedLanguage)}</h2>
        <p className="text-xs text-slate-400 mt-1 max-w-xs">
          {getUIText('noRoadmapDesc', selectedLanguage)}
        </p>
        <button
          onClick={() => setStage('career_goal')}
          className="mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#24135F] via-[#3159E8] to-[#13B8B2] text-white font-bold text-xs shadow-md"
        >
          {getUIText('chooseCareerGoalBtn', selectedLanguage)}
        </button>
      </div>
    );
  }

  const completedCount = normalizedRoadmap.steps.filter(s => s.isCompleted).length;
  const progressPercent = Math.round((completedCount / (normalizedRoadmap.steps.length || 1)) * 100);

  const handleStepToggle = (id: string) => {
    toggleStepCompletion(id);
    const step = normalizedRoadmap.steps.find(s => s.id === id);
    if (step && !step.isCompleted) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  };

  const handleReadSummary = () => {
    const summaryText = getRoadmapSummaryVoice(
      normalizedRoadmap.currentJob,
      normalizedRoadmap.careerGoal,
      skillGap.coveragePercent,
      normalizedRoadmap.estimatedTotalMonths,
      selectedLanguage
    );
    speakText(summaryText, selectedLanguage);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F6F8FC] text-[#10152E] select-none pb-24 overflow-y-auto">
      
      {/* Top Pathway Header Banner with Premium Dark Gradient */}
      <div className="bg-gradient-to-br from-[#10152E] via-[#24135F] to-[#10152E] text-white p-5 rounded-b-3xl shadow-lg relative overflow-hidden border-b border-[#3159E8]/30">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#3159E8]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between text-xs text-[#62E6C8] font-semibold mb-2">
          <div className="flex items-center gap-1.5 bg-[#24135F] px-2.5 py-1 rounded-full border border-[#3159E8]/40 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#62E6C8]" />
            <span>{getUIText('roadmapEngineBadge', selectedLanguage)}</span>
          </div>

          <button
            onClick={() => setStage('career_goal')}
            className="flex items-center gap-1 text-[11px] text-[#EEEAFE] hover:text-white bg-[#10152E]/80 px-2.5 py-1 rounded-full border border-[#3159E8]/40 active:scale-95 cursor-pointer transition-colors"
            title={getUIText('btnChangeGoal', selectedLanguage)}
          >
            <RefreshCw className="w-3 h-3 text-[#62E6C8]" />
            <span>{getUIText('btnChangeGoal', selectedLanguage)}</span>
          </button>
        </div>

        {/* Current Job -> Target Career Goal Bridge */}
        <div className="mt-2 flex items-center justify-between gap-2 min-w-0">
          <div className="flex-1 min-w-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
              {getUIText('currentWorkLabel', selectedLanguage)}
            </span>
            <p className="text-sm font-bold text-slate-200 truncate">
              {toDisplayString(getLocalizedJob(normalizedRoadmap.currentJob, selectedLanguage))}
            </p>
          </div>

          <div className="flex flex-col items-center px-2 shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#24135F] to-[#3159E8] border border-[#62E6C8]/40 flex items-center justify-center text-[#62E6C8] shadow-xs">
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </div>
            <span className="text-[8.5px] font-black uppercase text-[#62E6C8] tracking-tighter mt-0.5">
              {skillGap.coveragePercent}% {getUIText('readyBadge', selectedLanguage)}
            </span>
          </div>

          <div className="flex-1 text-right min-w-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#62E6C8] block mb-0.5">
              {getUIText('targetGoalLabel', selectedLanguage)}
            </span>
            <p className="text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#62E6C8] to-[#13B8B2] truncate">
              {toDisplayString(getLocalizedGoalTitle(normalizedRoadmap.careerGoal, selectedLanguage))}
            </p>
          </div>
        </div>

        {/* Metrics Strip */}
        <div className="mt-4 pt-3 border-t border-[#3159E8]/30 grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 bg-[#10152E]/80 p-2 rounded-xl border border-[#3159E8]/30 min-w-0">
            <Clock className="w-4 h-4 text-[#62E6C8] shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] text-slate-400 block">{getUIText('durationLabel', selectedLanguage)}</span>
              <span className="font-bold text-white break-words">{toDisplayString(getLocalizedDuration(normalizedRoadmap.estimatedTotalMonths, selectedLanguage), normalizedRoadmap.estimatedTotalMonths)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#10152E]/80 p-2 rounded-xl border border-[#3159E8]/30 min-w-0">
            <Award className="w-4 h-4 text-[#13B8B2] shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] text-slate-400 block">{getUIText('incomePotentialLabel', selectedLanguage)}</span>
              <span className="font-bold text-[#62E6C8] text-[11px] leading-tight block truncate">
                {normalizedRoadmap.potentialSalaryGrowth}
              </span>
            </div>
          </div>
        </div>

        {/* Progress & Audio Listen Strip */}
        <div className="mt-3.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-[#10152E] rounded-full overflow-hidden border border-[#3159E8]/30">
              <div
                className="h-full bg-gradient-to-r from-[#24135F] via-[#3159E8] via-[#13B8B2] to-[#62E6C8] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-slate-300 font-semibold text-[11px]">
              {completedCount} / {normalizedRoadmap.steps.length} {getUIText('completedProgress', selectedLanguage)}
            </span>
          </div>

          <button
            onClick={handleReadSummary}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#62E6C8] hover:text-white bg-[#24135F] px-2.5 py-1 rounded-full border border-[#3159E8]/40 cursor-pointer transition-colors"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{getUIText('btnListen', selectedLanguage)}</span>
          </button>
        </div>
      </div>

      {/* 3 Section Filter Tabs: Roadmap Path vs Skill Gap Engine vs Career Outcomes */}
      <div className="px-4 pt-4 pb-2 flex gap-1.5">
        <button
          onClick={() => setActiveTabFilter('journey')}
          className={`flex-1 py-2 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer ${
            activeTabFilter === 'journey'
              ? 'bg-[#24135F] text-white shadow-sm border border-[#3159E8]'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Route className="w-3.5 h-3.5 text-[#3159E8]" />
          <span>{getUIText('tabRoadmap', selectedLanguage)}</span>
        </button>

        <button
          onClick={() => setActiveTabFilter('skillgap')}
          className={`flex-1 py-2 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer ${
            activeTabFilter === 'skillgap'
              ? 'bg-[#24135F] text-white shadow-sm border border-[#3159E8]'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-[#13B8B2]" />
          <span>{getUIText('tabSkillGap', selectedLanguage)}</span>
        </button>

        <button
          onClick={() => setActiveTabFilter('outcomes')}
          className={`flex-1 py-2 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer ${
            activeTabFilter === 'outcomes'
              ? 'bg-[#24135F] text-white shadow-sm border border-[#3159E8]'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5 text-amber-500" />
          <span>{getUIText('tabOutcomes', selectedLanguage)}</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="px-4 py-3 flex flex-col gap-4">
        
        {/* ------------------------------------------------------------- */}
        {/* TAB 1: 5-STAGE ROADMAP JOURNEY */}
        {/* ------------------------------------------------------------- */}
        {activeTabFilter === 'journey' && (
          <div className="flex flex-col gap-1">
            {/* Visual Start Milestone Node */}
            <div className="flex items-center gap-3.5 pl-1 mb-2">
              <div className="w-7 h-7 rounded-full bg-[#10152E] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                <Briefcase className="w-3.5 h-3.5 text-[#62E6C8]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">{getUIText('startPosition', selectedLanguage)}</span>
                <p className="font-bold text-xs text-[#10152E]">{toDisplayString(getLocalizedJob(normalizedRoadmap.currentJob, selectedLanguage))}</p>
              </div>
            </div>

            {/* Steps 1 to 5 Journey Flow */}
            <div className="flex flex-col">
              {normalizedRoadmap.steps.map((step, idx) => (
                <RoadmapStep
                  key={step.id || `step-${idx}`}
                  step={step}
                  isLast={idx === normalizedRoadmap.steps.length - 1}
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
                  {getUIText('goalDestination', selectedLanguage)}
                </span>
                <h4 className="font-extrabold text-sm text-[#10152E]">
                  {getUIText('certifiedLabel', selectedLanguage)} {toDisplayString(getLocalizedGoalTitle(normalizedRoadmap.careerGoal, selectedLanguage))}
                </h4>
                <p className="text-[11px] text-slate-600 font-medium">
                  {profile.employmentPreference === 'Self-employment'
                    ? getUIText('autonomousEnterpriseDesc', selectedLanguage)
                    : getUIText('formalWageDesc', selectedLanguage)}
                </p>
              </div>
            </div>

            {/* Next Action Link */}
            <button
              onClick={() => setActiveTab('opportunities')}
              className="mt-3 w-full py-2.5 rounded-2xl bg-gradient-to-r from-[#24135F] via-[#3159E8] to-[#13B8B2] text-white text-xs font-bold shadow-sm flex items-center justify-center gap-2"
            >
              <span>{getUIText('exploreVacanciesBtn', selectedLanguage)}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: STRUCTURED SKILL GAP ENGINE (Feature 2) */}
        {/* ------------------------------------------------------------- */}
        {activeTabFilter === 'skillgap' && (
          <div className="flex flex-col gap-3">
            {/* Explainable Skill Gap Narrative Banner */}
            <div className="bg-gradient-to-r from-[#E4FAF5] to-[#EEEAFE] border border-[#13B8B2]/30 rounded-2xl p-4 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#24135F]">
                  <Zap className="w-4 h-4 text-[#13B8B2] fill-[#13B8B2]" />
                  <span>{getUIText('explainableAssessment', selectedLanguage)}</span>
                </div>
                <span className="text-[10px] font-bold bg-[#24135F] text-white px-2 py-0.5 rounded-full">
                  {skillGap.coveragePercent}% {getUIText('currentCoverage', selectedLanguage)}
                </span>
              </div>

              {/* Progress bar visual */}
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#13B8B2] to-[#3159E8] rounded-full"
                  style={{ width: `${skillGap.coveragePercent}%` }}
                />
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-medium pt-1">
                &ldquo;{toDisplayString(getLocalizedSkillGapExplanation(skillGap.explanation, normalizedRoadmap.currentJob, normalizedRoadmap.careerGoal, selectedLanguage), skillGap.explanation)}&rdquo;
              </p>
            </div>

            {/* Transferable Skills (What you already have) */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h4 className="font-bold text-xs text-[#10152E] uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>{getUIText('transferableSkillsTitle', selectedLanguage)} ({skillGap.transferableSkills.length})</span>
              </h4>
              <div className="grid grid-cols-1 gap-1.5">
                {skillGap.transferableSkills.map((ts, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-emerald-50/70 p-2 rounded-xl border border-emerald-200 text-xs font-medium text-emerald-950">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                    <span>{getLocalizedSkill(ts, selectedLanguage)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Missing Skills / Skill Gaps to Bridge */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h4 className="font-bold text-xs text-[#10152E] uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#3159E8]" />
                <span>{getUIText('skillGapsTitle', selectedLanguage)} ({skillGap.skillGaps.length})</span>
              </h4>
              <div className="grid grid-cols-1 gap-1.5">
                {skillGap.skillGaps.map((gap, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-[#EEEAFE]/70 p-2 rounded-xl border border-[#3159E8]/20 text-xs font-medium text-[#24135F]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3159E8] shrink-0" />
                    <span>{getLocalizedSkill(gap, selectedLanguage)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical Tasks for Certification */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h4 className="font-bold text-xs text-[#10152E] uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-slate-700" />
                <span>{getUIText('certificationTasksTitle', selectedLanguage)}</span>
              </h4>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                {skillGap.practicalTasks.map((task, idx) => (
                  <li key={idx} className="leading-snug">{getLocalizedTask(task, selectedLanguage)}</li>
                ))}
              </ul>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>{getUIText('certificationLabel', selectedLanguage)}: {getLocalizedCertification(skillGap.certificationRequirement, selectedLanguage)}</span>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: CAREER OUTCOMES (WAGE & ENTERPRISE) */}
        {/* ------------------------------------------------------------- */}
        {activeTabFilter === 'outcomes' && (
          <div className="flex flex-col gap-3">
            {/* Employment Options */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h4 className="font-bold text-xs text-[#10152E] uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-[#3159E8]" />
                <span>{getUIText('wageEmploymentTitle', selectedLanguage)}</span>
              </h4>
              <div className="space-y-1.5">
                {skillGap.employmentOptions.map((opt, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-[#F6F8FC] border border-slate-200 text-xs font-semibold text-slate-800 flex items-center justify-between">
                    <span>{toDisplayString(getLocalizedPlacement(opt, selectedLanguage))}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Enterprise Options */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h4 className="font-bold text-xs text-[#10152E] uppercase tracking-wider flex items-center gap-1.5">
                <Store className="w-4 h-4 text-amber-600" />
                <span>{getUIText('enterprisePathwaysTitle', selectedLanguage)}</span>
              </h4>
              <div className="space-y-1.5">
                {skillGap.enterpriseOptions.map((opt, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs font-semibold text-amber-950 flex items-center justify-between">
                    <span>{toDisplayString(getLocalizedEnterprise(opt, selectedLanguage))}</span>
                    <span className="text-[10px] text-amber-800 font-bold bg-amber-200 px-2 py-0.5 rounded">
                      {getUIText('grantEligibleBadge', selectedLanguage)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveTab('opportunities')}
              className="mt-2 w-full py-2.5 rounded-xl bg-[#24135F] text-white text-xs font-bold"
            >
              {getUIText('openOppsHubBtn', selectedLanguage)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
