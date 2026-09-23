# SKILL BRIDGE 🌉
> **"An AI-powered Cognitive Bridge to Empowerment"**  
> *Smart India Hackathon (SIH) Prototype*

Skill Bridge helps underserved users discover a suitable career and skill pathway by understanding their personal background, education, existing occupation, family occupation, income, interests, limitations, and future career goal. The AI Voice Assistant collects information conversationally and generates a personalized, actionable **Skill Roadmap**.

---

## 🌟 Key Features

- 🎙️ **Voice-First AI Conversational Onboarding**:
  - Web Speech API integration (`SpeechRecognition` & `SpeechSynthesis`) with instant interactive simulation fallbacks.
  - Animated audio waveforms, pulsing indicators, and touch-friendly quick answer chips.
  - Guided 9-question sequence (Name, Age, Current Job, Family Occupation, Education, Income, Skills, Accessibility, Employment Preference).

- 📱 **Mobile-First App Experience**:
  - Native mobile feel on smartphones and a centered realistic device container on desktop.
  - Big touch targets, high-contrast readable typography, and intuitive accessibility for low-literacy learners.
  - Supports 6 Indian languages: English, தமிழ் (Tamil), हिन्दी (Hindi), తెలుగు (Telugu), ಕನ್ನಡ (Kannada), and മലയാളം (Malayalam).

- ⚡ **Zero Backend & Zero OTP Friction**:
  - Instant access with 10-digit mobile number — no passwords, no SMS OTP hurdles.
  - Local state persistence (`localStorage`) — user data and progress are retained across refreshes.

- 🛣️ **Personalized Skill Roadmap & Transferable Skills**:
  - Explicit **Cognitive Bridge Intelligence** connecting current occupation to target roles (e.g., *Electrical Assistant & Farming Background → Solar Technician*).
  - 5-stage milestone journey: Foundations → Core Skills → Practical Hands-on Labs → Govt Certification → Job Placement / Self-Employment.
  - Aligned with National Skill Development Corporation (NSDC), Skill India Digital Hub, and PMKVY 4.0 schemes.
  - Interactive completion tracking with milestone celebrations.

- 🧭 **Fixed 3-Icon Navigation**:
  - 🎙️ **Voice Assistant**: Interactive AI assistant responding to natural queries (*"What should I learn next?"*, *"Explain my roadmap"*, *"Find opportunities"*).
  - 🛣️ **Skill Roadmap**: Visual journey path and transferable skills explorer.
  - 👤 **Profile**: Full citizen identity card with inline editing and instant demo controls.

- 🚀 **SIH Presentation Demo Toolbar**:
  - 1-click **"Rohith Demo"** button to instantly pre-fill sample data during live presentations.

---

## 📂 Project Architecture

```
app/
  ├── layout.tsx         # Root layout with Inter font and mobile viewport
  ├── page.tsx           # Main orchestrator (Splash -> Language -> Mobile -> Voice Onboarding -> Confirmation -> Roadmap)
  └── globals.css        # Tailwind CSS styles and custom scrollbars

components/
  ├── SplashScreen.tsx             # Screen 1: Brand mark & tagline
  ├── LanguageSelector.tsx         # Screen 2: 6 Indian languages with vocal greetings
  ├── MobileNumberScreen.tsx       # Screen 3: +91 mobile input (No OTP)
  ├── VoiceAssistantOnboarding.tsx # Screen 4: 9 questions in order with mic wave
  ├── ProfileConfirmation.tsx      # Screens 11 & 12: Summary & AI voice confirmation
  ├── CareerGoalInput.tsx          # Screen 13: Future job goal voice & chip input
  ├── SkillRoadmap.tsx             # Screens 14 & 15: Journey path & transferable skills
  ├── RoadmapStep.tsx              # Interactive milestone step with NSDC badge
  ├── BottomNavigation.tsx         # Screen 16: Exactly 3 icons (Mic, Roadmap, Profile)
  ├── VoiceAssistantTab.tsx        # Screen 17: Interactive AI voice assistant
  ├── ProfileTab.tsx               # Screen 18: Full profile view & edit modal
  ├── MobileFrame.tsx              # Centered mobile container with status bar
  ├── VoiceWaveform.tsx            # Animated voice audio bars
  └── DemoToolbar.tsx              # Quick SIH demo controls

lib/
  ├── mockAI.ts          # Cognitive reasoning engine connecting current jobs to goals
  ├── roadmapData.ts     # Predefined career pathways, transferable skills matrix
  ├── questions.ts       # 9 onboarding questions definitions
  └── speechService.ts   # Web Speech API synthesis & recognition service

context/
  └── SkillBridgeContext.tsx # Global state, localStorage persistence, demo loaders

types/
  └── skillbridge.ts     # TypeScript interfaces & types
```

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14+ / React 19 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations & Effects**: Framer Motion, Canvas Confetti
- **Voice Engine**: Web Speech API (`SpeechRecognition` & `SpeechSynthesis`) + Mock AI Service

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/rohithdub/skill-bridge.git
cd skill-bridge
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm start
```

---

## 👥 Team
Built with ❤️ for the **Smart India Hackathon**.