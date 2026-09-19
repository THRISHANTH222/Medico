'use client';

import React, { useState } from 'react';
import { Activity, ShieldCheck, Globe, Menu, X, Sparkles, HelpCircle } from 'lucide-react';

interface NavbarProps {
  onOpenDemoGuide?: () => void;
  onStartConsultation?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemoGuide, onStartConsultation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartConsultationClick = () => {
    setMobileMenuOpen(false);
    if (onStartConsultation) {
      onStartConsultation();
    } else {
      scrollToSection('consultation');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand logo & title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-900/30">
            <Activity className="w-5 h-5 text-emerald-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">MEDICO</span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                AI HEALTH ASSISTANT
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden xs:block">Healthcare guidance, in your language</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="hover:text-emerald-400 transition-colors py-1 cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('architecture')}
            className="hover:text-emerald-400 transition-colors py-1 cursor-pointer"
          >
            AI Architecture
          </button>
          <button
            onClick={() => scrollToSection('safety')}
            className="hover:text-emerald-400 transition-colors py-1 flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Safety
          </button>
          <button
            onClick={() => scrollToSection('languages')}
            className="hover:text-emerald-400 transition-colors py-1 flex items-center gap-1.5 cursor-pointer"
          >
            <Globe className="w-4 h-4 text-teal-400" />
            Languages
          </button>

          {onOpenDemoGuide && (
            <button
              onClick={onOpenDemoGuide}
              className="text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
              Demo Guide
            </button>
          )}

          <button
            onClick={handleStartConsultationClick}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-semibold px-4 py-2 rounded-xl text-sm transition-all shadow-lg shadow-emerald-950/50 hover:shadow-emerald-900/50 cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            Start Consultation
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          {onOpenDemoGuide && (
            <button
              onClick={onOpenDemoGuide}
              className="p-2 text-slate-300 hover:text-white bg-slate-800/80 rounded-lg text-xs font-semibold flex items-center gap-1"
            >
              <HelpCircle className="w-4 h-4 text-emerald-400" />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-emerald-400"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('architecture')}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-emerald-400"
          >
            AI Architecture
          </button>
          <button
            onClick={() => scrollToSection('safety')}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-emerald-400 flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Safety
          </button>
          <button
            onClick={() => scrollToSection('languages')}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-emerald-400 flex items-center gap-2"
          >
            <Globe className="w-4 h-4 text-teal-400" />
            Languages
          </button>

          <div className="pt-2">
            <button
              onClick={handleStartConsultationClick}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-semibold py-2.5 rounded-xl text-center text-sm shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              Start Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
