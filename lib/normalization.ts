import {
  UserProfile,
  GeneratedRoadmap,
  RoadmapStep,
  Opportunity,
  TrainingProgram,
  GovtScheme,
  SupportedLanguage,
  EmploymentPreference,
  PhysicalLimitation
} from '@/types/skillbridge';

export const SUPPORTED_LANGUAGES: readonly SupportedLanguage[] = [
  'en',
  'hi',
  'ta',
  'te',
  'kn',
  'ml',
  'bn',
  'mr',
  'gu',
  'pa',
  'or',
  'as',
  'ur'
] as const;

/**
 * Safely converts any value (string, object, array, number, null) to a displayable string.
 * CRITICAL FIX: If an object with numeric indices arrives (from spreading a string),
 * this reconstructs the original string instead of letting an object reach JSX!
 */
export function toDisplayString(val: any, fallback: string = ''): string {
  if (val === null || val === undefined) {
    return fallback;
  }
  if (typeof val === 'string') {
    return val.trim();
  }
  if (typeof val === 'number' || typeof val === 'boolean') {
    return String(val);
  }
  if (Array.isArray(val)) {
    const parts = val.map(v => toDisplayString(v)).filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : fallback;
  }
  if (typeof val === 'object') {
    // Check if it was a spread string with keys '0', '1', '2', ...
    const keys = Object.keys(val);
    const numericKeys = keys.filter(k => /^\d+$/.test(k)).sort((a, b) => Number(a) - Number(b));
    if (numericKeys.length > 0) {
      const reconstructed = numericKeys.map(k => val[k]).join('').trim();
      if (reconstructed) return reconstructed;
    }
    // Check standard object fields
    if (val.title !== undefined) return toDisplayString(val.title, fallback);
    if (val.name !== undefined) return toDisplayString(val.name, fallback);
    if (val.label !== undefined) return toDisplayString(val.label, fallback);
    if (val.text !== undefined) return toDisplayString(val.text, fallback);
    if (val.value !== undefined) return toDisplayString(val.value, fallback);
    if (val.description !== undefined) return toDisplayString(val.description, fallback);
    if (val.badge !== undefined) return toDisplayString(val.badge, fallback);
  }
  return fallback;
}

/**
 * Normalizes any skills input into a guaranteed string[] array.
 */
export function normalizeSkills(rawSkills: any): string[] {
  if (!rawSkills) return [];

  if (Array.isArray(rawSkills)) {
    const flattened = rawSkills.flatMap(item => {
      if (typeof item === 'string') {
        const trimmed = item.trim();
        if (!trimmed) return [];
        if (trimmed.includes(',')) {
          return trimmed.split(',').map(s => s.trim()).filter(Boolean);
        }
        return [trimmed];
      }
      if (item && typeof item === 'object') {
        const str = toDisplayString(item);
        if (str) {
          return str.includes(',') ? str.split(',').map(s => s.trim()).filter(Boolean) : [str];
        }
        return Object.values(item).map(v => toDisplayString(v)).filter(Boolean);
      }
      return item != null ? [String(item).trim()] : [];
    });
    return Array.from(new Set(flattened.filter(Boolean)));
  }

  if (typeof rawSkills === 'string') {
    const trimmed = rawSkills.trim();
    if (!trimmed) return [];

    if ((trimmed.startsWith('[') && trimmed.endsWith(']')) || (trimmed.startsWith('{') && trimmed.endsWith('}'))) {
      try {
        const parsed = JSON.parse(trimmed);
        return normalizeSkills(parsed);
      } catch (e) {
        // continue
      }
    }

    if (trimmed.includes(',')) {
      return Array.from(new Set(trimmed.split(',').map(s => s.trim()).filter(Boolean)));
    }
    return [trimmed];
  }

  if (typeof rawSkills === 'object') {
    // If it's a spread string object
    const str = toDisplayString(rawSkills);
    if (str) return normalizeSkills(str);
    const values = Object.values(rawSkills).flatMap(v => normalizeSkills(v));
    return Array.from(new Set(values.filter(Boolean)));
  }

  const str = String(rawSkills).trim();
  return str ? [str] : [];
}

