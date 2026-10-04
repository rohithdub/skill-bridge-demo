/**
 * scripts/assemble_content_dictionary.js
 * Combines p1, p2, p3, p4, p5 into lib/contentDictionary.ts
 */

const fs = require('fs');

console.log('Assembling lib/contentDictionary.ts...');

const p1 = fs.readFileSync('scripts/temp_content_p1.txt', 'utf8');
const p2 = fs.readFileSync('scripts/temp_content_p2.txt', 'utf8');
const p3 = fs.readFileSync('scripts/temp_content_p3.txt', 'utf8');
const p4 = fs.readFileSync('scripts/temp_content_p4.txt', 'utf8');
const p5 = fs.readFileSync('scripts/temp_content_p5.txt', 'utf8');

// p1 has import { SupportedLanguage } from '@/types/skillbridge';
// p4 also has import and interface
// We clean up duplicate imports

const cleanP4 = p4.replace("import { SupportedLanguage } from '@/types/skillbridge';", "");

const helperMethods = `
/**
 * Safe resolver for roadmap step title
 */
export function getDictionaryRoadmapTitle(title: string, lang: SupportedLanguage): string {
  if (!title) return '';
  const trimmed = title.trim();
  if (ROADMAP_TITLES_LOCALIZED[trimmed]?.[lang]) {
    return ROADMAP_TITLES_LOCALIZED[trimmed][lang];
  }
  return title;
}

/**
 * Safe resolver for roadmap step description
 */
export function getDictionaryRoadmapDescription(desc: string, lang: SupportedLanguage): string {
  if (!desc) return '';
  const trimmed = desc.trim();
  if (ROADMAP_DESCRIPTIONS_LOCALIZED[trimmed]?.[lang]) {
    return ROADMAP_DESCRIPTIONS_LOCALIZED[trimmed][lang];
  }
  return desc;
}

/**
 * Safe resolver for roadmap badge / level
 */
export function getDictionaryRoadmapBadge(badge: string, lang: SupportedLanguage): string {
  if (!badge) return '';
  const trimmed = badge.trim();
  if (ROADMAP_BADGES_LOCALIZED[trimmed]?.[lang]) {
    return ROADMAP_BADGES_LOCALIZED[trimmed][lang];
  }
  return badge;
}

/**
 * Safe resolver for duration (e.g. 3 weeks, 4 weeks)
 */
export function getDictionaryRoadmapDuration(duration: string, lang: SupportedLanguage): string {
  if (!duration) return '';
  const trimmed = duration.trim();
  if (ROADMAP_DURATIONS_LOCALIZED[trimmed]?.[lang]) {
    return ROADMAP_DURATIONS_LOCALIZED[trimmed][lang];
  }
  return duration;
}

/**
 * Safe resolver for free schemes in roadmap
 */
export function getDictionaryFreeScheme(name: string, lang: SupportedLanguage): string {
  if (!name) return '';
  const trimmed = name.trim();
  if (ROADMAP_FREE_SCHEMES_LOCALIZED[trimmed]?.[lang]) {
    return ROADMAP_FREE_SCHEMES_LOCALIZED[trimmed][lang];
  }
  return name;
}

/**
 * Safe resolver for certifications in roadmap
 */
export function getDictionaryCertification(cert: string, lang: SupportedLanguage): string {
  if (!cert) return '';
  const trimmed = cert.trim();
  if (ROADMAP_CERTIFICATIONS_LOCALIZED[trimmed]?.[lang]) {
    return ROADMAP_CERTIFICATIONS_LOCALIZED[trimmed][lang];
  }
  return cert;
}

/**
 * Safe resolver for skills (e.g. GPS, dispatch software, etc.)
 */
export function getDictionarySkill(skill: string, lang: SupportedLanguage): string {
  if (!skill) return '';
  const trimmed = skill.trim();
  if (SKILLS_FULL_DICTIONARY[trimmed]?.[lang]) {
    return SKILLS_FULL_DICTIONARY[trimmed][lang];
  }
  // Try case-insensitive or partial match
  const lower = trimmed.toLowerCase();
  for (const [key, map] of Object.entries(SKILLS_FULL_DICTIONARY)) {
    if (key.toLowerCase() === lower && map[lang]) {
      return map[lang];
    }
  }
  return skill;
}

/**
 * Safe resolver for opportunity & training module titles
 */
export function getDictionaryOpportunityTitle(title: string, lang: SupportedLanguage): string {
  if (!title) return '';
  const trimmed = title.trim();
  if (OPPORTUNITIES_TITLES_LOCALIZED[trimmed]?.[lang]) {
    return OPPORTUNITIES_TITLES_LOCALIZED[trimmed][lang];
  }
  return title;
}
`;

const finalFileContent = [
  p1,
  p2,
  p3,
  cleanP4,
  p5,
  helperMethods
].join('\n\n');

fs.writeFileSync('lib/contentDictionary.ts', finalFileContent, 'utf8');
console.log('Successfully wrote lib/contentDictionary.ts!');
