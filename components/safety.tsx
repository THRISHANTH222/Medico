'use client';

import React from 'react';
import { ShieldCheck, AlertTriangle, UserCheck, Stethoscope, FileX, HeartPulse } from 'lucide-react';

export const Safety: React.FC = () => {
  return (
    <section id="safety" className="py-20 bg-slate-900/60 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase bg-emerald-950/80 border border-emerald-800/60 px-3 py-1 rounded-full">
            CLINICAL SAFETY POSITION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Safety-first by design
          </h2>
          <p className="text-base text-slate-300 font-normal leading-relaxed">
            Medico is designed to provide general health information and help identify situations where professional medical attention may be needed. It does not diagnose conditions or prescribe medication.
          </p>
        </div>

        {/* 3 Main Safety Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800/80 space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-red-950 border border-red-800 text-red-400 flex items-center justify-center shadow-md">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">RED-FLAG AWARENESS</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Potential warning signs (such as severe chest pain, loss of consciousness, or difficulty breathing) are prioritized for immediate emergency escalation.
              </p>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-slate-800/80 space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center shadow-md">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">PROFESSIONAL ESCALATION</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Serious or ambiguous situations are explicitly directed toward qualified healthcare professionals or emergency services.
              </p>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-slate-800/80 space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center shadow-md">
              <UserCheck className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">HUMAN OVERSIGHT</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                AI guidance serves as accessible health information and triage education, never as a replacement for a human doctor.
              </p>
            </div>
          </div>
        </div>

        {/* Safety Boundary Grid */}
        <div className="bg-slate-950/80 rounded-3xl p-6 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2.5">
            <FileX className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>No Disease Diagnoses</span>
          </div>
          <div className="flex items-center gap-2.5">
            <FileX className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>No Medication Prescriptions</span>
          </div>
          <div className="flex items-center gap-2.5">
            <HeartPulse className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Professional Care Direction</span>
          </div>
        </div>
      </div>
    </section>
  );
};