const VALID_TRAINING_TYPES = [
  'Foundational',
  'Domain Skill',
  'Hands-on Lab',
  'Govt Certification',
  'Industry Placement',
  'Self-Employment Launch'
] as const;

export type TrainingType = (typeof VALID_TRAINING_TYPES)[number];

function normalizeTrainingType(rawType: any): TrainingType {
  const str = toDisplayString(rawType, 'Foundational');
  for (const valid of VALID_TRAINING_TYPES) {
    if (str.toLowerCase() === valid.toLowerCase() || str.toLowerCase().includes(valid.toLowerCase())) {
      return valid;
    }
  }
  return 'Foundational';
}

/**
 * Normalizes a single roadmap step to ensure NO raw object ever reaches React children.
 */
export function normalizeRoadmapStep(rawStep: any, idx: number = 0): RoadmapStep {
  if (!rawStep || typeof rawStep !== 'object') {
    return {
      id: `step-${idx + 1}`,
      stepNumber: idx + 1,
      title: `Milestone ${idx + 1}`,
      duration: '3–4 weeks',
      badge: 'Foundation',
      description: 'Foundational practical training and skills development.',
      skills: ['Core Safety', 'Practical Work Basics'],
      trainingType: 'Foundational',
      isCompleted: idx === 0
    };
  }

  const id = toDisplayString(rawStep.id) || `step-${idx + 1}`;
  const stepNumber = typeof rawStep.stepNumber === 'number' && !isNaN(rawStep.stepNumber)
    ? rawStep.stepNumber
    : idx + 1;

  const title = toDisplayString(rawStep.title, `Milestone ${stepNumber}`);
  const duration = toDisplayString(rawStep.duration, '3–4 weeks');
  const badge = toDisplayString(rawStep.badge, 'Foundation');
  const description = toDisplayString(rawStep.description, 'Complete training milestone and practical exercises.');
  const skills = normalizeSkills(rawStep.skills);
  const trainingType = normalizeTrainingType(rawStep.trainingType || badge);

  const certification = rawStep.certification ? toDisplayString(rawStep.certification) : undefined;
  const freeGovtScheme = rawStep.freeGovtScheme ? toDisplayString(rawStep.freeGovtScheme) : undefined;
  const isCompleted = Boolean(rawStep.isCompleted);

  return {
    id,
    stepNumber,
    title,
    duration,
    badge,
    description,
    skills: skills.length > 0 ? skills : ['Practical Knowledge', 'Execution Basics'],
    trainingType,
    certification,
    freeGovtScheme,
    isCompleted
  };
}

/**
 * Canonical Normalization Boundary for Roadmap.
 * Guarantees every field in the roadmap is clean and render-safe.
 */
