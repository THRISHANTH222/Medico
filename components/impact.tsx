'use client';

import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export const Impact: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950 border-t border-slate-800/80 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
          <Heart className="w-3.5 h-3.5 fill-emerald-400" />
          OUR MISSION
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
          &quot;Access to health information should not depend on navigating a complicated application.&quot;
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          Medico explores how voice AI, multilingual speech processing, knowledge retrieval, and safety-oriented interaction can make digital health assistance more accessible to rural and underserved communities.
        </p>

        <div className="pt-4 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          Hackathon Finalist Demo • Powered by LiveKit Cloud & MOSS RAG
        </div>
      </div>
    </section>
  );
};
