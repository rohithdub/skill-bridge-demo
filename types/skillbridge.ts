export type AppStage = 
  | 'splash'
  | 'language'
  | 'mobile'
  | 'voice_onboarding'
  | 'profile_summary'
  | 'profile_confirmation'
  | 'career_goal'
  | 'roadmap'
  | 'main_app'
  | 'admin_login'
  | 'admin_dashboard';

export type LearnerStatus = 
  | 'Active Learning' 
  | 'Completed & Certified' 
  | 'Milestone In-Progress' 
  | 'Onboarding';

export interface LearnerAdminRecord {
  id: string;
  serialId?: string; // Standardized Serial ID: e.g. TN-32-101
  stateCode?: string;
  districtCode?: string;
  name: string;
  mobile: string;
  age: string;
  location: string;
  education: string;
  caste?: string;
  familyIncome?: string;
  familyJob?: string;
  currentJob: string;
  whatTheyAreLearning: string;
  alignedGovtScheme: string;
  currentModule: string;
  progressPercent: number;
  status: LearnerStatus;
  preferredLanguage: string;
  enrolledDate: string;
  lastActive: string;
  skills: string[];
  newSkills: string[];
  totalSteps: number;
  completedSteps: number;
  roadmapSteps?: {
    title: string;
    duration: string;
    badge?: string;
    isCompleted: boolean;
  }[];
}

export type MainAppTab = 'voice' | 'roadmap' | 'schemes' | 'profile';

export type SchemeCategory = 
  | 'Skill Training' 
  | 'Toolkits & Equipment' 
  | 'Subsidized Loans' 
  | 'Scholarships & Stipends' 
  | 'Enterprise Grant';

export interface GovtScheme {
  id: string;
  code: string;
  name: string;
  ministry: string;
  category: SchemeCategory;
  applicableCastes: ('General' | 'OBC' | 'SC' | 'ST' | 'EWS' | 'All')[];
  badge: string;
  primaryBenefit: string;
  financialSupport: string;
  description: string;
  eligibility: {
    casteLabel: string;
    maxFamilyIncome?: string;
    ageRange?: string;
    education?: string;
    points: string[];
  };
  benefitsList: string[];
  documentsRequired: string[];
  officialPortal: string;
  portalUrl: string;
  helpline: string;
  alignedTrades?: string[];
  specialSubsidyForCommunity?: string;
}


export type SupportedLanguage = 
  | 'en' 
  | 'ta' 
  | 'hi' 
  | 'te' 
  | 'kn' 
  | 'ml'
  | 'bn'
  | 'mr'
  | 'gu'
  | 'pa'
  | 'or'
  | 'as'
  | 'ur';

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
  serialId?: string; // Formatted Serial ID: e.g. TN-32-101
  stateCode?: string; // e.g. TN, KA, MH
  districtCode?: string; // e.g. 32, 01, 05
  name: string;
  age: string;
  currentJob: string;
  familyJob: string;
  education: string;
  familyIncome: string;
  caste: string;
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
