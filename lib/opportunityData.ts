import {
  Opportunity,
  TrainingProgram,
  TrainingCenter,
  EnterprisePathway,
  PMAJAYPlan,
  UserProfile,
  ApplicationStatus
} from '@/types/skillbridge';

export const DEMO_OPPORTUNITIES: Opportunity[] = [
  // 1. Solar Rooftop Technician - SunPower Rooftop Solutions (Chennai)
  {
    id: 'opp-solar-1',
    title: 'Solar PV Rooftop Technician',
    organization: 'SunPower Clean Energy Ltd (Demo Employer)',
    industry: 'Green Energy / Solar EPC',
    location: 'Guindy Industrial Estate, Chennai',
    district: 'Chennai',
    state: 'Tamil Nadu',
    distanceKm: 6.4,
    requiredSkills: ['AC/DC Circuit Wiring', 'Rooftop Panel Mounting', 'Tool Safety', 'Multimeter Testing'],
    qualification: '10th / ITI / Diploma in Electrical or equivalent practical experience',
    salaryRange: '₹22,000 – ₹28,000 / month + Field Allowance',
    employmentType: 'Full-Time Wage',
    experienceRequired: '0–2 years (Freshers with Suryamitra certification welcomed)',
    accessibility: 'Accessible ground-floor assembly yard, elevator in main office',
    trainingRequirement: 'Suryamitra / Skill Council for Green Jobs Certification',
    sourceLabel: 'Prototype Opportunity Data',
    isGovernmentSupported: true,
    matchScore: 94,
    matchReasons: [
      'Matches Electrical Assistant background and circuit wiring skills',
      'Within selected 15 km travel radius (6.4 km from central Chennai)',
      '100% Free PM-AJAY / Suryamitra training partner on-site',
      'Compatible with Diploma / ITI educational background'
    ],
    applicationStatus: 'Recommended',
    contactPerson: 'Mr. S. Ramanathan (HR Field Ops)',
    phone: '+91 98401 23450'
  },

  // 2. Solar Farm Field Maintenance Trainee - Urja Bharat Renewables (Chennai Outer)
  {
    id: 'opp-solar-2',
    title: 'Solar Array Maintenance Trainee',
    organization: 'Urja Bharat Renewables (Demo Employer)',
    industry: 'Renewable Power Generation',
    location: 'Ambattur Industrial Estate, Chennai',
    district: 'Chennai',
    state: 'Tamil Nadu',
    distanceKm: 11.2,
    requiredSkills: ['Inverter Diagnostic Check', 'DC String Continuity', 'Safety Harness Protocol'],
    qualification: '10th Pass or ITI Wireman / Electrician',
    salaryRange: '₹20,000 – ₹26,000 / month + ESI & PF',
    employmentType: 'Apprenticeship',
    experienceRequired: 'Fresher Trainee',
    accessibility: 'Standard industrial plant facilities',
    trainingRequirement: 'NSDC Green Jobs Level 3 or 4',
    sourceLabel: 'Prototype Opportunity Data',
    isGovernmentSupported: true,
    matchScore: 88,
    matchReasons: [
      'NAPS government stipend subvention active (₹1,500 DBT/mo)',
      'Within 15 km travel radius (11.2 km)',
      'Direct absorption after 6 months apprenticeship'
    ],
    applicationStatus: 'Recommended',
    contactPerson: 'K. Balaji (Apprenticeship Lead)',
    phone: '+91 98402 34561'
  },

  // 3. Electrical Installation Assistant - L&T Construction Sub-Vendor (Chennai)
  {
    id: 'opp-elec-3',
    title: 'Commercial Conduit & DB Wiring Tech',
    organization: 'Apex Facility Engineering (Demo Employer)',
    industry: 'Commercial Construction & Infrastructure',
    location: 'Mount Road, Chennai',
    district: 'Chennai',
    state: 'Tamil Nadu',
    distanceKm: 4.8,
    requiredSkills: ['Conduit Bending', 'Distribution Board Dressing', 'Earthing Resistance'],
    qualification: '8th / 10th / ITI',
    salaryRange: '₹19,000 – ₹25,000 / month',
    employmentType: 'Full-Time Wage',
    experienceRequired: '6+ months electrical helper experience',
    accessibility: 'Site requires active physical mobility',
    trainingRequirement: 'Basic wireman competency test',
    sourceLabel: 'Prototype Opportunity Data',
    isGovernmentSupported: false,
    matchScore: 85,
    matchReasons: [
      'Directly matches your stated AC wiring strengths',
      'Very close distance (4.8 km)',
      'No formal degree barrier'
    ],
    applicationStatus: 'Recommended',
    contactPerson: 'M. Selvam',
    phone: '+91 98403 45672'
  },

  // 4. Custom Boutique Fashion Tailor - Shilpa Designs (Kolkata)
  {
    id: 'opp-tailor-4',
    title: 'Senior Master Pattern Tailor & Boutique Assistant',
    organization: 'Shilpa Artisanal Studio (Demo Employer)',
    industry: 'Apparel & Fashion Design',
    location: 'Gariahat Market, Kolkata',
    district: 'Kolkata',
    state: 'West Bengal',
    distanceKm: 5.2,
    requiredSkills: ['Blouse & Kurti Pattern Drafting', 'Single-Needle Precision', 'Fabric Cutting'],
    qualification: 'No formal schooling barrier / Literate',
    salaryRange: '₹18,000 – ₹26,000 / month + Piece-Rate Bonus',
    employmentType: 'Full-Time Wage',
    experienceRequired: '1+ years sewing / garment assembly',
    accessibility: 'First-floor studio, seating-friendly work benches',
    trainingRequirement: 'PM Vishwakarma Certificate preferred',
    sourceLabel: 'Prototype Opportunity Data',
    isGovernmentSupported: true,
    matchScore: 92,
    matchReasons: [
      '100% matches Garment Tailoring background and pattern cutting skills',
      'Within 10 km travel radius (5.2 km)',
      'Offers micro-enterprise incubation if transition to self-employment is desired'
    ],
    applicationStatus: 'Recommended',
    contactPerson: 'Mrs. Rupa Ganguly',
    phone: '+91 98305 67890'
  },

  // 5. Kisan Drone Field Operator - Krishi Seva Agri-Tech Hub (Surat)
  {
    id: 'opp-agri-5',
    title: 'Kisan Drone Remote Pilot & Spray Specialist',
    organization: 'Kisan Dronetech Solutions (Demo Employer)',
    industry: 'Smart Agriculture & Drone Tech',
    location: 'Bardoli Road, Surat',
    district: 'Surat',
    state: 'Gujarat',
    distanceKm: 14.5,
    requiredSkills: ['DGCA Drone Flight Protocol', 'Crop Spraying Mechanics', 'Field Safety'],
    qualification: '10th Standard Pass (DGCA requirement)',
    salaryRange: '₹24,000 – ₹32,000 / month + Daily Travelling Allowance',
    employmentType: 'Full-Time Wage',
    experienceRequired: 'Fresher DGCA Remote Pilot',
    accessibility: 'Outdoor field travel required',
    trainingRequirement: 'DGCA Remote Pilot License (SMAM subsidized)',
    sourceLabel: 'Prototype Opportunity Data',
    isGovernmentSupported: true,
    matchScore: 91,
    matchReasons: [
      'Combines agricultural field background with modern high-income technology',
      '100% covered under SMAM & Sub-Mission on Drone Technology',
      'High seasonal demand across nearby sugarcane and cotton belts'
    ],
    applicationStatus: 'Recommended',
    contactPerson: 'Mr. Arvind Mehta',
    phone: '+91 97124 56789'
  },

  // 6. Logistics Warehouse Associate - BlueDart E-Commerce Hub (Hyderabad)
  {
    id: 'opp-logistics-6',
    title: 'Warehouse Inventory & RF Scanner Associate',
    organization: 'SpeedLink Express Logistics (Demo Employer)',
    industry: 'Supply Chain & Transport',
    location: 'Shamshabad Logistics Hub, Hyderabad',
    district: 'Hyderabad',
    state: 'Telangana',
    distanceKm: 8.5,
    requiredSkills: ['RF Handheld Scanner', 'Dispatch Staging', 'E-Way Bill Checking'],
    qualification: '10th / 12th Pass',
    salaryRange: '₹20,000 – ₹27,000 / month + Overtime',
    employmentType: 'Full-Time Wage',
    experienceRequired: 'Fresher to 1 year',
    accessibility: 'Wheelchair ramp accessible in central admin bay',
    trainingRequirement: 'Logistics SSC NAPS Certification',
    sourceLabel: 'Prototype Opportunity Data',
    isGovernmentSupported: true,
    matchScore: 86,
    matchReasons: [
      'Bridges driving / transport background to air-conditioned warehouse supervision',
      'Guaranteed NAPS government apprenticeship stipend',
      'Within travel radius'
    ],
    applicationStatus: 'Recommended',
    contactPerson: 'T. Nageshwar Rao',
    phone: '+91 99881 23456'
  }
];

