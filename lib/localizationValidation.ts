/**
 * lib/localizationValidation.ts
 * Development-time validation utility to detect:
 * - Missing translation keys
 * - Untranslated raw English strings
 * - Leaked raw translation keys
 * - Invalid React children / object leaks
 */

import { SupportedLanguage } from '@/types/skillbridge';

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

/**
 * Validates a user-facing string in development mode.
 * Logs a non-crashing warning if a raw key or untranslated leak is detected.
 */
export function validateLocalizedText(
  keyOrSource: string,
  resolvedText: string,
  lang: SupportedLanguage,
  contextTag: string = 'General'
): string {
  if (process.env.NODE_ENV === 'production') {
    return resolvedText;
  }

  if (!resolvedText || typeof resolvedText !== 'string') {
    console.warn(`[LOCALIZATION WARNING] [${contextTag}] Empty or non-string value for "${keyOrSource}" in language "${lang}"`);
    return resolvedText;
  }

  // Check for raw keys
  for (const pattern of RAW_KEY_PATTERNS) {
    if (pattern.test(resolvedText)) {
      console.warn(`[LOCALIZATION ERROR] [${contextTag}] Raw translation key leaked in language "${lang}": "${resolvedText}"`);
    }
  }

  // Check for suspicious untranslated English when a non-English language is selected
  if (lang !== 'en' && resolvedText === keyOrSource && resolvedText.length > 20) {
    // If it contains only English ASCII letters and spaces
    if (/^[A-Za-z0-9\s,–—&/():+.'"-]+$/.test(resolvedText)) {
      console.warn(
        `[LOCALIZATION NOTICE] [${contextTag}] Untranslated content in language "${lang}": "${resolvedText.slice(0, 40)}..."`
      );
    }
  }

  return resolvedText;
}

/**
 * Validates an array of strings before rendering.
 */
export function validateLocalizedArray(
  rawArray: unknown,
  resolvedArray: string[],
  lang: SupportedLanguage,
  contextTag: string = 'Array'
): string[] {
  if (process.env.NODE_ENV === 'production') {
    return resolvedArray;
  }

  if (!Array.isArray(resolvedArray)) {
    console.warn(`[LOCALIZATION ERROR] [${contextTag}] Expected array but got ${typeof resolvedArray} in language "${lang}"`);
    return [];
  }

  resolvedArray.forEach((item, idx) => {
    validateLocalizedText(`item[${idx}]`, item, lang, contextTag);
  });

  return resolvedArray;
}
