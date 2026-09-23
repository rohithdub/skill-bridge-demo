export type AppStage = 
  | 'splash'
  | 'language'
  | 'mobile'
  | 'voice_onboarding'
  | 'profile_summary'
  | 'profile_confirmation'
  | 'career_goal'
  | 'roadmap'
  | 'main_app';

export type MainAppTab = 'voice' | 'roadmap' | 'profile';

export type SupportedLanguage = 'en' | 'ta' | 'hi' | 'te' | 'kn' | 'ml';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  greeting: string;
}

export interface PhysicalLimitation {
  hasLimitation: boolean;
  details?: string;
}

export type EmploymentPreference = 'Self-employment' | 'Wage employment' | 'Both' | 'Not sure';

export interface UserProfile {
  name: string;
  age: string;
  currentJob: string;
  familyJob: string;
  education: string;
  familyIncome: string;
  skills: string[];
  physicalLimitation: PhysicalLimitation;
  employmentPreference: EmploymentPreference;
}

export interface RoadmapStep {
  id: string;
  stepNumber: number;
  title: string;
  duration: string;
  badge?: string;
  skills: string[];
  description: string;
  trainingType: 'Foundational' | 'Domain Skill' | 'Hands-on Lab' | 'Govt Certification' | 'Industry Placement' | 'Self-Employment Launch';
  certification?: string;
  freeGovtScheme?: string;
  isCompleted?: boolean;
}

export interface GeneratedRoadmap {
  id: string;
  careerGoal: string;
  currentJob: string;
  transferableInsight: string;
  transferableSkills: string[];
  newSkillsToAcquire: string[];
  estimatedTotalMonths: string;
  potentialSalaryGrowth: string;
  alignment: string;
  steps: RoadmapStep[];
}

export interface ConversationMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: number;
  actionableOptions?: string[];
}

export interface OnboardingQuestion {
  id: number;
  field: keyof UserProfile | 'skills_input';
  aiPrompt: string;
  subtitle?: string;
  type: 'text' | 'number' | 'single_choice' | 'multi_choice' | 'special_limitation';
  options?: string[];
  placeholder?: string;
  demoValue: string | string[] | PhysicalLimitation;
}