export const DEMO_TRAINING_PROGRAMS: TrainingProgram[] = [
  // 1. Suryamitra Solar PV Rooftop Technician (Chennai)
  {
    id: 'train-suryamitra-chennai',
    title: 'Suryamitra Solar PV Rooftop Technician',
    jobRole: 'Solar PV Installer & Maintenance Specialist',
    skillLevel: 'NSQF Level 4',
    nsqfLevel: 'Level 4',
    duration: '12 Weeks (300 Hours)',
    mode: 'Classroom & Hands-on Lab',
    trainingProvider: 'National Institute of Solar Energy (NISE) Aligned Center',
    centerName: 'PM-AJAY District Skill Hub, Guindy',
    location: 'Guindy Technical Campus, Chennai',
    district: 'Chennai',
    distanceKm: 4.2,
    eligibility: '10th Pass + ITI (Electrical/Wireman/Fitter) or 12th Science or Electrical Helper experience',
    certification: 'Govt of India Skill Council for Green Jobs (SCGJ) & NSDC Certificate',
    totalSeats: 30,
    availableSeats: 8,
    feeSupportStatus: '100% Free under PM-AJAY (Zero Fee for SC Beneficiaries) + ₹2,000/mo Stipend',
    placementSupport: 'Guaranteed Rozgar Mela Interviews with 12 Empanelled Solar EPC Firms (88% placement track record)',
    relatedSchemeCode: 'PM-AJAY',
    relatedSchemeName: 'Pradhan Mantri Anusuchit Jaati Abhyuday Yojana & PM Surya Ghar',
    demoLabel: 'Prototype Training Data',
    modules: [
      { title: 'DC Circuit Fundamentals & Photovoltaic Physics', hours: 40, practical: false, isCompleted: true },
      { title: 'Solar Array Inverter Sizing & Grid Synchronization', hours: 60, practical: true, isCompleted: true },
      { title: 'Rooftop Strut Mounting & Waterproof Anchoring', hours: 80, practical: true, isCompleted: false },
      { title: 'Testing, Commissioning, Earthing & Lightning Safety', hours: 60, practical: true, isCompleted: false },
      { title: 'Industry Apprenticeship & Soft Skills / Interview Prep', hours: 60, practical: true, isCompleted: false }
    ]
  },

  // 2. PM Vishwakarma Master Tailoring & Apparel Design (Kolkata)
  {
    id: 'train-vishwakarma-kolkata',
    title: 'PM Vishwakarma Master Tailoring & Boutique Design',
    jobRole: 'Custom Fashion Craftsman & Boutique Operator',
    skillLevel: 'NSQF Level 3',
    nsqfLevel: 'Level 3',
    duration: '6 Weeks (180 Hours)',
    mode: 'Classroom & Hands-on Lab',
    trainingProvider: 'Apparel Training & Design Centre (ATDC Kolkata)',
    centerName: 'District MSME Skilling Kendra, Gariahat',
    location: 'Ballygunge Circular Road, Kolkata',
    district: 'Kolkata',
    distanceKm: 3.8,
    eligibility: 'Practicing tailors or traditional artisan families; no formal education required',
    certification: 'PM Vishwakarma Official Digital ID & AMHSSC Skill Certificate',
    totalSeats: 25,
    availableSeats: 5,
    feeSupportStatus: '100% Free Training + ₹500/day Stipend (₹15,000 Free Toolkit E-Voucher)',
    placementSupport: 'Direct micro-credit tie-up with SBI/PNB for ₹1 Lakh - ₹2 Lakh collateral-free loan',
    relatedSchemeCode: 'PM-VISHWAKARMA',
    relatedSchemeName: 'PM Vishwakarma Scheme (Apparel & Tailoring)',
    demoLabel: 'Prototype Training Data',
    modules: [
      { title: 'Western Contemporary & Fusion Pattern Drafting', hours: 40, practical: true, isCompleted: true },
      { title: 'Industrial Motorized Sewing Machine Operation', hours: 40, practical: true, isCompleted: false },
      { title: 'Wholesale Fabric Sourcing & Cost Calculation', hours: 30, practical: false, isCompleted: false },
      { title: 'Instagram Product Photography & Social Commerce', hours: 40, practical: true, isCompleted: false },
      { title: 'MSME Udyam Registration & Bank Micro-Credit Filing', hours: 30, practical: false, isCompleted: false }
    ]
  },

  // 3. Kisan Drone Remote Pilot Training (Surat)
  {
    id: 'train-drone-surat',
    title: 'DGCA Kisan Drone Pilot Certification',
    jobRole: 'Agricultural Remote Pilot & Precision Sprayer',
    skillLevel: 'NSQF Level 4',
    nsqfLevel: 'Level 4',
    duration: '4 Weeks (100 Hours)',
    mode: 'Classroom & Hands-on Lab',
    trainingProvider: 'Gujarat Agricultural University Drone Flying School',
    centerName: 'SMAM Regional Agri-Tech Center, Surat',
    location: 'Kamrej Farm Campus, Surat',
    district: 'Surat',
    distanceKm: 12.0,
    eligibility: '10th Standard Pass + Valid Aadhaar + Passport / Police Verification',
    certification: 'DGCA Certified Remote Pilot License (RPA-1 Category)',
    totalSeats: 20,
    availableSeats: 4,
    feeSupportStatus: '100% Subsidized for SC/ST Farmers under SMAM Drone Mission',
    placementSupport: 'Linkage with Custom Hiring Centers (CHC) and Farmer Producer Organizations (FPO)',
    relatedSchemeCode: 'SMAM',
    relatedSchemeName: 'Sub-Mission on Agricultural Mechanization (SMAM)',
    demoLabel: 'Prototype Training Data',
    modules: [
      { title: 'Aviation Regulations & DGCA Airspace Classification', hours: 20, practical: false, isCompleted: true },
      { title: 'Flight Simulator Training & Emergency Maneuvers', hours: 30, practical: true, isCompleted: false },
      { title: 'Real Field Spraying Payload & Chemical Safety', hours: 30, practical: true, isCompleted: false },
      { title: 'e-NAM Agricultural Mandi Integration & Service Pricing', hours: 20, practical: false, isCompleted: false }
    ]
  },

  // 4. Logistics Warehouse Supervisor & Telematics (Hyderabad)
  {
    id: 'train-logistics-hyd',
    title: 'Logistics Warehouse Operations & Fleet Telematics',
    jobRole: 'Warehouse Supervisor / Fleet Coordinator',
    skillLevel: 'NSQF Level 4',
    nsqfLevel: 'Level 4',
    duration: '8 Weeks (200 Hours)',
    mode: 'Hybrid',
    trainingProvider: 'Logistics Sector Skill Council (LSC)',
    centerName: 'Telangana Multi-Modal Logistics Hub Center',
    location: 'Medchal Industrial Area, Hyderabad',
    district: 'Hyderabad',
    distanceKm: 9.5,
    eligibility: '10th / 12th Pass or Driving License Holders',
    certification: 'LSC Certified Warehouse Operations Supervisor',
    totalSeats: 35,
    availableSeats: 11,
    feeSupportStatus: '100% Free under PMKVY 4.0 + NAPS Stipend Support',
    placementSupport: 'Direct corporate interview drive with Amazon, Flipkart, BlueDart and Delhivery',
    relatedSchemeCode: 'PMKVY-4.0',
    relatedSchemeName: 'Pradhan Mantri Kaushal Vikas Yojana 4.0',
    demoLabel: 'Prototype Training Data',
    modules: [
      { title: 'Inward & Outward Barcode Inventory ERP Operations', hours: 40, practical: true, isCompleted: true },
      { title: 'Fleet GPS Telematics & Route Optimization', hours: 40, practical: true, isCompleted: false },
      { title: 'GST Transit Rules, E-Way Bill & Compliance', hours: 40, practical: false, isCompleted: false },
      { title: 'Shop Floor Safety, MHE Handling & Team Supervision', hours: 80, practical: true, isCompleted: false }
    ]
  }
];

