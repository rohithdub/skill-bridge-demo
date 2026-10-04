const fs = require('fs');

const schemesContent = fs.readFileSync('lib/schemesData.ts', 'utf8');

// Match all schemes
const schemeMatches = [...schemesContent.matchAll(/id:\s*['"]([^'"]+)['"][\s\S]*?name:\s*['"]([^'"]+)['"][\s\S]*?ministry:\s*['"]([^'"]+)['"][\s\S]*?category:\s*['"]([^'"]+)['"][\s\S]*?primaryBenefit:\s*['"]([^'"]+)['"][\s\S]*?specialSubsidyForCommunity:\s*['"]([^'"]+)['"]/g)];

console.log('Schemes matched with full fields:', schemeMatches.length);

const allSchemes = [];
const lines = schemesContent.split('\n');
let currentScheme = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const idMatch = line.match(/^\s*id:\s*['"]([^'"]+)['"]/);
  if (idMatch) {
    if (currentScheme) allSchemes.push(currentScheme);
    currentScheme = { id: idMatch[1] };
  }
  if (!currentScheme) continue;
  const nameMatch = line.match(/^\s*name:\s*['"]([^'"]+)['"]/);
  if (nameMatch) currentScheme.name = nameMatch[1];
  const ministryMatch = line.match(/^\s*ministry:\s*['"]([^'"]+)['"]/);
  if (ministryMatch) currentScheme.ministry = ministryMatch[1];
  const benefitMatch = line.match(/^\s*primaryBenefit:\s*['"]([^'"]+)['"]/);
  if (benefitMatch) currentScheme.primaryBenefit = benefitMatch[1];
  const subsidyMatch = line.match(/^\s*specialSubsidyForCommunity:\s*['"]([^'"]+)['"]/);
  if (subsidyMatch) currentScheme.specialSubsidyForCommunity = subsidyMatch[1];
  const descMatch = line.match(/^\s*description:\s*['"]([^'"]+)['"]/);
  if (descMatch) currentScheme.description = descMatch[1];
  const badgeMatch = line.match(/^\s*badge:\s*['"]([^'"]+)['"]/);
  if (badgeMatch) currentScheme.badge = badgeMatch[1];
}
if (currentScheme) allSchemes.push(currentScheme);

console.log(`Total Schemes found: ${allSchemes.length}`);
allSchemes.forEach((s, idx) => {
  console.log(`\n[${idx + 1}] ID: ${s.id}`);
  console.log(`  Name: ${s.name}`);
  console.log(`  Ministry: ${s.ministry}`);
  console.log(`  Badge: ${s.badge}`);
  console.log(`  Primary Benefit: ${s.primaryBenefit ? s.primaryBenefit.substring(0, 80) + '...' : ''}`);
  console.log(`  Special Subsidy: ${s.specialSubsidyForCommunity ? s.specialSubsidyForCommunity.substring(0, 80) + '...' : ''}`);
});
