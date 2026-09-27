'use client';

import { LearnerAdminRecord, LearnerStatus, UserProfile, GeneratedRoadmap } from '@/types/skillbridge';

const ADMIN_STORAGE_KEY = 'skillbridge_admin_learners_v4';

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
    education: 'Diploma in Electrical',
    caste: 'OBC',
    familyIncome: '₹10,000 – ₹20,000',
    familyJob: 'Farming',
    currentJob: 'Electrical Assistant',
    whatTheyAreLearning: 'Solar PV Specialist & Rooftop Installation',
    alignedGovtScheme: 'Suryamitra Skill Development Program (NISE & MNRE)',
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
    roadmapSteps: [
      { title: 'Foundational DC Circuit & Solar Fundamentals', duration: '3–4 weeks', badge: 'Foundation', isCompleted: true },
      { title: 'Inverter, Battery Storage & Grid-Tied Systems', duration: '4–6 weeks', badge: 'Core Skill', isCompleted: true },
      { title: 'Hands-on Rooftop & Ground Mount Installation', duration: '4 weeks', badge: 'Hands-on Lab', isCompleted: true },
      { title: 'Govt Suryamitra / NSDC Certification Exam', duration: '2 weeks', badge: 'Govt Certification', isCompleted: false },
      { title: 'Apprenticeship & Commercial Solar Contracting', duration: '6–8 weeks', badge: 'Launch', isCompleted: false }
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
    roadmapSteps: [
      { title: 'Web Fundamentals: HTML5, CSS & JavaScript', duration: '6 weeks', badge: 'Foundation', isCompleted: true },
      { title: 'Modern Front-End Development with React', duration: '6 weeks', badge: 'Core Skill', isCompleted: true },
      { title: 'Git, APIs & Full-Stack Capstone Project', duration: '5 weeks', badge: 'Hands-on Lab', isCompleted: true },
      { title: 'Industry Coding Assessment & Certification', duration: '2 weeks', badge: 'Govt Certification', isCompleted: true },
      { title: 'Tech Apprenticeship & Placement', duration: '6 weeks', badge: 'Launch', isCompleted: false }
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
    education: '10th Standard',
    caste: 'OBC',
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
    roadmapSteps: [
      { title: 'Precision Agriculture & Smart Irrigation Setup', duration: '3 weeks', badge: 'Foundation', isCompleted: true },
      { title: 'Kisan Drone Operation & Remote Sensing', duration: '3 weeks', badge: 'Core Skill', isCompleted: true },
      { title: 'Post-Harvest Value Addition & Cold Chain', duration: '4 weeks', badge: 'Hands-on Lab', isCompleted: true },
      { title: 'DGCA Kisan Drone Pilot Certification', duration: '2 weeks', badge: 'Govt Certification', isCompleted: true },
      { title: 'e-NAM Digital Mandi & Direct Retail Launch', duration: '4 weeks', badge: 'Launch', isCompleted: true }
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
    education: '12th Standard',
    caste: 'SC',
    familyIncome: '₹8,000 – ₹15,000',
    familyJob: 'Tailoring & Weaving',
    currentJob: 'Garment Tailor',
    whatTheyAreLearning: 'Custom Fashion Boutique & Instagram Social Commerce',
    alignedGovtScheme: 'PM Vishwakarma Scheme (Apparel & Tailoring)',
    currentModule: 'Step 2/5: Wholesale Fabric Sourcing & Cost Optimization',
    progressPercent: 40,
    status: 'Active Learning',
    preferredLanguage: 'Bengali / Hindi',
    enrolledDate: '05 Sep 2026',
    lastActive: '3 hours ago',
    skills: ['Pattern Cutting', 'Garment Assembly Speed', 'Body Measurement Precision'],
    newSkills: ['Western Pattern Drafting', 'Digital Portfolio & Instagram Reels', 'Udyam Registration'],
    totalSteps: 5,
    completedSteps: 2,
    roadmapSteps: [
      { title: 'Contemporary Western & Fusion Pattern Drafting', duration: '3 weeks', badge: 'Foundation', isCompleted: true },
      { title: 'Fabric Sourcing, Textile Blends & Cost Optimization', duration: '3 weeks', badge: 'Core Skill', isCompleted: true },
      { title: 'Boutique Branding, Cataloging & Social Commerce', duration: '4 weeks', badge: 'Hands-on Lab', isCompleted: false },
      { title: 'MSME Udyam & GST Registration', duration: '1 week', badge: 'Govt Certification', isCompleted: false },
      { title: 'Boutique Launch & Bridal Scaling', duration: '4 weeks', badge: 'Launch', isCompleted: false }
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
    education: '12th Pass',
    caste: 'General',
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
    roadmapSteps: [
      { title: 'Supply Chain Operations & Road Transport Rules', duration: '3 weeks', badge: 'Foundation', isCompleted: true },
      { title: 'Fleet Telematics & Route Optimization Software', duration: '4 weeks', badge: 'Core Skill', isCompleted: true },
      { title: 'Warehouse Inward/Outward & Inventory Management', duration: '3 weeks', badge: 'Hands-on Lab', isCompleted: true },
      { title: 'Govt Logistics Certification Exam', duration: '2 weeks', badge: 'Govt Certification', isCompleted: false },
      { title: 'Placement with 3PL Fleet Companies', duration: '4 weeks', badge: 'Launch', isCompleted: false }
    ]
  },
  {
    id: 'UP-32-106',
    serialId: 'UP-32-106',
    stateCode: 'UP',
    districtCode: '32',
    name: 'Sunita Devi',
    mobile: '+91 94150 99881',
    age: '31',
    location: 'Lucknow, Uttar Pradesh',
    education: 'B.A Graduate',
    caste: 'OBC',
    familyIncome: '₹15,000 – ₹25,000',
    familyJob: 'Small Business',
    currentJob: 'Homemaker / Looking for Work',
    whatTheyAreLearning: 'Digital Marketing, Canva Graphics & Local SEO',
    alignedGovtScheme: 'Skill India Digital Hub (Media Literacy)',
    currentModule: 'Step 1/5: Social Media Strategy & Canva Visual Creation',
    progressPercent: 20,
    status: 'Milestone In-Progress',
    preferredLanguage: 'Hindi',
    enrolledDate: '22 Sep 2026',
    lastActive: '5 hours ago',
    skills: ['Creative Writing', 'Community Empathy', 'Smartphone Fluency'],
    newSkills: ['Canva Pro Graphics', 'Meta Ads Manager', 'Google Maps Business Optimization'],
    totalSteps: 5,
    completedSteps: 1,
    roadmapSteps: [
      { title: 'Social Media Strategy & Canva Visual Creation', duration: '4 weeks', badge: 'Foundation', isCompleted: true },
      { title: 'Meta Ads Manager & Targeted Local Campaigns', duration: '4 weeks', badge: 'Core Skill', isCompleted: false },
      { title: 'Google Business Profile, SEO & Local Search', duration: '3 weeks', badge: 'Hands-on Lab', isCompleted: false },
      { title: 'AI Productivity Tools & NSQF Certification', duration: '2 weeks', badge: 'Govt Certification', isCompleted: false },
      { title: 'Freelance Agency Setup & Client Retainers', duration: '4 weeks', badge: 'Launch', isCompleted: false }
    ]
  },
  {
    id: 'RJ-14-107',
    serialId: 'RJ-14-107',
    stateCode: 'RJ',
    districtCode: '14',
    name: 'Vikram Singh',
    mobile: '+91 98290 44332',
    age: '24',
    location: 'Jaipur, Rajasthan',
    education: '10th Pass + ITI Wireman',
    caste: 'General',
    familyIncome: '₹10,000 – ₹18,000',
    familyJob: 'Construction',
    currentJob: 'Construction Site Mason Helper',
    whatTheyAreLearning: 'Licensed Industrial Electrician & Conduit Wiring',
    alignedGovtScheme: 'PMKVY 4.0 Construction Sector Skill Council',
    currentModule: 'Step 4/5: State Licensing Board Wireman Exam',
    progressPercent: 80,
    status: 'Active Learning',
    preferredLanguage: 'Hindi',
    enrolledDate: '28 Aug 2026',
    lastActive: 'Yesterday',
    skills: ['Physical Conduit Chasing', 'Power Tool Operation', 'Blueprint Awareness'],
    newSkills: ['Ohm\'s Law & 3-Phase DB Dressing', 'MCB/ELCB Breaker Testing', 'State Wireman License'],
    totalSteps: 5,
    completedSteps: 4,
    roadmapSteps: [
      { title: 'Electrical Safety & Basic Circuit Theory', duration: '4 weeks', badge: 'Foundation', isCompleted: true },
      { title: 'Residential & Commercial Conduit Wiring', duration: '6 weeks', badge: 'Core Skill', isCompleted: true },
      { title: 'Appliance Repair & Fault Finding Practice', duration: '4 weeks', badge: 'Hands-on Lab', isCompleted: true },
      { title: 'Electrical Wireman Licensing Exam', duration: '2 weeks', badge: 'Govt Certification', isCompleted: true },
      { title: 'Independent Contracting or Facility Placement', duration: '8 weeks', badge: 'Launch', isCompleted: false }
    ]
  },
  {
    id: 'MH-12-108',
    serialId: 'MH-12-108',
    stateCode: 'MH',
    districtCode: '12',
    name: 'Deepak Verma',
    mobile: '+91 91580 77665',
    age: '21',
    location: 'Pune, Maharashtra',
    education: 'ITI Welder',
    caste: 'OBC',
    familyIncome: '₹12,000 – ₹20,000',
    familyJob: 'Metal Workshop',
    currentJob: 'Workshop Apprentice',
    whatTheyAreLearning: 'Robotic Arc Welding & Automated CNC Operation',
    alignedGovtScheme: 'Capital Goods Skill Council (CGSC Certification)',
    currentModule: 'Step 5/5: Industry Placement & Final License Award',
    progressPercent: 100,
    status: 'Completed & Certified',
    preferredLanguage: 'Marathi / Hindi',
    enrolledDate: '15 Jul 2026',
    lastActive: '2 days ago',
    skills: ['Arc Welding', 'Safety Equipment Handling', 'Metal Fabrication'],
    newSkills: ['Robotic Arm Programming', 'CNC G-Code Coordinates', 'Ultrasonic Weld Testing'],
    totalSteps: 5,
    completedSteps: 5,
    roadmapSteps: [
      { title: 'Advanced Metallurgy & Shielded Metal Arc Welding', duration: '3 weeks', badge: 'Foundation', isCompleted: true },
      { title: 'MIG/TIG Precision Gas Welding', duration: '4 weeks', badge: 'Core Skill', isCompleted: true },
      { title: 'Robotic Welding Arm Programming & Teach Pendant', duration: '4 weeks', badge: 'Hands-on Lab', isCompleted: true },
      { title: 'ASME Section IX Welder Qualification Test', duration: '2 weeks', badge: 'Govt Certification', isCompleted: true },
      { title: 'Automotive OEM Tier-1 Placement & Apprenticeship', duration: '6 weeks', badge: 'Launch', isCompleted: true }
    ]
  }
];

export class AdminStore {
  public static getLearners(): LearnerAdminRecord[] {
    if (typeof window === 'undefined') return INITIAL_LEARNERS;
    try {
      const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Normalize any older records to the standard state-district-number serial ID format
          return parsed.map((l: LearnerAdminRecord, idx: number) => {
            const base = INITIAL_LEARNERS[idx] || INITIAL_LEARNERS[0];
            const state = l.stateCode || (l.location && l.location.includes('Karnataka') ? 'KA' : l.location && l.location.includes('Gujarat') ? 'GJ' : 'TN');
            const district = l.districtCode || (state === 'TN' ? '32' : '01');
            const idToUse = (!l.id || l.id.startsWith('LNR-')) ? (base ? base.id : `${state}-${district}-${100 + idx}`) : l.id;
            return {
              ...l,
              id: idToUse,
              serialId: l.serialId || idToUse,
              stateCode: l.stateCode || state,
              districtCode: l.districtCode || district,
              familyJob: l.familyJob || base.familyJob || 'Farming / Trade'
            };
          });
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
      console.warn('Could not save admin learners to storage', e);
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
    
    // Check if user already exists
    const existingIndex = learners.findIndex(
      l => l.name.toLowerCase() === learnerName.toLowerCase() || (mobileNumber && l.mobile.includes(mobileNumber.slice(-8)))
    );

    const completedSteps = roadmap ? roadmap.steps.filter(s => s.isCompleted).length : 0;
    const totalSteps = roadmap ? roadmap.steps.length : 5;
    const progressPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 10;
    const status: LearnerStatus = progressPercent === 100 
      ? 'Completed & Certified' 
      : progressPercent > 0 
      ? 'Active Learning' 
      : 'Onboarding';

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
      location: 'Chennai, Tamil Nadu',
      education: profile.education || 'Diploma in Electrical',
      caste: profile.caste || 'OBC',
      familyIncome: profile.familyIncome || '₹10,000 – ₹20,000',
      familyJob: profile.familyJob || 'Farming',
      currentJob: profile.currentJob || 'Electrical Assistant',
      whatTheyAreLearning: careerGoal ? `${careerGoal} Pathway` : 'Solar PV Specialist & Rooftop Installation',
      alignedGovtScheme: roadmap?.alignment || 'Suryamitra Skill Development Program (NISE & MNRE)',
      currentModule: currentStepTitle,
      progressPercent: Math.max(progressPercent, existingIndex >= 0 ? learners[existingIndex].progressPercent : 20),
      status,
      preferredLanguage: 'Tamil / English',
      enrolledDate: existingIndex >= 0 ? learners[existingIndex].enrolledDate : 'Today',
      lastActive: 'Active Right Now',
      skills: profile.skills && profile.skills.length > 0 ? profile.skills : ['Electrical basics', 'Hands-on tools'],
      newSkills: roadmap?.newSkillsToAcquire || ['Photovoltaic (PV) Cell Physics', 'DC Array Inverter Sizing', 'Rooftop Structural Mounting'],
      totalSteps,
      completedSteps,
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

  public static exportLearnersCSV(learners: LearnerAdminRecord[]): void {
    if (typeof window === 'undefined') return;

    const headers = [
      'Learner ID',
      'Full Name',
      'Mobile Number',
      'Age',
      'Location',
      'Education',
      'Background Job',
      'What They Are Learning',
      'Government Scheme',
      'Current Module',
      'Progress (%)',
      'Status',
      'Last Active'
    ];

    const rows = learners.map(l => [
      `"${l.id}"`,
      `"${l.name}"`,
      `"${l.mobile}"`,
      `"${l.age}"`,
      `"${l.location}"`,
      `"${l.education}"`,
      `"${l.currentJob}"`,
      `"${l.whatTheyAreLearning}"`,
      `"${l.alignedGovtScheme}"`,
      `"${l.currentModule}"`,
      `"${l.progressPercent}%"`,
      `"${l.status}"`,
      `"${l.lastActive}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `skillbridge_learners_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
