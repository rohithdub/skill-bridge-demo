import { OnboardingQuestion } from '@/types/skillbridge';

export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
  {
    id: 1,
    field: 'name',
    aiPrompt: 'What is your name?',
    subtitle: 'Speak your name or type it below.',
    type: 'text',
    placeholder: 'e.g., Rohith Kumar',
    demoValue: 'Rohith Kumar'
  },
  {
    id: 2,
    field: 'age',
    aiPrompt: 'How old are you?',
    subtitle: 'Share your age in years.',
    type: 'number',
    placeholder: 'e.g., 19',
    options: ['18', '19', '21', '24', '28', '35+'],
    demoValue: '19'
  },
  {
    id: 3,
    field: 'currentJob',
    aiPrompt: 'What work or job are you currently doing?',
    subtitle: 'Tap an option or speak your current occupation.',
    type: 'single_choice',
    options: [
      'Electrical Assistant',
      'Farmer',
      'Construction worker',
      'Student',
      'Shop worker',
      'Driver',
      'Electrician',
      'Tailor',
      'No current job'
    ],
    demoValue: 'Electrical Assistant'
  },
  {
    id: 4,
    field: 'familyJob',
    aiPrompt: "What is your family's traditional occupation?",
    subtitle: 'Select or speak your family background.',
    type: 'single_choice',
    options: [
      'Farming',
      'Weaving',
      'Fishing',
      'Handicrafts',
      'Construction',
      'Small business',
      'Other'
    ],
    demoValue: 'Farming'
  },
  {
    id: 5,
    field: 'education',
    aiPrompt: 'What is your highest level of education?',
    subtitle: 'Every level opens doors. Select yours:',
    type: 'single_choice',
    options: [
      'No formal education',
      '10th',
      '12th',
      'ITI',
      'Diploma',
      'Undergraduate',
      'Postgraduate',
      'Other'
    ],
    demoValue: 'Diploma'
  },
  {
    id: 6,
    field: 'familyIncome',
    aiPrompt: 'What is your approximate monthly family income?',
    subtitle: 'This helps identify scholarship and free government training schemes.',
    type: 'single_choice',
    options: [
      'Below ₹10,000',
      '₹10,000 – ₹20,000',
      '₹20,000 – ₹30,000',
      '₹30,000 – ₹50,000',
      'Above ₹50,000',
      'Prefer not to say'
    ],
    demoValue: '₹10,000 – ₹20,000'
  },
  {
    id: 7,
    field: 'skills',
    aiPrompt: 'What skills do you have or what are you interested in learning?',
    subtitle: 'Select all that match your interest (multiple choice) or speak them:',
    type: 'multi_choice',
    options: [
      'Electrical work',
      'Technology',
      'Driving',
      'Farming',
      'Cooking',
      'Tailoring',
      'Mechanics',
      'Business',
      'Teaching',
      'Design',
      'Healthcare',
      'Construction',
      'Sales',
      'Other'
    ],
    demoValue: ['Electrical work', 'Technology']
  },
  {
    id: 8,
    field: 'physicalLimitation',
    aiPrompt: 'Do you have any physical disability or limitation that I should consider when suggesting opportunities?',
    subtitle: 'Skill Bridge suggests inclusive and accessible workspaces for everyone.',
    type: 'special_limitation',
    options: ['No', 'Yes', 'Prefer not to say'],
    demoValue: { hasLimitation: false }
  },
  {
    id: 9,
    field: 'employmentPreference',
    aiPrompt: 'Are you interested in self-employment or wage employment?',
    subtitle: 'Choose whether you want a salaried job, your own business, or both.',
    type: 'single_choice',
    options: [
      'Self-employment',
      'Wage employment',
      'Both',
      'Not sure'
    ],
    demoValue: 'Wage employment'
  }
];

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', greeting: 'Welcome to Skill Bridge' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', greeting: 'ஸ்கில் பிரிட்ஜுக்கு வரவேற்கிறோம்' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', greeting: 'स्किल ब्रिज में आपका स्वागत है' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', greeting: 'స్కిల్ బ్రిడ్జ్‌కి స్వాగతం' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', greeting: 'ಸ್ಕಿಲ್ ಬ್ರಿಡ್ಜ್‌ಗೆ ಸುಸ್ವಾಗತ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', greeting: 'സ്കിൽ ബ്രിഡ്ജിലേക്ക് സ്വാഗതം' }
] as const;

export const POPULAR_CAREER_GOALS = [
  { title: 'Solar Technician', icon: 'Sun', sector: 'Green Energy', popularWith: 'Electrical' },
  { title: 'Software Developer', icon: 'Code', sector: 'Information Tech', popularWith: 'Students' },
  { title: 'Electrician', icon: 'Zap', sector: 'Construction / Facility', popularWith: 'Construction' },
  { title: 'Agri-Tech Entrepreneur', icon: 'Sprout', sector: 'Smart Farming', popularWith: 'Farming' },
  { title: 'Fashion Entrepreneur', icon: 'Scissors', sector: 'Apparel & Design', popularWith: 'Tailoring' },
  { title: 'Logistics Coordinator', icon: 'Truck', sector: 'Transport & E-commerce', popularWith: 'Driving' },
  { title: 'Digital Marketer', icon: 'TrendingUp', sector: 'Media & Business', popularWith: 'Any' },
  { title: 'Healthcare Assistant', icon: 'Heart', sector: 'Health & Care', popularWith: 'Any' },
  { title: 'Mechanic / EV Tech', icon: 'Wrench', sector: 'Automotive', popularWith: 'Mechanics' },
  { title: 'Government Employee', icon: 'Landmark', sector: 'Public Administration', popularWith: 'Any' }
];
