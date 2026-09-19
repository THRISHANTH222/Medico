'use client';

import React from 'react';
import { Mic, Globe, Layers, Eye } from 'lucide-react';

export const Accessibility: React.FC = () => {
  const cards = [
    {
      title: 'VOICE-FIRST',
      icon: <Mic className="w-5 h-5 text-emerald-400" />,
      description: 'Minimal interaction is required after starting a consultation session.',
    },
    {
      title: 'MULTILINGUAL',
      icon: <Globe className="w-5 h-5 text-cyan-400" />,
      description: 'Users can interact in their preferred spoken language without language barriers.',
    },
    {
      title: 'SIMPLE INTERFACE',
      icon: <Layers className="w-5 h-5 text-teal-400" />,
      description: 'Designed to reduce dependence on complex digital forms and navigation menus.',
    },
    {
      title: 'CLEAR OUTPUTS',
      icon: <Eye className="w-5 h-5 text-amber-400" />,
      description: 'Responses and safety messages are presented in simple, understandable voice and text.',
    },
  ];

  return (
    <section className="py-20 bg-slate-900/60 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase bg-emerald-950/80 border border-emerald-800/60 px-3 py-1 rounded-full">
            ACCESSIBLE DESIGN
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Designed for accessibility
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal">
            Removing technical and linguistic barriers for rural and underserved communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3"
            >
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 w-fit">{card.icon}</div>
              <h3 className="text-sm font-bold text-white tracking-wider uppercase">{card.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
