'use client';

import React, { useState } from 'react';
import { AntiFraudBanner } from '@/components/layout/AntiFraudBanner';
import { HeaderNavbar } from '@/components/layout/HeaderNavbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { HotlineStrip } from '@/components/landing/HotlineStrip';
import { MetricsGrid } from '@/components/landing/MetricsGrid';
import { DualTeasers } from '@/components/landing/DualTeasers';
import { ConversionEngine } from '@/components/landing/ConversionEngine';
import { SectorMatrix } from '@/components/landing/SectorMatrix';
import { Footer } from '@/components/layout/Footer';
import { StatusCheckerModal } from '@/components/modals/StatusCheckerModal';
import { SuccessModal } from '@/components/modals/SuccessModal';

export default function PublicLandingPage() {
  // Modal states
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successLeadType, setSuccessLeadType] = useState<'candidate' | 'employer'>('candidate');
  const [successName, setSuccessName] = useState('');

  // Form tab & prefill states
  const [activeTab, setActiveTab] = useState<'candidate' | 'employer'>('candidate');
  const [prefilledIndustry, setPrefilledIndustry] = useState<string | undefined>(undefined);
  const [prefilledCandCode, setPrefilledCandCode] = useState<string | undefined>(undefined);

  const handleApplyForJob = (industry: string) => {
    setActiveTab('candidate');
    setPrefilledIndustry(industry);
  };

  const handleRequestCandidate = (candCode: string) => {
    setActiveTab('employer');
    setPrefilledCandCode(candCode);
  };

  const handleSubmissionSuccess = (type: 'candidate' | 'employer', name: string) => {
    setSuccessLeadType(type);
    setSuccessName(name);
    setSuccessModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-[#4F46E5]/10 selection:text-[#4F46E5]">
      {/* 1. Sticky Anti-Fraud Top Banner */}
      <AntiFraudBanner />

      {/* 2. Header Navbar */}
      <HeaderNavbar onOpenStatusModal={() => setStatusModalOpen(true)} />

      {/* Main Single Scrolling Landing Content */}
      <main className="flex-grow space-y-0">
        {/* 3. Hero Gateway */}
        <HeroSection
          onSelectCandidateTab={() => setActiveTab('candidate')}
          onSelectEmployerTab={() => setActiveTab('employer')}
        />

        {/* 4. Direct Employer Hotline Strip */}
        <HotlineStrip />

        {/* 5. Metrics Impact Counters */}
        <MetricsGrid />

        {/* 6. Dual Teasers (Hot Jobs & Candidate Talent Pool) */}
        <DualTeasers
          onApplyForJob={handleApplyForJob}
          onRequestCandidate={handleRequestCandidate}
        />

        {/* 7. Unified Tabbed Conversion Engine */}
        <ConversionEngine
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          prefilledIndustry={prefilledIndustry}
          prefilledCandidateCode={prefilledCandCode}
          onSuccess={handleSubmissionSuccess}
        />

        {/* 8. Industry Sector Matrix */}
        <SectorMatrix />
      </main>

      {/* 9. Footer & Compliance Section */}
      <Footer />

      {/* Modals */}
      <StatusCheckerModal
        isOpen={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
      />

      <SuccessModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        title={
          successLeadType === 'candidate'
            ? `Thank you, ${successName}!`
            : `Inquiry Received, ${successName}!`
        }
        subtitle={
          successLeadType === 'candidate'
            ? 'Your application and resume have been received by our recruitment desk in Ludhiana. We will match your profile with active hiring partners shortly.'
            : 'Our Ludhiana regional hiring desk has logged your corporate inquiry. A senior recruitment manager will call you shortly.'
        }
      />
    </div>
  );
}
