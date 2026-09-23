'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoadmapStep as RoadmapStepType } from '@/types/skillbridge';
import {
  CheckCircle2,
  Circle,
  Clock,
  Award,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ExternalLink
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
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const trainingTypeColors: Record<string, string> = {
    Foundational: 'bg-blue-100 text-blue-800 border-blue-200',
    'Domain Skill': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Hands-on Lab': 'bg-amber-100 text-amber-800 border-amber-200',
    'Govt Certification': 'bg-purple-100 text-purple-800 border-purple-200',
    'Industry Placement': 'bg-teal-100 text-teal-800 border-teal-200',
    'Self-Employment Launch': 'bg-rose-100 text-rose-800 border-rose-200'
  };

  return (
    <div className="relative flex items-start gap-3.5 group">
      
      {/* Visual Journey Path Node & Connecting Line */}
      <div className="flex flex-col items-center shrink-0 pt-1">
        {/* Step Node Circle */}
        <button
          onClick={() => onToggleComplete(step.id)}
          className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-sm transition-all shadow-sm active:scale-90 cursor-pointer ${
            step.isCompleted
              ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
              : 'bg-white border-2 border-slate-300 text-slate-700 hover:border-emerald-500'
          }`}
          title={step.isCompleted ? 'Mark incomplete' : 'Mark completed'}
        >
          {step.isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-white" />
          ) : (
            <span>{step.stepNumber}</span>
          )}
        </button>

        {/* Connecting Vertical Line */}
        {!isLast && (
          <div
            className={`w-0.5 my-1.5 transition-colors ${
              step.isCompleted ? 'bg-emerald-400' : 'bg-slate-200'
            }`}
            style={{ height: isExpanded ? '190px' : '95px' }}
          />
        )}
      </div>

      {/* Step Content Card */}
      <div
        className={`flex-1 rounded-2xl p-4 transition-all border ${
          step.isCompleted
            ? 'bg-white/95 border-emerald-300/80 shadow-xs'
            : 'bg-white border-slate-200 shadow-2xs hover:shadow-sm'
        }`}
      >
        {/* Top Badges: Step Number & Duration */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
              STEP {step.stepNumber}
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                trainingTypeColors[step.trainingType] || 'bg-slate-100 text-slate-700'
              }`}
            >
              {step.badge || step.trainingType}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{step.duration}</span>
          </div>
        </div>

        {/* Step Title */}
        <h3 className="text-base font-bold text-slate-900 leading-snug">
          {step.title}
        </h3>

        {/* Short Explanation */}
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
          {step.description}
        </p>

        {/* Government Scheme / Certification Tag */}
        {step.freeGovtScheme && (
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/70">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate">{step.freeGovtScheme}</span>
          </div>
        )}

        {/* Expandable Skills Section */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer py-1"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isExpanded ? 'Hide Skills' : 'View Skills'} ({step.skills.length})</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => onToggleComplete(step.id)}
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              step.isCompleted
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {step.isCompleted ? 'Completed' : 'Mark Done'}
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
                Skills You Will Learn:
              </span>
              <ul className="flex flex-col gap-1.5 text-xs text-slate-700">
                {step.skills.map((skill, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>

              {step.certification && (
                <div className="mt-2.5 p-2 bg-purple-50 border border-purple-200 rounded-lg flex items-center gap-2 text-xs text-purple-900 font-medium">
                  <Award className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Accreditation: <strong>{step.certification}</strong></span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
