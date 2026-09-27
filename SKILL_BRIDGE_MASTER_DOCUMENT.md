# SKILL BRIDGE 🌉 — Comprehensive Master Document (A to Z)

> **"An AI-Powered Cognitive Bridge to Empowerment"**  
> *Smart India Hackathon (SIH) Prototype*  
> **Repository:** `rohithdub/skill-bridge-demo`  
> **Architectural Version:** v1.0 Production Prototype  
> **Date of Documentation:** September 2026

---

## Table of Contents
1. [Executive Summary & Core Mission](#1-executive-summary--core-mission)
2. [Target Demographics & Societal Problem Solved](#2-target-demographics--societal-problem-solved)
3. [Core Architectural Philosophy](#3-core-architectural-philosophy)
4. [Complete Technology Stack & Dependencies](#4-complete-technology-stack--dependencies)
5. [Global Design System & UI/UX Aesthetics](#5-global-design-system--uiux-aesthetics)
6. [Complete Screen-by-Screen User Journey (From A to Z)](#6-complete-screen-by-screen-user-journey-from-a-to-z)
   - [Screen 1: Splash Screen & Brand Identity](#screen-1-splash-screen--brand-identity)
   - [Screen 2: Multi-Lingual Language Selector (13 Indian Languages)](#screen-2-multi-lingual-language-selector-13-indian-languages)
   - [Screen 3: Frictionless Mobile Entry & Automated OTP Simulation](#screen-3-frictionless-mobile-entry--automated-otp-simulation)
   - [Screen 4–10: 10-Step AI Conversational Voice Onboarding](#screen-410-10-step-ai-conversational-voice-onboarding)
   - [Screens 11 & 12: Profile Summary & Cognitive AI Confirmation](#screens-11--12-profile-summary--cognitive-ai-confirmation)
   - [Screen 13: Future Career Goal Input & Voice Discovery](#screen-13-future-career-goal-input--voice-discovery)
   - [Screen 14: Skill Roadmap & Transferable Skills Matrix](#screen-14-skill-roadmap--transferable-skills-matrix)
   - [Screen 15: Government Schemes Tab (Caste & Community-Tailored)](#screen-15-government-schemes-tab-caste--community-tailored)
   - [Screen 16: Voice Assistant Interactive Tab](#screen-16-voice-assistant-interactive-tab)
   - [Screen 17: Citizen Profile & Identity Card Tab](#screen-17-citizen-profile--identity-card-tab)
   - [Screen 18 & 19: Officer / Supervisor Admin Portal & Standalone Route](#screen-18--19-officer--supervisor-admin-portal--standalone-route)
7. [Sub-Systems & Intelligent Engines Deep-Dive](#7-sub-systems--intelligent-engines-deep-dive)
   - [A. Cognitive Reasoning Engine (`MockAIService`)](#a-cognitive-reasoning-engine-mockaiservice)
   - [B. Dual-Layer Speech Engine (`SpeechService` & `/api/tts`)](#b-dual-layer-speech-engine-speechservice--apitts)
   - [C. Sovereign Government Schemes Directory (`schemesData.ts`)](#c-sovereign-government-schemes-directory-schemesdatats)
   - [D. Administrative Store & Data Synchronization (`AdminStore`)](#d-administrative-store--data-synchronization-adminstore)
   - [E. Localization & Translation Engine (`translations.ts`)](#e-localization--translation-engine-translationsts)
   - [F. Global State & Persistence Layer (`SkillBridgeContext`)](#f-global-state--persistence-layer-skillbridgecontext)
8. [Comprehensive File & Component Inventory](#8-comprehensive-file--component-inventory)
9. [SIH Hackathon Presentation Features & Demo Ergonomics](#9-sih-hackathon-presentation-features--demo-ergonomics)
10. [Future Production Roadmap & Deployment Status](#10-future-production-roadmap--deployment-status)

---

## 1. Executive Summary & Core Mission

**Skill Bridge** is an AI-powered conversational web application created for the **Smart India Hackathon (SIH)**. Its mission is to empower underserved youth, informal sector workers, rural artisans, and low-literacy citizens across India to transition from low-income, vulnerable occupations into skilled, high-growth, government-certified career pathways.

Unlike traditional career portals that assume high literacy, CV-writing skills, or English proficiency, Skill Bridge operates on a **Voice-First, Vernacular-First, and Cognitive-Bridge architecture**. It listens to a citizen's voice in their mother tongue, understands their traditional family craft and current job, isolates their implicit **transferable skills**, bridges them into formal accredited certifications (aligned with **NSDC, PMKVY 4.0, PM Vishwakarma, and Skill India**), and unlocks direct financial benefits and government subsidies.

```
       [ Citizen Voice in Native Language ]
                       │
                       ▼
      [ 10-Question Conversational Onboarding ]
                       │
                       ▼
       [ Cognitive Bridge Reasoning Engine ]
    (Extracts Transferable Skills from Current Job)
                       │
         ┌─────────────┴─────────────┐
         ▼                           ▼
[ 5-Stage Certified Roadmap ]   [ Community-Tailored Govt Schemes ]
 (Foundation → Lab → Placement)  (Toolkits, Grants, 5% Loans, DBT)
         │                           │
         └─────────────┬─────────────┘
                       ▼
       [ Citizen Serial ID & Admin Dossier ]
```

---

## 2. Target Demographics & Societal Problem Solved

### The Grassroots Problem
1. **The Blank-Slate Fallacy:** Conventional skilling programs treat candidates as complete novices, ignoring years of practical, real-world experience (e.g., an electrician's assistant already knows AC circuits, tools, and site safety, but lacks formal DC solar photovoltaic knowledge).
2. **The Digital Literacy & Linguistic Barrier:** Most government skilling portals and employment exchanges require complex text forms in English or formal Hindi, alienating rural or semi-urban citizens.
3. **Scheme Fragmentation:** While the Government of India provides dozens of welfare, toolkit, stipend, and concessional loan schemes (PM Vishwakarma, NBCFDC, NSFDC, Stand-Up India, Mudra, PM-AJAY), citizens remain unaware of their eligibility based on caste, income, or trade.
4. **Lack of Institutional Visibility:** Field supervisors, training center directors, and government officers lack a centralized digital dossier to track candidate progress through milestones in real-time.

### The Skill Bridge Solution
- **Cognitive Bridge Intelligence:** Re-values existing generational or informal labor, boosting candidate confidence by demonstrating they already possess 30%–50% of the skills required for their dream job.
- **Multilingual Voice Onboarding:** Complete interaction via speech synthesis and recognition in **13 Indian languages**.
- **Automated Scheme Recommendation:** Matches candidates with exact government schemes based on their trade, family income, and social category (OBC, SC, ST, EWS, General).
- **Officer Administrative Dashboard:** Real-time visibility into batch progress, Citizen Serial IDs, module completion, and CSV institutional reporting.

---

## 3. Core Architectural Philosophy

| Principle | Implementation Details |
| :--- | :--- |
| **Voice-First & Multimodal** | Integrated Web Speech API (`SpeechRecognition` & `SpeechSynthesis`) paired with a server-side proxy (`/api/tts`) fetching authentic native Indian language audio. Interactive visual fallback chips for silent environments. |
| **Cognitive Bridging** | Explicit AI logic that bridges the candidate's prior work (e.g., *Construction Worker → Licensed Industrial Electrician*, *Driver → Logistics Fleet Coordinator*, *Farmer → Agri-Tech Drone Pilot*). |
| **Zero Authentication Friction** | Instant entry using a 10-digit mobile number with an automated 4-digit OTP verification simulation (`4-8-2-9`). No password fatigue or SMS gateway failures during demonstrations. |
| **Standardized Citizen Serial ID** | Unique state-district-serial identification format (e.g., `TN-32-101`) assigned to every citizen profile, enabling lookup across systems. |
| **Persistent Local State** | Fully client-side reactive store backed by browser `localStorage` (`skill_bridge_state_v1` and `skillbridge_admin_learners_v4`). State survives page reloads without requiring external database dependencies. |
| **Dual-Chassis Layout** | Renders as a native mobile smartphone on handheld devices, an authentic iPhone-style centered frame on desktops, and can expand to a wide institutional view in the Admin Portal. |

---

## 4. Complete Technology Stack & Dependencies

| Layer | Technology | Purpose & Details |
| :--- | :--- | :--- |
| **Framework** | **Next.js 15+ / React 19** | App Router architecture, server-rendered layouts, dynamic client components. |
| **Language** | **TypeScript** | Strict typing for domain interfaces: `UserProfile`, `GovtScheme`, `GeneratedRoadmap`, `LearnerAdminRecord`. |
| **Styling** | **Tailwind CSS & PostCSS** | Curated CSS custom properties, responsive breakpoints, sleek dark and light mode contrasts. |
| **Animations** | **Framer Motion** | Micro-interactions, animated stage transitions (`AnimatePresence`), sliding sidebars, pulsing audio waves. |
| **Gamification** | **Canvas Confetti** | Multi-colored celebration confetti fired when completing roadmap milestones or submitting scheme applications. |
| **Iconography** | **Lucide React** | 40+ semantic icons: `Mic`, `Route`, `Landmark`, `User`, `Sparkles`, `ShieldCheck`, `Award`, `Zap`, `Coins`. |
| **TTS Engine** | **Dual Speech Pipeline** | 1. Server-side Next.js route (`/api/tts`) querying Google Translate TTS with sentence chunking & memory caching.<br>2. Browser Web Speech API (`speechSynthesis`) fallback.<br>3. Web Audio API synthesized harmonic audio chimes (`AudioContext`). |
| **STT Engine** | **Web Speech API** | `webkitSpeechRecognition` with BCP-47 language codes (`ta-IN`, `hi-IN`, `te-IN`, `kn-IN`, `ml-IN`, etc.). |

---

## 5. Global Design System & UI/UX Aesthetics

The application utilizes an authoritative, tech-forward color palette engineered for high contrast, readability, and modern Indian identity:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        BRAND COLOR PALETTE                             │
├───────────────────┬───────────────────┬────────────────────────────────┤
│ Deep Navy / Dark  │ #10152E           │ Primary dark backdrop & frame  │
│ Royal Purple      │ #24135F           │ Brand accent & header gradient │
│ Vibrant Blue      │ #3159E8           │ Primary brand CTA & focus ring │
│ Cyan / Teal       │ #13B8B2           │ Secondary bridge accent        │
│ Mint / Green Glow │ #62E6C8           │ Accents, badges, active status │
│ Canvas Background │ #F6F8FC           │ Clean light grey/blue viewport │
└───────────────────┴───────────────────┴────────────────────────────────┘
```

- **Typography:** `Inter` variable font with fallbacks to system sans-serif. High typographic hierarchy from `text-[9.5px]` micro-badges to `text-3xl font-black` titles.
- **Glassmorphism:** High-performance backdrop blur (`backdrop-blur-md`, `bg-white/95`) on sticky navigation bars and floating toolbars.
- **Accessible Touch Targets:** Minimum 44px touch targets on mobile viewports for effortless one-handed thumb interaction.

---

## 6. Complete Screen-by-Screen User Journey (From A to Z)

Skill Bridge is organized as a sequential, multi-stage state machine managed in `context/SkillBridgeContext.tsx`:

```
splash ➔ language ➔ mobile ➔ voice_onboarding ➔ profile_confirmation ➔ career_goal ➔ main_app [voice | roadmap | schemes | profile]
                                                                                          │
                                                                                          └── admin_login ➔ admin_dashboard
```

---

### Screen 1: Splash Screen & Brand Identity
- **Component:** `components/SplashScreen.tsx`
- **Visual Features:**
  - Radial atmospheric glow with glowing brand aura.
  - Animated geometric bridge SVG featuring brand gradient pillars, suspension arc, and a focal circular node symbolizing citizen empowerment.
  - Title: **SKILL BRIDGE** with gradient clip text.
  - Taglines: *"Your voice. Your skills. Your future."* and *"An AI-powered Cognitive Bridge to Empowerment"*.
  - SIH Prototype pill badge with pulsing mint indicator.
  - Bottom action bar: "Get Started" primary button and automatic 2600ms countdown timer advancing to the language selector.

---

### Screen 2: Multi-Lingual Language Selector (13 Indian Languages)
- **Component:** `components/LanguageSelector.tsx`
- **Supported Languages:**
  1. English (`en`)
  2. हिन्दी - Hindi (`hi`)
  3. தமிழ் - Tamil (`ta`)
  4. తెలుగు - Telugu (`te`)
  5. ಕನ್ನಡ - Kannada (`kn`)
  6. മലയാളം - Malayalam (`ml`)
  7. বাংলা - Bengali (`bn`)
  8. मराठी - Marathi (`mr`)
  9. ગુજરાતી - Gujarati (`gu`)
  10. ਪੰਜਾਬੀ - Punjabi (`pa`)
  11. ଓଡ଼ିଆ - Odia (`or`)
  12. অসমীয়া - Assamese (`as`)
  13. اردو - Urdu (`ur`)
- **Key Features:**
  - Real-time language search input to quickly locate regional tongues.
  - Card grid displaying language name in English and native script (e.g., `தமிழ்`, `हिन्दी`).
  - **Instant Vocal Greeting Feedback:** Tapping any language plays an authentic spoken greeting in that language (e.g., *"ஸ்கில் பிரிட்ஜுக்கு வரவேற்கிறோம்"*, *"स्किल ब्रिज में आपका स्वागत है"*).
  - Pre-cached greeting audio for zero network lag.
  - Audio feedback chime generated via Web Audio API.

---

### Screen 3: Frictionless Mobile Entry & Automated OTP Simulation
- **Component:** `components/MobileNumberScreen.tsx`
- **Key Features:**
  - Fixed `+91` Indian country code badge with Indian flag emblem.
  - Numeric 10-digit input field with automatic sanitization and character clamping.
  - **Automated OTP State Machine:** Once 10 digits are entered, the system simulates OTP delivery without SMS delays:
    1. `sending`: Status displays *"Dispatching OTP to +91..."* with spinning indicator.
    2. `verifying`: 4 individual digit boxes automatically fill with simulated code `[ 4 ] [ 8 ] [ 2 ] [ 9 ]`.
    3. `verified`: Status flips to a green badge: *"Mobile Number Verified"* with `CheckCircle2` icon.
  - **Sample Demo Button:** One-click prefill with `98765 43210`.
  - **Citizen Serial ID Generation:** Instantly generates a unique identifier (e.g., `TN-32-101`) based on state code (`TN`) and district code (`32`).
  - **Officer Admin Portal Link:** Discrete footer link allowing training center supervisors to switch directly to `admin_login`.

---

### Screen 4–10: 10-Step AI Conversational Voice Onboarding
- **Component:** `components/VoiceAssistantOnboarding.tsx`
- **Question Definitions:** `lib/questions.ts`
- **Localization Matrix:** `lib/translations.ts`
- **Interaction Model:**
  - Top progress tracker showing current question (e.g., `Question 3 of 10`) and percentage bar.
  - Animated audio waveform (`components/VoiceWaveform.tsx`) reflecting speaking and listening states.
  - AI speaks each question aloud in the user's selected language upon arrival.
  - Dual response mechanism: User can either press the microphone button and speak naturally, or tap one of the quick-answer chips.
  - Scrollable conversational chat log maintaining user and AI dialogue history.

#### The 10 Guided Questions:

| # | Field | AI Spoken Prompt (English) | Input Type | Quick-Answer Options / Chips | Purpose |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **1** | `name` | *"What is your name?"* | Voice / Text | Sample: `Rohith Kumar` | Personal identity |
| **2** | `age` | *"How old are you?"* | Number / Chips | `18`, `19`, `21`, `24`, `28`, `35+` | Demographic eligibility |
| **3** | `currentJob` | *"What work or job are you currently doing?"* | Single Choice | `Electrical Assistant`, `Farmer`, `Construction worker`, `Student`, `Shop worker`, `Driver`, `Electrician`, `Tailor`, `No current job` | Base for cognitive bridging |
| **4** | `familyJob` | *"What is your family's traditional occupation?"* | Single Choice | `Farming`, `Weaving`, `Fishing`, `Handicrafts`, `Construction`, `Small business`, `Other` | Traditional knowledge & PM Vishwakarma matching |
| **5** | `education` | *"What is your highest level of education?"* | Single Choice | `No formal education`, `10th`, `12th`, `ITI`, `Diploma`, `Undergraduate`, `Postgraduate` | NSQF qualification tier |
| **6** | `familyIncome` | *"What is your approximate monthly family income?"* | Single Choice | `Below ₹10,000`, `₹10,000 – ₹20,000`, `₹20,000 – ₹30,000`, `₹30,000 – ₹50,000`, `Above ₹50,000` | EWS / BPL scheme qualification |
| **7** | `caste` | *"What is your caste category or community?"* | Single Choice | `General`, `OBC`, `SC`, `ST`, `EWS`, `Prefer not to say` | Affirmative action, reserved grants & subsidies |
| **8** | `skills` | *"What skills do you have or want to learn?"* | Multi-Choice Chips | `Electrical work`, `Technology`, `Driving`, `Farming`, `Cooking`, `Tailoring`, `Mechanics`, `Business`, `Teaching`, `Design`, `Healthcare`, `Construction`, `Sales` | Skill matrix extraction |
| **9** | `physicalLimitation`| *"Do you have any physical disability or limitation?"* | Special Toggle | `No`, `Yes`, `Prefer not to say` (+ text detail input if Yes) | Workplace accessibility & Divyangjan scheme filtering |
| **10**| `employmentPreference`| *"Are you interested in self-employment or wage employment?"* | Single Choice | `Self-employment` (Own business), `Wage employment` (Salaried job), `Both`, `Not sure` | Shapes milestone 5 (Mudra loan vs. Job placement) |

---

### Screens 11 & 12: Profile Summary & Cognitive AI Confirmation
- **Component:** `components/ProfileConfirmation.tsx`
- **Key Features:**
  - AI speaks a synthesized summary aloud: *"Here is your summary. Name: Rohith Kumar, Age: 19, Current Work: Electrical Assistant. Does this look correct?"*
  - **Citizen Identity Card Preview:** Shows Citizen Serial ID, name monogram, age, education, and social category.
  - **Two-Column Data Grid:** Displays Education, Caste, Current Work, Family Trade, Monthly Income, Declared Skills, Physical Limitations, and Employment Preference.
  - **Inline Editing Capability:** Every field has an interactive pencil icon (`Edit3`). Tapping opens an instant modal to update any field without having to restart onboarding.
  - Primary Action Button: *"Yes, that's correct"*, which announces confirmation via audio and transitions to Career Goal selection.

---

### Screen 13: Future Career Goal Input & Voice Discovery
- **Component:** `components/CareerGoalInput.tsx`
- **Key Features:**
  - Spoken prompt: *"What is your future job goal? Tell me what you want to become."*
  - Input field with speech recognition microphone toggle.
  - **10 Curated High-Growth Career Goal Cards:**
    1. **Solar Technician** (*Green Energy* — Matches Electrical workers)
    2. **Software Developer** (*Information Tech* — Matches Students/Graduates)
    3. **Electrician** (*Construction / Facilities* — Matches Construction workers)
    4. **Agri-Tech Entrepreneur** (*Smart Farming* — Matches Farmers)
    5. **Fashion Entrepreneur** (*Apparel & Design* — Matches Tailors/Weavers)
    6. **Logistics Coordinator** (*Transport & E-Commerce* — Matches Drivers)
    7. **Digital Marketer** (*Media & Business* — Matches Freshers/Homemakers)
    8. **Healthcare Assistant** (*Health & Wellness* — Universal)
    9. **Mechanic / EV Tech** (*Automotive* — Matches Mechanics)
    10. **Government Employee** (*Public Administration* — Universal)
  - **Cognitive Synthesis Animation:** Upon selecting a goal, an animated loader activates with voice announcement: *"Analyzing pathways from Electrical Assistant to Solar Technician. Generating your roadmap now."*

---

### Screen 14: Skill Roadmap & Transferable Skills Matrix
- **Component:** `components/SkillRoadmap.tsx` & `components/RoadmapStep.tsx`
- **Key Features:**
  - **Cognitive Bridge Insight Card:** Highlighting how prior work connects to the new goal:
    > *"Your practical knowledge of AC wiring, circuit breakers, and electrical safety provides a huge 40% head start. Solar systems require strong DC-to-AC integration, which you already fundamentally understand."*
  - **Metrics Bar:**
    - Estimated Total Duration: `4 – 6 Months`
    - Potential Salary Growth: `₹12,000/mo → ₹28,000–₹35,000/mo`
    - National Alignment: `Suryamitra Skill Development Program (NISE & MNRE)`
  - **View Switcher:**
    - **Journey Path:** Step-by-step interactive milestones.
    - **Transferable Skills Matrix:** Side-by-side comparison of *Transferable Skills* (what you bring) vs. *New Skills to Acquire* (what you will learn).
  - **Interactive 5-Stage Milestone Path:**
    1. **Stage 1 (Foundations):** Basic DC circuit theory, solar irradiance, PV physics.
    2. **Stage 2 (Domain Skills):** Inverters, battery storage, on-grid/off-grid, net metering.
    3. **Stage 3 (Hands-on Labs):** Rooftop mounting, cable trays, structural waterproofing.
    4. **Stage 4 (Govt Certification):** NISE / NSDC Suryamitra Technician certification exam.
    5. **Stage 5 (Career Launch):** Corporate placement drive (Wage preference) OR Mudra/PMEGP micro-enterprise loan (Self-employment preference).
  - **Milestone Checkbox & Confetti:** Tapping a milestone marks it as completed, updates overall progress percentage, and triggers a confetti shower.
  - **Spoken Roadmap Summary:** Built-in audio button reads the roadmap aloud in the citizen's native language.

---

### Screen 15: Government Schemes Tab (Caste & Community-Tailored)
- **Component:** `components/SchemesTab.tsx`
- **Data Source:** `lib/schemesData.ts`
- **Key Features:**
  - **Auto-Demographic Matching:** Automatically detects user's caste from their profile (e.g., `OBC`) and prioritizes matching schemes.
  - **Caste Filter Pills:** Interactive selector (`All`, `OBC`, `SC`, `ST`, `EWS`, `General`).
  - **Category Filters:**
    - `All Schemes`
    - `Free Skilling` (PMKVY 4.0, PM Surya Ghar, NSFDC Hunar Vikas)
    - `Toolkits` (PM Vishwakarma ₹15,000 Free Toolkit)
    - `Low-Interest Loans` (NBCFDC 3-6% Loans, Mudra Shishu/Kishor)
    - `Scholarships` (PM-YASASVI, Post-Matric SC)
    - `Grants` (PM-AJAY, Stand-Up India, PMEGP 35% Capital Subsidy)
  - **View Filters:** Toggle between `All Schemes`, `Saved (Bookmarked)`, and `Applied`.
  - **Detailed Scheme Dossier Modal:** Displays Ministry name, primary benefit, financial support breakdown, eligibility requirements, document checklist with verification badges, official government portal link, and helpline phone number.
  - **1-Click Application Simulation:**
    - Step 1: Document verification check.
    - Step 2: Instant submission generating an official Application Reference Number (e.g., `SB-VISH-2026-8921`).
    - Step 3: Confetti celebration and simulated SMS dispatch notification.
  - **Spoken Scheme Overview:** Speaker icon reads any scheme's benefits in regional languages.

---

### Screen 16: Voice Assistant Interactive Tab
- **Component:** `components/VoiceAssistantTab.tsx`
- **Key Features:**
  - Dedicated interactive conversational AI assistant available throughout the app.
  - Welcomes user by name in their language (e.g., *"Hello Rohith! I'm your Skill Bridge AI..."*).
  - Suggested query chips:
    - *"Schemes for my caste"*
    - *"What should I learn next?"*
    - *"Explain my roadmap"*
    - *"Find opportunities"*
    - *"Change my career goal"*
  - Natural speech input and text input support.
  - Continuous animated soundbars indicating speech processing and playback.

---

### Screen 17: Citizen Profile & Identity Card Tab
- **Component:** `components/ProfileTab.tsx`
- **Key Features:**
  - Official Citizen Card format featuring:
    - Monogram avatar badge
    - Standardized Citizen Serial ID: `TN-32-101`
    - Current Occupation and Target Goal
  - Copyable Profile Summary to share via WhatsApp or SMS.
  - Demographic & Vocational Overview cards:
    - Age, Education, Caste Category
    - Family Occupation, Monthly Income
    - Stated Skills & Interests
    - Physical Limitations & Employment Preference
  - **Complete Profile Edit Modal:** Allows updating any field in real-time.
  - Emergency Reset Button to wipe state and restart.

---

### Screen 18 & 19: Officer / Supervisor Admin Portal & Standalone Route
- **Component:** `components/AdminDashboard.tsx`
- **Login Component:** `components/AdminLogin.tsx`
- **Routes:** Accessible in-app via state `admin_login` / `admin_dashboard` OR directly via URL route `/admin`.
- **Authentication:** Demo officer login (Username: `admin`, Password: `admin123` with quick-fill button).

#### Admin Portal Features:
1. **Dual Responsive View:** Centered mobile device frame OR full-screen desktop dashboard via the `Expand Wide` toggle button in the header.
2. **Real-Time Active Learner Synchronization:** Whenever a user onboards on the mobile app, `AdminStore.syncActiveProfile` immediately writes their profile, serial ID, and roadmap progress into the administrative database.
3. **Executive KPI Dashboard Bar:**
   - Total Institutional Scale: `1,288 Candidates` (aggregate)
   - Active Batch: Current tracked candidates
   - Active Learning count
   - Completed & Certified count
   - Milestone In-Progress count
   - Batch Average Completion Rate (%)
4. **Multi-Parameter Search & Serial ID Lookup:**
   - Search across Name, Mobile, Caste, Location, Background Job, Pathway, and Scheme.
   - Dedicated **Citizen Serial ID Dossier Spotlight Card:** Typing or searching `TN-32-101` instantly opens an elevated Dossier Card with candidate photo, caste badge, scheme alignment, and direct SMS nudge trigger.
5. **Roster Table / Card View:**
   - Pre-populated with 8 diverse Indian candidates representing multiple states and sectors:
     - **Rohith Kumar** (`TN-32-101`, Tamil Nadu) — Electrical Assistant → Solar PV Specialist
     - **Priya Sharma** (`KA-01-102`, Karnataka) — Fresher → Full Stack Web Developer
     - **Ramesh Patel** (`GJ-05-103`, Gujarat) — Cultivator → Kisan Drone Pilot (100% Certified)
     - **Ananya Das** (`WB-02-104`, West Bengal) — Garment Tailor → Fashion Boutique Owner
     - **Mohammed Irfan** (`TS-09-105`, Telangana) — Commercial Driver → Fleet Logistics Coordinator
     - **Sunita Devi** (`UP-32-106`, Uttar Pradesh) — Homemaker → Digital Marketing Associate
     - **Vikram Singh** (`RJ-14-107`, Rajasthan) — Mason Helper → Industrial Electrician
     - **Kavita Patil** (`MH-12-108`, Maharashtra) — Healthcare Aide → Nursing Assistant
6. **Candidate Inspection & Milestone Verification Modal:**
   - Review candidate's complete 5-step milestone breakdown.
   - Toggle step completion status on behalf of the candidate.
   - Change enrollment status: `Active Learning`, `Completed & Certified`, `Milestone In-Progress`, `Onboarding`.
   - Simulated SMS Notification dispatch to the candidate's phone.
7. **Add New Learner Modal:** Form to manually onboard candidates at physical skill centers with automatic Serial ID assignment.
8. **Export Official Institutional CSV:** One-click download of a standard spreadsheet containing all 13 candidate parameters for state and central government reporting.

---

## 7. Sub-Systems & Intelligent Engines Deep-Dive

### A. Cognitive Reasoning Engine (`MockAIService`)
Located at `lib/mockAI.ts`, this engine serves as the cognitive brain of the platform:

1. **Pathway Matching Algorithm:** Normalized keyword analysis matching `profile.currentJob` and `careerGoal` against curated pathways in `lib/roadmapData.ts`.
2. **Dynamic Fallback Synthesizer:** If a candidate inputs a custom role not in the predefined database, the engine dynamically constructs a personalized 5-stage NSQF-aligned curriculum referencing their declared skills and education.
3. **Employment Preference Adaptation:** Modifies the final milestone based on whether the citizen wants a salaried corporate role (places them in NAPS / corporate drives) or self-employment (places them in MSME registration, Mudra / PMEGP loan processing).
4. **Conversational Dialogue Agent:** Generates localized responses in 6 languages for queries regarding schemes, salaries, next steps, and roadmaps.

---

### B. Dual-Layer Speech Engine (`SpeechService` & `/api/tts`)
Located at `lib/speechService.ts` and `app/api/tts/route.ts`:

- **Sentence Chunking:** Punctuation-aware text splitting (periods, commas, danda `।`, Urdu comma `،`) ensures smooth streaming without truncation.
- **Audio Caching:** LRU in-memory buffer on the server and `Map<string, HTMLAudioElement>` on the client prevents redundant network requests.
- **Web Audio API Feedback:** Dual-frequency synthesized chimes provide tactile acoustic feedback on user interactions.

---

### C. Sovereign Government Schemes Directory (`schemesData.ts`)
Located at `lib/schemesData.ts`, contains **15 fully-structured central schemes**:

| Scheme Name | Ministry | Target Category | Primary Benefit |
| :--- | :--- | :--- | :--- |
| **PM Vishwakarma Scheme** | MSME & Skill Dev | OBC / Traditional Trades | ₹15,000 free toolkit e-voucher + 5% loan up to ₹3 Lakhs |
| **NBCFDC Skilling & Loans** | Social Justice | OBC | 100% free NSQF skilling + ₹1,500/mo stipend + 3-6% loans |
| **PM-YASASVI** | Social Justice | OBC / EWS | ₹75,000 to ₹1,25,000/yr DBT scholarship for technical diplomas |
| **NSFDC Hunar Vikas** | Social Justice | SC | 100% free high-tech skilling + ₹1,500/mo stipend + 4-6% credit |
| **Post-Matric SC Scholarship**| Social Justice | SC | 100% course fee waiver + ₹13,500/yr annual living maintenance |
| **PM-AJAY** | Social Justice | SC | Capital grants up to ₹50,000 for income generation projects |
| **NSTFDC Adivasi Scheme** | Tribal Affairs | ST | Concessional credit at 2% to 4% p.a. for tribal enterprises |
| **Van Dhan Vikas Yojana** | Tribal Affairs | ST | Tribal toolkits + forest produce value addition processing |
| **CSIS Interest Subsidy** | Education | EWS (< ₹4.5L income) | 100% government interest waiver on education loans |
| **PM Surya Ghar Scheme** | New & Renewable Energy| All Citizens | Free rooftop solar technician skilling + ₹78,000 subsidy |
| **PMKVY 4.0 Short Term** | Skill Dev (MSDE) | All Citizens | 100% free technical certification + ₹8,000 reward badge |
| **NAPS-2 Apprenticeship** | Skill Dev (MSDE) | All Citizens | Guaranteed ₹1,500/mo DBT stipend + formal company placement |
| **Stand-Up India Scheme** | Finance | SC, ST & Women | Bank loans from ₹10 Lakhs to ₹1 Crore for greenfield businesses |
| **PMEGP** | MSME | All (Higher for OBC/SC/ST)| 15% to 35% direct government capital subsidy on project costs |
| **PM Mudra Yojana (PMMY)**| Finance | Micro-Enterprises | Shishu, Kishor, Tarun loans up to ₹10 Lakhs with 0 collateral |

---

### D. Administrative Store & Data Synchronization (`AdminStore`)
Located at `lib/adminStore.ts`:
- Manages batch state in `localStorage` under `skillbridge_admin_learners_v4`.
- Automatically populates the 8 default diverse institutional profiles on initial load.
- Exposes `syncActiveProfile()`: whenever an end-user updates their onboarding answers or checks off roadmap steps in the mobile view, their record is instantly upserted into the administrative database.
- Features `exportLearnersCSV()`: converts current candidate state into standard RFC-4180 CSV format and triggers browser download.

---

### E. Localization & Translation Engine (`translations.ts`)
Located at `lib/translations.ts`:
- Complete question localization dictionary across all 10 questions for English, Tamil, Hindi, Telugu, Kannada, Malayalam, Bengali, Marathi, Gujarati, Punjabi, Odia, Assamese, and Urdu.
- UI button translations for `getStarted`, `continue`, `speakNow`, `profileReadyTitle`, `profileConfirmationPrompt`, and error messages.
- Helper function `getLocalizedQuestion()` swaps prompts, subtitles, and option labels dynamically based on the active language.

---

### F. Global State & Persistence Layer (`SkillBridgeContext`)
Located at `context/SkillBridgeContext.tsx`:
- Single source of truth utilizing React Context API:
  - `stage`: Current screen state (`splash`, `language`, `mobile`, `voice_onboarding`, `profile_confirmation`, `career_goal`, `main_app`, `admin_login`, `admin_dashboard`).
  - `activeTab`: Bottom navigation selector (`voice`, `roadmap`, `schemes`, `profile`).
  - `selectedLanguage`: BCP-47 active language code.
  - `profile`: User demographic and skill data.
  - `roadmap`: Generated milestone roadmap.
  - `mobileNumber`: Verified phone number.
  - `soundEnabled`: Master audio mute toggle.
- Syncs automatically to `localStorage` under `skill_bridge_state_v1` on every state change.

---

## 8. Comprehensive File & Component Inventory

```
app/
├── admin/
│   └── page.tsx                  # Dedicated route for Standalone Admin Portal
├── api/
│   └── tts/
│       └── route.ts              # Edge TTS API proxy with chunking & memory cache
├── favicon.ico                   # Skill Bridge icon
├── globals.css                   # Tailwind base styles, custom scrollbars, animations
├── layout.tsx                    # Root HTML layout with viewport & font configuration
└── page.tsx                      # Main application orchestrator & stage switch

components/
├── AdminDashboard.tsx            # Full Officer Portal (KPIs, Serial ID lookup, CSV export)
├── AdminLogin.tsx                # Secure supervisor login form with demo credentials
├── BottomNavigation.tsx          # Fixed 4-icon nav: Voice Assistant, Roadmap, Schemes, Profile
├── CareerGoalInput.tsx           # Voice & chip career goal selector with 10 top sectors
├── DemoToolbar.tsx               # SIH presentation bar (Quick Demo, Audio Toggle, Reset)
├── LanguageSelector.tsx          # 13 Indian languages with vocal greeting previews
├── MobileFrame.tsx               # Realistic device frame with notch, status bar & expand mode
├── MobileNumberScreen.tsx        # Phone input with automated 4-digit OTP simulation
├── ProfileConfirmation.tsx       # AI summary confirmation & inline editable dossier
├── ProfileTab.tsx                # Full digital Citizen ID Card & profile manager
├── RoadmapStep.tsx               # Interactive milestone step with badges & completion toggle
├── SchemesTab.tsx                # 15 community/caste-tailored government welfare schemes
├── SkillRoadmap.tsx              # Cognitive bridge roadmap & transferable skills matrix
├── SplashScreen.tsx              # Animated bridge SVG logo, tagline & countdown
├── VoiceAssistantOnboarding.tsx  # 10 guided questions with microphone & waveform
├── VoiceAssistantTab.tsx         # Interactive AI conversational voice agent
└── VoiceWaveform.tsx             # Canvas-style animated audio visualization bars

lib/
├── adminStore.ts                 # Admin learner roster store, profile sync & CSV exporter
├── mockAI.ts                     # Cognitive bridging logic, pathway matcher & speech generator
├── questions.ts                  # Definitions of the 10 onboarding questions & sample profiles
├── roadmapData.ts                # Predefined career pathways & transferable skills database
├── schemesData.ts                # 15 detailed central/state government schemes & eligibility
├── speechService.ts              # Web Speech synthesis/recognition & Web Audio API chimes
└── translations.ts               # Vernacular localization matrix for 13 Indian languages

context/
└── SkillBridgeContext.tsx        # Global state management & localStorage persistence

types/
└── skillbridge.ts                # TypeScript interfaces (UserProfile, GovtScheme, Roadmap)
```

---

## 9. SIH Hackathon Presentation Features & Demo Ergonomics

During live judging at the Smart India Hackathon, every second counts. The application includes deliberate features built specifically for live demonstrations:

1. **The 1-Click "Quick Demo" Button:**
   - Located on the top persistent `DemoToolbar.tsx`.
   - Instantly pre-fills the profile of **Rohith Kumar** (19-year-old Electrical Assistant from Tamil Nadu, OBC category, Diploma holder) aiming to become a **Solar Technician**.
   - Generates the complete 5-stage roadmap, syncs to the Admin Portal, and lands directly on the Skill Roadmap in under 500ms.
2. **Citizen Serial ID Demonstration:**
   - Pre-assigned serial `TN-32-101`.
   - Judges can open the **Admin Portal**, paste `TN-32-101` into the search bar, and watch the system instantly pull up Rohith's live progress dossier.
3. **Mute Audio Toggle:**
   - When presenting in noisy hackathon halls or when speakers echo, judges or presenters can tap the `Volume2` icon in the toolbar to switch to silent visual mode without interrupting flow.
4. **Instant Reset Button:**
   - One-click reset clears `localStorage` and returns to the initial Splash Screen for a fresh walk-through.
5. **Expand Wide Admin Mode:**
   - On desktop screens, officers can click `Expand Wide` in the device status bar to transition the admin panel from a phone view into an expansive institutional desktop dashboard.

---

## 10. Future Production Roadmap & Deployment Status

### Production Readiness
- **Static Export Compatible:** Configured with `output: 'export'` compatibility in `next.config.ts`, making it hostable on **GitHub Pages**, **Vercel**, or **AWS S3/CloudFront**.
- **Zero Database Lock-in:** Ready to connect to PostgreSQL / Supabase or MongoDB by replacing the `localStorage` adapter in `AdminStore` and `SkillBridgeContext`.

### Phase 2 Architecture (Post-Hackathon)
1. **Direct DigiLocker & Aadhaar e-KYC Integration:** Instant demographic autofill from citizen Aadhaar XML without manual entry.
2. **Sarvam AI & Bhashini API Integration:** Transition from mock speech reasoning to India's sovereign language models (**Bhashini** and **Sarvam AI**) for low-latency Indic voice generation.
3. **Direct Skill India Digital Hub (SIDH) API Linkage:** Automated enrollment into certified physical training centers with geo-fencing.
4. **WhatsApp Bot & IVR Telephony Gateway:** Citizens without smartphones can dial a toll-free number or send a WhatsApp voice note to receive their Skill Bridge roadmap via audio and PDF.

---
*Built with ❤️ for the Smart India Hackathon.*
