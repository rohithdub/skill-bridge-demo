const fs = require('fs');
const s = fs.readFileSync('lib/schemesData.ts', 'utf8');

const docs = new Set();
const benefits = new Set();

const docRegex = /documentsRequired:\s*\[([\s\S]*?)\]/g;
let m;
while ((m = docRegex.exec(s)) !== null) {
  const lines = m[1].split(',');
  lines.forEach(l => {
    const clean = l.trim().replace(/^['"]|['"]$/g, '').trim();
    if (clean) docs.add(clean);
  });
}

const bRegex = /benefitsList:\s*\[([\s\S]*?)\]/g;
while ((m = bRegex.exec(s)) !== null) {
  const lines = m[1].split(',');
  lines.forEach(l => {
    const clean = l.trim().replace(/^['"]|['"]$/g, '').trim();
    if (clean) benefits.add(clean);
  });
}

console.log('Unique documents count:', docs.size, [...docs]);
console.log('Unique benefits count:', benefits.size);
fs.writeFileSync('scripts/scheme_arrays.json', JSON.stringify({ docs: [...docs], benefits: [...benefits] }, null, 2), 'utf8');
