'use client';

import React, { useState } from 'react';
import { SkillBridgeProvider } from '@/context/SkillBridgeContext';
import { MobileFrame } from '@/components/MobileFrame';
import { AdminLogin } from '@/components/AdminLogin';
import { AdminDashboard } from '@/components/AdminDashboard';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

function AdminStandaloneContent() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-slate-100">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col h-full"
          >
            <AdminLogin
              onSuccess={() => setIsAuthenticated(true)}
              onBack={() => router.push('/')}
            />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col h-full"
          >
            <AdminDashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdminPage() {
  return (
    <SkillBridgeProvider>
      <MobileFrame>
        <AdminStandaloneContent />
      </MobileFrame>
    </SkillBridgeProvider>
  );
}
