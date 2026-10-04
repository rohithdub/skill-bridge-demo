import { UserProfile, SkillGapAnalysis } from '@/types/skillbridge';
import { normalizeSkills } from '@/lib/normalizeProfile';

interface CuratedSkillMapping {
  goalKeywords: string[];
  currentJobKeywords: string[];
  transferable: string[];
  prerequisites: string[];
  skillGaps: string[];
  coveragePercent: number;
  proficiency: 'Foundational' | 'Intermediate' | 'Advanced';
  durationWeeks: number;
  certification: string;
  practicalTasks: string[];
  employmentOptions: string[];
  enterpriseOptions: string[];
  explanation: string;
}

export const CURATED_MAPPINGS: CuratedSkillMapping[] = [
  // 1. Electrical Assistant -> Solar PV Specialist (Scenario A)
  {
    goalKeywords: ['solar', 'pv', 'suryamitra', 'renewable', 'clean energy'],
    currentJobKeywords: ['electrical', 'electrician', 'wireman', 'helper'],
    transferable: [
      'AC Circuit Wiring & Conduit Routing',
      'Safety Protocols & Insulated Tool Handling',
      'Multimeter Diagnostics & Continuity Testing',
      'Basic Hand & Power Tool Operation'
    ],
    prerequisites: [
      'High school science / Basic electrical arithmetic',
      'Physical stamina for rooftop outdoor work'
    ],
    skillGaps: [
      'DC String Sizing & Photovoltaic Physics',
      'Inverter Synchronization & Net-Metering',
      'Rooftop Rail Anchoring & Waterproof Sealing',
      'Battery Storage (Lithium/Lead-Acid) Chemistries',
      'Lightning Arrestor & Solar Earthing Pit Installation'
    ],
    coveragePercent: 55,
    proficiency: 'Intermediate',
    durationWeeks: 12,
    certification: 'Suryamitra Skill Council for Green Jobs (SCGJ) & NSDC Level 4',
    practicalTasks: [
      'Mount 4x 540W Mono-PERC solar panels to rooftop strut channels',
      'Crimping MC4 solar connectors and DC cabling strings',
      'Configuring 5kW hybrid on-grid solar inverter with grid sync',
      'Performing solar irradiance insulation and earthing impedance testing'
    ],
    employmentOptions: [
      'Solar Rooftop Installation Technician (₹22,000 – ₹32,000/mo)',
      'Solar Farm Field Maintenance Specialist (₹24,000 – ₹35,000/mo)',
      'Renewable Energy AMC Service Executive (₹20,000 – ₹28,000/mo)'
    ],
    enterpriseOptions: [
      'Independent Rooftop Solar EPC Contractor (₹50,000+ potential)',
      'Solar Panel Cleaning & Maintenance Micro-Franchise',
      'Rural Solar Water Pump & Home Lighting Dealership'
    ],
    explanation: 'Your electrical assistant background already covers fundamental circuit wiring, electrical safety, and multimeter testing (~55% coverage). To transition to Solar PV Specialist, you primarily need to master DC array sizing, rooftop mounting hardware, and inverter grid synchronization.'
  },

  // 2. Garment Tailor -> Fashion Micro-Enterprise / Boutique (Scenario B)
  {
    goalKeywords: ['fashion', 'tailor', 'boutique', 'apparel', 'garment', 'designer'],
    currentJobKeywords: ['tailor', 'garment', 'sewing', 'stitching', 'textile', 'weaving'],
    transferable: [
      'Precision Body Measurement & Anatomy Fitting',
      'Fabric Scissors Handling & Pattern Cutting',
      'Single & Double Needle Sewing Machine Fluency',
      'Garment Seam Finishing & Hemming Speed'
    ],
    prerequisites: [
      'Eye for color contrast and drape aesthetic',
      'Basic smartphone usage for messaging and photography'
    ],
    skillGaps: [
      'Western & Fusion Block Pattern Drafting',
      'Wholesale Textile Sourcing & Unit Margin Costing',
      'Digital Cataloging & Instagram Social Commerce',
      'MSME Udyam Registration & GST Invoicing',
      'Customer Consultation & Bridal Customization'
    ],
    coveragePercent: 60,
    proficiency: 'Intermediate',
    durationWeeks: 8,
    certification: 'PM Vishwakarma Master Craftsman & Apparel Sector Skill Council (AMHSSC)',
    practicalTasks: [
      'Draft and stitch a modern tailored fusion jacket and designer blouse',
      'Build a 10-piece photo catalog using smartphone natural lighting',
      'Calculate fabric consumption, trim costing, and net profit markup',
      'Set up WhatsApp Business automated quick replies and product catalog'
    ],
    employmentOptions: [
      'Master Pattern Cutter at Export Apparel House (₹24,000 – ₹32,000/mo)',
      'Designer Studio Tailoring Head (₹22,000 – ₹30,000/mo)'
    ],
    enterpriseOptions: [
      'Custom Designer Boutique & Bridal Stitching Unit (₹40,000 – ₹80,000/mo)',
      'Uniform & Corporate Bulk Garment Manufacturing Workshop',
      'Home-Based Online Alteration & Made-to-Measure Brand'
    ],
    explanation: 'Your established tailoring experience provides ~60% of the technical foundation (stitching precision, fabric handling, pattern cutting). The critical skills to acquire are business-oriented: wholesale sourcing, fusion patterns, and smartphone-based digital marketing.'
  },

  // 3. Farmer / Cultivator -> Agri-Tech Drone Pilot & Smart Farming
  {
    goalKeywords: ['agri', 'farm', 'drone', 'kisan', 'smart farming', 'agriculture'],
    currentJobKeywords: ['farmer', 'cultivator', 'agriculture', 'farming', 'land'],
    transferable: [
      'Crop Lifecycle Instincts & Growth Stages',
      'Soil Moisture & Weed Detection Eyesight',
      'Pesticide & Fertilizer Dilution Basics',
      'Weather Pattern Observation & Irrigation Timing'
    ],
    prerequisites: [
      '10th standard pass (DGCA Drone Pilot prerequisite)',
      'Basic spatial motor coordination'
    ],
    skillGaps: [
      'DGCA Remote Pilot Certification (RPA Class 1)',
      'Drone Flight Controller Calibration & Geo-Fencing',
      'Multispectral Crop Health Imagery Analysis',
      'Micro-Sprayer Nozzle Flow Rate Calibration',
      'e-NAM Digital Mandi Price Discovery & Bidding'
    ],
    coveragePercent: 45,
    proficiency: 'Intermediate',
    durationWeeks: 6,
    certification: 'DGCA Certified Remote Pilot License & SMAM Agri-Mechanization Certificate',
    practicalTasks: [
      'Execute 10 autonomous grid waypoint flights over paddy/cotton fields',
      'Calibrate 10-liter precision spray drone for micron-level coverage',
      'Download NDVI satellite vegetation health indices',
      'List farm produce lot on e-NAM digital mandis portal'
    ],
    employmentOptions: [
      'Custom Hiring Center (CHC) Drone Pilot (₹25,000 – ₹35,000/mo)',
      'Agro-Chemical Corporate Drone Demonstrator (₹28,000 – ₹40,000/mo)'
    ],
    enterpriseOptions: [
      'Kisan Drone Spraying & Survey Custom Service Center (₹60,000+ peak season)',
      'Organic Produce Direct-to-Consumer Micro-Brand',
      'Solar Drip Irrigation Equipment Installation Agency'
    ],
    explanation: 'Your farming intuition and crop knowledge provide ~45% of the operational insight. You only need the formal DGCA flight training, drone payload mechanics, and digital mandi market linkages.'
  },

  // 4. Driver -> Logistics Coordinator / Fleet Telematics
  {
    goalKeywords: ['driver', 'logistics', 'fleet', 'transport', 'warehouse', 'delivery'],
    currentJobKeywords: ['driver', 'cab', 'auto', 'commercial driver', 'transport'],
    transferable: [
      'City & Highway Route Geography Instincts',
      'Vehicle Maintenance & Diagnostic Intuition',
      'Road Transport Authority (RTA) Safety Regulations',
      'Punctual Delivery Discipline under Tight Timelines'
    ],
    prerequisites: [
      'Valid driving license (LMV/HMV)',
      'Basic smartphone navigation familiarity'
    ],
    skillGaps: [
      'Warehouse Management System (WMS) Barcode Scanning',
      'GPS Fleet Telematics & Fuel Optimization Software',
      'E-Way Bill & GST Transit Documentation',
      'Forklift / Pallet Truck Electric Operation'
    ],
    coveragePercent: 50,
    proficiency: 'Foundational',
    durationWeeks: 8,
    certification: 'Logistics Sector Skill Council (LSC) & NAPS Apprenticeship',
    practicalTasks: [
      'Operate handheld RF scanner for 50 SKU binning and picking',
      'Plan multi-drop route using telematics software saving 18% fuel',
      'Generate E-way bill and digital proof of delivery (e-POD)'
    ],
    employmentOptions: [
      '3PL Warehouse Operations Supervisor (₹22,000 – ₹30,000/mo)',
      'Fleet Telematics Route Controller (₹24,000 – ₹32,000/mo)'
    ],
    enterpriseOptions: [
      'Contract Courier & Last-Mile Delivery Hub',
      'Commercial EV Goods Auto Fleet Operator'
    ],
    explanation: 'Your driving and on-road transit experience gives ~50% transferable familiarity with delivery protocols and route optimization. Warehouse software and freight compliance will bridge you to supervisory roles.'
  }
];

