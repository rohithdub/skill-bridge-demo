'use client';

import React, { useState, useEffect } from 'react';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import {
  Phone,
  PhoneOff,
  PhoneCall,
  Volume2,
  VolumeX,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Check,
  Hash
} from 'lucide-react';
import { motion } from 'framer-motion';

export const IVRSimulatorModal: React.FC = () => {
  const {
    activeSimulator,
    setActiveSimulator,
    profile,
    careerGoal,
    speakText,
    selectedLanguage
  } = useSkillBridge();

  const [callState, setCallState] = useState<'incoming' | 'connected' | 'ended'>('incoming');
  const [callDuration, setCallDuration] = useState<number>(0);
  const [ivrStep, setIvrStep] = useState<number>(1);
  const [ivrMessage, setIvrMessage] = useState<string>(
    'Welcome to PM-AJAY Skill Bridge National Helpline. Press 1 for Tamil, 2 for Hindi, 3 for English.'
  );
  const [smsNotification, setSmsNotification] = useState<string | null>(null);
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callState === 'connected') {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callState]);

  if (activeSimulator !== 'ivr') return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleAnswer = () => {
    setCallState('connected');
    const prompt = 'Welcome to PM-AJAY Skill Bridge National Helpline. Press 1 for Tamil, 2 for Hindi, 3 for English. Or press 4 for Your Next Step.';
    setIvrMessage(prompt);
    speakText(prompt, 'en');
  };

  const handleHangUp = () => {
    setCallState('ended');
    setTimeout(() => {
      setActiveSimulator(null);
      setCallState('incoming');
      setCallDuration(0);
      setSmsNotification(null);
    }, 800);
  };

  const handleKeyPress = (key: string) => {
    setPressedKey(key);
    setTimeout(() => setPressedKey(null), 300);

    if (key === '1') {
      const msg = 'வணக்கம்! உங்கள் PM-AJAY திட்ட வழிகாட்டி தயார். அடுத்த படிக்கு 4ஐ அழுத்தவும். வேலை வாய்ப்புகளுக்கு 5ஐ அழுத்தவும்.';
      setIvrMessage(msg);
      speakText(msg, 'ta');
    } else if (key === '2') {
      const msg = 'नमस्ते! आपका पीएम-अजय कौशल सहायक तैयार है। अगले कदम के लिए 4 दबाएं। नौकरी के अवसरों के लिए 5 दबाएं।';
      setIvrMessage(msg);
      speakText(msg, 'hi');
    } else if (key === '3') {
      const msg = 'English selected. Press 4 for Your Next Step, or 5 to hear nearby matched job vacancies.';
      setIvrMessage(msg);
      speakText(msg, 'en');
    } else if (key === '4') {
      const msg = `Hello ${profile.name || 'Citizen'}! Your next best step is enrolling in the Suryamitra Solar Rooftop training at Guindy Skill Hub. 8 seats left, 100% free with stipend. An SMS confirmation has been sent.`;
      setIvrMessage(msg);
      speakText(msg, 'en');
      setSmsNotification(`[Govt SMS] Dear ${profile.name || 'Candidate'}, your seat is reserved at Guindy Hub for Suryamitra Batch (100% Free under PM-AJAY). Call: 1800-11-0505.`);
    } else if (key === '5') {
      const msg = 'Matched opportunity: SunPower Clean Energy Ltd in Guindy Industrial Estate, 6.4 km away. Salary range ₹22,000 to ₹28,000 per month.';
      setIvrMessage(msg);
      speakText(msg, 'en');
      setSmsNotification(`[Govt SMS] Job Alert: SunPower Rooftop Technician (₹24,000/mo). Interview on 03 Oct. Location: Guindy.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-sm bg-[#10152E] text-white rounded-[38px] p-6 shadow-2xl border border-slate-700 flex flex-col justify-between min-h-[580px] relative overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#3159E8]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Prototype Header Banner */}
        <div className="flex items-center justify-between text-[10px] text-[#62E6C8] font-semibold border-b border-white/10 pb-2.5">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#62E6C8]" />
            <span>IVR Experience Simulator</span>
          </span>
          <span className="bg-white/10 px-2 py-0.5 rounded-full text-slate-300 font-mono">
            Low-Tech / Feature Phone
          </span>
        </div>

        {/* SMS Preview Banner if triggered */}
        {smsNotification && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 bg-emerald-950/90 text-emerald-200 border border-emerald-500/40 rounded-2xl p-2.5 text-[10px] leading-snug flex items-start gap-2 shadow-lg"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-emerald-300 font-bold">Simulated SMS Received:</strong>
              <span>{smsNotification}</span>
            </div>
          </motion.div>
        )}

        {/* Call Info Header */}
        <div className="text-center py-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#24135F] to-[#3159E8] mx-auto flex items-center justify-center text-white mb-2 shadow-lg border border-[#62E6C8]/40">
            <PhoneCall className="w-7 h-7 text-[#62E6C8] animate-pulse" />
          </div>
          <h2 className="text-base font-extrabold text-white">
            1800-11-0505
          </h2>
          <p className="text-[11px] text-[#EEEAFE]/80 font-medium">
            PM-AJAY Skill Bridge National Toll-Free
          </p>

          <span className="inline-block mt-1 text-[11px] font-mono text-[#62E6C8] font-bold">
            {callState === 'incoming' && 'Incoming Call...'}
            {callState === 'connected' && `Call in progress • ${formatTime(callDuration)}`}
            {callState === 'ended' && 'Call Ended'}
          </span>
        </div>

        {/* Live Audio / IVR Status Prompt Display */}
        {callState === 'connected' && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/10 text-center space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#62E6C8] font-bold uppercase tracking-wider">
              <Volume2 className="w-3.5 h-3.5 text-[#62E6C8] animate-bounce" />
              <span>Helpline Voice Prompt:</span>
            </div>
            <p className="text-xs text-white leading-relaxed font-medium">
              "{ivrMessage}"
            </p>
          </div>
        )}

        {/* Dialpad (Active when connected) */}
        {callState === 'connected' && (
          <div className="grid grid-cols-3 gap-2 px-2 my-2">
            {[
              { k: '1', sub: 'Tamil' },
              { k: '2', sub: 'Hindi' },
              { k: '3', sub: 'English' },
              { k: '4', sub: 'Next Step' },
              { k: '5', sub: 'Jobs' },
              { k: '6', sub: 'Schemes' },
              { k: '7', sub: 'Officer' },
              { k: '8', sub: 'Repeat' },
              { k: '9', sub: 'Status' }
            ].map(d => (
              <button
                key={d.k}
                onClick={() => handleKeyPress(d.k)}
                className={`py-2 rounded-2xl border text-center transition-all cursor-pointer ${
                  pressedKey === d.k
                    ? 'bg-[#3159E8] border-[#62E6C8] text-white scale-95'
                    : 'bg-white/5 border-white/10 text-white hover:bg-white/15'
                }`}
              >
                <span className="text-base font-extrabold block leading-tight">{d.k}</span>
                <span className="text-[8px] text-slate-400 block font-medium uppercase">{d.sub}</span>
              </button>
            ))}
          </div>
        )}

        {/* Bottom Call Action Buttons */}
        <div className="pt-2 flex items-center justify-center gap-6">
          {callState === 'incoming' ? (
            <>
              <button
                onClick={handleHangUp}
                className="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all"
                title="Decline"
              >
                <PhoneOff className="w-6 h-6" />
              </button>

              <button
                onClick={handleAnswer}
                className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/40 active:scale-95 transition-all animate-bounce"
                title="Answer Call"
              >
                <Phone className="w-6 h-6" />
              </button>
            </>
          ) : (
            <button
              onClick={handleHangUp}
              className="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all mx-auto"
              title="End Call"
            >
              <PhoneOff className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Disclaimer Footer */}
        <div className="text-center pt-2">
          <p className="text-[9px] text-slate-400">
            Prototype Simulation • Integrates with telephony gateways (Exotel / Twilio / NIC IVR)
          </p>
        </div>
      </motion.div>
    </div>
  );
};
