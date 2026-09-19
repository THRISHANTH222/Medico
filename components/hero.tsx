'use client';

import React from 'react';
import { Mic, Sparkles, Shield, Database, Languages, ArrowDown, HelpCircle } from 'lucide-react';

interface HeroProps {
  onStartConsultation: () => void;
  onExploreHowItWorks: () => void;
  onOpenDemoGuide: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartConsultation,
  onExploreHowItWorks,
  onOpenDemoGuide,
}) => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 border-b border-slate-800/60">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[200px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status badges */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                AI Agent Online
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-900 text-slate-300 border border-slate-800">
                ● SYSTEM ONLINE
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Healthcare guidance, <br className="hidden sm:inline" />
              <span className="text-gradient">in your language.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Medico is a multilingual, voice-first AI health assistance system designed to help people access understandable health information and recognize when professional medical attention may be needed.
            </p>

            {/* Feature Chips */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <span className="px-3 py-1 rounded-lg bg-slate-900/90 text-slate-300 border border-slate-800 text-xs font-medium flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5 text-emerald-400" />
                Telugu • Hindi • English
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-900/90 text-slate-300 border border-slate-800 text-xs font-medium flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-teal-400" />
                Voice-First
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-900/90 text-slate-300 border border-slate-800 text-xs font-medium flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-cyan-400" />
                Knowledge-Grounded
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-900/90 text-slate-300 border border-slate-800 text-xs font-medium flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                Safety-First
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onStartConsultation}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold px-7 py-3.5 rounded-2xl text-base transition-all shadow-xl shadow-emerald-950/60 hover:shadow-emerald-900/70 flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-5 h-5 fill-slate-950" />
                Start Voice Consultation
              </button>

              <button
                onClick={onExploreHowItWorks}
                className="w-full sm:w-auto bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 px-6 py-3.5 rounded-2xl text-base font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Explore How It Works
                <ArrowDown className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={onOpenDemoGuide}
                className="w-full sm:w-auto bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/80 px-5 py-3.5 rounded-2xl text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                2-Min Judge Demo
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Voice Teaser Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative glass-panel rounded-3xl p-8 max-w-sm w-full border border-slate-800/80 shadow-2xl flex flex-col items-center text-center space-y-6">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-950 border border-emerald-800/80 rounded-full text-[11px] font-semibold text-emerald-400 tracking-wider uppercase">
                Interactive Voice Prototype
              </div>

              {/* Decorative Audio Pulse Button */}
              <div className="relative my-4">
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-pulse-ring"></div>
                <button
                  onClick={onStartConsultation}
                  className="relative z-10 w-28 h-28 rounded-full bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 p-1 flex items-center justify-center shadow-xl glow-emerald transform hover:scale-105 transition-all cursor-pointer group"
                >
                  <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center text-white group-hover:bg-slate-900/90 transition-colors">
                    <Mic className="w-10 h-10 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                  </div>
                </button>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-white">Tap to Start Voice Session</h3>
                <p className="text-xs text-slate-400">
                  Speak in Telugu, Hindi, or English. Medico listens and responds naturally.
                </p>
              </div>

              {/* Sample Voice Prompts Teaser */}
              <div className="w-full pt-2 border-t border-slate-800/80 space-y-2 text-left">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Sample Spoken Prompts
                </div>
                <div className="bg-slate-900/80 rounded-xl p-2.5 text-xs text-slate-300 border border-slate-800 flex items-center justify-between">
                  <span>&quot;నాకు జ్వరం మరియు తలనొప్పి ఉంది&quot;</span>
                  <span className="text-[10px] text-emerald-400 font-semibold px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-900">Telugu</span>
                </div>
                <div className="bg-slate-900/80 rounded-xl p-2.5 text-xs text-slate-300 border border-slate-800 flex items-center justify-between">
                  <span>&quot;मुझे बुखार और सिरदर्द है&quot;</span>
                  <span className="text-[10px] text-cyan-400 font-semibold px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-900">Hindi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