export function normalizeRoadmap(rawRoadmap: any): GeneratedRoadmap | null {
  if (!rawRoadmap || typeof rawRoadmap !== 'object') {
    return null;
  }

  const id = toDisplayString(rawRoadmap.id) || `roadmap-${Date.now()}`;
  const careerGoal = toDisplayString(rawRoadmap.careerGoal, 'Solar PV Specialist');
  const currentJob = toDisplayString(rawRoadmap.currentJob, 'Electrical Assistant');
  const transferableInsight = toDisplayString(rawRoadmap.transferableInsight, 'Your prior work experience gives you a strong foundation for this trade.');
  const transferableSkills = normalizeSkills(rawRoadmap.transferableSkills);
  const newSkillsToAcquire = normalizeSkills(rawRoadmap.newSkillsToAcquire);
  const estimatedTotalMonths = toDisplayString(rawRoadmap.estimatedTotalMonths, '4 – 6 Months');
  const potentialSalaryGrowth = toDisplayString(rawRoadmap.potentialSalaryGrowth, 'Significant wage growth post-certification');
  const alignment = toDisplayString(rawRoadmap.alignment, 'National Skill Development Corporation (NSDC) Aligned');

  let rawSteps: any[] = [];
  if (Array.isArray(rawRoadmap.steps)) {
    rawSteps = rawRoadmap.steps;
  } else if (rawRoadmap.steps && typeof rawRoadmap.steps === 'object') {
    rawSteps = Object.values(rawRoadmap.steps);
  }

  const steps = rawSteps.length > 0
    ? rawSteps.map((s, idx) => normalizeRoadmapStep(s, idx))
    : [
        normalizeRoadmapStep({
          id: 'step-1',
          stepNumber: 1,
          title: `Foundations of ${careerGoal}`,
          duration: '3–4 weeks',
          badge: 'Foundation',
          description: `Master core terminology, safety protocols, and standard tools for ${careerGoal}.`,
          skills: ['Basic Principles', 'Safety Regulations', 'Tool Handling'],
          trainingType: 'Foundational',
          isCompleted: true
        }, 0),
        normalizeRoadmapStep({
          id: 'step-2',
          stepNumber: 2,
          title: `Domain Technical Skills for ${careerGoal}`,
          duration: '4–6 weeks',
          badge: 'Core Skill',
          description: `Acquire certified technical competencies required for ${careerGoal}.`,
          skills: ['Standard Operating Procedures', 'Quality Inspection', 'Diagnostic Testing'],
          trainingType: 'Domain Skill',
          isCompleted: false
        }, 1),
        normalizeRoadmapStep({
          id: 'step-3',
          stepNumber: 3,
          title: 'Hands-on Practical Lab & Field Training',
          duration: '4 weeks',
          badge: 'Hands-on Lab',
          description: 'Apply skills directly in real-world simulated environments and workshops.',
          skills: ['Live Equipment Handling', 'Field Troubleshooting'],
          trainingType: 'Hands-on Lab',
          isCompleted: false
        }, 2),
        normalizeRoadmapStep({
          id: 'step-4',
          stepNumber: 4,
          title: 'Government Certification & Assessment',
          duration: '2 weeks',
          badge: 'Certification',
          description: 'Complete NSQF-aligned assessment to receive government credential.',
          skills: ['Assessment Readiness', 'Compliance Standards'],
          trainingType: 'Govt Certification',
          certification: 'NSQF Level 4 Credential',
          isCompleted: false
        }, 3),
        normalizeRoadmapStep({
          id: 'step-5',
          stepNumber: 5,
          title: 'Industry Placement & Direct Job Linkage',
          duration: 'Ongoing',
          badge: 'Placement',
          description: 'Connect with verified local employers and interview opportunities.',
          skills: ['Interview Presentation', 'Workplace Professionalism'],
          trainingType: 'Industry Placement',
          isCompleted: false
        }, 4)
      ];

  return {
    id,
    careerGoal,
    currentJob,
    transferableInsight,
    transferableSkills: transferableSkills.length > 0 ? transferableSkills : ['Practical Experience', 'Reliability'],
    newSkillsToAcquire: newSkillsToAcquire.length > 0 ? newSkillsToAcquire : ['Technical Protocols', 'Certification Standard'],
    estimatedTotalMonths,
    potentialSalaryGrowth,
    alignment,
    steps
  };
}

/**
 * Normalizes an Opportunity record.
 */
