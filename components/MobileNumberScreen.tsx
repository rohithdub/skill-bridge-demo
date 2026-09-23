'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { Smartphone, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';

export const MobileNumberScreen: React.FC = () => {
  const { mobileNumber, setMobileNumber, setStage, setCurrentQuestionIndex } = useSkillBridge();
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobileNumber(val);
    if (error && val.length === 10) {
      setError('');
    }
  };

  const handleContinue = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!mobileNumber || mobileNumber.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setError('');
    setCurrentQuestionIndex(0);
    setStage('voice_onboarding');
  };

  const handleUseSample = () => {
    setMobileNumber('9876543210');
    setError('');
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-slate-50 text-slate-900 select-none">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-4 pt-2">
          <button
            onClick={() => setStage('language')}
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-xs active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Instant Access • No Password</span>
          </div>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 shadow-sm">
          <Smartphone className="w-6 h-6" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Enter your mobile number
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          We&apos;ll use this to create your Skill Bridge profile.
        </p>

        {/* Input Area */}
        <form onSubmit={handleContinue} className="mt-8">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Mobile Number
          </label>
          <div className="flex items-center gap-2">
            {/* Country Code */}
            <div className="h-14 px-4 bg-white border border-slate-300 rounded-2xl flex items-center gap-1.5 font-bold text-slate-800 text-lg shadow-sm">
              <span className="text-xl">🇮🇳</span>
              <span>+91</span>
            </div>

            {/* 10 Digit Input */}
            <div className="relative flex-1">
              <input
                type="tel"
                value={mobileNumber}
                onChange={handleChange}
                placeholder="98765 43210"
                maxLength={10}
                autoFocus
                className={`w-full h-14 px-4 bg-white border rounded-2xl text-lg font-bold tracking-wider text-slate-900 placeholder:text-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
                  error ? 'border-rose-400 ring-1 ring-rose-400' : 'border-slate-300'
                }`}
              />
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-rose-500 text-xs font-medium mt-2"
            >
              {error}
            </motion.p>
          )}

          {/* Quick Fill Helper for Demonstrations */}
          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={handleUseSample}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 underline underline-offset-2 flex items-center gap-1 cursor-pointer"
            >
              <span>Auto-fill sample number</span>
            </button>
            <span className="text-xs text-slate-400 font-medium">
              {mobileNumber.length}/10 digits
            </span>
          </div>
        </form>
      </div>

      {/* Bottom Action Area */}
      <div className="pb-4">
        <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-xl p-3 mb-4 flex items-center gap-2.5 text-xs text-emerald-800">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>No OTP needed. Straight to your personalized AI Voice conversation.</span>
        </div>

        <button
          onClick={() => handleContinue()}
          disabled={mobileNumber.length < 10}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
            mobileNumber.length === 10
              ? 'bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white shadow-emerald-600/25'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
