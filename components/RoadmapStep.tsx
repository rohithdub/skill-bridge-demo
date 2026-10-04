'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoadmapStep as RoadmapStepType } from '@/types/skillbridge';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { normalizeRoadmapStep, toDisplayString } from '@/lib/normalization';
import {
  getUIText,
  getLocalizedDuration,
  getLocalizedSkill,
  getLocalizedCertification,
  getLocalizedRoadmapStep
} from '@/lib/translations';
import {
  CheckCircle2,
  Clock,
  Award,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';

interface RoadmapStepProps {
  step: RoadmapStepType;
  isLast: boolean;
  onToggleComplete: (id: string) => void;
}

export const RoadmapStep: React.FC<RoadmapStepProps> = ({
  step,
  isLast,
  onToggleComplete
}) => {
  const { selectedLanguage } = useSkillBridge();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Normalize step so that all fields are guaranteed safe primitives
  const safeStep = normalizeRoadmapStep(step);

  const trainingTypeColors: Record<string, string> = {
    Foundational: 'bg-[#EEEAFE] text-[#24135F] border-[#3159E8]/30',
    'Domain Skill': 'bg-[#E4FAF5] text-[#13B8B2] border-[#13B8B2]/40',
    'Hands-on Lab': 'bg-amber-50 text-amber-900 border-amber-200',
    'Govt Certification': 'bg-[#EEEAFE] text-[#3159E8] border-[#3159E8]/40',
    'Industry Placement': 'bg-[#E4FAF5] text-[#10152E] border-[#62E6C8]/50',
    'Self-Employment Launch': 'bg-rose-50 text-rose-800 border-rose-200'
  };

  const displayBadge = toDisplayString(
    getLocalizedRoadmapStep(safeStep.badge || safeStep.trainingType, selectedLanguage),
    safeStep.badge || 'Milestone'
  );
  const displayDuration = toDisplayString(
    getLocalizedDuration(safeStep.duration, selectedLanguage),
    safeStep.duration || '2–4 weeks'
  );
  const displayTitle = toDisplayString(
    getLocalizedRoadmapStep(safeStep.title, selectedLanguage),
    safeStep.title
  );
  const displayDescription = toDisplayString(
    getLocalizedRoadmapStep(safeStep.description, selectedLanguage),
    safeStep.description
  );
  const displayScheme = safeStep.freeGovtScheme
    ? toDisplayString(getLocalizedRoadmapStep(safeStep.freeGovtScheme, selectedLanguage), safeStep.freeGovtScheme)
    : '';

  return (
    <div className="relative flex items-start gap-3.5 group">
      
      {/* Visual Journey Path Node & Connecting Line */}
      <div className="flex flex-col items-center shrink-0 pt-1">
        {/* Step Node Circle */}
        <button
          onClick={() => onToggleComplete(safeStep.id)}
          className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-sm transition-all shadow-sm active:scale-90 cursor-pointer ${
            safeStep.isCompleted
              ? 'bg-gradient-to-tr from-[#24135F] via-[#3159E8] to-[#13B8B2] text-white ring-4 ring-[#62E6C8]/40 shadow-md shadow-[#3159E8]/20'
              : 'bg-white border-2 border-slate-300 text-slate-700 hover:border-[#3159E8]'
          }`}
          title={safeStep.isCompleted ? getUIText('markIncomplete', selectedLanguage) : getUIText('markCompleted', selectedLanguage)}
        >
          {safeStep.isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-white" />
          ) : (
            <span>{safeStep.stepNumber}</span>
          )}
        </button>

        {/* Connecting Vertical Line with Gradient */}
        {!isLast && (
          <div
            className={`w-0.5 my-1.5 transition-colors ${
              safeStep.isCompleted 
                ? 'bg-gradient-to-b from-[#3159E8] via-[#13B8B2] to-[#62E6C8]' 
                : 'bg-slate-200'
            }`}
            style={{ height: isExpanded ? '190px' : '95px' }}
          />
        )}
      </div>

      {/* Step Content Card */}
      <div
        className={`flex-1 min-w-0 rounded-2xl p-4 transition-all border ${
          safeStep.isCompleted
            ? 'bg-white/95 border-[#13B8B2]/50 shadow-xs'
            : 'bg-white border-slate-200 shadow-2xs hover:shadow-sm'
        }`}
      >
        {/* Top Badges: Step Number & Duration */}
        <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 shrink-0">
              {getUIText('stepLabel', selectedLanguage)} {safeStep.stepNumber}
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                trainingTypeColors[safeStep.trainingType] || 'bg-slate-100 text-slate-700'
              }`}
            >
              {displayBadge}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md shrink-0">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{displayDuration}</span>
          </div>
        </div>

        {/* Step Title */}
        <h3 className="text-base font-bold text-[#10152E] leading-snug break-words">
          {displayTitle}
        </h3>

        {/* Short Explanation */}
        <p className="text-xs text-slate-600 mt-1 leading-relaxed break-words">
          {displayDescription}
        </p>

        {/* Government Scheme / Certification Tag */}
        {displayScheme && (
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-[#10152E] bg-[#E4FAF5] px-2.5 py-1 rounded-lg border border-[#13B8B2]/40 min-w-0">
            <Sparkles className="w-3.5 h-3.5 text-[#13B8B2] shrink-0" />
            <span className="truncate min-w-0">{displayScheme}</span>
          </div>
        )}

        {/* Expandable Skills Section */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-bold text-[#3159E8] hover:text-[#24135F] flex items-center gap-1 cursor-pointer py-1"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isExpanded ? getUIText('hideSkills', selectedLanguage) : getUIText('viewSkills', selectedLanguage)} ({safeStep.skills.length})</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => onToggleComplete(safeStep.id)}
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              safeStep.isCompleted
                ? 'bg-[#E4FAF5] text-[#13B8B2] font-bold border border-[#13B8B2]/30'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {safeStep.isCompleted ? getUIText('stepCompleted', selectedLanguage) : getUIText('markDone', selectedLanguage)}
          </button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2.5 pt-2 border-t border-slate-100 overflow-hidden"
            >
              <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                {getUIText('skillsYouWillLearn', selectedLanguage)}:
              </span>
              <ul className="flex flex-col gap-1.5 text-xs text-slate-700">
                {safeStep.skills.map((skill, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#13B8B2] shrink-0" />
                    <span>{toDisplayString(getLocalizedSkill(skill, selectedLanguage), skill)}</span>
                  </li>
                ))}
              </ul>

              {safeStep.certification && (
                <div className="mt-2.5 p-2 bg-[#EEEAFE] border border-[#3159E8]/30 rounded-lg flex items-center gap-2 text-xs text-[#24135F] font-medium min-w-0">
                  <Award className="w-4 h-4 text-[#3159E8] shrink-0" />
                  <span className="min-w-0 break-words">
                    {getUIText('accreditation', selectedLanguage)}: <strong>{toDisplayString(getLocalizedCertification(safeStep.certification, selectedLanguage), safeStep.certification)}</strong>
                  </span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
