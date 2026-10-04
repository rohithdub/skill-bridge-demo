'use client';

import {
  LearnerAdminRecord,
  LearnerStatus,
  UserProfile,
  GeneratedRoadmap,
  CoordinationTask,
  SupportCase,
  OutcomeRecord,
  PMAJAYPlan,
  TrainingCenter,
  Opportunity,
  ApplicationStatus
} from '@/types/skillbridge';
import {
  DEMO_PMAJAY_PLANS,
  DEMO_TRAINING_CENTERS,
  DEMO_OPPORTUNITIES
} from './opportunityData';
import { normalizeSkills } from './normalizeProfile';

const ADMIN_STORAGE_KEY = 'skillbridge_admin_learners_v5';
const TASKS_STORAGE_KEY = 'skillbridge_admin_tasks_v5';
const CASES_STORAGE_KEY = 'skillbridge_admin_cases_v5';
const OUTCOMES_STORAGE_KEY = 'skillbridge_admin_outcomes_v5';
const PLANS_STORAGE_KEY = 'skillbridge_admin_plans_v5';
const CENTERS_STORAGE_KEY = 'skillbridge_admin_centers_v5';
const OPPS_STORAGE_KEY = 'skillbridge_admin_opps_v5';

export const INITIAL_LEARNERS: LearnerAdminRecord[] = [
  {
    id: 'TN-32-101',
    serialId: 'TN-32-101',
    stateCode: 'TN',
    districtCode: '32',
    name: 'Rohith Kumar',
    mobile: '+91 98765 43210',
    age: '19',
    location: 'Chennai, Tamil Nadu',
    district: 'Chennai',
    state: 'Tamil Nadu',
    education: 'Diploma in Electrical',
    caste: 'SC',
    familyIncome: '₹10,000 – ₹20,000',
    familyJob: 'Farming / Daily Wage',
    currentJob: 'Electrical Assistant',
    whatTheyAreLearning: 'Solar PV Specialist & Rooftop Installation',
    alignedGovtScheme: 'PM-AJAY Skill Grant & Suryamitra (NISE/MNRE)',
    currentModule: 'Step 3/5: Hands-on Rooftop & Ground Mount Installation',
    progressPercent: 60,
    status: 'Active Learning',
    preferredLanguage: 'Tamil / English',
    enrolledDate: '18 Sep 2026',
    lastActive: '12 minutes ago',
    skills: ['AC Circuit Wiring', 'Tool Handling & Safety', 'Multimeter Testing'],
    newSkills: ['Photovoltaic (PV) Cell Physics', 'DC Array Inverter Sizing', 'Rooftop Structural Mounting'],
    totalSteps: 5,
    completedSteps: 3,
    travelRadius: '15 km',
    employmentPreference: 'Wage employment',
    placementStatus: 'Shortlisted with SunPower Clean Energy Ltd',
    placedEmployer: 'SunPower Clean Energy Ltd',
    placedSalary: '₹24,000/mo',
    roadmapSteps: [
      { title: 'Foundational DC Circuit & Solar Fundamentals', duration: '3–4 weeks', badge: 'Foundation', isCompleted: true },
      { title: 'Inverter, Battery Storage & Grid-Tied Systems', duration: '4–6 weeks', badge: 'Core Skill', isCompleted: true },
      { title: 'Hands-on Rooftop & Ground Mount Installation', duration: '4 weeks', badge: 'Hands-on Lab', isCompleted: true },
      { title: 'Govt Suryamitra / NSDC Certification Exam', duration: '2 weeks', badge: 'Govt Certification', isCompleted: false },
      { title: 'Apprenticeship & Commercial Solar Contracting', duration: '6–8 weeks', badge: 'Launch', isCompleted: false }
    ]
  },
  {
    id: 'WB-02-104',
    serialId: 'WB-02-104',
    stateCode: 'WB',
    districtCode: '02',
    name: 'Ananya Das',
    mobile: '+91 98300 11223',
    age: '28',
    location: 'Kolkata, West Bengal',
    district: 'Kolkata',
    state: 'West Bengal',
    education: '12th Standard',
    caste: 'SC',
    familyIncome: '₹8,000 – ₹15,000',
    familyJob: 'Tailoring & Handloom Weaving',
    currentJob: 'Garment Tailor',
    whatTheyAreLearning: 'Custom Fashion Boutique & Bridal Design Studio',
    alignedGovtScheme: 'PM-AJAY ₹50,000 Capital Grant & PM Vishwakarma',
    currentModule: 'Step 4/5: MSME Udyam Registration & Bank Micro-Credit Filing',
    progressPercent: 80,
    status: 'Milestone In-Progress',
    preferredLanguage: 'Bengali / Hindi',
    enrolledDate: '05 Sep 2026',
    lastActive: '3 hours ago',
    skills: ['Pattern Cutting', 'Garment Assembly Speed', 'Body Measurement Precision'],
    newSkills: ['Western Pattern Drafting', 'Digital Portfolio & Instagram Reels', 'Udyam Registration'],
    totalSteps: 5,
    completedSteps: 4,
    travelRadius: '15 km',
    employmentPreference: 'Self-employment',
    enterpriseName: 'Shilpa Artisanal Boutique (In Incubation)',
    roadmapSteps: [
      { title: 'Contemporary Western & Fusion Pattern Drafting', duration: '3 weeks', badge: 'Foundation', isCompleted: true },
      { title: 'Fabric Sourcing, Textile Blends & Cost Optimization', duration: '3 weeks', badge: 'Core Skill', isCompleted: true },
      { title: 'Boutique Branding, Cataloging & Social Commerce', duration: '4 weeks', badge: 'Hands-on Lab', isCompleted: true },
      { title: 'MSME Udyam & GST Registration', duration: '1 week', badge: 'Govt Certification', isCompleted: true },
      { title: 'Boutique Launch & Bridal Scaling', duration: '4 weeks', badge: 'Launch', isCompleted: false }
    ]
  },
  {
    id: 'GJ-05-103',
    serialId: 'GJ-05-103',
    stateCode: 'GJ',
    districtCode: '05',
    name: 'Ramesh Patel',
    mobile: '+91 97123 45678',
    age: '34',
    location: 'Surat, Gujarat',
    district: 'Surat',
    state: 'Gujarat',
    education: '10th Standard',
    caste: 'SC',
    familyIncome: '₹12,000 – ₹18,000',
    familyJob: 'Farming',
    currentJob: 'Farmer / Cultivator',
    whatTheyAreLearning: 'Modern Agri-Tech & Kisan Drone Remote Pilot',
    alignedGovtScheme: 'Sub-Mission on Agricultural Mechanization (SMAM)',
    currentModule: 'Step 5/5: e-NAM Digital Mandi & Direct Retail Launch',
    progressPercent: 100,
    status: 'Completed & Certified',
    preferredLanguage: 'Hindi / Gujarati',
    enrolledDate: '01 Aug 2026',
    lastActive: '1 hour ago',
    skills: ['Crop Lifecycle Intuition', 'Soil & Water Assessment', 'Pest Identification'],
    newSkills: ['Kisan Drone Flight Ops', 'Solar Drip Fertigation', 'Direct e-NAM Mandi Bidding'],
    totalSteps: 5,
    completedSteps: 5,
    travelRadius: '30 km',
    employmentPreference: 'Both',
    placementStatus: 'Placed as Custom Hiring Center Drone Pilot (₹28,000/mo)',
    placedEmployer: 'Kisan Dronetech Solutions',
    placedSalary: '₹28,000/mo',
    roadmapSteps: [
      { title: 'Precision Agriculture & Smart Irrigation Setup', duration: '3 weeks', badge: 'Foundation', isCompleted: true },
      { title: 'Kisan Drone Operation & Remote Sensing', duration: '3 weeks', badge: 'Core Skill', isCompleted: true },
      { title: 'Post-Harvest Value Addition & Cold Chain', duration: '4 weeks', badge: 'Hands-on Lab', isCompleted: true },
      { title: 'DGCA Kisan Drone Pilot Certification', duration: '2 weeks', badge: 'Govt Certification', isCompleted: true },
      { title: 'e-NAM Digital Mandi & Direct Retail Launch', duration: '4 weeks', badge: 'Launch', isCompleted: true }
    ]
  },
  {
    id: 'KA-01-102',
    serialId: 'KA-01-102',
    stateCode: 'KA',
    districtCode: '01',
    name: 'Priya Sharma',
    mobile: '+91 98451 23456',
    age: '22',
    location: 'Bengaluru, Karnataka',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    education: 'B.Sc Computer Science',
    caste: 'General',
    familyIncome: '₹20,000 – ₹35,000',
    familyJob: 'Teaching',
    currentJob: 'Fresher / College Graduate',
    whatTheyAreLearning: 'Full Stack Web Developer & Cloud APIs',
    alignedGovtScheme: 'NASSCOM FutureSkills Prime (IT-ITeS SSC)',
    currentModule: 'Step 4/5: Industry Coding Assessment & NOS Certification',
    progressPercent: 80,
    status: 'Active Learning',
    preferredLanguage: 'English / Kannada',
    enrolledDate: '10 Sep 2026',
    lastActive: '25 minutes ago',
    skills: ['Digital Literacy', 'Logical Problem Solving', 'English Communication'],
    newSkills: ['React & Next.js', 'RESTful APIs', 'Git Workflows', 'Cloud Deployment'],
    totalSteps: 5,
    completedSteps: 4,
    travelRadius: '15 km',
    employmentPreference: 'Wage employment',
    placementStatus: 'Technical Assessment Cleared',
    roadmapSteps: [
      { title: 'Web Fundamentals: HTML5, CSS & JavaScript', duration: '6 weeks', badge: 'Foundation', isCompleted: true },
      { title: 'Modern Front-End Development with React', duration: '6 weeks', badge: 'Core Skill', isCompleted: true },
      { title: 'Git, APIs & Full-Stack Capstone Project', duration: '5 weeks', badge: 'Hands-on Lab', isCompleted: true },
      { title: 'Industry Coding Assessment & Certification', duration: '2 weeks', badge: 'Govt Certification', isCompleted: true },
      { title: 'Tech Apprenticeship & Placement', duration: '6 weeks', badge: 'Launch', isCompleted: false }
    ]
  },
  {
    id: 'TS-09-105',
    serialId: 'TS-09-105',
    stateCode: 'TS',
    districtCode: '09',
    name: 'Mohammed Irfan',
    mobile: '+91 99887 76655',
    age: '26',
    location: 'Hyderabad, Telangana',
    district: 'Hyderabad',
    state: 'Telangana',
    education: '12th Pass',
    caste: 'OBC',
    familyIncome: '₹14,000 – ₹22,000',
    familyJob: 'Transport',
    currentJob: 'Cab & Commercial Driver',
    whatTheyAreLearning: 'Fleet Telematics & Logistics Warehouse Operations',
    alignedGovtScheme: 'Logistics Sector Skill Council (LSC NAPS)',
    currentModule: 'Step 3/5: Warehouse Barcode & RFID Inventory Management',
    progressPercent: 60,
    status: 'Active Learning',
    preferredLanguage: 'Telugu / Urdu',
    enrolledDate: '12 Sep 2026',
    lastActive: '4 hours ago',
    skills: ['Route Geography & Traffic Instincts', 'Vehicle Health Diagnostics', 'Transit Documentation'],
    newSkills: ['GPS Fleet Telematics', 'Warehouse Inward/Outward ERP', 'E-Way Bill Compliance'],
    totalSteps: 5,
    completedSteps: 3,
    travelRadius: '15 km',
    employmentPreference: 'Wage employment',
    placementStatus: 'Under Apprenticeship Contract',
    roadmapSteps: [
      { title: 'Supply Chain Operations & Road Transport Rules', duration: '3 weeks', badge: 'Foundation', isCompleted: true },
      { title: 'Fleet Telematics & Route Optimization Software', duration: '4 weeks', badge: 'Core Skill', isCompleted: true },
      { title: 'Warehouse Inward/Outward & Inventory Management', duration: '3 weeks', badge: 'Hands-on Lab', isCompleted: true },
      { title: 'Govt Logistics Certification Exam', duration: '2 weeks', badge: 'Govt Certification', isCompleted: false },
      { title: 'Placement with 3PL Fleet Companies', duration: '4 weeks', badge: 'Launch', isCompleted: false }
    ]
  }
];

