'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { UserProfile } from '@/types/skillbridge';
import { VoiceWaveform } from './VoiceWaveform';
import {
  CheckCircle2,
  Edit3,
  Bot,
  User,
  Briefcase,
  GraduationCap,
  Users,
  IndianRupee,
  Wrench,
  HeartHandshake,
  ShieldAlert,
  ArrowRight,
  Volume2,
  X,
  Sparkles
} from 'lucide-react';

export const ProfileConfirmation: React.FC = () => {
  const { profile, updateProfileField, setStage, speakText, isSpeaking } = useSkillBridge();

  const [editingField, setEditingField] = useState<keyof UserProfile | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [confirmedSuccess, setConfirmedSuccess] = useState<boolean>(false);

  const confirmationPrompt =
    "I've created your profile using the information you shared. Is everything correct?";

  useEffect(() => {
    // AI asks the confirmation question automatically
    speakText(confirmationPrompt);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleYes = () => {
    setConfirmedSuccess(true);
    speakText("Great. Let's create your Skill Roadmap.", () => {
      setTimeout(() => {
        setStage('career_goal');
      }, 700);
    });
  };

  const handleOpenEdit = (field: keyof UserProfile) => {
    setEditingField(field);
    if (field === 'skills') {
      setEditValue((profile.skills || []).join(', '));
    } else if (field === 'physicalLimitation') {
      setEditValue(profile.physicalLimitation?.details || (profile.physicalLimitation?.hasLimitation ? 'Yes' : 'None'));
    } else {
      setEditValue(String(profile[field] || ''));
    }
  };

  const handleSaveEdit = () => {
    if (!editingField) return;

    if (editingField === 'skills') {
      const parsed = editValue.split(',').map(s => s.trim()).filter(Boolean);
      updateProfileField('skills', parsed);
    } else if (editingField === 'physicalLimitation') {
      const isNone = editValue.toLowerCase().includes('none') || editValue.toLowerCase().includes('no');
      updateProfileField('physicalLimitation', {
        hasLimitation: !isNone,
        details: isNone ? undefined : editValue
      });
    } else {
      updateProfileField(editingField, editValue);
    }

    setEditingField(null);
    speakText("Updated. Is everything correct now?");
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-50 text-slate-900 select-none relative overflow-y-auto">
      
      {/* Top AI Header Announcement */}
      <div className="bg-emerald-900 text-white p-5 rounded-b-3xl shadow-md border-b border-emerald-800">
        <div className="flex items-center justify-between text-xs text-emerald-300 font-semibold mb-2">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Profile Generated
          </span>
          <span className="bg-emerald-800/80 px-2.5 py-0.5 rounded-full border border-emerald-700">
            Cognitive Bridge Ready
          </span>
        </div>

        <h1 className="text-xl font-extrabold tracking-tight text-white">
          Your Skill Bridge profile is ready.
        </h1>

        <div className="mt-3 bg-emerald-950/60 rounded-2xl p-3 border border-emerald-700/50 flex items-start gap-2.5 text-xs leading-relaxed text-emerald-100">
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <p className="font-semibold text-white mb-0.5">
              &ldquo;{confirmationPrompt}&rdquo;
            </p>
            <div className="flex items-center gap-1 text-[11px] text-emerald-300/80 mt-1">
              <Volume2 className="w-3 h-3 animate-pulse" />
              <span>AI Voice Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information Cards */}
      <div className="p-4 flex flex-col gap-3">
        {/* Name & Age Header Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-black text-xl flex items-center justify-center shadow-sm">
              {profile.name ? profile.name[0].toUpperCase() : 'U'}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">
                {profile.name || 'Rohith Kumar'}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Age: <span className="font-bold text-slate-800">{profile.age || '19'} years</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => handleOpenEdit('name')}
            className="p-2 text-slate-400 hover:text-emerald-600 rounded-xl hover:bg-slate-100 transition-colors"
            title="Edit name"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>

        {/* Detailed Attribute Cards Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Current Job */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs relative">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                Current Work
              </span>
              <button onClick={() => handleOpenEdit('currentJob')} className="text-slate-400 hover:text-emerald-600">
                <Edit3 className="w-3 h-3" />
              </button>
            </div>
            <p className="font-bold text-slate-900 text-sm">
              {profile.currentJob || 'Electrical Assistant'}
            </p>
          </div>

          {/* Education */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs relative">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                Education
              </span>
              <button onClick={() => handleOpenEdit('education')} className="text-slate-400 hover:text-emerald-600">
                <Edit3 className="w-3 h-3" />
              </button>
            </div>
            <p className="font-bold text-slate-900 text-sm">
              {profile.education || 'Diploma'}
            </p>
          </div>

          {/* Family Traditional Job */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs relative">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                Family Job
              </span>
              <button onClick={() => handleOpenEdit('familyJob')} className="text-slate-400 hover:text-emerald-600">
                <Edit3 className="w-3 h-3" />
              </button>
            </div>
            <p className="font-bold text-slate-900 text-sm">
              {profile.familyJob || 'Farming'}
            </p>
          </div>

          {/* Family Income */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs relative">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                Monthly Income
              </span>
              <button onClick={() => handleOpenEdit('familyIncome')} className="text-slate-400 hover:text-emerald-600">
                <Edit3 className="w-3 h-3" />
              </button>
            </div>
            <p className="font-bold text-slate-900 text-sm">
              {profile.familyIncome || '₹10,000 – ₹20,000'}
            </p>
          </div>

          {/* Skills & Interests (Full width) */}
          <div className="col-span-2 bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs relative">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
              <span className="flex items-center gap-1">
                <Wrench className="w-3.5 h-3.5 text-emerald-600" />
                Skills & Interests
              </span>
              <button onClick={() => handleOpenEdit('skills')} className="text-slate-400 hover:text-emerald-600">
                <Edit3 className="w-3 h-3" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(profile.skills && profile.skills.length > 0
                ? profile.skills
                : ['Electrical work', 'Technology']
              ).map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Employment Preference */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs relative">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="flex items-center gap-1">
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                Preference
              </span>
              <button onClick={() => handleOpenEdit('employmentPreference')} className="text-slate-400 hover:text-emerald-600">
                <Edit3 className="w-3 h-3" />
              </button>
            </div>
            <p className="font-bold text-slate-900 text-sm">
              {profile.employmentPreference || 'Wage employment'}
            </p>
          </div>

          {/* Limitations */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs relative">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
                Limitations
              </span>
              <button onClick={() => handleOpenEdit('physicalLimitation')} className="text-slate-400 hover:text-emerald-600">
                <Edit3 className="w-3 h-3" />
              </button>
            </div>
            <p className="font-bold text-slate-900 text-sm">
              {profile.physicalLimitation?.hasLimitation
                ? profile.physicalLimitation.details || 'Reported'
                : 'None reported'}
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Actions Bottom Bar */}
      <div className="p-4 bg-white border-t border-slate-200/90 shadow-lg sticky bottom-0 z-20 flex flex-col gap-2.5">
        <button
          onClick={handleYes}
          className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <span>Yes, everything is correct</span>
        </button>

        <button
          onClick={() => handleOpenEdit('currentJob')}
          className="w-full py-3 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-700 font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Edit3 className="w-4 h-4 text-slate-500" />
          <span>Let me change something</span>
        </button>
      </div>

      {/* Inline Field Editor Drawer / Modal */}
      <AnimatePresence>
        {editingField && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex flex-col justify-end"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white rounded-t-3xl p-6 shadow-2xl flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base capitalize">
                  Edit {editingField.replace(/([A-Z])/g, ' $1')}
                </h3>
                <button
                  onClick={() => setEditingField(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                autoFocus
                className="w-full h-12 px-4 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => setEditingField(null)}
                  className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
