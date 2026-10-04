'use client';

import React, { useState } from 'react';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { Opportunity, TrainingProgram, ApplicationStatus } from '@/types/skillbridge';
import {
  Briefcase,
  GraduationCap,
  Store,
  MapPin,
  Clock,
  IndianRupee,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Filter,
  Check,
  ExternalLink,
  ChevronRight,
  Award,
  Layers,
  Phone,
  UserCheck,
  Building2,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getUIText,
  getLocalizedOpportunityTitle,
  getLocalizedEmploymentType,
  getLocalizedStatus,
  getLocalizedMatchReason,
  getLocalizedSkill,
  getLocalizedTraining,
  getLocalizedEnterprise,
  getLocalizedTask,
  getLocalizedDuration,
  getLocalizedPlacement,
  getLocalizedAccessibility,
  getLocalizedFeeStatus
} from '@/lib/translations';

type SubView = 'jobs' | 'training' | 'enterprise' | 'applications';

export const OpportunitiesTab: React.FC = () => {
  const {
    profile,
    careerGoal,
    opportunities,
    trainingPrograms,
    enterprisePathway,
    opportunitiesSubView,
    setOpportunitiesSubView,
    applyOpportunity,
    scheduleInterview,
    markOpportunityJoined,
    enrollTraining,
    toggleTrainingModule,
    toggleEnterpriseChecklist,
    updateProfileField,
    setActiveTab,
    selectedLanguage
  } = useSkillBridge();

  const activeSubView = opportunitiesSubView;
  const setActiveSubView = setOpportunitiesSubView;
  const [selectedRadius, setSelectedRadius] = useState<string>(profile.travelRadius || '15 km');
  const [selectedOppForInterview, setSelectedOppForInterview] = useState<Opportunity | null>(null);
  const [interviewDate, setInterviewDate] = useState<string>('2026-10-03');
  const [interviewTime, setInterviewTime] = useState<string>('10:30 AM');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRadiusChange = (radius: '5 km' | '15 km' | '30 km' | 'Any distance') => {
    setSelectedRadius(radius);
    updateProfileField('travelRadius', radius);
  };

  const handleApply = (opp: Opportunity) => {
    applyOpportunity(opp.id);
    showToast(`Application submitted to ${opp.organization} (Prototype Simulation)`);
  };

  const handleConfirmInterview = () => {
    if (!selectedOppForInterview) return;
    scheduleInterview(selectedOppForInterview.id, interviewDate, interviewTime);
    showToast(`Interview scheduled for ${interviewDate} at ${interviewTime}!`);
    setSelectedOppForInterview(null);
  };

  const handleJoinJob = (opp: Opportunity) => {
    markOpportunityJoined(opp.id);
    showToast(`Congratulations! Marked as Joined at ${opp.organization}`);
  };

  const handleEnroll = (tp: TrainingProgram) => {
    enrollTraining(tp.id);
    showToast(`Successfully enrolled in ${tp.title} (100% Free under PM-AJAY)`);
  };

  // Filter opportunities by travel distance
  const radiusNum = selectedRadius === '5 km' ? 5 : selectedRadius === '15 km' ? 15 : selectedRadius === '30 km' ? 30 : 999;
  const filteredOpps = opportunities.filter(o => o.distanceKm <= radiusNum);
  const activeApplications = opportunities.filter(o => o.applicationStatus !== 'Recommended');

  return (
    <div className="flex-1 flex flex-col bg-[#F6F8FC] text-[#10152E] select-none pb-24 overflow-y-auto">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-12 left-1/2 -translate-x-1/2 z-50 bg-[#10152E] text-white text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-[#3159E8]/30 max-w-xs text-center"
          >
            <Sparkles className="w-4 h-4 text-[#62E6C8] shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#10152E] via-[#24135F] to-[#10152E] text-white p-5 rounded-b-3xl shadow-lg relative overflow-hidden border-b border-[#3159E8]/30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 bg-[#24135F] px-2.5 py-1 rounded-full border border-[#3159E8]/40 shadow-xs">
            <Briefcase className="w-3.5 h-3.5 text-[#62E6C8]" />
            <span className="text-[11px] font-semibold text-[#62E6C8]">{getUIText('oppIntelligenceBadge', selectedLanguage)}</span>
          </div>

          <span className="text-[10px] font-semibold text-[#EEEAFE]/80 bg-[#10152E] px-2 py-0.5 rounded border border-white/10">
            {profile.district || 'Chennai'} Block
          </span>
        </div>

        <h1 className="text-xl font-black text-white tracking-tight">
          {getUIText('oppTabTitle', selectedLanguage)}
        </h1>
        <p className="text-xs text-[#EEEAFE]/90 mt-1 font-medium leading-relaxed">
          {getUIText('oppTabSubtitle', selectedLanguage)}
        </p>

        {/* Sub-navigation Pills */}
        <div className="grid grid-cols-4 gap-1.5 mt-4 pt-3 border-t border-white/10">
          <button
            onClick={() => setActiveSubView('jobs')}
            className={`py-1.5 px-1 rounded-xl text-[11px] font-bold transition-all text-center ${
              activeSubView === 'jobs'
                ? 'bg-[#3159E8] text-white shadow-sm'
                : 'bg-[#10152E]/60 text-slate-300 hover:text-white'
            }`}
          >
            {getUIText('nearbyJobs', selectedLanguage)}
          </button>

          <button
            onClick={() => setActiveSubView('training')}
            className={`py-1.5 px-1 rounded-xl text-[11px] font-bold transition-all text-center ${
              activeSubView === 'training'
                ? 'bg-[#3159E8] text-white shadow-sm'
                : 'bg-[#10152E]/60 text-slate-300 hover:text-white'
            }`}
          >
            {getUIText('trainingHub', selectedLanguage)}
          </button>

          <button
            onClick={() => setActiveSubView('enterprise')}
            className={`py-1.5 px-1 rounded-xl text-[11px] font-bold transition-all text-center ${
              activeSubView === 'enterprise'
                ? 'bg-[#3159E8] text-white shadow-sm'
                : 'bg-[#10152E]/60 text-slate-300 hover:text-white'
            }`}
          >
            {getUIText('enterpriseNav', selectedLanguage)}
          </button>

          <button
            onClick={() => setActiveSubView('applications')}
            className={`py-1.5 px-1 rounded-xl text-[11px] font-bold transition-all text-center relative ${
              activeSubView === 'applications'
                ? 'bg-[#3159E8] text-white shadow-sm'
                : 'bg-[#10152E]/60 text-slate-300 hover:text-white'
            }`}
          >
            <span>{getUIText('statusNav', selectedLanguage)}</span>
            {activeApplications.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-emerald-400 text-slate-900 text-[9px] font-bold">
                {activeApplications.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* TRAVEL RADIUS FILTER BAR (For Jobs & Training) */}
        {(activeSubView === 'jobs' || activeSubView === 'training') && (
          <div className="bg-white rounded-2xl p-3 shadow-xs border border-slate-200/80 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-[#3159E8]" />
              <span>{getUIText('travelRadius', selectedLanguage)}:</span>
            </div>
            <div className="flex items-center gap-1">
              {(['5 km', '15 km', '30 km', 'Any distance'] as const).map(r => (
                <button
                  key={r}
                  onClick={() => handleRadiusChange(r)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                    selectedRadius === r
                      ? 'bg-[#24135F] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {r === 'Any distance' ? getUIText('allFilter', selectedLanguage) : r}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SUBVIEW 1: NEARBY JOBS */}
        {/* ------------------------------------------------------------- */}
        {activeSubView === 'jobs' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  {getUIText('nearbyVacanciesTitle', selectedLanguage)} ({filteredOpps.length})
                </h2>
                <span className="text-[10px] text-slate-600 font-medium">
                  {getUIText('verifiedEmployersWithin', selectedLanguage)} {selectedRadius}
                </span>
              </div>
              <span className="text-[9.5px] font-mono bg-blue-50 text-blue-800 px-2 py-0.5 rounded-full border border-blue-200">
                {getUIText('prototypeOppData', selectedLanguage)}
              </span>
            </div>

            {filteredOpps.length === 0 ? (
              <div className="bg-white rounded-3xl p-6 text-center border border-slate-200">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-700">{getUIText('noOppsInRadius', selectedLanguage)} {selectedRadius}</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  {getUIText('expandRadiusTip', selectedLanguage)}
                </p>
                <button
                  onClick={() => handleRadiusChange('30 km')}
                  className="mt-3 px-4 py-1.5 rounded-xl bg-[#24135F] text-white text-xs font-bold cursor-pointer"
                >
                  {getUIText('expandTo30km', selectedLanguage)}
                </button>
              </div>
            ) : (
              filteredOpps.map(opp => (
                <div
                  key={opp.id}
                  className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200/80 hover:border-[#3159E8]/40 transition-all space-y-3"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {opp.matchScore}% {getUIText('matchScoreLabel', selectedLanguage)}
                        </span>
                        <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          {getLocalizedEmploymentType(opp.employmentType, selectedLanguage)}
                        </span>
                      </div>
                      <h3 className="text-sm font-extrabold text-[#10152E] mt-1 leading-snug">
                        {getLocalizedOpportunityTitle(opp.title, selectedLanguage)}
                      </h3>
                      <p className="text-xs text-slate-600 font-medium">
                        {opp.organization}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-black text-[#24135F] block">
                        {opp.salaryRange.split('+')[0].trim()}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-semibold flex items-center justify-end gap-0.5 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span>{opp.distanceKm} {getUIText('kmAway', selectedLanguage)}</span>
                      </span>
                    </div>
                  </div>

                  {/* Explainable Match Reasons */}
                  <div className="bg-[#F6F8FC] rounded-2xl p-2.5 space-y-1 border border-slate-200/60">
                    <span className="text-[9.5px] font-bold text-slate-600 uppercase tracking-wider block">
                      {getUIText('whyMatchedTitle', selectedLanguage)}:
                    </span>
                    {opp.matchReasons.map((reason, idx) => (
                      <p key={idx} className="text-[10.5px] text-slate-700 leading-tight">
                        {getLocalizedMatchReason(reason, selectedLanguage)}
                      </p>
                    ))}
                  </div>

                  {/* Requirements & Accessibility */}
                  <div className="text-[11px] text-slate-600 space-y-0.5">
                    <p><strong className="text-slate-800">{getUIText('skillsLabel', selectedLanguage)}:</strong> {opp.requiredSkills.map(s => getLocalizedSkill(s, selectedLanguage)).join(', ')}</p>
                    <p><strong className="text-slate-800">{getUIText('accessibilityLabel', selectedLanguage)}:</strong> {getLocalizedAccessibility(opp.accessibility, selectedLanguage)}</p>
                  </div>

                  {/* Actions */}
                  <div className="pt-1 flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      opp.applicationStatus === 'Joined'
                        ? 'bg-emerald-100 text-emerald-800'
                        : opp.applicationStatus === 'Interview Scheduled'
                        ? 'bg-amber-100 text-amber-900'
                        : opp.applicationStatus === 'Applied'
                        ? 'bg-blue-100 text-blue-900'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {getUIText('statusPrefix', selectedLanguage)}: {getLocalizedStatus(opp.applicationStatus, selectedLanguage)}
                    </span>

                    <div className="flex gap-1.5">
                      {opp.applicationStatus === 'Recommended' && (
                        <button
                          onClick={() => handleApply(opp)}
                          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#24135F] to-[#3159E8] text-white text-xs font-bold hover:opacity-95 active:scale-95 transition-all shadow-xs"
                        >
                          {getUIText('btnApply', selectedLanguage)}
                        </button>
                      )}

                      {opp.applicationStatus === 'Applied' && (
                        <button
                          onClick={() => setSelectedOppForInterview(opp)}
                          className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold active:scale-95 transition-all shadow-xs flex items-center gap-1"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{getUIText('scheduleInterview', selectedLanguage)}</span>
                        </button>
                      )}

                      {opp.applicationStatus === 'Interview Scheduled' && (
                        <button
                          onClick={() => handleJoinJob(opp)}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold active:scale-95 transition-all shadow-xs flex items-center gap-1"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>{getUIText('markJoined', selectedLanguage)}</span>
                        </button>
                      )}

                      {opp.applicationStatus === 'Joined' && (
                        <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{getUIText('placedSuccessfully', selectedLanguage)}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SUBVIEW 2: TRAINING HUB */}
        {/* ------------------------------------------------------------- */}
        {activeSubView === 'training' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  {getUIText('accreditedTrainingCenters', selectedLanguage)}
                </h2>
                <span className="text-[10px] text-slate-600 font-medium">
                  {getUIText('freeForScPmajay', selectedLanguage)}
                </span>
              </div>
              <span className="text-[9.5px] font-mono bg-blue-50 text-blue-800 px-2 py-0.5 rounded-full border border-blue-200">
                {getUIText('prototypeTrainingData', selectedLanguage)}
              </span>
            </div>

            {trainingPrograms.map(tp => (
              <div
                key={tp.id}
                className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200/80 hover:border-[#3159E8]/40 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#3159E8] border border-blue-200">
                      {tp.nsqfLevel} • {getLocalizedDuration(tp.duration, selectedLanguage)}
                    </span>
                    <h3 className="text-sm font-extrabold text-[#10152E] mt-1 leading-snug">
                      {getLocalizedTraining(tp.title, selectedLanguage)}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium">
                      {tp.centerName}
                    </p>
                  </div>

                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-xl border border-emerald-200 text-center shrink-0">
                    {tp.availableSeats} {getUIText('seatsLeft', selectedLanguage)}
                  </span>
                </div>

                {/* Free Support Status Banner */}
                <div className="bg-emerald-50/80 rounded-2xl p-2.5 border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{getLocalizedFeeStatus(tp.feeSupportStatus, selectedLanguage)}</span>
                </div>

                {/* Practical Modules List */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                    {getUIText('coreCurriculumModules', selectedLanguage)} ({tp.modules.length}):
                  </span>
                  <div className="space-y-1 mt-1">
                    {tp.modules.map((m, idx) => (
                      <div
                        key={idx}
                        onClick={() => toggleTrainingModule(tp.id, idx)}
                        className={`flex items-center justify-between p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                          m.isCompleted
                            ? 'bg-emerald-50/60 border-emerald-300 text-emerald-900 font-semibold'
                            : 'bg-[#F6F8FC] border-slate-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                            m.isCompleted ? 'bg-emerald-600 text-white' : 'border border-slate-400'
                          }`}>
                            {m.isCompleted && '✓'}
                          </div>
                          <span>{getLocalizedOpportunityTitle(m.title, selectedLanguage)}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">{m.hours} {getUIText('hoursUnit', selectedLanguage)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 space-y-0.5">
                  <p><strong className="text-slate-800">{getUIText('placementSupportLabel', selectedLanguage)}</strong> {getLocalizedPlacement(tp.placementSupport, selectedLanguage)}</p>
                  <p><strong className="text-slate-800">{getUIText('locationLabel', selectedLanguage)}</strong> {tp.location} ({tp.distanceKm} {getUIText('kmAway', selectedLanguage)})</p>
                </div>

                {/* Enrollment Button */}
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">
                    Scheme: {tp.relatedSchemeCode}
                  </span>

                  {tp.isEnrolled ? (
                    <span className="px-3.5 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{getUIText('btnEnrolled', selectedLanguage)}</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleEnroll(tp)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#24135F] via-[#3159E8] to-[#13B8B2] text-white text-xs font-bold hover:opacity-95 active:scale-95 transition-all shadow-xs"
                    >
                      {getUIText('btnEnroll', selectedLanguage)}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SUBVIEW 3: ENTERPRISE HUB (Feature 7) */}
        {/* ------------------------------------------------------------- */}
        {activeSubView === 'enterprise' && enterprisePathway && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#24135F] to-[#10152E] text-white rounded-3xl p-4 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs text-[#62E6C8] font-bold mb-1">
                <Store className="w-4 h-4 text-[#62E6C8]" />
                <span>{getUIText('startMyEnterprise', selectedLanguage)}</span>
              </div>
              <h2 className="text-base font-extrabold text-white">
                {getLocalizedEnterprise(enterprisePathway.enterpriseIdea, selectedLanguage)}
              </h2>
              <p className="text-xs text-[#EEEAFE]/90 mt-1">
                {enterprisePathway.tagline}
              </p>

              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-300 block">{getUIText('capitalNeeded', selectedLanguage)}</span>
                  <span className="font-bold text-white">{enterprisePathway.estimatedInvestment}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-300 block">{getUIText('directSubsidy', selectedLanguage)}</span>
                  <span className="font-bold text-amber-300">₹50,000 {getUIText('grantSuffix', selectedLanguage)}</span>
                </div>
              </div>
            </div>

            {/* Grant & Scheme Callout */}
            <div className="bg-amber-50 rounded-2xl p-3 border border-amber-200 text-xs text-amber-950 space-y-1">
              <strong className="flex items-center gap-1 text-amber-900 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{getUIText('govtFinancialPackage', selectedLanguage)}</span>
              </strong>
              <p className="text-[11px] leading-relaxed text-amber-900">
                {enterprisePathway.subsidyAvailable}
              </p>
            </div>

            {/* Setup Checklist */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {getUIText('enterpriseLaunchChecklist', selectedLanguage)}
                </h3>
                <span className="text-[10px] font-bold text-[#3159E8]">
                  {enterprisePathway.setupChecklist.filter(c => c.completed).length} / {enterprisePathway.setupChecklist.length} {getUIText('doneSuffix', selectedLanguage)}
                </span>
              </div>

              <div className="space-y-1.5 mt-2">
                {enterprisePathway.setupChecklist.map(item => (
                  <div
                    key={item.id}
                    onClick={() => toggleEnterpriseChecklist(item.id)}
                    className={`flex items-start gap-2.5 p-2.5 rounded-2xl border text-xs cursor-pointer transition-all ${
                      item.completed
                        ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-semibold'
                        : 'bg-[#F6F8FC] border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center text-[10px] shrink-0 ${
                      item.completed ? 'bg-emerald-600 text-white' : 'border border-slate-400 bg-white'
                    }`}>
                      {item.completed && '✓'}
                    </div>
                    <div className="flex-1">
                      <span>{getLocalizedTask(item.task, selectedLanguage)}</span>
                      <span className="block text-[9.5px] text-slate-600 mt-0.5">{item.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Tools */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {getUIText('starterEquipmentTools', selectedLanguage)}
              </h3>
              <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                {enterprisePathway.requiredTools.map((t, idx) => (
                  <li key={idx} className="leading-snug">{getLocalizedTask(t, selectedLanguage)}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SUBVIEW 4: MY APPLICATIONS / PLACEMENT HUB (Feature 6) */}
        {/* ------------------------------------------------------------- */}
        {activeSubView === 'applications' && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {getUIText('appPipelineTitle', selectedLanguage)} ({activeApplications.length})
            </h2>

            {activeApplications.length === 0 ? (
              <div className="bg-white rounded-3xl p-6 text-center border border-slate-200">
                <Briefcase className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-700">{getUIText('noActiveApps', selectedLanguage)}</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  {getUIText('browseNearbyJobsTip', selectedLanguage)}
                </p>
                <button
                  onClick={() => setActiveSubView('jobs')}
                  className="mt-3 px-4 py-1.5 rounded-xl bg-[#24135F] text-white text-xs font-bold cursor-pointer"
                >
                  {getUIText('exploreVacanciesBtn', selectedLanguage)}
                </button>
              </div>
            ) : (
              activeApplications.map(opp => (
                <div
                  key={opp.id}
                  className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200/80 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-extrabold text-[#10152E]">
                        {getLocalizedOpportunityTitle(opp.title, selectedLanguage)}
                      </h3>
                      <p className="text-xs text-slate-600 font-medium">
                        {opp.organization} • {opp.location}
                      </p>
                    </div>

                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      opp.applicationStatus === 'Joined'
                        ? 'bg-emerald-100 text-emerald-800'
                        : opp.applicationStatus === 'Interview Scheduled'
                        ? 'bg-amber-100 text-amber-900'
                        : opp.applicationStatus === 'Applied'
                        ? 'bg-blue-100 text-blue-900'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {getLocalizedStatus(opp.applicationStatus, selectedLanguage)}
                    </span>
                  </div>

                  {opp.interviewDate && (
                    <div className="bg-amber-50 rounded-2xl p-2.5 border border-amber-200 text-xs text-amber-950 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-amber-700" />
                        <span><strong>{getUIText('interviewLabel', selectedLanguage)}:</strong> {opp.interviewDate} at {opp.interviewTime}</span>
                      </div>
                      <span className="text-[10px] font-bold bg-amber-200 px-2 py-0.5 rounded-md">{getUIText('confirmedBadge', selectedLanguage)}</span>
                    </div>
                  )}

                  {opp.joinedDate && (
                    <div className="bg-emerald-50 rounded-2xl p-2.5 border border-emerald-200 text-xs text-emerald-950 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span><strong>{getUIText('placedJoinedLabel', selectedLanguage)}:</strong> {opp.joinedDate} • {getUIText('monthlySalaryLabel', selectedLanguage)}: {opp.salaryRange.split('+')[0]}</span>
                    </div>
                  )}

                  <div className="pt-2 flex justify-end gap-2">
                    {opp.applicationStatus === 'Applied' && (
                      <button
                        onClick={() => setSelectedOppForInterview(opp)}
                        className="px-3 py-1.5 rounded-xl bg-amber-500 text-white text-xs font-bold cursor-pointer"
                      >
                        {getUIText('scheduleInterview', selectedLanguage)}
                      </button>
                    )}

                    {opp.applicationStatus === 'Interview Scheduled' && (
                      <button
                        onClick={() => handleJoinJob(opp)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold cursor-pointer"
                      >
                        {getUIText('markJoined', selectedLanguage)}
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* INTERVIEW SCHEDULER MODAL */}
      <AnimatePresence>
        {selectedOppForInterview && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl space-y-4 border border-slate-200"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-[#10152E]">
                  {getUIText('scheduleDemoInterview', selectedLanguage)}
                </h3>
                <button
                  onClick={() => setSelectedOppForInterview(null)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="text-xs text-slate-600">
                <p><strong>{getUIText('positionLabel', selectedLanguage)}:</strong> {getLocalizedOpportunityTitle(selectedOppForInterview.title, selectedLanguage)}</p>
                <p><strong>{getUIText('companyLabel', selectedLanguage)}:</strong> {selectedOppForInterview.organization}</p>
                <p className="text-[10px] text-slate-600 mt-1">{getUIText('prototypeSimulation', selectedLanguage)}</p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">{getUIText('selectDateLabel', selectedLanguage)}</label>
                <input
                  type="date"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold"
                />

                <label className="text-xs font-bold text-slate-700 block mt-2">{getUIText('selectTimeLabel', selectedLanguage)}</label>
                <select
                  value={interviewTime}
                  onChange={(e) => setInterviewTime(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold"
                >
                  <option value="10:30 AM">10:30 AM ({getUIText('morningSlot', selectedLanguage)})</option>
                  <option value="02:00 PM">02:00 PM ({getUIText('afternoonSlot', selectedLanguage)})</option>
                  <option value="04:30 PM">04:30 PM ({getUIText('eveningSlot', selectedLanguage)})</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setSelectedOppForInterview(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  {getUIText('cancelBtn', selectedLanguage)}
                </button>
                <button
                  onClick={handleConfirmInterview}
                  className="flex-1 py-2.5 rounded-xl bg-[#3159E8] text-white text-xs font-bold shadow-md hover:bg-[#24135F] cursor-pointer"
                >
                  {getUIText('confirmSlotBtn', selectedLanguage)}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
