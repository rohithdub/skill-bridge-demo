const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '..', 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

// Known technical or brand words that can remain
const ALLOWED_LITERALS = new Set([
  'Skill Bridge',
  'Skill Bridge AI',
  'PM-AJAY',
  'SIH',
  'JanSamarth',
  'DigiLocker',
  'PFMS',
  'DBT',
  'NSQF',
  'Aadhaar',
  'OBC',
  'SC',
  'ST',
  'EWS',
  'General',
  'WhatsApp',
  'IVR',
  'SMS',
  '⚡',
  '✂️',
  '✓',
  '✕',
  '•'
]);

console.log('Auditing files in components/...');
let totalAudited = 0;

for (const file of files) {
  totalAudited++;
  const fullPath = path.join(componentsDir, file);
  const content = fs.readFileSync(fullPath, 'utf8');

  // Look for JSX text: >Text< where Text contains English words
  const jsxTextMatches = [...content.matchAll(/>\s*([A-Za-z][A-Za-z0-9 ,.?!:;'-]{3,})\s*</g)];
  for (const m of jsxTextMatches) {
    const text = m[1].trim();
    if (!ALLOWED_LITERALS.has(text) && !text.startsWith('{') && !text.includes('className') && !text.startsWith('http')) {
      console.log(`[${file}] Hardcoded JSX text: "${text}"`);
    }
  }
}

console.log(`Audited ${totalAudited} component files.`);
