const fs = require('fs');
const path = require('path');

const dirs = ['components', 'app', 'context', 'lib'];
const keys = new Set();

function scan(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scan(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const matches = content.matchAll(/getUIText\(\s*['"]([^'"]+)['"]/g);
      for (const m of matches) {
        keys.add(m[1]);
      }
    }
  }
}

dirs.forEach(scan);
console.log('Total unique getUIText keys found:', keys.size);
const sorted = Array.from(keys).sort();
fs.writeFileSync('scripts/existing_keys.json', JSON.stringify(sorted, null, 2), 'utf8');
console.log('Saved to scripts/existing_keys.json');
