const { NEW_COMMON_UI_TEXT } = require('./translations_dictionary.js');
const fs = require('fs');
const content = fs.readFileSync('lib/translations.ts', 'utf8');
const existingKeys = JSON.parse(fs.readFileSync('scripts/existing_keys.json', 'utf8'));

const startIdx = content.indexOf('export const COMMON_UI_TEXT:');
const endIdx = content.indexOf('export function getLocalizedQuestion(');
const commonSection = content.substring(startIdx, endIdx);

const definedKeys = new Set(Object.keys(NEW_COMMON_UI_TEXT));
const keyRegex = /"([^"]+)":\s*\{\s*"en":/g;
let match;
while ((match = keyRegex.exec(commonSection)) !== null) {
  definedKeys.add(match[1]);
}

const stillMissing = existingKeys.filter(k => !definedKeys.has(k));
console.log('Still missing count:', stillMissing.length);
if (stillMissing.length > 0) {
  console.log('Still missing keys:', stillMissing);
} else {
  console.log('ALL existing getUIText keys are 100% COVERED!');
}
