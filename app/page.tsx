'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { ConsultationSection } from '@/components/consultation/consultation-section';
import { HowItWorks } from '@/components/how-it-works';
import { Architecture } from '@/components/architecture';
import { Safety } from '@/components/safety';
import { Languages } from '@/components/languages';
import { Accessibility } from '@/components/accessibility';
import { Impact } from '@/components/impact';
import { DemoGuideModal } from '@/components/demo-guide-modal';
import { Footer } from '@/components/footer';

export default function Home() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const scrollToConsultation = () => {
    const element = document.getElementById('consultation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-slate-950">
      {/* Sticky Navigation */}
      <Navbar
        onOpenDemoGuide={() => setDemoModalOpen(true)}
        onStartConsultation={scrollToConsultation}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onStartConsultation={scrollToConsultation}
          onExploreHowItWorks={scrollToHowItWorks}
          onOpenDemoGuide={() => setDemoModalOpen(true)}
        />

        {/* 2. Live Consultation Centerpiece Section */}
        <ConsultationSection />

        {/* 3. How Medico Works */}
        <HowItWorks />

        {/* 4. Inside Medico AI Architecture */}
        <Architecture />

        {/* 5. Clinical Safety Position */}
        <Safety />

        {/* 6. Multilingual Voice Support */}
        <Languages />

        {/* 7. Designed for Accessibility */}
        <Accessibility />

        {/* 8. Impact & Mission Statement */}
        <Impact />
      </main>

      {/* Footer */}
      <Footer />

      {/* 2-Minute Judge Demo Guide Modal */}
      <DemoGuideModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        onStartConsultation={scrollToConsultation}
      />
    </div>
  );
}
