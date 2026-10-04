/**
 * scripts/patch_translations_with_dictionary.js
 * Adds imports from @/lib/contentDictionary and exports new and updated localization resolvers.
 */

const fs = require('fs');

let content = fs.readFileSync('lib/translations.ts', 'utf8');

// 1. Add import from @/lib/contentDictionary at top
if (!content.includes("from '@/lib/contentDictionary'")) {
  const importStatement = `import {
  ROADMAP_TITLES_LOCALIZED,
  ROADMAP_DESCRIPTIONS_LOCALIZED,
  ROADMAP_BADGES_LOCALIZED,
  ROADMAP_DURATIONS_LOCALIZED,
  ROADMAP_FREE_SCHEMES_LOCALIZED,
  ROADMAP_CERTIFICATIONS_LOCALIZED,
  SKILLS_FULL_DICTIONARY,
  SCHEMES_CONTENT_LOCALIZED,
  OPPORTUNITIES_TITLES_LOCALIZED,
  getDictionaryRoadmapTitle,
  getDictionaryRoadmapDescription,
  getDictionaryRoadmapBadge,
  getDictionaryRoadmapDuration,
  getDictionaryFreeScheme,
  getDictionaryCertification,
  getDictionarySkill,
  getDictionaryOpportunityTitle
} from '@/lib/contentDictionary';
import { GovtScheme } from '@/types/skillbridge';
`;
  content = importStatement + content;
}

// 2. Replace getLocalizedDuration
const durationRegex = /export function getLocalizedDuration\(duration: string, lang: SupportedLanguage = 'en'\): string \{[\s\S]*?\n\}/;
const newGetLocalizedDuration = `export function getLocalizedDuration(duration: string, lang: SupportedLanguage = 'en'): string {
  if (!duration) return '';
  if (lang === 'en') return duration;
  const dictMatch = getDictionaryRoadmapDuration(duration, lang);
  if (dictMatch && dictMatch !== duration) return dictMatch;
  if (DURATIONS_LOCALIZED[duration]?.[lang]) return DURATIONS_LOCALIZED[duration][lang];
  return duration;
}`;
content = content.replace(durationRegex, newGetLocalizedDuration);

// 3. Replace getLocalizedSkill
const skillRegex = /export function getLocalizedSkill\(skill: string, lang: SupportedLanguage = 'en'\): string \{[\s\S]*?\n\}/;
const newGetLocalizedSkill = `export function getLocalizedSkill(skill: string, lang: SupportedLanguage = 'en'): string {
  if (!skill) return '';
  if (lang === 'en') return skill;
  const dictMatch = getDictionarySkill(skill, lang);
  if (dictMatch && dictMatch !== skill) return dictMatch;
  if (SKILLS_LOCALIZED[skill]?.[lang]) return SKILLS_LOCALIZED[skill][lang];
  return skill;
}`;
content = content.replace(skillRegex, newGetLocalizedSkill);

// 4. Replace getLocalizedOpportunityTitle
const oppTitleRegex = /export function getLocalizedOpportunityTitle\(title: string, lang: SupportedLanguage = 'en'\): string \{[\s\S]*?\n\}/;
const newGetLocalizedOpportunityTitle = `export function getLocalizedOpportunityTitle(title: string, lang: SupportedLanguage = 'en'): string {
  if (!title) return '';
  if (lang === 'en') return title;
  const dictMatch = getDictionaryOpportunityTitle(title, lang);
  if (dictMatch && dictMatch !== title) return dictMatch;
  const match = JOBS_LOCALIZED[title] || POPULAR_GOAL_TITLES[title];
  if (match) return match[lang] || match['ta'] || match['hi'] || title;
  return title;
}`;
content = content.replace(oppTitleRegex, newGetLocalizedOpportunityTitle);

// 5. Replace getLocalizedCertification
const certRegex = /export function getLocalizedCertification\(cert: string, lang: SupportedLanguage = 'en'\): string \{[\s\S]*?\n\}/;
const newGetLocalizedCertification = `export function getLocalizedCertification(cert: string, lang: SupportedLanguage = 'en'): string {
  if (!cert) return '';
  if (lang === 'en') return cert;
  const dictMatch = getDictionaryCertification(cert, lang);
  if (dictMatch && dictMatch !== cert) return dictMatch;
  return cert;
}`;
content = content.replace(certRegex, newGetLocalizedCertification);

// 6. Replace getLocalizedRoadmapStep
const roadmapStepStart = content.indexOf('export function getLocalizedRoadmapStep(');
const roadmapStepEnd = content.indexOf('export function getLocalizedTraining(', roadmapStepStart);

