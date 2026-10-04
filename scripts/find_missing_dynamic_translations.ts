import fs from 'fs';
import {
  getLocalizedSkill,
  getLocalizedTask,
  getLocalizedCertification,
  getLocalizedPlacement,
  getLocalizedEnterprise,
  getLocalizedRoadmapStep,
  getLocalizedOpportunityTitle,
  getLocalizedAccessibility,
  getLocalizedFeeStatus,
  getLocalizedPrerequisite
} from '../lib/translations';
import { SupportedLanguage } from '../types/skillbridge';

const data = JSON.parse(fs.readFileSync('scripts/all_dynamic_strings.json', 'utf8'));

const missing: {
  skills: string[];
  tasks: string[];
  certs: string[];
  employment: string[];
  enterprise: string[];
  titles: string[];
  descriptions: string[];
  prerequisites: string[];
} = {
  skills: [],
  tasks: [],
  certs: [],
  employment: [],
  enterprise: [],
  titles: [],
  descriptions: [],
  prerequisites: []
};

// Check skills
for (const s of data.skills) {
  const res = getLocalizedSkill(s, 'ta');
  if (res === s) missing.skills.push(s);
}

// Check tasks
for (const t of data.tasks) {
  const res = getLocalizedTask(t, 'ta');
  if (res === t) missing.tasks.push(t);
}

// Check certs
for (const c of data.certs) {
  const res = getLocalizedCertification(c, 'ta');
  if (res === c) missing.certs.push(c);
}

// Check employment
for (const e of data.employment) {
  const res = getLocalizedPlacement(e, 'ta');
  if (res === e) missing.employment.push(e);
}

// Check enterprise
for (const e of data.enterprise) {
  const res = getLocalizedEnterprise(e, 'ta');
  if (res === e) missing.enterprise.push(e);
}

// Check titles
for (const t of data.titles) {
  const res = getLocalizedOpportunityTitle(t, 'ta') || getLocalizedRoadmapStep(t, 'ta');
  if (res === t) missing.titles.push(t);
}

// Check descriptions
for (const d of data.descriptions) {
  const res = getLocalizedAccessibility(d, 'ta') || getLocalizedFeeStatus(d, 'ta') || getLocalizedRoadmapStep(d, 'ta');
  if (res === d) missing.descriptions.push(d);
}

// Check prerequisites
for (const p of data.prerequisites) {
  const res = getLocalizedPrerequisite(p, 'ta');
  if (res === p) missing.prerequisites.push(p);
}

console.log('--- MISSING COUNTS IN TAMIL ---');
console.log('Missing Skills:', missing.skills.length, 'out of', data.skills.length);
console.log('Missing Tasks:', missing.tasks.length, 'out of', data.tasks.length);
console.log('Missing Certs:', missing.certs.length, 'out of', data.certs.length);
console.log('Missing Employment:', missing.employment.length, 'out of', data.employment.length);
console.log('Missing Enterprise:', missing.enterprise.length, 'out of', data.enterprise.length);
console.log('Missing Titles:', missing.titles.length, 'out of', data.titles.length);
console.log('Missing Descriptions:', missing.descriptions.length, 'out of', data.descriptions.length);
console.log('Missing Prerequisites:', missing.prerequisites.length, 'out of', data.prerequisites.length);

if (missing.skills.length > 0) console.log('Remaining skills:', missing.skills);
if (missing.tasks.length > 0) console.log('Remaining tasks:', missing.tasks);
if (missing.titles.length > 0) console.log('Remaining titles:', missing.titles);
if (missing.descriptions.length > 0) console.log('Remaining descriptions:', missing.descriptions);
if (missing.prerequisites.length > 0) console.log('Remaining prerequisites:', missing.prerequisites);
