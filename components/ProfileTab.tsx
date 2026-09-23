'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { UserProfile } from '@/types/skillbridge';
import {
  User,
  Briefcase,
  GraduationCap,
  Users,
  IndianRupee,
  Wrench,
  HeartHandshake,
  ShieldAlert,
  Edit3,
  Compass,
  Sparkles,
  RotateCcw,
  Check,
  X,
  Share2,
  FileCheck
} from 'lucide-react';

export const ProfileTab: React.FC = () => {
  const {
    profile,
    updateProfileField,
    careerGoal,
    setStage,
    loadDemoProfile,
    resetAll
  } = useSkillBridge();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editFormData, setEditFormData] = useState<UserProfile>({ ...profile });
  const [copyToast, setCopyToast] = useState<boolean>(false);

  const handleOpenEdit = () => {
    setEditFormData({ ...profile });
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    Object.entries(editFormData).forEach(([key, val]) => {
      updateProfileField(key as keyof UserProfile, val);
    });
    setIsEditing(false);
  };

  const handleShareProfile = () => {
    navigator.clipboard?.writeText(
      `Skill Bridge Profile: ${profile.name}, Age ${profile.age}. Current: ${profile.currentJob} -> Target: ${careerGoal || 'Skill Growth'}. Generated via Skill Bridge AI.`
    );
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 2500);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 select-none pb-24 overflow-y-auto">
      
      {/* Top Profile Header */}
      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white p-6 rounded-b-3xl shadow-md relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Skill Bridge Citizen ID
          </span>

          <button
            onClick={handleShareProfile}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 active:scale-95"
            title="Share summary"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* User Avatar & Name */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg">
            {profile.name ? profile.name[0].toUpperCase() : 'U'}
          </div>

          <div className="flex-1">
            <h1 className="text-xl font-extrabold text-white uppercase tracking-tight">
              {profile.name || 'Rohith Kumar'}
            </h1>
            <p className="text-xs text-emerald-200/90 font-medium mt-0.5">
              {profile.currentJob || 'Electrical Assistant'} • Age {profile.age || '19'}
            </p>
            <div className="flex items-center gap-1 text-[11px] text-amber-300 font-semibold mt-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Aiming for {careerGoal || 'Solar Technician'}</span>
            </div>
          </div>
        </div>

        {/* Edit Button Bar */}
        <div className="mt-5 flex gap-2">
          <button
            onClick={handleOpenEdit}
            className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30 active:scale-95 cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>

          <button
            onClick={() => setStage('career_goal')}
            className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 active:scale-95 cursor-pointer"
          >
            Change Goal
          </button>
        </div>
      </div>

      {copyToast && (
        <div className="mx-4 mt-2 p-2.5 bg-emerald-600 text-white text-xs font-semibold rounded-xl text-center shadow-md animate-fade-in">
          Profile summary copied to clipboard!
        </div>
      )}

      {/* Profile Details Sections */}
      <div className="p-4 flex flex-col gap-4">
        
        {/* 1. PERSONAL */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-emerald-600" />
            Personal
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Full Name</span>
              <span className="font-bold text-slate-800 text-sm">{profile.name || 'Rohith Kumar'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Age</span>
              <span className="font-bold text-slate-800 text-sm">{profile.age || '19'} years</span>
            </div>
          </div>
        </div>

        {/* 2. WORK */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
            Work
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Current Occupation</span>
              <span className="font-bold text-slate-800 text-sm">{profile.currentJob || 'Electrical Assistant'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Employment Mode</span>
              <span className="font-bold text-slate-800 text-sm">{profile.employmentPreference || 'Wage employment'}</span>
            </div>
          </div>
        </div>

        {/* 3. EDUCATION */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
            Education
          </h3>
          <div className="text-xs">
            <span className="text-slate-400 block text-[11px]">Highest Level</span>
            <span className="font-bold text-slate-800 text-sm">{profile.education || 'Diploma'}</span>
          </div>
        </div>

        {/* 4. FAMILY */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            Family
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Traditional Occupation</span>
              <span className="font-bold text-slate-800 text-sm">{profile.familyJob || 'Farming'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Monthly Income Range</span>
              <span className="font-bold text-slate-800 text-sm">{profile.familyIncome || '₹10,000 – ₹20,000'}</span>
            </div>
          </div>
        </div>

        {/* 5. SKILLS & INTERESTS */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5 text-emerald-600" />
            Skills & Interests
          </h3>
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

        {/* 6. ACCESSIBILITY & LIMITATIONS */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
            Accessibility & Limitations
          </h3>
          <p className="text-xs font-bold text-slate-800">
            {profile.physicalLimitation?.hasLimitation
              ? profile.physicalLimitation.details || 'Accommodations requested'
              : 'None reported (All physical career tracks enabled)'}
          </p>
        </div>

        {/* 7. CAREER GOAL */}
        <div className="bg-white rounded-2xl p-4 border border-emerald-300 shadow-2xs bg-emerald-50/30">
          <h3 className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            Future Job Goal
          </h3>
          <p className="text-base font-extrabold text-slate-900">
            {careerGoal || 'Solar Technician'}
          </p>
          <span className="text-[11px] text-emerald-700 font-medium block mt-0.5">
            Cognitive Bridge Active in Skill Roadmap Tab
          </span>
        </div>

        {/* SIH Judge Demo Preset Actions */}
        <div className="pt-2 flex flex-col gap-2">
          <button
            onClick={loadDemoProfile}
            className="w-full py-3 px-4 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold text-xs flex items-center justify-center gap-2 border border-emerald-300 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>Reload Rohith Kumar Demo Profile</span>
          </button>

          <button
            onClick={resetAll}
            className="w-full py-2.5 px-4 rounded-xl text-slate-400 hover:text-rose-500 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Everything (Start Over from Splash)</span>
          </button>
        </div>

      </div>

      {/* Edit Profile Full Sheet Modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-end justify-center"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-6 flex flex-col gap-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-extrabold text-slate-900 text-lg">Edit Profile</h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Fields */}
              <div className="flex flex-col gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Name</label>
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full h-11 px-3 rounded-xl border border-slate-300 font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Age</label>
                  <input
                    type="number"
                    value={editFormData.age}
                    onChange={(e) => setEditFormData({ ...editFormData, age: e.target.value })}
                    className="w-full h-11 px-3 rounded-xl border border-slate-300 font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Current Job</label>
                  <input
                    type="text"
                    value={editFormData.currentJob}
                    onChange={(e) => setEditFormData({ ...editFormData, currentJob: e.target.value })}
                    className="w-full h-11 px-3 rounded-xl border border-slate-300 font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Education</label>
                  <input
                    type="text"
                    value={editFormData.education}
                    onChange={(e) => setEditFormData({ ...editFormData, education: e.target.value })}
                    className="w-full h-11 px-3 rounded-xl border border-slate-300 font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Family Job</label>
                  <input
                    type="text"
                    value={editFormData.familyJob}
                    onChange={(e) => setEditFormData({ ...editFormData, familyJob: e.target.value })}
                    className="w-full h-11 px-3 rounded-xl border border-slate-300 font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Monthly Income</label>
                  <input
                    type="text"
                    value={editFormData.familyIncome}
                    onChange={(e) => setEditFormData({ ...editFormData, familyIncome: e.target.value })}
                    className="w-full h-11 px-3 rounded-xl border border-slate-300 font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Skills (comma separated)</label>
                  <input
                    type="text"
                    value={editFormData.skills.join(', ')}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        skills: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                      })
                    }
                    className="w-full h-11 px-3 rounded-xl border border-slate-300 font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Employment Preference</label>
                  <select
                    value={editFormData.employmentPreference}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        employmentPreference: e.target.value as any
                      })
                    }
                    className="w-full h-11 px-3 rounded-xl border border-slate-300 font-semibold text-slate-800 bg-white"
                  >
                    <option value="Self-employment">Self-employment</option>
                    <option value="Wage employment">Wage employment</option>
                    <option value="Both">Both</option>
                    <option value="Not sure">Not sure</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md"
                >
                  Save Profile
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
