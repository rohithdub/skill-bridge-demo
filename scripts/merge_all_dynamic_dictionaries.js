/**
 * scripts/merge_all_dynamic_dictionaries.js
 * Merges all missing dynamic dictionaries into lib/contentDictionary.ts and updates lib/translations.ts.
 */

const fs = require('fs');

console.log('Merging all dynamic dictionaries into contentDictionary.ts...');

const genMissing = JSON.parse(fs.readFileSync('scripts/generated_missing_dynamic_dictionary.json', 'utf8'));
const part6 = fs.readFileSync('scripts/temp_content_p6.txt', 'utf8');

// Load current contentDictionary.ts
let dictContent = fs.readFileSync('lib/contentDictionary.ts', 'utf8');

// 1. Add extra skills from genMissing.skills
let extraSkillsEntries = '';
for (const [key, map] of Object.entries(genMissing.skills)) {
  if (!dictContent.includes(JSON.stringify(key) + ':')) {
    extraSkillsEntries += `\n  ${JSON.stringify(key)}: ${JSON.stringify(map, null, 2).replace(/\n/g, '\n  ')},`;
  }
}

// 2. Add extra certs from genMissing.certs
let extraCertsEntries = '';
for (const [key, map] of Object.entries(genMissing.certs)) {
  if (!dictContent.includes(JSON.stringify(key) + ':')) {
    extraCertsEntries += `\n  ${JSON.stringify(key)}: ${JSON.stringify(map, null, 2).replace(/\n/g, '\n  ')},`;
  }
}

// 3. Add extra titles from genMissing.titles
let extraTitlesEntries = '';
for (const [key, map] of Object.entries(genMissing.titles)) {
  if (!dictContent.includes(JSON.stringify(key) + ':')) {
    extraTitlesEntries += `\n  ${JSON.stringify(key)}: ${JSON.stringify(map, null, 2).replace(/\n/g, '\n  ')},`;
  }
}

// Insert extra skills into SKILLS_FULL_DICTIONARY
if (extraSkillsEntries) {
  const marker = 'export const SKILLS_FULL_DICTIONARY: Record<string, Record<SupportedLanguage, string>> = {';
  dictContent = dictContent.replace(marker, marker + extraSkillsEntries);
}

// Insert extra certs into ROADMAP_CERTIFICATIONS_LOCALIZED
if (extraCertsEntries) {
  const marker = 'export const ROADMAP_CERTIFICATIONS_LOCALIZED: Record<string, Record<SupportedLanguage, string>> = {';
  dictContent = dictContent.replace(marker, marker + extraCertsEntries);
}

// Insert extra titles into OPPORTUNITIES_TITLES_LOCALIZED
if (extraTitlesEntries) {
  const marker = 'export const OPPORTUNITIES_TITLES_LOCALIZED: Record<string, Record<SupportedLanguage, string>> = {';
  dictContent = dictContent.replace(marker, marker + extraTitlesEntries);
}

// Append part6 (TASKS_FULL_DICTIONARY and PREREQUISITES_FULL_DICTIONARY) if not present
if (!dictContent.includes('export const TASKS_FULL_DICTIONARY')) {
  dictContent += '\n\n' + part6;
}

// Add resolvers for tasks and prerequisites
const newResolvers = `
/**
 * Safe resolver for practical tasks
 */
export function getDictionaryTask(task: string, lang: SupportedLanguage): string {
  if (!task) return '';
  const trimmed = task.trim();
  if (TASKS_FULL_DICTIONARY[trimmed]?.[lang]) {
    return TASKS_FULL_DICTIONARY[trimmed][lang];
  }
  const lower = trimmed.toLowerCase();
  for (const [key, map] of Object.entries(TASKS_FULL_DICTIONARY)) {
    if (key.toLowerCase() === lower && map[lang]) {
      return map[lang];
    }
  }
  return task;
}

/**
 * Safe resolver for prerequisites
 */
export function getDictionaryPrerequisite(prereq: string, lang: SupportedLanguage): string {
  if (!prereq) return '';
  const trimmed = prereq.trim();
  if (PREREQUISITES_FULL_DICTIONARY[trimmed]?.[lang]) {
    return PREREQUISITES_FULL_DICTIONARY[trimmed][lang];
  }
  const lower = trimmed.toLowerCase();
  for (const [key, map] of Object.entries(PREREQUISITES_FULL_DICTIONARY)) {
    if (key.toLowerCase() === lower && map[lang]) {
      return map[lang];
    }
  }
  return prereq;
}
`;

