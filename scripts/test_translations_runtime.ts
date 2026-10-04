import {
  getLocalizedRoadmapStep,
  getLocalizedDuration,
  getLocalizedSkill,
  getLocalizedCertification,
  getLocalizedSchemeName,
  getLocalizedSchemeMinistry,
  getLocalizedSchemeBenefit,
  getLocalizedSchemeSubsidy,
  getLocalizedSchemeCategory,
  getLocalizedOpportunityTitle,
  getUIText
} from '../lib/translations';
import { GOVERNMENT_SCHEMES_DATA } from '../lib/schemesData';
import { SupportedLanguage } from '../types/skillbridge';

const ALL_LANGUAGES: SupportedLanguage[] = [
  'en', 'hi', 'ta', 'te', 'kn', 'ml', 'bn', 'mr', 'gu', 'pa', 'or', 'as', 'ur'
];

console.log('====================================================');
console.log('VERIFYING ODIA (or) LOCALIZATION OF EXACT USER STRINGS');
console.log('====================================================');

const testCasesRoadmap = [
  'Supply Chain Operations & Road Transport Rules',
  'Fleet Telematics & Route Optimization Software',
  'Warehouse Inward/Outward & Inventory Management',
  'Foundation',
  'Core Skill',
  '3 weeks',
  '4 weeks',
  'Skill India Digital Logistics Module',
  'LSC Certified Logistics Operations Coordinator'
];

for (const tc of testCasesRoadmap) {
  const loc = getLocalizedRoadmapStep(tc, 'or');
  const isEnglish = (loc === tc && !tc.startsWith('Skill India'));
  console.log(`[Roadmap OR] "${tc}" => "${loc}" (Changed: ${loc !== tc})`);
  if (loc === tc) {
    console.error(`FAIL: Roadmap string "${tc}" remained unchanged English in Odia!`);
  }
}

console.log('\n====================================================');
console.log('VERIFYING ODIA (or) LOCALIZATION OF ROADMAP SKILLS');
console.log('====================================================');

const testSkills = [
  'GPS',
  'dispatch software',
  'fuel monitoring sensors',
  'geofencing',
  'driver behavior telemetry',
  'barcode scanning',
  'forklift coordination',
  'Solar PV Cell Physics',
  'Inverter Sizing',
  'Earthing & Lightning Arrestors'
];

for (const sk of testSkills) {
  const loc = getLocalizedSkill(sk, 'or');
  console.log(`[Skill OR] "${sk}" => "${loc}" (Changed: ${loc !== sk})`);
  if (loc === sk && sk !== 'GPS') {
    console.error(`FAIL: Skill "${sk}" remained unchanged English in Odia!`);
  }
}

console.log('\n====================================================');
console.log('VERIFYING ODIA (or) LOCALIZATION OF GOVERNMENT SCHEMES');
console.log('====================================================');

const pmV = GOVERNMENT_SCHEMES_DATA.find(s => s.id === 'pm-vishwakarma')!;
const pmSurya = GOVERNMENT_SCHEMES_DATA.find(s => s.id === 'pm-surya-ghar-skilling')!;
const pmkvy = GOVERNMENT_SCHEMES_DATA.find(s => s.id === 'pmkvy-4-scheme')!;

console.log('[Scheme Name OR]:', getLocalizedSchemeName(pmV, 'or'));
console.log('[Scheme Ministry OR]:', getLocalizedSchemeMinistry(pmV, 'or'));
console.log('[Scheme Benefit OR]:', getLocalizedSchemeBenefit(pmV, 'or'));
console.log('[Scheme Subsidy OR]:', getLocalizedSchemeSubsidy(pmV, 'or'));
console.log('[Scheme Badge OR]:', getLocalizedRoadmapStep(pmV.badge, 'or'));

console.log('[PMKVY Name OR]:', getLocalizedSchemeName(pmkvy, 'or'));
console.log('[PMKVY Ministry OR]:', getLocalizedSchemeMinistry(pmkvy, 'or'));
console.log('[PMKVY Benefit OR]:', getLocalizedSchemeBenefit(pmkvy, 'or'));

console.log('\n====================================================');
console.log('VERIFYING ALL 15 SCHEMES ACROSS ALL 13 LANGUAGES');
console.log('====================================================');

let totalChecks = 0;
let failedChecks = 0;

for (const lang of ALL_LANGUAGES) {
  if (lang === 'en') continue;
  for (const s of GOVERNMENT_SCHEMES_DATA) {
    const name = getLocalizedSchemeName(s, lang);
    const min = getLocalizedSchemeMinistry(s, lang);
    const ben = getLocalizedSchemeBenefit(s, lang);
    totalChecks += 3;
    if (name === s.name) {
      console.error(`[${lang}] Scheme name not localized: ${s.id}`);
      failedChecks++;
    }
    if (min === s.ministry) {
      console.error(`[${lang}] Scheme ministry not localized: ${s.id}`);
      failedChecks++;
    }
    if (ben === s.primaryBenefit) {
      console.error(`[${lang}] Scheme benefit not localized: ${s.id}`);
      failedChecks++;
    }
  }
}

console.log(`Schemes checks completed: ${totalChecks} total, ${failedChecks} failures.`);
