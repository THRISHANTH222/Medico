'use client';

import React from 'react';
import { Cpu, Database, Network, Server, Zap, Globe2, Sparkles, Layers } from 'lucide-react';

export const Architecture: React.FC = () => {
  return (
    <section id="architecture" className="py-20 bg-slate-950 border-t border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase bg-cyan-950/80 border border-cyan-800/60 px-3 py-1 rounded-full">
            SYSTEM ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Inside Medico
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal">
            A production-ready voice AI architecture combining WebSockets, cloud inference, and medical knowledge retrieval.
          </p>
        </div>

        {/* Architecture Flow Visualizer */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-8 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center relative">
            {/* Step 1: User & Web App */}
            <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-2 relative">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center mx-auto">
                <Globe2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Frontend</span>
              <h4 className="text-sm font-bold text-white">Medico Web App</h4>
              <p className="text-[11px] text-slate-400">Next.js • React • Tailwind • Render</p>
            </div>

            {/* Step 2: LiveKit Cloud */}
            <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-2 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto">
                <Network className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Realtime Transport</span>
              <h4 className="text-sm font-bold text-white">LiveKit Cloud</h4>
              <p className="text-[11px] text-slate-400">WebRTC Audio Transport & Room Dispatch</p>
            </div>

            {/* Step 3: Python AI Agent */}
            <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-2 relative">
              <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-800 text-teal-400 flex items-center justify-center mx-auto">
                <Server className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">AI Orchestration</span>
              <h4 className="text-sm font-bold text-white">Python AI Agent</h4>
              <p className="text-[11px] text-slate-400">LiveKit Agents SDK • Render Worker</p>
            </div>

            {/* Step 4: AI Services Pipeline */}
            <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-2 relative">
              <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-800 text-amber-400 flex items-center justify-center mx-auto">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Backend Services</span>
              <h4 className="text-sm font-bold text-white">Gladia + OpenAI + MOSS</h4>
              <p className="text-[11px] text-slate-400">STT • LLM Reasoning • RAG Index</p>
            </div>
          </div>

          {/* Deep Dive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-800/80">
            <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <Zap className="w-4 h-4" />
                Gladia Multilingual STT
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Processes real-time speech streams with automatic language detection and code-switching across Telugu, Hindi, and English.
              </p>
            </div>

            <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                <Database className="w-4 h-4" />
                MOSS Knowledge RAG
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Backend agent queries the <code className="text-cyan-300 font-mono">rural-health</code> index for grounded medical facts before generating health responses.
              </p>
            </div>

            <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <Layers className="w-4 h-4" />
                Fish Audio TTS
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Generates expressive, natural sounding voice output in the user&apos;s primary language on LiveKit Inference.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
