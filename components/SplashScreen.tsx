'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { setStage } = useSkillBridge();

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage('language');
    }, 2400);
    return () => clearTimeout(timer);
  }, [setStage]);

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-8 bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white select-none">
      
      {/* Top subtle badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-8 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium tracking-wide uppercase"
      >
        <Sparkles className="w-3 h-3 text-amber-400" />
        <span>Smart India Hackathon Prototype</span>
      </motion.div>

      {/* Center Brand Mark & Tagline */}
      <div className="flex flex-col items-center text-center">
        {/* Animated Brand Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mb-8"
        >
          {/* Glowing Aura */}
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/30 to-amber-500/20 rounded-3xl blur-xl animate-pulse"></div>
          
          <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 p-0.5 shadow-2xl flex items-center justify-center">
            <div className="w-full h-full bg-slate-950/80 rounded-[22px] backdrop-blur-xl flex flex-col items-center justify-center relative overflow-hidden">
              {/* Geometric bridge arc svg */}
              <svg className="w-16 h-16 text-emerald-400" viewBox="0 0 64 64" fill="none">
                <path
                  d="M8 44C16 26 48 26 56 44"
                  stroke="url(#bridgeGrad)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
                <path
                  d="M16 44V34M28 44V29M36 44V29M48 44V34"
                  stroke="#34d399"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="32" cy="20" r="4.5" fill="#fbbf24" />
                <defs>
                  <linearGradient id="bridgeGrad" x1="8" y1="44" x2="56" y2="44" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#10b981" />
                    <stop offset="0.5" stopColor="#fbbf24" />
                    <stop offset="1" stopColor="#34d399" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl font-extrabold tracking-tight text-white mb-2"
        >
          SKILL BRIDGE
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-base text-emerald-200/90 font-medium max-w-xs"
        >
          &ldquo;Your voice. Your skills. Your future.&rdquo;
        </motion.p>

        {/* Positioning Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-xs text-slate-400 mt-3 max-w-[260px] leading-relaxed"
        >
          An AI-powered Cognitive Bridge to Empowerment
        </motion.p>
      </div>

      {/* Bottom Fast Action / Loader */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="w-full flex flex-col items-center gap-3 pb-6"
      >
        <button
          onClick={() => setStage('language')}
          className="w-full max-w-xs py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-slate-950 font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Voice-first AI career onboarding</span>
        </div>
      </motion.div>

    </div>
  );
};