export const DEMO_TRAINING_CENTERS: TrainingCenter[] = [
  {
    id: 'tc-chennai-1',
    centerName: 'PM-AJAY District Skill Hub, Guindy',
    district: 'Chennai',
    state: 'Tamil Nadu',
    location: 'Guindy Technical Campus, Chennai - 600032',
    courses: ['Suryamitra Solar PV Technician', 'Licensed Industrial Wireman', 'EV Battery Assembly'],
    totalSeats: 120,
    availableSeats: 26,
    trainerStatus: '4 Certified Master Trainers Active (SCGJ / NSDC)',
    batchStatus: 'Enrolling',
    placementSupport: 'Active Rozgar Mela partnership with 18 Chennai industrial units',
    accessibility: 'Ramp access, wide door corridors, ground floor heavy equipment lab',
    contactPhone: '+91 44 2235 1000'
  },
  {
    id: 'tc-chennai-2',
    centerName: 'NSDC Skill India Hub, Ambattur',
    district: 'Chennai',
    state: 'Tamil Nadu',
    location: 'Ambattur Industrial Estate, Chennai - 600058',
    courses: ['CNC Machine Operator', 'Solar Inverter Servicing', 'Apparel Pattern Cutting'],
    totalSeats: 150,
    availableSeats: 34,
    trainerStatus: '5 Certified Vocational Instructors',
    batchStatus: 'Ongoing',
    placementSupport: 'Tied with Ambattur Industrial Association',
    accessibility: 'Elevator, tactile tiles, accessible washrooms',
    contactPhone: '+91 44 2688 2000'
  },
  {
    id: 'tc-kolkata-1',
    centerName: 'District MSME Skilling Kendra, Gariahat',
    district: 'Kolkata',
    state: 'West Bengal',
    location: 'Ballygunge Circular Road, Kolkata - 700019',
    courses: ['PM Vishwakarma Master Tailoring', 'Leather Goods Artisan', 'Digital Commerce'],
    totalSeats: 90,
    availableSeats: 18,
    trainerStatus: '3 Master Craftsmen & 2 Digital Commerce Coaches',
    batchStatus: 'Enrolling',
    placementSupport: 'Direct linkage with New Market & Gariahat boutique networks',
    accessibility: 'Accessible ground floor workshop, ergonomic seating',
    contactPhone: '+91 33 2460 3000'
  },
  {
    id: 'tc-surat-1',
    centerName: 'SMAM Regional Agri-Tech Center, Surat',
    district: 'Surat',
    state: 'Gujarat',
    location: 'Kamrej Farm Campus, Surat - 394180',
    courses: ['DGCA Kisan Drone Pilot', 'Solar Drip Irrigation Setup', 'Organic Greenhouse Mgt'],
    totalSeats: 60,
    availableSeats: 12,
    trainerStatus: '2 DGCA Certified Flight Instructors + 2 Agronomists',
    batchStatus: 'Enrolling',
    placementSupport: 'Empanelled with 32 South Gujarat Farmer Producer Orgs',
    accessibility: 'Open field tarmac, wheelchair accessible briefing auditorium',
    contactPhone: '+91 261 245 4000'
  }
];

