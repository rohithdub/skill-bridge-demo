'use client';

import React from 'react';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { MainAppTab } from '@/types/skillbridge';
import { getUIText } from '@/lib/translations';
import { Home, Route, Briefcase, Landmark, User } from 'lucide-react';

export const BottomNavigation: React.FC = () => {
  const { activeTab, setActiveTab, selectedLanguage } = useSkillBridge();

  const navItems: { id: MainAppTab; labelKey: string; icon: any }[] = [
    {
      id: 'home',
      labelKey: 'navHome',
      icon: Home
    },
    {
      id: 'roadmap',
      labelKey: 'navRoadmap',
      icon: Route
    },
    {
      id: 'opportunities',
      labelKey: 'navOpportunities',
      icon: Briefcase
    },
    {
      id: 'schemes',
      labelKey: 'navSchemes',
      icon: Landmark
    },
    {
      id: 'profile',
      labelKey: 'navProfile',
      icon: User
    }
  ];

  return (
    <nav
      className="w-full bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2 px-1 sm:px-3 flex items-center justify-between shadow-[0_-4px_20px_rgba(36,19,95,0.06)] shrink-0 z-40 select-none"
      role="navigation"
      aria-label={getUIText('mainNavigation', selectedLanguage)}
    >
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex-1 min-w-0 flex flex-col items-center justify-center py-0.5 transition-all relative cursor-pointer active:scale-95 px-0.5 ${
              isActive
                ? 'text-[#24135F] font-bold'
                : 'text-slate-400 hover:text-[#24135F] font-medium'
            }`}
            aria-selected={isActive}
          >
            {/* Active Highlight Indicator Bar with Brand Gradient */}
            {isActive && (
              <span className="absolute -top-2 w-7 sm:w-9 h-1 bg-gradient-to-r from-[#24135F] via-[#3159E8] via-[#13B8B2] to-[#62E6C8] rounded-full" />
            )}

            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                isActive
                  ? 'bg-[#EEEAFE] text-[#3159E8] shadow-xs'
                  : 'bg-transparent text-slate-500'
              }`}
            >
              <IconComponent className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
            </div>

            <span className={`text-[9px] sm:text-[10.5px] mt-0.5 tracking-tight text-center leading-tight truncate max-w-full ${isActive ? 'text-[#24135F] font-bold' : ''}`}>
              {getUIText(item.labelKey, selectedLanguage)}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