export const INITIAL_TASKS: CoordinationTask[] = [
  {
    id: 'TASK-501',
    title: 'Allocate 30 seats for Solar Rooftop batch at Guindy Hub',
    roleOwner: 'Training Coordinator',
    assignedTo: 'Dr. K. Sundaram (Guindy Hub Director)',
    beneficiarySerialId: 'TN-32-101',
    beneficiaryName: 'Rohith Kumar & Cohort',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2026-10-05',
    category: 'Seat Allocation',
    notes: 'Verify lab equipment for DC high voltage strings. Priority quota for SC candidates under PM-AJAY.'
  },
  {
    id: 'TASK-502',
    title: 'Verify Aadhaar DBT seeding for PM-AJAY ₹50,000 capital subsidy',
    roleOwner: 'District Officer',
    assignedTo: 'S. Banerjee (Welfare Inspector Kolkata)',
    beneficiarySerialId: 'WB-02-104',
    beneficiaryName: 'Ananya Das',
    priority: 'High',
    status: 'Completed',
    dueDate: '2026-09-30',
    category: 'Grant Verification',
    notes: 'Bank linkage verified with PNB Ballygunge Branch. Ready for Phase-1 tranche disbursement.'
  },
  {
    id: 'TASK-503',
    title: 'Schedule Rozgar Mela interview with SunPower Clean Energy Ltd',
    roleOwner: 'Placement Coordinator',
    assignedTo: 'V. Jayaraman (Placement Officer)',
    beneficiarySerialId: 'TN-32-101',
    beneficiaryName: 'Rohith Kumar',
    priority: 'High',
    status: 'Completed',
    dueDate: '2026-10-02',
    category: 'Placement Drive',
    notes: 'Interview scheduled for 03 Oct, 10:30 AM at SunPower Guindy Yard.'
  },
  {
    id: 'TASK-504',
    title: 'Dispatch PM Vishwakarma motorized tailoring toolkit e-voucher',
    roleOwner: 'Field Officer',
    assignedTo: 'M. Ghosh (Field Assistant)',
    beneficiarySerialId: 'WB-02-104',
    beneficiaryName: 'Ananya Das',
    priority: 'Medium',
    status: 'In Progress',
    dueDate: '2026-10-08',
    category: 'Toolkit Dispatch',
    notes: 'E-voucher code generated on MSME portal. SMS notification pending candidate confirmation.'
  },
  {
    id: 'TASK-505',
    title: 'Mobilize 50 SC youth for Kisan Drone batch in Kamrej Block',
    roleOwner: 'Corporation / Implementing Agency',
    assignedTo: 'A. Patel (State Livelihood Mission)',
    priority: 'Medium',
    status: 'Pending',
    dueDate: '2026-10-15',
    category: 'Mobilization',
    notes: 'Conduct village level awareness meetings with Gram Panchayats.'
  }
];

