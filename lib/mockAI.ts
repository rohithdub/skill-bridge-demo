import { GeneratedRoadmap, RoadmapStep, UserProfile, SupportedLanguage } from '@/types/skillbridge';
import { PREDEFINED_PATHWAYS, PredefinedPathway } from './roadmapData';

/**
 * MockAIService
 * 
 * Provides simulated AI cognitive reasoning for Skill Bridge.
 * Clean architectural boundary: in production, these methods will point
 * to real LLM / Cognitive API endpoints (e.g., Gemini / Sarvam).
 */
export class MockAIService {
  
  /**
   * Generates a personalized Skill Roadmap by analyzing:
   * Current Job + Education + Skills + Age + Employment Preference + Career Goal
   */
  public static generateRoadmap(profile: UserProfile, careerGoal: string): GeneratedRoadmap {
    const goalNorm = careerGoal.toLowerCase().trim();
    const jobNorm = profile.currentJob.toLowerCase().trim();

    // 1. Try to find the closest curated pathway
    const matched = PREDEFINED_PATHWAYS.find(path => {
      const matchGoal = path.goalKeywords.some(kw => goalNorm.includes(kw) || kw.includes(goalNorm));
      const matchJob = path.currentJobKeywords.some(kw => jobNorm.includes(kw) || kw.includes(jobNorm));
      return matchGoal && matchJob;
    }) || PREDEFINED_PATHWAYS.find(path => {
      return path.goalKeywords.some(kw => goalNorm.includes(kw) || kw.includes(goalNorm));
    });

    let generated: GeneratedRoadmap;

    if (matched) {
      generated = this.buildFromPathway(matched, profile, careerGoal);
    } else {
      // Dynamic fallback synthesizer
      generated = this.synthesizeDynamicRoadmap(profile, careerGoal);
    }

    // Adapt the final step based on employment preference
    this.adaptForEmploymentPreference(generated, profile.employmentPreference);

    return generated;
  }

  private static buildFromPathway(
    pathway: PredefinedPathway, 
    profile: UserProfile, 
    careerGoal: string
  ): GeneratedRoadmap {
    // Generate transferable skills insight tailored to user's exact declared skills
    const userSkillsMention = profile.skills.length > 0 
      ? ` Leveraging your stated strengths in ${profile.skills.join(' and ')}, you will absorb technical concepts rapidly.` 
      : '';

    const transferableInsight = `${pathway.transferableInsight}${userSkillsMention}`;

    const steps: RoadmapStep[] = pathway.steps.map((s, idx) => ({
      id: `step-${idx + 1}`,
      stepNumber: idx + 1,
      title: s.title,
      duration: s.duration,
      badge: s.badge,
      description: s.description,
      skills: [...s.skills],
      trainingType: s.trainingType,
      certification: s.certification,
      freeGovtScheme: s.freeGovtScheme,
      isCompleted: idx === 0 // mark first step as in progress / ready
    }));

    return {
      id: `roadmap-${Date.now()}`,
      careerGoal: careerGoal || pathway.title,
      currentJob: profile.currentJob,
      transferableInsight,
      transferableSkills: pathway.transferableSkills,
      newSkillsToAcquire: pathway.newSkillsToAcquire,
      estimatedTotalMonths: pathway.estimatedTotalMonths,
      potentialSalaryGrowth: pathway.potentialSalaryGrowth,
      alignment: pathway.alignment,
      steps
    };
  }

