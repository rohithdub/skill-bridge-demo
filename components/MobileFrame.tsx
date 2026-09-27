'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import { Wifi, Battery, Signal, Maximize2, Minimize2 } from 'lucide-react';
import { DemoToolbar } from './DemoToolbar';
import { useSkillBridge } from '@/context/SkillBridgeContext';

interface MobileFrameProps {
  children: ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const { stage } = useSkillBridge();
  const [time, setTime] = useState<string>('09:41');
  const [isWideAdmin, setIsWideAdmin] = useState<boolean>(false);

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

  const isAdminDashboard = stage === 'admin_dashboard';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#10152E] via-[#24135F] to-[#10152E] flex flex-col items-center justify-center p-0 md:py-6 md:px-4 font-sans antialiased text-[#10152E] selection:bg-[#3159E8] selection:text-white transition-all duration-300">
      
      {/* Device Frame with Skill Bridge Signature Glow */}
      <div 
        className={`w-full h-full min-h-screen md:min-h-[844px] md:max-h-[896px] bg-[#F6F8FC] flex flex-col overflow-hidden relative md:rounded-[42px] md:shadow-[0_25px_60px_-15px_rgba(36,19,95,0.7),0_0_0_12px_#10152E,0_0_0_14px_rgba(49,89,232,0.25)] border-0 md:border border-[#3159E8]/30 transition-all duration-300 ${
          isAdminDashboard && isWideAdmin 
            ? 'max-w-4xl md:rounded-3xl' 
            : 'max-w-md'
        }`}
      >
        
        {/* SIH Quick Action Header */}
        <DemoToolbar />

        {/* Mobile Device Status Bar */}
        <div className="w-full bg-[#F6F8FC] px-6 pt-3 pb-2 flex items-center justify-between text-xs font-semibold text-[#10152E] select-none z-40 shrink-0 border-b border-slate-200/60">
          <span className="tracking-tight">{time}</span>

          {/* Dynamic Island / Speaker Notch Simulation or Wide Mode Switcher */}
          {isAdminDashboard ? (
            <button
              onClick={() => setIsWideAdmin(!isWideAdmin)}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#10152E] text-white text-[10px] font-semibold hover:bg-[#24135F] transition-all cursor-pointer shadow-xs border border-[#3159E8]/40"
              title={isWideAdmin ? 'Switch to mobile view' : 'Expand to wide dashboard'}
            >
              {isWideAdmin ? (
                <>
                  <Minimize2 className="w-3 h-3 text-[#62E6C8]" />
                  <span>Mobile View</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3 h-3 text-[#62E6C8]" />
                  <span>Expand Wide</span>
                </>
              )}
            </button>
          ) : (
            <div className="hidden md:block w-24 h-4 bg-[#10152E] rounded-full mx-auto -mt-1 shadow-inner" />
          )}

          <div className="flex items-center gap-1.5 text-[#10152E]">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4 fill-[#10152E]" />
          </div>
        </div>

        {/* Inner App Container */}
        <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden relative bg-[#F6F8FC]">
          {children}
        </div>
      </div>
    </div>
  );
};
