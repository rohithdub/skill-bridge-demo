/**
 * scripts/generate_skills_dictionary.js
 * Generates translations for all 190 real skills across all 13 languages:
 * en, hi, ta, te, kn, ml, bn, mr, gu, pa, or, as, ur.
 */

const fs = require('fs');

const realSkills = JSON.parse(fs.readFileSync('scripts/real_skills.json', 'utf8'));
console.log('Total skills to process:', realSkills.length);

// Base translations table for keywords / components
const terms = {
  // Common prefixes / suffixes
  "Installation": { en: "Installation", hi: "स्थापना", ta: "நிறுவுதல்", te: "అమరిక", kn: "ಸ್ಥಾಪನೆ", ml: "ഇൻസ്റ്റാളേഷൻ", bn: "ইনস্টলেশন", mr: "स्थापना", gu: "સ્થાપના", pa: "ਸਥਾਪਨਾ", or: "ସ୍ଥାପନ", as: "সংস্থাপন", ur: "تنصیب" },
  "Maintenance": { en: "Maintenance", hi: "रखरखाव", ta: "பராமரிப்பு", te: "నిర్వహణ", kn: "ನಿರ್ವಹಣೆ", ml: "പരിപാലനം", bn: "রক্ষণাবেক্ষণ", mr: "देखभाल", gu: "જાળવણી", pa: "ਸੰਭਾਲ", or: "ରକ୍ଷଣାବେକ୍ଷଣ", as: "ৰক্ষণাবেক্ষণ", ur: "دیکھ بھال" },
  "Management": { en: "Management", hi: "प्रबंधन", ta: "மேலாண்மை", te: "నిర్వహణ", kn: "ನಿರ್ವಹಣೆ", ml: "മാനേജ്മെന്റ്", bn: "ব্যবস্থাপনা", mr: "व्यवस्थापन", gu: "સંચાલન", pa: "ਪ੍ਰਬੰਧਨ", or: "ପରିଚାଳନା", as: "ব্যৱস্থাপনা", ur: "انتظام" },
  "Software": { en: "Software", hi: "सॉफ्टवेयर", ta: "மென்பொருள்", te: "సాఫ్ట్‌వేర్", kn: "ಸಾಫ್ಟ್‌ವೇರ್", ml: "സോഫ്റ്റ്‌വെയർ", bn: "সফটওয়্যার", mr: "सॉफ्टवेअर", gu: "સોફ્ટવેર", pa: "ਸਾਫਟਵੇਅਰ", or: "ସଫ୍ଟୱେର୍", as: "ছফ্টৱেৰ", ur: "سافٹ ویئر" },
  "Safety": { en: "Safety", hi: "सुरक्षा", ta: "பாதுகாப்பு", te: "భద్రత", kn: "ಸುರಕ್ಷತೆ", ml: "സുരക്ഷ", bn: "নিরাপত্তা", mr: "सुरक्षा", gu: "સુરક્ષા", pa: "ਸੁਰੱਖਿਆ", or: "ସୁରକ୍ଷା", as: "সুৰক্ষা", ur: "حفاظت" }
};

// Complete handcrafted high-quality translations for all 190 skills
// We write a generator that builds SKILLS_FULL_DICTIONARY.
