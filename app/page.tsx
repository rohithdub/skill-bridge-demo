'use client';

import React from 'react';
import { SkillBridgeProvider, useSkillBridge } from '@/context/SkillBridgeContext';
import { MobileFrame } from '@/components/MobileFrame';
import { SplashScreen } from '@/components/SplashScreen';
import { LanguageSelector } from '@/components/LanguageSelector';
import { MobileNumberScreen } from '@/components/MobileNumberScreen';
import { VoiceAssistantOnboarding } from '@/components/VoiceAssistantOnboarding';
import { ProfileConfirmation } from '@/components/ProfileConfirmation';
import { CareerGoalInput } from '@/components/CareerGoalInput';
import { BeneficiaryHome } from '@/components/BeneficiaryHome';
import { SkillRoadmap } from '@/components/SkillRoadmap';
import { OpportunitiesTab } from '@/components/OpportunitiesTab';
import { SchemesTab } from '@/components/SchemesTab';
import { VoiceAssistantTab } from '@/components/VoiceAssistantTab';
import { ProfileTab } from '@/components/ProfileTab';
import { BottomNavigation } from '@/components/BottomNavigation';
import { AdminLogin } from '@/components/AdminLogin';
import { AdminDashboard } from '@/components/AdminDashboard';
import { IVRSimulatorModal } from '@/components/IVRSimulatorModal';
import { WhatsAppSimulatorModal } from '@/components/WhatsAppSimulatorModal';
import { OfflineBanner } from '@/components/OfflineBanner';
import { AnimatePresence, motion } from 'framer-motion';

function AppContent() {
  const { stage, activeTab } = useSkillBridge();

  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-slate-50">
      {/* Offline Mode Banner (Low connectivity status) */}
      <OfflineBanner />

      {/* Multi-Channel Interactive Simulators */}
      <IVRSimulatorModal />
      <WhatsAppSimulatorModal />

      <AnimatePresence mode="wait">
        {/* SCREEN 1: SPLASH */}
        {stage === 'splash' && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
            className="flex-1 flex flex-col h-full"
          >
            <SplashScreen />
          </motion.div>
        )}

        {/* SCREEN 2: LANGUAGE SELECTION */}
        {stage === 'language' && (
          <motion.div
            key="language"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col h-full"
          >
            <LanguageSelector />
          </motion.div>
        )}

        {/* SCREEN 3: MOBILE NUMBER & OTP VERIFICATION */}
        {stage === 'mobile' && (
          <motion.div
            key="mobile"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col h-full"
          >
            <MobileNumberScreen />
          </motion.div>
        )}

        {/* SCREEN: ADMIN LOGIN */}
        {stage === 'admin_login' && (
          <motion.div
            key="admin_login"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col h-full"
          >
            <AdminLogin />
          </motion.div>
        )}

        {/* SCREEN: PM-AJAY ADMIN IMPLEMENTATION HUB */}
        {stage === 'admin_dashboard' && (
          <motion.div
            key="admin_dashboard"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col h-full"
          >
            <AdminDashboard />
          </motion.div>
        )}

        {/* SCREEN 4: VOICE ASSISTANT ONBOARDING (QUESTIONS 1-10) */}
        {stage === 'voice_onboarding' && (
          <motion.div
            key="voice_onboarding"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col h-full"
          >
            <VoiceAssistantOnboarding />
          </motion.div>
        )}

        {/* SCREENS 11 & 12: PROFILE SUMMARY & VOICE CONFIRMATION */}
        {(stage === 'profile_summary' || stage === 'profile_confirmation') && (
          <motion.div
            key="profile_confirm"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col h-full"
          >
            <ProfileConfirmation />
          </motion.div>
        )}

        {/* SCREEN 13: FUTURE CAREER GOAL INPUT */}
        {stage === 'career_goal' && (
          <motion.div
            key="career_goal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col h-full"
          >
            <CareerGoalInput />
          </motion.div>
        )}

        {/* MAIN APP: 5 CORE TABS (HOME, ROADMAP, OPPORTUNITIES, BENEFITS, PROFILE) */}
        {(stage === 'main_app' || stage === 'roadmap') && (
          <motion.div
            key="main_app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="flex-1 flex flex-col h-full overflow-hidden"
          >
            <div className="flex-1 flex flex-col overflow-hidden relative">
              {activeTab === 'home' && <BeneficiaryHome />}
              {activeTab === 'roadmap' && <SkillRoadmap />}
              {activeTab === 'opportunities' && <OpportunitiesTab />}
              {activeTab === 'schemes' && <SchemesTab />}
              {activeTab === 'profile' && <ProfileTab />}
              {activeTab === 'voice' && <VoiceAssistantTab />}
            </div>

            {/* Fixed 5-Icon Bottom Navigation */}
            <BottomNavigation />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  return (
    <SkillBridgeProvider>
      <MobileFrame>
        <AppContent />
      </MobileFrame>
    </SkillBridgeProvider>
  );
}
