const fs = require('fs');

let skills = JSON.parse(fs.readFileSync('scripts/real_skills.json', 'utf8'));

// Clean any combined entries
const cleaned = [];
for (let s of skills) {
  if (s.includes("Electrical Safety Gear', 'Ohm\\'s Law")) {
    cleaned.push('Electrical Safety Gear');
    cleaned.push("Ohm's Law");
  } else if (s === "Ohm\\'s Law & Single Phase / Three Phase Power") {
    cleaned.push("Ohm's Law & Single Phase / Three Phase Power");
  } else {
    cleaned.push(s.replace(/\\'/g, "'"));
  }
}

const uniqueSorted = Array.from(new Set(cleaned)).sort();
console.log('Cleaned skills count:', uniqueSorted.length);
fs.writeFileSync('scripts/real_skills.json', JSON.stringify(uniqueSorted, null, 2), 'utf8');
