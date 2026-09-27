'use client';

import React from 'react';
import { useSkillBridge } from '@/context/SkillBridgeContext';
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
    profile.skills.length > 0,
    profile.travelRadius
  ].filter(Boolean).length;
  const profileCompleteness = Math.round((profileFieldsFilled / 9) * 100);

  // Determine Primary CTA "Your Next Best Step"
  const getNextBestStep = () => {
    if (!roadmap) {
      return {
        title: 'Choose Your Career Aspiration',
        subtitle: 'Select or speak your dream profession to generate your AI roadmap.',
        actionLabel: 'Select Career Goal',
        action: () => setStage('career_goal'),
        icon: Compass,
        accent: 'from-[#24135F] via-[#3159E8] to-[#13B8B2]'
      };
    }

    const enrolledTraining = trainingPrograms.find(t => t.isEnrolled);
    if (!enrolledTraining) {
      return {
        title: isSelfEmployment ? 'Review PM-AJAY Enterprise Grant' : 'Enroll in Recommended Training',
        subtitle: isSelfEmployment
          ? '₹50,000 direct capital grant + ₹15,000 PM Vishwakarma equipment voucher available.'
          : 'Suryamitra batch at Guindy Hub has 8 seats remaining (100% Free under PM-AJAY).',
        actionLabel: isSelfEmployment ? 'Explore Enterprise Hub' : 'Enroll in Training (Zero Fee)',
        action: () => setActiveTab('opportunities'),
        icon: isSelfEmployment ? Store : GraduationCap,
        accent: 'from-[#24135F] via-[#3159E8] to-[#62E6C8]'
      };
    }

    const appliedJob = opportunities.find(o => o.applicationStatus === 'Applied' || o.applicationStatus === 'Interview Scheduled');
    if (!appliedJob && !isSelfEmployment) {
      return {
        title: 'Apply to Matched Local Jobs',
        subtitle: 'SunPower Solutions has a verified vacancy matching your skills within 6.4 km.',
        actionLabel: 'View Matched Opportunities',
        action: () => setActiveTab('opportunities'),
        icon: Briefcase,
        accent: 'from-[#3159E8] to-[#13B8B2]'
      };
    }

    if (appliedJob?.applicationStatus === 'Interview Scheduled') {
      return {
        title: 'Prepare for Upcoming Interview',
        subtitle: `Scheduled with ${appliedJob.organization} on ${appliedJob.interviewDate || '03 Oct'} (${appliedJob.interviewTime || '10:30 AM'}).`,
        actionLabel: 'View Placement Details',
        action: () => setActiveTab('opportunities'),
        icon: Award,
        accent: 'from-[#13B8B2] to-[#62E6C8]'
      };
    }

    return {
      title: 'Continue Milestone 3 Practical Lab',
      subtitle: 'Hands-on Rooftop & Ground Mount Installation module in progress.',
      actionLabel: 'Open Skill Roadmap',
      action: () => setActiveTab('roadmap'),
      icon: Zap,
      accent: 'from-[#24135F] via-[#3159E8] to-[#13B8B2]'
    };
  };

  const nextStep = getNextBestStep();

  const handleReadNextStep = () => {
    const text = `${nextStep.title}. ${nextStep.subtitle}`;
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
            <span className="text-[11px] font-semibold text-[#62E6C8]">PM-AJAY Livelihood Assistant</span>
          </div>

          <span className="text-[11px] font-mono font-bold text-white bg-[#10152E] px-2.5 py-1 rounded-full border border-[#62E6C8]/40">
            {profile.serialId || 'TN-32-101'}
          </span>
        </div>

        {/* Beneficiary Name & Title */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">
              Vanakkam, {profile.name ? profile.name.split(' ')[0] : 'Beneficiary'}!
            </h1>
            <p className="text-xs text-[#EEEAFE]/90 mt-0.5 font-medium flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#62E6C8]" />
              <span>{profile.district || 'Chennai'}, {profile.state || 'Tamil Nadu'}</span>
              <span className="text-slate-400">•</span>
              <span className="text-[#62E6C8] font-semibold">Radius: {profile.travelRadius || '15 km'}</span>
            </p>
          </div>

          <button
            onClick={handleReadNextStep}
            className="p-2.5 rounded-2xl bg-[#10152E]/90 hover:bg-[#24135F] text-[#62E6C8] border border-[#3159E8]/40 shadow-sm active:scale-95 transition-all cursor-pointer"
            title="Listen to next action"
            aria-label="Voice playback"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Readiness Metrics Cards */}
        <div className="grid grid-cols-3 gap-2.5 mt-4 pt-3 border-t border-white/10">
          <div className="bg-[#10152E]/60 backdrop-blur-sm p-2 rounded-xl border border-white/10 text-center">
            <span className="text-[10px] text-slate-300 font-medium block">Skill Coverage</span>
            <span className="text-base font-extrabold text-[#62E6C8]">{skillGap.coveragePercent}%</span>
            <span className="text-[9px] text-[#EEEAFE]/70 block truncate">Baseline Strength</span>
          </div>

          <div className="bg-[#10152E]/60 backdrop-blur-sm p-2 rounded-xl border border-white/10 text-center">
            <span className="text-[10px] text-slate-300 font-medium block">Profile Ready</span>
            <span className="text-base font-extrabold text-[#3159E8] bg-white px-1.5 rounded-sm">{profileCompleteness}%</span>
            <span className="text-[9px] text-[#EEEAFE]/70 block truncate">SC Priority Verified</span>
          </div>

          <div className="bg-[#10152E]/60 backdrop-blur-sm p-2 rounded-xl border border-white/10 text-center">
            <span className="text-[10px] text-slate-300 font-medium block">Matched Grants</span>
            <span className="text-base font-extrabold text-amber-300">₹50K+</span>
            <span className="text-[9px] text-[#EEEAFE]/70 block truncate">PM-AJAY Capital</span>
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
              <span>Your Next Best Step</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Action Required</span>
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
                My Livelihood Pathway
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                End-to-end journey from profile assessment to placement
              </p>
            </div>
            <button
              onClick={() => setActiveTab('roadmap')}
              className="text-[11px] text-[#3159E8] font-bold hover:underline flex items-center gap-0.5"
            >
              <span>View Roadmap</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Stepper Grid (Steps 1 to 10) */}
          <div className="grid grid-cols-5 gap-1.5 py-1">
            {[
              { num: 1, label: 'Profile' },
              { num: 2, label: 'Assess' },
              { num: 3, label: 'Skill Gap' },
              { num: 4, label: 'Training' },
              { num: 5, label: 'Enrolled' },
              { num: 6, label: 'Learning' },
              { num: 7, label: 'Certified' },
              { num: 8, label: 'Matched' },
              { num: 9, label: 'Placed' },
              { num: 10, label: 'Follow-up' }
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
            onClick={() => setActiveTab('opportunities')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-[#3159E8]/40 shadow-xs flex flex-col justify-between text-left transition-all hover:shadow-sm active:scale-98 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#3159E8] flex items-center justify-center mb-2">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Nearby Opportunities</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                {opportunities.length} jobs within {profile.travelRadius || '15 km'}
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
              <span className="text-xs font-bold text-slate-900 block">Benefit Navigator</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                PM-AJAY, PMKVY, Loans
              </span>
            </div>
          </button>

          {/* Pillar 3: Enterprise Pathway */}
          <button
            onClick={() => setActiveTab('opportunities')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-[#3159E8]/40 shadow-xs flex flex-col justify-between text-left transition-all hover:shadow-sm active:scale-98 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Enterprise Launch</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                Checklist & Toolkits
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
              <span className="text-xs font-bold text-slate-900 block">Citizen Serial ID</span>
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
              <span>Multi-Channel Access Simulation</span>
            </span>
            <span className="text-[9px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
              Low-Literacy First
            </span>
          </div>
          <p className="text-[11px] text-slate-300 mb-3">
            Experience how rural SC beneficiaries access Skill Bridge via Toll-Free IVR Phone Call or WhatsApp Voice Note.
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setActiveSimulator('ivr')}
              className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-white/10 transition-colors active:scale-95 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#62E6C8]" />
              <span>Launch IVR Call</span>
            </button>

            <button
              onClick={() => setActiveSimulator('whatsapp')}
              className="py-2.5 px-3 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#25D366]/40 transition-colors active:scale-95 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp Voice</span>
            </button>
          </div>
        </div>

        {/* PROTOTYPE TRANSPARENCY NOTICE */}
        <div className="text-center pt-2">
          <p className="text-[10px] text-slate-600 font-medium">
            Skill Bridge SIH 2026 Prototype • Aligned with Ministry of Social Justice & Empowerment (PM-AJAY)
          </p>
        </div>
      </div>
    </div>
  );
};
