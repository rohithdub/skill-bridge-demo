'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { AdminStore } from '@/lib/adminStore';
import {
  LearnerAdminRecord,
  LearnerStatus,
  CoordinationTask,
  SupportCase,
  OutcomeRecord,
  PMAJAYPlan,
  TrainingCenter,
  Opportunity
} from '@/types/skillbridge';
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
  Building2,
  Store,
  FileText,
  AlertCircle,
  Calendar,
  CheckSquare,
  RefreshCw
} from 'lucide-react';

type AdminTab = 
  | 'overview' 
  | 'beneficiaries' 
  | 'planning' 
  | 'skills' 
  | 'training' 
  | 'placements' 
  | 'enterprise' 
  | 'coordination' 
  | 'field_support' 
  | 'reports';

export const AdminDashboard: React.FC = () => {
  const { setStage, profile, mobileNumber, careerGoal, roadmap } = useSkillBridge();
  
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('overview');
  const [learners, setLearners] = useState<LearnerAdminRecord[]>([]);
  const [tasks, setTasks] = useState<CoordinationTask[]>([]);
  const [cases, setCases] = useState<SupportCase[]>([]);
  const [outcomes, setOutcomes] = useState<OutcomeRecord[]>([]);
  const [plans, setPlans] = useState<PMAJAYPlan[]>([]);
  const [centers, setCenters] = useState<TrainingCenter[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  // Beneficiary list filters
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

  // New Task form state
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskRole, setNewTaskRole] = useState<CoordinationTask['roleOwner']>('Field Officer');
  const [newTaskAssignee, setNewTaskAssignee] = useState<string>('');
  const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false);

  // New Support Case form state
  const [newCaseBeneficiary, setNewCaseBeneficiary] = useState<string>('');
  const [newCaseCategory, setNewCaseCategory] = useState<SupportCase['issueCategory']>('Beneficiary Issue');
  const [newCaseSummary, setNewCaseSummary] = useState<string>('');
  const [showAddCaseModal, setShowAddCaseModal] = useState<boolean>(false);

  // Load and sync data on mount
  useEffect(() => {
    if (profile.name || mobileNumber) {
      AdminStore.syncActiveProfile(profile, mobileNumber, careerGoal, roadmap);
    }
    setLearners(AdminStore.getLearners());
    setTasks(AdminStore.getTasks());
    setCases(AdminStore.getCases());
    setOutcomes(AdminStore.getOutcomes());
    setPlans(AdminStore.getPlans());
    setCenters(AdminStore.getCenters());
    setOpportunities(AdminStore.getOpportunities());
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

  // Detected exact Serial ID match
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
    showToast(`Updated status to "${newStatus}"`);
  };

  const handleTaskToggle = (taskId: string, currentStatus: CoordinationTask['status']) => {
    const nextStatus: CoordinationTask['status'] = currentStatus === 'Completed' ? 'In Progress' : 'Completed';
    const updated = AdminStore.updateTaskStatus(taskId, nextStatus);
    setTasks(updated);
    showToast(`Task marked as ${nextStatus}`);
  };

  const handleCaseStatusToggle = (caseId: string, currentStatus: SupportCase['status']) => {
    const nextStatus: SupportCase['status'] = currentStatus === 'Resolved' ? 'In Progress' : 'Resolved';
    const updated = AdminStore.updateCaseStatus(caseId, nextStatus, 'Status changed by supervisor.');
    setCases(updated);
    showToast(`Case marked as ${nextStatus}`);
  };

  const handleAddLearner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLearnerName.trim()) return;

    const created = AdminStore.addLearner({
      name: newLearnerName.trim(),
      mobile: newLearnerMobile.trim() || '+91 98000 00000',
      age: '22',
      location: newLearnerLocation,
      district: 'Chennai',
      state: 'Tamil Nadu',
      education: '12th Pass / Vocational',
      caste: 'SC',
      currentJob: newLearnerJob.trim() || 'Worker',
      whatTheyAreLearning: newLearnerGoal,
      alignedGovtScheme: 'PM-AJAY Skilling Mission',
      currentModule: 'Step 1/5: Foundational Skill Assessment',
      progressPercent: 20,
      status: 'Active Learning',
      preferredLanguage: 'English / Regional',
      skills: ['Fundamental aptitude', 'Hands-on practice'],
      newSkills: ['Domain technical mastery', 'Safety certifications'],
      totalSteps: 5,
      completedSteps: 1,
      travelRadius: '15 km',
      employmentPreference: 'Wage employment',
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
    showToast(`Added candidate "${created.name}" (ID: ${created.serialId})!`);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    AdminStore.addTask({
      title: newTaskTitle.trim(),
      roleOwner: newTaskRole,
      assignedTo: newTaskAssignee.trim() || 'Field Officer',
      priority: 'Medium',
      status: 'In Progress',
      dueDate: new Date().toLocaleDateString('en-CA'),
      category: 'Mobilization',
      notes: 'Task created via Institutional Coordination Center.'
    });
    setTasks(AdminStore.getTasks());
    setShowAddTaskModal(false);
    setNewTaskTitle('');
    setNewTaskAssignee('');
    showToast('Coordination task assigned!');
  };

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaseSummary.trim()) return;
    AdminStore.addCase({
      beneficiaryName: newCaseBeneficiary.trim() || 'Beneficiary',
      beneficiarySerialId: 'TN-32-101',
      mobile: '+91 98765 43210',
      issueCategory: newCaseCategory,
      summary: newCaseSummary.trim(),
      priority: 'High',
      status: 'Open',
      assignedOfficer: 'Supervisor on Duty',
      notes: ['Case reported via Field Support module.']
    });
    setCases(AdminStore.getCases());
    setShowAddCaseModal(false);
    setNewCaseSummary('');
    setNewCaseBeneficiary('');
    showToast('Support ticket logged!');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F6F8FC] text-slate-900 overflow-y-auto relative font-sans select-none pb-20">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {notificationMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-12 left-1/2 -translate-x-1/2 z-50 bg-[#10152E] text-white text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-[#3159E8]/30 max-w-sm"
          >
            <Sparkles className="w-4 h-4 text-[#62E6C8] shrink-0" />
            <span>{notificationMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Admin Bar */}
      <div className="bg-[#10152E] text-white px-4 py-3 border-b border-[#24135F] sticky top-0 z-30 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setStage('main_app')}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Return to Beneficiary View"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#24135F] to-[#3159E8] flex items-center justify-center font-bold text-white shadow-sm border border-[#62E6C8]/40">
                <Shield className="w-4 h-4 text-[#62E6C8]" />
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight text-white leading-tight">
                  PM-AJAY Implementation Hub
                </h1>
                <p className="text-[10px] text-[#62E6C8] font-medium">
                  National Livelihood Execution & Monitoring Portal
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => AdminStore.exportLearnersCSV(learners)}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Export CSV"
            >
              <Download className="w-3.5 h-3.5 text-[#62E6C8]" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button
              onClick={() => setStage('main_app')}
              className="px-2.5 py-1.5 rounded-lg bg-[#3159E8] hover:bg-[#24135F] text-white text-xs font-bold transition-colors cursor-pointer"
              title="Switch to Beneficiary App"
            >
              App View
            </button>
          </div>
        </div>

        {/* 10 Institutional Sections Tab Bar */}
        <div className="flex items-center gap-1 overflow-x-auto pt-2.5 pb-0.5 no-scrollbar text-xs">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'beneficiaries', label: 'Beneficiaries', icon: Users },
            { id: 'planning', label: 'Perspective Plans', icon: FileText },
            { id: 'skills', label: 'Skill Demand', icon: Zap },
            { id: 'training', label: 'Training Centers', icon: Building2 },
            { id: 'placements', label: 'Placements', icon: Briefcase },
            { id: 'enterprise', label: 'Enterprise Hub', icon: Store },
            { id: 'coordination', label: 'Coordination', icon: CheckSquare },
            { id: 'field_support', label: 'Field Support', icon: AlertCircle },
            { id: 'reports', label: 'Reports', icon: Download }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeAdminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id as AdminTab)}
                className={`px-3 py-1 rounded-lg font-bold text-[11px] whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#3159E8] text-white shadow-xs'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Admin Tab Content Area */}
      <div className="p-4 space-y-4">
        
        {/* ------------------------------------------------------------- */}
        {/* TAB 1: EXECUTIVE OVERVIEW */}
        {/* ------------------------------------------------------------- */}
        {activeAdminTab === 'overview' && (
          <div className="space-y-4">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[10px] font-semibold text-slate-500 uppercase block">Total Beneficiaries</span>
                <span className="text-xl font-black text-slate-900 block mt-1">1,288</span>
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
                  <TrendingUp className="w-3 h-3" />
                  <span>100% SC Target Priority</span>
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[10px] font-semibold text-slate-500 uppercase block">Active Training Seats</span>
                <span className="text-xl font-black text-[#3159E8] block mt-1">1,500</span>
                <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">
                  Across 6 PM-AJAY hubs
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[10px] font-semibold text-slate-500 uppercase block">Jobs Placed</span>
                <span className="text-xl font-black text-emerald-700 block mt-1">85% Rate</span>
                <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">
                  Avg salary ₹24,000/mo
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[10px] font-semibold text-slate-500 uppercase block">Capital Grants Disbursed</span>
                <span className="text-xl font-black text-amber-600 block mt-1">₹2.68 Cr</span>
                <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">
                  PM-AJAY 50% seed grant
                </span>
              </div>
            </div>

            {/* Quick Serial ID Search Callout */}
            <div className="bg-gradient-to-r from-[#10152E] via-[#24135F] to-[#10152E] text-white p-4 rounded-3xl shadow-lg border border-[#3159E8]/35 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-[#62E6C8] flex items-center gap-1">
                  <Fingerprint className="w-4 h-4" />
                  <span>Instant Citizen Dossier Search</span>
                </span>
                <p className="text-xs text-slate-300 mt-0.5">
                  Lookup candidate serial ID (e.g. TN-32-101) to view live roadmap, training batch, and placement outcome.
                </p>
              </div>

              <button
                onClick={() => setActiveAdminTab('beneficiaries')}
                className="px-4 py-2 rounded-xl bg-[#3159E8] hover:bg-[#62E6C8] hover:text-[#10152E] text-white font-bold text-xs shrink-0 transition-colors shadow-sm"
              >
                Open Candidate Directory
              </button>
            </div>

            {/* Recent Coordination Tasks & Alerts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white p-4 rounded-3xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-[#3159E8]" />
                    <span>Recent Coordination Tasks ({tasks.length})</span>
                  </h3>
                  <button
                    onClick={() => setActiveAdminTab('coordination')}
                    className="text-[11px] text-[#3159E8] font-bold hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-1.5">
                  {tasks.slice(0, 3).map(t => (
                    <div key={t.id} className="p-2 rounded-xl bg-[#F6F8FC] border border-slate-200 text-xs flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-800 block">{t.title}</span>
                        <span className="text-[10px] text-slate-500">{t.roleOwner} • {t.assignedTo}</span>
                      </div>
                      <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full ${
                        t.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {t.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-3xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Open Field Tickets ({cases.filter(c => c.status !== 'Resolved').length})</span>
                  </h3>
                  <button
                    onClick={() => setActiveAdminTab('field_support')}
                    className="text-[11px] text-[#3159E8] font-bold hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-1.5">
                  {cases.slice(0, 3).map(c => (
                    <div key={c.id} className="p-2 rounded-xl bg-[#F6F8FC] border border-slate-200 text-xs flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-800 block truncate max-w-[200px]">{c.summary}</span>
                        <span className="text-[10px] text-slate-500">{c.beneficiaryName} ({c.beneficiarySerialId})</span>
                      </div>
                      <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full ${
                        c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {c.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: BENEFICIARIES & SERIAL ID LOOKUP */}
        {/* ------------------------------------------------------------- */}
        {activeAdminTab === 'beneficiaries' && (
          <div className="space-y-3">
            {/* Search Bar */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Citizen Serial ID (e.g. TN-32-101), name, mobile..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#3159E8]"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="p-2 rounded-xl border border-slate-300 text-xs font-semibold"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active Learning">Active Learning</option>
                  <option value="Completed & Certified">Certified</option>
                  <option value="Milestone In-Progress">In-Progress</option>
                  <option value="Onboarding">Onboarding</option>
                </select>

                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-3 py-2 rounded-xl bg-[#24135F] text-white text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Candidate</span>
                </button>
              </div>
            </div>

            {/* Candidate List Cards */}
            <div className="space-y-2">
              {filteredLearners.map(learner => (
                <div
                  key={learner.id}
                  onClick={() => setSelectedLearner(learner)}
                  className={`bg-white rounded-2xl p-3.5 border transition-all cursor-pointer hover:border-[#3159E8] shadow-xs flex items-center justify-between ${
                    learner.serialId === 'TN-32-101' ? 'border-[#3159E8]/40 ring-1 ring-[#3159E8]/20' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#24135F] to-[#3159E8] text-white font-extrabold flex items-center justify-center text-sm shrink-0">
                      {learner.name[0]}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-extrabold text-slate-900 truncate">{learner.name}</span>
                        <span className="font-mono text-[10px] font-bold text-white bg-[#10152E] px-2 py-0.5 rounded">
                          {learner.serialId || learner.id}
                        </span>
                        <span className="text-[9.5px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded">
                          {learner.caste || 'SC'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 truncate mt-0.5">
                        {learner.currentJob} → <strong className="text-slate-800">{learner.whatTheyAreLearning}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      learner.status === 'Completed & Certified'
                        ? 'bg-emerald-100 text-emerald-800'
                        : learner.status === 'Active Learning'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {learner.status}
                    </span>
                    <span className="block text-[10px] text-slate-500 mt-1 font-mono">{learner.progressPercent}% progress</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: PM-AJAY PERSPECTIVE PLANNING (Feature 9) */}
        {/* ------------------------------------------------------------- */}
        {activeAdminTab === 'planning' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  District Perspective Implementation Plans ({plans.length})
                </h2>
                <span className="text-[10px] text-slate-600 font-medium">
                  Annual targets aligned with PM-AJAY Central Sector Guidelines
                </span>
              </div>
              <button
                onClick={() => AdminStore.exportPerspectivePlansCSV()}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1"
              >
                <Download className="w-3 h-3" />
                <span>Export Plans CSV</span>
              </button>
            </div>

            <div className="space-y-3">
              {plans.map(plan => (
                <div key={plan.id} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#3159E8] border border-blue-200">
                        {plan.planYear}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900 mt-1">
                        {plan.district}, {plan.state}
                      </h3>
                      <p className="text-xs text-slate-500">Priority Blocks: {plan.priorityBlocks.join(', ')}</p>
                    </div>

                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                      {plan.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="bg-[#F6F8FC] p-2 rounded-xl">
                      <span className="text-[10px] text-slate-500 block">Beneficiary Target:</span>
                      <span className="font-extrabold text-slate-900">{plan.targetBeneficiaries}</span>
                      <span className="text-[9.5px] text-emerald-600 block">({plan.enrolledCount} enrolled)</span>
                    </div>

                    <div className="bg-[#F6F8FC] p-2 rounded-xl">
                      <span className="text-[10px] text-slate-500 block">Training Seats:</span>
                      <span className="font-extrabold text-[#3159E8]">{plan.trainingSeatsAllocated}</span>
                      <span className="text-[9.5px] text-slate-500 block">{plan.activeCentersCount} active centers</span>
                    </div>

                    <div className="bg-[#F6F8FC] p-2 rounded-xl">
                      <span className="text-[10px] text-slate-500 block">Placement Rate:</span>
                      <span className="font-extrabold text-emerald-700">{plan.expectedPlacementRate}</span>
                      <span className="text-[9.5px] text-slate-500 block">{plan.enterpriseTarget} enterprises</span>
                    </div>

                    <div className="bg-[#F6F8FC] p-2 rounded-xl">
                      <span className="text-[10px] text-slate-500 block">Budget Disbursed:</span>
                      <span className="font-extrabold text-amber-700">{plan.budgetDisbursed}</span>
                      <span className="text-[9.5px] text-slate-500 block">of {plan.budgetAllocated}</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-700">
                    <strong className="block text-[11px] text-slate-900 mb-1">Priority Occupations:</strong>
                    <div className="flex flex-wrap gap-1">
                      {plan.priorityOccupations.map((occ, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-semibold">
                          {occ}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: LOCAL SKILL DEMAND DASHBOARD (Feature 10) */}
        {/* ------------------------------------------------------------- */}
        {activeAdminTab === 'skills' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  District Skill Demand Analytics
                </h2>
                <span className="text-[10px] text-slate-600 font-medium">
                  High-growth livelihood sectors based on demonstration dataset
                </span>
              </div>
              <span className="text-[9.5px] font-mono bg-blue-50 text-blue-800 px-2 py-0.5 rounded-full border border-blue-200">
                Prototype Analytics
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { sector: 'Solar PV & Green Energy', demand: 'High (+42%)', vacancies: '240 open', seats: '150 active', salary: '₹22,000–₹32,000' },
                { sector: 'Custom Apparel & Tailoring', demand: 'Very High (+58%)', vacancies: '180 open', seats: '120 active', salary: '₹18,000–₹30,000' },
                { sector: 'Agri-Tech & Kisan Drone', demand: 'Surging (+75%)', vacancies: '120 open', seats: '60 active', salary: '₹25,000–₹35,000' },
                { sector: 'Logistics Warehouse Operations', demand: 'Stable (+30%)', vacancies: '310 open', seats: '200 active', salary: '₹20,000–₹28,000' }
              ].map((s, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-extrabold text-slate-900">{s.sector}</h3>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {s.demand}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                    <div className="bg-[#F6F8FC] p-2 rounded-xl">
                      <span className="text-[9.5px] text-slate-500 block">Demand</span>
                      <span className="font-bold text-slate-900">{s.vacancies}</span>
                    </div>
                    <div className="bg-[#F6F8FC] p-2 rounded-xl">
                      <span className="text-[9.5px] text-slate-500 block">Training Cap</span>
                      <span className="font-bold text-[#3159E8]">{s.seats}</span>
                    </div>
                    <div className="bg-[#F6F8FC] p-2 rounded-xl">
                      <span className="text-[9.5px] text-slate-500 block">Avg Salary</span>
                      <span className="font-bold text-emerald-700 text-[10px]">{s.salary}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 5: TRAINING CENTERS & CAPACITY (Feature 11) */}
        {/* ------------------------------------------------------------- */}
        {activeAdminTab === 'training' && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Accredited Training Centers & Batches ({centers.length})
            </h2>

            <div className="space-y-3">
              {centers.map(center => (
                <div key={center.id} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">{center.centerName}</h3>
                      <p className="text-xs text-slate-500">{center.location}</p>
                    </div>
                    <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200">
                      Batch: {center.batchStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs py-1">
                    <div className="bg-[#F6F8FC] p-2 rounded-xl">
                      <span className="text-[10px] text-slate-500 block">Total Seats</span>
                      <span className="font-bold text-slate-900">{center.totalSeats}</span>
                    </div>
                    <div className="bg-[#F6F8FC] p-2 rounded-xl">
                      <span className="text-[10px] text-slate-500 block">Available</span>
                      <span className="font-bold text-emerald-700">{center.availableSeats}</span>
                    </div>
                    <div className="bg-[#F6F8FC] p-2 rounded-xl">
                      <span className="text-[10px] text-slate-500 block">Trainers</span>
                      <span className="font-bold text-slate-800 text-[10px] truncate">{center.trainerStatus.split(' ')[0]} Active</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-600 space-y-0.5">
                    <p><strong className="text-slate-800">Courses:</strong> {center.courses.join(', ')}</p>
                    <p><strong className="text-slate-800">Accessibility:</strong> {center.accessibility}</p>
                    <p><strong className="text-slate-800">Placement Linkage:</strong> {center.placementSupport}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 6: PLACEMENTS & EMPLOYER OUTCOMES (Feature 6 & 14) */}
        {/* ------------------------------------------------------------- */}
        {activeAdminTab === 'placements' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Placement Pipeline & Employer Linkage
                </h2>
                <span className="text-[10px] text-slate-600 font-medium">
                  Tracking from application to retention
                </span>
              </div>
              <button
                onClick={() => AdminStore.exportPlacementsCSV()}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1"
              >
                <Download className="w-3 h-3" />
                <span>Export Placements</span>
              </button>
            </div>

            <div className="space-y-2">
              {opportunities.map(opp => (
                <div key={opp.id} className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900">{opp.title}</h3>
                    <p className="text-[11px] text-slate-600">{opp.organization} • {opp.location}</p>
                    <span className="text-[10px] text-emerald-700 font-bold">{opp.salaryRange.split('+')[0]}</span>
                  </div>

                  <div className="text-right">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      opp.applicationStatus === 'Joined'
                        ? 'bg-emerald-100 text-emerald-800'
                        : opp.applicationStatus === 'Interview Scheduled'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {opp.applicationStatus}
                    </span>
                    {opp.interviewDate && (
                      <span className="block text-[9.5px] text-amber-800 font-medium mt-0.5">
                        Slot: {opp.interviewDate}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 7: ENTERPRISE HUB (Feature 7) */}
        {/* ------------------------------------------------------------- */}
        {activeAdminTab === 'enterprise' && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              SC Micro-Enterprise Incubation Tracking
            </h2>

            <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Shilpa Artisanal Boutique (Ananya Das - WB-02-104)
                  </h3>
                  <p className="text-xs text-slate-500">Kolkata, West Bengal • Custom Fashion & Boutique Design</p>
                </div>
                <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-lg">
                  Grant In Disbursement
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-emerald-50 p-2 rounded-xl text-emerald-900 border border-emerald-200">
                  <span className="text-[9.5px] block font-bold">PM-AJAY Capital Grant</span>
                  <span className="font-extrabold text-sm">₹50,000</span>
                  <span className="text-[9px] block">Non-repayable</span>
                </div>
                <div className="bg-blue-50 p-2 rounded-xl text-blue-900 border border-blue-200">
                  <span className="text-[9.5px] block font-bold">PM Vishwakarma Toolkit</span>
                  <span className="font-extrabold text-sm">₹15,000</span>
                  <span className="text-[9px] block">Motorized machine</span>
                </div>
                <div className="bg-purple-50 p-2 rounded-xl text-purple-900 border border-purple-200">
                  <span className="text-[9.5px] block font-bold">Mudra Micro-Credit</span>
                  <span className="font-extrabold text-sm">₹1,00,000</span>
                  <span className="text-[9px] block">@ 5% interest</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 8: COORDINATION CENTER (Feature 13) */}
        {/* ------------------------------------------------------------- */}
        {activeAdminTab === 'coordination' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Inter-Department Coordination Center ({tasks.length})
                </h2>
                <span className="text-[10px] text-slate-600 font-medium">
                  Tasks across Implementing Agency, District Officers, Centers & Field Teams
                </span>
              </div>
              <button
                onClick={() => setShowAddTaskModal(true)}
                className="px-3 py-1.5 rounded-xl bg-[#24135F] text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>New Task</span>
              </button>
            </div>

            <div className="space-y-2">
              {tasks.map(t => (
                <div
                  key={t.id}
                  onClick={() => handleTaskToggle(t.id, t.status)}
                  className={`bg-white rounded-2xl p-3.5 border transition-all cursor-pointer shadow-xs flex items-center justify-between ${
                    t.status === 'Completed' ? 'border-emerald-300 bg-emerald-50/30' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center text-xs shrink-0 ${
                      t.status === 'Completed' ? 'bg-emerald-600 text-white' : 'border border-slate-400 bg-white'
                    }`}>
                      {t.status === 'Completed' && '✓'}
                    </div>
                    <div>
                      <h4 className={`text-xs font-bold ${t.status === 'Completed' ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {t.title}
                      </h4>
                      <p className="text-[10.5px] text-slate-500">
                        Owner: <strong className="text-slate-700">{t.roleOwner}</strong> • Assignee: {t.assignedTo}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full ${
                      t.priority === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {t.priority}
                    </span>
                    <span className="block text-[9.5px] text-slate-400 mt-1 font-mono">Due: {t.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 9: FIELD SUPPORT (Feature 12) */}
        {/* ------------------------------------------------------------- */}
        {activeAdminTab === 'field_support' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Field Support & Ground Grievance Center ({cases.length})
                </h2>
                <span className="text-[10px] text-slate-600 font-medium">
                  Direct beneficiary support for documentation, mobility, or training issues
                </span>
              </div>
              <button
                onClick={() => setShowAddCaseModal(true)}
                className="px-3 py-1.5 rounded-xl bg-[#24135F] text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>New Ticket</span>
              </button>
            </div>

            <div className="space-y-2">
              {cases.map(c => (
                <div
                  key={c.id}
                  onClick={() => handleCaseStatusToggle(c.id, c.status)}
                  className={`bg-white rounded-2xl p-3.5 border transition-all cursor-pointer shadow-xs space-y-2 ${
                    c.status === 'Resolved' ? 'border-emerald-300 bg-emerald-50/30' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold bg-[#10152E] text-white px-2 py-0.5 rounded">
                          {c.id}
                        </span>
                        <span className="text-[10px] font-bold text-[#3159E8] bg-blue-50 px-2 py-0.5 rounded">
                          {c.issueCategory}
                        </span>
                      </div>
                      <h4 className="text-xs font-extrabold text-slate-900 mt-1">{c.summary}</h4>
                      <p className="text-[11px] text-slate-600">
                        Beneficiary: {c.beneficiaryName} ({c.beneficiarySerialId}) • Officer: {c.assignedOfficer}
                      </p>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {c.status}
                    </span>
                  </div>

                  {c.resolution && (
                    <div className="bg-emerald-50 p-2 rounded-xl text-[10.5px] text-emerald-900 border border-emerald-200">
                      <strong>Resolution:</strong> {c.resolution}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 10: REPORTS & EXPORT (Feature 21) */}
        {/* ------------------------------------------------------------- */}
        {activeAdminTab === 'reports' && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Institutional Reports & CSV Exports
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-2">
                <h3 className="text-xs font-bold text-slate-900">Beneficiary Master Report</h3>
                <p className="text-[11px] text-slate-500">
                  Full dataset of enrolled candidates, social category, progress, and Serial IDs.
                </p>
                <button
                  onClick={() => AdminStore.exportLearnersCSV(learners)}
                  className="w-full py-2 rounded-xl bg-[#24135F] text-white text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Beneficiaries CSV</span>
                </button>
              </div>

              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-2">
                <h3 className="text-xs font-bold text-slate-900">Placement & Employer Report</h3>
                <p className="text-[11px] text-slate-500">
                  Tracking of corporate interviews, job placements, joining dates, and wages.
                </p>
                <button
                  onClick={() => AdminStore.exportPlacementsCSV()}
                  className="w-full py-2 rounded-xl bg-[#3159E8] text-white text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Placements CSV</span>
                </button>
              </div>

              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-2">
                <h3 className="text-xs font-bold text-slate-900">District Perspective Plans</h3>
                <p className="text-[11px] text-slate-500">
                  Target figures, seat allocations, budget disbursement across all districts.
                </p>
                <button
                  onClick={() => AdminStore.exportPerspectivePlansCSV()}
                  className="w-full py-2 rounded-xl bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Perspective Plans CSV</span>
                </button>
              </div>

              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-2">
                <h3 className="text-xs font-bold text-slate-900">Printable Candidate Dossier</h3>
                <p className="text-[11px] text-slate-500">
                  Print official summary card for {profile.name || 'Candidate'} (ID: {profile.serialId || 'TN-32-101'}).
                </p>
                <button
                  onClick={() => window.print()}
                  className="w-full py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Print Dossier Card</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CANDIDATE DETAIL SLIDE-OUT MODAL */}
      <AnimatePresence>
        {selectedLearner && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-5 max-w-md w-full shadow-2xl space-y-3 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{selectedLearner.name}</h3>
                  <span className="font-mono text-xs font-bold text-white bg-[#10152E] px-2 py-0.5 rounded">
                    {selectedLearner.serialId || selectedLearner.id}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedLearner(null)}
                  className="text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <p><strong>Mobile:</strong> {selectedLearner.mobile}</p>
                <p><strong>District:</strong> {selectedLearner.location}</p>
                <p><strong>Social Category:</strong> {selectedLearner.caste || 'SC'}</p>
                <p><strong>Learning Goal:</strong> {selectedLearner.whatTheyAreLearning}</p>
                <p><strong>Scheme:</strong> {selectedLearner.alignedGovtScheme}</p>
                <p><strong>Progress:</strong> {selectedLearner.progressPercent}% ({selectedLearner.currentModule})</p>

                <div className="pt-2 border-t">
                  <label className="text-xs font-bold text-slate-700 block mb-1">Update Status:</label>
                  <div className="flex flex-wrap gap-1.5">
                    {(['Active Learning', 'Completed & Certified', 'Milestone In-Progress', 'Onboarding'] as LearnerStatus[]).map(st => (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(selectedLearner.id, st)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                          selectedLearner.status === st
                            ? 'bg-[#24135F] text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD CANDIDATE MODAL */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl space-y-3"
            >
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-sm font-extrabold text-slate-900">Add New Candidate</h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 font-bold">✕</button>
              </div>

              <form onSubmit={handleAddLearner} className="space-y-2 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block">Name:</label>
                  <input
                    type="text"
                    required
                    value={newLearnerName}
                    onChange={(e) => setNewLearnerName(e.target.value)}
                    placeholder="Candidate full name"
                    className="w-full p-2 rounded-xl border border-slate-300 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block">Mobile:</label>
                  <input
                    type="text"
                    value={newLearnerMobile}
                    onChange={(e) => setNewLearnerMobile(e.target.value)}
                    placeholder="10-digit mobile"
                    className="w-full p-2 rounded-xl border border-slate-300 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block">Current Work:</label>
                  <input
                    type="text"
                    value={newLearnerJob}
                    onChange={(e) => setNewLearnerJob(e.target.value)}
                    placeholder="e.g. Electrical Assistant"
                    className="w-full p-2 rounded-xl border border-slate-300 font-semibold"
                  />
                </div>
                <div className="flex gap-2 pt-2 border-t">
                  <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-2 rounded-xl bg-slate-100 font-bold">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 py-2 rounded-xl bg-[#3159E8] text-white font-bold">
                    Create Record
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD COORDINATION TASK MODAL */}
      <AnimatePresence>
        {showAddTaskModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl space-y-3"
            >
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-sm font-extrabold text-slate-900">New Coordination Task</h3>
                <button onClick={() => setShowAddTaskModal(false)} className="text-slate-400 font-bold">✕</button>
              </div>

              <form onSubmit={handleCreateTask} className="space-y-2 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block">Task Description:</label>
                  <input
                    type="text"
                    required
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="e.g. Allocate 30 seats for Solar batch"
                    className="w-full p-2 rounded-xl border border-slate-300 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block">Responsible Role:</label>
                  <select
                    value={newTaskRole}
                    onChange={(e) => setNewTaskRole(e.target.value as any)}
                    className="w-full p-2 rounded-xl border border-slate-300 font-semibold"
                  >
                    <option value="Corporation / Implementing Agency">Corporation / Implementing Agency</option>
                    <option value="District Officer">District Officer</option>
                    <option value="Training Coordinator">Training Coordinator</option>
                    <option value="Field Officer">Field Officer</option>
                    <option value="Placement Coordinator">Placement Coordinator</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block">Assigned Person:</label>
                  <input
                    type="text"
                    value={newTaskAssignee}
                    onChange={(e) => setNewTaskAssignee(e.target.value)}
                    placeholder="Name / Officer Title"
                    className="w-full p-2 rounded-xl border border-slate-300 font-semibold"
                  />
                </div>
                <div className="flex gap-2 pt-2 border-t">
                  <button type="button" onClick={() => setShowAddTaskModal(false)} className="flex-1 py-2 rounded-xl bg-slate-100 font-bold">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 py-2 rounded-xl bg-[#24135F] text-white font-bold">
                    Assign Task
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD FIELD TICKET MODAL */}
      <AnimatePresence>
        {showAddCaseModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl space-y-3"
            >
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-sm font-extrabold text-slate-900">Log Field Support Ticket</h3>
                <button onClick={() => setShowAddCaseModal(false)} className="text-slate-400 font-bold">✕</button>
              </div>

              <form onSubmit={handleCreateCase} className="space-y-2 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block">Beneficiary Name:</label>
                  <input
                    type="text"
                    value={newCaseBeneficiary}
                    onChange={(e) => setNewCaseBeneficiary(e.target.value)}
                    placeholder="e.g. Rohith Kumar"
                    className="w-full p-2 rounded-xl border border-slate-300 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block">Category:</label>
                  <select
                    value={newCaseCategory}
                    onChange={(e) => setNewCaseCategory(e.target.value as any)}
                    className="w-full p-2 rounded-xl border border-slate-300 font-semibold"
                  >
                    <option value="Beneficiary Issue">Beneficiary Issue</option>
                    <option value="Technical Issue">Technical Issue</option>
                    <option value="Documentation Issue">Documentation Issue</option>
                    <option value="Training Issue">Training Issue</option>
                    <option value="Accessibility Issue">Accessibility Issue</option>
                    <option value="Placement Issue">Placement Issue</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block">Summary:</label>
                  <textarea
                    required
                    value={newCaseSummary}
                    onChange={(e) => setNewCaseSummary(e.target.value)}
                    placeholder="Describe issue or support needed"
                    className="w-full p-2 rounded-xl border border-slate-300 font-semibold h-16"
                  />
                </div>
                <div className="flex gap-2 pt-2 border-t">
                  <button type="button" onClick={() => setShowAddCaseModal(false)} className="flex-1 py-2 rounded-xl bg-slate-100 font-bold">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 py-2 rounded-xl bg-[#3159E8] text-white font-bold">
                    Log Ticket
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
