'use client';

import React from 'react';
import { Activity, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight">MEDICO</span>
              <p className="text-[11px] text-slate-400">Healthcare guidance, in your language.</p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-900 text-slate-300 border border-slate-800">
              Prototype
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
              Hackathon Demo
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800">
              AI Health Assistant
            </span>
          </div>
        </div>

        {/* Medical Safety Disclaimer */}
        <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-800/80 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-400 leading-relaxed">
            <strong className="text-slate-200">Medical Safety Disclaimer:</strong> Medico is an educational prototype for health information and triage guidance. It is not a substitute for professional medical advice, clinical diagnosis, medication prescription, treatment, or emergency services. For severe or urgent medical symptoms, seek immediate professional medical attention or local emergency services (108 / 112).
          </p>
        </div>

        {/* Copyright */}
        <div className="text-center text-[11px] text-slate-500 pt-2 border-t border-slate-900">
          © {new Date().getFullYear()} MEDICO • Built with LiveKit, Gladia, OpenAI & MOSS RAG
        </div>
      </div>
    </footer>
  );
};