export const DEMO_ENTERPRISE_PATHWAYS: Record<string, EnterprisePathway> = {
  // Scenario B: Tailor -> Boutique
  fashion: {
    id: 'ent-fashion-boutique',
    enterpriseIdea: 'Custom Designer Boutique & Bridal Apparel Studio',
    tagline: 'High-margin custom tailoring, bridal alterations & social media direct orders',
    targetSector: 'Apparel, Handloom & Creative Economy',
    existingSkillsApplied: [
      'Single & double needle sewing speed',
      'Body measurement precision & garment fitting',
      'Hand embroidery & fabric finishing'
    ],
    skillsToAcquire: [
      'Western & Indo-Western fusion pattern cutting',
      'Wholesale fabric market sourcing (saving 40% on fabric costs)',
      'Smartphone product photography & Instagram Reels marketing',
      'Digital payment invoicing (UPI QR code) & customer bookkeeping'
    ],
    estimatedInvestment: '₹85,000 – ₹1,50,000',
    subsidyAvailable: '₹50,000 Direct PM-AJAY Capital Grant + ₹15,000 PM Vishwakarma Free Toolkit Voucher + ₹1 Lakh Mudra Loan @ 5% interest',
    setupChecklist: [
      { id: 'c1', task: 'Register MSME Udyam Certificate online (Zero fee, Aadhaar-based)', completed: true, category: 'Legal & Scheme' },
      { id: 'c2', task: 'Apply for PM-AJAY Direct Capital Subsidy (₹50,000 non-repayable grant)', completed: true, category: 'Legal & Scheme' },
      { id: 'c3', task: 'Redeem PM Vishwakarma ₹15,000 e-voucher for high-speed motorized machine', completed: false, category: 'Equipment & Space' },
      { id: 'c4', task: 'Source 3 wholesale fabric rolls from wholesale mandi (cotton, silk blend, linen)', completed: false, category: 'Equipment & Space' },
      { id: 'c5', task: 'Set up WhatsApp Business with 8 catalog items and automated greeting message', completed: false, category: 'Digital & Marketing' },
      { id: 'c6', task: 'Launch opening promotion: "First 10 Custom Blouses at 20% Off" in neighborhood', completed: false, category: 'Digital & Marketing' },
      { id: 'c7', task: 'Open separate Current / Business Bank Account with UPI Soundbox', completed: false, category: 'Working Capital' }
    ],
    requiredTools: [
      'Heavy-duty industrial motorized sewing machine with servo motor',
      'Overlock interlock machine (3-thread/4-thread)',
      'Steam iron with vacuum press table',
      'Tailoring shear kit, French curves & pattern tracing rulers',
      'Fabric mannequin dummy for trial fitting & photography'
    ],
    marketOpportunity: 'Surging demand for personalized designer blouses and bridal alterations. Average profit per designer outfit is ₹800 – ₹2,200 compared to ₹250 for basic tailoring.',
    applicableSchemes: [
      'Pradhan Mantri Anusuchit Jaati Abhyuday Yojana (PM-AJAY) ₹50,000 Grant',
      'PM Vishwakarma Toolkit Voucher (₹15,000) & 5% Concessional Credit',
      'Mahila Samriddhi Yojana (NSFDC ₹1,40,000 @ 4% p.a. for SC Women)'
    ],
    financeOptions: [
      'PM-AJAY 50% Capital Subsidy (₹50,000 non-repayable)',
      'PM Vishwakarma Tranche-1 Loan: ₹1,00,000 @ 5% interest (18-month tenure)',
      'Mudra Shishu Loan: Up to ₹50,000 zero collateral'
    ],
    actionSteps: [
      'Step 1: Complete PM Vishwakarma 6-week Master Boutique Workshop',
      'Step 2: Submit PM-AJAY grant dossier through District Welfare Office',
      'Step 3: Receive motorized machine & install in 80 sq.ft home workshop',
      'Step 4: Distribute flyers & post 5 WhatsApp status videos to neighborhood contacts',
      'Step 5: Target initial monthly profit of ₹30,000 by Month 3'
    ],
    status: 'Checklist Started'
  },

  // Scenario A (Alternative self-employment): Solar EPC Contractor
  solar: {
    id: 'ent-solar-contractor',
    enterpriseIdea: 'Independent Rooftop Solar EPC & Cleaning Contractor',
    tagline: 'Rooftop solar installation, periodic net-metering compliance & cleaning services',
    targetSector: 'Renewable Energy & Electrical Contracting',
    existingSkillsApplied: [
      'AC circuit wiring & DB board connections',
      'Insulated tool handling & rooftop safety',
      'Multimeter voltage & current diagnostics'
    ],
    skillsToAcquire: [
      'Solar net-metering DISCOM portal liaison & bi-directional meter testing',
      'DC string crimping & high-voltage junction box assembly',
      'Solar panel de-ionized water washing & efficiency enhancement',
      'Quotation formulation (costing panels, inverter, mounting rails per kW)'
    ],
    estimatedInvestment: '₹1,20,000 – ₹2,00,000',
    subsidyAvailable: '₹50,000 PM-AJAY Enterprise Grant + ₹1,00,000 NSFDC Micro-Credit @ 4% + Empanelment on PM Surya Ghar Vendor Portal',
    setupChecklist: [
      { id: 's1', task: 'Obtain Suryamitra / SCGJ Level 4 National Certificate', completed: true, category: 'Legal & Scheme' },
      { id: 's2', task: 'Register on National Solar Rooftop Portal as Empanelled Installer', completed: false, category: 'Legal & Scheme' },
      { id: 's3', task: 'Acquire Solar Tool Kit (MC4 crimper, torque wrench, insulation tester)', completed: false, category: 'Equipment & Space' },
      { id: 's4', task: 'Purchase telescopic water-fed panel cleaning brushes & de-ionizer', completed: false, category: 'Equipment & Space' },
      { id: 's5', task: 'Print 500 brochures targeting residential colony RWA associations', completed: false, category: 'Digital & Marketing' },
      { id: 's6', task: 'Secure first 3 residential 3kW rooftop contracts', completed: false, category: 'Working Capital' }
    ],
    requiredTools: [
      'Solar MC4 crimping tool & cable stripper set',
      '1000V DC rated digital multimeter & clamp meter',
      'Digital Earth Resistance Tester & Megohmmeter',
      'Full-body safety harness with double lanyard & fall arrester',
      'Cordless brushless rotary hammer drill & strut fastener sockets'
    ],
    marketOpportunity: 'PM Surya Ghar 1-Crore rooftop national target provides massive domestic customer demand. Technicians earn ₹8,000 – ₹15,000 profit margin per 3kW installation + recurring cleaning contracts.',
    applicableSchemes: [
      'PM-AJAY Capital Subsidy (Up to ₹50,000)',
      'NSFDC Concessional Credit for Scheduled Castes (₹5,00,000 @ 4%)',
      'PM Surya Ghar Rooftop Vendor Empanelment Grant'
    ],
    financeOptions: [
      'PM-AJAY 50% Capital Grant (₹50,000)',
      'NSFDC Laghu Vyavasay Loan (₹2,00,000 @ 4% p.a.)',
      'PM Mudra Kishor Loan (Up to ₹5,00,000)'
    ],
    actionSteps: [
      'Step 1: Finish Hands-on Rooftop Lab at Guindy Skill Hub',
      'Step 2: Form 2-person installation crew with fellow batchmate',
      'Step 3: Register as an MSME vendor with local state DISCOM (TANGEDCO)',
      'Step 4: Execute first 2 subsidized installations under master mentor',
      'Step 5: Target average monthly net income of ₹55,000+ by Month 4'
    ],
    status: 'Exploring'
  }
};

