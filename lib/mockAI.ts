import { GeneratedRoadmap, RoadmapStep, UserProfile, SupportedLanguage } from '@/types/skillbridge';
import { normalizeSkills } from '@/lib/normalizeProfile';
import { PREDEFINED_PATHWAYS, PredefinedPathway } from './roadmapData';

export type VoiceIntentAction = 
  | 'NAV_HOME'
  | 'NAV_ROADMAP' 
  | 'NAV_OPPORTUNITIES' 
  | 'NAV_SCHEMES' 
  | 'NAV_PROFILE'
  | 'SHOW_TRAINING'
  | 'OPEN_ENTERPRISE'
  | 'SHOW_APPLICATIONS';

export interface VoiceAssistantResult {
  reply: string;
  suggestions?: string[];
  intentAction?: VoiceIntentAction;
}

/**
 * MockAIService
 * 
 * Provides simulated AI cognitive reasoning & voice intent processing for Skill Bridge.
 * Clean architectural boundary: in production, these methods map to LLM / ASR / TTS endpoints.
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
    const userSkills = normalizeSkills(profile.skills);
    const userSkillsMention = userSkills.length > 0 
      ? ` Leveraging your stated strengths in ${userSkills.join(' and ')}, you will absorb technical concepts rapidly.` 
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
    const userSkills = normalizeSkills(profile.skills);
    const skillsList = userSkills.length > 0 ? userSkills : ['Practical work experience', 'Communication'];

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
      alignment: 'National Skill Development Corporation (NSDC) & PM-AJAY Aligned',
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
          title: `Core Technical Specialization`,
          duration: '4–6 weeks',
          badge: 'Core Skill',
          description: `Deep-dive practical modules in ${goal} methodologies and modern diagnostic tools.`,
          skills: ['Specialized Operations', 'Fault Finding', 'Quality Maintenance'],
          trainingType: 'Domain Skill',
          freeGovtScheme: 'PM-AJAY Fully Funded Skill Hub Batch',
          isCompleted: false
        },
        {
          id: 'step-3',
          stepNumber: 3,
          title: `Hands-on Practical Lab & Field Project`,
          duration: '4 weeks',
          badge: 'Hands-on Lab',
          description: `Apply your learning in supervised workshop settings with industry-grade tools.`,
          skills: ['Tool Mastery', 'Independent Execution', 'Field Troubleshooting'],
          trainingType: 'Hands-on Lab',
          freeGovtScheme: 'PMKVY 4.0 Lab Equipment Subsidy',
          isCompleted: false
        },
        {
          id: 'step-4',
          stepNumber: 4,
          title: `National Assessment & Certification`,
          duration: '2 weeks',
          badge: 'Govt Certification',
          description: `Take official NSDC / Sector Skill Council assessment to earn your recognized qualification.`,
          skills: ['National Assessment Standards', 'Documentation', 'Regulatory Compliance'],
          trainingType: 'Govt Certification',
          certification: `Skill India Certified ${goal}`,
          isCompleted: false
        },
        {
          id: 'step-5',
          stepNumber: 5,
          title: `Career Launch: ${profile.employmentPreference === 'Self-employment' ? 'Independent Enterprise' : 'Industry Placement'}`,
          duration: '4–8 weeks',
          badge: 'Launch',
          description: profile.employmentPreference === 'Self-employment'
            ? `Register your micro-enterprise, access government subsidized capital (PM-AJAY ₹50,000 / Mudra), and secure first clients.`
            : `Interview with verified employers on the National Career Service (NCS) portal for full-time roles.`,
          skills: ['Client Acquisition', 'Professional Invoicing', 'Long-term Growth'],
          trainingType: profile.employmentPreference === 'Self-employment' ? 'Self-Employment Launch' : 'Industry Placement',
          freeGovtScheme: profile.employmentPreference === 'Self-employment' ? 'PM-AJAY Capital Subsidy / Mudra' : 'National Career Service (NCS)',
          isCompleted: false
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
        finalStep.description = `Register as an MSME, tap into PM-AJAY ₹50,000 grant / Mudra seed capital, and launch independent services.`;
        finalStep.freeGovtScheme = 'PM-AJAY Capital Subsidy (Up to ₹50,000 Zero Repayment)';
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
   * Deterministic Intent Engine:
   * Maps voice and text input across languages to application actions and responses.
   */
  public static simulateVoiceResponse(
    query: string,
    profile?: UserProfile,
    roadmap?: GeneratedRoadmap,
    lang: SupportedLanguage = 'en'
  ): VoiceAssistantResult {
    const q = query.toLowerCase().trim();
    const name = profile?.name ? profile.name.split(' ')[0] : (lang === 'ta' ? 'பயனாளி' : lang === 'hi' ? 'साथी' : lang === 'te' ? 'మిత్రమా' : 'Citizen');
    const goal = roadmap?.careerGoal || profile?.currentJob || 'Solar PV Specialist';
    const caste = profile?.caste || 'SC';
    const growth = roadmap?.potentialSalaryGrowth || '₹22,000 – ₹32,000 / month';

    // 1. Show Roadmap / Explain Roadmap
    if (
      q.includes('roadmap') || q.includes('path') || q.includes('வழிகாட்டி') || 
      q.includes('ரோட்மேப்') || q.includes('रोडमैप') || q.includes('मार्ग') ||
      q.includes('వివరించు') || q.includes('ದಾರಿ') || q.includes('പാത') ||
      q.includes('রেশন') || q.includes('রক্ষা')
    ) {
      if (roadmap) {
        const step1Title = roadmap.steps[0]?.title || 'Step 1';
        let reply = `You are on the pathway to ${roadmap.careerGoal}. Your roadmap has ${roadmap.steps.length} milestones over ${roadmap.estimatedTotalMonths}. Step 1 is "${step1Title}". Opening your roadmap now.`;
        if (lang === 'ta') {
          reply = `நீங்கள் ${roadmap.careerGoal} வேலைக்கான பாதையில் உள்ளீர்கள். உங்கள் வழிகாட்டியில் ${roadmap.steps.length} மைல்கற்கள் உள்ளன. முதல் மைல்கல் "${step1Title}". உங்கள் வழிகாட்டியை இப்போது திறக்கிறேன்.`;
        } else if (lang === 'hi') {
          reply = `आप ${roadmap.careerGoal} के करियर मार्ग पर हैं। आपके रोडमैप में ${roadmap.steps.length} महत्वपूर्ण चरण हैं। पहला कदम "${step1Title}" है। आपका रोडमैप खोल रहा हूँ।`;
        } else if (lang === 'te') {
          reply = `మీరు ${roadmap.careerGoal} కెరీర్ మార్గంలో ఉన్నారు. మీ రోడ్‌మ్యాప్‌లో ${roadmap.steps.length} మైలురాళ్లు ఉన్నాయి. మొదటి దశ "${step1Title}". మీ రోడ్‌మ్యాప్‌ను ఇప్పుడు తెరుస్తున్నాను.`;
        } else if (lang === 'kn') {
          reply = `ನೀವು ${roadmap.careerGoal} ಮಾರ್ಗದಲ್ಲಿದ್ದೀರಿ. ನಿಮ್ಮ ಮಾರ್ಗಸೂಚಿಯಲ್ಲಿ ${roadmap.steps.length} ಹಂತಗಳಿವೆ. ಮೊದಲ ಹಂತ "${step1Title}". ನಿಮ್ಮ ಮಾರ್ಗಸೂಚಿಯನ್ನು ತೆರೆಯಲಾಗುತ್ತಿದೆ.`;
        } else if (lang === 'ml') {
          reply = `നിങ്ങൾ ${roadmap.careerGoal} ലക്ഷ്യത്തിലേക്കുള്ള പാതയിലാണ്. നിങ്ങളുടെ റോഡ്മാപ്പിൽ ${roadmap.steps.length} ഘട്ടങ്ങളുണ്ട്. ആദ്യ ഘട്ടം "${step1Title}". നിങ്ങളുടെ റോഡ്മാപ്പ് തുറക്കുന്നു.`;
        } else if (lang === 'bn') {
          reply = `আপনি ${roadmap.careerGoal} এর পথে রয়েছেন। আপনার রোডম্যাপে ${roadmap.steps.length} টি মাইলফলক রয়েছে। আপনার রোডম্যাপ খুলছি।`;
        }
        return {
          reply,
          suggestions: lang === 'ta' ? ['அடுத்த பயிற்சி என்ன?', 'அருகிலுள்ள வேலைகள்', 'நலத்திட்டங்கள்'] : ['What should I learn next?', 'Find jobs near me', 'Show eligible schemes'],
          intentAction: 'NAV_ROADMAP'
        };
      }
      return {
        reply: lang === 'ta' ? `உங்கள் தனிப்பயன் திறன் வழிகாட்டியை உருவாக்குவோம். உங்கள் வேலை இலக்கு என்ன?` : `Let's generate your custom skill pathway. What career goal would you like to achieve?`,
        suggestions: ['Solar Technician', 'Fashion Boutique', 'Kisan Drone Pilot'],
        intentAction: 'NAV_ROADMAP'
      };
    }

    // 2. Find Jobs / Opportunities / Vacancies
    if (
      q.includes('job') || q.includes('work') || q.includes('opportunit') || q.includes('வேலை') || 
      q.includes('வாய்ப்பு') || q.includes('नौकरी') || q.includes('रोजगार') || 
      q.includes('ఉద్యోగం') || q.includes('ಕೆಲಸ') || q.includes('തൊഴിൽ') ||
      q.includes('চাকরি') || q.includes('কাজ')
    ) {
      let reply = `I found nearby prototype opportunities matching your profile within ${profile?.travelRadius || '15 km'}, including SunPower Rooftop Solutions (₹22,000–₹28,000/mo). Taking you to Opportunities.`;
      if (lang === 'ta') {
        reply = `உங்கள் இருப்பிடத்திலிருந்து ${profile?.travelRadius || '15 km'} சுற்றளவில் சன்பவர் ரூப்டாப் சொல்யூஷன்ஸ் (மாதம் ₹22,000–₹28,000) உட்பட பொருத்தமான வேலை வாய்ப்புகள் உள்ளன. வேலைகள் பகுதிக்கு அழைத்துச் செல்கிறேன்.`;
      } else if (lang === 'hi') {
        reply = `मुझे आपके क्षेत्र में ${profile?.travelRadius || '15 km'} के भीतर सनपावर सहित उपयुक्त रोजगार अवसर मिले हैं (₹22,000–₹28,000/माह)। अवसर पृष्ठ पर ले जा रहा हूँ।`;
      } else if (lang === 'te') {
        reply = `మీ ప్రాంతంలో ${profile?.travelRadius || '15 km'} పరిధిలో సన్‌పవర్‌తో సహా సరిపోయే ఉద్యోగ అవకాశాలు ఉన్నాయి (₹22,000–₹28,000/నెల). అవకాశాల పేజీకి తీసుకువెళుతున్నాను.`;
      } else if (lang === 'kn') {
        reply = `ನಿಮ್ಮ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ${profile?.travelRadius || '15 km'} ಒಳಗೆ ಸೂಕ್ತ ಉದ್ಯೋಗಾವಕಾಶಗಳಿವೆ. ಉದ್ಯೋಗಗಳ ವಿಭಾಗಕ್ಕೆ ಕರೆದೊಯ್ಯುತ್ತಿದ್ದೇನೆ.`;
      } else if (lang === 'ml') {
        reply = `നിങ്ങളുടെ പ്രദേശത്ത് ${profile?.travelRadius || '15 km'} ചുറ്റളവിൽ അനുയോജ്യമായ തൊഴിലവസരങ്ങൾ കണ്ടെത്തി. അവസരങ്ങളുടെ പേജിലേക്ക് കൊണ്ടുപോകുന്നു.`;
      } else if (lang === 'bn') {
        reply = `আপনার এলাকার ${profile?.travelRadius || '15 km'} মধ্যে উপযুক্ত কাজের সুযোগ পাওয়া গেছে। সুযোগের পেজে নিয়ে যাচ্ছি।`;
      }
      return {
        reply,
        suggestions: ['Apply to SunPower', 'Show training centers', 'Show my applications'],
        intentAction: 'NAV_OPPORTUNITIES'
      };
    }

    // 3. Show Training / Courses / What should I learn
    if (
      q.includes('training') || q.includes('course') || q.includes('learn') || q.includes('கற்க') || 
      q.includes('பயிற்சி') || q.includes('सीखें') || q.includes('ट्रेनिंग') || 
      q.includes('నేర్చుకోవాలి') || q.includes('ತರಬೇತಿ') || q.includes('പഠിക്കുക') ||
      q.includes('প্রশিক্ষণ')
    ) {
      const nextStep = roadmap?.steps.find(s => !s.isCompleted) || roadmap?.steps[0];
      const stepName = nextStep ? nextStep.title : 'Foundational Domain Training';
      let reply = `Your next recommended training is "${stepName}". We have a 100% free PM-AJAY sponsored batch at the Guindy District Skill Hub. Opening training view.`;
      if (lang === 'ta') {
        reply = `உங்கள் அடுத்த பரிந்துரைக்கப்பட்ட பயிற்சி "${stepName}". மாவட்ட திறன் மையத்தில் 100% இலவச பிஎம்-அஜய் பயிற்சி தொகுதி உள்ளது. பயிற்சி பக்கத்தைத் திறக்கிறேன்.`;
      } else if (lang === 'hi') {
        reply = `आपका अगला अनुशंसित प्रशिक्षण "${stepName}" है। जिला कौशल केंद्र में 100% निःशुल्क पीएम-अजय बैच उपलब्ध है। प्रशिक्षण पृष्ठ खोल रहा हूँ।`;
      } else if (lang === 'te') {
        reply = `మీ తదుపరి సిఫార్సు చేసిన శిక్షణ "${stepName}". జిల్లా స్కిల్ హబ్‌లో 100% ఉచిత PM-AJAY బ్యాచ్ ఉంది. శిక్షణ పేజీని తెరుస్తున్నాను.`;
      } else if (lang === 'kn') {
        reply = `ನಿಮ್ಮ ಮುಂದಿನ ತರಬೇತಿ "${stepName}". ಕೌಶಲ್ಯ ಕೇಂದ್ರದಲ್ಲಿ 100% ಉಚಿತ PM-AJAY ಬ್ಯಾಚ್ ಲಭ್ಯವಿದೆ. ತರಬೇತಿ ಪುಟ ತೆರೆಯಲಾಗುತ್ತಿದೆ.`;
      } else if (lang === 'ml') {
        reply = `നിങ്ങളുടെ അടുത്ത പരിശീലനം "${stepName}" ആണ്. സൗജന്യ PM-AJAY ബാച്ച് ലഭ്യമാണ്. പരിശീലന പേജ് തുറക്കുന്നു.`;
      }
      return {
        reply,
        suggestions: ['Enroll in training', 'Find jobs near me', 'Explain my roadmap'],
        intentAction: 'SHOW_TRAINING'
      };
    }

    // 4. Schemes & Caste Benefits
    if (
      q.includes('scheme') || q.includes('caste') || q.includes('grant') || q.includes('loan') || 
      q.includes('stipend') || q.includes('திட்டம்') || q.includes('योजना') || 
      q.includes('అనుదానం') || q.includes('ಯೋಜನೆ') || q.includes('പദ്ധതി') ||
      q.includes('প্রকল্প') || q.includes('অনুদান')
    ) {
      let reply = `As an ${caste} beneficiary, you are eligible for the PM-AJAY ₹50,000 Direct Capital Grant, PM Vishwakarma ₹15,000 free toolkit voucher, and NSFDC 4% micro-credit. Showing your Benefit Navigator.`;
      if (lang === 'ta') {
        reply = `${caste} பயனாளியாக, நீங்கள் பிஎம்-அஜய் ₹50,000 நேரடி மூலதன மானியம், பிஎம் விஸ்வகர்மா ₹15,000 கருவி வவுச்சர் மற்றும் குறைந்த வட்டி கடன் பெற தகுதியுடையவர். திட்டங்களைக் காட்டுகிறேன்.`;
      } else if (lang === 'hi') {
        reply = `${caste} लाभार्थी के रूप में, आप पीएम-अजय ₹50,000 प्रत्यक्ष पूंजी अनुदान, पीएम विश्वकर्मा ₹15,000 टूलकिट वाउचर और 4% ब्याज पर ऋण के पात्र हैं। योजनाएं दिखा रहा हूँ।`;
      } else if (lang === 'te') {
        reply = `${caste} లబ్ధిదారుగా, మీరు PM-AJAY ₹50,000 గ్రాంట్, PM విశ్వకర్మ ₹15,000 టూల్‌కిట్ వోచర్ మరియు సబ్సిడీ రుణానికి అర్హులు. పథకాలను చూపిస్తున్నాను.`;
      } else if (lang === 'kn') {
        reply = `${caste} ಫಲಾನುಭವಿಯಾಗಿ, ನೀವು PM-AJAY ₹50,000 ಬಂಡವಾಳ ಅನುದಾನ ಮತ್ತು PM ವಿಶ್ವಕರ್ಮ ₹15,000 ಟೂಲ್‌ಕಿಟ್‌ಗೆ ಅರ್ಹರಾಗಿದ್ದೀರಿ. ಯೋಜನೆಗಳನ್ನು ತೋರಿಸುತ್ತಿದ್ದೇನೆ.`;
      } else if (lang === 'ml') {
        reply = `${caste} ഗുണഭോക്താവെന്ന നിലയിൽ, നിങ്ങൾക്ക് PM-AJAY ₹50,000 ഗ്രാന്റും PM വിശ്വകർമ ₹15,000 കിറ്റും ലഭിക്കാൻ അർഹതയുണ്ട്. പദ്ധതികൾ കാണിക്കുന്നു.`;
      }
      return {
        reply,
        suggestions: ['Explain PM-AJAY grant', 'Show training', 'Find jobs near me'],
        intentAction: 'NAV_SCHEMES'
      };
    }

    // 5. Self Employment / Enterprise / Start Business
    if (
      q.includes('self employ') || q.includes('enterprise') || q.includes('business') || 
      q.includes('சுயதொழில்') || q.includes('வணிகம்') || q.includes('स्वरोजगार') || 
      q.includes('उद्योग') || q.includes('వ్యాపారం') || q.includes('ಸ್ವಉದ್ಯೋಗ') ||
      q.includes('ব্যবসা')
    ) {
      let reply = `Outstanding! Skill Bridge supports self-employment pathways with PM-AJAY ₹50,000 capital grants, zero-collateral Mudra loans, and verified equipment toolkits. Opening your Enterprise Hub.`;
      if (lang === 'ta') {
        reply = `சிறப்பானது! ஸ்கில் பிரிட்ஜ் சுயதொழில் தொடங்குவோருக்கு பிஎம்-அஜய் ₹50,000 மூலதன மானியம் மற்றும் முத்ரா கடன் வசதியை வழங்குகிறது. உங்கள் தொழில் மையத்தைத் திறக்கிறேன்.`;
      } else if (lang === 'hi') {
        reply = `शानदार! स्किल ब्रिज स्वरोजगार के लिए पीएम-अजय ₹50,000 पूंजी अनुदान और मुद्रा ऋण सहायता प्रदान करता है। आपका एंटरप्राइज हब खोल रहा हूँ।`;
      } else if (lang === 'te') {
        reply = `అద్భుతం! స్కిల్ బ్రిడ్జ్ స్వయం ఉపాధి కోసం PM-AJAY ₹50,000 గ్రాంట్ మరియు ముద్రా రుణాలను అందిస్తుంది. మీ ఎంటర్‌ప్రైజ్ హబ్‌ను తెరుస్తున్నాను.`;
      } else if (lang === 'kn') {
        reply = `ಉತ್ತಮ! ಸ್ಕಿಲ್ ಬ್ರಿಡ್ಜ್ ಸ್ವಯಂ ಉದ್ಯೋಗಕ್ಕಾಗಿ PM-AJAY 50,000 ರೂ. ಅನುದಾನ ಮತ್ತು ಮುದ್ರಾ ಸಾಲಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ. ಎಂಟರ್‌ಪ್ರೈಸ್ ಹಬ್ ತೆರೆಯಲಾಗುತ್ತಿದೆ.`;
      } else if (lang === 'ml') {
        reply = `മികച്ചത്! സ്വയംതൊഴിലിനായി PM-AJAY ₹50,000 ഗ്രാന്റും മുദ്ര വായ്പയും ലഭ്യമാണ്. സംരംഭക ഹബ് തുറക്കുന്നു.`;
      }
      return {
        reply,
        suggestions: ['Start My Enterprise', 'View setup checklist', 'Show grant schemes'],
        intentAction: 'OPEN_ENTERPRISE'
      };
    }

    // 6. Salary / Earnings / Income
    if (
      q.includes('salary') || q.includes('earn') || q.includes('income') || q.includes('money') || 
      q.includes('வருமானம்') || q.includes('ஊதியம்') || q.includes('वेतन') || 
      q.includes('कमाई') || q.includes('జీతం') || q.includes('ಸಂಬಳ') ||
      q.includes('বেতন') || q.includes('টাকা')
    ) {
      let reply = `By completing this certified pathway to ${goal}, candidates typically expand their monthly income to ${growth}. Government certification also unlocks preference in public contracting.`;
      if (lang === 'ta') {
        reply = `இந்த ${goal} சான்றிதழ் பாதையை முடிப்பதன் மூலம், உங்கள் மாத வருமானம் ${growth} வரை உயர வாய்ப்புள்ளது. அரசு சான்றிதழ் மூலம் ஒப்பந்த முன்னுரிமையும் கிடைக்கும்.`;
      } else if (lang === 'hi') {
        reply = `${goal} के इस प्रमाणित मार्ग को पूरा करने से उम्मीदवार अपनी मासिक आय को ${growth} तक बढ़ा सकते हैं। सरकारी प्रमाणन सार्वजनिक कार्यों में प्राथमिकता भी दिलाता है।`;
      } else if (lang === 'te') {
        reply = `${goal} సర్టిఫైడ్ మార్గాన్ని పూర్తి చేయడం ద్వారా మీ నెలవారీ ఆదాయం ${growth} వరకు పెరగవచ్చు.`;
      } else if (lang === 'kn') {
        reply = `${goal} ಪ್ರಮಾಣೀಕೃತ ಮಾರ್ಗವನ್ನು ಪೂರ್ಣಗೊಳಿಸುವುದರಿಂದ ನಿಮ್ಮ ಮಾಸಿಕ ಆದಾಯ ${growth} ಗೆ ತಲುಪಬಹುದು.`;
      } else if (lang === 'ml') {
        reply = `${goal} പരിശീലനം പൂർത്തിയാക്കുന്നതിലൂടെ നിങ്ങളുടെ പ്രതിമാസ വരുമാനം ${growth} വരെ വർദ്ധിക്കാം.`;
      }
      return {
        reply,
        suggestions: ['What should I learn next?', 'Find jobs near me', 'Show training']
      };
    }

    // 7. Next Step / What is my next best step?
    if (
      q.includes('next step') || q.includes('what should i do') || q.includes('அடுத்த படி') || 
      q.includes('अगला कदम') || q.includes('తదుపరి దశ') || q.includes('ಮುಂದಿನ ಹೆಜ್ಜೆ') ||
      q.includes('পরবর্তী পদক্ষেপ')
    ) {
      let reply = `Your Next Best Step is to complete enrollment in the Suryamitra Solar Rooftop batch at the PM-AJAY District Skill Hub (8 seats remaining, 100% free with ₹2,000/mo stipend).`;
      if (lang === 'ta') {
        reply = `உங்கள் அடுத்த சிறந்த படி, பிஎம்-அஜய் மாவட்ட திறன் மையத்தில் சூர்யமித்ரா சோலார் பயிற்சியில் சேர்வதாகும். 8 இடங்கள் மட்டுமே உள்ளன (ரூ.2,000 மாதாந்திர உதவித்தொகையுடன் 100% இலவசம்).`;
      } else if (lang === 'hi') {
        reply = `आपका अगला सबसे अच्छा कदम जिला कौशल केंद्र में सूर्यमित्रा सौर प्रशिक्षण बैच में नामांकन पूरा करना है (8 सीटें शेष, ₹2,000/माह वजीफे के साथ 100% निःशुल्क)।`;
      } else if (lang === 'te') {
        reply = `మీ తదుపరి ఉత్తమ దశ జిల్లా స్కిల్ హబ్‌లో సూర్యమిత్ర సోలార్ బ్యాచ్‌లో ప్రవేశం పొందడం (8 సీట్లు మాత్రమే మిగిలి ఉన్నాయి, 100% ఉచితం).`;
      } else if (lang === 'kn') {
        reply = `ನಿಮ್ಮ ಮುಂದಿನ ಅತ್ಯುತ್ತಮ ಹೆಜ್ಜೆ ಸೌರ ತರಬೇತಿ ಬ್ಯಾಚ್‌ಗೆ ನೋಂದಾಯಿಸಿಕೊಳ್ಳುವುದು (8 ಸೀಟುಗಳು ಉಳಿದಿವೆ, 100% ಉಚಿತ).`;
      } else if (lang === 'ml') {
        reply = `നിങ്ങളുടെ അടുത്ത മികച്ച പടി സൗജന്യ സൗരോർജ്ജ പരിശീലനത്തിൽ ചേരുക എന്നതാണ് (8 സീറ്റുകൾ ബാക്കി).`;
      }
      return {
        reply,
        suggestions: ['Enroll now', 'Find jobs near me', 'Show roadmap'],
        intentAction: 'SHOW_TRAINING'
      };
    }

    // 8. Applications / Interview Status
    if (
      q.includes('application') || q.includes('interview') || q.includes('status') || 
      q.includes('விண்ணப்பம்') || q.includes('आवेदन') || q.includes('ఇంటర్వ్యూ') ||
      q.includes('আবেদন')
    ) {
      let reply = `You have 1 active application: SunPower Clean Energy Ltd (Solar PV Rooftop Tech). Status: Interview Scheduled for 03 Oct. Opening your Placement Hub.`;
      if (lang === 'ta') {
        reply = `உங்களிடம் 1 தீவிர விண்ணப்பம் உள்ளது: சன்பவர் கிளீன் எனர்ஜி. நிலை: அக்டோபர் 03 அன்று நேர்காணல் திட்டமிடப்பட்டுள்ளது. வேலைவாய்ப்பு மையத்தைத் திறக்கிறேன்.`;
      } else if (lang === 'hi') {
        reply = `आपका 1 सक्रिय आवेदन है: सनपावर क्लीन एनर्जी। स्थिति: 03 अक्टूबर को साक्षात्कार निर्धारित है। प्लेसमेंट हब खोल रहा हूँ।`;
      } else if (lang === 'te') {
        reply = `మీకు 1 దరఖాస్తు ఉంది: సన్‌పవర్ క్లీన్ ఎనర్జీ. స్థితి: అక్టోబర్ 03న ఇంటర్వ్యూ నిర్ణయించబడింది.`;
      }
      return {
        reply,
        suggestions: ['View interview details', 'Find other jobs', 'Back to Home'],
        intentAction: 'SHOW_APPLICATIONS'
      };
    }

    // 9. Home / Journey / Profile
    if (q.includes('home') || q.includes('journey') || q.includes('முகப்பு') || q.includes('होम') || q.includes('বাড়ি')) {
      return {
        reply: lang === 'ta' ? `உங்கள் பயனாளி முகப்புப் பக்கத்திற்குச் செல்கிறது.` : (lang === 'hi' ? `आपके लाभार्थी होम पेज पर जा रहे हैं।` : `Navigating to your Beneficiary Journey Dashboard.`),
        intentAction: 'NAV_HOME'
      };
    }
    if (q.includes('profile') || q.includes('details') || q.includes('சுயவிவரம்') || q.includes('प्रोफाइल') || q.includes('প্রোফাইল')) {
      return {
        reply: lang === 'ta' ? `உங்கள் குடிமக்கள் சுயவிவரத்திற்குச் செல்கிறது (${profile?.serialId || 'TN-32-101'}).` : (lang === 'hi' ? `आपकी प्रोफ़ाइल पर जा रहे हैं (${profile?.serialId || 'TN-32-101'})।` : `Navigating to your Citizen Profile (${profile?.serialId || 'TN-32-101'}).`),
        intentAction: 'NAV_PROFILE'
      };
    }

    // 10. Default Greeting / Help
    let defaultReply = `Hello ${name}! I'm your Skill Bridge AI Assistant. You are currently aiming for ${goal}. You can say "Find jobs near me", "Show training", "Explain my roadmap", or "I want self employment". How may I guide you?`;
    if (lang === 'ta') {
      defaultReply = `வணக்கம் ${name}! நான் உங்கள் ஸ்கில் பிரிட்ஜ் AI உதவியாளர். நீங்கள் ${goal} இலக்கை நோக்கி பயணிக்கிறீர்கள். "வேலை வாய்ப்புகளைக் காட்டு", "பயிற்சிகளைக் காட்டு" அல்லது "எனது வழிகாட்டியை விளக்கு" என்று நீங்கள் கேட்கலாம். நான் எவ்வாறு உதவட்டும்?`;
    } else if (lang === 'hi') {
      defaultReply = `नमस्ते ${name}! मैं आपका स्किल ब्रिज एआई सहायक हूँ। आप वर्तमान में ${goal} के लक्ष्य पर काम कर रहे हैं। आप "नौकरियां खोजें", "प्रशिक्षण दिखाएं" या "रोडमैप समझाएं" बोल सकते हैं। मैं आपकी क्या मदद करूँ?`;
    } else if (lang === 'te') {
      defaultReply = `నమస్కారం ${name}! నేను మీ స్కిల్ బ్రిడ్జ్ AI అసిస్టెంట్‌ని. మీరు ప్రస్తుతం ${goal} లక్ష్యం దిశగా ఉన్నారు. "ఉద్యోగాలు వెతుకు", "శిక్షణ చూపించు" లేదా "రోడ్‌మ్యాప్ వివరించు" అని చెప్పవచ్చు. నేను మీకు ఎలా సహాయపడగలను?`;
    } else if (lang === 'kn') {
      defaultReply = `ನಮಸ್ಕಾರ ${name}! ನಾನು ನಿಮ್ಮ ಸ್ಕಿಲ್ ಬ್ರಿಡ್ಜ್ AI ಸಹಾಯಕ. ನೀವು ${goal} ಗುರಿಯತ್ತ ಸಾಗುತ್ತಿದ್ದೀರಿ. "ಕೆಲಸ ಹುಡುಕಿ", "ತರಬೇತಿ ತೋರಿಸಿ" ಎಂದು ಕೇಳಬಹುದು. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?`;
    } else if (lang === 'ml') {
      defaultReply = `നമസ്കാരം ${name}! ഞാൻ നിങ്ങളുടെ സ്കിൽ ബ്രിഡ്ജ് AI അസിസ്റ്റന്റാണ്. നിങ്ങൾ ${goal} ലക്ഷ്യമാക്കുന്നു. "ജോലികൾ കണ്ടെത്തുക", "പരിശീലനം കാണിക്കുക" എന്ന് പറയാം. ഞാൻ എങ്ങനെ സഹായിക്കണം?`;
    } else if (lang === 'bn') {
      defaultReply = `নমস্কার ${name}! আমি আপনার স্কিল ব্রিজ এআই সহকারী। আপনি বর্তমানে ${goal} এর লক্ষ্যে এগিয়ে চলেছেন। "চাকরি খুঁজুন", "প্রশিক্ষণ দেখান" বলতে পারেন। আপনাকে কীভাবে সাহায্য করতে পারি?`;
    }

    return {
      reply: defaultReply,
      suggestions: lang === 'ta'
        ? ['அடுத்த படி என்ன?', 'அருகிலுள்ள வேலைகள்', 'பயிற்சிகள் காட்டு', 'நலத்திட்டங்கள்', 'சுயதொழில்']
        : lang === 'hi'
        ? ['अगला कदम क्या है?', 'पास की नौकरियां', 'प्रशिक्षण दिखाएं', 'सरकारी योजनाएं', 'स्वरोजगार']
        : [
            'What is my next step?',
            'Find jobs near me',
            'Show training',
            'Schemes for my caste',
            'I want self employment'
          ]
    };
  }
}
