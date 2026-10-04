const fs = require('fs');

console.log('Writing final patch for dynamic resolvers and remaining strings...');

const EXPERIENCE_AND_REMAINING_SKILLS = {
  "0–2 years (Freshers with Suryamitra certification welcomed)": {
    en: "0–2 years (Freshers with Suryamitra certification welcomed)",
    hi: "0–2 वर्ष (सूर्यमित्र प्रमाणन वाले नए उम्मीदवारों का स्वागत है)",
    ta: "0–2 ஆண்டுகள் (சூரியமித்ரா சான்றிதழ் பெற்ற புதியவர்கள் வரவேற்கப்படுகிறார்கள்)",
    te: "0–2 సంవత్సరాలు (సూర్యమిత్ర సర్టిఫికేషన్‌తో ఫ్రెషర్లకు స్వాగతం)",
    kn: "0–2 ವರ್ಷಗಳು (ಸೂರ್ಯಮಿತ್ರ ಪ್ರಮಾಣೀಕರಣ ಹೊಂದಿರುವ ಹೊಸಬರಿಗೆ ಸ್ವಾಗತ)",
    ml: "0–2 വർഷം (സൂര്യമിത്ര സർട്ടിഫിക്കേഷനുള്ള തുടക്കക്കാർക്ക് സ്വാഗതം)",
    bn: "০–২ বছর (সূর্যমিত্র সার্টিফিকেশন সহ নতুনদের স্বাগত)",
    mr: "०–२ वर्षे (सूर्यमित्र प्रमाणपत्र असलेल्या नवशिक्यांचे स्वागत)",
    gu: "૦–૨ વર્ષ (સૂર્યમિત્ર પ્રમાણપત્ર સાથેના નવા ઉમેદવારોનું સ્વાગત)",
    pa: "0–2 ਸਾਲ (ਸੂਰਿਆਮਿੱਤਰ ਸਰਟੀਫਿਕੇਸ਼ਨ ਵਾਲੇ ਨਵੇਂ ਉਮੀਦਵਾਰਾਂ ਦਾ ਸਵਾਗਤ ਹੈ)",
    or: "୦–୨ ବର୍ଷ (ସୂର୍ଯ୍ୟମିତ୍ର ପ୍ରମାଣପତ୍ର ଥିବା ନୂତନ ପ୍ରାର୍ଥୀଙ୍କୁ ସ୍ୱାଗତ)",
    as: "০–২ বছৰ (সূৰ্যমিত্ৰ প্ৰমাণপত্ৰ থকা নতুন প্ৰাৰ্থীক স্বাগতম)",
    ur: "0–2 سال (سوریا مترا سرٹیفیکیشن کے حامل نئے افراد کا خیرمقدم ہے)"
  },
  "Fresher Trainee": {
    en: "Fresher Trainee",
    hi: "नया प्रशिक्षु",
    ta: "புதிய பயிற்சியாளர்",
    te: "ఫ్రెషర్ ట్రైనీ",
    kn: "ಹೊಸ ತರಬೇತಿದಾರ",
    ml: "ഫ്രഷർ ട്രെയിനി",
    bn: "নতুন প্রশিক্ষণার্থী",
    mr: "प्रशिक्षणार्थी",
    gu: "નવા તાલીમાર્થી",
    pa: "ਨਵਾਂ ਸਿਖਿਆਰਥੀ",
    or: "ନୂତନ ପ୍ରଶିକ୍ଷାର୍ଥୀ",
    as: "নতুন প্ৰশিক্ষাৰ্থী",
    ur: "تازہ کار تربیت یافتہ"
  },
  "6+ months electrical helper experience": {
    en: "6+ months electrical helper experience",
    hi: "6+ महीने का इलेक्ट्रिकल हेल्पर अनुभव",
    ta: "6+ மாதங்கள் எலக்ட்ரிக்கல் உதவியாளர் அனுபவம்",
    te: "6+ నెలల ఎలక్ట్రికల్ హెల్పర్ అనుభవం",
    kn: "6+ ತಿಂಗಳ ವಿದ್ಯುತ್ ಸಹಾಯಕ ಅನುಭವ",
    ml: "6+ മാസത്തെ ഇലക്ട്രിക്കൽ ഹെൽപ്പർ പരിചയം",
    bn: "৬+ মাসের বৈদ্যুতিক সাহায্যকারীর অভিজ্ঞতা",
    mr: "६+ महिने इलेक्ट्रिकल हेल्पर अनुभव",
    gu: "૬+ મહિનાનો ઇલેક્ટ્રિકલ હેલ્પર અનુભવ",
    pa: "6+ ਮਹੀਨੇ ਦਾ ਇਲੈਕਟ੍ਰੀਕਲ ਹੈਲਪਰ ਦਾ ਤਜਰਬਾ",
    or: "୬+ ମାସର ବୈଦ୍ୟୁତିକ ସହାୟକ ଅଭିଜ୍ଞତା",
    as: "৬+ মাহৰ বৈদ্যুতিক সহায়কৰ অভিজ্ঞতা",
    ur: "6+ ماہ کا الیکٹریکل ہیلپر کا تجربہ"
  },
  "1+ years sewing / garment assembly": {
    en: "1+ years sewing / garment assembly",
    hi: "1+ वर्ष का सिलाई / परिधान संयोजन अनुभव",
    ta: "1+ ஆண்டுகள் தையல் / ஆடை அசெம்பிளி அனுபவம்",
    te: "1+ సంవత్సరాల కుట్టు / వస్త్రాల అసెంబ్లీ అనుభవం",
    kn: "1+ ವರ್ಷಗಳ ಹೊಲಿಗೆ / ಉಡುಪು ಜೋಡಣೆ ಅನುಭವ",
    ml: "1+ വർഷത്തെ തയ്യൽ / വസ്ത്ര നിർമ്മാണ പരിചയം",
    bn: "১+ বছরের সেলাই / পোশাক তৈরির অভিজ্ঞতা",
    mr: "१+ वर्षे शिलाई / कपडे जोडणी अनुभव",
    gu: "૧+ વર્ષ સિલાઈ / ગારમેન્ટ એસેમ્બલીનો અનુભવ",
    pa: "1+ ਸਾਲ ਸਿਲਾਈ / ਕੱਪੜੇ ਤਿਆਰ ਕਰਨ ਦਾ ਤਜਰਬਾ",
    or: "୧+ ବର୍ଷର ସିଲେଇ / ପୋଷାକ ନିର୍ମାଣ ଅଭିଜ୍ଞତା",
    as: "১+ বছৰৰ চিলাই / কাপোৰ নিৰ্মাণৰ অভিজ্ঞতা",
    ur: "1+ سال سلائی اور گارمنٹس اسمبلنگ کا تجربہ"
  },
  "Fresher DGCA Remote Pilot": {
    en: "Fresher DGCA Remote Pilot",
    hi: "नया डीजीसीए रिमोट पायलट",
    ta: "புதிய டிஜிசிஏ ரிமோட் பைலட்",
    te: "ఫ్రెషర్ DGCA రిమోట్ పైలట్",
    kn: "ಹೊಸ ಡಿಜಿಸಿಎ ರಿಮೋಟ್ ಪೈಲಟ್",
    ml: "ഫ്രഷർ ഡിജിസിഎ റിമോട്ട് പൈലറ്റ്",
    bn: "নতুন ডিজিসিএ রিমোট পাইলট",
    mr: "नवशिका डीजीसीए रिमोट पायलट",
    gu: "નવા ડીજીસીએ રીમોટ પાઇલટ",
    pa: "ਨਵਾਂ ਡੀਜੀਸੀਏ ਰਿਮੋਟ ਪਾਇਲਟ",
    or: "ନୂତନ ଡିଜିସିଏ ରିମୋଟ୍ ପାଇଲଟ୍",
    as: "নতুন ডিজিচিএ ৰিম’ট পাইলট",
    ur: "نیا ڈی جی سی اے ریموٹ پائلٹ"
  },
  "Fresher to 1 year": {
    en: "Fresher to 1 year",
    hi: "नया से 1 वर्ष",
    ta: "புதியவர் முதல் 1 ஆண்டு வரை",
    te: "ఫ్రెషర్ నుండి 1 సంవత్సరం",
    kn: "ಹೊಸಬರಿಂದ 1 ವರ್ಷ",
    ml: "തുടക്കക്കാർ മുതൽ 1 വർഷം വരെ",
    bn: "নতুন থেকে ১ বছর",
    mr: "नवशिक्या ते १ वर्ष",
    gu: "નવા થી ૧ વર્ષ",
    pa: "ਨਵੇਂ ਤੋਂ 1 ਸਾਲ",
    or: "ନୂତନରୁ ୧ ବର୍ଷ",
    as: "নতুনৰ পৰা ১ বছৰ",
    ur: "نئے سے لے کر 1 سال تک"
  },
  "Tailwind CSS": {
    en: "Tailwind CSS",
    hi: "टेलविंड सीएसएस (Tailwind CSS)",
    ta: "டெய்ல்விண்ட் சிஎஸ்எஸ் (Tailwind CSS)",
    te: "టేల్‌విండ్ CSS (Tailwind CSS)",
    kn: "ಟೇಲ್‌ವಿಂಡ್ ಸಿಎಸ್‌ಎಸ್ (Tailwind CSS)",
    ml: "ടെയിൽവിൻഡ് സി‌എസ്‌എസ് (Tailwind CSS)",
    bn: "টেইলউইন্ড সিএসএস (Tailwind CSS)",
    mr: "टेलविंड सीएसएस (Tailwind CSS)",
    gu: "ટેઇલવિન્ડ CSS (Tailwind CSS)",
    pa: "ਟੇਲਵਿੰਡ ਸੀਐਸਐਸ (Tailwind CSS)",
    or: "ଟେଲୱିଣ୍ଡ୍ ସିଏସଏସ (Tailwind CSS)",
    as: "টেইলৱিণ্ড চিএছএছ (Tailwind CSS)",
    ur: "ٹیل ونڈ سی ایس ایس (Tailwind CSS)"
  }
};

