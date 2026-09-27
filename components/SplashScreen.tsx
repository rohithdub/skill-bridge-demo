'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { setStage } = useSkillBridge();

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage('language');
    }, 2600);
    return () => clearTimeout(timer);
  }, [setStage]);

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-8 bg-gradient-to-b from-[#10152E] via-[#24135F] to-[#10152E] text-white select-none">
      
      {/* Top subtle badge */}
      <div className="w-full flex justify-center pt-2">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-[#10152E]/90 border border-[#3159E8]/40 text-[#62E6C8] text-xs font-semibold tracking-wide uppercase shadow-sm mx-auto text-center"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#62E6C8] animate-pulse shrink-0" />
          <span className="leading-none text-center">Smart India Hackathon Prototype</span>
        </motion.div>
      </div>

      {/* Center Brand Mark & Tagline */}
      <div className="flex flex-col items-center text-center">
        {/* Animated Brand Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mb-8"
        >
          {/* Glowing Aura with Full Signature Gradient */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#24135F] via-[#3159E8] via-[#13B8B2] to-[#62E6C8] rounded-3xl blur-2xl opacity-40 animate-pulse"></div>
          
          <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-tr from-[#24135F] via-[#3159E8] via-[#13B8B2] to-[#62E6C8] p-[3px] shadow-2xl flex items-center justify-center">
            <div className="w-full h-full bg-[#10152E] rounded-[21px] backdrop-blur-xl flex flex-col items-center justify-center relative overflow-hidden">
              {/* Geometric bridge arc svg with Signature Brand Gradient */}
              <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
                <path
                  d="M8 44C16 26 48 26 56 44"
                  stroke="url(#sbBridgeGrad)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
                <path
                  d="M16 44V34M28 44V29M36 44V29M48 44V34"
                  stroke="url(#sbBridgePillars)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="32" cy="19" r="4.5" fill="#62E6C8" />
                <defs>
                  <linearGradient id="sbBridgeGrad" x1="8" y1="44" x2="56" y2="44" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3159E8" />
                    <stop offset="0.5" stopColor="#13B8B2" />
                    <stop offset="1" stopColor="#62E6C8" />
                  </linearGradient>
                  <linearGradient id="sbBridgePillars" x1="16" y1="44" x2="48" y2="29" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3159E8" />
                    <stop offset="1" stopColor="#62E6C8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Brand Name with Signature Gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl font-black tracking-tight text-white mb-2 flex items-center justify-center gap-1.5 text-center"
        >
          <span className="bg-gradient-to-r from-[#FFFFFF] via-[#62E6C8] to-[#13B8B2] bg-clip-text text-transparent">
            SKILL BRIDGE
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-base text-[#EEEAFE] font-medium max-w-xs"
        >
          &ldquo;Your voice. Your skills. Your future.&rdquo;
        </motion.p>

        {/* Positioning Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-xs text-[#62E6C8]/90 font-medium mt-3 max-w-[260px] leading-relaxed"
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
          className="w-full max-w-xs py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#24135F] via-[#3159E8] via-[#13B8B2] to-[#62E6C8] hover:opacity-95 active:scale-[0.98] text-[#10152E] font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-[#3159E8]/30 transition-all cursor-pointer border border-[#62E6C8]/40"
        >
          <span className="text-white drop-shadow-sm">Get Started</span>
          <ArrowRight className="w-5 h-5 text-white" />
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-[#62E6C8] animate-ping" />
          <span>Voice-first AI career onboarding</span>
        </div>
      </motion.div>

    </div>
  );
};
