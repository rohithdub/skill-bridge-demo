const fs = require('fs');

// Extract directly from roadmapData.ts
const roadmapContent = fs.readFileSync('lib/roadmapData.ts', 'utf8');
const oppContent = fs.readFileSync('lib/opportunityData.ts', 'utf8');

const skillsSet = new Set();

// Match array elements in skills, transferableSkills, newSkillsToAcquire, requiredSkills
function extractFromArrayMatches(content, propName) {
  const regex = new RegExp(propName + '\\s*:\\s*\\[([^\\]]+)\\]', 'g');
  let match;
  while ((match = regex.exec(content)) !== null) {
    const rawArray = match[1];
    // Split by comma taking into account strings
    const items = rawArray.split(/,\s*(?=(?:[^'"]*['"][^'"]*['"])*[^'"]*$)/);
    for (let item of items) {
      const clean = item.trim().replace(/^['"]|['"]$/g, '').trim();
      if (clean && clean.length > 1) {
        skillsSet.add(clean);
      }
    }
  }
}

extractFromArrayMatches(roadmapContent, 'skills');
extractFromArrayMatches(roadmapContent, 'transferableSkills');
extractFromArrayMatches(roadmapContent, 'newSkillsToAcquire');
extractFromArrayMatches(roadmapContent, 'coreSkillsTargeted');
extractFromArrayMatches(oppContent, 'requiredSkills');

const allUniqueSkills = Array.from(skillsSet).sort();
console.log('Total extracted real skills:', allUniqueSkills.length);
fs.writeFileSync('scripts/real_skills.json', JSON.stringify(allUniqueSkills, null, 2), 'utf8');
