'use client';

import React from 'react';
import { Languages as LanguagesIcon, Sparkles } from 'lucide-react';

export const Languages: React.FC = () => {
  return (
    <section id="languages" className="py-20 bg-slate-950 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-teal-400 tracking-wider uppercase bg-teal-950/80 border border-teal-800/60 px-3 py-1 rounded-full">
            MULTILINGUAL SUPPORT
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Speak naturally
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal">
            Designed around natural voice interaction rather than complex digital forms or language selectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Telugu */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3 text-center hover:border-emerald-500/50 transition-colors">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">TELUGU</span>
            <h3 className="text-2xl font-bold text-white font-serif">తెలుగులో మాట్లాడండి</h3>
            <p className="text-xs text-slate-400">Full speech-to-speech interaction in native Telugu.</p>
          </div>

          {/* Hindi */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3 text-center hover:border-cyan-500/50 transition-colors">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">HINDI</span>
            <h3 className="text-2xl font-bold text-white font-serif">हिंदी में बोलें</h3>
            <p className="text-xs text-slate-400">Natural conversational support in Hindi.</p>
          </div>

          {/* English */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3 text-center hover:border-teal-500/50 transition-colors">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">ENGLISH</span>
            <h3 className="text-2xl font-bold text-white">Speak in English</h3>
            <p className="text-xs text-slate-400">Clear health dialogue in standard English.</p>
          </div>

          {/* Code-Switching */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3 text-center hover:border-amber-500/50 transition-colors">
            <div className="flex items-center justify-center gap-1 text-amber-400 font-bold text-xs">
              <Sparkles className="w-4 h-4" />
              CODE-SWITCHING
            </div>
            <h3 className="text-lg font-bold text-white">Mixed-Language Voice</h3>
            <p className="text-xs text-slate-400">
              Supports natural language mixing (e.g. &quot;నాకు fever ఉంది, what should I do?&quot;).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
