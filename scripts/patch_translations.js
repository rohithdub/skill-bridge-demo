const fs = require('fs');
const path = require('path');

const targetFilePath = path.join(__dirname, '..', 'lib', 'translations.ts');
let originalContent = fs.readFileSync(targetFilePath, 'utf8');

// 1. Fix getUIText to NEVER fall back to English if lang !== 'en'
const fixedGetUIText = `export function getUIText(key: string, lang: SupportedLanguage = 'en'): string {
  const item = COMMON_UI_TEXT[key];
  if (!item) return key;
  if (lang === 'en') {
    return item['en'] || key;
  }
  // Strict non-English rule: Return the selected language translation without English fallback
  return item[lang] || item['ta'] || item['hi'] || key;
}`;

originalContent = originalContent.replace(
  /export function getUIText\(key: string, lang: SupportedLanguage = 'en'\): string \{[\s\S]*?\n\}/,
  fixedGetUIText
);

console.log('getUIText updated to enforce no English fallback');
fs.writeFileSync(targetFilePath, originalContent, 'utf8');
