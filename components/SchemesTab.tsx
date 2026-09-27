'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { GOVERNMENT_SCHEMES_DATA } from '@/lib/schemesData';
import { GovtScheme, SchemeCategory } from '@/types/skillbridge';
import confetti from 'canvas-confetti';
import {
  Landmark,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Search,
  Filter,
  Volume2,
  VolumeX,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  ChevronRight,
  Info,
  Phone,
  ArrowRight,
  X,
  Check,
  Building2,
  Coins,
  GraduationCap,
  Wrench,
  FileText,
  Clock,
  UserCheck,
  AlertCircle,
  Award
} from 'lucide-react';

const CATEGORIES: { id: 'All' | SchemeCategory; label: string; icon: any }[] = [
  { id: 'All', label: 'All Schemes', icon: Landmark },
  { id: 'Skill Training', label: 'Free Skilling', icon: Wrench },
  { id: 'Toolkits & Equipment', label: 'Toolkits', icon: Coins },
  { id: 'Subsidized Loans', label: 'Low-Interest Loans', icon: Building2 },
  { id: 'Scholarships & Stipends', label: 'Scholarships', icon: GraduationCap },
  { id: 'Enterprise Grant', label: 'Grants', icon: Award }
];

const CASTE_OPTIONS = ['All', 'OBC', 'SC', 'ST', 'EWS', 'General'] as const;

