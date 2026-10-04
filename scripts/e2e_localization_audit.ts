import {
  COMMON_UI_TEXT,
  getUIText,
  getLocalizedRoadmapStep,
  getLocalizedGoalTitle,
  getLocalizedJob,
  getLocalizedSkill,
  getLocalizedDuration,
  getLocalizedTask,
  getLocalizedCertification,
  getLocalizedPlacement,
  getLocalizedEnterprise,
  getLocalizedSchemeName,
  getLocalizedSchemeMinistry,
  getLocalizedSchemeBenefit,
  getLocalizedSchemeSubsidy,
  getLocalizedSchemeDescription,
  getLocalizedSchemeBadge,
  getLocalizedSchemeCategory,
  getLocalizedAccessibility,
  getLocalizedFeeStatus,
  getLocalizedSkillGapExplanation,
  getLocalizedOpportunityTitle,
  getLocalizedPrerequisite
} from '../lib/translations';

import { SupportedLanguage } from '../types/skillbridge';

import {
  GOVERNMENT_SCHEMES_DATA
} from '../lib/schemesData';

import {
  CURATED_MAPPINGS
} from '../lib/skillGapEngine';

import {
  PREDEFINED_PATHWAYS
} from '../lib/roadmapData';

const LANGS: SupportedLanguage[] = ['en', 'hi', 'ta', 'te', 'kn', 'ml', 'bn', 'mr', 'gu', 'pa', 'or', 'as', 'ur'];

const RAW_KEY_PATTERNS = [
  /PRIMARYBENEFITTITLE/i,
  /WHYMATCHEDTITLE/i,
  /matchScoreLabel/i,
  /statusPrefix/i,
  /incomeLimitLabel/i,
  /agePrefix/i,
  /exclusiveForSC/i,
  /oppIntelligenceBadge/i,
  /titleKey/i,
  /descriptionKey/i
];

console.log('====================================================');
console.log('COMPREHENSIVE RUNTIME DATA LOCALIZATION AUDIT');
console.log('====================================================\n');

let issues: string[] = [];

// 1. UI Keys Check
console.log('1. Checking COMMON_UI_TEXT across all 13 languages...');
const uiKeys = Object.keys(COMMON_UI_TEXT);
for (const lang of LANGS) {
  for (const key of uiKeys) {
    const val = (COMMON_UI_TEXT as Record<string, Record<SupportedLanguage, string>>)[key]?.[lang];
    if (!val) {
      issues.push(`Missing UI text: ${key} in ${lang}`);
    } else {
      for (const pattern of RAW_KEY_PATTERNS) {
        if (pattern.test(val)) {
          issues.push(`Raw key pattern leak in UI text: ${key} [${lang}] = ${val}`);
        }
      }
    }
  }
}
console.log(`UI text checked: ${uiKeys.length * 13} checks. Issues: ${issues.length}`);

// 2. Schemes Check
console.log('\n2. Checking all 15 Government Schemes across all 13 languages...');
let schemeCount = 0;
for (const s of GOVERNMENT_SCHEMES_DATA) {
  for (const lang of LANGS) {
    schemeCount++;
    const name = getLocalizedSchemeName(s, lang);
    const min = getLocalizedSchemeMinistry(s, lang);
    const ben = getLocalizedSchemeBenefit(s, lang);
    const sub = getLocalizedSchemeSubsidy(s, lang);

    if (!name) issues.push(`Empty scheme name: ${s.id} in ${lang}`);
    if (!min) issues.push(`Empty ministry: ${s.id} in ${lang}`);
    if (!ben) issues.push(`Empty benefit: ${s.id} in ${lang}`);

    if (lang !== 'en') {
      if (name === s.name) issues.push(`Scheme name unlocalized: ${s.id} in ${lang}`);
      if (ben === s.primaryBenefit) issues.push(`Scheme benefit unlocalized: ${s.id} in ${lang}`);
    }

    for (const text of [name, min, ben, sub]) {
      if (text) {
        for (const pattern of RAW_KEY_PATTERNS) {
          if (pattern.test(text)) issues.push(`Raw key leaked in scheme ${s.id} [${lang}]: ${text}`);
        }
      }
    }
  }
}
console.log(`Schemes checks completed: ${schemeCount}. Issues: ${issues.length}`);

