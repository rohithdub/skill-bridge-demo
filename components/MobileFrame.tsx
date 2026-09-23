'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';
import { DemoToolbar } from './DemoToolbar';

interface MobileFrameProps {
  children: ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const [time, setTime] = useState<string>('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-950 flex flex-col items-center justify-center p-0 md:py-6 md:px-4 font-sans antialiased text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Centered Mobile Device Frame for Desktop / Edge-to-Edge on Mobile */}
      <div className="w-full max-w-md h-full min-h-screen md:min-h-[844px] md:max-h-[896px] bg-slate-50 flex flex-col overflow-hidden relative md:rounded-[42px] md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),0_0_0_12px_#1e293b,0_0_0_14px_#334155] border-0 md:border border-slate-700/30">
        
        {/* SIH Quick Action Header */}
        <DemoToolbar />

        {/* Mobile Device Status Bar */}
        <div className="w-full bg-slate-50 px-6 pt-3 pb-2 flex items-center justify-between text-xs font-semibold text-slate-800 select-none z-40 shrink-0">
          <span className="tracking-tight">{time}</span>

          {/* Speaker / Dynamic Island Simulation Notch on Desktop */}
          <div className="hidden md:block w-24 h-4 bg-slate-900 rounded-full mx-auto -mt-1"></div>

          <div className="flex items-center gap-1.5 text-slate-800">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4 fill-slate-800" />
          </div>
        </div>

        {/* Inner App Container */}
        <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden relative bg-slate-50">
          {children}
        </div>
      </div>
    </div>
  );
};
