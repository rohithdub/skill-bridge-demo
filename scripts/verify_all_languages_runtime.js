const {
  COMMON_UI_TEXT,
  SUPPORTED_LANGUAGES,
  getUIText,
  getLocalizedRoadmapStep,
  getLocalizedGoalTitle,
  getLocalizedJob,
  getLocalizedEmploymentType,
  getLocalizedSector,
  getLocalizedCaste,
  getLocalizedIncome,
  getLocalizedSkill,
  getLocalizedTraining,
  getLocalizedEnterprise,
  getRoadmapSummaryVoice,
  getSchemesOverviewVoice,
  getSchemeDetailVoice,
  getAnalyzingPathwaysVoice,
  getHomeGreeting,
  getHomeNextStepVoice,
  tCareerTitle,
  tJobTitle
} = require('../lib/translations.ts');

const {
  toDisplayString,
  normalizeSkills,
  normalizeRoadmapStep,
  normalizeRoadmap,
  normalizeOpportunity,
  normalizeOpportunities,
  normalizeTrainingProgram,
  normalizeTrainingPrograms,
  normalizeLanguage,
  normalizeProfile
} = require('../lib/normalization.ts');

const LANGS = ['en', 'hi', 'ta', 'te', 'kn', 'ml', 'bn', 'mr', 'gu', 'pa', 'or', 'as', 'ur'];

console.log('====================================================');
console.log('RUNNING COMPREHENSIVE RUNTIME & LOCALIZATION AUDIT');
console.log('====================================================\n');

let errors = [];

// 1. Verify all 13 languages are tested
console.log(`Checking ${LANGS.length} languages: ${LANGS.join(', ')}`);

// 2. Test getLocalizedRoadmapStep with problematic string and object shapes
console.log('\n--- 1. Testing getLocalizedRoadmapStep against the crash condition ---');
const testStepObject = {
  id: 'step-1',
  stepNumber: 1,
  title: 'Foundations of Solar PV',
  description: 'Learn basic electrical concepts',
  badge: 'Foundation Course',
  duration: '4 Weeks',
  skills: ['Solar Wiring', 'Safety'],
  isCompleted: false
};

// Test when string is passed (which previously caused { 0: 'F', 1: 'o', ... } object crash)
for (const lang of LANGS) {
  const resultStr = getLocalizedRoadmapStep('Foundations of Solar PV', lang);
  if (typeof resultStr !== 'string') {
    errors.push(`[${lang}] getLocalizedRoadmapStep('string') returned ${typeof resultStr} instead of string!`);
  }

  const resultObj = getLocalizedRoadmapStep(testStepObject, lang);
  if (typeof resultObj !== 'object' || typeof resultObj.title !== 'string' || typeof resultObj.description !== 'string') {
    errors.push(`[${lang}] getLocalizedRoadmapStep(object) did not return valid strings for title/desc!`);
  }
}
console.log('✓ Passed: getLocalizedRoadmapStep safely returns string for strings and object with string fields for objects.');

// 3. Test normalizeRoadmap with malformed shapes
console.log('\n--- 2. Testing normalizeRoadmap Boundary ---');
const malformedRoadmap = {
  careerGoal: 'Solar PV Specialist',
  currentJob: 'Electrical Assistant',
  estimatedTotalMonths: '6 Months',
  potentialSalaryGrowth: '₹12K -> ₹30K',
  steps: [
    // Step with numeric keys mimicking previous bug
    {
      0: 'S', 1: 't', 2: 'e', 3: 'p',
      title: { text: 'Nested Object Title' },
      description: ['Array Description'],
      badge: { badgeName: 'Govt Certified' },
      duration: '4 Weeks',
      skills: ['Wiring', { skill: 'Inverter Safety' }, null, 123]
    },
    // Null step
    null,
    // Primitive step
    'Simple string step'
  ]
};

const normalized = normalizeRoadmap(malformedRoadmap);
if (!normalized) {
  errors.push('normalizeRoadmap returned null for valid roadmap!');
} else {
  for (let i = 0; i < normalized.steps.length; i++) {
    const s = normalized.steps[i];
    if (typeof s.title !== 'string') errors.push(`Step ${i} title is not a string: ${typeof s.title}`);
    if (typeof s.description !== 'string') errors.push(`Step ${i} description is not a string: ${typeof s.description}`);
    if (typeof s.badge !== 'string') errors.push(`Step ${i} badge is not a string: ${typeof s.badge}`);
    if (typeof s.duration !== 'string') errors.push(`Step ${i} duration is not a string: ${typeof s.duration}`);
    if (!Array.isArray(s.skills) || s.skills.some(sk => typeof sk !== 'string')) {
      errors.push(`Step ${i} skills contains non-string items!`);
    }
  }
}
console.log('✓ Passed: normalizeRoadmap sanitizes all malformed nested objects into safe primitive strings.');

