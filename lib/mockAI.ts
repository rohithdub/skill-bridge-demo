import { GeneratedRoadmap, RoadmapStep, UserProfile } from '@/types/skillbridge';
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
    roadmap?: GeneratedRoadmap
  ): { reply: string; suggestions?: string[] } {
    const q = query.toLowerCase();

    if (q.includes('explain') || q.includes('roadmap') || q.includes('path')) {
      if (roadmap) {
        return {
          reply: `You are on the path from ${roadmap.currentJob} to ${roadmap.careerGoal}. Your roadmap has ${roadmap.steps.length} focused steps over ${roadmap.estimatedTotalMonths}. Step 1 is "${roadmap.steps[0]?.title}". Would you like me to read the key skills for Step 1?`,
          suggestions: ['What should I learn next?', 'Show free government schemes', 'Change my career goal']
        };
      }
      return {
        reply: "Your roadmap connects your current experience to your dream role. You can view all your steps in the Skill Roadmap tab.",
        suggestions: ['What should I learn next?', 'Find a skill for me']
      };
    }

    if (q.includes('next') || q.includes('learn next') || q.includes('what to do')) {
      const nextStep = roadmap?.steps.find(s => !s.isCompleted) || roadmap?.steps[0];
      if (nextStep) {
        return {
          reply: `Next up: ${nextStep.title} (${nextStep.duration}). Focus on: ${nextStep.skills.join(', ')}. It qualifies for ${nextStep.freeGovtScheme || 'Skill India certification'}.`,
          suggestions: ['Explain my roadmap', 'Find opportunities', 'How much can I earn?']
        };
      }
      return {
        reply: "You're ready to explore foundational modules. Check Step 1 in your Roadmap tab!",
        suggestions: ['Explain my roadmap', 'Find a skill for me']
      };
    }

    if (q.includes('salary') || q.includes('earn') || q.includes('money') || q.includes('income')) {
      const earning = roadmap?.potentialSalaryGrowth || 'substantial income growth';
      return {
        reply: `By completing this pathway to ${roadmap?.careerGoal || 'your target goal'}, you can achieve ${earning}. Plus, government certificates ensure higher base wages.`,
        suggestions: ['What should I learn next?', 'Explain my roadmap', 'Find opportunities']
      };
    }

    if (q.includes('opportunity') || q.includes('job') || q.includes('hire') || q.includes('scheme')) {
      return {
        reply: `There are 4 active government-backed initiatives for ${roadmap?.careerGoal || 'your profile'}: PMKVY 4.0 free training, National Apprenticeship scheme with monthly stipend, and Mudra collateral-free loan support.`,
        suggestions: ['Explain my roadmap', 'What should I learn next?', 'Find a skill for me']
      };
    }

    if (q.includes('change') && (q.includes('goal') || q.includes('career'))) {
      return {
        reply: "You can change your career goal anytime! Tap the 'Change Goal' button on your Roadmap or tell me what other career excites you.",
        suggestions: ['Solar Technician', 'Software Developer', 'Agri-Tech Entrepreneur', 'Electrician']
      };
    }

    // Default friendly AI response
    const name = profile?.name ? profile.name.split(' ')[0] : 'friend';
    return {
      reply: `Hello ${name}! I'm your Skill Bridge AI. You are aiming for ${roadmap?.careerGoal || 'a brighter career'}. How can I support your journey today?`,
      suggestions: [
        'What should I learn next?',
        'Explain my roadmap',
        'Find opportunities',
        'Change my career goal'
      ]
    };
  }
}
