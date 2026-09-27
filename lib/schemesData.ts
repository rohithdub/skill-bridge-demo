import { GovtScheme } from '@/types/skillbridge';

export const GOVERNMENT_SCHEMES_DATA: GovtScheme[] = [
  // 1. PM VISHWAKARMA (High relevance for OBC, Artisan & Technical Trades)
  {
    id: 'pm-vishwakarma',
    code: 'PM-VISHWAKARMA',
    name: 'PM Vishwakarma Scheme',
    ministry: 'Ministry of MSME & Ministry of Skill Development',
    category: 'Toolkits & Equipment',
    applicableCastes: ['OBC', 'SC', 'ST', 'General', 'EWS', 'All'],
    badge: '₹15,000 Free Toolkit + 5% Subsidized Loan',
    primaryBenefit: 'Free ₹15,000 E-Voucher for modern toolkits, 5-7 days basic skilling with ₹500/day stipend, and up to ₹3,00,000 collateral-free loan at 5% interest.',
    financialSupport: '₹15,000 Toolkit Grant + ₹3,00,000 Loan (Tranche 1: ₹1L, Tranche 2: ₹2L @ 5% interest)',
    description: 'Central sector scheme for end-to-end holistic support to traditional artisans and craftspersons. Provides PM Vishwakarma Certificate & ID, advanced skills training, modern digital toolkits, and collateral-free enterprise credit.',
    eligibility: {
      casteLabel: 'Open to all categories; high priority for OBC traditional trade families',
      maxFamilyIncome: 'No strict ceiling; rural & urban artisans practicing 18 notified trades',
      ageRange: '18 years and above',
      education: 'No minimum educational qualification required',
      points: [
        'Engaged in one of 18 trades (Electrician, Carpenter, Blacksmith, Mason, Tailor, etc.)',
        'Should not have availed credit under PMEGP, PM SVANidhi, or Mudra in past 5 years',
        'One member per family eligible'
      ]
    },
    benefitsList: [
      'Official PM Vishwakarma Digital Certificate and ID Card',
      'Basic skill verification (5-7 days) + Advanced training (15+ days) with ₹500/day stipend',
      '₹15,000 e-voucher for purchasing verified high-tech toolkits',
      'Collateral-free enterprise credit: ₹1,00,000 (18 mo) + ₹2,00,000 (30 mo) @ 5% concessional interest with 8% govt interest subvention',
      'Incentive for digital transactions (₹1 per transaction up to 100 tx/month)'
    ],
    documentsRequired: [
      'Aadhaar Card linked to active mobile number',
      'Bank Account Passbook / Statement',
      'Caste Certificate (if claiming OBC/SC/ST category prioritization)',
      'Ration Card / Family Proof'
    ],
    officialPortal: 'pmvishwakarma.gov.in',
    portalUrl: 'https://pmvishwakarma.gov.in',
    helpline: '1800-267-7777 / 011-23061500',
    alignedTrades: ['Electrical work', 'Mechanics', 'Tailoring', 'Carpentry', 'Farming tools'],
    specialSubsidyForCommunity: 'Priority district facilitation and high quota allocation for OBC and rural artisans.'
  },

  // 2. NBCFDC - NATIONAL BACKWARD CLASSES FINANCE & DEV CORP
  {
    id: 'nbcfdc-skilling-loans',
    code: 'NBCFDC-SKILL',
    name: 'NBCFDC Concessional Skilling & Micro-Finance Scheme',
    ministry: 'Ministry of Social Justice and Empowerment',
    category: 'Subsidized Loans',
    applicableCastes: ['OBC'],
    badge: '100% OBC Reserved • Concessional 3%-6% Loans',
    primaryBenefit: '100% free high-tech skill development with monthly stipend + soft term loans up to ₹15 Lakhs at low 3% to 6% interest per annum.',
    financialSupport: 'Term loans up to ₹15,00,000 @ 3-6% p.a. • Up to ₹1,500/month training stipend',
    description: 'Apex corporation under the Ministry of Social Justice dedicated exclusively to the economic upliftment of Other Backward Classes (OBCs). Offers placement-linked skilling, technology upgradation, and self-employment funding.',
    eligibility: {
      casteLabel: 'Exclusively for Other Backward Classes (OBC) recognized under Central/State lists',
      maxFamilyIncome: 'Annual family income must be below ₹3,00,000',
      ageRange: '18 to 55 years',
      education: '8th pass or above depending on technical course',
      points: [
        'Must possess valid OBC Caste Certificate issued by competent revenue authority',
        'Annual household income under ₹3.00 Lakhs',
        'Not a defaulter with any financial institution or bank'
      ]
    },
    benefitsList: [
      'New Swarnima Scheme: Special term loan up to ₹2,00,000 for women @ 5% interest p.a.',
      'Shilp Sampada: Concessional finance for craft & technical entrepreneurs',
      'Free NSQF-aligned job-oriented skill courses (Solar, CNC, Electronics, Automobile)',
      '₹1,500 per month stipend during residential and non-residential training',
      'Direct wage and self-employment linkage post completion'
    ],
    documentsRequired: [
      'OBC Community / Caste Certificate from Tahsildar / SDO',
      'Family Income Certificate (< ₹3,00,000/year)',
      'Aadhaar Card',
      'Bank Account Passbook with IFSC',
      'Educational Qualification Proof'
    ],
    officialPortal: 'nbcfdc.gov.in',
    portalUrl: 'https://nbcfdc.gov.in',
    helpline: '1800-180-6025',
    alignedTrades: ['Electrical work', 'Technology', 'Mechanics', 'Business', 'Tailoring'],
    specialSubsidyForCommunity: '100% reserved for OBC category with direct interest subsidy borne by Govt of India.'
  },

  // 3. PM-YASASVI (OBC / EBC / DNT)
  {
    id: 'pm-yasasvi-obc',
    code: 'PM-YASASVI',
    name: 'PM-YASASVI Scholarship & Technical Education Scheme',
    ministry: 'Department of Social Justice and Empowerment',
    category: 'Scholarships & Stipends',
    applicableCastes: ['OBC', 'EWS'],
    badge: 'Up to ₹1,25,000/yr • Full Course Fee DBT',
    primaryBenefit: 'Direct Bank Transfer (DBT) scholarship of ₹75,000 to ₹1,25,000 per year for technical diplomas, ITI, and polytechnic studies.',
    financialSupport: '₹75,000 to ₹1,25,000 per year direct tuition + living expense reimbursement',
    description: 'Young Achievers Scholarship Award Scheme for Vibrant India (YASASVI) covers education and skilling expenses for meritorious students from OBC, Economically Backward Classes (EBC), and Nomadic Tribes.',
    eligibility: {
      casteLabel: 'OBC, EBC and Nomadic / De-notified Tribes (DNT)',
      maxFamilyIncome: 'Annual family income not exceeding ₹2,50,000',
      ageRange: '14 to 28 years',
      education: '10th / 12th appearing or passed; enrolled in ITI/Polytechnic/College',
      points: [
        'Enrolled in recognized technical or vocational diploma institution',
        'Annual household income below ₹2.5 Lakhs',
        'Valid OBC caste certificate'
      ]
    },
    benefitsList: [
      'Direct Benefit Transfer (DBT) of full tuition and non-refundable fees into student bank account',
      'Books, stationery and digital device allowance up to ₹45,000 in Year 1',
      'Monthly maintenance allowance for hostel/day scholars',
      'Covers government and empanelled private ITIs and skill polytechnics'
    ],
    documentsRequired: [
      'OBC Certificate',
      'Income Certificate (under ₹2.5L)',
      'Class 10th / 12th Marks Card',
      'Bonafide / Admission Receipt of Technical Institution',
      'Aadhaar Card'
    ],
    officialPortal: 'scholarships.gov.in',
    portalUrl: 'https://scholarships.gov.in',
    helpline: '0120-6619540',
    alignedTrades: ['Technology', 'Electrical work', 'Mechanics', 'Teaching'],
    specialSubsidyForCommunity: 'Priority quota for OBC students pursuing technical engineering diplomas.'
  },

  // 4. NSFDC (SC CATEGORY)
  {
    id: 'nsfdc-sc-skill-credit',
    code: 'NSFDC-SC',
    name: 'NSFDC Hunar Vikas & Concessional Credit for SCs',
    ministry: 'Ministry of Social Justice & Empowerment',
    category: 'Subsidized Loans',
    applicableCastes: ['SC'],
    badge: '100% SC Reserved • 4% Concessional Interest',
    primaryBenefit: '100% free NSQF-certified skill training with ₹1,500-₹2,500/mo stipend + collateral-free loans up to ₹5,00,000 at only 4% interest.',
    financialSupport: 'Up to ₹5,00,000 micro-credit @ 4% p.a. • Up to ₹2,500 monthly stipend',
    description: 'National Scheduled Castes Finance & Development Corporation scheme empowering Scheduled Caste youth through advanced high-demand vocational skilling, modern equipment finance, and zero-collateral micro-enterprise loans.',
    eligibility: {
      casteLabel: 'Exclusively for Scheduled Caste (SC) category candidates',
      maxFamilyIncome: 'Annual family income up to ₹3,00,000 (relaxed in rural blocks)',
      ageRange: '18 to 50 years',
      education: 'Literate / 8th / 10th Pass depending on trade',
      points: [
        'Must belong to Scheduled Caste (SC) category with valid certificate',
        'Preference given to rural artisan, sanitary worker, or landless laborer families',
        'Unemployed or underemployed youth seeking livelihood upgrade'
      ]
    },
    benefitsList: [
      'Mahila Samriddhi Yojana: Micro-credit up to ₹1,40,000 for SC women @ 4% interest',
      'Dattopant Thengadi Hunar Vikas: Free market-driven skill training across 30+ sectors',
      'Laghu Vyavasay Yojana: Fast loans up to ₹5 Lakhs for small technical businesses',
      'Free safety kits and toolkits upon certification',
      'Government placement assistance and government contract bidding quotas'
    ],
    documentsRequired: [
      'SC Community / Caste Certificate',
      'Income Certificate',
      'Aadhaar Card',
      'Bank Account linked to Aadhaar (DBT active)',
      'Passport Size Photographs'
    ],
    officialPortal: 'nsfdc.nic.in',
    portalUrl: 'https://nsfdc.nic.in',
    helpline: '1800-11-0505',
    alignedTrades: ['Electrical work', 'Mechanics', 'Business', 'Tailoring', 'Driving'],
    specialSubsidyForCommunity: '100% dedicated allocation for Scheduled Caste communities with minimum 40% reserved for women.'
  },

  // 5. POST MATRIC SCHOLARSHIP FOR SC STUDENTS
  {
    id: 'pms-sc-students',
    code: 'PMS-SC',
    name: 'Post-Matric Scholarship for SC Students',
    ministry: 'Ministry of Social Justice and Empowerment',
    category: 'Scholarships & Stipends',
    applicableCastes: ['SC'],
    badge: '100% Fee Reimbursement + Monthly Allowance',
    primaryBenefit: '100% compulsory course and examination fee waiver + up to ₹13,500/year living allowance deposited directly via DBT.',
    financialSupport: 'Full institutional fee reimbursement + ₹4,000 to ₹13,500 per year maintenance allowance',
    description: 'Flagship centrally sponsored scheme that provides complete financial assistance to Scheduled Caste students pursuing post-matriculation or technical diploma courses to eliminate financial dropout.',
    eligibility: {
      casteLabel: 'Scheduled Caste (SC) candidates only',
      maxFamilyIncome: 'Total family income not exceeding ₹2,50,000 per annum',
      ageRange: '16 to 35 years',
      education: 'Class 10th passed; pursuing ITI, Polytechnic, Diploma, or Degree',
      points: [
        'Recognized ITI, Polytechnic, or accredited skill training center',
        'Family income certificate under ₹2.5 Lakhs',
        'Must maintain 75% attendance in course'
      ]
    },
    benefitsList: [
      'Full course tuition fee credited directly to the training institution',
      'Monthly maintenance allowance credited directly into student bank account',
      'Additional disability allowance for physically challenged SC students',
      'Study tour, thesis, and book bank support for technical courses'
    ],
    documentsRequired: [
      'SC Caste Certificate',
      'Current Year Income Certificate',
      'Class 10 Marks Card',
      'Admission fee receipt / Institution ID',
      'Bank Passbook with Aadhaar Seeding'
    ],
    officialPortal: 'scholarships.gov.in',
    portalUrl: 'https://scholarships.gov.in',
    helpline: '0120-6619540',
    alignedTrades: ['Technology', 'Electrical work', 'Teaching', 'Mechanics'],
    specialSubsidyForCommunity: 'Centrally funded 60:40 DBT model ensuring zero fees for eligible SC learners.'
  },

  // 6. PM-AJAY (PRADHAN MANTRI ANUSUCHIT JAATI ABHYUDAY YOJANA)
  {
    id: 'pm-ajay-grant',
    code: 'PM-AJAY',
    name: 'Pradhan Mantri Anusuchit Jaati Abhyuday Yojana (PM-AJAY)',
    ministry: 'Ministry of Social Justice and Empowerment',
    category: 'Enterprise Grant',
    applicableCastes: ['SC'],
    badge: 'Up to ₹50,000 Direct Grant + Free Training',
    primaryBenefit: 'Up to ₹50,000 direct capital grant (50% project cost) for setting up self-employment ventures + free certified skill training.',
    financialSupport: 'Grant/Subsidy up to ₹50,000 per individual beneficiary or ₹50,000 per SHG member',
    description: 'Comprehensive central program aimed at reducing poverty among Scheduled Caste communities by providing skill training, financial grants for micro-enterprises, and basic infrastructure in SC-majority villages.',
    eligibility: {
      casteLabel: 'Scheduled Caste (SC) families only',
      maxFamilyIncome: 'BPL or family income below ₹2,50,000/year',
      ageRange: '18 to 50 years',
      education: 'No specific minimum education',
      points: [
        'Belong to Scheduled Caste community',
        'Targeting self-employment in agriculture, solar, service, or artisan trades',
        'Resident of eligible district / gram panchayat'
      ]
    },
    benefitsList: [
      'Non-repayable direct capital subsidy up to ₹50,000 per beneficiary',
      'Free skill enhancement through NSDC & ITI accredited skill hubs',
      'Hostel facility support during training period',
      'Linkage with nationalized banks for balance loan component with zero collateral'
    ],
    documentsRequired: [
      'SC Caste Certificate',
      'Income Certificate / BPL Ration Card',
      'Aadhaar Card',
      'Detailed Project Report (DPR) / Trade proposal',
      'Bank Account Passbook'
    ],
    officialPortal: 'pmajay.dosje.gov.in',
    portalUrl: 'https://pmajay.dosje.gov.in',
    helpline: '011-23381643',
    alignedTrades: ['Farming', 'Electrical work', 'Mechanics', 'Tailoring', 'Business'],
    specialSubsidyForCommunity: '100% grant funding directly transferred for SC community enterprise launch.'
  },

  // 7. NSTFDC (ST CATEGORY)
  {
    id: 'nstfdc-tribal-livelihood',
    code: 'NSTFDC-ST',
    name: 'NSTFDC Adivasi Livelihood & Concessional Credit Scheme',
    ministry: 'Ministry of Tribal Affairs',
    category: 'Subsidized Loans',
    applicableCastes: ['ST'],
    badge: '100% ST Reserved • 4% Concessional Interest',
    primaryBenefit: 'Concessional finance up to ₹2,00,000 @ 4% per annum for tribal women & youth + free technical skill development programs.',
    financialSupport: 'Concessional credit up to ₹10 Lakhs (AMSY up to ₹2L @ 4%) + full training grant',
    description: 'Apex body under Ministry of Tribal Affairs providing financial assistance at highly subsidized interest rates to Scheduled Tribes for undertaking viable income-generating technical activities and skill upgrades.',
    eligibility: {
      casteLabel: 'Exclusively for Scheduled Tribe (ST) candidates',
      maxFamilyIncome: 'Annual family income up to ₹3,00,000',
      ageRange: '18 to 55 years',
      education: 'Literate or formal education based on project',
      points: [
        'Must belong to Scheduled Tribe community recognized under Indian Constitution',
        'Should not be a loan defaulter',
        'Commitment to undertake verified trade or enterprise'
      ]
    },
    benefitsList: [
      'Adivasi Mahila Sashaktikaran Yojana (AMSY): Micro-loans up to ₹2,00,000 @ 4% p.a.',
      'Adivasi Shiksha Rrinn Yojana: Educational loans up to ₹10 Lakhs @ 6% p.a.',
      'Term Loan scheme up to ₹10 Lakhs with 90% NSTFDC contribution',
      '100% government sponsored placement-linked skill training',
      'Specialized marketing and exhibition support via TRIFED'
    ],
    documentsRequired: [
      'Scheduled Tribe (ST) Community Certificate',
      'Income Certificate',
      'Aadhaar Card',
      'Bank Passbook copy',
      'Trade Quotation / Project Estimate'
    ],
    officialPortal: 'nstfdc.tribal.gov.in',
    portalUrl: 'https://nstfdc.tribal.gov.in',
    helpline: '1800-11-7788',
    alignedTrades: ['Farming', 'Mechanics', 'Tailoring', 'Electrical work', 'Business'],
    specialSubsidyForCommunity: '100% dedicated funding for Scheduled Tribe citizens with lowest interest rates in India.'
  },

  // 8. VAN DHAN VIKAS YOJANA (ST COMMUNITY)
  {
    id: 'van-dhan-st-grant',
    code: 'VDVY-ST',
    name: 'Van Dhan Vikas Yojana & Tribal Artisan Toolkit Program',
    ministry: 'Ministry of Tribal Affairs / TRIFED',
    category: 'Toolkits & Equipment',
    applicableCastes: ['ST'],
    badge: 'Free Equipment & Processing Kits • ₹15L Group Corpus',
    primaryBenefit: 'Free modern processing toolkits & equipment + ₹15 Lakhs working capital grant per Van Dhan Vikas Kendra for tribal entrepreneur clusters.',
    financialSupport: '100% Free Toolkits + ₹15,00,000 infrastructure & working capital corpus per cluster',
    description: 'Market-linked tribal entrepreneurship program that upgrades traditional gatherers and artisans into micro-manufacturers with modern equipment, scientific grading, and premium retail branding through Tribes India outlets.',
    eligibility: {
      casteLabel: 'Scheduled Tribe (ST) community members',
      maxFamilyIncome: 'No strict income ceiling; rural and forest dwellers prioritized',
      ageRange: '18 years and above',
      education: 'No minimum education requirements',
      points: [
        'Must belong to Scheduled Tribe category',
        'Willingness to form or join Self Help Group (SHG) cluster of 20-300 tribal members',
        'Engaged in minor forest produce, handicrafts, herbal processing, or local trades'
      ]
    },
    benefitsList: [
      'Free distribution of modern processing, drying, and packaging machinery toolkits',
      '₹15,00,000 government grant per Kendra (no repayment required)',
      'Skill training on value addition, organic certification, and digital invoicing',
      'Direct purchase buyback agreement by TRIFED at guaranteed minimum support price (MSP)'
    ],
    documentsRequired: [
      'ST Certificate',
      'Aadhaar Card',
      'Bank Account Passbook (DBT enabled)',
      'SHG Membership proof / Gram Sabha endorsement'
    ],
    officialPortal: 'trifed.tribal.gov.in',
    portalUrl: 'https://trifed.tribal.gov.in',
    helpline: '011-26569064',
    alignedTrades: ['Farming', 'Business', 'Tailoring'],
    specialSubsidyForCommunity: '100% grant funded specifically for tribal forest produce and artisanal producers.'
  },

  // 9. CSIS - CENTRAL SECTOR INTEREST SUBSIDY (EWS / GENERAL)
  {
    id: 'csis-ews-education',
    code: 'CSIS-EWS',
    name: 'Central Sector Interest Subsidy (CSIS) for EWS',
    ministry: 'Ministry of Education',
    category: 'Subsidized Loans',
    applicableCastes: ['EWS', 'General'],
    badge: '100% Full Interest Subsidy on Skilling Loans',
    primaryBenefit: '100% full government payment of all loan interest during course period + 1-year moratorium for technical and vocational diplomas.',
    financialSupport: 'Full interest waiver for loan amounts up to ₹10,00,000 during entire study period',
    description: 'Ensures that economically weaker students from General and EWS backgrounds can pursue accredited professional, technical, and skill diploma courses without interest burden during their training years.',
    eligibility: {
      casteLabel: 'Economically Weaker Section (EWS) / General Category',
      maxFamilyIncome: 'Gross family income must not exceed ₹4,50,000 per annum',
      ageRange: 'No age restriction',
      education: 'Enrolled in recognized technical, polytechnic, or professional institute',
      points: [
        'Valid EWS certificate or Family Income Certificate under ₹4.5 Lakhs',
        'Course must be approved by AICTE, NCVET, or UGC',
        'Loan availed through IBA scheduled commercial bank under Model Education Loan scheme'
      ]
    },
    benefitsList: [
      'Govt of India directly pays 100% interest to the lending bank during study period',
      '1 year post-course moratorium with zero accrued interest burden',
      'Covers tuition fees, hostel, exam fees, laptop, and technical kits',
      'No collateral or third-party guarantee required for loans up to ₹7.5 Lakhs'
    ],
    documentsRequired: [
      'EWS Income & Asset Certificate / Tehsildar Income Certificate (< ₹4.5L)',
      'Admission Letter & Fee Schedule from Technical Institute',
      'Class 10th / 12th Marksheets',
      'Aadhaar Card',
      'Bank Loan Sanction Letter'
    ],
    officialPortal: 'education.gov.in',
    portalUrl: 'https://www.education.gov.in',
    helpline: '011-23386936',
    alignedTrades: ['Technology', 'Electrical work', 'Mechanics', 'Business'],
    specialSubsidyForCommunity: 'Direct interest waiver for economically weaker candidates from General & unreserved categories.'
  },

  // 10. PM SURYA GHAR: MUFT BIJLI YOJANA (SOLAR TECHNICIAN SPECIAL)
  {
    id: 'pm-surya-ghar-skilling',
    code: 'PM-SURYAGHAR',
    name: 'PM Surya Ghar: Muft Bijli Skilling Partner Scheme',
    ministry: 'Ministry of New and Renewable Energy (MNRE)',
    category: 'Skill Training',
    applicableCastes: ['All', 'General', 'OBC', 'SC', 'ST', 'EWS'],
    badge: '100% Free Solar Technician Certification + Job Linkage',
    primaryBenefit: '100% government-sponsored Solar PV Rooftop Technician training, official NISE/SCGJ accreditation, and direct vendor empanelment.',
    financialSupport: 'Free training worth ₹18,000 + toolkits and vendor empanelment grant',
    description: 'National mission targeting 1 Crore rooftop solar installations across India. Directly trains 1,00,000+ certified solar technicians, installers, and vendors with direct employment linkages and low-interest equipment loans.',
    eligibility: {
      casteLabel: 'Open to all Indian citizens; OBC, SC, ST, and EWS candidates receive free hostel accommodation',
      maxFamilyIncome: 'No strict ceiling',
      ageRange: '18 to 35 years',
      education: '10th pass + ITI (Electrical/Wireman/Fitter) or Diploma or working technician experience',
      points: [
        'Background in electrical work, mechanics, or engineering preferred',
        'Aadhaar linked bank account',
        'Desire to work as Solar Installer or Rooftop Micro-Entrepreneur'
      ]
    },
    benefitsList: [
      'National Institute of Solar Energy (NISE) and Skill Council for Green Jobs (SCGJ) certification',
      'Hands-on grid-tied and hybrid solar rooftop installation labs',
      'Direct inclusion in National Solar Vendor Registry (enables rooftop customer bookings)',
      'Fast-track Mudra loan tie-up for purchasing solar testing and safety equipment kits',
      'Average monthly earnings growth: ₹25,000 to ₹40,000+'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'Class 10th / ITI / Electrical Experience Certificate',
      'Bank Passbook',
      'Caste Certificate (for reservation benefits & free lodging)'
    ],
    officialPortal: 'pmsuryaghar.gov.in',
    portalUrl: 'https://pmsuryaghar.gov.in',
    helpline: '15555',
    alignedTrades: ['Electrical work', 'Technology', 'Mechanics'],
    specialSubsidyForCommunity: 'Universal access with reserved batch quotas for OBC, SC, and ST technicians.'
  },

  // 11. PMKVY 4.0 - PRADHAN MANTRI KAUSHAL VIKAS YOJANA
  {
    id: 'pmkvy-4-scheme',
    code: 'PMKVY-4.0',
    name: 'PMKVY 4.0 Short Term Skilling & RPL Scheme',
    ministry: 'Ministry of Skill Development & Entrepreneurship (MSDE)',
    category: 'Skill Training',
    applicableCastes: ['All', 'General', 'OBC', 'SC', 'ST', 'EWS'],
    badge: '100% Free Training + NSDC National Certificate',
    primaryBenefit: 'Completely free industry-vetted skill training, Recognition of Prior Learning (RPL), government certification, and placement support.',
    financialSupport: '100% Free Course + ₹500 assessment fee waived + ₹500 digital reward on passing',
    description: 'Flagship skill certification scheme of the Government of India implemented via NSDC. Focuses on future skills, Industry 4.0, green hydrogen, solar, and on-the-job apprenticeship with top industry partners.',
    eligibility: {
      casteLabel: 'Open to all categories (Special mobilization for OBC, SC, ST, EWS & Women)',
      maxFamilyIncome: 'No income limit',
      ageRange: '15 to 45 years',
      education: 'Varies by job role (from 5th pass to Graduate)',
      points: [
        'Indian citizen with valid Aadhaar Card',
        'Unemployed youth or existing worker seeking formal skill certification (RPL)',
        'Not currently enrolled in formal schooling or regular college'
      ]
    },
    benefitsList: [
      'Government of India Skill India National Certificate with QR code verification',
      'Free NSQF Level 3 to 6 training (Solar, AI, Drone, Electric Vehicle, Apparel, Logistics)',
      'Accidental insurance coverage of ₹2,00,000 for 3 years post certification',
      'Access to Rozgar Melas (National Job Fairs) with 500+ verified employers',
      'Direct linkage to Skill India Digital app for continuous learning'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'Bank Account Passbook (Aadhaar linked)',
      'Previous Education Certificate (10th/12th/Diploma)',
      'Passport Photograph'
    ],
    officialPortal: 'skillindiadigital.gov.in',
    portalUrl: 'https://www.skillindiadigital.gov.in',
    helpline: '088000-55555',
    alignedTrades: ['Electrical work', 'Technology', 'Mechanics', 'Tailoring', 'Driving', 'Farming'],
    specialSubsidyForCommunity: 'Priority mobilization batches and stipend allowances for SC, ST, OBC and EWS candidates.'
  },

  // 12. NAPS - NATIONAL APPRENTICESHIP PROMOTION SCHEME
  {
    id: 'naps-apprenticeship',
    code: 'NAPS-2.0',
    name: 'National Apprenticeship Promotion Scheme (NAPS-2)',
    ministry: 'Ministry of Skill Development & Entrepreneurship',
    category: 'Scholarships & Stipends',
    applicableCastes: ['All', 'General', 'OBC', 'SC', 'ST', 'EWS'],
    badge: 'Govt Direct Stipend DBT • On-the-job Training',
    primaryBenefit: 'Govt directly credits 25% of monthly stipend (up to ₹1,500/mo) into apprentice bank account + company pays the balance wage during practical training.',
    financialSupport: 'Direct DBT of ₹1,500/month by Govt + ₹8,000-₹15,000/month stipend from employer',
    description: 'Centrally sponsored initiative to promote apprenticeship training across formal manufacturing and service industries. Bridges the gap between classroom theory and real shop-floor work experience.',
    eligibility: {
      casteLabel: 'Open to all Indian youths across all social categories',
      maxFamilyIncome: 'No income limit',
      ageRange: '14 to 35 years',
      education: 'Minimum 5th/8th/10th/ITI/Diploma passed',
      points: [
        'Must register on the official Apprenticeship Portal (apprenticeshipindia.gov.in)',
        'Signed tripartite apprenticeship contract with registered industry partner',
        'Active bank account seeded with Aadhaar'
      ]
    },
    benefitsList: [
      'National Apprenticeship Certificate (NAC) recognized across India and abroad',
      'Monthly wage while learning on the job (Total monthly earnings: ₹9,500 to ₹16,500)',
      'Direct credit of govt share via DBT without intermediary cuts',
      'High conversion rate to permanent employee upon completion (over 65%)'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'Educational Certificates (ITI, Diploma, or 10th/12th)',
      'Bank Account Passbook with IFSC',
      'Valid Mobile & Email'
    ],
    officialPortal: 'apprenticeshipindia.gov.in',
    portalUrl: 'https://www.apprenticeshipindia.gov.in',
    helpline: '1800-419-0909',
    alignedTrades: ['Electrical work', 'Mechanics', 'Technology', 'Business'],
    specialSubsidyForCommunity: 'Universal scheme with zero bias; equal monthly DBT for every apprentice.'
  },

  // 13. STAND-UP INDIA (SC, ST & WOMEN PRIORITY)
  {
    id: 'stand-up-india',
    code: 'STAND-UP-IND',
    name: 'Stand-Up India Scheme for SC, ST & Women Entrepreneurs',
    ministry: 'Department of Financial Services, Ministry of Finance',
    category: 'Subsidized Loans',
    applicableCastes: ['SC', 'ST', 'All'],
    badge: '₹10 Lakh to ₹1 Crore • Low Margin Money',
    primaryBenefit: 'Composite bank loans from ₹10 Lakhs to ₹1 Crore for setting up new greenfield enterprises in manufacturing, services, or trading.',
    financialSupport: '₹10,00,000 to ₹1,00,00,000 composite loan (term loan + working capital)',
    description: 'Aims to leverage institutional credit to reach the underserved sector of society including Scheduled Castes, Scheduled Tribes, and Women entrepreneurs for launching viable commercial ventures.',
    eligibility: {
      casteLabel: 'SC, ST or Woman entrepreneur (at least 51% shareholding in enterprise)',
      maxFamilyIncome: 'No specific ceiling; project viability is evaluated',
      ageRange: '18 years and above',
      education: 'Basic literacy and trade knowledge',
      points: [
        'Must be SC, ST or Woman applicant',
        'Enterprise must be greenfield (first time venture)',
        'Applicant should not be a defaulter to any bank'
      ]
    },
    benefitsList: [
      'Margin money requirement reduced to 15% (can be blended with state subsidies)',
      'Credit Guarantee Fund for Stand-Up India (CGFSI) covers collateral risk',
      'Repayable in up to 7 years with maximum 18 months moratorium',
      'Handholding support from SIDBI, NABARD, and District Industries Centres (DIC)'
    ],
    documentsRequired: [
      'SC or ST Caste Certificate (if applicable)',
      'Detailed Project Report (DPR)',
      'Aadhaar Card & PAN Card',
      'Bank Statements of past 6 months',
      'Proof of Business Premises / Lease'
    ],
    officialPortal: 'standupmitra.in',
    portalUrl: 'https://www.standupmitra.in',
    helpline: '1800-180-1111',
    alignedTrades: ['Business', 'Electrical work', 'Technology', 'Mechanics', 'Farming'],
    specialSubsidyForCommunity: 'Exclusively mandated for Scheduled Caste, Scheduled Tribe, and Women founders.'
  },

  // 14. PMEGP - PRIME MINISTER EMPLOYMENT GENERATION PROGRAMME
  {
    id: 'pmegp-subsidy',
    code: 'PMEGP',
    name: "Prime Minister's Employment Generation Programme (PMEGP)",
    ministry: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
    category: 'Enterprise Grant',
    applicableCastes: ['All', 'OBC', 'SC', 'ST', 'EWS', 'General'],
    badge: 'Up to 35% Capital Subsidy (Higher for OBC/SC/ST)',
    primaryBenefit: 'Govt provides 25% to 35% non-repayable capital subsidy on project costs up to ₹50 Lakhs for manufacturing and ₹20 Lakhs for services.',
    financialSupport: 'Subsidy up to 35% (Max ₹17.5 Lakhs govt grant on ₹50L manufacturing project)',
    description: 'Credit-linked subsidy programme administered by KVIC that helps prospective artisans, technical workers, and unemployed youth set up micro-enterprises and generate sustainable wage employment.',
    eligibility: {
      casteLabel: 'All categories (Special category status with 35% subsidy for OBC, SC, ST, EWS & Women in rural areas)',
      maxFamilyIncome: 'No income ceiling',
      ageRange: '18 years and above',
      education: 'At least 8th pass for projects above ₹10L (mfg) or ₹5L (service)',
      points: [
        'Beneficiary contribution only 5% for SC/ST/OBC/Women (10% for General)',
        'Rural projects get 35% subsidy for special categories (vs 15-25% for general)',
        'Mandatory EDP (Entrepreneurship Development) training post sanction'
      ]
    },
    benefitsList: [
      'Huge 35% grant subsidy deposited in beneficiary bank account as lock-in margin',
      'Own contribution required is only 5% of total project cost',
      'Collateral-free loans covered under CGTMSE credit guarantee',
      'Fast online single-window processing via KVIC e-portal'
    ],
    documentsRequired: [
      'Aadhaar Card & PAN Card',
      'Caste / Community Certificate (for OBC/SC/ST higher subsidy rate)',
      'Education Marksheet (8th pass or higher)',
      'Detailed Project Profile',
      'Rural Area Certificate from Sarpanch/Panchayat (for 35% rural rate)'
    ],
    officialPortal: 'kviconline.gov.in',
    portalUrl: 'https://www.kviconline.gov.in/pmegp',
    helpline: '1800-3000-0034',
    alignedTrades: ['Electrical work', 'Mechanics', 'Tailoring', 'Farming', 'Business'],
    specialSubsidyForCommunity: 'OBC, SC, and ST applicants receive maximum 35% rural capital subsidy.'
  },

  // 15. PRADHAN MANTRI MUDRA YOJANA
  {
    id: 'pm-mudra-loans',
    code: 'MUDRA',
    name: 'Pradhan Mantri Mudra Yojana (PMMY)',
    ministry: 'Department of Financial Services, Ministry of Finance',
    category: 'Subsidized Loans',
    applicableCastes: ['All', 'General', 'OBC', 'SC', 'ST', 'EWS'],
    badge: 'Zero Collateral Loans up to ₹10-20 Lakhs',
    primaryBenefit: 'Instant collateral-free institutional business loans across 3 tiers: Shishu (up to ₹50,000), Kishor (₹50k-₹5L), and Tarun (₹5L-₹10L).',
    financialSupport: '₹50,000 to ₹10,00,000 (extended up to ₹20,00,000 for previous Tarun borrowers)',
    description: 'Provides micro-enterprise financing to non-corporate, non-farm small businesses. Ideal for electricians, vehicle technicians, shopkeepers, solar installers, tailors, and repair workshops.',
    eligibility: {
      casteLabel: 'Open to all Indian citizens; high priority for OBC, SC, ST small businesses',
      maxFamilyIncome: 'No upper income ceiling',
      ageRange: '18 to 65 years',
      education: 'No minimum educational qualification',
      points: [
        'Non-farm micro or small business enterprise',
        'Zero collateral or third-party guarantee needed',
        'Satisfactory credit bureau history'
      ]
    },
    benefitsList: [
      'Zero collateral or security needed — backed by National Credit Guarantee Trustee Company (NCGTC)',
      'Zero processing fees for Shishu and Kishor loans',
      'Mudra Debit Card issued for convenient working capital withdrawal at any ATM',
      'Flexible repayment tenure of 36 to 60 months'
    ],
    documentsRequired: [
      'Aadhaar Card / Voter ID',
      'Proof of Business Address / Trade license',
      'Bank Account Statement for past 6 months',
      'Quotation of machinery / equipment to be purchased',
      'Caste Certificate (if applicable for priority quota)'
    ],
    officialPortal: 'mudra.org.in',
    portalUrl: 'https://www.mudra.org.in',
    helpline: '1800-180-1111 / 1800-11-0001',
    alignedTrades: ['Electrical work', 'Mechanics', 'Tailoring', 'Business', 'Driving'],
    specialSubsidyForCommunity: 'Over 55% of all Mudra loans are disbursed to OBC, SC, and ST beneficiaries.'
  }
];