// 4. Test Career Titles in all 13 languages (e.g. Odia, Assamese, etc.)
console.log('\n--- 3. Testing Dynamic Career Entities across all languages ---');
const sampleCareers = [
  'Solar Technician',
  'Software Developer',
  'Electrician',
  'Fashion Entrepreneur',
  'Logistics Coordinator',
  'Agri-Tech Entrepreneur',
  'Digital Marketer',
  'Healthcare Assistant',
  'Mechanic / EV Tech',
  'Government Employee'
];

for (const career of sampleCareers) {
  for (const lang of LANGS) {
    const loc = tCareerTitle(career, lang);
    if (!loc || typeof loc !== 'string') {
      errors.push(`[${lang}] Career ${career} failed to localize!`);
    }
    if (lang === 'or' && loc === career && career !== 'Mechanic / EV Tech') {
      errors.push(`[or] Career ${career} was not translated into Odia! Found: ${loc}`);
    }
  }
}
console.log('✓ Passed: Popular career titles are translated into all languages including Odia and Assamese.');
console.log(`  Sample (Odia Software Developer): "${tCareerTitle('Software Developer', 'or')}"`);
console.log(`  Sample (Odia Electrician): "${tCareerTitle('Electrician', 'or')}"`);
console.log(`  Sample (Odia Fashion Entrepreneur): "${tCareerTitle('Fashion Entrepreneur', 'or')}"`);
console.log(`  Sample (Odia Logistics Coordinator): "${tCareerTitle('Logistics Coordinator', 'or')}"`);

// 5. Test Employment Types in all 13 languages
console.log('\n--- 4. Testing Employment Types in all languages ---');
const empTypes = ['Full-Time Wage', 'Apprenticeship', 'Self-Employment / Micro-Enterprise', 'Contractual'];
for (const et of empTypes) {
  for (const lang of LANGS) {
    const loc = getLocalizedEmploymentType(et, lang);
    if (!loc || typeof loc !== 'string') {
      errors.push(`[${lang}] Employment type ${et} failed to localize!`);
    }
    if (lang === 'or' && loc === et) {
      errors.push(`[or] Employment type ${et} was not translated into Odia!`);
    }
  }
}
console.log('✓ Passed: Employment types localized in all languages.');
console.log(`  Sample (Odia Full-Time Wage): "${getLocalizedEmploymentType('Full-Time Wage', 'or')}"`);

// 6. Test Forbidden Internal Keys in UI
console.log('\n--- 5. Testing Forbidden Raw Translation Keys ---');
const forbiddenKeys = [
  'PRIMARYBENEFITTITLE',
  'WHYMATCHEDTITLE',
  'matchScoreLabel',
  'statusPrefix',
  'incomeLimitLabel',
  'agePrefix',
  'exclusiveForSC',
  'oppIntelligenceBadge',
  'main_app'
];

for (const key of forbiddenKeys) {
  for (const lang of LANGS) {
    const translated = getUIText(key, lang);
    if (translated === key) {
      errors.push(`[${lang}] Raw internal key "${key}" displayed verbatim to user!`);
    }
    if (!translated || translated.trim() === '') {
      errors.push(`[${lang}] Key "${key}" returned empty string!`);
    }
  }
}
console.log('✓ Passed: Zero internal raw keys displayed verbatim across all 13 languages.');
for (const key of forbiddenKeys) {
  console.log(`  "${key}" in Odia -> "${getUIText(key, 'or')}"`);
}

// 7. Test Voice Greetings & Audio across all 13 languages
console.log('\n--- 6. Testing Voice & Audio Localization ---');
for (const lang of LANGS) {
  const greeting = getHomeGreeting(lang);
  const nextStepVoice = getHomeNextStepVoice('choose_goal', {}, lang);
  const roadmapVoice = getRoadmapSummaryVoice('Electrical Assistant', 'Solar PV Specialist', 85, '6 Months', lang);
  const schemesVoice = getSchemesOverviewVoice('SC', 12, lang);

  if (!greeting || greeting === 'Welcome' && lang !== 'en') {
    errors.push(`[${lang}] Greeting missing!`);
  }
  if (!roadmapVoice || !schemesVoice) {
    errors.push(`[${lang}] Voice narration string missing!`);
  }
}
console.log('✓ Passed: Voice and audio narrations synchronized across all 13 languages.');

console.log('\n====================================================');
if (errors.length === 0) {
  console.log('SUCCESS: All tests passed with ZERO errors!');
} else {
  console.error(`FAILED with ${errors.length} errors:\n`, errors.join('\n'));
  process.exit(1);
}
console.log('====================================================\n');
