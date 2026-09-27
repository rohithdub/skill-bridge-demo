import { GeneratedRoadmap, UserProfile } from '@/types/skillbridge';

export interface PredefinedPathway {
  currentJobKeywords: string[];
  goalKeywords: string[];
  title: string;
  transferableInsight: string;
  transferableSkills: string[];
  newSkillsToAcquire: string[];
  estimatedTotalMonths: string;
  potentialSalaryGrowth: string;
  alignment: string;
  steps: {
    title: string;
    duration: string;
    badge: string;
    description: string;
    skills: string[];
    trainingType: 'Foundational' | 'Domain Skill' | 'Hands-on Lab' | 'Govt Certification' | 'Industry Placement' | 'Self-Employment Launch';
    certification?: string;
    freeGovtScheme?: string;
  }[];
}

export const PREDEFINED_PATHWAYS: PredefinedPathway[] = [
  // 1. Electrical Assistant / Electrician -> Solar Technician
  {
    currentJobKeywords: ['electrical', 'electrician', 'assistant electrician', 'wireman'],
    goalKeywords: ['solar', 'solar technician', 'solar installer', 'renewable energy', 'solar engineer'],
    title: 'Electrical Background to Solar PV Specialist',
    transferableInsight: 'Your practical knowledge of AC wiring, circuit breakers, and electrical safety provides a huge 40% head start. Solar systems require strong DC-to-AC integration, which you already fundamentally understand.',
    transferableSkills: ['AC Circuit Wiring', 'Tool Handling & Safety', 'Multimeter Testing', 'Schematic Reading'],
    newSkillsToAcquire: ['Photovoltaic (PV) Cell Physics', 'DC Array Inverter Sizing', 'Rooftop Structural Mounting', 'Net Metering Compliance'],
    estimatedTotalMonths: '4 – 6 Months',
    potentialSalaryGrowth: '₹12,000/mo → ₹28,000–₹35,000/mo',
    alignment: 'Suryamitra Skill Development Program (NISE & MNRE)',
    steps: [
      {
        title: 'Foundational DC Circuit & Solar Fundamentals',
        duration: '3–4 weeks',
        badge: 'Foundation',
        description: 'Bridge your AC electrical experience into DC solar arrays, solar irradiance calculation, and PV cell characteristics.',
        skills: ['Solar PV Cell Physics', 'DC Voltage & Current Behavior', 'Series & Parallel Stringing'],
        trainingType: 'Foundational',
        freeGovtScheme: 'Skill India Digital Hub - Solar Basics'
      },
      {
        title: 'Inverter, Battery Storage & Grid-Tied Systems',
        duration: '4–6 weeks',
        badge: 'Core Skill',
        description: 'Master on-grid, off-grid, and hybrid inverters, charge controllers, and lithium/lead-acid storage integration.',
        skills: ['Inverter Sizing', 'Battery Bank Design', 'Earthing & Lightning Arrestors', 'Net-Metering'],
        trainingType: 'Domain Skill',
        certification: 'NSQF Level 4: Solar PV Installer'
      },
      {
        title: 'Hands-on Rooftop & Ground Mount Installation',
        duration: '4 weeks',
        badge: 'Hands-on Lab',
        description: 'Physical installation of mounting structures, tilt angle optimization, conduit routing, and waterproofing.',
        skills: ['Rooftop Rigging & Safety', 'Torque Specifications', 'Waterproof Sealants', 'Cable Trays'],
        trainingType: 'Hands-on Lab',
        freeGovtScheme: 'PM Surya Ghar: Muft Bijli Yojana Training Partner'
      },
      {
        title: 'Govt Suryamitra / NSDC Certification Exam',
        duration: '2 weeks',
        badge: 'Govt Certification',
        description: 'Complete the government-recognized assessment to obtain your authorized Suryamitra Technician license.',
        skills: ['Grid Interconnection Standards', 'CEA Safety Regulations', 'Discom Compliance Verification'],
        trainingType: 'Govt Certification',
        certification: 'NISE / NSDC Certified Suryamitra Technician',
        freeGovtScheme: 'National Institute of Solar Energy (NISE) Free Sponsorship'
      },
      {
        title: 'Apprenticeship & Commercial Solar Contracting',
        duration: '6–8 weeks',
        badge: 'Launch',
        description: 'Partner with local EPC solar installers for commercial projects or launch your own residential solar service enterprise.',
        skills: ['Client Site Feasibility Audits', 'Quotation & Subsidy Processing', 'O&M Troubleshooting'],
        trainingType: 'Industry Placement',
        freeGovtScheme: 'PMEGP / Mudra Loan Support for Solar Micro-Enterprises'
      }
    ]
  },

  // 2. Construction Worker -> Electrician / Electrical Technician
  {
    currentJobKeywords: ['construction', 'laborer', 'mason', 'helper', 'building worker'],
    goalKeywords: ['electrician', 'electrical', 'wireman', 'technician'],
    title: 'Construction Experience to Licensed Wireman / Electrician',
    transferableInsight: 'Your experience on active construction jobsites gives you physical endurance, knowledge of building structural layouts, and practical safety familiarity—saving months of basic site orientation.',
    transferableSkills: ['Building Blueprint Awareness', 'Power Tool Operation', 'Site Safety Precautions', 'Physical Conduit Chasing'],
    newSkillsToAcquire: ['Ohm\'s Law & Single Phase / Three Phase Power', 'Distribution Board (DB) Dressing', 'House Wiring Standards', 'Safety Relay Installation'],
    estimatedTotalMonths: '5 – 6 Months',
    potentialSalaryGrowth: '₹9,000/mo → ₹22,000–₹30,000/mo',
    alignment: 'PMKVY 4.0 Construction Sector Skill Council',
    steps: [
      {
        title: 'Electrical Safety & Basic Circuit Theory',
        duration: '4 weeks',
        badge: 'Foundation',
        description: 'Learn electricity behavior, voltage, current, resistance, earthing methods, and shock prevention.',
        skills: ['Electrical Safety Gear', 'Ohm\'s Law', 'Wire Color Codes', 'Earthing Basics'],
        trainingType: 'Foundational',
        freeGovtScheme: 'PMKVY Free Short-Term Training'
      },
      {
        title: 'Residential & Commercial Conduit Wiring',
        duration: '6 weeks',
        badge: 'Core Skill',
        description: 'Concealed PVC pipe laying, wire pulling, switchboard connections, MCB/ELCB breaker installations.',
        skills: ['Concealed Piping', 'Cable Pulling', 'MCB Box Dressing', 'Two-Way Switch Circuits'],
        trainingType: 'Domain Skill',
        certification: 'NSQF Level 3: Assistant Electrician'
      },
      {
        title: 'Appliance Repair & Fault Finding Practice',
        duration: '4 weeks',
        badge: 'Hands-on Lab',
        description: 'Troubleshooting ceiling fans, motors, water heaters, and short circuits using test lamps and multimeters.',
        skills: ['Fault Diagnostic Techniques', 'Motor Rewinding Basics', 'Insulation Megger Testing'],
        trainingType: 'Hands-on Lab',
        freeGovtScheme: 'ITI Skill Hub Center Practical Labs'
      },
      {
        title: 'Electrical Wireman Licensing Exam',
        duration: '2 weeks',
        badge: 'Govt Certification',
        description: 'Clear state electrical licensing board assessment for Grade II wireman certification.',
        skills: ['Indian Electricity Rules (1956)', 'Discom Safety Standards', 'Electrical Inspection Clearance'],
        trainingType: 'Govt Certification',
        certification: 'State Licensing Board Wireman License'
      },
      {
        title: 'Independent Contracting or Facility Placement',
        duration: '8 weeks',
        badge: 'Launch',
        description: 'Register with Urban Company / local builder contractors or set up an independent residential electrical shop.',
        skills: ['Estimating Material Quantities', 'Customer Invoicing', 'Emergency Breakdown Service'],
        trainingType: 'Industry Placement',
        freeGovtScheme: 'PM SVANidhi / Mudra Shishu Scheme'
      }
    ]
  },

  // 3. Farmer / Agricultural Background -> Agri-Tech Entrepreneur
  {
    currentJobKeywords: ['farmer', 'farming', 'agriculture', 'cultivator', 'dairy'],
    goalKeywords: ['agri-tech', 'entrepreneur', 'organic farming', 'agribusiness', 'drone', 'smart farming', 'agri business'],
    title: 'Traditional Farming to Modern Agri-Tech Business',
    transferableInsight: 'Generational intuition for soil health, weather cycles, crop diseases, and harvest timings provides an unbeatable grassroots advantage over purely academic technologists.',
    transferableSkills: ['Crop Lifecycle Intuition', 'Soil & Water Assessment', 'Pest Identification', 'Farm Labor Coordination'],
    newSkillsToAcquire: ['Drip Irrigation Automation', 'Kisan Drone Spraying', 'Direct-to-Consumer Digital Mandi Selling', 'Organic Certification'],
    estimatedTotalMonths: '3 – 5 Months',
    potentialSalaryGrowth: '₹8,000–₹12,000/mo → ₹35,000–₹60,000/mo profit',
    alignment: 'Sub-Mission on Agricultural Mechanization (SMAM) & Agri-Clinics Scheme',
    steps: [
      {
        title: 'Precision Agriculture & Smart Irrigation Setup',
        duration: '3 weeks',
        badge: 'Foundation',
        description: 'Learn sensor-based soil moisture probes, automated solenoid valves, and solar drip fertigation.',
        skills: ['Micro-Irrigation Tech', 'Soluble Fertilizers', 'Solar Pump Automation'],
        trainingType: 'Foundational',
        freeGovtScheme: 'Krishi Vigyan Kendra (KVK) Free Workshops'
      },
      {
        title: 'Kisan Drone Operation & Remote Sensing',
        duration: '3 weeks',
        badge: 'Core Skill',
        description: 'Obtain DGCA remote pilot license for spraying micronutrients and aerial crop surveillance.',
        skills: ['Kisan Drone Flight Ops', 'Battery & Payload Maintenance', 'Bio-Pesticide Precision Spraying'],
        trainingType: 'Domain Skill',
        certification: 'DGCA Certified Kisan Drone Remote Pilot'
      },
      {
        title: 'Post-Harvest Value Addition & Food Processing',
        duration: '4 weeks',
        badge: 'Hands-on Lab',
        description: 'Cold storage preservation, solar dehydration of vegetables/spices, packaging and FSSAI standards.',
        skills: ['Cold Chain Logistics', 'Vacuum Packaging', 'FSSAI Hygiene Norms', 'Shelf-Life Extension'],
        trainingType: 'Hands-on Lab',
        freeGovtScheme: 'PM Formalisation of Micro Food Processing Enterprises (PMFME)'
      },
      {
        title: 'FSSAI & Organic Export Certification',
        duration: '2 weeks',
        badge: 'Govt Certification',
        description: 'Complete Jaivik Bharat / NPOP organic registration and FSSAI food business licensing.',
        skills: ['NPOP Documentation', 'Traceability Tagging', 'Organic Compliance Audits'],
        trainingType: 'Govt Certification',
        certification: 'Jaivik Bharat Organic Producer Accreditation'
      },
      {
        title: 'e-NAM Digital Mandi & Direct Retail Launch',
        duration: '4 weeks',
        badge: 'Launch',
        description: 'Eliminate middlemen by onboarding onto e-NAM, ONDC agri networks, and direct consumer supply chains.',
        skills: ['Digital Payment Collection', 'Bulk Transport Negotiations', 'Customer Relationship Management'],
        trainingType: 'Self-Employment Launch',
        freeGovtScheme: 'Agriculture Infrastructure Fund (AIF) 3% Interest Subvention'
      }
    ]
  },

  // 4. Tailor / Garment Worker -> Fashion Entrepreneur / Boutique Owner
  {
    currentJobKeywords: ['tailor', 'stitching', 'garment', 'sewing', 'embroidery'],
    goalKeywords: ['fashion', 'boutique', 'fashion entrepreneur', 'designer', 'apparel business'],
    title: 'Craftsperson to High-Margin Custom Fashion Boutique',
    transferableInsight: 'Your mastery over fabric fall, machine tension, stitch density, and custom alterations allows you to supervise quality control and deliver bespoke fitting far better than pure design graduates.',
    transferableSkills: ['Pattern Cutting', 'Garment Assembly Speed', 'Fabric Texture Knowledge', 'Body Measurement Precision'],
    newSkillsToAcquire: ['Modern Western Pattern Drafting', 'Digital Portfolio & Instagram Commerce', 'Costing & Fabric Sourcing', 'Client Consultations'],
    estimatedTotalMonths: '3 – 4 Months',
    potentialSalaryGrowth: '₹7,000–₹10,000/mo → ₹25,000–₹50,000/mo',
    alignment: 'Apparel Made-Ups & Home Furnishing Sector Skill Council',
    steps: [
      {
        title: 'Contemporary Western & Fusion Pattern Drafting',
        duration: '3 weeks',
        badge: 'Foundation',
        description: 'Expand beyond basic blouse and kurta drafting into co-ord sets, blazers, and modern fusion wear.',
        skills: ['Dart Manipulation', 'Collar & Sleeve Variations', 'Standardized Sizing Charts'],
        trainingType: 'Foundational',
        freeGovtScheme: 'NIFT Craft Cluster Extension Program'
      },
      {
        title: 'Fabric Sourcing, Textile Blends & Cost Optimization',
        duration: '3 weeks',
        badge: 'Core Skill',
        description: 'Wholesale textile procurement, sustainable organic cotton sourcing, lining materials, and cost-sheet creation.',
        skills: ['Direct Mill Sourcing', 'GSM & Weave Quality Checks', 'Boutique Margin Calculation'],
        trainingType: 'Domain Skill',
        certification: 'NSQF Level 5: Fashion Designer / Boutique Manager'
      },
      {
        title: 'Boutique Branding, Cataloging & Social Commerce',
        duration: '4 weeks',
        badge: 'Hands-on Lab',
        description: 'Smartphone photoshoot setup, Instagram Reels for client testimonials, WhatsApp Business catalog integration.',
        skills: ['Visual Merchandising', 'Social Media Marketing', 'Online Order Management'],
        trainingType: 'Hands-on Lab',
        freeGovtScheme: 'Skill India Digital Social Selling Micro-Course'
      },
      {
        title: 'MSME Udyam & GST Registration',
        duration: '1 week',
        badge: 'Govt Certification',
        description: 'Register as an official MSME entity to qualify for women/artisan subsidized bank finance.',
        skills: ['Udyam Portal Enrollment', 'GST Basics', 'Trade License Formalities'],
        trainingType: 'Govt Certification',
        certification: 'Govt of India MSME Udyam Registration',
        freeGovtScheme: 'PM Vishwakarma Scheme Free Toolkit & Subsidized Credit'
      },
      {
        title: 'Boutique Launch & Bridal / Custom Order Scaling',
        duration: '4 weeks',
        badge: 'Launch',
        description: 'Open your dedicated studio or home-based atelier with advance booking system.',
        skills: ['Bridal Consultation Handling', 'Apprentice Tailor Supervision', 'Peak Season Delivery Scheduling'],
        trainingType: 'Self-Employment Launch',
        freeGovtScheme: 'Stand-Up India / PM Mudra Tarun Loan'
      }
    ]
  },

  // 5. Student / Fresher -> Software Developer / Web Engineer
  {
    currentJobKeywords: ['student', 'fresher', 'unemployed', 'college', 'graduate'],
    goalKeywords: ['software', 'developer', 'web developer', 'coder', 'programmer', 'it job', 'software engineer'],
    title: 'Curious Learner to Full Stack Web Developer',
    transferableInsight: 'Your academic learning habits, logical thinking, and digital smartphone familiarity provide a prime launching pad for rapid practical software engineering without needing an expensive university degree.',
    transferableSkills: ['Digital Literacy', 'Information Search Ability', 'Logical Problem Solving', 'English Comprehension'],
    newSkillsToAcquire: ['HTML5, CSS & JavaScript Fundamentals', 'Modern React & TypeScript', 'Git Version Control', 'API Integration & Cloud Deployment'],
    estimatedTotalMonths: '5 – 7 Months',
    potentialSalaryGrowth: '₹0 → ₹30,000–₹50,000/mo entry tech compensation',
    alignment: 'IT-ITeS Sector Skill Council (NASSCOM FutureSkills Prime)',
    steps: [
      {
        title: 'Web Fundamentals: HTML5, Modern CSS & JavaScript',
        duration: '6 weeks',
        badge: 'Foundation',
        description: 'Build responsive web pages, understand DOM manipulation, ES6 features, and responsive layouts.',
        skills: ['HTML5 Semantic Elements', 'CSS Flexbox & Grid', 'JavaScript Arrays & Async/Await'],
        trainingType: 'Foundational',
        freeGovtScheme: 'NASSCOM FutureSkills Prime Foundation'
      },
      {
        title: 'Modern Front-End Development with React & Tailwind',
        duration: '6 weeks',
        badge: 'Core Skill',
        description: 'Component architecture, state management hooks, styling utilities, and user experience patterns.',
        skills: ['React Hooks', 'Component Lifecycle', 'Tailwind CSS', 'Client-side Routing'],
        trainingType: 'Domain Skill',
        certification: 'NASSCOM Certified Web Application Developer'
      },
      {
        title: 'Git, APIs & Full-Stack Capstone Project',
        duration: '5 weeks',
        badge: 'Hands-on Lab',
        description: 'Build 3 real-world portfolio applications (Job Portal, Local Community Marketplace, Inventory Tracker) deployed on Vercel.',
        skills: ['GitHub Team Workflows', 'RESTful API Fetching', 'Cloud Hosting Deployment'],
        trainingType: 'Hands-on Lab',
        freeGovtScheme: 'Bharat Blockchain & Open Source Community Mentorship'
      },
      {
        title: 'Industry Coding Assessment & Certification',
        duration: '2 weeks',
        badge: 'Govt Certification',
        description: 'Clear the NASSCOM National Occupational Standards (NOS) skill assessment.',
        skills: ['Data Structure Basics', 'Code Quality & Debugging', 'Security Best Practices'],
        trainingType: 'Govt Certification',
        certification: 'NSQF Level 5: Junior Software Developer'
      },
      {
        title: 'Tech Apprenticeship, Remote Freelancing & Placement',
        duration: '6 weeks',
        badge: 'Launch',
        description: 'Create an impressive GitHub profile and resume; apply through National Apprenticeship Promotion Scheme (NAPS).',
        skills: ['Technical Interview Prep', 'Freelance Client Bidding', 'Agile Team Collaboration'],
        trainingType: 'Industry Placement',
        freeGovtScheme: 'NAPS Stipend-Supported Apprenticeship'
      }
    ]
  },

  // 6. Driver -> Logistics Coordinator / Fleet Supervisor
  {
    currentJobKeywords: ['driver', 'auto driver', 'cab driver', 'truck driver', 'delivery', 'courier'],
    goalKeywords: ['logistics', 'fleet', 'supervisor', 'coordinator', 'supply chain', 'warehouse'],
    title: 'On-Road Driver to Professional Logistics Coordinator',
    transferableInsight: 'Your intimate practical knowledge of road networks, transit bottlenecks, vehicular maintenance schedules, and toll regulations gives you unmatched operational intuition for managing fleet dispatching.',
    transferableSkills: ['Route Geography & Traffic Instincts', 'Vehicle Health Diagnostics', 'Toll & Checkpost Regulations', 'Customer Courtesy'],
    newSkillsToAcquire: ['GPS Fleet Tracking Systems', 'ERP Logistics Software (SAP/Tally)', 'Cold Chain Compliance', 'Driver Shift Rostering'],
    estimatedTotalMonths: '3 – 4 Months',
    potentialSalaryGrowth: '₹14,000/mo → ₹26,000–₹38,000/mo',
    alignment: 'Logistics Sector Skill Council (LSC)',
    steps: [
      {
        title: 'Supply Chain Operations & Road Transport Rules',
        duration: '3 weeks',
        badge: 'Foundation',
        description: 'Understand supply chain nodes, hub-and-spoke distribution, consignment notes (Bilty), and Motor Vehicles Act 2019 compliance.',
        skills: ['Consignment Documentation', 'E-Way Bill Generation', 'Transit Insurance Norms'],
        trainingType: 'Foundational',
        freeGovtScheme: 'Skill India Digital Logistics Module'
      },
      {
        title: 'Fleet Telematics & Route Optimization Software',
        duration: '4 weeks',
        badge: 'Core Skill',
        description: 'Using GPS dispatch software, fuel monitoring sensors, geofencing, and driver behavior telemetry.',
        skills: ['Fleet Management Dashboard', 'Fuel Theft Detection', 'Turnaround Time (TAT) Tracking'],
        trainingType: 'Domain Skill',
        certification: 'NSQF Level 4: Fleet Operations Executive'
      },
      {
        title: 'Warehouse Inward/Outward & Inventory Management',
        duration: '3 weeks',
        badge: 'Hands-on Lab',
        description: 'Dock management, forklift coordination, barcode scanning, and fast dispatching during festive surges.',
        skills: ['Dock Allocation', 'Barcode & RFID Systems', 'Damage Goods Audit'],
        trainingType: 'Hands-on Lab',
        freeGovtScheme: 'National Apprenticeship Promotion Scheme (NAPS Logistics)'
      },
      {
        title: 'Govt Logistics Certification & Dangerous Goods Compliance',
        duration: '2 weeks',
        badge: 'Govt Certification',
        description: 'Accreditation in handling commercial cargo, hazmat transport rules, and ISO safety standards.',
        skills: ['Hazmat Transport Safety', 'Accident Incident Investigation', 'Standard Operating Procedures'],
        trainingType: 'Govt Certification',
        certification: 'LSC Certified Logistics Operations Coordinator'
      },
      {
        title: 'Placement with 3PL Companies or Fleet Ownership',
        duration: '4 weeks',
        badge: 'Launch',
        description: 'Join Delhivery, Blue Dart, Mahindra Logistics or manage private fleet contracts.',
        skills: ['Team Rostering', 'Vendor Rate Negotiation', 'Customer SLA Escalations'],
        trainingType: 'Industry Placement',
        freeGovtScheme: 'Pradhan Mantri Mudra Yojana for Commercial Vehicles'
      }
    ]
  },

  // 7. No Current Job / Homemaker / Unemployed -> Digital Marketing Associate
  {
    currentJobKeywords: ['no current job', 'no job', 'unemployed', 'homemaker', 'none', 'seeking work', 'housewife'],
    goalKeywords: ['digital marketing', 'social media', 'marketing', 'content creator', 'digital marketer', 'online business'],
    title: 'Fresh Start to In-Demand Digital Marketing Specialist',
    transferableInsight: 'Your fresh slate allows rapid adoption of the latest AI tools and social platforms. Being a digital consumer every day gives you natural empathy for consumer attention and community trends.',
    transferableSkills: ['Social Media Familiarity', 'Consumer Empathy', 'Creative Communication', 'Eagerness to Upskill'],
    newSkillsToAcquire: ['Meta & Google Ads Setup', 'Search Engine Optimization (SEO)', 'Canva Graphic Design', 'AI Copywriting Tools'],
    estimatedTotalMonths: '3 – 5 Months',
    potentialSalaryGrowth: '₹0 → ₹22,000–₹35,000/mo (plus freelance income)',
    alignment: 'Telecom & Media Entertainment Sector Skill Council',
    steps: [
      {
        title: 'Social Media Strategy & Canva Visual Creation',
        duration: '4 weeks',
        badge: 'Foundation',
        description: 'Master Canva for high-impact posters, Instagram carousels, thumbnail designs, and brand color psychology.',
        skills: ['Canva Pro Design', 'Visual Hierarchy', 'Brand Storytelling', 'Short Video Editing'],
        trainingType: 'Foundational',
        freeGovtScheme: 'Skill India Digital Media Literacy'
      },
      {
        title: 'Meta Ads Manager & Targeted Local Campaigns',
        duration: '4 weeks',
        badge: 'Core Skill',
        description: 'Running Facebook & Instagram sponsored ads for local clinics, coaching institutes, salons, and shops.',
        skills: ['Audience Targeting', 'Budget Optimization', 'Lead Generation Forms', 'WhatsApp Click-to-Chat Ads'],
        trainingType: 'Domain Skill',
        certification: 'Meta Certified Digital Marketing Associate'
      },
      {
        title: 'Google Business Profile, SEO & Local Search Ranking',
        duration: '3 weeks',
        badge: 'Hands-on Lab',
        description: 'Getting neighborhood businesses ranked #1 on Google Maps and attracting organic customer calls.',
        skills: ['Google Maps Optimization', 'Review Management', 'Local Keyword Research'],
        trainingType: 'Hands-on Lab',
        freeGovtScheme: 'Google Digital Garage India Free Certification'
      },
      {
        title: 'AI Productivity Tools & Content Creation',
        duration: '2 weeks',
        badge: 'Govt Certification',
        description: 'Leveraging AI for rapid copywriting, translation to regional languages, and campaign reporting.',
        skills: ['Prompt Engineering', 'Bilingual Ad Copy', 'Analytics Reporting'],
        trainingType: 'Govt Certification',
        certification: 'NSQF Aligned: Social Media Executive'
      },
      {
        title: 'Freelance Agency Setup & Client Retainers',
        duration: '4 weeks',
        badge: 'Launch',
        description: 'Acquire your first 3 local business retainers at ₹8,000–₹15,000 per month each.',
        skills: ['Client Pitching Deck', 'Monthly ROI Reporting', 'Retainer Agreement Closing'],
        trainingType: 'Self-Employment Launch',
        freeGovtScheme: 'Digital India Bhashini & Micro-Freelancing Portal'
      }
    ]
  }
];

export const DEMO_ROHITH_PROFILE: UserProfile = {
  serialId: 'TN-32-101',
  stateCode: 'TN',
  districtCode: '32',
  name: 'Rohith Kumar',
  age: '19',
  currentJob: 'Electrical Assistant',
  familyJob: 'Farming',
  education: 'Diploma',
  familyIncome: '₹10,000 – ₹20,000',
  caste: 'OBC',
  skills: ['Electrical work', 'Technology'],
  physicalLimitation: {
    hasLimitation: false
  },
  employmentPreference: 'Wage employment'
};

export const DEMO_ROHITH_GOAL = 'Solar Technician';
