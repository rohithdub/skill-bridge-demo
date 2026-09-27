'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { Shield, Lock, User, ArrowRight, ArrowLeft, KeyRound, Eye, EyeOff, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onSuccess?: () => void;
  onBack?: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onBack }) => {
  const { setStage } = useSkillBridge();
  const [adminName, setAdminName] = useState<string>('admin');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!adminName.trim()) {
      setError('Please enter admin username');
      return;
    }

    if (!password) {
      setError('Please enter admin password');
      return;
    }

    const validUsernames = ['admin', 'supervisor', 'rohith', 'sih', 'director'];
    const validPasswords = ['admin', 'admin123', 'admin@123', 'password', 'sih2026', '123456'];

    setIsLoading(true);
    setError('');

    setTimeout(() => {
      setIsLoading(false);
      const isUserValid = validUsernames.includes(adminName.trim().toLowerCase());
      const isPassValid = validPasswords.includes(password.trim().toLowerCase()) || password.length >= 4;

      if (isUserValid && isPassValid) {
        if (onSuccess) {
          onSuccess();
        } else {
          setStage('admin_dashboard');
        }
      } else {
        setError('Invalid credentials. Use demo name: admin | password: admin or admin123');
      }
    }, 450);
  };

  const handleQuickDemoFill = () => {
    setAdminName('admin');
    setPassword('admin123');
    setError('');
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      setStage('mobile');
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-gradient-to-b from-[#10152E] via-[#24135F] to-[#10152E] text-white select-none">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-4 pt-2">
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-xl bg-[#10152E] border border-[#3159E8]/40 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#24135F] shadow-sm active:scale-95 transition-all cursor-pointer"
            title="Return to OTP Verification"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#62E6C8] bg-[#10152E] border border-[#3159E8]/50 px-3 py-1 rounded-full">
            <Shield className="w-3.5 h-3.5 text-[#62E6C8]" />
            <span>Admin Portal</span>
          </div>
        </div>

        {/* Center Badge with AI Gradient */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#24135F] via-[#3159E8] to-[#13B8B2] text-white flex items-center justify-center mb-4 shadow-lg shadow-[#3159E8]/30 border border-[#62E6C8]/30"
        >
          <Lock className="w-7 h-7 text-[#62E6C8]" />
        </motion.div>

        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <span>Administrator Access</span>
        </h1>
        <p className="text-[#EEEAFE]/80 text-xs mt-1 leading-relaxed">
          Log in with supervisor credentials to monitor registered learners, active learning tracks, and progress analytics.
        </p>

        {/* Credentials Form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          
          {/* Admin Name Field */}
          <div>
            <label className="block text-xs font-semibold text-[#EEEAFE] uppercase tracking-wider mb-1.5">
              Admin Name / Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={adminName}
                onChange={(e) => {
                  setAdminName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="admin"
                autoFocus
                className="w-full h-13 pl-11 pr-4 bg-[#10152E]/90 border border-[#3159E8]/40 rounded-xl text-base font-medium text-white placeholder:text-slate-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#3159E8] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-[#EEEAFE] uppercase tracking-wider">
                Admin Password
              </label>
              <button
                type="button"
                onClick={handleQuickDemoFill}
                className="text-[11px] font-semibold text-[#62E6C8] hover:underline flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Sparkles className="w-3 h-3" />
                <span>Fill Demo (admin123)</span>
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter admin password"
                className="w-full h-13 pl-11 pr-11 bg-[#10152E]/90 border border-[#3159E8]/40 rounded-xl text-base font-medium text-white placeholder:text-slate-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#3159E8] focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-rose-950/70 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Default Credentials Callout with Lavender & Mint */}
          <div className="p-3 bg-[#10152E]/80 border border-[#3159E8]/40 rounded-xl flex items-start gap-2.5 text-[11px] text-[#EEEAFE]">
            <CheckCircle2 className="w-4 h-4 text-[#62E6C8] shrink-0 mt-0.5" />
            <div className="leading-snug">
              <span className="font-semibold text-white">Pre-configured Demo Credentials:</span>
              <div className="mt-0.5 font-mono text-[11px] text-[#62E6C8]">
                Name: <span className="text-white font-bold">admin</span> &nbsp;|&nbsp; Password: <span className="text-white font-bold">admin123</span>
              </div>
            </div>
          </div>

          {/* Submit Button with Full Signature Gradient */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-4 px-6 rounded-xl font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-[#3159E8]/30 bg-gradient-to-r from-[#24135F] via-[#3159E8] via-[#13B8B2] to-[#62E6C8] hover:opacity-95 text-white transition-all active:scale-[0.98] cursor-pointer border border-[#62E6C8]/40"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Authenticating...</span>
              </span>
            ) : (
              <>
                <span>Sign In to Admin Panel</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-[#3159E8]/20 text-center">
        <p className="text-[11px] text-slate-400">
          SkillBridge Institutional Portal • Multi-tier National Skilling Dashboard
        </p>
      </div>

    </div>
  );
};
