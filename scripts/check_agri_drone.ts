import { getLocalizedSkill, getLocalizedTask, getLocalizedCertification } from '../lib/translations';

const testStrings = [
  { fn: 'skill', text: 'Crop Lifecycle Insights & Growth Stages' },
  { fn: 'skill', text: 'Soil Moisture & Weed Detection Eyesight' },
  { fn: 'skill', text: 'Pesticide & Fertilizer Dilution Basics' },
  { fn: 'skill', text: 'DGCA Remote Pilot Certification (RPA Class 1)' },
  { fn: 'skill', text: 'Drone Flight Controller Calibration & Geo-Fencing' },
  { fn: 'skill', text: 'Multispectral Crop Health Imagery Analysis' },
  { fn: 'skill', text: 'Micro-Sprayer Nozzle Flow Rate Calibration' },
  { fn: 'skill', text: 'e-NAM Digital Mandi Price Discovery & Bidding' },
  { fn: 'task', text: 'Execute 10 autonomous grid waypoint flights over paddy/cotton fields' },
  { fn: 'task', text: 'Calibrate 10-liter precision spray drone for micron-level coverage' },
  { fn: 'task', text: 'Download NDVI satellite vegetation health indices' },
  { fn: 'task', text: 'List farm produce lot on e-NAM digital mandi portal' },
  { fn: 'cert', text: 'DGCA Certified Remote Pilot License & SMAM Agri-Mechanization Certificate' },
  { fn: 'cert', text: 'DGCA Certified Remote Pilot License' },
  { fn: 'cert', text: 'SMAM Agri-Mechanization Certificate' }
];

const checkLangs = ['ta', 'or', 'as', 'hi'] as const;

for (const lang of checkLangs) {
  console.log(`\n================ TESTING ${lang.toUpperCase()} TRANSLATIONS ================`);
  let passed = 0;
  for (const item of testStrings) {
    let res = '';
    if (item.fn === 'skill') res = getLocalizedSkill(item.text, lang);
    else if (item.fn === 'task') res = getLocalizedTask(item.text, lang);
    else if (item.fn === 'cert') res = getLocalizedCertification(item.text, lang);

    const isTranslated = res !== item.text;
    if (isTranslated) passed++;
    console.log(`[${isTranslated ? 'OK' : 'MISSING'}] "${item.text}" => "${res}"`);
  }
  console.log(`Result: ${passed}/${testStrings.length} passed.`);
}