export const INITIAL_CASES: SupportCase[] = [
  {
    id: 'CASE-101',
    beneficiaryName: 'Rohith Kumar',
    beneficiarySerialId: 'TN-32-101',
    mobile: '+91 98765 43210',
    issueCategory: 'Placement Issue',
    summary: 'Candidate requested travel allowance assistance for distant interview location.',
    priority: 'Medium',
    status: 'Resolved',
    assignedOfficer: 'V. Jayaraman',
    createdDate: '24 Sep 2026',
    notes: [
      'Beneficiary reported site location was 18km instead of 6km.',
      'Officer re-assigned candidate to Guindy Yard (6.4km within travel radius).'
    ],
    resolution: 'Successfully re-matched to nearby SunPower Guindy facility with daily travel stipend.'
  },
  {
    id: 'CASE-102',
    beneficiaryName: 'Ananya Das',
    beneficiarySerialId: 'WB-02-104',
    mobile: '+91 98300 11223',
    issueCategory: 'Documentation Issue',
    summary: 'Caste Certificate spelling mismatch with Aadhaar Card during portal upload.',
    priority: 'High',
    status: 'Resolved',
    assignedOfficer: 'S. Banerjee',
    createdDate: '20 Sep 2026',
    notes: [
      'Name on Aadhaar: Ananya Das; Caste Certificate had maiden name.',
      'Field officer assisted in submitting Tehsildar affidavit.'
    ],
    resolution: 'Affidavit uploaded on PM-AJAY portal; verification marked green.'
  },
  {
    id: 'CASE-103',
    beneficiaryName: 'Ramesh Patel',
    beneficiarySerialId: 'GJ-05-103',
    mobile: '+91 97123 45678',
    issueCategory: 'Technical Issue',
    summary: 'DGCA portal OTP delay during remote pilot digital logbook syncing.',
    priority: 'Low',
    status: 'Resolved',
    assignedOfficer: 'A. Patel',
    createdDate: '15 Sep 2026',
    notes: ['Server downtime on DGCA DigitalSky portal resolved after 24 hours.'],
    resolution: 'Digital logbook verified and license badge downloaded.'
  }
];