export const SchemesTab: React.FC = () => {
  const { profile, careerGoal, updateProfileField, speakText, selectedLanguage } = useSkillBridge();

  const userCaste = profile.caste && profile.caste !== 'Prefer not to say' ? profile.caste : 'OBC';
  
  // State
  const [selectedCaste, setSelectedCaste] = useState<string>(userCaste);
  const [selectedCategory, setSelectedCategory] = useState<'All' | SchemeCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSchemeForModal, setSelectedSchemeForModal] = useState<GovtScheme | null>(null);
  const [activeApplyingScheme, setActiveApplyingScheme] = useState<GovtScheme | null>(null);
  const [applyStep, setApplyStep] = useState<number>(1);
  const [savedSchemeIds, setSavedSchemeIds] = useState<string[]>([]);
  const [appliedSchemes, setAppliedSchemes] = useState<Record<string, { refId: string; date: string }>>({});
  const [viewFilter, setViewFilter] = useState<'all' | 'saved' | 'applied'>('all');
  const [isReadingSummary, setIsReadingSummary] = useState<boolean>(false);

  // Filter schemes
  const filteredSchemes = useMemo(() => {
    return GOVERNMENT_SCHEMES_DATA.filter((scheme) => {
      // 1. Caste / Community filter
      if (selectedCaste !== 'All') {
        const casteMatch =
          scheme.applicableCastes.includes('All') ||
          scheme.applicableCastes.includes(selectedCaste as any);
        if (!casteMatch) return false;
      }

      // 2. Category filter
      if (selectedCategory !== 'All' && scheme.category !== selectedCategory) {
        return false;
      }

      // 3. Tab View filter (Saved or Applied)
      if (viewFilter === 'saved' && !savedSchemeIds.includes(scheme.id)) {
        return false;
      }
      if (viewFilter === 'applied' && !appliedSchemes[scheme.id]) {
        return false;
      }

      // 4. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = scheme.name.toLowerCase().includes(q);
        const matchesMinistry = scheme.ministry.toLowerCase().includes(q);
        const matchesDesc = scheme.description.toLowerCase().includes(q);
        const matchesBenefit = scheme.primaryBenefit.toLowerCase().includes(q);
        const matchesTrade = scheme.alignedTrades?.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesMinistry && !matchesDesc && !matchesBenefit && !matchesTrade) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCaste, selectedCategory, searchQuery, viewFilter, savedSchemeIds, appliedSchemes]);

  // Count of eligible schemes for the user's registered community
  const userCommunityCount = useMemo(() => {
    return GOVERNMENT_SCHEMES_DATA.filter(
      s => s.applicableCastes.includes('All') || s.applicableCastes.includes(userCaste as any)
    ).length;
  }, [userCaste]);

  // Audio Readout for the overview
  const handleReadOverview = () => {
    setIsReadingSummary(true);
    const text = `Showing verified government schemes for ${selectedCaste === 'All' ? 'all communities' : selectedCaste + ' community'}. There are ${filteredSchemes.length} schemes available including PM Vishwakarma, skill training, toolkits, and low interest loan grants.`;
    speakText(text, selectedLanguage, () => {
      setIsReadingSummary(false);
    });
  };

  // Audio Readout for a single scheme
  const handleReadScheme = (scheme: GovtScheme, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `${scheme.name}, sponsored by ${scheme.ministry}. Key benefit: ${scheme.primaryBenefit}. Eligibility: ${scheme.eligibility.casteLabel}.`;
    speakText(text, selectedLanguage);
  };

  // Toggle Bookmark
  const handleToggleSave = (schemeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedSchemeIds(prev =>
      prev.includes(schemeId) ? prev.filter(id => id !== schemeId) : [...prev, schemeId]
    );
  };

  // Start Application Flow
  const handleStartApply = (scheme: GovtScheme, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveApplyingScheme(scheme);
    setApplyStep(1);
    setSelectedSchemeForModal(null);
  };

  // Complete Application Flow
  const handleCompleteApply = () => {
    if (!activeApplyingScheme) return;
    const refCode = `SB-${selectedCaste}-${Math.floor(100000 + Math.random() * 900000)}`;
    const today = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    setAppliedSchemes(prev => ({
      ...prev,
      [activeApplyingScheme.id]: { refId: refCode, date: today }
    }));

    setApplyStep(4);
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.7 }
    });
  };

  // Sync selected caste to user profile
  const handleSetAsProfileCaste = (caste: string) => {
    updateProfileField('caste', caste);
    setSelectedCaste(caste);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F6F8FC] text-[#10152E] select-none pb-24 overflow-y-auto">
      
      {/* 1. TOP HEADER BANNER (Skill Bridge Signature Dark Gradient) */}
      <div className="bg-gradient-to-br from-[#10152E] via-[#24135F] to-[#10152E] text-white p-5 rounded-b-3xl shadow-lg relative overflow-hidden border-b border-[#3159E8]/30">
        {/* Ambient glow effect */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-[#3159E8]/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#13B8B2]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between text-xs text-[#62E6C8] font-semibold mb-2 relative z-10">
          <div className="flex items-center gap-1.5 bg-[#24135F] px-2.5 py-1 rounded-full border border-[#3159E8]/40 shadow-xs">
            <Landmark className="w-3.5 h-3.5 text-[#62E6C8]" />
            <span>National & State Welfare Schemes</span>
          </div>

          <button
            onClick={handleReadOverview}
            className="flex items-center gap-1 text-[11px] text-[#EEEAFE] hover:text-white bg-[#10152E]/80 px-2.5 py-1 rounded-full border border-[#3159E8]/40 active:scale-95 cursor-pointer transition-colors"
            title="Listen to scheme summary"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#62E6C8]" />
            <span>Audio Info</span>
          </button>
        </div>

        {/* Title & Community Focus */}
        <div className="mt-1 relative z-10">
          <h1 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Community Schemes</span>
            <span className="text-xs font-bold text-[#62E6C8] bg-[#13B8B2]/20 border border-[#62E6C8]/40 px-2 py-0.5 rounded-full">
              {selectedCaste} Focus
            </span>
          </h1>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Free government skill development, ₹15,000 toolkits, DBT scholarships, and low-interest loans matched to your background.
          </p>
        </div>

        {/* Profile Community Match Summary Box */}
        <div className="mt-4 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3159E8] to-[#13B8B2] flex items-center justify-center text-white shadow-xs shrink-0">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#62E6C8] block">
                Your Registered Profile
              </span>
              <p className="text-xs font-extrabold text-white">
                {profile.name || 'Citizen'} • <span className="text-[#62E6C8]">{userCaste} Category</span>
              </p>
              <span className="text-[11px] text-slate-300">
                {userCommunityCount} schemes qualify with direct benefits
              </span>
            </div>
          </div>

          {selectedCaste !== userCaste ? (
            <button
              onClick={() => setSelectedCaste(userCaste)}
              className="text-[10px] font-bold bg-[#3159E8] hover:bg-[#24135F] text-white px-2.5 py-1.5 rounded-lg transition-all border border-[#62E6C8]/30 active:scale-95 shrink-0"
            >
              Reset to {userCaste}
            </button>
          ) : (
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#62E6C8] bg-[#10152E]/60 px-2 py-1 rounded-lg border border-[#3159E8]/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Matched</span>
            </div>
          )}
        </div>
      </div>

      {/* 2. COMMUNITY / CASTE SELECTOR PILLS */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Filter className="w-3 h-3 text-[#3159E8]" />
            <span>Select Community / Caste Category</span>
          </label>
          {selectedCaste !== userCaste && (
            <button
              onClick={() => handleSetAsProfileCaste(selectedCaste)}
              className="text-[10px] text-[#3159E8] font-bold hover:underline"
            >
              Set as my profile caste
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar">
          {CASTE_OPTIONS.map((caste) => {
            const isSelected = selectedCaste === caste;
            const isUserProfileCaste = userCaste === caste;

            return (
              <button
                key={caste}
                onClick={() => setSelectedCaste(caste)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#24135F] via-[#3159E8] to-[#13B8B2] text-white shadow-sm shadow-[#3159E8]/30'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                <span>{caste === 'All' ? 'All Communities' : caste}</span>
                {isUserProfileCaste && (
                  <span className={`text-[9px] px-1 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-[#62E6C8]' : 'bg-[#EEEAFE] text-[#3159E8]'}`}>
                    You
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. SEARCH BAR & VIEW TOGGLES */}
      <div className="px-4 py-2 flex flex-col gap-2">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search solar, toolkits, loans, scholarships..."
            className="w-full h-10 pl-10 pr-9 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-[#10152E] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3159E8]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* View mode toggle: All | Saved | Applied */}
        <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-xl text-xs font-bold text-slate-600">
          <button
            onClick={() => setViewFilter('all')}
            className={`flex-1 py-1 rounded-lg transition-all text-center ${
              viewFilter === 'all'
                ? 'bg-white text-[#24135F] shadow-xs'
                : 'hover:text-[#24135F]'
            }`}
          >
            All Schemes ({filteredSchemes.length})
          </button>

          <button
            onClick={() => setViewFilter('saved')}
            className={`flex-1 py-1 rounded-lg transition-all text-center flex items-center justify-center gap-1 ${
              viewFilter === 'saved'
                ? 'bg-white text-[#24135F] shadow-xs'
                : 'hover:text-[#24135F]'
            }`}
          >
            <Bookmark className="w-3 h-3 text-[#3159E8]" />
            <span>Saved ({savedSchemeIds.length})</span>
          </button>

          <button
            onClick={() => setViewFilter('applied')}
            className={`flex-1 py-1 rounded-lg transition-all text-center flex items-center justify-center gap-1 ${
              viewFilter === 'applied'
                ? 'bg-white text-[#24135F] shadow-xs'
                : 'hover:text-[#24135F]'
            }`}
          >
            <CheckCircle2 className="w-3 h-3 text-[#13B8B2]" />
            <span>Applied ({Object.keys(appliedSchemes).length})</span>
          </button>
        </div>
      </div>

      {/* 4. BENEFIT CATEGORY FILTER PILLS */}
      <div className="px-4 py-1">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#24135F] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#62E6C8]' : 'text-[#3159E8]'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. SCHEMES CARD LIST */}
      <div className="px-4 mt-2 flex flex-col gap-3">
        {filteredSchemes.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 mt-2">
            <Landmark className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="font-bold text-sm text-slate-700">No matching schemes found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              Try switching your category filter or community selection to see available benefits.
            </p>
            <button
              onClick={() => {
                setSelectedCaste('All');
                setSelectedCategory('All');
                setSearchQuery('');
                setViewFilter('all');
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-gradient-to-r from-[#24135F] via-[#3159E8] to-[#13B8B2] text-white text-xs font-bold"
            >
              Show All Schemes
            </button>
          </div>
        ) : (
          filteredSchemes.map((scheme) => {
            const isSaved = savedSchemeIds.includes(scheme.id);
            const appliedInfo = appliedSchemes[scheme.id];
            const isCommunityExclusive =
              !scheme.applicableCastes.includes('All') &&
              scheme.applicableCastes.includes(selectedCaste as any);

            return (
              <motion.div
                key={scheme.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-2xl p-4 border transition-all relative overflow-hidden shadow-2xs hover:shadow-sm ${
                  appliedInfo
                    ? 'border-[#13B8B2]/50 bg-gradient-to-b from-[#E4FAF5]/20 to-white'
                    : isCommunityExclusive
                    ? 'border-[#3159E8]/40 ring-1 ring-[#3159E8]/20'
                    : 'border-slate-200/90'
                }`}
              >
                {/* Top Badge Bar */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {/* Category pill */}
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EEEAFE] text-[#24135F] border border-[#3159E8]/20">
                      {scheme.category}
                    </span>

                    {/* Community Priority Tag */}
                    {isCommunityExclusive ? (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-[#E4FAF5] text-[#13B8B2] border border-[#13B8B2]/40 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Exclusive for {selectedCaste}</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {scheme.applicableCastes.includes('All')
                          ? 'All Social Categories'
                          : scheme.applicableCastes.join(', ')}
                      </span>
                    )}

                    {/* Applied Badge */}
                    {appliedInfo && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 flex items-center gap-1">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                        <span>Applied ({appliedInfo.refId})</span>
                      </span>
                    )}
                  </div>

                  {/* Top Right: Read aloud & Bookmark icons */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleReadScheme(scheme, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#3159E8] hover:bg-[#EEEAFE] transition-colors"
                      title="Listen to scheme details"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={(e) => handleToggleSave(scheme.id, e)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isSaved
                          ? 'text-[#3159E8] bg-[#EEEAFE]'
                          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                      }`}
                      title={isSaved ? 'Remove from saved' : 'Save scheme'}
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-4 h-4 text-[#3159E8]" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Scheme Name & Ministry */}
                <h3 className="font-extrabold text-base text-[#10152E] leading-snug">
                  {scheme.name}
                </h3>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  {scheme.ministry}
                </p>

                {/* Financial Support / Benefit Highlight Box */}
                <div className="mt-2.5 p-3 rounded-xl bg-gradient-to-r from-[#EEEAFE]/70 via-[#E4FAF5]/70 to-[#EEEAFE]/70 border border-[#3159E8]/20 flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#3159E8] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Coins className="w-4 h-4 text-[#62E6C8]" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#3159E8] block">
                      Primary Benefit & Financial Support
                    </span>
                    <p className="text-xs font-bold text-[#10152E] mt-0.5 leading-snug">
                      {scheme.primaryBenefit}
                    </p>
                  </div>
                </div>

                {/* Special Community Note */}
                {scheme.specialSubsidyForCommunity && (
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#13B8B2] font-semibold bg-[#E4FAF5] px-2.5 py-1 rounded-lg border border-[#13B8B2]/30">
                    <Sparkles className="w-3 h-3 shrink-0 text-[#13B8B2]" />
                    <span className="leading-tight">{scheme.specialSubsidyForCommunity}</span>
                  </div>
                )}

                {/* Explainable Why This Scheme Is Shown */}
                <div className="mt-2.5 bg-[#F6F8FC] rounded-xl p-2.5 border border-slate-200/60 text-[10.5px] space-y-1">
                  <span className="font-bold text-slate-700 block uppercase text-[9px] tracking-wider">
                    Why this scheme is shown:
                  </span>
                  <p className="text-slate-600 leading-tight">
                    ✓ Matches {selectedCaste} beneficiary priority criteria
                  </p>
                  <p className="text-slate-600 leading-tight">
                    ✓ Aligned with target trade: {careerGoal || profile.currentJob || 'Solar / Technical Skills'}
                  </p>
                  <p className="text-slate-500 text-[9.5px] italic pt-0.5">
                    * Preliminary eligibility — verify on official portal
                  </p>
                </div>

                {/* Quick Eligibility Badges */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                    <span className="font-semibold text-slate-700">Income Limit:</span>
                    <span>{scheme.eligibility.maxFamilyIncome || 'None'}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                    <span className="font-semibold text-slate-700">Age:</span>
                    <span>{scheme.eligibility.ageRange || '18+'}</span>
                  </div>
                </div>

                {/* Interactive Action Buttons */}
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedSchemeForModal(scheme)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#10152E] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5 text-slate-500" />
                    <span>View Eligibility</span>
                  </button>

                  <button
                    onClick={(e) => handleStartApply(scheme, e)}
                    className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95 ${
                      appliedInfo
                        ? 'bg-[#E4FAF5] text-[#13B8B2] border border-[#13B8B2]/40'
                        : 'bg-gradient-to-r from-[#24135F] via-[#3159E8] to-[#13B8B2] hover:opacity-95 text-white'
                    }`}
                  >
                    {appliedInfo ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#13B8B2]" />
                        <span>Track Status</span>
                      </>
                    ) : (
                      <>
                        <span>Apply Online</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* 6. MODAL: DETAILED SCHEME ELIGIBILITY & DOCUMENT CHECKLIST */}
      <AnimatePresence>
        {selectedSchemeForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-br from-[#10152E] via-[#24135F] to-[#10152E] text-white p-5 relative shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#62E6C8] bg-[#24135F] px-2.5 py-0.5 rounded-full border border-[#3159E8]/40">
                    {selectedSchemeForModal.category}
                  </span>

                  <button
                    onClick={() => setSelectedSchemeForModal(null)}
                    className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h2 className="text-lg font-black leading-snug">
                  {selectedSchemeForModal.name}
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  {selectedSchemeForModal.ministry}
                </p>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-4 text-xs text-slate-700">
                
                {/* Description */}
                <div>
                  <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                    Scheme Overview
                  </h4>
                  <p className="leading-relaxed text-slate-600">
                    {selectedSchemeForModal.description}
                  </p>
                </div>

                {/* Profile Compatibility Checklist */}
                <div className="bg-[#EEEAFE]/60 p-3.5 rounded-2xl border border-[#3159E8]/20">
                  <h4 className="font-extrabold text-[#24135F] uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-[#3159E8]" />
                    <span>Your Profile Match Check</span>
                  </h4>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600">Community Category:</span>
                      <span className="font-bold text-[#10152E] flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        {userCaste} (Eligible)
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600">Family Income Range:</span>
                      <span className="font-bold text-[#10152E] flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        {profile.familyIncome || '₹10k–₹20k'} (Within ceiling)
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600">Age:</span>
                      <span className="font-bold text-[#10152E] flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        {profile.age || '19'} yrs (Eligible)
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600">Trade Alignment:</span>
                      <span className="font-bold text-[#10152E] flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        {profile.currentJob || 'Electrical Assistant'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Key Benefits List */}
                <div>
                  <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#13B8B2]" />
                    <span>Entitlements & Benefits You Receive</span>
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {selectedSchemeForModal.benefitsList.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-[#13B8B2] shrink-0 mt-0.5" />
                        <span className="text-slate-700 font-medium leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Required Documents Checklist */}
                <div>
                  <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#3159E8]" />
                    <span>Mandatory Verification Documents</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedSchemeForModal.documentsRequired.map((doc, idx) => (
                      <div key={idx} className="bg-slate-50 p-2 rounded-xl border border-slate-100 flex items-center gap-2 text-[11px] font-semibold text-slate-700">
                        <div className="w-5 h-5 rounded-md bg-[#EEEAFE] text-[#3159E8] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </div>
                        <span className="truncate">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Portal & Helpline */}
                <div className="bg-[#E4FAF5]/60 p-3 rounded-2xl border border-[#13B8B2]/30 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#13B8B2] block">
                      Official Government Portal
                    </span>
                    <a
                      href={selectedSchemeForModal.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#10152E] hover:text-[#3159E8] flex items-center gap-1"
                    >
                      <span>{selectedSchemeForModal.officialPortal}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Toll-Free Helpline
                    </span>
                    <span className="font-bold text-[#10152E]">
                      {selectedSchemeForModal.helpline}
                    </span>
                  </div>
                </div>

              </div>

              {/* Modal Footer Bar */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setSelectedSchemeForModal(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-600 hover:bg-slate-100"
                >
                  Close
                </button>

                <button
                  onClick={() => handleStartApply(selectedSchemeForModal)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#24135F] via-[#3159E8] to-[#13B8B2] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#3159E8]/30 active:scale-95 cursor-pointer"
                >
                  <span>Apply with Pre-Filled Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. MODAL: GUIDED APPLICATION SIMULATOR */}
      <AnimatePresence>
        {activeApplyingScheme && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#24135F] via-[#3159E8] to-[#13B8B2] text-white p-5 relative shrink-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-[#62E6C8] uppercase tracking-wider">
                    Step {applyStep} of 4 • Skill Bridge JanSamarth Link
                  </span>

                  <button
                    onClick={() => setActiveApplyingScheme(null)}
                    className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-extrabold text-base">
                  Apply for {activeApplyingScheme.name}
                </h3>
              </div>

              {/* Step indicator */}
              <div className="w-full bg-slate-100 h-1.5">
                <div
                  className="bg-gradient-to-r from-[#3159E8] to-[#13B8B2] h-full transition-all duration-300"
                  style={{ width: `${(applyStep / 4) * 100}%` }}
                />
              </div>

              {/* Step Contents */}
              <div className="p-5 overflow-y-auto flex-1 text-xs text-slate-700">
                
                {/* STEP 1: Verify Profile Data */}
                {applyStep === 1 && (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm mb-1">
                      <UserCheck className="w-4 h-4 text-[#3159E8]" />
                      <span>Step 1: Verify Your Pre-Filled Details</span>
                    </div>
                    <p className="text-slate-500 text-xs">
                      Skill Bridge has pre-filled your application using your verified citizen profile.
                    </p>

                    <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <div className="min-w-0">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Full Name</span>
                        <span className="font-bold text-[#10152E] text-xs break-words">{profile.name || 'Candidate'}</span>
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Mobile (Aadhaar linked)</span>
                        <span className="font-bold text-[#10152E] text-xs break-words">+91 98765 43210</span>
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Caste / Community</span>
                        <span className="font-bold text-[#13B8B2] text-xs bg-[#E4FAF5] px-2 py-0.5 rounded-full inline-block border border-[#13B8B2]/30 break-words">
                          {userCaste}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Annual Family Income</span>
                        <span className="font-bold text-[#10152E] text-xs break-words">{profile.familyIncome || '₹10k–₹20k'}</span>
                      </div>
                      <div className="col-span-2 pt-2 border-t border-slate-200 min-w-0">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Trade / Vocation</span>
                        <span className="font-bold text-[#10152E] text-xs break-words">
                          {profile.currentJob || 'Electrical Assistant'}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2 text-amber-800 text-[11px]">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        Your {userCaste} caste status qualifies you for subsidized fee exemption and direct DBT benefits under this scheme.
                      </span>
                    </div>
                  </div>
                )}

                {/* STEP 2: Document Checklist */}
                {applyStep === 2 && (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm mb-1">
                      <FileText className="w-4 h-4 text-[#3159E8]" />
                      <span>Step 2: Digital Document e-KYC Readiness</span>
                    </div>
                    <p className="text-slate-500 text-xs">
                      Confirm you have the following documents ready for automated DigiLocker verification:
                    </p>

                    <div className="flex flex-col gap-2">
                      {activeApplyingScheme.documentsRequired.map((doc, idx) => (
                        <label key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-4 h-4 accent-[#3159E8] rounded cursor-pointer"
                          />
                          <div className="flex-1">
                            <span className="font-bold text-[#10152E] text-xs block">{doc}</span>
                            <span className="text-[10px] text-slate-400">Available via DigiLocker / Aadhaar Seeding</span>
                          </div>
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3: Bank DBT & Consent */}
                {applyStep === 3 && (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm mb-1">
                      <Building2 className="w-4 h-4 text-[#3159E8]" />
                      <span>Step 3: Direct Benefit Transfer (DBT) Account</span>
                    </div>

                    <div className="bg-[#E4FAF5]/70 p-4 rounded-2xl border border-[#13B8B2]/30 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[#13B8B2] font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Aadhaar Seeding Active</span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        Any stipend or toolkit subsidy voucher will be transferred directly to your bank account via PFMS (Public Financial Management System).
                      </p>
                      <div className="bg-white p-2.5 rounded-xl border border-[#13B8B2]/20 text-[11px] text-slate-700">
                        <span className="text-slate-400 block text-[10px]">Bank Linked:</span>
                        <span className="font-bold">State Bank of India • A/C ending in 4920</span>
                      </div>
                    </div>

                    <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#3159E8] mt-0.5" />
                      <span className="text-[11px] text-slate-600 leading-snug">
                        I hereby declare that the information provided is correct to the best of my knowledge and grant consent to verify my {userCaste} category details with the national registry.
                      </span>
                    </label>
                  </div>
                )}

                {/* STEP 4: Success & Tracking Reference */}
                {applyStep === 4 && (
                  <div className="flex flex-col items-center text-center py-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#3159E8] to-[#13B8B2] text-white flex items-center justify-center shadow-lg shadow-[#13B8B2]/30 mb-3 animate-bounce">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>

                    <h4 className="font-black text-lg text-[#10152E]">
                      Application Submitted!
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs">
                      Your application has been routed to the {activeApplyingScheme.ministry}.
                    </p>

                    <div className="my-4 w-full bg-[#EEEAFE] p-4 rounded-2xl border border-[#3159E8]/30 flex flex-col gap-1 text-center">
                      <span className="text-[10px] uppercase font-bold text-[#3159E8] tracking-wider">
                        Official Acknowledgement Number
                      </span>
                      <span className="font-mono font-black text-base text-[#24135F]">
                        {appliedSchemes[activeApplyingScheme.id]?.refId || 'SB-OBC-748291'}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        SMS confirmation dispatched to +91 98765 43210
                      </span>
                    </div>

                    <div className="w-full text-left bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex flex-col gap-1">
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="font-bold text-amber-600">Pending Verification</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Community Quota:</span>
                        <span className="font-bold text-[#10152E]">{userCaste} Category</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Expected Approval:</span>
                        <span className="font-bold text-[#10152E]">3-5 Business Days</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Footer navigation */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
                {applyStep < 4 ? (
                  <>
                    <button
                      onClick={() => {
                        if (applyStep === 1) setActiveApplyingScheme(null);
                        else setApplyStep(prev => prev - 1);
                      }}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-600 hover:bg-slate-100"
                    >
                      {applyStep === 1 ? 'Cancel' : 'Back'}
                    </button>

                    <button
                      onClick={() => {
                        if (applyStep === 3) handleCompleteApply();
                        else setApplyStep(prev => prev + 1);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#24135F] via-[#3159E8] to-[#13B8B2] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#3159E8]/30 active:scale-95 cursor-pointer"
                    >
                      <span>{applyStep === 3 ? 'Confirm & Submit Application' : 'Continue'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setActiveApplyingScheme(null)}
                    className="w-full py-2.5 rounded-xl bg-[#24135F] text-white font-bold text-xs hover:bg-[#10152E] transition-colors"
                  >
                    Done & Return to Schemes
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