export function normalizeOpportunity(raw: any, idx: number = 0): Opportunity {
  if (!raw || typeof raw !== 'object') {
    return {
      id: `opp-${idx + 1}`,
      title: 'Solar PV Rooftop Technician',
      organization: 'Verified Solar EPC Employer',
      industry: 'Green Energy / Solar EPC',
      location: 'Guindy Industrial Estate, Chennai',
      district: 'Chennai',
      state: 'Tamil Nadu',
      distanceKm: 6.4,
      requiredSkills: ['AC/DC Circuit Wiring', 'Tool Safety'],
      qualification: '10th / ITI / Diploma or equivalent experience',
      salaryRange: '₹22,000 – ₹28,000 / month',
      employmentType: 'Full-Time Wage',
      experienceRequired: '0–2 years',
      accessibility: 'Ground-floor accessible',
      trainingRequirement: 'Suryamitra Certification',
      sourceLabel: 'Prototype Opportunity Data',
      isGovernmentSupported: true,
      matchScore: 90,
      matchReasons: ['Matches your practical trade background', 'Within preferred travel radius'],
      applicationStatus: 'Recommended'
    };
  }

  const validStatus = ['Recommended', 'Applied', 'Interview Scheduled', 'Joined'];
  const appStatus = validStatus.includes(raw.applicationStatus) ? raw.applicationStatus : 'Recommended';

  return {
    id: toDisplayString(raw.id) || `opp-${idx + 1}`,
    title: toDisplayString(raw.title, 'Technical Specialist'),
    organization: toDisplayString(raw.organization, 'Partner Employer'),
    industry: toDisplayString(raw.industry, 'Technical Services'),
    location: toDisplayString(raw.location, 'Local District'),
    district: toDisplayString(raw.district, 'District'),
    state: toDisplayString(raw.state, 'State'),
    distanceKm: typeof raw.distanceKm === 'number' && !isNaN(raw.distanceKm) ? raw.distanceKm : 5,
    requiredSkills: normalizeSkills(raw.requiredSkills),
    qualification: toDisplayString(raw.qualification, 'Open Qualification'),
    salaryRange: toDisplayString(raw.salaryRange, 'Competitive Wage'),
    employmentType: raw.employmentType || 'Full-Time Wage',
    experienceRequired: toDisplayString(raw.experienceRequired, '0–1 years'),
    accessibility: toDisplayString(raw.accessibility, 'Standard workplace facilities'),
    trainingRequirement: toDisplayString(raw.trainingRequirement, 'Basic trade certification'),
    sourceLabel: 'Prototype Opportunity Data',
    isGovernmentSupported: Boolean(raw.isGovernmentSupported),
    matchScore: typeof raw.matchScore === 'number' ? raw.matchScore : 85,
    matchReasons: Array.isArray(raw.matchReasons) ? raw.matchReasons.map((r: any) => toDisplayString(r)) : ['Matches your background'],
    applicationStatus: appStatus,
    interviewDate: raw.interviewDate ? toDisplayString(raw.interviewDate) : undefined,
    interviewTime: raw.interviewTime ? toDisplayString(raw.interviewTime) : undefined,
    contactPerson: raw.contactPerson ? toDisplayString(raw.contactPerson) : undefined,
    phone: raw.phone ? toDisplayString(raw.phone) : undefined
  };
}

export function normalizeOpportunities(raw: any): Opportunity[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((item, idx) => normalizeOpportunity(item, idx));
}

/**
 * Normalizes a TrainingProgram record.
 */