export const DEMO_PMAJAY_PLANS: PMAJAYPlan[] = [
  {
    id: 'plan-tn-chennai-2026',
    district: 'Chennai',
    state: 'Tamil Nadu',
    planYear: '2026–2027',
    targetBeneficiaries: 1800,
    enrolledCount: 1420,
    priorityOccupations: ['Solar PV Rooftop Technician', 'Industrial Automation Electrician', 'EV Battery Assembly', 'Digital Logistics Associate'],
    trainingSeatsAllocated: 1500,
    activeCentersCount: 6,
    expectedCompletionRate: '92%',
    expectedPlacementRate: '85%',
    enterpriseTarget: 250,
    priorityBlocks: ['Guindy Industrial Zone', 'Ambattur', 'Tondiarpet SC Cluster', 'Perambur'],
    budgetAllocated: '₹3,40,00,000',
    budgetDisbursed: '₹2,68,00,000',
    status: 'Approved'
  },
  {
    id: 'plan-wb-kolkata-2026',
    district: 'Kolkata',
    state: 'West Bengal',
    planYear: '2026–2027',
    targetBeneficiaries: 1400,
    enrolledCount: 980,
    priorityOccupations: ['Master Tailoring & Boutique Crafts', 'Handloom Value Addition', 'Leather Craftsmanship', 'Digital Marketing'],
    trainingSeatsAllocated: 1200,
    activeCentersCount: 4,
    expectedCompletionRate: '88%',
    expectedPlacementRate: '78%',
    enterpriseTarget: 400,
    priorityBlocks: ['Gariahat MSME Hub', 'Tangra SC Artisan Ward', 'Metabruz Garment Belt'],
    budgetAllocated: '₹2,80,00,000',
    budgetDisbursed: '₹1,95,00,000',
    status: 'Approved'
  },
  {
    id: 'plan-ka-bengaluru-2026',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    planYear: '2026–2027',
    targetBeneficiaries: 2200,
    enrolledCount: 1850,
    priorityOccupations: ['Full Stack Web Development', 'Data Annotation & AI Primer', 'Electronics Hardware Testing', 'Warehouse Logistics'],
    trainingSeatsAllocated: 2000,
    activeCentersCount: 8,
    expectedCompletionRate: '94%',
    expectedPlacementRate: '89%',
    enterpriseTarget: 180,
    priorityBlocks: ['Peenya Industrial Area', 'Electronic City Cluster', 'K.R. Puram'],
    budgetAllocated: '₹4,10,00,000',
    budgetDisbursed: '₹3,45,00,000',
    status: 'In Execution'
  },
  {
    id: 'plan-gj-surat-2026',
    district: 'Surat',
    state: 'Gujarat',
    planYear: '2026–2027',
    targetBeneficiaries: 1600,
    enrolledCount: 1340,
    priorityOccupations: ['Kisan Drone Pilot', 'Textile Weaving & Jacquard Operation', 'Solar Rooftop Technician', 'Diamond Polishing Automation'],
    trainingSeatsAllocated: 1450,
    activeCentersCount: 5,
    expectedCompletionRate: '90%',
    expectedPlacementRate: '86%',
    enterpriseTarget: 300,
    priorityBlocks: ['Kamrej Rural Block', 'Pandesara Industrial Area', 'Olpad'],
    budgetAllocated: '₹3,15,00,000',
    budgetDisbursed: '₹2,50,00,000',
    status: 'Approved'
  }
];

