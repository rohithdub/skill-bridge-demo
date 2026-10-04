const fs = require('fs');
const s = fs.readFileSync('scripts/build_complete_content_dictionary.js', 'utf8');
const lines = s.split('\n');
const found = [];
for (let line of lines) {
  const m = line.match(/^\s*"([a-z0-9-]+)":\s*\{/);
  if (m) found.push(m[1]);
}
console.log('Schemes found in builder:', found);