export function normalizeTrainingProgram(raw: any, idx: number = 0): TrainingProgram {
  if (!raw || typeof raw !== 'object') {
    return {
      id: `train-${idx + 1}`,
      title: 'Free Government Skilling Batch',
      jobRole: 'Certified Technician',
      skillLevel: 'NSQF Level 4',
      nsqfLevel: 'Level 4',
      duration: '12 Weeks',
      mode: 'Classroom & Hands-on Lab',
      trainingProvider: 'Govt Skill Center',
      centerName: 'District Skill Hub',
      location: 'Technical Campus',
      district: 'Chennai',
      distanceKm: 4.2,
      eligibility: '10th Pass or trade experience',
      certification: 'Govt Certified NSDC Credential',
      totalSeats: 30,
      availableSeats: 8,
      feeSupportStatus: '100% Free under PM-AJAY (Zero Fee)',
      placementSupport: 'Guaranteed Rozgar Mela Interviews',
      relatedSchemeCode: 'PM-AJAY',
      relatedSchemeName: 'Pradhan Mantri Anusuchit Jaati Abhyuday Yojana',
      demoLabel: 'Prototype Training Data',
      modules: []
    };
  }

  const rawModules = Array.isArray(raw.modules) ? raw.modules : [];
  const modules = rawModules.map((m: any, mIdx: number) => ({
    title: toDisplayString(m.title, `Module ${mIdx + 1}`),
    hours: typeof m.hours === 'number' ? m.hours : 40,
    practical: Boolean(m.practical),
    isCompleted: Boolean(m.isCompleted)
  }));

  const validModes = ['Classroom & Hands-on Lab', 'Hybrid', 'On-the-Job Apprenticeship'] as const;
  const mode = validModes.includes(raw.mode) ? raw.mode : 'Classroom & Hands-on Lab';

  return {
    id: toDisplayString(raw.id) || `train-${idx + 1}`,
    title: toDisplayString(raw.title, 'Technical Training Batch'),
    jobRole: toDisplayString(raw.jobRole, 'Certified Specialist'),
    skillLevel: toDisplayString(raw.skillLevel, 'NSQF Level 4'),
    nsqfLevel: toDisplayString(raw.nsqfLevel, 'Level 4'),
    duration: toDisplayString(raw.duration, '12 Weeks'),
    mode,
    trainingProvider: toDisplayString(raw.trainingProvider, 'Govt Skill Partner'),
    centerName: toDisplayString(raw.centerName, 'District Skill Hub'),
    location: toDisplayString(raw.location, 'Local Campus'),
    district: toDisplayString(raw.district, 'District'),
    distanceKm: typeof raw.distanceKm === 'number' ? raw.distanceKm : 5,
    eligibility: toDisplayString(raw.eligibility, '10th Pass / Open'),
    certification: toDisplayString(raw.certification, 'Govt Skill Certificate'),
    totalSeats: typeof raw.totalSeats === 'number' ? raw.totalSeats : 30,
    availableSeats: typeof raw.availableSeats === 'number' ? raw.availableSeats : 10,
    feeSupportStatus: toDisplayString(raw.feeSupportStatus, '100% Free Government Supported'),
    placementSupport: toDisplayString(raw.placementSupport, 'Placement assistance included'),
    relatedSchemeCode: toDisplayString(raw.relatedSchemeCode, 'PM-AJAY'),
    relatedSchemeName: toDisplayString(raw.relatedSchemeName, 'Government Skilling Initiative'),
    demoLabel: 'Prototype Training Data',
    isEnrolled: Boolean(raw.isEnrolled),
    modules
  };
}

export function normalizeTrainingPrograms(raw: any): TrainingProgram[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((item, idx) => normalizeTrainingProgram(item, idx));
}

/**
 * Normalizes SupportedLanguage with safe fallback to 'en'.
 */
export function normalizeLanguage(raw: any): SupportedLanguage {
  if (typeof raw === 'string' && SUPPORTED_LANGUAGES.includes(raw as SupportedLanguage)) {
    return raw as SupportedLanguage;
  }
  return 'en';
}

