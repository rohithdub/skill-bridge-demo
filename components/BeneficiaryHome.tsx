'use client';

import React from 'react';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { normalizeSkills } from '@/lib/normalizeProfile';
import { getHomeGreeting, getHomeNextStepVoice, getUIText } from '@/lib/translations';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Compass,
  Briefcase,
  GraduationCap,
  Store,
  Landmark,
  PhoneCall,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Volume2,
  ChevronRight,
  Zap,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';

export const BeneficiaryHome: React.FC = () => {
  const {
    profile,
    careerGoal,
    roadmap,
    skillGap,
    opportunities,
    trainingPrograms,
    enterprisePathway,
    activeJourneyStep,
    setActiveTab,
    setOpportunitiesSubView,
    setStage,
    speakText,
    selectedLanguage,
    setActiveSimulator
  } = useSkillBridge();

  const isSelfEmployment = profile.employmentPreference === 'Self-employment';
  const candidateGoal = careerGoal || profile.desiredOccupation || 'Solar PV Specialist';

  // Calculate profile completeness
  const profileFieldsFilled = [
    profile.name,
    profile.age,
    profile.mobile,
    profile.district,
    profile.education,
    profile.caste,
    profile.currentJob,
    normalizeSkills(profile.skills).length > 0,
    profile.travelRadius
  ].filter(Boolean).length;
  const profileCompleteness = Math.round((profileFieldsFilled / 9) * 100);

  // Determine Primary CTA "Your Next Best Step"
  const getNextBestStep = () => {
    if (!roadmap) {
      return {
        title: getUIText('chooseAspirationTitle', selectedLanguage),
        subtitle: getUIText('chooseAspirationSub', selectedLanguage),
        actionLabel: getUIText('chooseAspirationBtn', selectedLanguage),
        action: () => setStage('career_goal'),
        icon: Compass,
        accent: 'from-[#24135F] via-[#3159E8] to-[#13B8B2]',
        spokenText: getHomeNextStepVoice('choose_goal', {}, selectedLanguage)
      };
    }

    const enrolledTraining = trainingPrograms.find(t => t.isEnrolled);
    if (!enrolledTraining) {
      return {
        title: isSelfEmployment ? getUIText('reviewGrantTitle', selectedLanguage) : getUIText('enrollTrainingTitle', selectedLanguage),
        subtitle: isSelfEmployment
          ? getUIText('reviewGrantSub', selectedLanguage)
          : getUIText('enrollTrainingSub', selectedLanguage),
        actionLabel: isSelfEmployment ? getUIText('exploreEnterpriseBtn', selectedLanguage) : getUIText('enrollTrainingBtn', selectedLanguage),
        action: () => {
          setOpportunitiesSubView(isSelfEmployment ? 'enterprise' : 'training');
          setActiveTab('opportunities');
        },
        icon: isSelfEmployment ? Store : GraduationCap,
        accent: 'from-[#24135F] via-[#3159E8] to-[#62E6C8]',
        spokenText: getHomeNextStepVoice(isSelfEmployment ? 'enterprise' : 'training', {}, selectedLanguage)
      };
    }

    const appliedJob = opportunities.find(o => o.applicationStatus === 'Applied' || o.applicationStatus === 'Interview Scheduled');
    if (!appliedJob && !isSelfEmployment) {
      return {
        title: getUIText('applyJobsTitle', selectedLanguage),
        subtitle: getUIText('applyJobsSub', selectedLanguage),
        actionLabel: getUIText('viewMatchedOppsBtn', selectedLanguage),
        action: () => {
          setOpportunitiesSubView('jobs');
          setActiveTab('opportunities');
        },
        icon: Briefcase,
        accent: 'from-[#3159E8] to-[#13B8B2]',
        spokenText: getHomeNextStepVoice('jobs', {}, selectedLanguage)
      };
    }

    if (appliedJob?.applicationStatus === 'Interview Scheduled') {
      return {
        title: getUIText('prepInterviewTitle', selectedLanguage),
        subtitle: getUIText('prepInterviewSub', selectedLanguage),
        actionLabel: getUIText('viewPlacementBtn', selectedLanguage),
        action: () => {
          setOpportunitiesSubView('applications');
          setActiveTab('opportunities');
        },
        icon: Award,
        accent: 'from-[#13B8B2] to-[#62E6C8]',
        spokenText: getHomeNextStepVoice('interview', { org: appliedJob.organization, date: appliedJob.interviewDate, time: appliedJob.interviewTime }, selectedLanguage)
      };
    }

    return {
      title: getUIText('continueLabTitle', selectedLanguage),
      subtitle: getUIText('continueLabSub', selectedLanguage),
      actionLabel: getUIText('openRoadmapBtn', selectedLanguage),
      action: () => setActiveTab('roadmap'),
      icon: Zap,
      accent: 'from-[#24135F] via-[#3159E8] to-[#13B8B2]',
      spokenText: getHomeNextStepVoice('milestone', {}, selectedLanguage)
    };
  };

  const nextStep = getNextBestStep();

  const handleReadNextStep = () => {
    const text = nextStep.spokenText || `${nextStep.title}. ${nextStep.subtitle}`;
    speakText(text, selectedLanguage);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F6F8FC] text-[#10152E] select-none pb-24 overflow-y-auto">
      
      {/* Hero Header with Brand Dark Gradient */}
      <div className="bg-gradient-to-br from-[#10152E] via-[#24135F] to-[#10152E] text-white p-5 rounded-b-3xl shadow-lg relative overflow-hidden border-b border-[#3159E8]/30">
        <div className="absolute top-0 right-0 w-44 h-44 bg-[#3159E8]/20 rounded-full blur-3xl pointer-events-none" />
        
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 bg-[#24135F] px-2.5 py-1 rounded-full border border-[#3159E8]/40 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#62E6C8]" />
            <span className="text-[11px] font-semibold text-[#62E6C8]">{getUIText('livelihoodAssistant', selectedLanguage)}</span>
          </div>

          <span className="text-[11px] font-mono font-bold text-white bg-[#10152E] px-2.5 py-1 rounded-full border border-[#62E6C8]/40">
            {profile.serialId || 'TN-32-101'}
          </span>
        </div>

        {/* Beneficiary Name & Title */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">
              {getHomeGreeting(selectedLanguage)}, {profile.name ? profile.name.split(' ')[0] : getUIText('beneficiaryFallback', selectedLanguage)}!
            </h1>
            <p className="text-xs text-[#EEEAFE]/90 mt-0.5 font-medium flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#62E6C8]" />
              <span>{profile.district || 'Chennai'}, {profile.state || 'Tamil Nadu'}</span>
              <span className="text-slate-400">•</span>
              <span className="text-[#62E6C8] font-semibold">{getUIText('radiusLabel', selectedLanguage)}: {profile.travelRadius || '15 km'}</span>
            </p>
          </div>

          <button
            onClick={handleReadNextStep}
            className="p-2.5 rounded-2xl bg-[#10152E]/90 hover:bg-[#24135F] text-[#62E6C8] border border-[#3159E8]/40 shadow-sm active:scale-95 transition-all cursor-pointer"
            title={getUIText('listenNextAction', selectedLanguage)}
            aria-label={getUIText('voicePlayback', selectedLanguage)}
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Readiness Metrics Cards */}
        <div className="grid grid-cols-3 gap-2.5 mt-4 pt-3 border-t border-white/10">
          <div className="bg-[#10152E]/60 backdrop-blur-sm p-2 rounded-xl border border-white/10 text-center">
            <span className="text-[10px] text-slate-300 font-medium block">{getUIText('skillCoverage', selectedLanguage)}</span>
            <span className="text-base font-extrabold text-[#62E6C8]">{skillGap.coveragePercent}%</span>
            <span className="text-[9px] text-[#EEEAFE]/70 block truncate">{getUIText('baselineStrength', selectedLanguage)}</span>
          </div>

          <div className="bg-[#10152E]/60 backdrop-blur-sm p-2 rounded-xl border border-white/10 text-center">
            <span className="text-[10px] text-slate-300 font-medium block">{getUIText('profileReady', selectedLanguage)}</span>
            <span className="text-base font-extrabold text-[#3159E8] bg-white px-1.5 rounded-sm">{profileCompleteness}%</span>
            <span className="text-[9px] text-[#EEEAFE]/70 block truncate">{getUIText('scPriorityVerified', selectedLanguage)}</span>
          </div>

          <div className="bg-[#10152E]/60 backdrop-blur-sm p-2 rounded-xl border border-white/10 text-center">
            <span className="text-[10px] text-slate-300 font-medium block">{getUIText('matchedGrants', selectedLanguage)}</span>
            <span className="text-base font-extrabold text-amber-300">₹50K+</span>
            <span className="text-[9px] text-[#EEEAFE]/70 block truncate">{getUIText('pmajayCapital', selectedLanguage)}</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* PRIMARY CTA CARD: "YOUR NEXT BEST STEP" */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/80 relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EEEAFE] text-[#24135F] uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#3159E8]" />
              <span>{getUIText('yourNextBestStep', selectedLanguage)}</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium">{getUIText('actionRequired', selectedLanguage)}</span>
          </div>

          <h2 className="text-base font-extrabold text-[#10152E] mt-1 leading-snug">
            {nextStep.title}
          </h2>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            {nextStep.subtitle}
          </p>

          <button
            onClick={nextStep.action}
            className={`w-full mt-4 py-3 px-4 rounded-2xl bg-gradient-to-r ${nextStep.accent} text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 hover:opacity-95 active:scale-98 transition-all cursor-pointer`}
          >
            <span>{nextStep.actionLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* 10-STEP MASTER LIVELIHOOD PATHWAY TRACKER */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-bold text-[#10152E] uppercase tracking-wider">
                {getUIText('myLivelihoodPathway', selectedLanguage)}
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                {getUIText('pathwaySubtitle', selectedLanguage)}
              </p>
            </div>
            <button
              onClick={() => setActiveTab('roadmap')}
              className="text-[11px] text-[#3159E8] font-bold hover:underline flex items-center gap-0.5"
            >
              <span>{getUIText('viewRoadmap', selectedLanguage)}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Stepper Grid (Steps 1 to 10) */}
          <div className="grid grid-cols-5 gap-1.5 py-1">
            {[
              { num: 1, label: getUIText('stepProfile', selectedLanguage) },
              { num: 2, label: getUIText('stepAssess', selectedLanguage) },
              { num: 3, label: getUIText('stepSkillGap', selectedLanguage) },
              { num: 4, label: getUIText('stepTraining', selectedLanguage) },
              { num: 5, label: getUIText('stepEnrolled', selectedLanguage) },
              { num: 6, label: getUIText('stepLearning', selectedLanguage) },
              { num: 7, label: getUIText('stepCertified', selectedLanguage) },
              { num: 8, label: getUIText('stepMatched', selectedLanguage) },
              { num: 9, label: getUIText('stepPlaced', selectedLanguage) },
              { num: 10, label: getUIText('stepFollowUp', selectedLanguage) }
            ].map((step) => {
              const isPast = step.num < activeJourneyStep;
              const isCurrent = step.num === activeJourneyStep;

              return (
                <div
                  key={step.num}
                  className={`flex flex-col items-center justify-center p-1.5 rounded-xl border text-center transition-all ${
                    isPast
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : isCurrent
                      ? 'bg-[#EEEAFE] border-[#3159E8] text-[#24135F] shadow-xs ring-1 ring-[#3159E8]/30 font-bold'
                      : 'bg-slate-50 border-slate-200/70 text-slate-400'
                  }`}
                >
                  <span className={`text-[10px] font-bold ${isCurrent ? 'text-[#3159E8]' : ''}`}>
                    {isPast ? '✓' : `S${step.num}`}
                  </span>
                  <span className="text-[8.5px] truncate max-w-full leading-tight mt-0.5">
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4 CORE INTEGRATED PILLARS QUICK-ACCESS */}
        <div className="grid grid-cols-2 gap-3">
          {/* Pillar 1: Opportunities */}
          <button
            onClick={() => {
              setOpportunitiesSubView('jobs');
              setActiveTab('opportunities');
            }}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-[#3159E8]/40 shadow-xs flex flex-col justify-between text-left transition-all hover:shadow-sm active:scale-98 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#3159E8] flex items-center justify-center mb-2">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">{getUIText('nearbyOppsTitle', selectedLanguage)}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                {opportunities.length} {getUIText('jobsWithin', selectedLanguage)} {profile.travelRadius || '15 km'}
              </span>
            </div>
          </button>

          {/* Pillar 2: Government Benefits */}
          <button
            onClick={() => setActiveTab('schemes')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-[#3159E8]/40 shadow-xs flex flex-col justify-between text-left transition-all hover:shadow-sm active:scale-98 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">{getUIText('benefitNavTitle', selectedLanguage)}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                {getUIText('benefitNavSub', selectedLanguage)}
              </span>
            </div>
          </button>

          {/* Pillar 3: Enterprise Pathway */}
          <button
            onClick={() => {
              setOpportunitiesSubView('enterprise');
              setActiveTab('opportunities');
            }}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-[#3159E8]/40 shadow-xs flex flex-col justify-between text-left transition-all hover:shadow-sm active:scale-98 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">{getUIText('enterpriseLaunchTitle', selectedLanguage)}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                {getUIText('enterpriseLaunchSub', selectedLanguage)}
              </span>
            </div>
          </button>

          {/* Pillar 4: Citizen Profile */}
          <button
            onClick={() => setActiveTab('profile')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-[#3159E8]/40 shadow-xs flex flex-col justify-between text-left transition-all hover:shadow-sm active:scale-98 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#24135F] flex items-center justify-center mb-2">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">{getUIText('citizenSerialTitle', selectedLanguage)}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">
                {profile.serialId || 'TN-32-101'}
              </span>
            </div>
          </button>
        </div>

        {/* MULTI-CHANNEL SIMULATION BAR (IVR & WHATSAPP) */}
        <div className="bg-gradient-to-r from-slate-900 via-[#10152E] to-slate-900 text-white rounded-3xl p-4 shadow-sm border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[#62E6C8] uppercase tracking-wider flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-[#62E6C8]" />
              <span>{getUIText('multiChannelTitle', selectedLanguage)}</span>
            </span>
            <span className="text-[9px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
              {getUIText('lowLiteracyBadge', selectedLanguage)}
            </span>
          </div>
          <p className="text-[11px] text-slate-300 mb-3">
            {getUIText('multiChannelDesc', selectedLanguage)}
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setActiveSimulator('ivr')}
              className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-white/10 transition-colors active:scale-95 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#62E6C8]" />
              <span>{getUIText('launchIvrBtn', selectedLanguage)}</span>
            </button>

            <button
              onClick={() => setActiveSimulator('whatsapp')}
              className="py-2.5 px-3 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#25D366]/40 transition-colors active:scale-95 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>{getUIText('whatsAppVoiceBtn', selectedLanguage)}</span>
            </button>
          </div>
        </div>

        {/* PROTOTYPE TRANSPARENCY NOTICE */}
        <div className="text-center pt-2">
          <p className="text-[10px] text-slate-600 font-medium">
            {getUIText('prototypeFooter', selectedLanguage)}
          </p>
        </div>
      </div>
    </div>
  );
};