let dictContent = fs.readFileSync('lib/contentDictionary.ts', 'utf8');

// Insert EXPERIENCE_AND_REMAINING_SKILLS into SKILLS_FULL_DICTIONARY
let extraSkills = '';
for (const [key, map] of Object.entries(EXPERIENCE_AND_REMAINING_SKILLS)) {
  if (!dictContent.includes(JSON.stringify(key) + ':')) {
    extraSkills += `\n  ${JSON.stringify(key)}: ${JSON.stringify(map, null, 2).replace(/\n/g, '\n  ')},`;
  }
}

if (extraSkills) {
  const marker = 'export const SKILLS_FULL_DICTIONARY: Record<string, Record<SupportedLanguage, string>> = {';
  dictContent = dictContent.replace(marker, marker + extraSkills);
}

fs.writeFileSync('lib/contentDictionary.ts', dictContent, 'utf8');
console.log('Successfully updated contentDictionary with experience skills!');

// Now update lib/translations.ts getLocalizedRoadmapStep to check getDictionaryOpportunityTitle and getDictionaryTask
let transContent = fs.readFileSync('lib/translations.ts', 'utf8');

const targetCheck = 'const dictTitle = getDictionaryRoadmapTitle(str, lang);';
const enhancedTitleCheck = `const dictTitle = getDictionaryRoadmapTitle(str, lang);
    if (dictTitle && dictTitle !== str) return dictTitle;

    const dictOppTitle = getDictionaryOpportunityTitle(str, lang);
    if (dictOppTitle && dictOppTitle !== str) return dictOppTitle;

    const dictTask = getDictionaryTask(str, lang);
    if (dictTask && dictTask !== str) return dictTask;

    const dictPrereq = getDictionaryPrerequisite(str, lang);
    if (dictPrereq && dictPrereq !== str) return dictPrereq;`;

if (!transContent.includes('const dictOppTitle = getDictionaryOpportunityTitle')) {
  transContent = transContent.replace(
    'const dictTitle = getDictionaryRoadmapTitle(str, lang);\n    if (dictTitle && dictTitle !== str) return dictTitle;',
    enhancedTitleCheck
  );
}

fs.writeFileSync('lib/translations.ts', transContent, 'utf8');
console.log('Successfully updated translations.ts with enhanced roadmap resolvers!');
