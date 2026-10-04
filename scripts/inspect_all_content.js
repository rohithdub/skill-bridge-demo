const fs = require('fs');

// We can read roadmapData.ts, schemesData.ts, opportunityData.ts
const roadmapContent = fs.readFileSync('lib/roadmapData.ts', 'utf8');
const schemesContent = fs.readFileSync('lib/schemesData.ts', 'utf8');
const oppContent = fs.readFileSync('lib/opportunityData.ts', 'utf8');

console.log('Roadmap length:', roadmapContent.length);
console.log('Schemes length:', schemesContent.length);
console.log('Opportunities length:', oppContent.length);

// Extract all titles, badges, durations, schemes from roadmapData
const titles = [...roadmapContent.matchAll(/title:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const badges = [...roadmapContent.matchAll(/badge:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const durations = [...roadmapContent.matchAll(/duration:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const freeSchemes = [...roadmapContent.matchAll(/freeGovtScheme:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const certifications = [...roadmapContent.matchAll(/certification:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);

console.log('\n--- ROADMAP DATA ---');
console.log('Unique Titles count:', new Set(titles).size);
console.log('Titles:', [...new Set(titles)]);
console.log('\nUnique Badges count:', new Set(badges).size);
console.log('Badges:', [...new Set(badges)]);
console.log('\nUnique Durations count:', new Set(durations).size);
console.log('Durations:', [...new Set(durations)]);
console.log('\nUnique Free Schemes count:', new Set(freeSchemes).size);
console.log('Free Schemes:', [...new Set(freeSchemes)]);
console.log('\nUnique Certifications count:', new Set(certifications).size);
console.log('Certifications:', [...new Set(certifications)]);
