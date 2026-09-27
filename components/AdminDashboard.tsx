'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { AdminStore } from '@/lib/adminStore';
import { LearnerAdminRecord, LearnerStatus } from '@/types/skillbridge';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Award,
  BookOpen,
  ArrowLeft,
  LogOut,
  Download,
  Plus,
  Phone,
  MapPin,
  Briefcase,
  ChevronRight,
  TrendingUp,
  Shield,
  X,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Send,
  Zap,
  Fingerprint,
  Check,
  GraduationCap,
  Building2
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { setStage, profile, mobileNumber, careerGoal, roadmap } = useSkillBridge();
  
  const [learners, setLearners] = useState<LearnerAdminRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedTrack, setSelectedTrack] = useState<string>('All');
  const [selectedLearner, setSelectedLearner] = useState<LearnerAdminRecord | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // New learner form state
  const [newLearnerName, setNewLearnerName] = useState<string>('');
  const [newLearnerMobile, setNewLearnerMobile] = useState<string>('');
  const [newLearnerJob, setNewLearnerJob] = useState<string>('');
  const [newLearnerGoal, setNewLearnerGoal] = useState<string>('Solar PV Specialist');
  const [newLearnerLocation, setNewLearnerLocation] = useState<string>('Chennai, Tamil Nadu');

  // Load and sync learners on mount
  useEffect(() => {
    // If active profile exists in app, sync it
    if (profile.name || mobileNumber) {
      AdminStore.syncActiveProfile(profile, mobileNumber, careerGoal, roadmap);
    }
    const data = AdminStore.getLearners();
    setLearners(data);
  }, [profile, mobileNumber, careerGoal, roadmap]);

  const showToast = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => {
      setNotificationMsg(null);
    }, 3200);
  };

  // Metrics computation
  const metrics = useMemo(() => {
    const total = learners.length;
    const active = learners.filter(l => l.status === 'Active Learning').length;
    const certified = learners.filter(l => l.status === 'Completed & Certified').length;
    const inProgress = learners.filter(l => l.status === 'Milestone In-Progress' || l.status === 'Onboarding').length;
    const avgProgress = total > 0 
      ? Math.round(learners.reduce((acc, l) => acc + l.progressPercent, 0) / total) 
      : 0;

    return {
      totalDisplay: total + 1280, // Representative aggregate institutional scale
      batchTotal: total,
      active,
      certified,
      inProgress,
      avgProgress
    };
  }, [learners]);

  // Unique tracks
  const tracks = useMemo(() => {
    const list = Array.from(new Set(learners.map(l => l.whatTheyAreLearning.split('&')[0].trim())));
    return ['All', ...list];
  }, [learners]);

  // Filtered learners with robust Serial ID support
  const filteredLearners = useMemo(() => {
    const cleanQ = searchQuery.toLowerCase().replace(/[^a-z0-9]/g, '');

    return learners.filter(l => {
      const cleanId = (l.serialId || l.id).toLowerCase().replace(/[^a-z0-9]/g, '');
      const matchesSerialId = cleanQ.length > 0 && cleanId.includes(cleanQ);

      const matchesSearch = 
        !searchQuery.trim() ||
        matchesSerialId ||
        l.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.serialId && l.serialId.toLowerCase().includes(searchQuery.toLowerCase())) ||
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.mobile.includes(searchQuery) ||
        l.whatTheyAreLearning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.currentJob.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.caste && l.caste.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = selectedStatus === 'All' || l.status === selectedStatus;
      const matchesTrack = selectedTrack === 'All' || l.whatTheyAreLearning.toLowerCase().includes(selectedTrack.toLowerCase());

      return matchesSearch && matchesStatus && matchesTrack;
    });
  }, [learners, searchQuery, selectedStatus, selectedTrack]);

  // Detected exact or direct Serial ID match
  const serialMatchLearner = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const cleanQ = searchQuery.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    if (cleanQ.length < 2) return null;
    return learners.find(l => {
      const cleanId = (l.serialId || l.id).toLowerCase().replace(/[^a-z0-9]/g, '');
      return cleanId === cleanQ || cleanId.endsWith(cleanQ) || (l.serialId && l.serialId.toLowerCase() === searchQuery.trim().toLowerCase());
    }) || null;
  }, [learners, searchQuery]);

  const handleStatusChange = (learnerId: string, newStatus: LearnerStatus) => {
    const updated = AdminStore.updateLearnerStatus(learnerId, newStatus);
    setLearners(updated);
    if (selectedLearner && selectedLearner.id === learnerId) {
      setSelectedLearner(prev => prev ? { ...prev, status: newStatus } : null);
    }
    showToast(`Updated status for ${learners.find(l => l.id === learnerId)?.name} to "${newStatus}"`);
  };

  const handleAddLearner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLearnerName.trim()) return;

    const created = AdminStore.addLearner({
      name: newLearnerName.trim(),
      mobile: newLearnerMobile.trim() || '+91 98000 00000',
      age: '22',
      location: newLearnerLocation,
      education: '12th Pass / Vocational',
      currentJob: newLearnerJob.trim() || 'Worker',
      whatTheyAreLearning: newLearnerGoal,
      alignedGovtScheme: 'National Skilling Mission / PMKVY 4.0',
      currentModule: 'Step 1/5: Foundational Skill Bridge Module',
      progressPercent: 20,
      status: 'Active Learning',
      preferredLanguage: 'English / Regional',
      skills: ['Fundamental aptitude', 'Hands-on practice'],
      newSkills: ['Domain technical mastery', 'Safety certifications'],
      totalSteps: 5,
      completedSteps: 1,
      roadmapSteps: [
        { title: 'Foundational Skill Principles', duration: '3 weeks', badge: 'Foundation', isCompleted: true },
        { title: 'Core Technical Workshop', duration: '4 weeks', badge: 'Core Skill', isCompleted: false },
        { title: 'Hands-on Practical Lab', duration: '4 weeks', badge: 'Hands-on Lab', isCompleted: false },
        { title: 'Govt Regulatory Assessment', duration: '2 weeks', badge: 'Govt Certification', isCompleted: false },
        { title: 'Industry Apprenticeship', duration: '6 weeks', badge: 'Launch', isCompleted: false }
      ]
    });

    setLearners(AdminStore.getLearners());
    setShowAddModal(false);
    setNewLearnerName('');
    setNewLearnerMobile('');
    setNewLearnerJob('');
    showToast(`Added new learner "${created.name}" to batch!`);
  };

  const handleExportCSV = () => {
    AdminStore.exportLearnersCSV(learners);
    showToast('Exported learners dataset to CSV');
  };

  const getStatusBadge = (status: LearnerStatus) => {
    switch (status) {
      case 'Active Learning':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sb-soft-mint text-sb-teal border border-sb-teal/30">
            <span className="w-1.5 h-1.5 rounded-full bg-sb-teal animate-pulse" />
            <span>Active Learning</span>
          </span>
        );
      case 'Completed & Certified':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sb-lavender text-sb-indigo border border-sb-blue/30">
            <CheckCircle2 className="w-3 h-3 text-sb-blue" />
            <span>Certified</span>
          </span>
        );
      case 'Milestone In-Progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-300">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>In-Progress</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-300">
            <span>Onboarding</span>
          </span>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-sb-light-bg text-slate-900 overflow-y-auto relative font-sans">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {notificationMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-12 left-1/2 -translate-x-1/2 z-50 bg-sb-navy text-white text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-sb-blue/30"
          >
            <Sparkles className="w-4 h-4 text-sb-mint" />
            <span>{notificationMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Admin Navigation Bar */}
      <div className="bg-sb-navy text-white px-4 py-3 border-b border-sb-indigo/40 sticky top-0 z-30 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setStage('mobile')}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Return to Learner App"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-sb-signature flex items-center justify-center font-bold text-white shadow-sm">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight text-white leading-tight">
                  Admin Analytics Portal
                </h1>
                <p className="text-[10px] text-sb-mint font-medium">
                  National Skilling Supervisor View
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleExportCSV}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download CSV of all learners"
            >
              <Download className="w-3.5 h-3.5 text-sb-mint" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button
              onClick={() => setStage('admin_login')}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-rose-950 text-slate-300 hover:text-rose-300 transition-colors cursor-pointer"
              title="Sign out from Admin Panel"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 space-y-4">
        
        {/* KPI / Aggregate Overview Cards */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Card 1: Total Enrolled */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider">Total Learners</span>
              <div className="w-7 h-7 rounded-lg bg-sb-soft-mint text-sb-teal flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 tracking-tight">
                {metrics.totalDisplay.toLocaleString()}
              </div>
              <p className="text-[10px] text-sb-teal font-medium mt-0.5 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>{metrics.batchTotal} enrolled in active batch</span>
              </p>
            </div>
          </div>

          {/* Card 2: Active Learners */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider">Active Learning</span>
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 tracking-tight">
                {metrics.active}
              </div>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                {Math.round((metrics.active / (metrics.batchTotal || 1)) * 100)}% active upskilling rate
              </p>
            </div>
          </div>

          {/* Card 3: Certified Learners */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider">Certified</span>
              <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 tracking-tight">
                {metrics.certified}
              </div>
              <p className="text-[10px] text-teal-700 font-medium mt-0.5">
                Govt NSQF certification issued
              </p>
            </div>
          </div>

          {/* Card 4: Avg Progress */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider">Avg Progress</span>
              <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 tracking-tight">
                {metrics.avgProgress}%
              </div>
              <p className="text-[10px] text-purple-700 font-medium mt-0.5">
                Across 5 milestone roadmaps
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 1: CANDIDATE SERIAL ID LOOKUP BAR */}
        <div className="bg-gradient-to-r from-[#10152E] via-[#24135F] to-[#10152E] text-white p-4 rounded-3xl shadow-lg border border-[#3159E8]/35 relative overflow-hidden">
          {/* Subtle ambient glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#3159E8]/20 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#62E6C8]">
              <Fingerprint className="w-4 h-4 text-[#62E6C8]" />
              <span>Candidate Serial ID Lookup</span>
            </div>
            <span className="text-[10px] text-slate-300 font-mono bg-white/10 px-2 py-0.5 rounded border border-white/15">
              Format: [State]-[District]-[Number]
            </span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Serial ID (e.g. TN-32-101) or candidate name..."
              className="w-full h-11 pl-10 pr-24 bg-white/10 border border-white/20 rounded-xl text-xs font-mono font-bold text-white placeholder:text-slate-400 placeholder:font-sans focus:outline-none focus:ring-2 focus:ring-[#3159E8] focus:bg-[#10152E] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-20 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => {
                if (serialMatchLearner) setSelectedLearner(serialMatchLearner);
              }}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#3159E8] to-[#13B8B2] hover:opacity-95 text-white font-sans font-bold text-xs shadow-xs active:scale-95 cursor-pointer"
            >
              Lookup
            </button>
          </div>

          {/* Quick Clickable Serial ID Chips */}
          <div className="mt-2.5 flex items-center gap-1.5 flex-wrap text-[11px]">
            <span className="text-slate-400 text-[10px] font-sans">Quick ID Test:</span>
            {[
              { label: 'TN-32-101 (Candidate)', id: 'TN-32-101' },
              { label: 'KA-01-102 (Priya)', id: 'KA-01-102' },
              { label: 'GJ-05-103 (Ramesh)', id: 'GJ-05-103' },
              { label: 'UP-32-106 (Sunita)', id: 'UP-32-106' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setSearchQuery(item.id)}
                className={`px-2 py-0.5 rounded-md font-mono text-[10px] transition-all cursor-pointer ${
                  searchQuery.toUpperCase().includes(item.id)
                    ? 'bg-[#62E6C8] text-[#10152E] font-bold shadow-xs'
                    : 'bg-white/10 hover:bg-white/20 text-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 2: DIRECT CANDIDATE SERIAL ID DOSSIER CARD (WHEN SERIAL ID IS SEARCHED) */}
        <AnimatePresence>
          {serialMatchLearner && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="bg-white rounded-3xl p-5 border-2 border-[#3159E8] shadow-xl relative overflow-hidden"
            >
              {/* Dossier Header */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="flex items-center gap-1 text-[11px] font-bold text-[#13B8B2] bg-[#E4FAF5] px-2.5 py-1 rounded-full border border-[#13B8B2]/30 shrink-0">
                    <Fingerprint className="w-3.5 h-3.5 text-[#13B8B2]" />
                    <span>Citizen Record Matched</span>
                  </span>
                  <span className="font-mono text-sm font-black bg-[#10152E] text-[#62E6C8] px-2.5 py-0.5 rounded-lg border border-[#3159E8]/40 tracking-wider shrink-0">
                    {serialMatchLearner.serialId || serialMatchLearner.id}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {getStatusBadge(serialMatchLearner.status)}
                  <button
                    onClick={() => setSelectedLearner(serialMatchLearner)}
                    className="text-xs font-bold text-[#3159E8] hover:text-[#24135F] bg-[#EEEAFE] px-2.5 py-1 rounded-lg border border-[#3159E8]/30 flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Open Modal</span>
                  </button>
                </div>
              </div>

              {/* Candidate Bio Bar */}
              <div className="mt-4 flex items-start justify-between gap-3 min-w-0">
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#24135F] via-[#3159E8] to-[#13B8B2] text-white font-black text-xl flex items-center justify-center shadow-md shadow-[#3159E8]/20 shrink-0 border border-[#62E6C8]/30">
                    {serialMatchLearner.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-black text-lg text-[#10152E] leading-tight break-words">
                      {serialMatchLearner.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 flex-wrap font-medium">
                      <span className="flex items-center gap-1 font-semibold text-slate-800 shrink-0">
                        <Phone className="w-3 h-3 text-[#3159E8]" />
                        <span>{serialMatchLearner.mobile}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 shrink-0">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{serialMatchLearner.location}</span>
                      </span>
                      <span>•</span>
                      <span className="shrink-0">Age {serialMatchLearner.age}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Complete Person Data Grid */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/90 text-xs">
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">State & District</span>
                  <span className="font-bold text-[#10152E] break-words">
                    {serialMatchLearner.stateCode || 'TN'} - Dist {serialMatchLearner.districtCode || '32'}
                  </span>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Caste / Category</span>
                  <span className="font-bold text-[#13B8B2] bg-[#E4FAF5] px-2 py-0.5 rounded-full inline-block border border-[#13B8B2]/30 mt-0.5 break-words">
                    {serialMatchLearner.caste || 'OBC'}
                  </span>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Family Occupation</span>
                  <span className="font-bold text-[#10152E] break-words">
                    {serialMatchLearner.familyJob || 'Farming'}
                  </span>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Family Income</span>
                  <span className="font-bold text-[#10152E] break-words">
                    {serialMatchLearner.familyIncome || '₹10,000 – ₹20,000'}
                  </span>
                </div>
                <div className="col-span-2 min-w-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Education Background</span>
                  <span className="font-bold text-[#10152E] break-words">
                    {serialMatchLearner.education}
                  </span>
                </div>
                <div className="col-span-2 min-w-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Background Current Job</span>
                  <span className="font-bold text-[#10152E] break-words">
                    {serialMatchLearner.currentJob}
                  </span>
                </div>
              </div>

              {/* Learning Track & Scheme */}
              <div className="mt-3.5 p-3.5 rounded-2xl bg-gradient-to-r from-[#EEEAFE]/70 via-[#E4FAF5]/70 to-[#EEEAFE]/70 border border-[#3159E8]/20 flex flex-col gap-2 min-w-0">
                <div className="flex items-center justify-between text-xs flex-wrap gap-1">
                  <span className="text-[10px] uppercase font-bold text-[#3159E8] tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Target Learning Track</span>
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Enrolled: {serialMatchLearner.enrolledDate} • Active {serialMatchLearner.lastActive}
                  </span>
                </div>
                <h4 className="font-extrabold text-sm text-[#10152E] break-words">
                  {serialMatchLearner.whatTheyAreLearning}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-700 bg-white/80 p-2 rounded-xl border border-slate-200/80 min-w-0">
                  <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="font-semibold text-slate-600 shrink-0">Aligned Scheme:</span>
                  <span className="font-bold text-[#10152E] truncate min-w-0">{serialMatchLearner.alignedGovtScheme}</span>
                </div>

                {/* Progress Bar */}
                <div className="mt-1 pt-2 border-t border-slate-200/60">
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Course Progress ({serialMatchLearner.completedSteps || 0}/{serialMatchLearner.totalSteps || 5} Milestones)</span>
                    <span className="text-[#3159E8] font-black">{serialMatchLearner.progressPercent}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200/70 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#24135F] via-[#3159E8] via-[#13B8B2] to-[#62E6C8] rounded-full transition-all duration-500"
                      style={{ width: `${serialMatchLearner.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* 5-Milestone Roadmap Details */}
              {serialMatchLearner.roadmapSteps && serialMatchLearner.roadmapSteps.length > 0 && (
                <div className="mt-3.5">
                  <h5 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#3159E8]" />
                    <span>Roadmap Milestones Details</span>
                  </h5>
                  <div className="flex flex-col gap-1.5">
                    {serialMatchLearner.roadmapSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 text-xs transition-all flex-wrap sm:flex-nowrap ${
                          step.isCompleted
                            ? 'bg-[#E4FAF5]/70 border-[#13B8B2]/30 text-slate-900 font-semibold'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          {step.isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-[#13B8B2] shrink-0" />
                          ) : (
                            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                          )}
                          <span className="truncate">{step.title}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                          <span className="text-[10px] text-slate-400">{step.duration}</span>
                          {step.badge && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#EEEAFE] text-[#24135F] border border-[#3159E8]/20">
                              {step.badge}
                            </span>
                          )}
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${step.isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                            {step.isCompleted ? 'Done' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Profile */}
              <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Prior Foundation Skills</span>
                  <div className="flex flex-wrap gap-1">
                    {serialMatchLearner.skills.map((s, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[11px] font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-[#3159E8] block mb-1.5">New Skills Being Acquired</span>
                  <div className="flex flex-wrap gap-1">
                    {serialMatchLearner.newSkills.map((s, idx) => (
                      <span key={idx} className="bg-[#EEEAFE] text-[#24135F] px-2 py-0.5 rounded-md text-[11px] font-semibold border border-[#3159E8]/20">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Direct Admin Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Change Status:</span>
                  {(['Active Learning', 'Completed & Certified', 'Milestone In-Progress'] as LearnerStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(serialMatchLearner.id, st)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                        serialMatchLearner.status === st
                          ? 'bg-[#24135F] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st === 'Completed & Certified' ? 'Certified' : st.replace(' Learning', '')}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => showToast(`Simulated SMS notification sent to ${serialMatchLearner.mobile}`)}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#24135F] to-[#3159E8] hover:opacity-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                >
                  <Send className="w-3.5 h-3.5 text-[#62E6C8]" />
                  <span>Send SMS Reminder</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Header with Add Learner Button & Status Filters */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Learners Directory & Status
            </h2>
            <p className="text-xs text-slate-500">
              Showing {filteredLearners.length} registered candidates
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3 py-1.5 rounded-xl bg-sb-signature-h hover:opacity-95 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Learner</span>
          </button>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {['All', 'Active Learning', 'Completed & Certified', 'Milestone In-Progress'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedStatus === st
                  ? 'bg-sb-navy text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {st === 'Completed & Certified' ? 'Certified' : st}
            </button>
          ))}
        </div>

        {/* Learner Cards List */}
        <div className="space-y-3">
          {filteredLearners.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
              <Users className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-semibold text-slate-700">No learners match your filter</p>
              <p className="text-xs text-slate-400 mt-1">Try clearing your search query or status filter.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedStatus('All'); setSelectedTrack('All'); }}
                className="mt-3 text-xs font-semibold text-sb-blue hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredLearners.map((learner) => (
              <motion.div
                key={learner.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs hover:border-sb-blue/40 transition-all cursor-pointer"
                onClick={() => setSelectedLearner(learner)}
              >
                {/* Header: Name, Mobile, Status */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-sb-ai text-white font-bold text-sm flex items-center justify-center shadow-xs shrink-0">
                      {learner.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="font-bold text-sm text-slate-900 leading-tight break-words">
                          {learner.name}
                        </h3>
                        <span className="text-[10px] font-mono font-bold bg-[#10152E] text-[#62E6C8] px-1.5 py-0.5 rounded border border-[#3159E8]/30 tracking-wider shrink-0">
                          {learner.serialId || learner.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5 flex-wrap">
                        <span className="flex items-center gap-1 shrink-0">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{learner.mobile}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 shrink-0">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{learner.location.split(',')[0]}</span>
                        </span>
                        {learner.caste && (
                          <>
                            <span>•</span>
                            <span className="text-[10px] font-bold text-[#13B8B2] bg-[#E4FAF5] px-1.5 py-0.2 rounded border border-[#13B8B2]/30 shrink-0">
                              {learner.caste}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {getStatusBadge(learner.status)}
                  </div>
                </div>

                {/* What they are learning (Course & Scheme) */}
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs flex-wrap gap-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Learning Pathway:
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Active {learner.lastActive}
                    </span>
                  </div>
                  <div className="font-bold text-sm text-sb-indigo mt-0.5 flex items-center gap-1.5 min-w-0">
                    <Sparkles className="w-3.5 h-3.5 text-sb-blue shrink-0" />
                    <span className="break-words">{learner.whatTheyAreLearning}</span>
                  </div>

                  {/* Current Module */}
                  <div className="text-xs text-slate-600 mt-1 bg-slate-50 p-2 rounded-xl border border-slate-200/60 break-words">
                    <span className="font-semibold text-slate-700">Current Module: </span>
                    <span>{learner.currentModule}</span>
                  </div>

                  {/* Aligned Scheme */}
                  <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1 min-w-0">
                    <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="truncate min-w-0">{learner.alignedGovtScheme}</span>
                  </p>
                </div>

                {/* Progress Bar & View Details */}
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-600">Course Progress</span>
                      <span className="text-sb-blue font-bold">{learner.progressPercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sb-signature-h rounded-full transition-all duration-500"
                        style={{ width: `${learner.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLearner(learner);
                    }}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-sb-lavender text-slate-600 hover:text-sb-indigo transition-colors shrink-0 cursor-pointer"
                    title="View Learner Details"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

      </div>

      {/* DETAILED LEARNER INSPECTION MODAL */}
      <AnimatePresence>
        {selectedLearner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-md max-h-[85vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200"
            >
              {/* Modal Header */}
              <div className="bg-sb-navy text-white p-4 flex items-center justify-between border-b border-sb-indigo/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sb-signature text-white font-bold flex items-center justify-center shadow-sm">
                    {selectedLearner.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white leading-tight">
                      {selectedLearner.name}
                    </h3>
                    <p className="text-xs text-[#62E6C8] font-mono font-bold flex items-center gap-1.5 mt-0.5">
                      <span className="bg-[#10152E] px-1.5 py-0.5 rounded border border-[#62E6C8]/30">
                        {selectedLearner.serialId || selectedLearner.id}
                      </span>
                      <span className="text-slate-300 font-sans font-normal">
                        • Enrolled {selectedLearner.enrolledDate}
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedLearner(null)}
                  className="w-8 h-8 rounded-full bg-white/10 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 overflow-y-auto space-y-4 text-xs">
                
                {/* Status Switcher */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <span className="block font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-2">
                    Update Learner Status
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['Active Learning', 'Completed & Certified', 'Milestone In-Progress'] as LearnerStatus[]).map((st) => (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(selectedLearner.id, st)}
                        className={`py-1.5 px-2 rounded-xl font-semibold text-[11px] text-center transition-all cursor-pointer ${
                          selectedLearner.status === st
                            ? 'bg-sb-signature text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {st === 'Completed & Certified' ? 'Certified' : st.replace(' Learning', '')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Candidate Overview & Contact */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-[10px]">
                    Candidate Full Profile & Background
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Candidate Serial ID</span>
                      <span className="font-mono font-bold text-sb-blue text-xs">{selectedLearner.serialId || selectedLearner.id}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Mobile</span>
                      <span className="font-semibold text-slate-800">{selectedLearner.mobile}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">State & Location</span>
                      <span className="font-semibold text-slate-800">{selectedLearner.location}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Caste / Social Category</span>
                      <span className="font-bold text-[#13B8B2] text-xs bg-[#E4FAF5] px-1.5 py-0.2 rounded border border-[#13B8B2]/30 inline-block">
                        {selectedLearner.caste || 'OBC'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Age & Education</span>
                      <span className="font-semibold text-slate-800">{selectedLearner.age} yrs • {selectedLearner.education}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Current Job</span>
                      <span className="font-semibold text-slate-800">{selectedLearner.currentJob}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Family Occupation</span>
                      <span className="font-semibold text-slate-800">{selectedLearner.familyJob || 'Farming / Trade'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Monthly Family Income</span>
                      <span className="font-semibold text-slate-800">{selectedLearner.familyIncome || '₹10,000 – ₹20,000'}</span>
                    </div>
                  </div>
                </div>

                {/* Course Track & Current Step */}
                <div className="bg-sb-lavender/50 p-3.5 rounded-2xl border border-sb-blue/20 space-y-2">
                  <h4 className="font-bold text-sb-indigo text-xs uppercase tracking-wider text-[10px]">
                    What They Are Learning
                  </h4>
                  <div className="text-sm font-bold text-slate-900">
                    {selectedLearner.whatTheyAreLearning}
                  </div>
                  <div className="text-xs text-slate-700">
                    <span className="font-semibold">Scheme: </span>
                    <span>{selectedLearner.alignedGovtScheme}</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-sb-blue/15">
                    <div className="flex items-center justify-between font-semibold text-xs mb-1">
                      <span className="text-slate-800">Total Progress</span>
                      <span className="text-sb-blue font-bold">{selectedLearner.progressPercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sb-signature-h rounded-full"
                        style={{ width: `${selectedLearner.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Roadmap Milestones Breakdown */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-[10px]">
                    5-Milestone Roadmap Status
                  </h4>
                  <div className="space-y-1.5">
                    {selectedLearner.roadmapSteps && selectedLearner.roadmapSteps.length > 0 ? (
                      selectedLearner.roadmapSteps.map((step, idx) => (
                        <div
                          key={idx}
                          className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                            step.isCompleted
                              ? 'bg-sb-soft-mint border-sb-teal/30 text-slate-800'
                              : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {step.isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-sb-teal shrink-0" />
                            ) : (
                              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                            )}
                            <div>
                              <span className="font-medium line-clamp-1">{step.title}</span>
                              <span className="text-[10px] text-slate-400">{step.duration}</span>
                            </div>
                          </div>
                          {step.badge && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-sb-lavender text-sb-indigo border border-sb-blue/20 shrink-0">
                              {step.badge}
                            </span>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-slate-400 text-xs p-2">
                        {selectedLearner.currentModule}
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Admin Action: Send SMS Alert */}
                <button
                  onClick={() => showToast(`Simulated SMS notification sent to ${selectedLearner.mobile}`)}
                  className="w-full py-2.5 px-4 rounded-xl bg-sb-signature hover:opacity-95 text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5 text-sb-mint" />
                  <span>Send Milestone SMS Reminder</span>
                </button>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD NEW LEARNER MODAL */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
            >
              <div className="bg-sb-navy text-white p-4 flex items-center justify-between border-b border-sb-indigo/40">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-sb-mint" />
                  <h3 className="font-bold text-base">Add Learner to Batch</h3>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="w-8 h-8 rounded-full bg-white/10 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddLearner} className="p-4 space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Learner Full Name
                  </label>
                  <input
                    type="text"
                    value={newLearnerName}
                    onChange={(e) => setNewLearnerName(e.target.value)}
                    placeholder="e.g. Suresh Kumar"
                    required
                    autoFocus
                    className="w-full h-10 px-3 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-sb-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    value={newLearnerMobile}
                    onChange={(e) => setNewLearnerMobile(e.target.value)}
                    placeholder="+91 98765 00000"
                    className="w-full h-10 px-3 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-sb-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Current Job / Prior Background
                  </label>
                  <input
                    type="text"
                    value={newLearnerJob}
                    onChange={(e) => setNewLearnerJob(e.target.value)}
                    placeholder="e.g. Assistant Wireman, Auto Driver, Student"
                    className="w-full h-10 px-3 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-sb-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    What They Are Learning (Target Pathway)
                  </label>
                  <select
                    value={newLearnerGoal}
                    onChange={(e) => setNewLearnerGoal(e.target.value)}
                    className="w-full h-10 px-3 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-sb-blue focus:outline-none"
                  >
                    <option value="Solar PV Specialist & Rooftop Installation">Solar PV Specialist (Suryamitra)</option>
                    <option value="Full Stack Web Developer & Cloud APIs">Full Stack Web Developer (NASSCOM)</option>
                    <option value="Modern Agri-Tech & Kisan Drone Remote Pilot">Agri-Tech & Kisan Drone Pilot (SMAM)</option>
                    <option value="Licensed Industrial Electrician & Wiring">Licensed Industrial Electrician (PMKVY)</option>
                    <option value="Custom Fashion Boutique & Social Selling">Fashion Boutique & Apparel (PM Vishwakarma)</option>
                    <option value="Fleet Telematics & Logistics Warehouse">Logistics & Fleet Operations (LSC)</option>
                    <option value="Digital Marketing & Local Business SEO">Digital Marketing & SEO (Skill India)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Location / State
                  </label>
                  <input
                    type="text"
                    value={newLearnerLocation}
                    onChange={(e) => setNewLearnerLocation(e.target.value)}
                    placeholder="e.g. Chennai, Tamil Nadu"
                    className="w-full h-10 px-3 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-sb-blue focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-sb-signature-h hover:opacity-95 text-white font-semibold cursor-pointer shadow-sm"
                  >
                    Enroll Learner
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
