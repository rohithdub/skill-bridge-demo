import fs from 'fs';
import { CURATED_MAPPINGS } from '../lib/skillGapEngine';
import { PREDEFINED_PATHWAYS } from '../lib/roadmapData';
import { DEMO_OPPORTUNITIES, DEMO_TRAINING_PROGRAMS } from '../lib/opportunityData';

const skills = new Set<string>();
const tasks = new Set<string>();
const certs = new Set<string>();
const employment = new Set<string>();
const enterprise = new Set<string>();
const titles = new Set<string>();
const descriptions = new Set<string>();
const prerequisites = new Set<string>();
const explanations = new Set<string>();

// From CURATED_MAPPINGS
for (const p of CURATED_MAPPINGS) {
  p.transferable?.forEach(s => skills.add(s));
  p.skillGaps?.forEach(s => skills.add(s));
  p.prerequisites?.forEach(s => prerequisites.add(s));
  p.practicalTasks?.forEach(s => tasks.add(s));
  if (p.certification) certs.add(p.certification);
  p.employmentOptions?.forEach(s => employment.add(s));
  p.enterpriseOptions?.forEach(s => enterprise.add(s));
  if (p.explanation) explanations.add(p.explanation);
}

// From PREDEFINED_PATHWAYS
for (const p of PREDEFINED_PATHWAYS) {
  titles.add(p.title);
  if (p.transferableInsight) explanations.add(p.transferableInsight);
  p.transferableSkills?.forEach(s => skills.add(s));
  p.newSkillsToAcquire?.forEach(s => skills.add(s));
  for (const step of p.steps) {
    titles.add(step.title);
    descriptions.add(step.description);
    step.skills?.forEach(s => skills.add(s));
    if (step.certification) certs.add(step.certification);
    if (step.freeGovtScheme) certs.add(step.freeGovtScheme);
  }
}

// From DEMO_OPPORTUNITIES
for (const opp of DEMO_OPPORTUNITIES) {
  titles.add(opp.title);
  opp.requiredSkills?.forEach(s => skills.add(s));
  if (opp.experienceRequired) skills.add(opp.experienceRequired);
  if (opp.trainingRequirement) certs.add(opp.trainingRequirement);
  if (opp.accessibility) descriptions.add(opp.accessibility);
}

// From DEMO_TRAINING_PROGRAMS
for (const tp of DEMO_TRAINING_PROGRAMS) {
  titles.add(tp.title);
  if (tp.certification) certs.add(tp.certification);
  if (tp.jobRole) titles.add(tp.jobRole);
  if (tp.feeSupportStatus) descriptions.add(tp.feeSupportStatus);
  for (const m of tp.modules) {
    titles.add(m.title);
  }
}


const report = {
  skills: Array.from(skills),
  tasks: Array.from(tasks),
  certs: Array.from(certs),
  employment: Array.from(employment),
  enterprise: Array.from(enterprise),
  titles: Array.from(titles),
  descriptions: Array.from(descriptions),
  prerequisites: Array.from(prerequisites),
  explanations: Array.from(explanations)
};

fs.writeFileSync('scripts/all_dynamic_strings.json', JSON.stringify(report, null, 2));

console.log('--- EXTRACTED TOTALS ---');
console.log('Skills:', report.skills.length);
console.log('Practical Tasks:', report.tasks.length);
console.log('Certifications & Schemes:', report.certs.length);
console.log('Employment Options:', report.employment.length);
console.log('Enterprise Options:', report.enterprise.length);
console.log('Titles & Modules:', report.titles.length);
console.log('Descriptions:', report.descriptions.length);
console.log('Prerequisites:', report.prerequisites.length);