// 3. User Reported Strings Check (Tamil, Odia, Assamese)
console.log('\n3. Checking Exact User-Reported Roadmap Strings...');
const userStrings = [
  { type: 'skill', text: 'Crop Lifecycle Insights & Growth Stages' },
  { type: 'skill', text: 'Soil Moisture & Weed Detection Eyesight' },
  { type: 'skill', text: 'Pesticide & Fertilizer Dilution Basics' },
  { type: 'skill', text: 'DGCA Remote Pilot Certification (RPA Class 1)' },
  { type: 'skill', text: 'Drone Flight Controller Calibration & Geo-Fencing' },
  { type: 'skill', text: 'Multispectral Crop Health Imagery Analysis' },
  { type: 'skill', text: 'Micro-Sprayer Nozzle Flow Rate Calibration' },
  { type: 'skill', text: 'e-NAM Digital Mandi Price Discovery & Bidding' },
  { type: 'task', text: 'Execute 10 autonomous grid waypoint flights over paddy/cotton fields' },
  { type: 'task', text: 'Calibrate 10-liter precision spray drone for micron-level coverage' },
  { type: 'task', text: 'Download NDVI satellite vegetation health indices' },
  { type: 'task', text: 'List farm produce lot on e-NAM digital mandi portal' },
  { type: 'cert', text: 'DGCA Certified Remote Pilot License' },
  { type: 'cert', text: 'SMAM Agri-Mechanization Certificate' },
  { type: 'cert', text: 'DGCA Certified Remote Pilot License & SMAM Agri-Mechanization Certificate' },
  { type: 'title', text: 'Supply Chain Operations & Road Transport Rules' },
  { type: 'title', text: 'Fleet Telematics & Route Optimization Software' },
  { type: 'title', text: 'Warehouse Inward/Outward & Inventory Management' },
  { type: 'badge', text: 'Foundation' },
  { type: 'badge', text: 'Core Skill' },
  { type: 'duration', text: '3 weeks' },
  { type: 'duration', text: '4 weeks' },
  { type: 'scheme', text: 'Skill India Digital Logistics Module' }
];

for (const lang of (['ta', 'or', 'as', 'hi'] as SupportedLanguage[])) {
  for (const item of userStrings) {
    let res = '';
    if (item.type === 'skill') res = getLocalizedSkill(item.text, lang);
    else if (item.type === 'task') res = getLocalizedTask(item.text, lang);
    else if (item.type === 'cert' || item.type === 'scheme') res = getLocalizedCertification(item.text, lang);
    else if (item.type === 'title') res = getLocalizedRoadmapStep(item.text, lang);
    else if (item.type === 'badge') res = getLocalizedRoadmapStep({ badge: item.text }, lang)?.badge || '';
    else if (item.type === 'duration') res = getLocalizedDuration(item.text, lang);

    if (!res || res === item.text) {
      issues.push(`User string not localized in ${lang}: "${item.text}" => "${res}"`);
    }
  }
}
console.log(`User-reported strings checked across ta, or, as, hi. Current total issues: ${issues.length}`);

// 4. Checking all CURATED_MAPPINGS across all 13 languages
console.log('\n4. Checking all 4 CURATED_MAPPINGS (Solar, Fashion, Drone, Logistics) across all 13 languages...');
for (const m of CURATED_MAPPINGS) {
  for (const lang of LANGS) {
    if (lang === 'en') continue;

    // Check transferable skills
    for (const ts of m.transferable) {
      const loc = getLocalizedSkill(ts, lang);
      if (!loc || loc === ts) issues.push(`Transferable skill not localized in ${lang}: "${ts}"`);
    }

    // Check skill gaps
    for (const gap of m.skillGaps) {
      const loc = getLocalizedSkill(gap, lang);
      if (!loc || loc === gap) issues.push(`Skill gap not localized in ${lang}: "${gap}"`);
    }

    // Check practical tasks
    for (const task of m.practicalTasks) {
      const loc = getLocalizedTask(task, lang);
      if (!loc || loc === task) issues.push(`Practical task not localized in ${lang}: "${task}"`);
    }

    // Check certification
    const locCert = getLocalizedCertification(m.certification, lang);
    if (!locCert || locCert === m.certification) issues.push(`Certification not localized in ${lang}: "${m.certification}"`);

    // Check employment options
    for (const emp of m.employmentOptions) {
      const loc = getLocalizedPlacement(emp, lang);
      if (!loc || loc === emp) issues.push(`Employment option not localized in ${lang}: "${emp}"`);
    }

    // Check enterprise options
    for (const ent of m.enterpriseOptions) {
      const loc = getLocalizedEnterprise(ent, lang);
      if (!loc || loc === ent) issues.push(`Enterprise option not localized in ${lang}: "${ent}"`);
    }
  }
}

// 5. Check Navigation Keys
console.log('\n5. Checking Navigation Keys...');
const navKeys = ['navRoadmap', 'navOpportunities', 'navSchemes', 'navProfile'];
for (const lang of LANGS) {
  for (const k of navKeys) {
    const text = getUIText(k, lang);
    if (!text || (lang !== 'en' && text === getUIText(k, 'en'))) {
      issues.push(`Navigation key not localized: ${k} in ${lang}`);
    }
  }
}

console.log('\n====================================================');
console.log(`TOTAL ISSUES ENCOUNTERED: ${issues.length}`);
if (issues.length > 0) {
  console.log('Sample issues:');
  console.log(issues.slice(0, 15).join('\n'));
} else {
  console.log('ALL VERIFICATIONS PASSED WITH ZERO ISSUES!');
}
console.log('====================================================');
