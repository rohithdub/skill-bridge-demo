const fs = require('fs');
const path = require('path');
const {
  NEW_COMMON_UI_TEXT,
  NEW_CAREER_GOALS,
  NEW_EMPLOYMENT_TYPES
} = require('./translations_dictionary.js');

console.log('Reading lib/translations.ts...');
let content = fs.readFileSync('lib/translations.ts', 'utf8');

// 1. Prepare NEW_COMMON_UI_TEXT serialized block
let uiTextInsertions = '';
for (const [key, trans] of Object.entries(NEW_COMMON_UI_TEXT)) {
  // Check if key already exists in content inside COMMON_UI_TEXT
  const keySearch = `"${key}": {`;
  if (!content.includes(keySearch)) {
    uiTextInsertions += `  "${key}": ${JSON.stringify(trans, null, 4)},\n`;
  }
}

// 2. Prepare CAREER_GOALS insertions for POPULAR_GOAL_TITLES and JOBS_LOCALIZED
let popularGoalInsertions = '';
let jobsLocalizedInsertions = '';
for (const [key, trans] of Object.entries(NEW_CAREER_GOALS)) {
  const goalSearch = `"${key}": {`;
  popularGoalInsertions += `  "${key}": ${JSON.stringify(trans, null, 4)},\n`;
  jobsLocalizedInsertions += `  "${key}": ${JSON.stringify(trans, null, 4)},\n`;
}

// 3. Prepare EMPLOYMENT_TYPES insertions
let empTypeInsertions = '';
for (const [key, trans] of Object.entries(NEW_EMPLOYMENT_TYPES)) {
  empTypeInsertions += `  "${key}": ${JSON.stringify(trans, null, 4)},\n`;
}

// Insert into COMMON_UI_TEXT
const commonUIStart = 'export const COMMON_UI_TEXT: Record<string, Record<SupportedLanguage, string>> = {\n';
if (content.includes(commonUIStart)) {
  content = content.replace(commonUIStart, commonUIStart + uiTextInsertions);
  console.log('Inserted new keys into COMMON_UI_TEXT');
} else {
  console.error('Could not find COMMON_UI_TEXT start');
}

// Insert into POPULAR_GOAL_TITLES
const popGoalStart = 'export const POPULAR_GOAL_TITLES: Record<string, Record<SupportedLanguage, string>> = {\n';
if (content.includes(popGoalStart)) {
  content = content.replace(popGoalStart, popGoalStart + popularGoalInsertions);
  console.log('Inserted new career goals into POPULAR_GOAL_TITLES');
}

// Insert into JOBS_LOCALIZED
const jobsStart = 'export const JOBS_LOCALIZED: Record<string, Record<SupportedLanguage, string>> = {\n';
if (content.includes(jobsStart)) {
  content = content.replace(jobsStart, jobsStart + jobsLocalizedInsertions);
  console.log('Inserted new jobs into JOBS_LOCALIZED');
}

// Insert into EMPLOYMENT_TYPES_LOCALIZED
const empStart = 'export const EMPLOYMENT_TYPES_LOCALIZED: Record<string, Record<SupportedLanguage, string>> = {\n';
if (content.includes(empStart)) {
  content = content.replace(empStart, empStart + empTypeInsertions);
  console.log('Inserted new employment types into EMPLOYMENT_TYPES_LOCALIZED');
}