export const DEFAULT_PROFILE: UserProfile = {
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

/**
 * Normalizes UserProfile.
 */
export function normalizeProfile(raw: any): UserProfile {
  if (!raw || typeof raw !== 'object') {
    return { ...DEFAULT_PROFILE };
  }

  let physicalLimitation: PhysicalLimitation = { hasLimitation: false };
  if (raw.physicalLimitation) {
    if (typeof raw.physicalLimitation === 'object') {
      physicalLimitation = {
        hasLimitation: Boolean(raw.physicalLimitation.hasLimitation),
        details: typeof raw.physicalLimitation.details === 'string' ? raw.physicalLimitation.details : undefined
      };
    } else if (typeof raw.physicalLimitation === 'string') {
      const lower = raw.physicalLimitation.toLowerCase();
      const hasLimitation = lower !== 'none' && lower !== 'no' && lower !== 'false' && lower !== '';
      physicalLimitation = {
        hasLimitation,
        details: hasLimitation ? raw.physicalLimitation : undefined
      };
    } else if (typeof raw.physicalLimitation === 'boolean') {
      physicalLimitation = { hasLimitation: raw.physicalLimitation };
    }
  }

  let travelRadius: '5 km' | '15 km' | '30 km' | 'Any distance' = '15 km';
  if (['5 km', '15 km', '30 km', 'Any distance'].includes(raw.travelRadius)) {
    travelRadius = raw.travelRadius;
  }

  let employmentPreference: EmploymentPreference = 'Wage employment';
  if (['Wage employment', 'Self-employment', 'Both', 'Not sure'].includes(raw.employmentPreference)) {
    employmentPreference = raw.employmentPreference;
  }

  let availableLearningTime: 'Full-time (6-8 hrs/day)' | 'Part-time (2-4 hrs/day)' | 'Weekends only' = 'Full-time (6-8 hrs/day)';
  if (['Full-time (6-8 hrs/day)', 'Part-time (2-4 hrs/day)', 'Weekends only'].includes(raw.availableLearningTime)) {
    availableLearningTime = raw.availableLearningTime;
  }

  let deviceAccess: 'Smartphone' | 'Feature phone' | 'Shared phone' | 'Computer' = 'Smartphone';
  if (['Smartphone', 'Feature phone', 'Shared phone', 'Computer'].includes(raw.deviceAccess)) {
    deviceAccess = raw.deviceAccess;
  }

  let internetAvailability: 'Good 4G/5G' | 'Spotty / Low speed' | 'Offline only' = 'Good 4G/5G';
  if (['Good 4G/5G', 'Spotty / Low speed', 'Offline only'].includes(raw.internetAvailability)) {
    internetAvailability = raw.internetAvailability;
  }

  return {
    ...DEFAULT_PROFILE,
    ...raw,
    serialId: toDisplayString(raw.serialId),
    stateCode: toDisplayString(raw.stateCode, 'TN'),
    districtCode: toDisplayString(raw.districtCode, '32'),
    name: toDisplayString(raw.name),
    age: toDisplayString(raw.age),
    mobile: typeof raw.mobile === 'string' ? raw.mobile.replace(/\D/g, '').slice(-10) : '',
    state: toDisplayString(raw.state, 'Tamil Nadu'),
    district: toDisplayString(raw.district, 'Chennai'),
    block: toDisplayString(raw.block, 'Guindy SC Cluster'),
    preferredLanguage: normalizeLanguage(raw.preferredLanguage),
    currentJob: toDisplayString(raw.currentJob),
    familyJob: toDisplayString(raw.familyJob),
    education: toDisplayString(raw.education),
    familyIncome: toDisplayString(raw.familyIncome),
    caste: toDisplayString(raw.caste, 'SC'),
    householdSituation: toDisplayString(raw.householdSituation, 'BPL Card Holder • Landless Household'),
    skills: normalizeSkills(raw.skills),
    traditionalSkills: raw.traditionalSkills ? normalizeSkills(raw.traditionalSkills) : undefined,
    informalSkills: raw.informalSkills ? normalizeSkills(raw.informalSkills) : undefined,
    desiredOccupation: raw.desiredOccupation ? toDisplayString(raw.desiredOccupation) : undefined,
    careerGoal: raw.careerGoal ? toDisplayString(raw.careerGoal) : undefined,
    industryInterest: raw.industryInterest ? toDisplayString(raw.industryInterest) : undefined,
    expectedIncome: raw.expectedIncome ? toDisplayString(raw.expectedIncome) : undefined,
    employmentPreference,
    physicalLimitation,
    mobilityLimitation: Boolean(raw.mobilityLimitation),
    travelRadius,
    availableLearningTime,
    deviceAccess,
    internetAvailability
  };
}
