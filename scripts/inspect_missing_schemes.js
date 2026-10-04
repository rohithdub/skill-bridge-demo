const fs = require('fs');
const s = fs.readFileSync('lib/schemesData.ts', 'utf8');
const missing = ['nstfdc-tribal-livelihood', 'van-dhan-st-grant', 'csis-ews-education'];
missing.forEach(id => {
  const idx = s.indexOf(`id: '${id}'`);
  if (idx !== -1) {
    console.log('=== ' + id + ' ===');
    console.log(s.slice(idx, idx + 1200));
  }
});
