const fs = require('fs');

const roadmapContent = fs.readFileSync('lib/roadmapData.ts', 'utf8');
const schemesContent = fs.readFileSync('lib/schemesData.ts', 'utf8');
const oppContent = fs.readFileSync('lib/opportunityData.ts', 'utf8');

// 1. Roadmap items
const stepTitles = [...roadmapContent.matchAll(/title:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const stepDescriptions = [...roadmapContent.matchAll(/description:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const stepBadges = [...roadmapContent.matchAll(/badge:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const stepDurations = [...roadmapContent.matchAll(/duration:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const freeGovtSchemes = [...roadmapContent.matchAll(/freeGovtScheme:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const certifications = [...roadmapContent.matchAll(/certification:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);

// Extract all skills from roadmap
const skillMatches = [...roadmapContent.matchAll(/skills:\s*\[(.*?)\]/gs)];
const roadmapSkills = [];
for (const sm of skillMatches) {
  const items = [...sm[1].matchAll(/['"]([^'"]+)['"]/g)].map(m => m[1]);
  roadmapSkills.push(...items);
}

// Extract transferable and new skills
const transSkillMatches = [...roadmapContent.matchAll(/transferableSkills:\s*\[(.*?)\]/gs)];
for (const tm of transSkillMatches) {
  const items = [...tm[1].matchAll(/['"]([^'"]+)['"]/g)].map(m => m[1]);
  roadmapSkills.push(...items);
}
const newSkillMatches = [...roadmapContent.matchAll(/newSkillsToAcquire:\s*\[(.*?)\]/gs)];
for (const nm of newSkillMatches) {
  const items = [...nm[1].matchAll(/['"]([^'"]+)['"]/g)].map(m => m[1]);
  roadmapSkills.push(...items);
}

// 2. Schemes items
const schemeNames = [...schemesContent.matchAll(/name:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const schemeMinistries = [...schemesContent.matchAll(/ministry:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const schemeBenefits = [...schemesContent.matchAll(/primaryBenefit:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const schemeSubsidies = [...schemesContent.matchAll(/specialSubsidyForCommunity:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const schemeDescriptions = [...schemesContent.matchAll(/description:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const schemeBadges = [...schemesContent.matchAll(/badge:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);

// 3. Opportunities items
const oppTitles = [...oppContent.matchAll(/title:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const oppQualifications = [...oppContent.matchAll(/qualification:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const oppTrainingReqs = [...oppContent.matchAll(/trainingRequirement:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const oppFeeStatus = [...oppContent.matchAll(/feeSupportStatus:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const oppPlacementSupport = [...oppContent.matchAll(/placementSupport:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);

const summary = {
  roadmapTitles: [...new Set(stepTitles)],
  roadmapDescriptions: [...new Set(stepDescriptions)],
  roadmapBadges: [...new Set(stepBadges)],
  roadmapDurations: [...new Set(stepDurations)],
  freeGovtSchemes: [...new Set(freeGovtSchemes)],
  certifications: [...new Set(certifications)],
  skills: [...new Set(roadmapSkills)],
  schemeNames: [...new Set(schemeNames)],
  schemeMinistries: [...new Set(schemeMinistries)],
  schemeBenefits: [...new Set(schemeBenefits)],
  schemeSubsidies: [...new Set(schemeSubsidies)],
  schemeDescriptions: [...new Set(schemeDescriptions)],
  schemeBadges: [...new Set(schemeBadges)],
  oppTitles: [...new Set(oppTitles)],
  oppQualifications: [...new Set(oppQualifications)],
  oppTrainingReqs: [...new Set(oppTrainingReqs)],
  oppFeeStatus: [...new Set(oppFeeStatus)],
  oppPlacementSupport: [...new Set(oppPlacementSupport)]
};

fs.writeFileSync('scripts/extracted_content.json', JSON.stringify(summary, null, 2), 'utf8');

console.log('--- CONTENT EXTRACTION SUMMARY ---');
console.log('Roadmap Titles:', summary.roadmapTitles.length);
console.log('Roadmap Descriptions:', summary.roadmapDescriptions.length);
console.log('Roadmap Badges:', summary.roadmapBadges.length);
console.log('Roadmap Durations:', summary.roadmapDurations.length);
console.log('Free Govt Schemes:', summary.freeGovtSchemes.length);
console.log('Certifications:', summary.certifications.length);
console.log('Skills:', summary.skills.length);
console.log('Scheme Names:', summary.schemeNames.length);
console.log('Scheme Ministries:', summary.schemeMinistries.length);
console.log('Scheme Benefits:', summary.schemeBenefits.length);
console.log('Scheme Subsidies:', summary.schemeSubsidies.length);
console.log('Scheme Descriptions:', summary.schemeDescriptions.length);
console.log('Scheme Badges:', summary.schemeBadges.length);
console.log('Opp Titles:', summary.oppTitles.length);
