'use client';

import React from 'react';
import { Mic, Zap, Cpu, Database, ShieldCheck, Volume2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'VOICE',
      icon: <Mic className="w-6 h-6 text-emerald-400" />,
      description: 'Speak naturally in Telugu, Hindi, or English without filling out forms.',
    },
    {
      number: '02',
      title: 'SPEECH RECOGNITION',
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      description: 'Your speech is processed through Gladia multilingual speech recognition.',
    },
    {
      number: '03',
      title: 'AI UNDERSTANDING',
      icon: <Cpu className="w-6 h-6 text-cyan-400" />,
      description: 'The Medico AI agent analyzes symptoms and intent in real-time.',
    },
    {
      number: '04',
      title: 'KNOWLEDGE GROUNDING',
      icon: <Database className="w-6 h-6 text-blue-400" />,
      description: 'Relevant information is retrieved from the curated rural-health knowledge base.',
    },
    {
      number: '05',
      title: 'SAFETY SCREENING',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      description: 'Potential red flags trigger professional medical escalation recommendations.',
    },
    {
      number: '06',
      title: 'VOICE RESPONSE',
      icon: <Volume2 className="w-6 h-6 text-teal-400" />,
      description: 'Understandable voice response is delivered back in your spoken language.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-900/60 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase bg-emerald-950/80 border border-emerald-800/60 px-3 py-1 rounded-full">
            SYSTEM PIPELINE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Medico works
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal">
            A 6-step voice-first pipeline delivering grounded health information in natural language.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="glass-panel glass-panel-hover rounded-2xl p-6 border border-slate-800/80 flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">{step.icon}</div>
                <span className="text-2xl font-black text-slate-700 font-mono">{step.number}</span>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-extrabold tracking-wider text-white uppercase">{step.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