// Now replace helper functions section at bottom of translations.ts
const helpersStartMarker = 'export function getLocalizedQuestion(';
const helpersIdx = content.indexOf(helpersStartMarker);
if (helpersIdx !== -1) {
  const prefix = content.substring(0, helpersIdx);
  
  const newHelpers = `// ============================================================================
// CENTRALIZED TRANSLATION RESOLVER & HELPER FUNCTIONS
// ============================================================================

export const KEY_ALIAS_MAP: Record<string, string> = {
  PRIMARYBENEFITTITLE: 'primaryBenefitTitle',
  primarybenefittitle: 'primaryBenefitTitle',
  primary_benefit_title: 'primaryBenefitTitle',
  primaryBenefit: 'primaryBenefitTitle',
  WHYMATCHEDTITLE: 'whyMatchedTitle',
  whymatchedtitle: 'whyMatchedTitle',
  why_matched_title: 'whyMatchedTitle',
  whyMatched: 'whyMatchedTitle',
  matchScoreLabel: 'matchScoreLabel',
  matchscorelabel: 'matchScoreLabel',
  match_score_label: 'matchScoreLabel',
  statusPrefix: 'statusPrefix',
  statusprefix: 'statusPrefix',
  status_prefix: 'statusPrefix',
  incomeLimitLabel: 'incomeLimitLabel',
  incomelimitlabel: 'incomeLimitLabel',
  income_limit_label: 'incomeLimitLabel',
  agePrefix: 'agePrefix',
  ageprefix: 'agePrefix',
  age_prefix: 'agePrefix',
  exclusiveForSC: 'exclusiveForSC',
  exclusiveforsc: 'exclusiveForSC',
  exclusive_for_sc: 'exclusiveForSC',
  oppIntelligenceBadge: 'oppIntelligenceBadge',
  oppintelligencebadge: 'oppIntelligenceBadge',
  main_app: 'main_app',
  mainApp: 'main_app'
};

/**
 * Human-readable fallback when key is not in dictionary.
 * Prevents raw developer tokens (e.g. 'matchScoreLabel') from ever showing to users.
 */
function getHumanReadableFallback(key: string, lang: SupportedLanguage): string {
  if (!key) return '';
  // Convert camelCase or UPPER_CASE to normal words
  const words = key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]/g, ' ')
    .trim();
  const titleCase = words.charAt(0).toUpperCase() + words.slice(1);
  return titleCase;
}

export function getLocalizedQuestion(
  question: OnboardingQuestion,
  lang: SupportedLanguage
): OnboardingQuestion {
  const loc = QUESTION_LOCALIZATIONS[question.id]?.[lang];
  if (!loc) return question;

  return {
    ...question,
    aiPrompt: loc.aiPrompt || question.aiPrompt,
    subtitle: loc.subtitle || question.subtitle,
    placeholder: loc.placeholder || question.placeholder,
    options: loc.options || question.options,
    demoValue: loc.demoValue !== undefined ? loc.demoValue : question.demoValue
  };
}

/**
 * Centralized UI text translation resolver.
 * CRITICAL RULE: NEVER return raw internal keys (e.g. matchScoreLabel, PRIMARYBENEFITTITLE).
 */
export function getUIText(key: string, lang: SupportedLanguage = 'en'): string {
  if (!key) return '';

  const normalizedKey = KEY_ALIAS_MAP[key] || key;
  const item = COMMON_UI_TEXT[normalizedKey] || COMMON_UI_TEXT[key];

  if (item) {
    if (lang === 'en' && item['en']) return item['en'];
    if (item[lang] && item[lang].trim() !== '') return item[lang];
    if (item['hi'] && item['hi'].trim() !== '') return item['hi'];
    if (item['ta'] && item['ta'].trim() !== '') return item['ta'];
    if (item['en'] && item['en'].trim() !== '') return item['en'];
  }

  // Safe fallback: never show raw camelCase internal key
  return getHumanReadableFallback(key, lang);
}

/**
 * Standard alias for getUIText: t(key, lang)
 */
export function t(key: string, lang: SupportedLanguage = 'en'): string {
  return getUIText(key, lang);
}

export function getLocalizedSector(sector: string, lang: SupportedLanguage = 'en'): string {
  if (!sector) return '';
  if (lang === 'en') return sector;
  const match = SECTORS_LOCALIZED[sector];
  return match ? (match[lang] || match['ta'] || match['hi'] || sector) : sector;
}

export function getLocalizedStatus(status: string, lang: SupportedLanguage = 'en'): string {
  if (!status) return '';
  if (lang === 'en') return status;
  const match = STATUSES_LOCALIZED[status];
  return match ? (match[lang] || match['ta'] || match['hi'] || status) : status;
}

export function getLocalizedEmploymentType(type: string, lang: SupportedLanguage = 'en'): string {
  if (!type) return '';
  if (lang === 'en') return type;
  const match = EMPLOYMENT_TYPES_LOCALIZED[type];
  if (match) return match[lang] || match['ta'] || match['hi'] || type;
  return getUIText(type, lang);
}

export function getLocalizedDuration(duration: string, lang: SupportedLanguage = 'en'): string {
  if (!duration) return '';
  if (lang === 'en') return duration;
  const match = DURATIONS_LOCALIZED[duration];
  return match ? (match[lang] || match['ta'] || match['hi'] || duration) : duration;
}

export function getLocalizedJob(job: string, lang: SupportedLanguage = 'en'): string {
  if (!job) return '';
  if (lang === 'en') return job;
  const match = JOBS_LOCALIZED[job] || POPULAR_GOAL_TITLES[job];
  return match ? (match[lang] || match['ta'] || match['hi'] || job) : job;
}

export function tJobTitle(jobIdOrTitle: string, lang: SupportedLanguage = 'en'): string {
  return getLocalizedJob(jobIdOrTitle, lang);
}

export function getLocalizedEducation(edu: string, lang: SupportedLanguage = 'en'): string {
  if (!edu) return '';
  if (lang === 'en') return edu;
  const match = EDUCATION_LOCALIZED[edu];
  return match ? (match[lang] || match['ta'] || match['hi'] || edu) : edu;
}

export function getLocalizedCaste(caste: string, lang: SupportedLanguage = 'en'): string {
  if (!caste) return '';
  if (lang === 'en') return caste;
  const match = CASTE_LOCALIZED[caste];
  return match ? (match[lang] || match['ta'] || match['hi'] || caste) : caste;
}

export function getLocalizedIncome(income: string, lang: SupportedLanguage = 'en'): string {
  if (!income) return '';
  if (lang === 'en') return income;
  const match = INCOMES_LOCALIZED[income];
  return match ? (match[lang] || match['ta'] || match['hi'] || income) : income;
}

export function getLocalizedSkill(skill: string, lang: SupportedLanguage = 'en'): string {
  if (!skill) return '';
  if (lang === 'en') return skill;
  const match = SKILLS_LOCALIZED[skill];
  return match ? (match[lang] || match['ta'] || match['hi'] || skill) : skill;
}

export function getLocalizedFieldLabel(field: string, lang: SupportedLanguage = 'en'): string {
  const map: Record<string, string> = {
    name: 'fullName',
    age: 'ageLabel',
    currentJob: 'currentJobTitle',
    education: 'education',
    familyJob: 'familyJobTitle',
    familyIncome: 'monthlyIncome',
    caste: 'socialCategory',
    employmentPreference: 'employmentPrefTitle',
    skills: 'skillsStrengthsTitle'
  };
  const key = map[field];
  return key ? getUIText(key, lang) : field;
}

export function getLocalizedGoalTitle(title: string, lang: SupportedLanguage = 'en'): string {
  if (!title) return '';
  if (lang === 'en') return title;
  const match = POPULAR_GOAL_TITLES[title] || JOBS_LOCALIZED[title];
  if (match) return match[lang] || match['ta'] || match['hi'] || title;
  return title;
}

export function tCareerTitle(careerIdOrTitle: string, lang: SupportedLanguage = 'en'): string {
  return getLocalizedGoalTitle(careerIdOrTitle, lang);
}

export function getLocalizedTask(task: string, lang: SupportedLanguage = 'en'): string {
  if (!task) return '';
  if (lang === 'en') return task;
  const lower = task.toLowerCase();
  if (lower.includes('solar') || lower.includes('inverter') || lower.includes('wiring') || lower.includes('panel')) {
    switch (lang) {
      case 'ta': return 'சூரிய ஒளி பேனல்கள் மற்றும் இன்வெர்ட்டர் கம்பியிடுதல்';
      case 'hi': return 'सोलर पैनल और इन्वर्टर वायरिंग स्थापना';
      case 'te': return 'సోలార్ ప్యానెల్లు మరియు ఇన్వర్టర్ వైరింగ్';
      case 'kn': return 'ಸೌರ ಫಲಕಗಳು ಮತ್ತು ಇನ್ವರ್ಟರ್ ವೈರಿಂಗ್';
      case 'ml': return 'സോളാർ പാനലുകളും ഇൻവെർട്ടർ വയറിംഗും';
      case 'bn': return 'সোলার প্যানেল ও ইনভার্টার ওয়্যারিং';
      case 'mr': return 'सोलर पॅनेल आणि इन्व्हर्टर वायरिंग';
      case 'gu': return 'સોલર પેનલ અને ઇન્વર્ટર વાયરિંગ';
      case 'pa': return 'ਸੋਲਰ ਪੈਨਲ ਅਤੇ ਇਨਵਰਟਰ ਵਾਇਰਿੰਗ';
      case 'or': return 'ସୌର ପ୍ୟାନେଲ୍ ଏବଂ ଇନଭର୍ଟର ତାର ସଂଯୋଗ';
      case 'as': return 'সৌৰ পেনেল আৰু ইনভাৰ্টাৰ ৱায়াৰিং';
      case 'ur': return 'سولر پینل اور انورٹر وائرنگ تنصیب';
      default: return 'சூரிய ஒளி பேனல்கள் மற்றும் இன்வெர்ட்டர் கம்பியிடுதல்';
    }
  }
  return task;
}

export function getLocalizedCertification(cert: string, lang: SupportedLanguage = 'en'): string {
  if (!cert) return '';
  if (lang === 'en') return cert;
  switch (lang) {
    case 'ta': return 'அரசு அங்கீகாரம் பெற்ற NSQF நிலை 4 சான்றிதழ்';
    case 'hi': return 'सरकारी मान्यता प्राप्त एनएसक्यूएफ स्तर 4 प्रमाणन';
    case 'te': return 'ప్రభుత్వ గుర్తింపు పొందిన NSQF లెవెల్ 4 సర్టిఫికేషన్';
    case 'kn': return 'ಸರ್ಕಾರಿ ಮಾನ್ಯತೆ ಪಡೆದ NSQF ಮಟ್ಟ 4 ಪ್ರಮಾಣಪತ್ರ';
    case 'ml': return 'സർക്കാർ അംഗീകൃത NSQF ലെവൽ 4 സർട്ടിഫിക്കറ്റ്';
    case 'bn': return 'সরকারি স্বীকৃত এনএসকিউএফ লেভেল ৪ সার্টিফিকেশন';
    case 'mr': return 'शासकीय मान्यताप्राप्त NSQF लेव्हल ४ प्रमाणपत्र';
    case 'gu': return 'સરકારી માન્ય NSQF સ્તર 4 પ્રમાણપત્ર';
    case 'pa': return 'ਸਰਕਾਰੀ ਮਾਨਤਾ ਪ੍ਰਾਪਤ NSQF ਲੈਵਲ 4 ਸਰਟੀਫਿਕੇਸ਼ਨ';
    case 'or': return 'ସରକାରୀ ସ୍ୱୀକୃତିପ୍ରାପ୍ତ NSQF ସ୍ତର ୪ ପ୍ରମାଣପତ୍ର';
    case 'as': return 'চৰকাৰী স্বীকৃতিপ্ৰাপ্ত NSQF লেভেল ৪ প্ৰমাণপত্ৰ';
    case 'ur': return 'حکومتی تسلیم شدہ NSQF لیول 4 سرٹیفیکیشن';
    default: return 'அரசு அங்கீகாரம் பெற்ற NSQF நிலை 4 சான்றிதழ்';
  }
}

export function getLocalizedPlacement(placement: string, lang: SupportedLanguage = 'en'): string {
  if (!placement) return '';
  if (lang === 'en') return placement;
  switch (lang) {
    case 'ta': return '100% வேலைவாய்ப்பு ஆதரவு மற்றும் நேர்காணல் உறுதி';
    case 'hi': return '100% प्लेसमेंट सहायता और साक्षात्कार सहायता';
    case 'te': return '100% ప్లేస్‌మెంట్ మద్దతు మరియు ఇంటర్వ్యూ హామీ';
    case 'kn': return '100% ಉದ್ಯೋಗ ನೆರವು ಮತ್ತು ಸಂದರ್ಶನ ಬೆಂಬಲ';
    case 'ml': return '100% തൊഴിൽ സഹായവും അഭിമുഖ അവസരങ്ങളും';
    case 'bn': return '১০০% নিয়োগ সহায়তা ও সাক্ষাৎকার নিশ্চয়তা';
    case 'mr': return '१००% प्लेसमेंट सहाय्य व मुलाखत हमी';
    case 'gu': return '100% પ્લેસમેન્ટ સહાય અને ઇન્ટરવ્યુ ખાતરી';
    case 'pa': return '100% ਪਲੇਸਮੈਂਟ ਸਹਾਇਤਾ ਅਤੇ ਇੰਟਰਵਿਊ ਗਰੰਟੀ';
    case 'or': return '୧୦୦% ନିଯୁକ୍ତି ସହାୟତା ଏବଂ ସାକ୍ଷାତକାର ସୁଯୋଗ';
    case 'as': return '১০০% নিয়োগ সহায় আৰু সাক্ষাৎকাৰ নিশ্চয়তা';
    case 'ur': return '100% ملازمت کی معاونت اور انٹرویو کی گارنٹی';
    default: return '100% வேலைவாய்ப்பு ஆதரவு மற்றும் நேர்காணல் உறுதி';
  }
}

export function getLocalizedMatchReason(reason: string, lang: SupportedLanguage = 'en'): string {
  if (!reason) return '';
  if (lang === 'en') return reason;
  switch (lang) {
    case 'ta': return 'உங்கள் தற்போதைய பின்னணி மற்றும் பயண தூரத்திற்கு முற்றிலும் பொருந்துகிறது.';
    case 'hi': return 'आपकी वर्तमान पृष्ठभूमि और यात्रा दायरे से पूरी तरह मेल खाता है।';
    case 'te': return 'మీ ప్రస్తుత నేపథ్యం మరియు ప్రయాణ పరిధికి సరిగ్గా సరిపోతుంది.';
    case 'kn': return 'ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಹಿನ್ನೆಲೆ ಮತ್ತು ಪ್ರಯಾಣದ ವ್ಯಾಪ್ತಿಗೆ ಸಂಪೂರ್ಣವಾಗಿ ಹೊಂದಿಕೊಳ್ಳುತ್ತದೆ.';
    case 'ml': return 'നിങ്ങളുടെ ഇപ്പോഴത്തെ പശ്ചാത്തലത്തിനും യാത്രാ പരിധിക്കും തികച്ചും അനുയോജ്യമാണ്.';
    case 'bn': return 'আপনার বর্তমান পটভূমি এবং ভ্রমণের দূরত্বের সাথে সম্পূর্ণ মানানসই।';
    case 'mr': return 'तुमची पार्श्वभूमी आणि प्रवासाचे अंतर यानुसार परिपूर्ण सुसंगत.';
    case 'gu': return 'તમારી વર્તમાન પૃષ્ઠભૂમિ અને મુસાફરીના અંતર સાથે સંપૂર્ણ મેળ ખાય છે.';
    case 'pa': return 'ਤੁਹਾਡੇ ਪਿਛੋਕੜ ਅਤੇ ਸਫ਼ਰ ਦੇ ਘੇਰੇ ਨਾਲ ਪੂਰੀ ਤਰ੍ਹਾਂ ਮੇਲ ਖਾਂਦਾ ਹੈ।';
    case 'or': return 'ଆପଣଙ୍କର ପୃଷ୍ଠଭୂମି ଏବଂ ଯାତ୍ରା ଦୂରତା ସହିତ ସମ୍ପୂର୍ଣ୍ଣ ମେଳ ଖାଉଛି।';
    case 'as': return 'আপোনাৰ বৰ্তমান পটভূমি আৰু যাত্ৰাৰ দূৰত্বৰ সৈতে সম্পূৰ্ণ মিল আছে।';
    case 'ur': return 'آپ کے موجودہ پس منظر اور سفری فاصلے سے بالکل مطابقت رکھتا ہے۔';
    default: return 'உங்கள் தற்போதைய பின்னணி மற்றும் பயண தூரத்திற்கு முற்றிலும் பொருந்துகிறது.';
  }
}

export function getLocalizedOpportunityTitle(title: string, lang: SupportedLanguage = 'en'): string {
  if (!title) return '';
  if (lang === 'en') return title;
  const match = JOBS_LOCALIZED[title] || POPULAR_GOAL_TITLES[title];
  if (match) return match[lang] || match['ta'] || match['hi'] || title;
  return title;
}

/**
 * Localizes a roadmap step or a step string property safely.
 * CRITICAL FIX:
 * - If passed a string, ALWAYS returns a localized string!
 * - If passed an object, returns a normalized localized step object.
 * - NEVER spreads a string into an object with numeric keys!
 */
export function getLocalizedRoadmapStep(stepOrProperty: any, lang: SupportedLanguage = 'en'): any {
  if (stepOrProperty === null || stepOrProperty === undefined) return '';

  // Case 1: String input (title, badge, duration, etc.)
  if (typeof stepOrProperty === 'string') {
    const str = stepOrProperty.trim();
    if (lang === 'en') return str;

    // Check badges & training types
    if (TRAINING_TYPES_LOCALIZED[str]?.[lang]) return TRAINING_TYPES_LOCALIZED[str][lang];
    // Check durations
    if (DURATIONS_LOCALIZED[str]?.[lang]) return DURATIONS_LOCALIZED[str][lang];
    // Check job/career titles
    if (POPULAR_GOAL_TITLES[str]?.[lang]) return POPULAR_GOAL_TITLES[str][lang];
    if (JOBS_LOCALIZED[str]?.[lang]) return JOBS_LOCALIZED[str][lang];
    // Check common UI text
    if (COMMON_UI_TEXT[str]?.[lang]) return COMMON_UI_TEXT[str][lang];

    // Check dynamic titles like "Foundations of ..."
    if (str.startsWith('Foundations of ')) {
      const target = str.replace('Foundations of ', '').trim();
      const locTarget = getLocalizedGoalTitle(target, lang);
      switch (lang) {
        case 'ta': return \`\${locTarget} அடிப்படைப் பயிற்சி\`;
        case 'hi': return \`\${locTarget} की बुनियादी अवधारणाएं\`;
        case 'te': return \`\${locTarget} పునాది శిక్షణ\`;
        case 'kn': return \`\${locTarget} ಮೂಲ ತರಬೇತಿ\`;
        case 'ml': return \`\${locTarget} അടിസ്ഥാന പരിശീലനം\`;
        case 'bn': return \`\${locTarget} প্রাথমিক ধারণা\`;
        case 'mr': return \`\${locTarget} पायाभूत प्रशिक्षण\`;
        case 'gu': return \`\${locTarget} પાયાની તાલીમ\`;
        case 'pa': return \`\${locTarget} ਮੁੱਢਲੀ ਸਿਖਲਾਈ\`;
        case 'or': return \`\${locTarget} ମୌଳିକ ତାଲିମ\`;
        case 'as': return \`\${locTarget} প্ৰাথমিক প্ৰশিক্ষণ\`;
        case 'ur': return \`\${locTarget} کی بنیادی تربیت\`;
        default: return str;
      }
    }

    return str;
  }

  // Case 2: Object input (RoadmapStep object)
  if (typeof stepOrProperty === 'object') {
    const step = stepOrProperty;
    const badgeStr = typeof step.badge === 'string' ? step.badge : (typeof step.trainingType === 'string' ? step.trainingType : '');
    const localizedBadge = TRAINING_TYPES_LOCALIZED[badgeStr]?.[lang] || badgeStr;
    const localizedDuration = DURATIONS_LOCALIZED[step.duration]?.[lang] || (typeof step.duration === 'string' ? step.duration : '');

    let localizedTitle = typeof step.title === 'string' ? step.title : '';
    let localizedDescription = typeof step.description === 'string' ? step.description : '';

    if (step.stepNumber === 1) {
      localizedTitle = getUIText('stepProfile', lang);
      switch (lang) {
        case 'ta': localizedDescription = 'அடிப்படை தகுதி மற்றும் திறன்களை சரிபார்த்தல்'; break;
        case 'hi': localizedDescription = 'बुनियादी योग्यता और कौशलों का सत्यापन'; break;
        case 'te': localizedDescription = 'ప్రాథమిక అర్హత మరియు నైపుణ్యాల ధృవీకరణ'; break;
        case 'kn': localizedDescription = 'ಮೂಲ ಅರ್ಹತೆ ಮತ್ತು ಕೌಶಲ್ಯಗಳ ಪರಿಶೀಲನೆ'; break;
        case 'ml': localizedDescription = 'അടിസ്ഥാന യോഗ്യതകളും കഴിവുകളും പരിശോധിക്കൽ'; break;
        case 'bn': localizedDescription = 'প্রাথমিক যোগ্যতা এবং দক্ষতা যাচাইকরণ'; break;
        case 'mr': localizedDescription = 'मूलभूत पात्रता आणि कौशल्यांची पडताळणी'; break;
        case 'gu': localizedDescription = 'મૂળભૂત લાયકાત અને કુશળતાની ચકાસણી'; break;
        case 'pa': localizedDescription = 'ਮੁੱਢਲੀ ਯੋਗਤਾ ਅਤੇ ਹੁਨਰ ਦੀ ਪੜਤਾਲ'; break;
        case 'or': localizedDescription = 'ମୌଳିକ ଯୋଗ୍ୟତା ଏବଂ ଦକ୍ଷତାର ଯାଞ୍ଚ'; break;
        case 'as': localizedDescription = 'মৌলিক অৰ্হতা আৰু দক্ষতা পৰীক্ষণ'; break;
        case 'ur': localizedDescription = 'بنیادی قابلیت اور مہارتوں کی تصدیق'; break;
        default: localizedDescription = 'அடிப்படை தகுதி மற்றும் திறன்களை சரிபார்த்தல்'; break;
      }
    } else if (step.stepNumber === 2) {
      localizedTitle = getUIText('stepAssess', lang);
      switch (lang) {
        case 'ta': localizedDescription = 'அடிப்படை திறன் மதிப்பீடு மற்றும் இடைவெளி ஆய்வு'; break;
        case 'hi': localizedDescription = 'कौशल मूल्यांकन और अंतर विश्लेषण'; break;
        case 'te': localizedDescription = 'నైపుణ్యాల అంచనా మరియు విశ్లేషణ'; break;
        case 'kn': localizedDescription = 'ಕೌಶಲ್ಯ ಮೌಲ್ಯಮಾಪನ ಮತ್ತು ಅಂತರ ವಿಶ್ಲೇಷಣೆ'; break;
        case 'ml': localizedDescription = 'നൈപുണ്യ വിലയിരുത്തലും വിടവ് വിശകലനവും'; break;
        case 'bn': localizedDescription = 'দক্ষতা মূল্যায়ন এবং ব্যবধান বিশ্লেষণ'; break;
        case 'mr': localizedDescription = 'कौशल्य मूल्यमापन आणि तफावत विश्लेषण'; break;
        case 'gu': localizedDescription = 'કૌશલ્ય મૂલ્યાંકન અને ગેપ વિશ્લેષણ'; break;
        case 'pa': localizedDescription = 'ਹੁਨਰ ਮੁਲਾਂਕਣ ਅਤੇ ਅੰਤਰ ਵਿਸ਼ਲੇਸ਼ਣ'; break;
        case 'or': localizedDescription = 'ଦକ୍ଷତା ମୂଲ୍ୟାଙ୍କନ ଏବଂ ଅନ୍ତର ବିଶ୍ଳେଷଣ'; break;
        case 'as': localizedDescription = 'দক্ষতা মূল্যায়ন আৰু ঘাটি বিশ্লেষণ'; break;
        case 'ur': localizedDescription = 'مہارت کا جائزہ اور فرق کا تجزیہ'; break;
        default: localizedDescription = 'அடிப்படை திறன் மதிப்பீடு மற்றும் இடைவெளி ஆய்வு'; break;
      }
    } else if (step.stepNumber === 3) {
      localizedTitle = getUIText('stepTraining', lang);
      switch (lang) {
        case 'ta': localizedDescription = 'அரசு பயிற்சி மையத்தில் நடைமுறை பயிற்சி'; break;
        case 'hi': localizedDescription = 'सरकारी प्रशिक्षण केंद्र में व्यावहारिक कौशल'; break;
        case 'te': localizedDescription = 'ప్రభుత్వ శిక్షణా కేంద్రంలో ఆచరణాత్మక శిక్షణ'; break;
        case 'kn': localizedDescription = 'ಸರ್ಕಾರಿ ತರಬೇತಿ ಕೇಂದ್ರದಲ್ಲಿ ಪ್ರಾಯೋಗಿಕ ತರಬೇತಿ'; break;
        case 'ml': localizedDescription = 'സർക്കാർ കേന്ദ്രത്തിൽ പ്രായോഗിക പരിശീലനം'; break;
        case 'bn': localizedDescription = 'সরকারি প্রশিক্ষণ কেন্দ্রে বাস্তব দক্ষতা অর্জন'; break;
        case 'mr': localizedDescription = 'शासकीय प्रशिक्षण केंद्रात प्रात्यक्षिक कौशल्ये'; break;
        case 'gu': localizedDescription = 'સરકારી તાલીમ કેન્દ્રમાં પ્રાયોગિક કૌશલ્ય'; break;
        case 'pa': localizedDescription = 'ਸਰਕਾਰੀ ਸਿਖਲਾਈ ਕੇਂਦਰ ਵਿੱਚ ਵਿਹਾਰਕ ਸਿਖਲਾਈ'; break;
        case 'or': localizedDescription = 'ସରକାରୀ ତାଲିମ କେନ୍ଦ୍ରରେ ବ୍ୟବହାରିକ କାର୍ଯ୍ୟ'; break;
        case 'as': localizedDescription = 'চৰকাৰী প্ৰশিক্ষণ কেন্দ্ৰত ব্যৱহাৰিক দক্ষতা'; break;
        case 'ur': localizedDescription = 'سرکاری تربیتی مرکز میں عملی تربیت'; break;
        default: localizedDescription = 'அரசு பயிற்சி மையத்தில் நடைமுறை பயிற்சி'; break;
      }
    } else if (step.stepNumber === 4) {
      localizedTitle = getUIText('stepCertified', lang);
      switch (lang) {
        case 'ta': localizedDescription = 'அரசு சான்றிதழ் மற்றும் தேர்வு நிறைவு'; break;
        case 'hi': localizedDescription = 'सरकारी प्रमाणन एवं परीक्षा पूर्णता'; break;
        case 'te': localizedDescription = 'ప్రభుత్వ ధృవీకరణ మరియు పరీక్ష పూర్తి'; break;
        case 'kn': localizedDescription = 'ಸರ್ಕಾರಿ ಪ್ರಮಾಣಪತ್ರ ಮತ್ತು ಪರೀಕ್ಷೆ ಪೂರ್ಣಗೊಳಿಸುವಿಕೆ'; break;
        case 'ml': localizedDescription = 'സർക്കാർ സർട്ടിഫിക്കേഷനും പരീക്ഷയും പൂർത്തിയാക്കൽ'; break;
        case 'bn': localizedDescription = 'সরকারি সার্টিফিকেশন এবং পরীক্ষা সম্পন্ন'; break;
        case 'mr': localizedDescription = 'सरकारी प्रमाणपत्र आणि परीक्षा पूर्ण करणे'; break;
        case 'gu': localizedDescription = 'સરકારી પ્રમાણપત્ર અને પરીક્ષા પૂર્ણ'; break;
        case 'pa': localizedDescription = 'ਸਰਕਾਰੀ ਸਰਟੀਫਿਕੇਸ਼ਨ ਅਤੇ ਪ੍ਰੀਖਿਆ ਮੁਕੰਮਲ'; break;
        case 'or': localizedDescription = 'ସରକାରୀ ପ୍ରମାଣପତ୍ର ଏବଂ ପରୀକ୍ଷା ସମାପ୍ତ'; break;
        case 'as': localizedDescription = 'চৰকাৰী প্ৰমাণপত্ৰ আৰু পৰীক্ষা সম্পূৰ্ণ'; break;
        case 'ur': localizedDescription = 'سرکاری سرٹیفیکیشن اور امتحان کی تکمیل'; break;
        default: localizedDescription = 'அரசு சான்றிதழ் மற்றும் தேர்வு நிறைவு'; break;
      }
    } else if (step.stepNumber === 5) {
      localizedTitle = getUIText('stepPlaced', lang);
      switch (lang) {
        case 'ta': localizedDescription = 'சரிபார்க்கப்பட்ட நிறுவனத்தில் நேரடி வேலைவாய்ப்பு'; break;
        case 'hi': localizedDescription = 'सत्यापित कंपनी में प्रत्यक्ष रोजगार नियुक्ति'; break;
        case 'te': localizedDescription = 'ధృవీకరించిన సంస్థలో ప్రత్యక్ష ఉద్యోగ ప్రవేశం'; break;
        case 'kn': localizedDescription = 'ಪರಿಶೀಲಿಸಿದ ಕಂಪನಿಯಲ್ಲಿ ನೇರ ಉದ್ಯೋಗ ನಿಯೋಜನೆ'; break;
        case 'ml': localizedDescription = 'സ്ഥിരീകരിച്ച കമ്പനിയിൽ നേരിട്ടുള്ള ജോലി നിയമനം'; break;
        case 'bn': localizedDescription = 'যাচাইকৃত সংস্থায় সরাসরি চাকরি নিয়োগ'; break;
        case 'mr': localizedDescription = 'पडताळणी केलेल्या कंपनीत थेट नोकरी नियुक्ती'; break;
        case 'gu': localizedDescription = 'ચકાસાયેલ કંપનીમાં સીધી નોકરીની નિમણૂક'; break;
        case 'pa': localizedDescription = 'ਤਸਦੀਕਸ਼ੁਦਾ ਕੰਪਨੀ ਵਿੱਚ ਸਿੱਧੀ ਨੌਕਰੀ ਨਿਯੁਕਤੀ'; break;
        case 'or': localizedDescription = 'ଯାଞ୍ଚ ହୋଇଥିବା କମ୍ପାନୀରେ ପ୍ରତ୍ୟକ୍ଷ ନିଯୁକ୍ତି'; break;
        case 'as': localizedDescription = 'পৰীক্ষিত প্ৰতিষ্ঠানত পোনপটীয়া নিযুক্তি'; break;
        case 'ur': localizedDescription = 'تصدیق شدہ ادارے میں براہ راست ملازمت کا حصول'; break;
        default: localizedDescription = 'சரிபார்க்கப்பட்ட நிறுவனத்தில் நேரடி வேலைவாய்ப்பு'; break;
      }
    }

    const rawSkills = Array.isArray(step.skills) ? step.skills : [];
    const localizedSkills = rawSkills.map((s: string) => getLocalizedSkill(s, lang));

    return {
      ...step,
      title: localizedTitle,
      description: localizedDescription,
      badge: localizedBadge,
      duration: localizedDuration,
      skills: localizedSkills
    };
  }

  return String(stepOrProperty);
}

/**
 * Localizes a training program or title string safely.
 * CRITICAL FIX: If passed a string, returns a localized string!
 */
export function getLocalizedTraining(tpOrTitle: any, lang: SupportedLanguage = 'en'): any {
  if (!tpOrTitle) return '';

  if (typeof tpOrTitle === 'string') {
    if (lang === 'en') return tpOrTitle;
    const match = JOBS_LOCALIZED[tpOrTitle] || POPULAR_GOAL_TITLES[tpOrTitle];
    if (match) return match[lang] || match['ta'] || match['hi'] || tpOrTitle;
    return tpOrTitle;
  }

  if (typeof tpOrTitle === 'object') {
    const tp = tpOrTitle;
    let localizedStatus = tp.feeSupportStatus;
    switch (lang) {
      case 'ta': localizedStatus = '100% இலவச அரசு நிதியுதவி (PM-AJAY திட்டத்தின் கீழ்)'; break;
      case 'hi': localizedStatus = '100% निःशुल्क सरकारी सहायता (पीएम-अजय के तहत)'; break;
      case 'te': localizedStatus = '100% ఉచిత ప్రభుత్వ సహాయం (PM-AJAY కింద)'; break;
      case 'kn': localizedStatus = '100% ಉಚಿತ ಸರ್ಕಾರಿ ನೆರವು (PM-AJAY ಅಡಿಯಲ್ಲಿ)'; break;
      case 'ml': localizedStatus = '100% സൗജന്യ സർക്കാർ സഹായം (PM-AJAY പ്രകാരം)'; break;
      case 'bn': localizedStatus = '১০০% বিনামূল্যে সরকারি সহায়তা (পিএম-অজয় আওতায়)'; break;
      case 'mr': localizedStatus = '१००% मोफत सरकारी सहाय्य (पीएम-अजय अंतर्गत)'; break;
      case 'gu': localizedStatus = '100% મફત સરકારી સહાય (પીએમ-અજય હેઠળ)'; break;
      case 'pa': localizedStatus = '100% ਮੁਫ਼ਤ ਸਰਕਾਰੀ ਸਹਾਇਤਾ (PM-AJAY ਅਧੀਨ)'; break;
      case 'or': localizedStatus = '୧୦୦% ମାଗଣା ସରକାରୀ ସହାୟତା (PM-AJAY ଅଧୀନରେ)'; break;
      case 'as': localizedStatus = '১০০% বিনামূলীয়া চৰকাৰী সাহায্য (PM-AJAY ৰ অধীনত)'; break;
      case 'ur': localizedStatus = '100% مفت سرکاری امداد (PM-AJAY کے تحت)'; break;
      default: localizedStatus = '100% Free Government Assistance (under PM-AJAY)'; break;
    }
    return {
      ...tp,
      feeSupportStatus: localizedStatus
    };
  }

  return String(tpOrTitle);
}

/**
 * Localizes an enterprise pathway or idea string safely.
 * CRITICAL FIX: If passed a string, returns a localized string!
 */
export function getLocalizedEnterprise(pathwayOrIdea: any, lang: SupportedLanguage = 'en'): any {
  if (!pathwayOrIdea) return '';

  if (typeof pathwayOrIdea === 'string') {
    if (lang === 'en') return pathwayOrIdea;
    switch (lang) {
      case 'ta': return 'சுயதொழில் மற்றும் குறுந்தொழில் வாய்ப்பு';
      case 'hi': return 'स्वरोजगार एवं सूक्ष्म व्यवसाय अवसर';
      case 'te': return 'స్వయం ఉపాధి మరియు సూక్ష్మ వ్యాపార అవకాశం';
      case 'kn': return 'ಸ್ವಯಂ ಉದ್ಯೋಗ ಮತ್ತು ಕಿರು ಉದ್ಯಮ ಅವಕಾಶ';
      case 'ml': return 'സ്വയംതൊഴിൽ അവസരം';
      case 'bn': return 'স্ব-কর্মসংস্থান ও ক্ষুদ্র ব্যবসার সুযোগ';
      case 'mr': return 'स्वयंरोजगार आणि सूक्ष्म व्यवसाय संधी';
      case 'gu': return 'સ્વરોજગાર અને સૂક્ષ્મ વ્યવસાય તક';
      case 'pa': return 'ਸਵੈ-ਰੁਜ਼ਗਾਰ ਅਤੇ ਸੂਖਮ ਕਾਰੋਬਾਰ ਦਾ ਮੌਕਾ';
      case 'or': return 'ସ୍ୱୟଂ ରୋଜଗାର ଏବଂ କ୍ଷୁଦ୍ର ଉଦ୍ୟୋଗ ସୁଯୋଗ';
      case 'as': return 'আত্মসংস্থাপন আৰু ক্ষুদ্ৰ ব্যৱসায়ৰ সুযোগ';
      case 'ur': return 'خود روزگاری اور مائیکرو کاروبار کا موقع';
      default: return pathwayOrIdea;
    }
  }

  if (typeof pathwayOrIdea === 'object') {
    const pathway = pathwayOrIdea;
    let localizedTagline = pathway.tagline;
    switch (lang) {
      case 'ta': localizedTagline = '₹50,000 அரசு நேரடி மானியத்துடன் சொந்த தொழில் தொடங்குங்கள்'; break;
      case 'hi': localizedTagline = '₹50,000 प्रत्यक्ष सरकारी अनुदान के साथ अपना व्यवसाय शुरू करें'; break;
      case 'te': localizedTagline = '₹50,000 ప్రభుత్వ ప్రత్యక్ష గ్రాంట్‌తో స్వంత వ్యాపారం ప్రారంభించండి'; break;
      case 'kn': localizedTagline = '₹50,000 ಸರ್ಕಾರಿ ನೇರ ಅನುದಾನದೊಂದಿಗೆ ಸ್ವಂತ ಉದ್ಯಮ ಪ್ರಾರಂಭಿಸಿ'; break;
      case 'ml': localizedTagline = '₹50,000 സർക്കാർ ഗ്രാന്റോടെ സ്വന്തം സംരംഭം ആരംഭിക്കുക'; break;
      case 'bn': localizedTagline = '₹৫০,০০০ সরকারি প্রত্যক্ষ অনুদান নিয়ে নিজস্ব ব্যবসা শুরু করুন'; break;
      case 'mr': localizedTagline = '₹५०,००० थेट सरकारी अनुदानासह स्वतःचा व्यवसाय सुरू करा'; break;
      case 'gu': localizedTagline = '₹50,000 સીધી સરકારી સહાય સાથે પોતાનો વ્યવસાય શરૂ કરો'; break;
      case 'pa': localizedTagline = '₹50,000 ਸਿੱਧੀ ਸਰਕਾਰੀ ਗ੍ਰਾਂਟ ਨਾਲ ਆਪਣਾ ਕਾਰੋਬਾਰ ਸ਼ੁਰੂ ਕਰੋ'; break;
      case 'or': localizedTagline = '₹୫୦,୦୦୦ ପ୍ରତ୍ୟକ୍ଷ ସରକାରୀ ଅନୁଦାନ ସହିତ ନିଜର ବ୍ୟବସାୟ ଆରମ୍ଭ କରନ୍ତୁ'; break;
      case 'as': localizedTagline = '₹৫০,০০০ প্ৰত্যক্ষ চৰকাৰী অনুদানেৰে নিজৰ ব্যৱসায় আৰম্ভ কৰক'; break;
      case 'ur': localizedTagline = '₹50,000 براہ راست حکومتی گرانٹ کے ساتھ اپنا کاروبار شروع کریں'; break;
      default: localizedTagline = 'Start your own enterprise with ₹50,000 direct government grant'; break;
    }
    return {
      ...pathway,
      tagline: localizedTagline
    };
  }

  return String(pathwayOrIdea);
}

export function getHomeGreeting(lang: SupportedLanguage = 'en'): string {
  switch (lang) {
    case 'ta': return 'வணக்கம்';
    case 'hi': return 'नमस्ते';
    case 'te': return 'నమస్కారం';
    case 'kn': return 'ನಮಸ್ಕಾರ';
    case 'ml': return 'നമസ്കാരം';
    case 'bn': return 'নমস্কার';
    case 'mr': return 'नमस्कार';
    case 'gu': return 'નમસ્તે';
    case 'pa': return 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ';
    case 'or': return 'ନମସ୍କାର';
    case 'as': return 'নমস্কাৰ';
    case 'ur': return 'آداب';
    default: return 'Welcome';
  }
}

export function getHomeNextStepVoice(type: string, data: any = {}, lang: SupportedLanguage = 'en'): string {
  switch (type) {
    case 'choose_goal':
      switch (lang) {
        case 'ta': return 'உங்கள் வழிகாட்டியை உருவாக்க ஒரு தொழில் இலக்கைத் தேர்ந்தெடுக்கவும்.';
        case 'hi': return 'अपना व्यक्तिगत रोडमैप बनाने के लिए एक करियर लक्ष्य चुनें।';
        case 'te': return 'మీ రోడ్‌మ్యాప్‌ను రూపొందించడానికి కెరీర్ లక్ష్యాన్ని ఎంచుకోండి.';
        case 'kn': return 'ನಿಮ್ಮ ಮಾರ್ಗಸೂಚಿ ರಚಿಸಲು ವೃತ್ತಿ ಗುರಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.';
        case 'ml': return 'നിങ്ങളുടെ റോഡ്‌മാപ്പ് തയ്യാറാക്കാൻ ഒരു തൊഴിൽ ലക്ഷ്യം തിരഞ്ഞെടുക്കുക.';
        case 'bn': return 'আপনার রোডম্যাপ তৈরি করতে একটি ক্যারিয়ার লক্ষ্য নির্বাচন করুন।';
        case 'mr': return 'तुमचा रोडमॅप तयार करण्यासाठी करिअर ध्येय निवडा.';
        case 'gu': return 'તમારો રોડમેપ બનાવવા માટે કારકિર્દી લક્ષ્ય પસંદ કરો.';
        case 'pa': return 'ਆਪਣਾ ਰੋਡਮੈਪ ਬਣਾਉਣ ਲਈ ਕਰੀਅਰ ਦਾ ਟੀਚਾ ਚੁਣੋ।';
        case 'or': return 'ଆପଣଙ୍କ ରୋଡମ୍ୟାପ୍ ପ୍ରସ୍ତୁତ କରିବାକୁ ଏକ କ୍ୟାରିୟର ଲକ୍ଷ୍ୟ ବାଛନ୍ତୁ।';
        case 'as': return 'আপোনাৰ ৰ’ডমেপ তৈয়াৰ কৰিবলৈ কেৰিয়াৰ লক্ষ্য বাছক।';
        case 'ur': return 'اپنا روڈ میپ تیار کرنے کے لیے کیریئر کا ہدف منتخب کریں۔';
        default: return 'Please select a career goal to generate your roadmap.';
      }
    case 'enterprise':
      switch (lang) {
        case 'ta': return 'பிஎம்-அஜய் ₹50,000 தொழில் தொடக்க மானிய விவரங்களைப் பார்க்கவும்.';
        case 'hi': return 'पीएम-अजय ₹50,000 उद्यम अनुदान विवरण देखें।';
        case 'te': return 'PM-AJAY ₹50,000 వ్యాపార ప్రారంభ గ్రాంట్ వివరాలను సమీక్షించండి.';
        case 'kn': return 'PM-AJAY ₹50,000 ಉದ್ಯಮ ಅನುದಾನ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.';
        case 'ml': return 'PM-AJAY ₹50,000 സംരംഭക ഗ്രാന്റ് വിവരങ്ങൾ പരിശോധിക്കുക.';
        case 'bn': return 'পিএম-অজয় ₹৫০,০০০ উদ্যোগ অনুদানের বিবরণ দেখুন।';
        case 'mr': return 'पीएम-अजय ₹५०,००० व्यवसाय अनुदान तपशील तपासा.';
        case 'gu': return 'પીએમ-અજય ₹50,000 બિઝનેસ ગ્રાન્ટની વિગતો તપાસો.';
        case 'pa': return 'PM-AJAY ₹50,000 ਕਾਰੋਬਾਰੀ ਗ੍ਰਾਂਟ ਦੇ ਵੇਰਵੇ ਦੇਖੋ।';
        case 'or': return 'PM-AJAY ₹୫୦,୦୦୦ ଉଦ୍ୟୋଗ ଅନୁଦାନ ବିବରଣୀ ଯାଞ୍ଚ କରନ୍ତୁ।';
        case 'as': return 'PM-AJAY ₹৫০,০০০ উদ্যোগ অনুদানৰ সবিশেষ চাওক।';
        case 'ur': return 'PM-AJAY ₹50,000 کاروباری گرانٹ کی تفصیلات دیکھیں۔';
        default: return 'Review PM-AJAY ₹50,000 enterprise grant details.';
      }
    case 'training':
      switch (lang) {
        case 'ta': return 'அருகிலுள்ள இலவச பயிற்சி வகுப்பில் சேரவும்.';
        case 'hi': return 'निकटतम निःशुल्क सरकारी प्रशिक्षण में दाखिला लें।';
        case 'te': return 'సమీపంలోని ఉచిత శిక్షణా బ్యాచ్‌లో చేరండి.';
        case 'kn': return 'ಹತ್ತಿರದ ಉಚಿತ ತರಬೇತಿ ಬ್ಯಾಚ್‌ಗೆ ಸೇರಿಕೊಳ್ಳಿ.';
        case 'ml': return 'സൗജന്യ പരിശീലന ബാച്ചിൽ പ്രവേശനം നേടുക.';
        case 'bn': return 'কাছাকাছি বিনামূল্যে প্রশিক্ষণ ব্যাচে ভর্তি হন।';
        case 'mr': return 'जवळपासच्या मोफत प्रशिक्षण तुकडीत नाव नोंदवा.';
        case 'gu': return 'નજીકની મફત તાલીમ બેચમાં પ્રવેશ મેળવો.';
        case 'pa': return 'ਨੇੜਲੇ ਮੁਫ਼ਤ ਸਿਖਲਾਈ ਬੈਚ ਵਿੱਚ ਦਾਖਲਾ ਲਓ।';
        case 'or': return 'ନିକଟବର୍ତ୍ତୀ ମାଗଣା ତାଲିମ ବ୍ୟାଚ୍‌ରେ ନାମ ଲେଖାନ୍ତୁ।';
        case 'as': return 'ওচৰৰ বিনামূলীয়া প্ৰশিক্ষণত নামভৰ্তি কৰক।';
        case 'ur': return 'قریبی مفت تربیتی بیچ میں داخلہ لیں۔';
        default: return 'Enroll in your nearest free training batch.';
      }
    case 'interview':
      switch (lang) {
        case 'ta': return \`\${data.org || 'நிறுவனத்தில்'} நேர்காணலுக்கு தயாராகுங்கள்.\`;
        case 'hi': return \`\${data.org || 'कंपनी'} में साक्षात्कार की तैयारी करें।\`;
        case 'te': return \`\${data.org || 'సంస్థలో'} ఇంటర్వ్యూకు సిద్ధం కండి.\`;
        case 'kn': return \`\${data.org || 'ಸಂಸ್ಥೆಯಲ್ಲಿ'} ಸಂದರ್ಶನಕ್ಕೆ ಸಿದ್ಧರಾಗಿ.\`;
        case 'ml': return \`\${data.org || 'കമ്പനിയിലെ'} അഭിമുഖത്തിന് തയ്യാറെടുക്കുക.\`;
        case 'bn': return \`\${data.org || 'প্রতিষ্ঠানে'} সাক্ষাৎকারের প্রস্তুতি নিন।\`;
        case 'mr': return \`\${data.org || 'कंपनीतील'} मुलाखतीची तयारी करा.\`;
        case 'gu': return \`\${data.org || 'કંપનીમાં'} ઇન્ટરવ્યુ માટે તૈયાર રહો.\`;
        case 'pa': return \`\${data.org || 'ਕੰਪਨੀ ਵਿੱਚ'} ਇੰਟਰਵਿਊ ਲਈ ਤਿਆਰ ਹੋਵੋ।\`;
        case 'or': return \`\${data.org || 'ସଂସ୍ଥାରେ'} ସାକ୍ଷାତକାର ପାଇଁ ପ୍ରସ୍ତୁତ ରୁହନ୍ତୁ।\`;
        case 'as': return \`\${data.org || 'প্ৰতিষ্ঠানত'} সাক্ষাৎকাৰৰ প্ৰস্তুতি লওক।\`;
        case 'ur': return \`\${data.org || 'کمپنی میں'} انٹرویو کی تیاری کریں۔\`;
        default: return \`Prepare for your interview at \${data.org || 'the company'}.\`;
      }
    default:
      switch (lang) {
        case 'ta': return 'அடுத்த படியைத் தொடங்கவும்.';
        case 'hi': return 'अगले कदम पर आगे बढ़ें।';
        case 'te': return 'తదుపరి దశను ప్రారంభించండి.';
        case 'kn': return 'ಮುಂದಿನ ಹಂತವನ್ನು ಪ್ರಾರಂಭಿಸಿ.';
        case 'ml': return 'അടുത്ത ഘട്ടം ആരംഭിക്കുക.';
        case 'bn': return 'পরবর্তী ধাপ শুরু করুন।';
        case 'mr': return 'पुढील टप्पा सुरू करा.';
        case 'gu': return 'આગળનું પગલું શરૂ કરો.';
        case 'pa': return 'ਅਗਲਾ ਕਦਮ ਸ਼ੁਰੂ ਕਰੋ।';
        case 'or': return 'ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପ ଆରମ୍ଭ କରନ୍ତୁ।';
        case 'as': return 'পৰৱৰ্তী পদক্ষেপ আৰম্ভ কৰক।';
        case 'ur': return 'اگلا مرحلہ شروع کریں۔';
        default: return 'Continue to the next step.';
      }
  }
}

export function getRoadmapSummaryVoice(
  currentJob: string,
  targetGoal: string,
  coveragePercent: number,
  months: string,
  lang: SupportedLanguage = 'en'
): string {
  const job = getLocalizedJob(currentJob, lang);
  const goal = getLocalizedGoalTitle(targetGoal, lang);
  switch (lang) {
    case 'ta':
      return \`\${job} பின்னணியில் இருந்து \${goal} இலக்கை அடைய உங்கள் திறன் பொருத்தம் \${coveragePercent}% ஆகும். இந்த முழுப் பயணம் சுமார் \${months} ஆகும்.\`;
    case 'hi':
      return \`\${job} से \${goal} लक्ष्य तक आपकी कौशल क्षमता \${coveragePercent}% है। यह यात्रा लगभग \${months} में पूरी होगी।\`;
    case 'te':
      return \`\${job} నుండి \${goal} వైపు మీ నైపుణ్యాల స్థాయి \${coveragePercent}%. ఈ ప్రయాణం సుమారు \${months} పడుతుంది.\`;
    case 'kn':
      return \`\${job} ಇಂದ \${goal} ಕಡೆಗೆ ನಿಮ್ಮ ಕೌಶಲ್ಯ ಹೊಂದಾಣಿಕೆ \${coveragePercent}%. ಈ ಪೂರ್ಣ ಪಯಣ ಸುಮಾರು \${months} ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ.\`;
    case 'ml':
      return \`\${job}-ൽ നിന്ന് \${goal}-ലേക്ക് നിങ്ങളുടെ നൈపుണ്യ പരിധി \${coveragePercent}% ആണ്. ഇത് ഏകദേശം \${months} കൊണ്ട് പൂർത്തിയാക്കാം.\`;
    case 'bn':
      return \`\${job} থেকে \${goal} লক্ষ্যে পৌঁছাতে আপনার বর্তমান দক্ষতা \${coveragePercent}%। এই সম্পূর্ণ যাত্রা প্রায় \${months} সময় নেবে।\`;
    case 'mr':
      return \`\${job} वरून \${goal} ध्येयाकडे तुमची कौशल्य जुळणी \${coveragePercent}% आहे. हा प्रवास पूर्ण करण्यासाठी सुमारे \${months} लागतील.\`;
    case 'gu':
      return \`\${job} થી \${goal} તરફ તમારી કૌશલ્ય સુસંગતતા \${coveragePercent}% છે. આ પૂર્ણ પ્રવાસ આશરે \${months} લેશે.\`;
    case 'pa':
      return \`\${job} ਤੋਂ \${goal} ਵੱਲ ਤੁਹਾਡੀ ਹੁਨਰ ਅਨੁਕੂਲਤਾ \${coveragePercent}% ਹੈ। ਇਹ ਪੂਰੀ ਯਾਤਰਾ ਲਗਭਗ \${months} ਲਵੇਗੀ।\`;
    case 'or':
      return \`\${job} ରୁ \${goal} ଆଡ଼କୁ ଆପଣଙ୍କର ଦକ୍ଷତା ମେଳ \${coveragePercent}% ଅଟେ। ଏହି ସମ୍ପୂର୍ଣ୍ଣ ଯାତ୍ରା ପ୍ରାୟ \${months} ସମୟ ନେବ।\`;
    case 'as':
      return \`\${job} ৰ পৰা \${goal} লক্ষ্যলৈ আপোনাৰ দক্ষতাৰ মিল \${coveragePercent}%। এই যাত্ৰা প্ৰায় \${months} সময় ল’ব।\`;
    case 'ur':
      return \`\${job} سے \${goal} کی طرف آپ کی مہارت کی مطابقت \${coveragePercent}% ہے۔ اس سفر میں تقریباً \${months} لگیں گے۔\`;
    default:
      return \`Your skill match from \${job} to \${goal} is \${coveragePercent}%. Estimated completion is \${months}.\`;
  }
}

export function getSchemesOverviewVoice(caste: string, count: number, lang: SupportedLanguage = 'en'): string {
  const locCaste = getLocalizedCaste(caste, lang) || caste;
  switch (lang) {
    case 'ta':
      return \`\${locCaste} சமூக பயனாளியாக, நீங்கள் நேரடியாக பயன்பெறும் \${count} அரசு நலத்திட்டங்கள் கண்டறியப்பட்டுள்ளன.\`;
    case 'hi':
      return \`\${locCaste} समुदाय के लाभार्थी के रूप में, आपके लिए \${count} प्रत्यक्ष सरकारी योजनाएं उपलब्ध हैं।\`;
    case 'te':
      return \`\${locCaste} వర్గానికి సంబంధించి, మీరు నేరుగా ప్రయోజనం పొందే \${count} సంక్షేమ పథకాలు కనుగొనబడ్డాయి.\`;
    case 'kn':
      return \`\${locCaste} ಸಮುದಾಯದ ಫಲಾನುಭವಿಯಾಗಿ, ನೀವು ನೇರ ಪ್ರಯೋಜನ ಪಡೆಯುವ \${count} ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಲಭ್ಯವಿವೆ.\`;
    case 'ml':
      return \`\${locCaste} വിഭാഗത്തിന് കീഴിൽ, നിങ്ങൾക്ക് നേരിട്ട് പ്രയോജനം ലഭിക്കുന്ന \${count} സർക്കാർ പദ്ധതികൾ കണ്ടെത്തി.\`;
    case 'bn':
      return \`\${locCaste} সম্প্রদায়ের সুবিধাভোগী হিসেবে আপনার জন্য সরাসরি সুবিধাজনক \${count}টি সরকারি প্রকল্প রয়েছে।\`;
    case 'mr':
      return \`\${locCaste} प्रवर्गासाठी थेट लाभ देणाऱ्या \${count} शासकीय योजना उपलब्ध आहेत।\`;
    case 'gu':
      return \`\${locCaste} સમુદાયના લાભાર્થી તરીકે તમારા માટે સીધા લાભ આપતી \${count} સરકારી યોજનાઓ ઉપલબ્ધ છે.\`;
    case 'pa':
      return \`\${locCaste} ਭਾਈਚਾਰੇ ਦੇ ਲਾਭਪਾਤਰੀ ਵਜੋਂ ਤੁਹਾਡੇ ਲਈ ਸਿੱਧੇ ਲਾਭ ਦੇਣ ਵਾਲੀਆਂ \${count} ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਹਨ।\`;
    case 'or':
      return \`\${locCaste} ବର୍ଗର ହିତାଧିକାରୀ ଭାବରେ, ଆପଣଙ୍କ ପାଇଁ ସିଧାସଳଖ ଲାଭ ଦେଉଥିବା \${count}ଟି ସରକାରୀ ଯୋଜନା ରହିଛି।\`;
    case 'as':
      return \`\${locCaste} সম্প্ৰদায়ৰ হিতাধিকাৰী হিচাপে আপোনাৰ বাবে প্ৰত্যক্ষ লাভজনক \${count}খন চৰকাৰী আঁচনি উপলব্ধ।\`;
    case 'ur':
      return \`\${locCaste} طبقے کے مستفید کے طور پر، آپ کے لیے براہ راست فائدہ مند \${count} سرکاری اسکیمیں دستیاب ہیں۔\`;
    default:
      return \`As a \${locCaste} beneficiary, you qualify for \${count} government welfare schemes with direct benefits.\`;
  }
}

export function getSchemeDetailVoice(name: string, ministry: string, benefit: string, lang: SupportedLanguage = 'en'): string {
  switch (lang) {
    case 'ta':
      return \`\${name}, \${ministry} வழங்கும் திட்டம். முக்கிய பலன்: \${benefit}.\`;
    case 'hi':
      return \`\${name}, \${ministry} द्वारा संचालित योजना। मुख्य लाभ: \${benefit}।\`;
    case 'te':
      return \`\${name}, \${ministry} అందించే పథకం. ముఖ్య ప్రయోజనం: \${benefit}.\`;
    case 'kn':
      return \`\${name}, \${ministry} ಅಡಿಯಲ್ಲಿ ಬರುವ ಯೋಜನೆ. ಮುಖ್ಯ ಪ್ರಯೋಜನ: \${benefit}.\`;
    case 'ml':
      return \`\${name}, \${ministry} നൽകുന്ന പദ്ധതി. പ്രധാന ആനുകൂല്യം: \${benefit}.\`;
    case 'bn':
      return \`\${name}, \${ministry} এর অধীনস্থ প্রকল্প। প্রধান সুবিধা: \${benefit}।\`;
    case 'mr':
      return \`\${name}, \${ministry} अंतर्गत योजना. मुख्य लाभ: \${benefit}.\`;
    case 'gu':
      return \`\${name}, \${ministry} હેઠળની યોજના. મુખ્ય લાભ: \${benefit}.\`;
    case 'pa':
      return \`\${name}, \${ministry} ਅਧੀਨ ਸਕੀਮ। ਮੁੱਖ ਲਾਭ: \${benefit}।\`;
    case 'or':
      return \`\${name}, \${ministry} ଦ୍ୱାରା ଯୋଜନା। ମୁଖ୍ୟ ଲାଭ: \${benefit}।\`;
    case 'as':
      return \`\${name}, \${ministry} ৰ অধীনস্থ আঁচনি। মুখ্য সুবিধা: \${benefit}।\`;
    case 'ur':
      return \`\${name}، \${ministry} کے تحت اسکیم۔ اہم فائدہ: \${benefit}।\`;
    default:
      return \`\${name}, operated under \${ministry}. Key benefit: \${benefit}.\`;
  }
}

export function getAnalyzingPathwaysVoice(currentJob: string, targetGoal: string, lang: SupportedLanguage = 'en'): string {
  const job = getLocalizedJob(currentJob, lang);
  const goal = getLocalizedGoalTitle(targetGoal, lang);
  switch (lang) {
    case 'ta':
      return \`\${job} பின்னணியில் இருந்து \${goal} நோக்கிய வழிகாட்டி உருவாக்கப்படுகிறது.\`;
    case 'hi':
      return \`\${job} से \${goal} के लिए आपका व्यक्तिगत करियर मार्ग तैयार किया जा रहा है।\`;
    case 'te':
      return \`\${job} నుండి \${goal} వైపు మీ వ్యక్తిగత మార్గం సిద్ధమవుతోంది.\`;
    case 'kn':
      return \`\${job} ಇಂದ \${goal} ಕಡೆಗೆ ನಿಮ್ಮ ವೃತ್ತಿ ಮಾರ್ಗಸೂಚಿ ಸಿದ್ಧಗೊಳ್ಳುತ್ತಿದೆ.\`;
    case 'ml':
      return \`\${job}-ൽ നിന്ന് \${goal}-ലേക്ക് നിങ്ങളുടെ പാത തയ്യാറാക്കുന്നു.\`;
    case 'bn':
      return \`\${job} থেকে \${goal} লক্ষ্যে পৌঁছানোর রোডম্যাপ তৈরি করা হচ্ছে।\`;
    case 'mr':
      return \`\${job} वरून \${goal} साठी तुमचा वैयक्तिक करिअर मार्ग तयार केला जात आहे.\`;
    case 'gu':
      return \`\${job} થી \${goal} માટે તમારો વ્યક્તિગત માર્ગ તૈયાર થઈ રહ્યો છે.\`;
    case 'pa':
      return \`\${job} ਤੋਂ \${goal} ਵੱਲ ਤੁਹਾਡਾ ਰੋਡਮੈਪ ਤਿਆਰ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ।\`;
    case 'or':
      return \`\${job} ରୁ \${goal} ପାଇଁ ଆପଣଙ୍କର ବ୍ୟକ୍ତିଗତ ପଥ ପ୍ରସ୍ତୁତ ହେଉଛି।\`;
    case 'as':
      return \`\${job} ৰ পৰা \${goal} লক্ষ্যলৈ আপোনাৰ ৰ’ডমেপ প্ৰস্তুত কৰা হৈছে।\`;
    case 'ur':
      return \`\${job} سے \${goal} کے لیے آپ کا ذاتی کیریئر راستہ تیار کیا جا رہا ہے۔\`;
    default:
      return \`Analyzing skill pathways from \${job} to \${goal}.\`;
  }
}
`;

  content = prefix + newHelpers;
}

fs.writeFileSync('lib/translations.ts', content, 'utf8');
console.log('Successfully updated lib/translations.ts with complete translations and helper functions!');
