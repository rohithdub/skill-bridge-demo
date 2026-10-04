'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { UserProfile, EmploymentPreference } from '@/types/skillbridge';
import { normalizeSkills } from '@/lib/normalizeProfile';
import {
  getUIText,
  getLocalizedJob,
  getLocalizedEmploymentType,
  getLocalizedGoalTitle,
  getLocalizedIncome,
  getLocalizedSkill
} from '@/lib/translations';
import {
  User,
  Briefcase,
  GraduationCap,
  Users,
  MapPin,
  Clock,
  ShieldCheck,
  Edit3,
  Compass,
  Sparkles,
  Share2,
  X,
  Smartphone,
  Wifi,
  Accessibility
} from 'lucide-react';

export const ProfileTab: React.FC = () => {
  const {
    profile,
    updateProfileField,
    careerGoal,
    setStage,
    loadDemoProfile,
    resetAll,
    selectedLanguage
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
      `Skill Bridge PM-AJAY Dossier: ${profile.name || 'Candidate'}, Serial ID: ${profile.serialId || 'TN-32-101'}. District: ${profile.district || 'Chennai'}. Goal: ${careerGoal || 'Solar PV Specialist'}.`
    );
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 2500);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F6F8FC] text-[#10152E] select-none pb-24 overflow-y-auto">
      
      {/* Top Profile Header with Premium Dark Gradient */}
      <div className="bg-gradient-to-br from-[#10152E] via-[#24135F] to-[#10152E] text-white p-6 rounded-b-3xl shadow-md relative overflow-hidden border-b border-[#3159E8]/30">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <span className="flex items-center gap-1.5 text-xs text-[#62E6C8] font-semibold bg-[#24135F] px-2.5 py-1 rounded-full border border-[#3159E8]/40 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-[#62E6C8]" />
            <span>{getUIText('citizenIdLabel', selectedLanguage)}:</span>
            <span className="font-mono font-bold text-white tracking-wider bg-[#10152E] px-2 py-0.5 rounded border border-[#62E6C8]/30">
              {profile.serialId || 'TN-32-101'}
            </span>
          </span>

          <button
            onClick={handleShareProfile}
            className="p-2 rounded-xl bg-[#10152E] text-slate-300 hover:text-white border border-[#3159E8]/40 active:scale-95 transition-colors shrink-0 cursor-pointer"
            title={getUIText('shareSummary', selectedLanguage)}
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* User Avatar & Name */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#24135F] via-[#3159E8] to-[#13B8B2] text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-[#3159E8]/30 border border-[#62E6C8]/30 shrink-0">
            {profile.name ? profile.name[0].toUpperCase() : 'U'}
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-extrabold text-white uppercase tracking-tight break-words">
              {profile.name || getUIText('candidateFallback', selectedLanguage)}
            </h1>
            <p className="text-xs text-[#EEEAFE]/90 font-medium mt-0.5 break-words">
              {getLocalizedJob(profile.currentJob || 'Electrical Assistant', selectedLanguage)} • {getUIText('ageLabel', selectedLanguage)}: {profile.age || '19'}
            </p>
            <div className="flex items-center gap-1 text-[11px] text-[#62E6C8] font-semibold mt-1 min-w-0">
              <Compass className="w-3.5 h-3.5 text-[#62E6C8] shrink-0" />
              <span className="truncate">{getUIText('aimingFor', selectedLanguage)} {getLocalizedGoalTitle(careerGoal || 'Solar Technician', selectedLanguage)}</span>
            </div>
          </div>
        </div>

        {/* Edit Button Bar */}
        <div className="mt-5 flex gap-2">
          <button
            onClick={handleOpenEdit}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#24135F] via-[#3159E8] to-[#13B8B2] hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#3159E8]/30 active:scale-95 cursor-pointer border border-[#62E6C8]/30 transition-all"
          >
            <Edit3 className="w-4 h-4" />
            <span>{getUIText('editProfileBtn', selectedLanguage)}</span>
          </button>

          <button
            onClick={() => setStage('career_goal')}
            className="py-2.5 px-3 rounded-xl bg-[#10152E] hover:bg-[#24135F] text-[#EEEAFE] font-semibold text-xs border border-[#3159E8]/40 active:scale-95 cursor-pointer transition-colors"
          >
            {getUIText('changeGoalBtn', selectedLanguage)}
          </button>
        </div>
      </div>

      {copyToast && (
        <div className="mx-4 mt-2 p-2.5 bg-gradient-to-r from-[#24135F] to-[#3159E8] text-white text-xs font-semibold rounded-xl text-center shadow-md animate-fade-in border border-[#62E6C8]/30">
          {getUIText('profileSummaryCopied', selectedLanguage)}
        </div>
      )}

      {/* Profile Details Sections */}
      <div className="p-4 flex flex-col gap-4">
        
        {/* 1. PERSONAL & LOCATION */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#3159E8]" />
            {getUIText('identityLocation', selectedLanguage)}
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="min-w-0">
              <span className="text-slate-400 block text-[11px]">{getUIText('fullName', selectedLanguage)}</span>
              <span className="font-bold text-[#10152E] text-sm break-words">{profile.name || getUIText('candidateFallback', selectedLanguage)}</span>
            </div>
            <div className="min-w-0">
              <span className="text-slate-400 block text-[11px]">{getUIText('mobileNumberLabel', selectedLanguage)}</span>
              <span className="font-bold text-[#10152E] text-sm font-mono">+91 {profile.mobile || '9876543210'}</span>
            </div>
            <div className="min-w-0">
              <span className="text-slate-400 block text-[11px]">{getUIText('districtStateLabel', selectedLanguage)}</span>
              <span className="font-bold text-[#10152E] text-sm flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#3159E8]" />
                <span>{profile.district || 'Chennai'}, {profile.state || 'Tamil Nadu'}</span>
              </span>
            </div>
            <div className="min-w-0">
              <span className="text-slate-400 block text-[11px]">{getUIText('travelRadius', selectedLanguage)}</span>
              <span className="font-bold text-emerald-700 text-sm bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                {profile.travelRadius || '15 km'}
              </span>
            </div>
          </div>
        </div>

        {/* 2. WORK & ASPIRATION */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-[#3159E8]" />
            {getUIText('livelihoodAspiration', selectedLanguage)}
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">{getUIText('currentWorkLabel', selectedLanguage)}</span>
              <span className="font-bold text-[#10152E] text-sm">{getLocalizedJob(profile.currentJob || 'Electrical Assistant', selectedLanguage)}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">{getUIText('employmentMode', selectedLanguage)}</span>
              <span className="font-bold text-[#10152E] text-sm">{getLocalizedEmploymentType(profile.employmentPreference || 'Wage employment', selectedLanguage)}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">{getUIText('targetGoalLabel', selectedLanguage)}</span>
              <span className="font-bold text-[#3159E8] text-sm">{getLocalizedGoalTitle(careerGoal || 'Solar PV Specialist', selectedLanguage)}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">{getUIText('dailyTimeAvailable', selectedLanguage)}</span>
              <span className="font-bold text-[#10152E] text-sm">{profile.availableLearningTime || 'Full-time (6-8 hrs/day)'}</span>
            </div>
          </div>
        </div>

        {/* 3. SOCIOECONOMIC & SCHEME ELIGIBILITY */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#3159E8]" />
            {getUIText('socioeconomicClassification', selectedLanguage)}
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">{getUIText('socialCategory', selectedLanguage)}</span>
              <span className="font-bold text-white text-xs px-2.5 py-0.5 bg-[#24135F] border border-[#62E6C8]/40 rounded-full inline-block mt-0.5">
                {profile.caste || 'SC'} (PM-AJAY Focus)
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">{getUIText('monthlyIncome', selectedLanguage)}</span>
              <span className="font-bold text-[#10152E] text-sm">{getLocalizedIncome(profile.familyIncome || '₹10,000 – ₹20,000', selectedLanguage)}</span>
            </div>
            <div className="col-span-2 pt-2 border-t border-slate-100">
              <span className="text-slate-400 text-[11px] block">{getUIText('householdSituation', selectedLanguage)}</span>
              <span className="font-semibold text-slate-800 text-xs">
                {profile.householdSituation || 'BPL Card Holder • Landless Household'}
              </span>
            </div>
          </div>
        </div>

        {/* 4. CONSTRAINTS & ACCESSIBILITY */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Accessibility className="w-3.5 h-3.5 text-[#3159E8]" />
            {getUIText('inclusionConstraints', selectedLanguage)}
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">{getUIText('physicalLimitationLabel', selectedLanguage)}</span>
              <span className="font-semibold text-slate-800 text-xs">
                {profile.physicalLimitation?.hasLimitation ? getUIText('specialSupportActive', selectedLanguage) : getUIText('noneDeclared', selectedLanguage)}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">{getUIText('primaryDevice', selectedLanguage)}</span>
              <span className="font-semibold text-slate-800 text-xs flex items-center gap-1">
                <Smartphone className="w-3 h-3 text-slate-600" />
                <span>{profile.deviceAccess || 'Smartphone'}</span>
              </span>
            </div>
            <div className="col-span-2 pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-slate-400 text-[11px]">{getUIText('internetAvailability', selectedLanguage)}:</span>
              <span className="font-bold text-slate-800 text-xs flex items-center gap-1">
                <Wifi className="w-3 h-3 text-emerald-600" />
                <span>{profile.internetAvailability || 'Good 4G/5G'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* 5. SKILLS */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#3159E8]" />
            {getUIText('declaredExistingSkills', selectedLanguage)}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {normalizeSkills(profile.skills).length > 0 ? (
              normalizeSkills(profile.skills).map((s, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200"
                >
                  {getLocalizedSkill(s, selectedLanguage)}
                </span>
              ))
            ) : (
              <span className="text-slate-400 text-xs italic">{getUIText('noSkillsListed', selectedLanguage)}</span>
            )}
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl space-y-3 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-sm font-extrabold text-slate-900">{getUIText('editCitizenProfile', selectedLanguage)}</h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2.5 text-xs">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block">{getUIText('fullName', selectedLanguage)}:</label>
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-300 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block">{getUIText('districtStateLabel', selectedLanguage)}:</label>
                    <input
                      type="text"
                      value={editFormData.district || 'Chennai'}
                      onChange={(e) => setEditFormData({ ...editFormData, district: e.target.value })}
                      className="w-full p-2 rounded-xl border border-slate-300 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block">{getUIText('travelRadius', selectedLanguage)}:</label>
                    <select
                      value={editFormData.travelRadius || '15 km'}
                      onChange={(e) => setEditFormData({ ...editFormData, travelRadius: e.target.value as any })}
                      className="w-full p-2 rounded-xl border border-slate-300 font-semibold"
                    >
                      <option value="5 km">5 km</option>
                      <option value="15 km">15 km</option>
                      <option value="30 km">30 km</option>
                      <option value="Any distance">{getUIText('anyDistance', selectedLanguage)}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block">{getUIText('currentWorkLabel', selectedLanguage)}:</label>
                  <input
                    type="text"
                    value={editFormData.currentJob}
                    onChange={(e) => setEditFormData({ ...editFormData, currentJob: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-300 font-semibold"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block">{getUIText('employmentPrefTitle', selectedLanguage)}:</label>
                  <select
                    value={editFormData.employmentPreference}
                    onChange={(e) => setEditFormData({ ...editFormData, employmentPreference: e.target.value as EmploymentPreference })}
                    className="w-full p-2 rounded-xl border border-slate-300 font-semibold"
                  >
                    <option value="Wage employment">{getLocalizedEmploymentType('Wage employment', selectedLanguage)}</option>
                    <option value="Self-employment">{getLocalizedEmploymentType('Self-employment', selectedLanguage)}</option>
                    <option value="Both">{getLocalizedEmploymentType('Both', selectedLanguage)}</option>
                    <option value="Not sure">{getLocalizedEmploymentType('Not sure', selectedLanguage)}</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block">{getUIText('socialCategory', selectedLanguage)}:</label>
                  <select
                    value={editFormData.caste}
                    onChange={(e) => setEditFormData({ ...editFormData, caste: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-300 font-semibold"
                  >
                    <option value="SC">SC (PM-AJAY Focus)</option>
                    <option value="OBC">OBC</option>
                    <option value="ST">ST</option>
                    <option value="General">General</option>
                    <option value="EWS">EWS</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block">{getUIText('householdSituation', selectedLanguage)}:</label>
                  <input
                    type="text"
                    value={editFormData.householdSituation || 'BPL Card Holder • Landless Household'}
                    onChange={(e) => setEditFormData({ ...editFormData, householdSituation: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-300 font-semibold"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  {getUIText('cancelBtn', selectedLanguage)}
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 py-2 rounded-xl bg-[#3159E8] text-white text-xs font-bold shadow-md hover:bg-[#24135F] cursor-pointer"
                >
                  {getUIText('saveChangesBtn', selectedLanguage)}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