  private static synthesizeDynamicRoadmap(profile: UserProfile, careerGoal: string): GeneratedRoadmap {
    const job = profile.currentJob || 'Current Occupation';
    const goal = careerGoal || 'Target Professional Role';
    const skillsList = profile.skills.length > 0 ? profile.skills : ['Practical work experience', 'Communication'];

    return {
      id: `roadmap-${Date.now()}`,
      careerGoal: goal,
      currentJob: job,
      transferableInsight: `Your background as ${job} gives you resilience, problem-solving, and practical execution capability. We are bridging these transferable strengths directly into the requirements for ${goal}.`,
      transferableSkills: [
        `${job} Work Ethic & Practical Knowledge`,
        ...skillsList.slice(0, 3)
      ],
      newSkillsToAcquire: [
        `Core Technical Protocols for ${goal}`,
        'Digital Tools & Modern Best Practices',
        'Industry Compliance & Quality Assurance',
        'Professional Customer Interaction'
      ],
      estimatedTotalMonths: '4 – 6 Months',
      potentialSalaryGrowth: 'Estimated 2.0x – 2.8x income expansion post-certification',
      alignment: 'National Skill Development Corporation (NSDC) & Skill India Aligned',
      steps: [
        {
          id: 'step-1',
          stepNumber: 1,
          title: `Foundations of ${goal}`,
          duration: '3–4 weeks',
          badge: 'Foundation',
          description: `Master core terminology, safety protocols, and standard equipment used in ${goal}.`,
          skills: ['Basic Principles', 'Industry Terminology', 'Safety Regulations'],
          trainingType: 'Foundational',
          freeGovtScheme: 'Skill India Digital Hub Free Primer Course',
          isCompleted: true
        },
        {
          id: 'step-2',
          stepNumber: 2,
          title: `Specialized Technical Skills for ${goal}`,
          duration: '6–8 weeks',
          badge: 'Domain Skill',
          description: `Deep dive into standard operating procedures, digital equipment, and hands-on tooling.`,
          skills: ['Specialized Tooling', 'Quality Standards', 'Problem Diagnostics'],
          trainingType: 'Domain Skill',
          certification: `NSQF Aligned Certification in ${goal}`
        },
        {
          id: 'step-3',
          stepNumber: 3,
          title: 'Hands-on Practical Apprenticeship / Lab',
          duration: '4–6 weeks',
          badge: 'Hands-on Lab',
          description: `Perform real-world projects and site exercises under experienced mentor supervision.`,
          skills: ['Field Execution', 'Troubleshooting', 'Team Coordination'],
          trainingType: 'Hands-on Lab',
          freeGovtScheme: 'PMKVY 4.0 Apprenticeship Scheme'
        },
        {
          id: 'step-4',
          stepNumber: 4,
          title: 'Government / Industry Assessment & Certification',
          duration: '2 weeks',
          badge: 'Govt Certification',
          description: `Appear for theoretical and practical skill validation to earn your accredited badge.`,
          skills: ['National Assessment Standards', 'Documentation', 'Regulatory Compliance'],
          trainingType: 'Govt Certification',
          certification: `Skill India Certified ${goal}`
        },
        {
          id: 'step-5',
          stepNumber: 5,
          title: `Career Launch: ${profile.employmentPreference === 'Self-employment' ? 'Independent Enterprise' : 'Industry Placement'}`,
          duration: '4–8 weeks',
          badge: 'Launch',
          description: profile.employmentPreference === 'Self-employment'
            ? `Register your micro-enterprise, access government subsidized capital (Mudra/PMEGP), and secure first clients.`
            : `Interview with verified employers on the National Career Service (NCS) portal for full-time roles.`,
          skills: ['Client Acquisition', 'Professional Invoicing', 'Long-term Growth'],
          trainingType: profile.employmentPreference === 'Self-employment' ? 'Self-Employment Launch' : 'Industry Placement',
          freeGovtScheme: profile.employmentPreference === 'Self-employment' ? 'PMEGP Subsidy / Mudra Loan' : 'National Career Service (NCS)'
        }
      ]
    };
  }

  private static adaptForEmploymentPreference(roadmap: GeneratedRoadmap, pref: string) {
    if (roadmap.steps.length === 0) return;
    const finalStep = roadmap.steps[roadmap.steps.length - 1];

    if (pref === 'Self-employment') {
      finalStep.trainingType = 'Self-Employment Launch';
      finalStep.badge = 'Own Business';
      if (!finalStep.title.toLowerCase().includes('enterprise') && !finalStep.title.toLowerCase().includes('boutique') && !finalStep.title.toLowerCase().includes('business')) {
        finalStep.title = `Micro-Enterprise Launch & Client Acquisition`;
        finalStep.description = `Register as an MSME, tap into Mudra / PMEGP collateral-free seed capital, and launch independent services.`;
        finalStep.freeGovtScheme = 'PM Mudra Shishu/Kishor Scheme (Zero Collateral)';
      }
    } else if (pref === 'Wage employment') {
      finalStep.trainingType = 'Industry Placement';
      finalStep.badge = 'Placement';
      if (!finalStep.title.toLowerCase().includes('placement') && !finalStep.title.toLowerCase().includes('apprenticeship')) {
        finalStep.title = `Corporate & Contractor Placement Drive`;
        finalStep.description = `Connect with verified employers through National Apprenticeship Promotion Scheme (NAPS) for secure monthly wages.`;
        finalStep.freeGovtScheme = 'NAPS Guaranteed Monthly Stipend Scheme';
      }
    }
  }