if (!dictContent.includes('export function getDictionaryTask')) {
  dictContent += '\n\n' + newResolvers;
}

fs.writeFileSync('lib/contentDictionary.ts', dictContent, 'utf8');
console.log('Successfully updated lib/contentDictionary.ts!');

// Now update lib/translations.ts
let transContent = fs.readFileSync('lib/translations.ts', 'utf8');

// Ensure getDictionaryTask and getDictionaryPrerequisite are imported
if (!transContent.includes('getDictionaryTask')) {
  transContent = transContent.replace(
    'getDictionaryOpportunityTitle',
    'getDictionaryOpportunityTitle,\n  TASKS_FULL_DICTIONARY,\n  PREREQUISITES_FULL_DICTIONARY,\n  getDictionaryTask,\n  getDictionaryPrerequisite'
  );
}

// Update getLocalizedTask in lib/translations.ts
const oldTaskFuncRegex = /export function getLocalizedTask\(task: string, lang: SupportedLanguage = 'en'\): string \{[\s\S]*?\n\}/;
const newTaskFunc = `export function getLocalizedTask(task: string, lang: SupportedLanguage = 'en'): string {
  if (!task) return '';
  if (lang === 'en') return task;
  const dictMatch = getDictionaryTask(task, lang);
  if (dictMatch && dictMatch !== task) return dictMatch;
  if (TASKS_LOCALIZED[task]?.[lang]) return TASKS_LOCALIZED[task][lang];
  const lower = task.trim().toLowerCase();
  for (const [key, map] of Object.entries(TASKS_LOCALIZED)) {
    if (key.toLowerCase() === lower && map[lang]) return map[lang];
  }
  return task;
}`;

if (oldTaskFuncRegex.test(transContent)) {
  transContent = transContent.replace(oldTaskFuncRegex, newTaskFunc);
}

// Update getLocalizedCertification in lib/translations.ts to also check free schemes and certs dictionary
const oldCertFuncRegex = /export function getLocalizedCertification\(cert: string, lang: SupportedLanguage = 'en'\): string \{[\s\S]*?\n\}/;
const newCertFunc = `export function getLocalizedCertification(cert: string, lang: SupportedLanguage = 'en'): string {
  if (!cert) return '';
  if (lang === 'en') return cert;
  const dictMatch = getDictionaryCertification(cert, lang);
  if (dictMatch && dictMatch !== cert) return dictMatch;
  const schemeMatch = getDictionaryFreeScheme(cert, lang);
  if (schemeMatch && schemeMatch !== cert) return schemeMatch;
  if (CERTIFICATIONS_LOCALIZED[cert]?.[lang]) return CERTIFICATIONS_LOCALIZED[cert][lang];
  const lower = cert.trim().toLowerCase();
  for (const [key, map] of Object.entries(ROADMAP_CERTIFICATIONS_LOCALIZED)) {
    if (key.toLowerCase() === lower && map[lang]) return map[lang];
  }
  for (const [key, map] of Object.entries(ROADMAP_FREE_SCHEMES_LOCALIZED)) {
    if (key.toLowerCase() === lower && map[lang]) return map[lang];
  }
  for (const [key, map] of Object.entries(CERTIFICATIONS_LOCALIZED)) {
    if (key.toLowerCase() === lower && map[lang]) return map[lang];
  }
  return cert;
}`;

if (oldCertFuncRegex.test(transContent)) {
  transContent = transContent.replace(oldCertFuncRegex, newCertFunc);
}

// Add export function getLocalizedPrerequisite
if (!transContent.includes('export function getLocalizedPrerequisite')) {
  const prereqFunc = `
export function getLocalizedPrerequisite(prereq: string, lang: SupportedLanguage = 'en'): string {
  if (!prereq) return '';
  if (lang === 'en') return prereq;
  const dictMatch = getDictionaryPrerequisite(prereq, lang);
  if (dictMatch && dictMatch !== prereq) return dictMatch;
  return getLocalizedSkill(prereq, lang);
}
`;
  transContent += '\n' + prereqFunc;
}

fs.writeFileSync('lib/translations.ts', transContent, 'utf8');
console.log('Successfully updated lib/translations.ts!');
