import { GeneratedRoadmap, RoadmapStep, UserProfile, SupportedLanguage } from '@/types/skillbridge';
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
    const name = profile?.name ? profile.name.split(' ')[0] : 'Citizen';
    const goal = roadmap?.careerGoal || profile?.currentJob || 'Solar PV Specialist';

    // 1. Show Roadmap / Explain Roadmap
    if (
      q.includes('roadmap') || q.includes('path') || q.includes('வழிகாட்டி') || 
      q.includes('ரோட்மேப்') || q.includes('रोडमैप') || q.includes('मार्ग') ||
      q.includes('వివరించు') || q.includes('ದಾರಿ') || q.includes('പാത')
    ) {
      if (roadmap) {
        const step1Title = roadmap.steps[0]?.title || 'Step 1';
        return {
          reply: `You are on the pathway to ${roadmap.careerGoal}. Your roadmap has ${roadmap.steps.length} milestones over ${roadmap.estimatedTotalMonths}. Step 1 is "${step1Title}". Opening your roadmap now.`,
          suggestions: ['What should I learn next?', 'Find jobs near me', 'Show eligible schemes'],
          intentAction: 'NAV_ROADMAP'
        };
      }
      return {
        reply: `Let's generate your custom skill pathway. What career goal would you like to achieve?`,
        suggestions: ['Solar Technician', 'Fashion Boutique', 'Kisan Drone Pilot'],
        intentAction: 'NAV_ROADMAP'
      };
    }

    // 2. Find Jobs / Opportunities / Vacancies
    if (
      q.includes('job') || q.includes('work') || q.includes('opportunit') || q.includes('வேலை') || 
      q.includes('வாய்ப்பு') || q.includes('नौकरी') || q.includes('रोजगार') || 
      q.includes('ఉద్యోగం') || q.includes('ಕೆಲಸ') || q.includes('തൊഴിൽ')
    ) {
      return {
        reply: `I found nearby prototype opportunities matching your profile within ${profile?.travelRadius || '15 km'}, including SunPower Rooftop Solutions (₹22,000–₹28,000/mo). Taking you to Opportunities.`,
        suggestions: ['Apply to SunPower', 'Show training centers', 'Show my applications'],
        intentAction: 'NAV_OPPORTUNITIES'
      };
    }

    // 3. Show Training / Courses / What should I learn
    if (
      q.includes('training') || q.includes('course') || q.includes('learn') || q.includes('கற்க') || 
      q.includes('பயிற்சி') || q.includes('सीखें') || q.includes('ट्रेनिंग') || 
      q.includes('నేర్చుకోవాలి') || q.includes('ತರಬೇತಿ') || q.includes('പഠിക്കുക')
    ) {
      const nextStep = roadmap?.steps.find(s => !s.isCompleted) || roadmap?.steps[0];
      const stepName = nextStep ? nextStep.title : 'Foundational Domain Training';
      return {
        reply: `Your next recommended training is "${stepName}". We have a 100% free PM-AJAY sponsored batch at the Guindy District Skill Hub. Opening training view.`,
        suggestions: ['Enroll in training', 'Find jobs near me', 'Explain my roadmap'],
        intentAction: 'SHOW_TRAINING'
      };
    }

    // 4. Schemes & Caste Benefits
    if (
      q.includes('scheme') || q.includes('caste') || q.includes('grant') || q.includes('loan') || 
      q.includes('stipend') || q.includes('திட்டம்') || q.includes('योजना') || 
      q.includes('అనుదానం') || q.includes('ಯೋಜನೆ') || q.includes('പദ്ധതി')
    ) {
      const caste = profile?.caste || 'SC';
      return {
        reply: `As an ${caste} beneficiary, you are eligible for the PM-AJAY ₹50,000 Direct Capital Grant, PM Vishwakarma ₹15,000 free toolkit voucher, and NSFDC 4% micro-credit. Showing your Benefit Navigator.`,
        suggestions: ['Explain PM-AJAY grant', 'Show training', 'Find jobs near me'],
        intentAction: 'NAV_SCHEMES'
      };
    }

    // 5. Self Employment / Enterprise / Start Business
    if (
      q.includes('self employ') || q.includes('enterprise') || q.includes('business') || 
      q.includes('சுயதொழில்') || q.includes('வணிகம்') || q.includes('स्वरोजगार') || 
      q.includes('उद्योग') || q.includes('వ్యాపారం') || q.includes('ಸ್ವಉದ್ಯೋಗ')
    ) {
      return {
        reply: `Outstanding! Skill Bridge supports self-employment pathways with PM-AJAY ₹50,000 capital grants, zero-collateral Mudra loans, and verified equipment toolkits. Opening your Enterprise Hub.`,
        suggestions: ['Start My Enterprise', 'View setup checklist', 'Show grant schemes'],
        intentAction: 'OPEN_ENTERPRISE'
      };
    }

    // 6. Salary / Earnings / Income
    if (
      q.includes('salary') || q.includes('earn') || q.includes('income') || q.includes('money') || 
      q.includes('வருமானம்') || q.includes('ஊதியம்') || q.includes('वेतन') || 
      q.includes('कमाई') || q.includes('జీతం') || q.includes('ಸಂಬಳ')
    ) {
      const growth = roadmap?.potentialSalaryGrowth || '₹22,000 – ₹32,000 / month';
      return {
        reply: `By completing this certified pathway to ${goal}, candidates typically expand their monthly income to ${growth}. Government certification also unlocks preference in public contracting.`,
        suggestions: ['What should I learn next?', 'Find jobs near me', 'Show training']
      };
    }

    // 7. Next Step / What is my next best step?
    if (
      q.includes('next step') || q.includes('what should i do') || q.includes('அடுத்த படி') || 
      q.includes('अगला कदम') || q.includes('తదుపరి దశ') || q.includes('ಮುಂದಿನ ಹೆಜ್ಜೆ')
    ) {
      return {
        reply: `Your Next Best Step is to complete enrollment in the Suryamitra Solar Rooftop batch at the PM-AJAY District Skill Hub (8 seats remaining, 100% free with ₹2,000/mo stipend).`,
        suggestions: ['Enroll now', 'Find jobs near me', 'Show roadmap'],
        intentAction: 'SHOW_TRAINING'
      };
    }

    // 8. Applications / Interview Status
    if (
      q.includes('application') || q.includes('interview') || q.includes('status') || 
      q.includes('விண்ணப்பம்') || q.includes('आवेदन') || q.includes('ఇంటర్వ్యూ')
    ) {
      return {
        reply: `You have 1 active application: SunPower Clean Energy Ltd (Solar PV Rooftop Tech). Status: Interview Scheduled for 03 Oct. Opening your Placement Hub.`,
        suggestions: ['View interview details', 'Find other jobs', 'Back to Home'],
        intentAction: 'SHOW_APPLICATIONS'
      };
    }

    // 9. Home / Journey / Profile
    if (q.includes('home') || q.includes('journey') || q.includes('முகப்பு') || q.includes('होम')) {
      return {
        reply: `Navigating to your Beneficiary Journey Dashboard.`,
        intentAction: 'NAV_HOME'
      };
    }
    if (q.includes('profile') || q.includes('details') || q.includes('சுயவிவரம்') || q.includes('प्रोफाइल')) {
      return {
        reply: `Navigating to your Citizen Profile (${profile?.serialId || 'TN-32-101'}).`,
        intentAction: 'NAV_PROFILE'
      };
    }

    // 10. Default Greeting / Help
    return {
      reply: `Hello ${name}! I'm your Skill Bridge AI Assistant. You are currently aiming for ${goal}. You can say "Find jobs near me", "Show training", "Explain my roadmap", or "I want self employment". How may I guide you?`,
      suggestions: [
        'What is my next step?',
        'Find jobs near me',
        'Show training',
        'Schemes for my caste',
        'I want self employment'
      ]
    };
  }
}