export const INITIAL_OUTCOMES: OutcomeRecord[] = [
  {
    beneficiaryId: 'TN-32-101',
    beneficiarySerialId: 'TN-32-101',
    beneficiaryName: 'Rohith Kumar',
    stage: 'Placement / Enterprise',
    outcomeStatus: 'Placed',
    employerOrVenture: 'SunPower Clean Energy Ltd',
    monthlySalary: '₹24,000 / month',
    placementDate: '28 Sep 2026',
    retentionStatus: 'Working Continuously',
    followUp30Notes: 'Candidate completed Day 1 orientation. Supervisor reported excellent wiring accuracy.',
    lastContactDate: 'Yesterday'
  },
  {
    beneficiaryId: 'WB-02-104',
    beneficiarySerialId: 'WB-02-104',
    beneficiaryName: 'Ananya Das',
    stage: 'Placement / Enterprise',
    outcomeStatus: 'Self-Employed',
    employerOrVenture: 'Shilpa Artisanal Boutique (Self-Employed Venture)',
    monthlySalary: '₹32,000 / month (Projected net)',
    placementDate: '22 Sep 2026',
    retentionStatus: 'Transitioned to Enterprise',
    followUp30Notes: 'PM-AJAY grant approved. Motorized machine operational in workshop.',
    lastContactDate: '3 days ago'
  },
  {
    beneficiaryId: 'GJ-05-103',
    beneficiarySerialId: 'GJ-05-103',
    beneficiaryName: 'Ramesh Patel',
    stage: '90-Day Follow-up',
    outcomeStatus: 'Placed',
    employerOrVenture: 'Kisan Dronetech Solutions (CHC Pilot)',
    monthlySalary: '₹28,000 / month',
    placementDate: '10 Aug 2026',
    retentionStatus: 'Working Continuously',
    followUp30Notes: 'Completed 30 days active flight operations over 400 acres.',
    followUp90Notes: 'Completed 90 days. Received ₹3,000 seasonal performance incentive.',
    lastContactDate: '1 week ago'
  }
];