if (roadmapStepStart !== -1 && roadmapStepEnd !== -1) {
  const newGetLocalizedRoadmapStep = `export function getLocalizedRoadmapStep(stepOrProperty: any, lang: SupportedLanguage = 'en'): any {
  if (stepOrProperty === null || stepOrProperty === undefined) return '';

  // Case 1: String input (title, badge, duration, etc.)
  if (typeof stepOrProperty === 'string') {
    const str = stepOrProperty.trim();
    if (lang === 'en') return str;

    // Check titles in dictionary
    const dictTitle = getDictionaryRoadmapTitle(str, lang);
    if (dictTitle && dictTitle !== str) return dictTitle;

    // Check descriptions in dictionary
    const dictDesc = getDictionaryRoadmapDescription(str, lang);
    if (dictDesc && dictDesc !== str) return dictDesc;

    // Check badges & training types
    const dictBadge = getDictionaryRoadmapBadge(str, lang);
    if (dictBadge && dictBadge !== str) return dictBadge;
    if (TRAINING_TYPES_LOCALIZED[str]?.[lang]) return TRAINING_TYPES_LOCALIZED[str][lang];

    // Check durations
    const dictDuration = getDictionaryRoadmapDuration(str, lang);
    if (dictDuration && dictDuration !== str) return dictDuration;
    if (DURATIONS_LOCALIZED[str]?.[lang]) return DURATIONS_LOCALIZED[str][lang];

    // Check free schemes in dictionary
    const dictScheme = getDictionaryFreeScheme(str, lang);
    if (dictScheme && dictScheme !== str) return dictScheme;

    // Check certifications in dictionary
    const dictCert = getDictionaryCertification(str, lang);
    if (dictCert && dictCert !== str) return dictCert;

    // Check skills
    const dictSkill = getDictionarySkill(str, lang);
    if (dictSkill && dictSkill !== str) return dictSkill;

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
    const localizedBadge = getDictionaryRoadmapBadge(badgeStr, lang) || TRAINING_TYPES_LOCALIZED[badgeStr]?.[lang] || badgeStr;
    const localizedDuration = getDictionaryRoadmapDuration(step.duration, lang) || DURATIONS_LOCALIZED[step.duration]?.[lang] || (typeof step.duration === 'string' ? step.duration : '');

    let localizedTitle = typeof step.title === 'string' ? (getDictionaryRoadmapTitle(step.title, lang) || step.title) : '';
    let localizedDescription = typeof step.description === 'string' ? (getDictionaryRoadmapDescription(step.description, lang) || step.description) : '';

    // If it is a generic generated step (stepNumber 1-5 without dictionary match)
    if (localizedTitle === step.title && step.stepNumber) {
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
          case 'as': localizedDescription = 'প্ৰাথমিক যোগ্যতা আৰু দক্ষতা পৰীক্ষা'; break;
          case 'ur': localizedDescription = 'بنیادی اہلیت اور مہارتوں کی تصدیق'; break;
          default: localizedDescription = 'அடிப்படை தகுதி மற்றும் திறன்களை சரிபார்த்தல்'; break;
        }
      } else if (step.stepNumber === 2) {
        localizedTitle = getUIText('stepSkillGap', lang);
        switch (lang) {
          case 'ta': localizedDescription = 'அடிப்படை திறன் மதிப்பீடு மற்றும் இடைவெளி ஆய்வு'; break;
          case 'hi': localizedDescription = 'कौशल मूल्यांकन और अंतर विश्लेषण'; break;
          case 'te': localizedDescription = 'నైపుణ్యాల మూల్యాంకనం మరియు అంతర విశ్లేషణ'; break;
          case 'kn': localizedDescription = 'ಕೌಶಲ್ಯ ಮೌಲ್ಯಮಾಪನ ಮತ್ತು ಅಂತರ ವಿಶ್ಲೇಷಣೆ'; break;
          case 'ml': localizedDescription = 'നൈപുണ്യ വിലയിരുത്തലും വിടവ് വിശകലനവും'; break;
          case 'bn': localizedDescription = 'দক্ষতা মূল্যায়ন এবং ঘাটতি বিশ্লেষণ'; break;
          case 'mr': localizedDescription = 'कौशल्य मूल्यांकन आणि अंतर विश्लेषण'; break;
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
    }

    const rawSkills = Array.isArray(step.skills) ? step.skills : [];
    const localizedSkills = rawSkills.map((s: string) => getLocalizedSkill(s, lang));

    return {
      ...step,
      title: localizedTitle,
      description: localizedDescription,
      badge: localizedBadge,
      duration: localizedDuration,
      skills: localizedSkills,
      freeGovtScheme: step.freeGovtScheme ? getDictionaryFreeScheme(step.freeGovtScheme, lang) : undefined,
      certification: step.certification ? getDictionaryCertification(step.certification, lang) : undefined
    };
  }

  return String(stepOrProperty);
}
`;
  content = content.slice(0, roadmapStepStart) + newGetLocalizedRoadmapStep + '\n' + content.slice(roadmapStepEnd);
}

