const fs = require('fs');

const content = fs.readFileSync('./lib/translations.ts', 'utf8');

const startIndex = content.indexOf('export const COMMON_UI_TEXT:');
const endIndex = content.indexOf('export function getUIText');
const commonTextSection = content.slice(startIndex, endIndex);

const keyMatches = [...commonTextSection.matchAll(/\"([a-zA-Z0-9_-]+)\":\s*\{/g)].map(m => m[1]);

console.log(JSON.stringify(keyMatches.sort(), null, 2));
