'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  AppStage,
  MainAppTab,
  SupportedLanguage,
  UserProfile,
  GeneratedRoadmap,
  ConversationMessage,
  SkillGapAnalysis,
  Opportunity,
  TrainingProgram,
  EnterprisePathway,
  OfflineSyncAction,
  ApplicationStatus
} from '@/types/skillbridge';
import {
  DEMO_ROHITH_PROFILE,
  DEMO_ROHITH_GOAL,
  DEMO_ANANYA_PROFILE,
  DEMO_ANANYA_GOAL
} from '@/lib/roadmapData';
import { MockAIService } from '@/lib/mockAI';
import { SpeechService } from '@/lib/speechService';
import { SkillGapEngine } from '@/lib/skillGapEngine';
import { OpportunityService, DEMO_OPPORTUNITIES, DEMO_TRAINING_PROGRAMS } from '@/lib/opportunityData';
import { AdminStore } from '@/lib/adminStore';

interface SkillBridgeContextType {
  stage: AppStage;
  setStage: (stage: AppStage) => void;
  activeTab: MainAppTab;
  setActiveTab: (tab: MainAppTab) => void;
  selectedLanguage: SupportedLanguage;
  setSelectedLanguage: (lang: SupportedLanguage) => void;
  mobileNumber: string;
  setMobileNumber: (num: string) => void;
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  updateProfileField: (field: keyof UserProfile, value: any) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (idx: number) => void;
  careerGoal: string;
  setCareerGoal: (goal: string) => void;
  roadmap: GeneratedRoadmap | null;
  setRoadmap: React.Dispatch<React.SetStateAction<GeneratedRoadmap | null>>;
  generateAndSetRoadmap: (goal: string) => GeneratedRoadmap;
  toggleStepCompletion: (stepId: string) => void;
  conversationHistory: ConversationMessage[];
  addMessage: (sender: 'ai' | 'user', text: string) => void;
  isSpeaking: boolean;
  setIsSpeaking: (speaking: boolean) => void;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  speakText: (text: string, langOverrideOrOnEnd?: string | (() => void), maybeOnEnd?: () => void) => void;
  
  // SIH Gap-Closure Modules
  skillGap: SkillGapAnalysis;
  opportunities: Opportunity[];
  trainingPrograms: TrainingProgram[];
  enterprisePathway: EnterprisePathway | null;
  activeJourneyStep: number;
  setActiveJourneyStep: (step: number) => void;
  applyOpportunity: (oppId: string) => void;
  scheduleInterview: (oppId: string, date: string, time: string) => void;
  markOpportunityJoined: (oppId: string) => void;
  enrollTraining: (trainingId: string) => void;
  toggleTrainingModule: (trainingId: string, moduleIdx: number) => void;
  toggleEnterpriseChecklist: (checklistId: string) => void;
  
  // Offline & Low-Connectivity Support
  offlineMode: boolean;
  setOfflineMode: (offline: boolean) => void;
  syncQueue: OfflineSyncAction[];
  syncPendingActions: () => void;

  // Multi-channel Simulators
  activeSimulator: 'ivr' | 'whatsapp' | null;
  setActiveSimulator: (sim: 'ivr' | 'whatsapp' | null) => void;

  // Demo Control
  selectedScenario: 'solar' | 'tailor';
  loadScenario: (scenario: 'solar' | 'tailor') => void;
  loadDemoProfile: () => void;
  resetAll: () => void;
}

