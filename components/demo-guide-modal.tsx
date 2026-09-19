'use client';

import React from 'react';
import { X, Mic, Play, Sparkles, CheckCircle2 } from 'lucide-react';

interface DemoGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartConsultation: () => void;
}

export const DemoGuideModal: React.FC<DemoGuideModalProps> = ({
  isOpen,
  onClose,
  onStartConsultation,
}) => {
  if (!isOpen) return null;

  const steps = [
    { num: '01', title: 'Open Consultation', desc: 'Scroll to the Live Consultation section.' },
    { num: '02', title: 'Allow Microphone', desc: 'Grant browser microphone permission when prompted.' },
    { num: '03', title: 'Start Consultation', desc: 'Click "Start Consultation" to connect to LiveKit.' },
    { num: '04', title: 'Speak Naturally', desc: 'Speak into your microphone in your chosen language.' },
    { num: '05', title: 'Try Telugu, Hindi, or English', desc: 'Test multilingual voice understanding.' },
    { num: '06', title: 'Observe Live Response', desc: 'Hear the agent response and see the transcript update.' },
  ];

  const handleStartDemo = () => {
    onClose();
    onStartConsultation();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel rounded-3xl border border-slate-700/80 max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden bg-slate-900/95">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Demo Guide"
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
            <Sparkles className="w-3.5 h-3.5" />
            HACKATHON JUDGE GUIDE
          </div>
          <h3 className="text-2xl font-extrabold text-white">2-Minute Judge Demo</h3>
          <p className="text-xs text-slate-300">
            Follow these simple steps to test Medico&apos;s real-time voice consultation agent.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {steps.map((s) => (
            <div
              key={s.num}
              className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 flex items-start gap-3"
            >
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-1 rounded border border-emerald-900">
                {s.num}
              </span>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-white">{s.title}</h4>
                <p className="text-[11px] text-slate-400 leading-tight">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Example Spoken Prompts */}
        <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-2.5">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Mic className="w-3.5 h-3.5 text-emerald-400" />
            Recommended Test Prompts
          </h4>
          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-200 font-serif">&quot;నాకు జ్వరం మరియు తలనొప్పి ఉంది&quot;</span>
              <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-900">Telugu</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-200 font-serif">&quot;मुझे बुखार और सिरदर्द है&quot;</span>
              <span className="text-[10px] text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-900">Hindi</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-200">&quot;I have a fever and headache. What should I do?&quot;</span>
              <span className="text-[10px] text-teal-400 font-semibold px-2 py-0.5 rounded bg-teal-950 border border-teal-900">English</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            Note: Demo examples are for testing the voice interaction. The AI response is generated live by the backend agent.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleStartDemo}
            className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/50"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            Launch Live Consultation Demo
          </button>
        </div>
      </div>
    </div>
  );
};