export class SkillGapEngine {
  /**
   * Evaluates the beneficiary's current background against their target career goal.
   * Produces an explainable, structured gap analysis.
   */
  public static analyze(profile: UserProfile, targetGoal: string): SkillGapAnalysis {
    const goalNorm = (targetGoal || profile.desiredOccupation || 'Solar PV Specialist').toLowerCase();
    const currentJobNorm = (profile.currentJob || 'Electrical Assistant').toLowerCase();

    // 1. Try to find close curated mapping
    const match = CURATED_MAPPINGS.find(m => {
      const goalMatch = m.goalKeywords.some(kw => goalNorm.includes(kw) || kw.includes(goalNorm));
      const jobMatch = m.currentJobKeywords.some(kw => currentJobNorm.includes(kw) || kw.includes(currentJobNorm));
      return goalMatch && jobMatch;
    }) || CURATED_MAPPINGS.find(m => {
      return m.goalKeywords.some(kw => goalNorm.includes(kw) || kw.includes(goalNorm));
    });

    if (match) {
      // Blend user's specific declared skills if provided
      const skillsArray = normalizeSkills(profile.skills);
      const userSkills = skillsArray.length > 0 ? skillsArray : match.transferable;
      const combinedTransferable = Array.from(new Set([...match.transferable.slice(0, 3), ...userSkills.slice(0, 2)]));

      return {
        careerGoal: targetGoal || 'Target Profession',
        currentJob: profile.currentJob || 'Current Occupation',
        transferableSkills: combinedTransferable,
        prerequisiteSkills: match.prerequisites,
        skillGaps: match.skillGaps,
        coveragePercent: match.coveragePercent,
        requiredProficiency: match.proficiency,
        trainingDurationWeeks: match.durationWeeks,
        certificationRequirement: match.certification,
        practicalTasks: match.practicalTasks,
        employmentOptions: match.employmentOptions,
        enterpriseOptions: match.enterpriseOptions,
        explanation: match.explanation
      };
    }

    // 2. Synthesize dynamic fallback analysis
    const job = profile.currentJob || 'Current Occupation';
    const goal = targetGoal || 'Modern Technical Trade';
    const skillsArrayFallback = normalizeSkills(profile.skills);
    const statedSkills = skillsArrayFallback.length > 0 ? skillsArrayFallback : ['Practical work experience', 'Customer interaction'];

    return {
      careerGoal: goal,
      currentJob: job,
      transferableSkills: [
        `${job} Practical Work Ethic`,
        'Hands-on Equipment Handling',
        ...statedSkills.slice(0, 2)
      ],
      prerequisiteSkills: [
        'Fundamental numeracy and regional language literacy',
        'Commitment to 8-12 weeks structured skilling'
      ],
      skillGaps: [
        `Core Technical Protocols for ${goal}`,
        'Digital Tools & Smart App Workflow',
        'Quality Assurance & Safety Regulations',
        'Customer Facing Invoicing & Communication'
      ],
      coveragePercent: 40,
      requiredProficiency: 'Foundational',
      trainingDurationWeeks: 10,
      certificationRequirement: 'National Skill Development Corporation (NSDC) & Skill India Level 3/4',
      practicalTasks: [
        `Complete practical lab tasks standard to ${goal}`,
        'Operate digital measurement & recording equipment',
        'Pass safety and quality audit simulations'
      ],
      employmentOptions: [
        `Junior Technician in ${goal} (₹18,000 – ₹25,000/mo)`,
        'Certified Trade Assistant with Tier-2 Vendors'
      ],
      enterpriseOptions: [
        `Independent Trade Service Provider in ${goal}`,
        'Micro-Enterprise with PM Mudra Seed Capital'
      ],
      explanation: `Your practical work history as ${job} gives you ~40% transferable baseline readiness in disciplined work execution and tool safety. Upgrading to ${goal} requires focused hands-on domain training, digital tool usage, and national NSQF certification.`
    };
  }
}
