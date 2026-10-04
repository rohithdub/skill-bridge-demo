const fs = require('fs');

const content = fs.readFileSync('lib/translations.ts', 'utf8');
const existingKeys = JSON.parse(fs.readFileSync('scripts/existing_keys.json', 'utf8'));

// Extract COMMON_UI_TEXT section
const startIdx = content.indexOf('export const COMMON_UI_TEXT:');
const endIdx = content.indexOf('export function getLocalizedQuestion(');
const commonSection = content.substring(startIdx, endIdx);

const definedKeys = new Set();
const keyRegex = /"([^"]+)":\s*\{\s*"en":/g;
let match;
while ((match = keyRegex.exec(commonSection)) !== null) {
  definedKeys.add(match[1]);
}

console.log('Defined keys in COMMON_UI_TEXT:', definedKeys.size);

const missing = existingKeys.filter(k => !definedKeys.has(k));
console.log('Missing existingKeys count:', missing.length);
console.log('Missing existingKeys:', missing);

const specificKeys = [
  'Software Developer', 'Electrician', 'Fashion Entrepreneur', 'Logistics Coordinator',
  'Full-Time Wage', 'WHY MATCHED', 'PRIMARYBENEFITTITLE', 'exclusiveForSC', 'matchScoreLabel',
  'statusPrefix', 'incomeLimitLabel', 'agePrefix', 'oppIntelligenceBadge', 'main_app',
  'primaryBenefitTitle', 'whyMatchedTitle'
];
specificKeys.forEach(k => {
  console.log(k, '=> defined in COMMON_UI_TEXT?', definedKeys.has(k), '| present in whole file?', content.includes(k));
});
