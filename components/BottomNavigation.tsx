'use client';

import React from 'react';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { MainAppTab } from '@/types/skillbridge';
import { Mic, Route, Landmark, User } from 'lucide-react';

export const BottomNavigation: React.FC = () => {
  const { activeTab, setActiveTab } = useSkillBridge();

  const navItems: { id: MainAppTab; label: string; icon: any }[] = [
    {
      id: 'voice',
      label: 'Voice Assistant',
      icon: Mic
    },
    {
      id: 'roadmap',
      label: 'Skill Roadmap',
      icon: Route
    },
    {
      id: 'schemes',
      label: 'Schemes',
      icon: Landmark
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User
    }
  ];

  return (
    <nav
      className="w-full bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2 px-2 sm:px-4 flex items-center justify-between shadow-[0_-4px_20px_rgba(36,19,95,0.06)] shrink-0 z-40 select-none"
      role="navigation"
      aria-label="Main navigation"
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
              <span className="absolute -top-2 w-8 sm:w-10 h-1 bg-gradient-to-r from-[#24135F] via-[#3159E8] via-[#13B8B2] to-[#62E6C8] rounded-full" />
            )}

            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center transition-colors shrink-0 ${
                isActive
                  ? 'bg-[#EEEAFE] text-[#3159E8] shadow-xs'
                  : 'bg-transparent text-slate-500'
              }`}
            >
              <IconComponent className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
            </div>

            <span className={`text-[9.5px] sm:text-[11px] mt-0.5 tracking-tight text-center leading-tight truncate max-w-full ${isActive ? 'text-[#24135F] font-bold' : ''}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
