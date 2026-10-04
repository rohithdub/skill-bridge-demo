const fs = require('fs');

const NEW_KEYS = {
  "anyDistance": {
    "en": "Any distance",
    "hi": "कोई भी दूरी",
    "ta": "எந்த தூரமும்",
    "te": "ఏ దూరమైనా",
    "kn": "ಯಾವುದೇ ದೂರ",
    "ml": "ഏത് ദൂരവും",
    "bn": "যেকোন দূরত্ব",
    "mr": "कोणतेही अंतर",
    "gu": "કોઈપણ અંતર",
    "pa": "ਕੋਈ ਵੀ ਦੂਰੀ",
    "or": "ଯେକୌଣସି ଦୂରତା",
    "as": "যিকোনো দূৰত্ব",
    "ur": "کوئی بھی فاصلہ"
  }
};

let content = fs.readFileSync('./lib/translations.ts', 'utf8');

let newKeysString = '';
for (const [key, val] of Object.entries(NEW_KEYS)) {
  newKeysString += `,\n  ${JSON.stringify(key)}: ${JSON.stringify(val, null, 4)}`;
}

const target = '\n};\n\nexport const POPULAR_GOAL_TITLES';
content = content.replace(target, newKeysString + target);
fs.writeFileSync('./lib/translations.ts', content, 'utf8');
console.log('Added anyDistance to lib/translations.ts');
