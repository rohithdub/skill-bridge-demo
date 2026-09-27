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
  | 'Onboarding'
  | 'Placed'
  | 'Self-Employed';

export interface LearnerAdminRecord {
  id: string;
  serialId?: string; // Standardized Serial ID: e.g. TN-32-101
  stateCode?: string;
  districtCode?: string;
  name: string;
  mobile: string;
  age: string;
  location: string;
  district?: string;
  state?: string;
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
  travelRadius?: string;
  employmentPreference?: EmploymentPreference;
  placementStatus?: string;
  placedEmployer?: string;
  placedSalary?: string;
  enterpriseName?: string;
  roadmapSteps?: {
    title: string;
    duration: string;
    badge?: string;
    isCompleted: boolean;
  }[];
}

export type MainAppTab = 
  | 'home'
  | 'roadmap' 
  | 'opportunities' 
  | 'schemes' 
  | 'profile' 
  | 'voice';

export type SchemeCategory = 
  | 'Skill Training' 
  | 'Toolkits & Equipment' 
  | 'Subsidized Loans' 
  | 'Scholarships & Stipends' 
  | 'Enterprise Grant'
  | 'Apprenticeships';

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
  whyShownExplanation?: string[];
  preliminaryNote?: string;
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
  // Identity
  serialId?: string; // Formatted Serial ID: e.g. TN-32-101
  stateCode?: string; // e.g. TN, KA, MH, WB
  districtCode?: string; // e.g. 32, 01, 05
  name: string;
  age: string;
  mobile?: string;
  state?: string;
  district?: string;
  block?: string;
  preferredLanguage?: SupportedLanguage;

  // Socioeconomic
  education: string;
  familyIncome: string;
  caste: string;
  householdSituation?: string;

  // Livelihood
  currentJob: string;
  familyJob: string;
  workExperience?: string;
  skills: string[];
  traditionalSkills?: string[];
  informalSkills?: string[];

  // Aspiration
  desiredOccupation?: string;
  careerGoal?: string;
  industryInterest?: string;
  expectedIncome?: string;
  employmentPreference: EmploymentPreference;

  // Constraints & Preferences
  physicalLimitation: PhysicalLimitation;
  mobilityLimitation?: boolean;
  travelRadius?: '5 km' | '15 km' | '30 km' | 'Any distance';
  availableLearningTime?: 'Full-time (6-8 hrs/day)' | 'Part-time (2-4 hrs/day)' | 'Weekends only';
  deviceAccess?: 'Smartphone' | 'Feature phone' | 'Shared phone' | 'Computer';
  internetAvailability?: 'Good 4G/5G' | 'Spotty / Low speed' | 'Offline only';
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

// -------------------------------------------------------------
// ENHANCED SIH DATA MODELS
// -------------------------------------------------------------

export interface SkillGapAnalysis {
  careerGoal: string;
  currentJob: string;
  transferableSkills: string[];
  prerequisiteSkills: string[];
  skillGaps: string[];
  coveragePercent: number;
  requiredProficiency: 'Foundational' | 'Intermediate' | 'Advanced';
  trainingDurationWeeks: number;
  certificationRequirement: string;
  practicalTasks: string[];
  employmentOptions: string[];
  enterpriseOptions: string[];
  explanation: string;
}

export type OpportunityType = 'Job' | 'Apprenticeship' | 'Self-Employment' | 'Training';
export type ApplicationStatus = 
  | 'Recommended' 
  | 'Interested' 
  | 'Applied' 
  | 'Shortlisted' 
  | 'Interview Scheduled' 
  | 'Selected' 
  | 'Joined' 
  | 'Not Selected';

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  industry: string;
  location: string;
  district: string;
  state: string;
  distanceKm: number;
  requiredSkills: string[];
  qualification: string;
  salaryRange: string;
  employmentType: 'Full-Time Wage' | 'Apprenticeship' | 'Self-Employment / Micro-Enterprise' | 'Contractual';
  experienceRequired: string;
  accessibility: string;
  trainingRequirement: string;
  sourceLabel: 'Prototype Opportunity Data';
  isGovernmentSupported: boolean;
  matchScore: number;
  matchReasons: string[];
  applicationStatus: ApplicationStatus;
  interviewDate?: string;
  interviewTime?: string;
  joinedDate?: string;
  contactPerson?: string;
  phone?: string;
}

