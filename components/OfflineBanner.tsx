'use client';

import React from 'react';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import { WifiOff, RefreshCw, PhoneCall, Check, CloudOff } from 'lucide-react';
import { motion } from 'framer-motion';

export const OfflineBanner: React.FC = () => {
  const { offlineMode, setOfflineMode, syncQueue, syncPendingActions } = useSkillBridge();

  if (!offlineMode) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#24135F] text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-[#3159E8]/40 z-40 select-none shadow-md"
    >
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
          <CloudOff className="w-3.5 h-3.5" />
        </div>
        <div>
          <span className="font-bold text-[#62E6C8] block leading-tight">
            Offline / Low-Connectivity Mode Active
          </span>
          <span className="text-[10px] text-[#EEEAFE]/80">
            Essential profile & roadmap cached locally. {syncQueue.length} action(s) queued.
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={syncPendingActions}
          className="px-2.5 py-1 rounded-lg bg-[#3159E8] hover:bg-[#62E6C8] hover:text-[#10152E] text-white font-bold text-[10.5px] flex items-center gap-1 transition-all shadow-xs"
          title="Process pending sync queue"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Sync Now</span>
        </button>

        <button
          onClick={() => setOfflineMode(false)}
          className="text-[10px] text-slate-300 hover:text-white px-1.5 py-0.5 rounded"
          title="Exit offline mode"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
};