export class AdminStore {
  // -------------------------------------------------------------
  // LEARNERS
  // -------------------------------------------------------------
  public static getLearners(): LearnerAdminRecord[] {
    if (typeof window === 'undefined') return INITIAL_LEARNERS;
    try {
      const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read admin learners from storage', e);
    }
    return INITIAL_LEARNERS;
  }

  public static saveLearners(learners: LearnerAdminRecord[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(learners));
    } catch (e) {
      console.warn('Could not save admin learners', e);
    }
  }

  public static findBySerialId(query: string): LearnerAdminRecord | undefined {
    if (!query || !query.trim()) return undefined;
    const cleanQ = query.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    const learners = this.getLearners();
    return learners.find(l => {
      const cleanId = (l.serialId || l.id).toUpperCase().replace(/[^A-Z0-9]/g, '');
      return cleanId === cleanQ || cleanId.includes(cleanQ) || (l.serialId && l.serialId.toUpperCase() === query.trim().toUpperCase());
    });
  }

  public static addLearner(newLearner: Omit<LearnerAdminRecord, 'id' | 'enrolledDate' | 'lastActive'>): LearnerAdminRecord {
    const learners = this.getLearners();
    const state = newLearner.stateCode || 'TN';
    const district = newLearner.districtCode || '32';
    const randomNum = Math.floor(100 + Math.random() * 900);
    const serialId = newLearner.serialId || `${state}-${district}-${randomNum}`;
    const created: LearnerAdminRecord = {
      ...newLearner,
      id: serialId,
      serialId,
      stateCode: state,
      districtCode: district,
      enrolledDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      lastActive: 'Just now'
    };
    const updated = [created, ...learners];
    this.saveLearners(updated);
    return created;
  }

  public static updateLearnerStatus(id: string, status: LearnerStatus): LearnerAdminRecord[] {
    const learners = this.getLearners();
    const updated = learners.map(lnr => {
      if (lnr.id === id || lnr.serialId === id) {
        return {
          ...lnr,
          status,
          lastActive: 'Just now',
          progressPercent: status === 'Completed & Certified' ? 100 : lnr.progressPercent
        };
      }
      return lnr;
    });
    this.saveLearners(updated);
    return updated;
  }

  public static syncActiveProfile(
    profile: UserProfile,
    mobileNumber: string,
    careerGoal: string,
    roadmap: GeneratedRoadmap | null
  ): void {
    if (!profile.name && !mobileNumber) return;

    const learners = this.getLearners();
    const cleanMobile = mobileNumber ? (mobileNumber.startsWith('+91') ? mobileNumber : `+91 ${mobileNumber}`) : '+91 98765 43210';
    const learnerName = profile.name || 'Active Learner';
    
    const existingIndex = learners.findIndex(
      l => l.name.toLowerCase() === learnerName.toLowerCase() || (mobileNumber && l.mobile.includes(mobileNumber.slice(-8)))
    );

    const completedSteps = roadmap ? roadmap.steps.filter(s => s.isCompleted).length : 0;
    const totalSteps = roadmap ? roadmap.steps.length : 5;
    const progressPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 10;
    
    let status: LearnerStatus = 'Active Learning';
    if (progressPercent === 100) {
      status = profile.employmentPreference === 'Self-employment' ? 'Self-Employed' : 'Completed & Certified';
    } else if (progressPercent === 0) {
      status = 'Onboarding';
    }

    const currentStepTitle = roadmap && roadmap.steps.length > 0 
      ? `Step ${completedSteps + 1 > totalSteps ? totalSteps : completedSteps + 1}/${totalSteps}: ${roadmap.steps[Math.min(completedSteps, totalSteps - 1)].title}`
      : 'Step 1/5: Initial Skill Assessment & AI Roadmap Creation';

    const state = profile.stateCode || 'TN';
    const district = profile.districtCode || '32';
    const userSerialId = profile.serialId || (existingIndex >= 0 ? learners[existingIndex].id : `${state}-${district}-101`);

    const recordData: LearnerAdminRecord = {
      id: userSerialId,
      serialId: userSerialId,
      stateCode: state,
      districtCode: district,
      name: learnerName,
      mobile: cleanMobile,
      age: profile.age || '19',
      location: profile.district ? `${profile.district}, ${profile.state || 'Tamil Nadu'}` : 'Chennai, Tamil Nadu',
      district: profile.district || 'Chennai',
      state: profile.state || 'Tamil Nadu',
      education: profile.education || 'Diploma in Electrical',
      caste: profile.caste || 'SC',
      familyIncome: profile.familyIncome || '₹10,000 – ₹20,000',
      familyJob: profile.familyJob || 'Farming',
      currentJob: profile.currentJob || 'Electrical Assistant',
      whatTheyAreLearning: careerGoal ? `${careerGoal} Pathway` : 'Solar PV Specialist & Rooftop Installation',
      alignedGovtScheme: roadmap?.alignment || 'PM-AJAY Skill Development Program (NISE & MNRE)',
      currentModule: currentStepTitle,
      progressPercent: Math.max(progressPercent, existingIndex >= 0 ? learners[existingIndex].progressPercent : 20),
      status,
      preferredLanguage: profile.preferredLanguage === 'ta' ? 'Tamil' : profile.preferredLanguage === 'hi' ? 'Hindi' : 'English',
      enrolledDate: existingIndex >= 0 ? learners[existingIndex].enrolledDate : 'Today',
      lastActive: 'Active Right Now',
      skills: normalizeSkills(profile.skills).length > 0 ? normalizeSkills(profile.skills) : ['Electrical basics', 'Hands-on tools'],
      newSkills: roadmap?.newSkillsToAcquire || ['Photovoltaic (PV) Cell Physics', 'DC Array Inverter Sizing', 'Rooftop Structural Mounting'],
      totalSteps,
      completedSteps,
      travelRadius: profile.travelRadius || '15 km',
      employmentPreference: profile.employmentPreference || 'Wage employment',
      placementStatus: existingIndex >= 0 ? learners[existingIndex].placementStatus : 'Matched with SunPower Solutions',
      roadmapSteps: roadmap?.steps.map(s => ({
        title: s.title,
        duration: s.duration,
        badge: s.badge,
        isCompleted: !!s.isCompleted
      }))
    };

    let updated: LearnerAdminRecord[];
    if (existingIndex >= 0) {
      updated = [...learners];
      updated[existingIndex] = { ...learners[existingIndex], ...recordData };
    } else {
      updated = [recordData, ...learners];
    }
    this.saveLearners(updated);
  }

  // -------------------------------------------------------------
  // COORDINATION TASKS (Feature 13)
  // -------------------------------------------------------------
  public static getTasks(): CoordinationTask[] {
    if (typeof window === 'undefined') return INITIAL_TASKS;
    try {
      const stored = localStorage.getItem(TASKS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return INITIAL_TASKS;
  }

  public static saveTasks(tasks: CoordinationTask[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {}
  }

  public static addTask(task: Omit<CoordinationTask, 'id'>): CoordinationTask {
    const tasks = this.getTasks();
    const newTask: CoordinationTask = {
      ...task,
      id: `TASK-${Math.floor(500 + Math.random() * 500)}`
    };
    const updated = [newTask, ...tasks];
    this.saveTasks(updated);
    return newTask;
  }

  public static updateTaskStatus(id: string, status: CoordinationTask['status']): CoordinationTask[] {
    const tasks = this.getTasks();
    const updated = tasks.map(t => t.id === id ? { ...t, status } : t);
    this.saveTasks(updated);
    return updated;
  }

  // -------------------------------------------------------------
  // FIELD SUPPORT CASES (Feature 12)
  // -------------------------------------------------------------
  public static getCases(): SupportCase[] {
    if (typeof window === 'undefined') return INITIAL_CASES;
    try {
      const stored = localStorage.getItem(CASES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return INITIAL_CASES;
  }

  public static saveCases(cases: SupportCase[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(CASES_STORAGE_KEY, JSON.stringify(cases));
    } catch (e) {}
  }

  public static addCase(newCase: Omit<SupportCase, 'id' | 'createdDate'>): SupportCase {
    const cases = this.getCases();
    const created: SupportCase = {
      ...newCase,
      id: `CASE-${Math.floor(100 + Math.random() * 900)}`,
      createdDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    const updated = [created, ...cases];
    this.saveCases(updated);
    return created;
  }

  public static updateCaseStatus(id: string, status: SupportCase['status'], note?: string): SupportCase[] {
    const cases = this.getCases();
    const updated = cases.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status,
          notes: note ? [...c.notes, note] : c.notes,
          resolution: status === 'Resolved' ? (c.resolution || 'Issue marked as resolved by field team.') : c.resolution
        };
      }
      return c;
    });
    this.saveCases(updated);
    return updated;
  }

  // -------------------------------------------------------------
  // OUTCOME RECORDS & FOLLOW-UPS (Feature 14)
  // -------------------------------------------------------------
  public static getOutcomes(): OutcomeRecord[] {
    if (typeof window === 'undefined') return INITIAL_OUTCOMES;
    try {
      const stored = localStorage.getItem(OUTCOMES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return INITIAL_OUTCOMES;
  }

  public static saveOutcomes(outcomes: OutcomeRecord[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(OUTCOMES_STORAGE_KEY, JSON.stringify(outcomes));
    } catch (e) {}
  }

  public static updateOutcome(beneficiarySerialId: string, partial: Partial<OutcomeRecord>): OutcomeRecord[] {
    const outcomes = this.getOutcomes();
    const exists = outcomes.find(o => o.beneficiarySerialId === beneficiarySerialId);
    let updated: OutcomeRecord[];
    if (exists) {
      updated = outcomes.map(o => o.beneficiarySerialId === beneficiarySerialId ? { ...o, ...partial } : o);
    } else {
      const newRec: OutcomeRecord = {
        beneficiaryId: beneficiarySerialId,
        beneficiarySerialId,
        beneficiaryName: partial.beneficiaryName || 'Beneficiary',
        stage: partial.stage || 'Training Enrolled',
        outcomeStatus: partial.outcomeStatus || 'Placed',
        lastContactDate: 'Just now',
        ...partial
      };
      updated = [newRec, ...outcomes];
    }
    this.saveOutcomes(updated);
    return updated;
  }

  // -------------------------------------------------------------
  // PM-AJAY PLANS (Feature 9)
  // -------------------------------------------------------------
  public static getPlans(): PMAJAYPlan[] {
    if (typeof window === 'undefined') return DEMO_PMAJAY_PLANS;
    try {
      const stored = localStorage.getItem(PLANS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return DEMO_PMAJAY_PLANS;
  }

  public static savePlans(plans: PMAJAYPlan[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify(plans));
    } catch (e) {}
  }

  public static updatePlan(planId: string, partial: Partial<PMAJAYPlan>): PMAJAYPlan[] {
    const plans = this.getPlans();
    const updated = plans.map(p => p.id === planId ? { ...p, ...partial } : p);
    this.savePlans(updated);
    return updated;
  }

  // -------------------------------------------------------------
  // TRAINING CENTERS (Feature 11)
  // -------------------------------------------------------------
  public static getCenters(): TrainingCenter[] {
    if (typeof window === 'undefined') return DEMO_TRAINING_CENTERS;
    try {
      const stored = localStorage.getItem(CENTERS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return DEMO_TRAINING_CENTERS;
  }

  public static saveCenters(centers: TrainingCenter[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(CENTERS_STORAGE_KEY, JSON.stringify(centers));
    } catch (e) {}
  }

  // -------------------------------------------------------------
  // OPPORTUNITIES & PLACEMENTS (Feature 6)
  // -------------------------------------------------------------
  public static getOpportunities(): Opportunity[] {
    if (typeof window === 'undefined') return DEMO_OPPORTUNITIES;
    try {
      const stored = localStorage.getItem(OPPS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return DEMO_OPPORTUNITIES;
  }

  public static saveOpportunities(opps: Opportunity[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(OPPS_STORAGE_KEY, JSON.stringify(opps));
    } catch (e) {}
  }

  public static updateOpportunityStatus(
    oppId: string,
    status: ApplicationStatus,
    interviewDate?: string,
    interviewTime?: string
  ): Opportunity[] {
    const opps = this.getOpportunities();
    const updated = opps.map(o => {
      if (o.id === oppId) {
        return {
          ...o,
          applicationStatus: status,
          interviewDate: interviewDate || o.interviewDate,
          interviewTime: interviewTime || o.interviewTime,
          joinedDate: status === 'Joined' ? new Date().toLocaleDateString('en-GB') : o.joinedDate
        };
      }
      return o;
    });
    this.saveOpportunities(updated);
    return updated;
  }

  // -------------------------------------------------------------
  // EXPORT CSV HELPERS (Feature 21)
  // -------------------------------------------------------------
  public static exportLearnersCSV(learners: LearnerAdminRecord[]): void {
    if (typeof window === 'undefined') return;

    const headers = [
      'Citizen Serial ID',
      'Full Name',
      'Mobile Number',
      'Age',
      'State',
      'District',
      'Social Category',
      'Education',
      'Background Job',
      'Aspiration / Learning Goal',
      'Aligned Scheme',
      'Progress (%)',
      'Status',
      'Placement / Enterprise Status'
    ];

    const rows = learners.map(l => [
      `"${l.serialId || l.id}"`,
      `"${l.name}"`,
      `"${l.mobile}"`,
      `"${l.age}"`,
      `"${l.state || 'Tamil Nadu'}"`,
      `"${l.district || 'Chennai'}"`,
      `"${l.caste || 'SC'}"`,
      `"${l.education}"`,
      `"${l.currentJob}"`,
      `"${l.whatTheyAreLearning}"`,
      `"${l.alignedGovtScheme}"`,
      `"${l.progressPercent}%"`,
      `"${l.status}"`,
      `"${l.placementStatus || l.enterpriseName || 'In Training'}"`
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    this.triggerDownload(csv, `pmajay_beneficiaries_report_${Date.now()}.csv`);
  }

  public static exportPlacementsCSV(): void {
    if (typeof window === 'undefined') return;
    const opps = this.getOpportunities();
    const headers = [
      'Opportunity ID',
      'Role Title',
      'Employer / Organization',
      'Industry',
      'Location',
      'Salary Range',
      'Employment Type',
      'Candidate Status',
      'Interview Date',
      'Govt Supported'
    ];

    const rows = opps.map(o => [
      `"${o.id}"`,
      `"${o.title}"`,
      `"${o.organization}"`,
      `"${o.industry}"`,
      `"${o.location}"`,
      `"${o.salaryRange}"`,
      `"${o.employmentType}"`,
      `"${o.applicationStatus}"`,
      `"${o.interviewDate || 'N/A'}"`,
      `"${o.isGovernmentSupported ? 'Yes' : 'No'}"`
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    this.triggerDownload(csv, `pmajay_placements_report_${Date.now()}.csv`);
  }

  public static exportPerspectivePlansCSV(): void {
    if (typeof window === 'undefined') return;
    const plans = this.getPlans();
    const headers = [
      'Plan ID',
      'District',
      'State',
      'Year',
      'Target Beneficiaries',
      'Enrolled',
      'Allocated Seats',
      'Active Centers',
      'Expected Placement Rate',
      'Enterprise Target',
      'Budget Allocated',
      'Budget Disbursed',
      'Status'
    ];

    const rows = plans.map(p => [
      `"${p.id}"`,
      `"${p.district}"`,
      `"${p.state}"`,
      `"${p.planYear}"`,
      `"${p.targetBeneficiaries}"`,
      `"${p.enrolledCount}"`,
      `"${p.trainingSeatsAllocated}"`,
      `"${p.activeCentersCount}"`,
      `"${p.expectedPlacementRate}"`,
      `"${p.enterpriseTarget}"`,
      `"${p.budgetAllocated}"`,
      `"${p.budgetDisbursed}"`,
      `"${p.status}"`
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    this.triggerDownload(csv, `pmajay_perspective_plan_report_${Date.now()}.csv`);
  }

  private static triggerDownload(content: string, filename: string): void {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