export interface TrainingProgram {
  id: string;
  title: string;
  jobRole: string;
  skillLevel: string;
  nsqfLevel: string;
  duration: string;
  mode: 'Classroom & Hands-on Lab' | 'Hybrid' | 'On-the-Job Apprenticeship';
  trainingProvider: string;
  centerName: string;
  location: string;
  district: string;
  distanceKm: number;
  eligibility: string;
  certification: string;
  totalSeats: number;
  availableSeats: number;
  feeSupportStatus: string; // e.g. "100% Free under PM-AJAY / PMKVY 4.0"
  placementSupport: string;
  relatedSchemeCode: string;
  relatedSchemeName: string;
  demoLabel: 'Prototype Training Data';
  isEnrolled?: boolean;
  enrollmentDate?: string;
  modules: {
    title: string;
    hours: number;
    practical: boolean;
    isCompleted?: boolean;
  }[];
}

export interface TrainingCenter {
  id: string;
  centerName: string;
  district: string;
  state: string;
  location: string;
  courses: string[];
  totalSeats: number;
  availableSeats: number;
  trainerStatus: string;
  batchStatus: 'Enrolling' | 'Ongoing' | 'Completed' | 'Upcoming';
  placementSupport: string;
  accessibility: string;
  contactPhone: string;
}

export interface EnterprisePathway {
  id: string;
  enterpriseIdea: string;
  tagline: string;
  targetSector: string;
  existingSkillsApplied: string[];
  skillsToAcquire: string[];
  estimatedInvestment: string;
  subsidyAvailable: string; // e.g. "₹50,000 Direct PM-AJAY Grant + ₹15,000 PM Vishwakarma Toolkit"
  setupChecklist: {
    id: string;
    task: string;
    completed: boolean;
    category: 'Legal & Scheme' | 'Equipment & Space' | 'Digital & Marketing' | 'Working Capital';
  }[];
  requiredTools: string[];
  marketOpportunity: string;
  applicableSchemes: string[];
  financeOptions: string[];
  actionSteps: string[];
  status: 'Exploring' | 'Checklist Started' | 'Grant Applied' | 'Tools Acquired' | 'Business Launched';
}

export interface PMAJAYPlan {
  id: string;
  district: string;
  state: string;
  planYear: string;
  targetBeneficiaries: number;
  enrolledCount: number;
  priorityOccupations: string[];
  trainingSeatsAllocated: number;
  activeCentersCount: number;
  expectedCompletionRate: string;
  expectedPlacementRate: string;
  enterpriseTarget: number;
  priorityBlocks: string[];
  budgetAllocated: string;
  budgetDisbursed: string;
  status: 'Approved' | 'In Execution' | 'Draft';
}

export type CoordinationRole = 
  | 'Corporation / Implementing Agency' 
  | 'District Officer' 
  | 'Training Coordinator' 
  | 'Field Officer' 
  | 'Training Center' 
  | 'Placement Coordinator';

export interface CoordinationTask {
  id: string;
  title: string;
  roleOwner: CoordinationRole;
  assignedTo: string;
  beneficiaryName?: string;
  beneficiarySerialId?: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Completed' | 'Escalated';
  dueDate: string;
  category: 'Seat Allocation' | 'Mobilization' | 'Toolkit Dispatch' | 'Batch Scheduling' | 'Placement Drive' | 'Grant Verification';
  notes: string;
}

export interface SupportCase {
  id: string;
  beneficiaryName: string;
  beneficiarySerialId: string;
  mobile: string;
  issueCategory: 'Beneficiary Issue' | 'Technical Issue' | 'Documentation Issue' | 'Training Issue' | 'Accessibility Issue' | 'Placement Issue';
  summary: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Assigned' | 'In Progress' | 'Resolved' | 'Escalated';
  assignedOfficer: string;
  createdDate: string;
  notes: string[];
  resolution?: string;
}

export interface OutcomeRecord {
  beneficiaryId: string;
  beneficiarySerialId: string;
  beneficiaryName: string;
  stage: 'Training Enrolled' | 'Training Started' | 'Training Completed' | 'Certification' | 'Placement / Enterprise' | 'Joined / Started' | '30-Day Follow-up' | '90-Day Follow-up';
  outcomeStatus: 'Completed' | 'Placed' | 'Self-Employed' | 'Seeking Placement' | 'Dropped Out' | 'Unreachable';
  dropoutReason?: string;
  employerOrVenture?: string;
  monthlySalary?: string;
  placementDate?: string;
  retentionStatus?: 'Working Continuously' | 'Wage Increased' | 'Left Job' | 'Transitioned to Enterprise';
  followUp30Notes?: string;
  followUp90Notes?: string;
  lastContactDate: string;
}

export interface OfflineSyncAction {
  id: string;
  actionType: 'UPDATE_PROFILE' | 'APPLY_OPPORTUNITY' | 'ENROLL_TRAINING' | 'COMPLETE_STEP' | 'CREATE_SUPPORT_CASE';
  payload: any;
  timestamp: number;
  status: 'Queued' | 'Synced';
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
