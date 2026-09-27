'use client';

import React, { useState } from 'react';
import { useSkillBridge } from '@/context/SkillBridgeContext';
import {
  Mic,
  Send,
  Sparkles,
  Play,
  Pause,
  CheckCheck,
  ChevronLeft,
  MoreVertical,
  Paperclip,
  Smile,
  ArrowRight,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { motion } from 'framer-motion';

export const WhatsAppSimulatorModal: React.FC = () => {
  const {
    activeSimulator,
    setActiveSimulator,
    profile,
    careerGoal,
    speakText,
    setActiveTab
  } = useSkillBridge();

  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<{
    id: string;
    sender: 'user' | 'bot';
    type: 'text' | 'voice';
    text?: string;
    audioDuration?: string;
    transcription?: string;
    actionCard?: {
      title: string;
      company: string;
      salary: string;
      location: string;
    };
    time: string;
  }>>([
    {
      id: 'wa-1',
      sender: 'bot',
      type: 'text',
      text: `Vanakkam ${profile.name ? profile.name.split(' ')[0] : 'Citizen'}! 🙏 This is your PM-AJAY Skill Bridge automated WhatsApp Sahayak. You can send a text or voice note in any language to discover training, schemes, or jobs near you.`,
      time: '10:14 AM'
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isProcessingVoice, setIsProcessingVoice] = useState<boolean>(false);

  if (activeSimulator !== 'whatsapp') return null;

  const handleSendVoiceNote = () => {
    setIsProcessingVoice(true);

    const voiceMsg = {
      id: `wa-v-${Date.now()}`,
      sender: 'user' as const,
      type: 'voice' as const,
      audioDuration: '0:05',
      transcription: 'Enakku solar panel velai venum, Chennai-la training irukka? (I want a solar panel job, is training available in Chennai?)',
      time: 'Just now'
    };

    setMessages(prev => [...prev, voiceMsg]);

    setTimeout(() => {
      setIsProcessingVoice(false);
      const replyMsg = {
        id: `wa-r-${Date.now()}`,
        sender: 'bot' as const,
        type: 'text' as const,
        text: `Based on your voice note, we matched 1 Free PM-AJAY Training batch and 1 verified job vacancy in Chennai:`,
        actionCard: {
          title: 'Solar PV Rooftop Technician',
          company: 'SunPower Clean Energy Ltd (Demo Employer)',
          salary: '₹22,000 – ₹28,000 / month',
          location: 'Guindy Industrial Estate (6.4 km away)'
        },
        time: 'Just now'
      };
      setMessages(prev => [...prev, replyMsg]);
      speakText('Based on your voice note, here is your matched solar technician training and vacancy in Chennai.', 'en');
    }, 1500);
  };

  const handleSendText = () => {
    if (!inputText.trim()) return;
    const userMsg = {
      id: `wa-t-${Date.now()}`,
      sender: 'user' as const,
      type: 'text' as const,
      text: inputText,
      time: 'Just now'
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      const replyMsg = {
        id: `wa-r-${Date.now()}`,
        sender: 'bot' as const,
        type: 'text' as const,
        text: `Received! As an SC beneficiary under PM-AJAY, your profile is eligible for ₹50,000 direct capital grants, Suryamitra free training, and nearby job interviews.`,
        time: 'Just now'
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1000);
  };

  const handleOpenApp = () => {
    setActiveSimulator(null);
    setActiveTab('opportunities');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-sm bg-[#EFEAE2] text-[#111B21] rounded-[34px] shadow-2xl flex flex-col h-[620px] overflow-hidden border border-slate-300 relative"
      >
        {/* WhatsApp Green App Header */}
        <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSimulator(null)}
              className="p-1 text-white hover:bg-white/10 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#24135F] to-[#13B8B2] text-white font-bold flex items-center justify-center text-xs border border-white/30">
              SB
            </div>

            <div>
              <h2 className="text-xs font-bold leading-tight flex items-center gap-1">
                <span>Skill Bridge PM-AJAY</span>
                <span className="text-[10px] text-[#25D366]">✓</span>
              </h2>
              <span className="text-[10px] text-white/80 block">Official Government Sahayak</span>
            </div>
          </div>

          <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded-full text-white font-mono">
            Prototype Sim
          </span>
        </div>

        {/* WhatsApp Chat Wallpaper Body */}
        <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs">
          <div className="text-center my-1">
            <span className="bg-[#E1D7CA] text-slate-700 text-[10px] px-3 py-1 rounded-lg font-medium shadow-2xs">
              MESSAGES ARE END-TO-END ENCRYPTED
            </span>
          </div>

          {messages.map(m => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-2.5 shadow-2xs relative leading-relaxed ${
                    isUser
                      ? 'bg-[#D9FDD3] text-[#111B21] rounded-tr-xs'
                      : 'bg-white text-[#111B21] rounded-tl-xs border border-slate-200/60'
                  }`}
                >
                  {/* Voice Note Simulation */}
                  {m.type === 'voice' ? (
                    <div className="space-y-1.5 min-w-[210px]">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                          className="w-8 h-8 rounded-full bg-[#128C7E] text-white flex items-center justify-center shrink-0 active:scale-95"
                        >
                          {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                        </button>
                        <div className="flex-1 flex items-center gap-0.5 h-4">
                          {[3, 6, 8, 4, 9, 7, 5, 10, 6, 4, 8, 6, 3, 7, 5].map((h, i) => (
                            <div
                              key={i}
                              style={{ height: `${h * 2}px` }}
                              className={`flex-1 rounded-full ${
                                isPlayingAudio ? 'bg-[#128C7E] animate-pulse' : 'bg-slate-400'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">{m.audioDuration}</span>
                      </div>

                      {m.transcription && (
                        <div className="bg-[#F0F2F5] p-2 rounded-xl text-[10.5px] text-slate-700 border border-slate-200">
                          <strong className="block text-[9px] text-[#075E54] uppercase">AI Auto-Transcription:</strong>
                          <span>"{m.transcription}"</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-[#111B21]">{m.text}</p>
                  )}

                  {/* Rich Action Card */}
                  {m.actionCard && (
                    <div className="mt-2 p-2.5 bg-[#F8F9FA] rounded-xl border border-slate-200 space-y-1.5">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-[#128C7E] uppercase">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>Matched Opportunity</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">{m.actionCard.title}</h4>
                      <p className="text-[11px] text-slate-600 font-medium">{m.actionCard.company}</p>
                      <p className="text-[11px] font-bold text-emerald-700">{m.actionCard.salary}</p>
                      <p className="text-[10px] text-slate-500">{m.actionCard.location}</p>

                      <button
                        onClick={handleOpenApp}
                        className="w-full mt-1 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-slate-900 font-bold text-xs flex items-center justify-center gap-1 shadow-xs"
                      >
                        <span>Apply on Skill Bridge</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-1 text-[9px] text-slate-500 mt-0.5">
                    <span>{m.time}</span>
                    {isUser && <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />}
                  </div>
                </div>
              </div>
            );
          })}

          {isProcessingVoice && (
            <div className="bg-white rounded-2xl p-2.5 text-xs text-slate-600 max-w-[70%] shadow-2xs flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#128C7E] animate-ping" />
              <span>Transcribing audio voice note...</span>
            </div>
          )}
        </div>

        {/* Voice Note Simulation Quick Action */}
        <div className="bg-[#F0F2F5] px-3 py-1.5 border-t border-slate-300 flex items-center justify-between text-xs">
          <span className="text-[10.5px] text-slate-600 font-semibold">Simulate Voice Input:</span>
          <button
            onClick={handleSendVoiceNote}
            className="px-2.5 py-1 rounded-xl bg-[#25D366] text-slate-900 text-[11px] font-bold flex items-center gap-1 shadow-xs active:scale-95 cursor-pointer"
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Send Demo Voice Note</span>
          </button>
        </div>

        {/* WhatsApp Message Input Bar */}
        <div className="bg-[#F0F2F5] p-2 flex items-center gap-2 border-t border-slate-300">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
            placeholder="Type a message or tap voice note..."
            className="flex-1 bg-white rounded-full px-3.5 py-2 text-xs border-0 outline-none shadow-xs text-slate-800"
          />

          <button
            onClick={handleSendText}
            className="w-9 h-9 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white flex items-center justify-center shrink-0 shadow-sm active:scale-95 transition-all"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