export class OpportunityService {
  /**
   * Matches prototype opportunities based on the beneficiary's profile,
   * career goal, travel radius, and education.
   */
  public static matchOpportunities(
    profile: UserProfile,
    targetGoal?: string
  ): Opportunity[] {
    const goalNorm = (targetGoal || profile.desiredOccupation || 'solar').toLowerCase();
    const radiusLimit = profile.travelRadius === '5 km' ? 5 :
                        profile.travelRadius === '15 km' ? 15 :
                        profile.travelRadius === '30 km' ? 30 : 50;

    return DEMO_OPPORTUNITIES.map(opp => {
      let score = 70;
      const reasons: string[] = [];

      // Check distance against user radius
      if (opp.distanceKm <= radiusLimit) {
        score += 15;
        reasons.push(`✓ Within your selected travel radius (${opp.distanceKm} km away)`);
      } else {
        score -= 10;
        reasons.push(`ℹ ${opp.distanceKm} km away (outside preferred ${profile.travelRadius || '15 km'})`);
      }

      // Check goal/trade relevance
      const isGoalRelevant = 
        opp.title.toLowerCase().includes(goalNorm) ||
        opp.industry.toLowerCase().includes(goalNorm) ||
        (goalNorm.includes('solar') && opp.title.toLowerCase().includes('solar')) ||
        (goalNorm.includes('tailor') && opp.title.toLowerCase().includes('tailor')) ||
        (goalNorm.includes('fashion') && opp.industry.toLowerCase().includes('apparel')) ||
        (goalNorm.includes('drone') && opp.title.toLowerCase().includes('drone')) ||
        (goalNorm.includes('electric') && opp.title.toLowerCase().includes('conduit'));

      if (isGoalRelevant) {
        score += 20;
        reasons.push(`✓ Aligned with your target career goal "${targetGoal || opp.title}"`);
      }

      // Check education suitability
      reasons.push(`✓ Compatible with your education (${profile.education || 'Vocational / Diploma'})`);

      // Check government benefit
      if (opp.isGovernmentSupported) {
        reasons.push(`✓ PM-AJAY / NAPS Government Stipend & Placement support verified`);
      }

      return {
        ...opp,
        matchScore: Math.min(score, 98),
        matchReasons: reasons
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  }

  /**
   * Matches training programs based on user goal and location
   */
  public static matchTraining(
    profile: UserProfile,
    targetGoal?: string
  ): TrainingProgram[] {
    const goalNorm = (targetGoal || 'solar').toLowerCase();

    return DEMO_TRAINING_PROGRAMS.filter(tp => {
      const match = 
        tp.title.toLowerCase().includes(goalNorm) ||
        tp.jobRole.toLowerCase().includes(goalNorm) ||
        (goalNorm.includes('solar') && tp.title.toLowerCase().includes('solar')) ||
        (goalNorm.includes('tailor') && tp.title.toLowerCase().includes('tailor')) ||
        (goalNorm.includes('fashion') && tp.title.toLowerCase().includes('tailor')) ||
        (goalNorm.includes('drone') && tp.title.toLowerCase().includes('drone'));
      return match;
    }).length > 0 ? DEMO_TRAINING_PROGRAMS.filter(tp => {
      return (
        tp.title.toLowerCase().includes(goalNorm) ||
        tp.jobRole.toLowerCase().includes(goalNorm) ||
        (goalNorm.includes('solar') && tp.title.toLowerCase().includes('solar')) ||
        (goalNorm.includes('tailor') && tp.title.toLowerCase().includes('tailor')) ||
        (goalNorm.includes('fashion') && tp.title.toLowerCase().includes('tailor')) ||
        (goalNorm.includes('drone') && tp.title.toLowerCase().includes('drone'))
      );
    }) : DEMO_TRAINING_PROGRAMS;
  }

  /**
   * Retrieves enterprise pathway
   */
  public static getEnterprisePathway(goal?: string): EnterprisePathway {
    const g = (goal || '').toLowerCase();
    if (g.includes('tailor') || g.includes('fashion') || g.includes('boutique') || g.includes('apparel')) {
      return DEMO_ENTERPRISE_PATHWAYS.fashion;
    }
    return DEMO_ENTERPRISE_PATHWAYS.solar;
  }
}
