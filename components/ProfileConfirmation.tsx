'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { UserProfile } from '@/types/skillbridge';
import { getUIText } from '@/lib/translations';
import {
  CheckCircle2,
  Edit3,
  Bot,
  Briefcase,
  GraduationCap,
  Users,
  IndianRupee,
  Wrench,
  HeartHandshake,
  ShieldCheck,
  Volume2,
  X,
  Sparkles
} from 'lucide-react';

export const ProfileConfirmation: React.FC = () => {
  const { profile, updateProfileField, setStage, speakText, selectedLanguage } = useSkillBridge();

  const [editingField, setEditingField] = useState<keyof UserProfile | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [confirmedSuccess, setConfirmedSuccess] = useState<boolean>(false);

  const confirmationPrompt = getUIText('profileConfirmationPrompt', selectedLanguage);

  useEffect(() => {
    speakText(confirmationPrompt, selectedLanguage);
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
      const hasLimitation = editValue.toLowerCase() !== 'none' && editValue.toLowerCase() !== 'no' && editValue.trim() !== '';
      updateProfileField('physicalLimitation', {
        hasLimitation,
        details: hasLimitation ? editValue : undefined
      });
    } else {
      updateProfileField(editingField, editValue.trim());
    }

    setEditingField(null);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#F6F8FC] text-[#10152E] select-none relative overflow-y-auto">
      
      {/* Top AI Header Announcement with Premium Dark Gradient */}
      <div className="bg-gradient-to-br from-[#10152E] via-[#24135F] to-[#10152E] text-white p-5 rounded-b-3xl shadow-md border-b border-[#3159E8]/30">
        <div className="flex items-center justify-between text-xs text-[#62E6C8] font-semibold mb-2">
          <span className="flex items-center gap-1.5 bg-[#24135F] px-2.5 py-1 rounded-full border border-[#3159E8]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#62E6C8]" />
            Profile Generated
          </span>
          <span className="bg-[#10152E] px-2.5 py-1 rounded-full border border-[#3159E8]/30 text-[#EEEAFE]">
            Cognitive Bridge Ready
          </span>
        </div>

        <h1 className="text-xl font-extrabold tracking-tight text-white">
          {getUIText('profileReadyTitle', selectedLanguage)}
        </h1>

        <div className="mt-3 bg-[#10152E]/80 rounded-2xl p-3 border border-[#3159E8]/30 flex items-start gap-2.5 text-xs leading-relaxed text-[#EEEAFE]">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#24135F] to-[#3159E8] text-[#62E6C8] flex items-center justify-center shrink-0">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <p className="font-semibold text-white mb-0.5">
              &ldquo;{confirmationPrompt}&rdquo;
            </p>
            <div className="flex items-center gap-1 text-[11px] text-[#62E6C8] mt-1">
              <Volume2 className="w-3 h-3 animate-pulse" />
              <span>AI Voice Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information Cards */}
      <div className="p-4 flex flex-col gap-3">
        {/* Name & Age Header Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#24135F] via-[#3159E8] to-[#13B8B2] text-white font-black text-xl flex items-center justify-center shadow-md shadow-[#3159E8]/20 shrink-0">
              {profile.name ? profile.name[0].toUpperCase() : 'U'}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold text-[#10152E] uppercase tracking-tight break-words">
                {profile.name || 'Candidate'}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Age: <span className="font-bold text-[#10152E]">{profile.age || '19'} years</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => handleOpenEdit('name')}
            className="p-2 text-slate-400 hover:text-[#3159E8] rounded-xl hover:bg-slate-100 transition-colors shrink-0"
            title="Edit name"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>

        {/* Detailed Attribute Cards Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Current Job */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs relative min-w-0">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-[#3159E8]" />
                Current Work
              </span>
              <button onClick={() => handleOpenEdit('currentJob')} className="text-slate-400 hover:text-[#3159E8]">
                <Edit3 className="w-3 h-3" />
              </button>
            </div>
            <p className="font-bold text-[#10152E] text-sm break-words">
              {profile.currentJob || 'Electrical Assistant'}
            </p>
          </div>

          {/* Education */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs relative min-w-0">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-[#3159E8]" />
                Education
              </span>
              <button onClick={() => handleOpenEdit('education')} className="text-slate-400 hover:text-[#3159E8]">
                <Edit3 className="w-3 h-3" />
              </button>
            </div>
            <p className="font-bold text-[#10152E] text-sm break-words">
              {profile.education || 'Diploma'}
            </p>
          </div>

          {/* Family Traditional Job */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs relative min-w-0">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#3159E8]" />
                Family Job
              </span>
              <button onClick={() => handleOpenEdit('familyJob')} className="text-slate-400 hover:text-[#3159E8]">
                <Edit3 className="w-3 h-3" />
              </button>
            </div>
            <p className="font-bold text-[#10152E] text-sm break-words">
              {profile.familyJob || 'Farming'}
            </p>
          </div>

          {/* Family Income */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs relative min-w-0">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-[#13B8B2]" />
                Monthly Income
              </span>
              <button onClick={() => handleOpenEdit('familyIncome')} className="text-slate-400 hover:text-[#3159E8]">
                <Edit3 className="w-3 h-3" />
              </button>
            </div>
            <p className="font-bold text-[#10152E] text-sm break-words">
              {profile.familyIncome || '₹10k – ₹20k'}
            </p>
          </div>

          {/* Category */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs relative min-w-0">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3159E8]" />
                Social Category
              </span>
              <button onClick={() => handleOpenEdit('caste')} className="text-slate-400 hover:text-[#3159E8]">
                <Edit3 className="w-3 h-3" />
              </button>
            </div>
            <p className="font-bold text-[#10152E] text-sm break-words">
              {profile.caste || 'OBC'}
            </p>
          </div>

          {/* Employment Preference */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs relative min-w-0">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="flex items-center gap-1">
                <HeartHandshake className="w-3.5 h-3.5 text-[#13B8B2]" />
                Preference
              </span>
              <button onClick={() => handleOpenEdit('employmentPreference')} className="text-slate-400 hover:text-[#3159E8]">
                <Edit3 className="w-3 h-3" />
              </button>
            </div>
            <p className="font-bold text-[#10152E] text-sm break-words">
              {profile.employmentPreference || 'Wage employment'}
            </p>
          </div>
        </div>

        {/* Existing Skills Chip Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Wrench className="w-3.5 h-3.5 text-[#3159E8]" />
              Declared Skills & Strengths
            </span>
            <button onClick={() => handleOpenEdit('skills')} className="text-slate-400 hover:text-[#3159E8]">
              <Edit3 className="w-3 h-3" />
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {profile.skills && profile.skills.length > 0 ? (
              profile.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-[#EEEAFE] text-[#24135F] rounded-lg text-xs font-semibold border border-[#3159E8]/20"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400">None specified</span>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Actions Bottom Bar */}
      <div className="p-4 bg-white border-t border-slate-200/90 shadow-lg sticky bottom-0 z-20 flex flex-col gap-2.5">
        <button
          onClick={handleYes}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#24135F] via-[#3159E8] via-[#13B8B2] to-[#62E6C8] hover:opacity-95 active:scale-[0.98] text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-[#3159E8]/25 transition-all cursor-pointer border border-[#62E6C8]/30"
        >
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span>{getUIText('yesCorrect', selectedLanguage)}</span>
        </button>

        <button
          onClick={() => handleOpenEdit('currentJob')}
          className="w-full py-3 px-6 rounded-2xl bg-slate-100 hover:bg-[#EEEAFE]/50 active:scale-[0.98] text-[#10152E] font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-200"
        >
          <Edit3 className="w-4 h-4 text-slate-500" />
          <span>{getUIText('changeSomething', selectedLanguage)}</span>
        </button>
      </div>

      {/* Inline Field Editor Drawer / Modal */}
      <AnimatePresence>
        {editingField && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#10152E]/60 backdrop-blur-xs z-50 flex flex-col justify-end"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white rounded-t-3xl p-6 shadow-2xl flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[#10152E] text-base capitalize">
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
                className="w-full h-12 px-4 rounded-xl border border-slate-300 text-sm font-semibold text-[#10152E] focus:outline-none focus:ring-2 focus:ring-[#3159E8]"
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
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#24135F] to-[#3159E8] text-white font-bold text-sm shadow-sm"
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
