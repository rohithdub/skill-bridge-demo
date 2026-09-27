'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { getUIText } from '@/lib/translations';
import {
  Smartphone,
  ArrowRight,
  ShieldCheck,
  ArrowLeft,
  Shield,
  CheckCircle2,
  KeyRound,
  Check
} from 'lucide-react';

export const MobileNumberScreen: React.FC = () => {
  const { mobileNumber, setMobileNumber, setStage, setCurrentQuestionIndex, selectedLanguage, profile } = useSkillBridge();
  const [error, setError] = useState<string>('');
  
  // OTP state: only triggered after number is placed (10 digits)
  const [otpState, setOtpState] = useState<'idle' | 'sending' | 'verifying' | 'verified'>('idle');
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);

  // Check if number is placed on mount or change
  useEffect(() => {
    if (mobileNumber && mobileNumber.length === 10) {
      if (otpState === 'idle') {
        setOtpState('sending');
        const timer1 = setTimeout(() => {
          setOtpState('verifying');
          setOtp(['4', '8', '2', '9']);
          const timer2 = setTimeout(() => {
            setOtpState('verified');
            setError('');
          }, 350);
          return () => clearTimeout(timer2);
        }, 400);
        return () => clearTimeout(timer1);
      }
    } else {
      setOtpState('idle');
      setOtp(['', '', '', '']);
    }
  }, [mobileNumber]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobileNumber(val);
    if (error && val.length === 10) {
      setError('');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const clean = value.replace(/\D/g, '').slice(-1);
    const updated = [...otp];
    updated[index] = clean;
    setOtp(updated);
    if (updated.filter(Boolean).length === 4) {
      setOtpState('verified');
      setError('');
    } else {
      setOtpState('verifying');
    }
  };

  const handleContinue = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!mobileNumber || mobileNumber.length < 10) {
      setError(getUIText('mobileErrorMsg', selectedLanguage));
      return;
    }

    if (otpState !== 'verified' && otp.filter(Boolean).length < 4) {
      setError('Please wait for OTP verification or enter the 4-digit code');
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

  const isNumberPlaced = mobileNumber.length === 10;

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#F6F8FC] text-[#10152E] select-none overflow-y-auto">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-4 pt-2">
          <button
            onClick={() => setStage('language')}
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#10152E] shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#13B8B2] bg-[#E4FAF5] px-3 py-1 rounded-full border border-[#13B8B2]/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{getUIText('instantAccess', selectedLanguage)}</span>
          </div>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#24135F] to-[#3159E8] text-white flex items-center justify-center mb-3 shadow-sm">
          <Smartphone className="w-6 h-6 text-[#62E6C8]" />
        </div>

        <h1 className="text-2xl font-bold text-[#10152E] tracking-tight">
          {getUIText('enterMobileNumber', selectedLanguage)}
        </h1>
        <p className="text-slate-500 text-xs mt-1">
          {getUIText('mobileSubtitle', selectedLanguage)}
        </p>

        {/* Input Area */}
        <form onSubmit={handleContinue} className="mt-5 space-y-4">
          
          {/* Mobile Number Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Mobile Number
              </label>
              <button
                type="button"
                onClick={handleUseSample}
                className="text-xs font-semibold text-[#3159E8] hover:text-[#24135F] underline underline-offset-2 flex items-center gap-1 cursor-pointer"
              >
                <span>{getUIText('useSampleNumber', selectedLanguage)}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Country Code */}
              <div className="h-13 px-3.5 bg-white border border-slate-200 rounded-2xl flex items-center gap-1.5 font-bold text-[#10152E] text-base shadow-xs">
                <span className="text-lg">🇮🇳</span>
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
                  className={`w-full h-13 px-4 bg-white border rounded-2xl text-base font-bold tracking-wider text-[#10152E] placeholder:text-slate-300 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#3159E8] focus:border-transparent transition-all ${
                    error && (!mobileNumber || mobileNumber.length < 10) ? 'border-rose-400 ring-1 ring-rose-400' : 'border-slate-200'
                  }`}
                />
                {isNumberPlaced && (
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#E4FAF5] text-[#13B8B2] flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* OTP VERIFICATION SECTION: APPEARS AFTER NUMBER IS PLACED */}
          <AnimatePresence>
            {isNumberPlaced && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-3.5 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
                  
                  {/* Status Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#10152E] uppercase tracking-wider">
                      <KeyRound className="w-3.5 h-3.5 text-[#3159E8]" />
                      <span>OTP Verification</span>
                    </div>

                    {otpState === 'verified' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E4FAF5] text-[#13B8B2] border border-[#13B8B2]/40">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#13B8B2]" />
                        <span>OTP Verified</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#EEEAFE] text-[#24135F]">
                        <span className="w-2 h-2 rounded-full bg-[#3159E8] animate-ping" />
                        <span>Verifying SMS code...</span>
                      </span>
                    )}
                  </div>

                  {/* 4 Digit OTP Inputs */}
                  <div className="flex items-center justify-center gap-2.5 py-0.5">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        placeholder="•"
                        className={`w-11 h-12 text-center text-lg font-bold rounded-xl transition-all ${
                          otpState === 'verified'
                            ? 'bg-[#E4FAF5] border-2 border-[#13B8B2] text-[#10152E] shadow-xs'
                            : 'bg-slate-50 border border-slate-200 text-[#10152E] focus:bg-white focus:border-[#3159E8]'
                        }`}
                      />
                    ))}
                  </div>

                  {/* OTP VERIFIED BANNER */}
                  {otpState === 'verified' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3 bg-gradient-to-r from-[#E4FAF5] to-[#EEEAFE] border border-[#13B8B2]/30 rounded-xl flex items-center justify-between gap-2 text-xs flex-wrap sm:flex-nowrap"
                    >
                      <div className="flex items-center gap-2 text-[#10152E] min-w-0 flex-1">
                        <CheckCircle2 className="w-5 h-5 text-[#13B8B2] shrink-0" />
                        <div className="min-w-0 flex-1">
                          <span className="font-bold block text-xs break-words">
                            OTP Verified for +91 {mobileNumber}
                          </span>
                          <span className="text-[11px] text-[#24135F] font-mono font-bold flex items-center gap-1 flex-wrap mt-0.5">
                            <span className="text-slate-500 font-sans font-normal shrink-0">Citizen Serial ID:</span>
                            <span className="bg-white/80 px-1.5 py-0.5 rounded border border-[#3159E8]/30 text-[#3159E8] shrink-0">
                              {profile.serialId || 'TN-32-101'}
                            </span>
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-[#13B8B2] bg-white px-2 py-0.5 rounded-md border border-[#13B8B2]/20 shrink-0">
                        Auto-Confirmed
                      </span>
                    </motion.div>
                  ) : (
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Sending SMS OTP to +91 {mobileNumber}...</span>
                      <span className="text-[#3159E8] font-semibold">Auto-detecting</span>
                    </div>
                  )}

                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-rose-500 text-xs font-medium"
            >
              {error}
            </motion.p>
          )}
        </form>
      </div>

      {/* BOTTOM ACTION AREA: VERIFY OTP BUTTON + ADMIN PANEL BELOW IT */}
      <div className="pt-4 pb-2 space-y-3">
        
        {/* 1. OTP Verification / Continue Button with Full Signature Gradient */}
        <button
          onClick={() => handleContinue()}
          disabled={!isNumberPlaced || otpState !== 'verified'}
          className={`w-full py-3.5 px-6 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
            isNumberPlaced && otpState === 'verified'
              ? 'bg-gradient-to-r from-[#24135F] via-[#3159E8] via-[#13B8B2] to-[#62E6C8] hover:opacity-95 active:scale-[0.98] text-white shadow-[#3159E8]/25 border border-[#62E6C8]/30'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          <span>
            {otpState === 'verified' ? 'Continue' : isNumberPlaced ? 'Verifying OTP...' : 'Enter Mobile Number'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* 2. ADMIN PANEL ENTRY POINT - PROMINENTLY BELOW OTP VERIFICATION */}
        <div className="pt-2 border-t border-slate-200/90">
          <button
            type="button"
            onClick={() => setStage('admin_login')}
            className="w-full p-3 rounded-2xl bg-gradient-to-r from-[#10152E] via-[#24135F] to-[#10152E] hover:from-[#24135F] hover:to-[#3159E8] text-white font-bold text-xs flex items-center justify-between shadow-md transition-all active:scale-[0.98] cursor-pointer group border border-[#3159E8]/30"
            title="Open Admin & Instructor Monitoring Portal"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#3159E8]/20 text-[#62E6C8] flex items-center justify-center shrink-0 border border-[#3159E8]/30">
                <Shield className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white group-hover:text-[#62E6C8] transition-colors flex items-center gap-1.5">
                  <span>Admin Panel</span>
                  <span className="text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-[#24135F] text-[#62E6C8] border border-[#13B8B2]/40">
                    Supervisor
                  </span>
                </div>
                <div className="text-[10px] text-slate-300 font-normal">
                  View registered learners, course tracks & status
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#62E6C8] group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>

      </div>

    </div>
  );
};