export function generateCitizenSerialId(stateCode: string = 'TN', districtCode: string = '32'): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${stateCode.toUpperCase()}-${districtCode}-${randomNum}`;
}

const DEFAULT_PROFILE: UserProfile = {
  serialId: '',
  stateCode: 'TN',
  districtCode: '32',
  name: '',
  age: '',
  mobile: '',
  state: 'Tamil Nadu',
  district: 'Chennai',
  block: 'Guindy SC Cluster',
  preferredLanguage: 'en',
  currentJob: '',
  familyJob: '',
  education: '',
  familyIncome: '',
  caste: 'SC',
  householdSituation: 'BPL Card Holder • Landless Household',
  skills: [],
  physicalLimitation: { hasLimitation: false },
  travelRadius: '15 km',
  availableLearningTime: 'Full-time (6-8 hrs/day)',
  deviceAccess: 'Smartphone',
  internetAvailability: 'Good 4G/5G',
  employmentPreference: 'Wage employment'
};

const SkillBridgeContext = createContext<SkillBridgeContextType | undefined>(undefined);

const STORAGE_KEY = 'skill_bridge_state_v5';

export const SkillBridgeProvider = ({ children }: { children: ReactNode }) => {
  const [stage, setStage] = useState<AppStage>('splash');
  const [activeTab, setActiveTab] = useState<MainAppTab>('home');
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('en');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [careerGoal, setCareerGoal] = useState<string>('');
  const [roadmap, setRoadmap] = useState<GeneratedRoadmap | null>(null);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // SIH Extended State
  const [opportunities, setOpportunities] = useState<Opportunity[]>(DEMO_OPPORTUNITIES);
  const [trainingPrograms, setTrainingPrograms] = useState<TrainingProgram[]>(DEMO_TRAINING_PROGRAMS);
  const [enterprisePathway, setEnterprisePathway] = useState<EnterprisePathway | null>(OpportunityService.getEnterprisePathway('solar'));
  const [activeJourneyStep, setActiveJourneyStep] = useState<number>(4);
  const [offlineMode, setOfflineMode] = useState<boolean>(false);
  const [syncQueue, setSyncQueue] = useState<OfflineSyncAction[]>([]);
  const [activeSimulator, setActiveSimulator] = useState<'ivr' | 'whatsapp' | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<'solar' | 'tailor'>('solar');

  // Compute skill gap dynamically based on current profile and career goal
  const skillGap: SkillGapAnalysis = React.useMemo(() => {
    return SkillGapEngine.analyze(profile, careerGoal || profile.desiredOccupation || 'Solar PV Specialist');
  }, [profile, careerGoal]);

  // Restore from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.profile) setProfile(parsed.profile);
        if (parsed.stage) setStage(parsed.stage);
        if (parsed.activeTab) setActiveTab(parsed.activeTab);
        if (parsed.selectedLanguage) setSelectedLanguage(parsed.selectedLanguage);
        if (parsed.mobileNumber) setMobileNumber(parsed.mobileNumber);
        if (parsed.careerGoal) setCareerGoal(parsed.careerGoal);
        if (parsed.roadmap) setRoadmap(parsed.roadmap);
        if (parsed.currentQuestionIndex !== undefined) setCurrentQuestionIndex(parsed.currentQuestionIndex);
        if (parsed.conversationHistory) setConversationHistory(parsed.conversationHistory);
        if (parsed.opportunities) setOpportunities(parsed.opportunities);
        if (parsed.trainingPrograms) setTrainingPrograms(parsed.trainingPrograms);
        if (parsed.enterprisePathway) setEnterprisePathway(parsed.enterprisePathway);
        if (parsed.activeJourneyStep !== undefined) setActiveJourneyStep(parsed.activeJourneyStep);
        if (parsed.syncQueue) setSyncQueue(parsed.syncQueue);
        if (parsed.selectedScenario) setSelectedScenario(parsed.selectedScenario);
      }
    } catch (e) {
      console.warn('Could not restore state from localStorage:', e);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage and sync AdminStore when state changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const stateToSave = {
        stage,
        activeTab,
        selectedLanguage,
        mobileNumber,
        profile,
        careerGoal,
        roadmap,
        currentQuestionIndex,
        conversationHistory,
        opportunities,
        trainingPrograms,
        enterprisePathway,
        activeJourneyStep,
        syncQueue,
        selectedScenario
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));

      // Synchronize with AdminStore whenever profile or roadmap changes
      if (profile.name || mobileNumber) {
        AdminStore.syncActiveProfile(profile, mobileNumber, careerGoal, roadmap);
      }
    } catch (e) {
      // ignore quota errors
    }
  }, [
    isHydrated,
    stage,
    activeTab,
    selectedLanguage,
    mobileNumber,
    profile,
    careerGoal,
    roadmap,
    currentQuestionIndex,
    conversationHistory,
    opportunities,
    trainingPrograms,
    enterprisePathway,
    activeJourneyStep,
    syncQueue,
    selectedScenario
  ]);

  const handleSetMobileNumber = (num: string) => {
    setMobileNumber(num);
    if (num.length === 10) {
      setProfile(prev => ({
        ...prev,
        mobile: num,
        serialId: prev.serialId || generateCitizenSerialId(prev.stateCode || 'TN', prev.districtCode || '32')
      }));
    }
  };

  const updateProfileField = (field: keyof UserProfile, value: any) => {
    setProfile(prev => {
      const updated = {
        ...prev,
        [field]: value
      };
      if (!updated.serialId) {
        updated.serialId = generateCitizenSerialId(updated.stateCode || 'TN', updated.districtCode || '32');
      }
      return updated;
    });

    if (offlineMode) {
      setSyncQueue(prev => [
        ...prev,
        {
          id: `sync-${Date.now()}`,
          actionType: 'UPDATE_PROFILE',
          payload: { field, value },
          timestamp: Date.now(),
          status: 'Queued'
        }
      ]);
    }
  };

  const addMessage = (sender: 'ai' | 'user', text: string) => {
    const newMessage: ConversationMessage = {
      id: `msg-${Date.now()}-${Math.random()}`,
      sender,
      text,
      timestamp: Date.now()
    };
    setConversationHistory(prev => [...prev, newMessage]);
  };

  const speakText = (text: string, langOverrideOrOnEnd?: string | (() => void), maybeOnEnd?: () => void) => {
    let langCode: string;
    let onEndCallback: (() => void) | undefined;

    if (typeof langOverrideOrOnEnd === 'string') {
      langCode = langOverrideOrOnEnd;
      onEndCallback = maybeOnEnd;
    } else {
      langCode = selectedLanguage;
      onEndCallback = langOverrideOrOnEnd;
    }

    if (!soundEnabled) {
      if (onEndCallback) setTimeout(onEndCallback, 800);
      return;
    }
    setIsSpeaking(true);
    SpeechService.speak(
      text,
      langCode,
      () => {
        setIsSpeaking(false);
        if (onEndCallback) onEndCallback();
      },
      () => {
        setIsSpeaking(false);
        if (onEndCallback) onEndCallback();
      }
    );
  };

  const generateAndSetRoadmap = (goal: string): GeneratedRoadmap => {
    const newRoadmap = MockAIService.generateRoadmap(profile, goal);
    setCareerGoal(goal);
    setRoadmap(newRoadmap);

    // Update matched opportunities & training
    const matchedOpps = OpportunityService.matchOpportunities(profile, goal);
    setOpportunities(matchedOpps);
    const matchedTrain = OpportunityService.matchTraining(profile, goal);
    setTrainingPrograms(matchedTrain);
    setEnterprisePathway(OpportunityService.getEnterprisePathway(goal));

    return newRoadmap;
  };

  const toggleStepCompletion = (stepId: string) => {
    if (!roadmap) return;
    setRoadmap(prev => {
      if (!prev) return null;
      return {
        ...prev,
        steps: prev.steps.map(s => 
          s.id === stepId ? { ...s, isCompleted: !s.isCompleted } : s
        )
      };
    });

    if (offlineMode) {
      setSyncQueue(prev => [
        ...prev,
        {
          id: `sync-${Date.now()}`,
          actionType: 'COMPLETE_STEP',
          payload: { stepId },
          timestamp: Date.now(),
          status: 'Queued'
        }
      ]);
    }
  };

  // Opportunity Workflow
  const applyOpportunity = (oppId: string) => {
    setOpportunities(prev =>
      prev.map(opp =>
        opp.id === oppId ? { ...opp, applicationStatus: 'Applied' } : opp
      )
    );
    AdminStore.updateOpportunityStatus(oppId, 'Applied');
    if (activeJourneyStep < 8) setActiveJourneyStep(8);

    if (offlineMode) {
      setSyncQueue(prev => [
        ...prev,
        {
          id: `sync-${Date.now()}`,
          actionType: 'APPLY_OPPORTUNITY',
          payload: { oppId },
          timestamp: Date.now(),
          status: 'Queued'
        }
      ]);
    }
  };

  const scheduleInterview = (oppId: string, date: string, time: string) => {
    setOpportunities(prev =>
      prev.map(opp =>
        opp.id === oppId
          ? {
              ...opp,
              applicationStatus: 'Interview Scheduled',
              interviewDate: date,
              interviewTime: time
            }
          : opp
      )
    );
    AdminStore.updateOpportunityStatus(oppId, 'Interview Scheduled', date, time);
    if (activeJourneyStep < 9) setActiveJourneyStep(9);
  };

  const markOpportunityJoined = (oppId: string) => {
    const today = new Date().toLocaleDateString('en-GB');
    setOpportunities(prev =>
      prev.map(opp =>
        opp.id === oppId
          ? {
              ...opp,
              applicationStatus: 'Joined',
              joinedDate: today
            }
          : opp
      )
    );
    AdminStore.updateOpportunityStatus(oppId, 'Joined');
    setActiveJourneyStep(10);
    
    // Also record in AdminStore outcomes
    if (profile.serialId) {
      AdminStore.updateOutcome(profile.serialId, {
        beneficiaryName: profile.name,
        stage: 'Joined / Started',
        outcomeStatus: 'Placed',
        employerOrVenture: 'SunPower Clean Energy Ltd',
        monthlySalary: '₹24,000 / month',
        placementDate: today
      });
    }
  };

  // Training Workflow
  const enrollTraining = (trainingId: string) => {
    const today = new Date().toLocaleDateString('en-GB');
    setTrainingPrograms(prev =>
      prev.map(tp =>
        tp.id === trainingId
          ? { ...tp, isEnrolled: true, enrollmentDate: today, availableSeats: Math.max(0, tp.availableSeats - 1) }
          : tp
      )
    );
    if (activeJourneyStep < 5) setActiveJourneyStep(5);

    if (offlineMode) {
      setSyncQueue(prev => [
        ...prev,
        {
          id: `sync-${Date.now()}`,
          actionType: 'ENROLL_TRAINING',
          payload: { trainingId },
          timestamp: Date.now(),
          status: 'Queued'
        }
      ]);
    }
  };

  const toggleTrainingModule = (trainingId: string, moduleIdx: number) => {
    setTrainingPrograms(prev =>
      prev.map(tp => {
        if (tp.id !== trainingId) return tp;
        const updatedMods = tp.modules.map((m, idx) =>
          idx === moduleIdx ? { ...m, isCompleted: !m.isCompleted } : m
        );
        return { ...tp, modules: updatedMods };
      })
    );
  };

  // Enterprise Workflow
  const toggleEnterpriseChecklist = (checklistId: string) => {
    setEnterprisePathway(prev => {
      if (!prev) return null;
      const updatedList = prev.setupChecklist.map(item =>
        item.id === checklistId ? { ...item, completed: !item.completed } : item
      );
      const allDone = updatedList.every(i => i.completed);
      return {
        ...prev,
        setupChecklist: updatedList,
        status: allDone ? 'Business Launched' : 'Checklist Started'
      };
    });
  };

  // Sync Queue Processing
  const syncPendingActions = () => {
    setSyncQueue([]);
    setOfflineMode(false);
  };

  // Scenario Switcher (Feature 36 & 42)
  const loadScenario = (scenario: 'solar' | 'tailor') => {
    setSelectedScenario(scenario);
    if (scenario === 'solar') {
      setProfile({ ...DEMO_ROHITH_PROFILE });
      setMobileNumber(DEMO_ROHITH_PROFILE.mobile || '9876543210');
      setCareerGoal(DEMO_ROHITH_GOAL);
      setSelectedLanguage('en');
      const roadmapData = MockAIService.generateRoadmap(DEMO_ROHITH_PROFILE, DEMO_ROHITH_GOAL);
      setRoadmap(roadmapData);
      setOpportunities(OpportunityService.matchOpportunities(DEMO_ROHITH_PROFILE, DEMO_ROHITH_GOAL));
      setTrainingPrograms(OpportunityService.matchTraining(DEMO_ROHITH_PROFILE, DEMO_ROHITH_GOAL));
      setEnterprisePathway(OpportunityService.getEnterprisePathway('solar'));
      setActiveJourneyStep(4);
      setStage('main_app');
      setActiveTab('home');
      setConversationHistory([
        {
          id: 'msg-solar-1',
          sender: 'ai',
          text: 'Welcome Rohith! Your PM-AJAY skill pathway from Electrical Assistant to Solar PV Specialist is configured. Next best step: enroll in the Suryamitra batch.',
          timestamp: Date.now()
        }
      ]);
      AdminStore.syncActiveProfile(DEMO_ROHITH_PROFILE, '9876543210', DEMO_ROHITH_GOAL, roadmapData);
    } else {
      setProfile({ ...DEMO_ANANYA_PROFILE });
      setMobileNumber(DEMO_ANANYA_PROFILE.mobile || '9830011223');
      setCareerGoal(DEMO_ANANYA_GOAL);
      setSelectedLanguage('bn');
      const roadmapData = MockAIService.generateRoadmap(DEMO_ANANYA_PROFILE, DEMO_ANANYA_GOAL);
      setRoadmap(roadmapData);
      setOpportunities(OpportunityService.matchOpportunities(DEMO_ANANYA_PROFILE, DEMO_ANANYA_GOAL));
      setTrainingPrograms(OpportunityService.matchTraining(DEMO_ANANYA_PROFILE, DEMO_ANANYA_GOAL));
      setEnterprisePathway(OpportunityService.getEnterprisePathway('fashion'));
      setActiveJourneyStep(8); // Enterprise launch stage
      setStage('main_app');
      setActiveTab('home');
      setConversationHistory([
        {
          id: 'msg-tailor-1',
          sender: 'ai',
          text: 'Welcome Ananya! Your PM-AJAY enterprise pathway to a Custom Designer Boutique is ready. Direct Capital Grant: ₹50,000 eligible.',
          timestamp: Date.now()
        }
      ]);
      AdminStore.syncActiveProfile(DEMO_ANANYA_PROFILE, '9830011223', DEMO_ANANYA_GOAL, roadmapData);
    }
  };

  const loadDemoProfile = () => {
    loadScenario('solar');
  };

  const resetAll = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    setStage('splash');
    setActiveTab('home');
    setSelectedLanguage('en');
    setMobileNumber('');
    setProfile(DEFAULT_PROFILE);
    setCurrentQuestionIndex(0);
    setCareerGoal('');
    setRoadmap(null);
    setOpportunities(DEMO_OPPORTUNITIES);
    setTrainingPrograms(DEMO_TRAINING_PROGRAMS);
    setEnterprisePathway(OpportunityService.getEnterprisePathway('solar'));
    setActiveJourneyStep(1);
    setOfflineMode(false);
    setSyncQueue([]);
    setConversationHistory([]);
    SpeechService.stopSpeaking();
    SpeechService.stopListening();
    setIsSpeaking(false);
    setIsListening(false);
  };

  return (
    <SkillBridgeContext.Provider
      value={{
        stage,
        setStage,
        activeTab,
        setActiveTab,
        selectedLanguage,
        setSelectedLanguage,
        mobileNumber,
        setMobileNumber: handleSetMobileNumber,
        profile,
        setProfile,
        updateProfileField,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        careerGoal,
        setCareerGoal,
        roadmap,
        setRoadmap,
        generateAndSetRoadmap,
        toggleStepCompletion,
        conversationHistory,
        addMessage,
        isSpeaking,
        setIsSpeaking,
        isListening,
        setIsListening,
        soundEnabled,
        setSoundEnabled,
        speakText,
        
        // SIH Modules
        skillGap,
        opportunities,
        trainingPrograms,
        enterprisePathway,
        activeJourneyStep,
        setActiveJourneyStep,
        applyOpportunity,
        scheduleInterview,
        markOpportunityJoined,
        enrollTraining,
        toggleTrainingModule,
        toggleEnterpriseChecklist,

        // Offline Support
        offlineMode,
        setOfflineMode,
        syncQueue,
        syncPendingActions,

        // Multi-channel Simulators
        activeSimulator,
        setActiveSimulator,

        // Demo Control
        selectedScenario,
        loadScenario,
        loadDemoProfile,
        resetAll
      }}
    >
      {children}
    </SkillBridgeContext.Provider>
  );
};

export const useSkillBridge = () => {
  const context = useContext(SkillBridgeContext);
  if (!context) {
    throw new Error('useSkillBridge must be used within a SkillBridgeProvider');
  }
  return context;
};
