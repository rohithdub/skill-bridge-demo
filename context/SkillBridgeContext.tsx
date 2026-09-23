'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  AppStage,
  MainAppTab,
  SupportedLanguage,
  UserProfile,
  GeneratedRoadmap,
  ConversationMessage
} from '@/types/skillbridge';
import { DEMO_ROHITH_PROFILE, DEMO_ROHITH_GOAL } from '@/lib/roadmapData';
import { MockAIService } from '@/lib/mockAI';
import { SpeechService } from '@/lib/speechService';

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
  speakText: (text: string, onEnd?: () => void) => void;
  loadDemoProfile: () => void;
  resetAll: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  name: '',
  age: '',
  currentJob: '',
  familyJob: '',
  education: '',
  familyIncome: '',
  skills: [],
  physicalLimitation: { hasLimitation: false },
  employmentPreference: 'Wage employment'
};

const SkillBridgeContext = createContext<SkillBridgeContextType | undefined>(undefined);

const STORAGE_KEY = 'skill_bridge_state_v1';

export const SkillBridgeProvider = ({ children }: { children: ReactNode }) => {
  const [stage, setStage] = useState<AppStage>('splash');
  const [activeTab, setActiveTab] = useState<MainAppTab>('roadmap');
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
      }
    } catch (e) {
      console.warn('Could not restore state from localStorage:', e);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage when state changes
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
        conversationHistory
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
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
    conversationHistory
  ]);

  const updateProfileField = (field: keyof UserProfile, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
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

  const speakText = (text: string, onEnd?: () => void) => {
    if (!soundEnabled) {
      if (onEnd) setTimeout(onEnd, 800);
      return;
    }
    setIsSpeaking(true);
    SpeechService.speak(
      text,
      selectedLanguage === 'en' ? 'en-IN' : selectedLanguage,
      () => {
        setIsSpeaking(false);
        if (onEnd) onEnd();
      },
      () => {
        setIsSpeaking(false);
        if (onEnd) onEnd();
      }
    );
  };

  const generateAndSetRoadmap = (goal: string): GeneratedRoadmap => {
    const newRoadmap = MockAIService.generateRoadmap(profile, goal);
    setCareerGoal(goal);
    setRoadmap(newRoadmap);
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
  };

  const loadDemoProfile = () => {
    setProfile({ ...DEMO_ROHITH_PROFILE });
    setMobileNumber('9876543210');
    setCareerGoal(DEMO_ROHITH_GOAL);
    const demoRoadmap = MockAIService.generateRoadmap(DEMO_ROHITH_PROFILE, DEMO_ROHITH_GOAL);
    setRoadmap(demoRoadmap);
    setStage('main_app');
    setActiveTab('roadmap');
    setConversationHistory([
      {
        id: 'msg-demo-1',
        sender: 'ai',
        text: 'Hello Rohith! I analyzed your electrical background and crafted your Solar Technician roadmap with 5 certified milestones.',
        timestamp: Date.now()
      }
    ]);
  };

  const resetAll = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    setStage('splash');
    setActiveTab('roadmap');
    setSelectedLanguage('en');
    setMobileNumber('');
    setProfile(DEFAULT_PROFILE);
    setCurrentQuestionIndex(0);
    setCareerGoal('');
    setRoadmap(null);
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
        setMobileNumber,
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
