'use client';

import React from 'react';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { MainAppTab } from '@/types/skillbridge';
import { Mic, Route, User } from 'lucide-react';

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
      id: 'profile',
      label: 'Profile',
      icon: User
    }
  ];

  return (
    <nav
      className="w-full bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2 px-6 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.06)] shrink-0 z-40 select-none"
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
            className={`flex-1 flex flex-col items-center justify-center py-1 transition-all relative cursor-pointer active:scale-95 ${
              isActive
                ? 'text-emerald-600 font-bold'
                : 'text-slate-400 hover:text-slate-600 font-medium'
            }`}
            aria-selected={isActive}
          >
            {/* Active Highlight Indicator Pill */}
            {isActive && (
              <span className="absolute -top-2 w-8 h-1 bg-emerald-500 rounded-full" />
            )}

            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${
                isActive
                  ? 'bg-emerald-50 text-emerald-600 shadow-xs'
                  : 'bg-transparent text-slate-500'
              }`}
            >
              <IconComponent className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
            </div>

            <span className="text-[11px] mt-0.5 tracking-tight">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