// 7. Add Scheme localization functions at the very end
const schemeResolvers = `
/**
 * Localization resolvers for Government Schemes
 */
export function getLocalizedSchemeName(scheme: GovtScheme | string, lang: SupportedLanguage = 'en'): string {
  if (!scheme) return '';
  const id = typeof scheme === 'string' ? scheme : scheme.id;
  const name = typeof scheme === 'string' ? scheme : scheme.name;
  if (lang === 'en') return name;

  const content = SCHEMES_CONTENT_LOCALIZED[id];
  if (content?.name?.[lang]) return content.name[lang];

  for (const item of Object.values(SCHEMES_CONTENT_LOCALIZED)) {
    if (item.name.en === name && item.name[lang]) {
      return item.name[lang];
    }
  }
  return name;
}

export function getLocalizedSchemeMinistry(scheme: GovtScheme | string, lang: SupportedLanguage = 'en'): string {
  if (!scheme) return '';
  const id = typeof scheme === 'string' ? scheme : scheme.id;
  const ministry = typeof scheme === 'string' ? scheme : scheme.ministry;
  if (lang === 'en') return ministry;

  const content = SCHEMES_CONTENT_LOCALIZED[id];
  if (content?.ministry?.[lang]) return content.ministry[lang];

  for (const item of Object.values(SCHEMES_CONTENT_LOCALIZED)) {
    if (item.ministry.en === ministry && item.ministry[lang]) {
      return item.ministry[lang];
    }
  }
  return ministry;
}

export function getLocalizedSchemeBenefit(scheme: GovtScheme | string, lang: SupportedLanguage = 'en'): string {
  if (!scheme) return '';
  const id = typeof scheme === 'string' ? scheme : scheme.id;
  const benefit = typeof scheme === 'string' ? scheme : scheme.primaryBenefit;
  if (lang === 'en') return benefit;

  const content = SCHEMES_CONTENT_LOCALIZED[id];
  if (content?.primaryBenefit?.[lang]) return content.primaryBenefit[lang];

  for (const item of Object.values(SCHEMES_CONTENT_LOCALIZED)) {
    if (item.primaryBenefit.en === benefit && item.primaryBenefit[lang]) {
      return item.primaryBenefit[lang];
    }
  }
  return benefit;
}

export function getLocalizedSchemeSubsidy(scheme: GovtScheme | string, lang: SupportedLanguage = 'en'): string {
  if (!scheme) return '';
  const id = typeof scheme === 'string' ? scheme : scheme.id;
  const subsidy = typeof scheme === 'string' ? scheme : (scheme.specialSubsidyForCommunity || '');
  if (lang === 'en') return subsidy;

  const content = SCHEMES_CONTENT_LOCALIZED[id];
  if (content?.specialSubsidyForCommunity?.[lang]) return content.specialSubsidyForCommunity[lang];

  for (const item of Object.values(SCHEMES_CONTENT_LOCALIZED)) {
    if (item.specialSubsidyForCommunity?.en === subsidy && item.specialSubsidyForCommunity[lang]) {
      return item.specialSubsidyForCommunity[lang];
    }
  }
  return subsidy;
}

export function getLocalizedSchemeDescription(scheme: GovtScheme | string, lang: SupportedLanguage = 'en'): string {
  if (!scheme) return '';
  const id = typeof scheme === 'string' ? scheme : scheme.id;
  const desc = typeof scheme === 'string' ? scheme : scheme.description;
  if (lang === 'en') return desc;

  const content = SCHEMES_CONTENT_LOCALIZED[id];
  if (content?.description?.[lang]) return content.description[lang];

  for (const item of Object.values(SCHEMES_CONTENT_LOCALIZED)) {
    if (item.description.en === desc && item.description[lang]) {
      return item.description[lang];
    }
  }
  return desc;
}

export function getLocalizedSchemeBadge(scheme: GovtScheme | string, lang: SupportedLanguage = 'en'): string {
  if (!scheme) return '';
  const id = typeof scheme === 'string' ? scheme : scheme.id;
  const badge = typeof scheme === 'string' ? scheme : scheme.badge;
  if (lang === 'en') return badge;

  const content = SCHEMES_CONTENT_LOCALIZED[id];
  if (content?.badge?.[lang]) return content.badge[lang];

  for (const item of Object.values(SCHEMES_CONTENT_LOCALIZED)) {
    if (item.badge.en === badge && item.badge[lang]) {
      return item.badge[lang];
    }
  }
  return badge;
}

export function getLocalizedSchemeCategory(category: string, lang: SupportedLanguage = 'en'): string {
  if (!category) return '';
  if (lang === 'en') return category;
  for (const item of Object.values(SCHEMES_CONTENT_LOCALIZED)) {
    if (item.category.en === category && item.category[lang]) {
      return item.category[lang];
    }
  }
  return category;
}
`;

if (!content.includes('export function getLocalizedSchemeName')) {
  content += '\n' + schemeResolvers;
}

fs.writeFileSync('lib/translations.ts', content, 'utf8');
console.log('Successfully patched lib/translations.ts!');