  /**
   * Simulates AI voice assistant responses in the Voice Assistant tab
   */
  public static simulateVoiceResponse(
    query: string,
    profile?: UserProfile,
    roadmap?: GeneratedRoadmap,
    lang: SupportedLanguage = 'en'
  ): { reply: string; suggestions?: string[] } {
    const q = query.toLowerCase();
    const name = profile?.name ? profile.name.split(' ')[0] : (
      lang === 'ta' ? 'நண்பரே' :
      lang === 'hi' ? 'दोस्त' :
      lang === 'te' ? 'స్నేహితుడా' :
      lang === 'kn' ? 'ಸ್ನೇಹಿತರೆ' :
      lang === 'ml' ? 'സുഹൃത്തേ' : 'friend'
    );
    const goal = roadmap?.careerGoal || profile?.currentJob || 'Career';

    // 1. Roadmap & Path queries
    if (q.includes('explain') || q.includes('roadmap') || q.includes('path') || q.includes('விளக்கு') || q.includes('समझा') || q.includes('వివరించు') || q.includes('ವಿವರಿಸಿ') || q.includes('വിശദീകരിക്കുക')) {
      if (roadmap) {
        const step1Title = roadmap.steps[0]?.title || 'Step 1';
        const replies: Partial<Record<SupportedLanguage, string>> = {
          en: `You are on the path to ${roadmap.careerGoal}. Your roadmap has ${roadmap.steps.length} focused steps over ${roadmap.estimatedTotalMonths}. Step 1 is "${step1Title}".`,
          ta: `நீங்கள் ${roadmap.careerGoal} இலக்கை நோக்கி செல்கிறீர்கள். உங்கள் வழிகாட்டி ${roadmap.estimatedTotalMonths} காலத்தில் ${roadmap.steps.length} படிகளைக் கொண்டுள்ளது. முதல் படி "${step1Title}".`,
          hi: `आप ${roadmap.careerGoal} के पथ पर हैं। आपके रोडमैप में ${roadmap.estimatedTotalMonths} में ${roadmap.steps.length} चरण हैं। पहला कदम "${step1Title}" है।`,
          te: `మీరు ${roadmap.careerGoal} వైపు ప్రయాణిస్తున్నారు. మీ రోడ్‌మ్యాప్‌లో ${roadmap.estimatedTotalMonths} లో ${roadmap.steps.length} దశలు ఉన్నాయి. మొదటి దశ "${step1Title}".`,
          kn: `ನೀವು ${roadmap.careerGoal} ಕಡೆಗೆ ಮುನ್ನಡೆಯುತ್ತಿದ್ದೀರಿ. ನಿಮ್ಮ ಮಾರ್ಗಸೂಚಿಯು ${roadmap.estimatedTotalMonths} ನಲ್ಲಿ ${roadmap.steps.length} ಹಂತಗಳನ್ನು ಹೊಂದಿದೆ. ಮೊದಲ ಹಂತ "${step1Title}".`,
          ml: `നിങ്ങൾ ${roadmap.careerGoal} ലക്ഷ്യത്തിലേക്കുള്ള പാതയിലാണ്. നിങ്ങളുടെ റോഡ്‌മാപ്പിൽ ${roadmap.estimatedTotalMonths} ൽ ${roadmap.steps.length} ഘട്ടങ്ങളുണ്ട്. ആദ്യ ഘട്ടം "${step1Title}".`
        };
        return {
          reply: replies[lang] || replies.en || '',
          suggestions: ['What should I learn next?', 'Show free government schemes', 'Change my career goal']
        };
      }
    }

    // 2. Schemes & Community benefits queries
    if (q.includes('scheme') || q.includes('caste') || q.includes('community') || q.includes('loan') || q.includes('scholarship') || q.includes('subsidy') || q.includes('toolkit') || q.includes('திட்டம்') || q.includes('योजना')) {
      const caste = profile?.caste || 'OBC';
      const replies: Partial<Record<SupportedLanguage, string>> = {
        en: `For your ${caste} category, you qualify for high-impact schemes including PM Vishwakarma (₹15,000 free toolkit + 5% loan), NBCFDC/NSFDC skilling grants, and PM Surya Ghar certification. Check out the Schemes tab right after Roadmap!`,
        ta: `உங்கள் ${caste} பிரிவுக்கு, PM விஸ்வகர்மா (₹15,000 இலவச கருவித்தொகுப்பு + 5% கடன்), திறன் மானியங்கள் மற்றும் PM சூர்ய கர் இலவச சான்றிதழ் திட்டங்கள் தகுதிபெறுகின்றன. ரோட்மேப்பிற்கு அடுத்துள்ள Schemes பகுதியில் பாருங்கள்!`,
        hi: `आपकी ${caste} श्रेणी के लिए, आप पीएम विश्वकर्मा (₹15,000 फ्री टूलकिट + 5% ऋण), NBCFDC/NSFDC कौशल अनुदान और पीएम सूर्य घर योजनाओं के लिए पात्र हैं। रोडमैप के बाद स्कीम्स टैब देखें!`,
        te: `మీ ${caste} కేటగిరీకి, మీరు PM విశ్వకర్మ (₹15,000 ఉచిత టూల్‌కిట్ + 5% రుణం) మరియు PM సూర్య ఘర్ పథకాలకు అర్హులు. రోడ్‌మ్యాప్ తర్వాత స్కీమ్స్ ట్యాబ్‌ను చూడండి!`,
        kn: `ನಿಮ್ಮ ${caste} ವರ್ಗಕ್ಕೆ, ನೀವು PM ವಿಶ್ವಕರ್ಮ (₹15,000 ಉಚಿತ ಟೂಲ್‌ಕಿಟ್ + 5% ಸಾಲ) ಮತ್ತು PM ಸೂರ್ಯ ಘರ್ ಯೋಜನೆಗಳಿಗೆ ಅರ್ಹರಾಗಿದ್ದೀರಿ. ರೋಡ್‌ಮ್ಯಾಪ್ ನಂತರ ಸ್ಕೀಮ್ಸ್ ಟ್ಯಾಬ್ ನೋಡಿ!`,
        ml: `നിങ്ങളുടെ ${caste} വിഭാഗത്തിനായി, പിഎം വിശ്വകർമ (₹15,000 സൗജന്യ ടൂൾകിಟ್ + 5% വായ്പ), പിഎം സൂര്യ ഘർ പദ്ധതികൾ എന്നിവ ലഭ്യമാണ്. റോഡ്‌മാപ്പിന് ശേഷമുള്ള സ്കീംസ് ടാബ് കാണുക!`
      };
      return {
        reply: replies[lang] || replies.en || '',
        suggestions: ['Show eligible schemes', 'What should I learn next?', 'Explain my roadmap']
      };
    }

    // 3. Next steps queries
    if (q.includes('next') || q.includes('learn') || q.includes('அடுத்து') || q.includes('अगला') || q.includes('తరువాత') || q.includes('ಮುಂದೆ') || q.includes('അടുത്തത്')) {
      const nextStep = roadmap?.steps.find(s => !s.isCompleted) || roadmap?.steps[0];
      if (nextStep) {
        const replies: Partial<Record<SupportedLanguage, string>> = {
          en: `Next up: ${nextStep.title} (${nextStep.duration}). Focus on: ${nextStep.skills.slice(0, 2).join(', ')}.`,
          ta: `அடுத்த படி: ${nextStep.title} (${nextStep.duration}). இதில் ${nextStep.skills.slice(0, 2).join(', ')} போன்ற திறன்களில் கவனம் செலுத்துங்கள்.`,
          hi: `अगला कदम: ${nextStep.title} (${nextStep.duration})। मुख्य कौशल: ${nextStep.skills.slice(0, 2).join(', ')}।`,
          te: `తదుపరి దశ: ${nextStep.title} (${nextStep.duration}). ప్రధాన నైపుణ్యాలు: ${nextStep.skills.slice(0, 2).join(', ')}.`,
          kn: `ಮುಂದಿನ ಹಂತ: ${nextStep.title} (${nextStep.duration}). ಪ್ರಮುಖ ಕೌಶಲ್ಯಗಳು: ${nextStep.skills.slice(0, 2).join(', ')}.`,
          ml: `അടുത്ത ഘട്ടം: ${nextStep.title} (${nextStep.duration}). പ്രധാന കഴിവുകൾ: ${nextStep.skills.slice(0, 2).join(', ')}.`
        };
        return {
          reply: replies[lang] || replies.en || '',
          suggestions: ['Explain my roadmap', 'Find opportunities', 'How much can I earn?']
        };
      }
    }

    // 3. Salary & Earnings queries
    if (q.includes('salary') || q.includes('earn') || q.includes('money') || q.includes('வருமானம்') || q.includes('वेतन') || q.includes('జీతం') || q.includes('ಸಂಬಳ') || q.includes('ശമ്പളം')) {
      const growth = roadmap?.potentialSalaryGrowth || '₹25,000 - ₹35,000 / month';
      const replies: Partial<Record<SupportedLanguage, string>> = {
        en: `By completing this pathway to ${goal}, you can achieve ${growth}. Skill India certificates ensure higher base wages.`,
        ta: `இந்த ${goal} பயிற்சியை முடிப்பதன் மூலம் நீங்கள் ${growth} வரை வருமானம் ஈட்ட முடியும். அரசு சான்றிதழ்கள் கூடுதல் ஊதியத்தை உறுதி செய்கின்றன.`,
        hi: `${goal} के इस मार्ग को पूरा करके आप ${growth} तक कमा सकते हैं। सरकारी प्रमाण पत्र बेहतर वेतन सुनिश्चित करते हैं।`,
        te: `ఈ ${goal} మార్గాన్ని పూర్తి చేయడం ద్వారా మీరు ${growth} వరకు సంపాదించవచ్చు. ప్రభుత్వ ధృవీకరణ పత్రాలు మెరుగైన వేతనాన్ని అందిస్తాయి.`,
        kn: `ಈ ${goal} ತರಬೇತಿಯನ್ನು ಪೂರ್ಣಗೊಳಿಸುವುದರಿಂದ ನೀವು ${growth} ವರೆಗೆ ಗಳಿಸಬಹುದು. ಸರ್ಕಾರಿ ಪ್ರಮಾಣಪತ್ರಗಳು ಉತ್ತಮ ವೇತನವನ್ನು ಖಚಿತಪಡಿಸುತ್ತವೆ.`,
        ml: `ഈ ${goal} പൂർത്തിയാക്കുന്നതിലൂടെ നിങ്ങൾക്ക് ${growth} വരെ നേടാനാകും. സർക്കാർ സർട്ടിഫിക്കറ്റുകൾ ഉയർന്ന വരുമാനം ഉറപ്പാക്കുന്നു.`
      };
      return {
        reply: replies[lang] || replies.en || '',
        suggestions: ['What should I learn next?', 'Explain my roadmap', 'Find opportunities']
      };
    }

    // 4. Default / Greeting response
    const greetings: Partial<Record<SupportedLanguage, string>> = {
      en: `Hello ${name}! I'm your Skill Bridge AI. You are aiming for ${goal}. How can I support your journey today?`,
      ta: `வணக்கம் ${name}! நான் உங்கள் ஸ்கில் பிரிட்ஜ் AI உதவியாளர். நீங்கள் ${goal} இலக்கை நோக்கி செல்கிறீர்கள். இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?`,
      hi: `नमस्ते ${name}! मैं आपका स्किल ब्रिज AI सहायक हूँ। आपका लक्ष्य ${goal} है। आज मैं आपकी क्या सहायता कर सकता हूँ?`,
      te: `నమస్కారం ${name}! నేను మీ స్కిల్ బ్రిడ్జ్ AI సహాయకుడిని. మీ లక్ష్యం ${goal}. ఈరోజు నేను మీకు ఎలా సహాయపడగలను?`,
      kn: `ನಮಸ್ಕಾರ ${name}! ನಾನು ನಿಮ್ಮ ಸ್ಕಿಲ್ ಬ್ರಿಡ್ಜ್ AI ಸಹಾಯಕ. ನಿಮ್ಮ ಗುರಿ ${goal}. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?`,
      ml: `നമസ്കാരം ${name}! ഞാൻ നിങ്ങളുടെ സ്കിൽ ബ്രിഡ്ജ് AI സഹായിയാണ്. നിങ്ങളുടെ ലക്ഷ്യം ${goal} ആണ്. ഇന്ന് ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കണം?`
    };

    return {
      reply: greetings[lang] || greetings.en || '',
      suggestions: [
        'What should I learn next?',
        'Explain my roadmap',
        'Find opportunities',
        'Change my career goal'
      ]
    };
  }
}
