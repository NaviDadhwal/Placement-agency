'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { Briefcase, Building2, Zap, CheckCircle2, ArrowRight, Shield } from 'lucide-react';

interface HeroSectionProps {
  onSelectCandidateTab: () => void;
  onSelectEmployerTab: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectCandidateTab,
  onSelectEmployerTab,
}) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-[#F8FAFC] pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-indigo-200/40 via-sky-200/30 to-amber-100/40 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-xs md:text-sm font-bold text-[#4F46E5]">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Official Placement Portal: Pan-India Job Solutions</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.15]">
            Where Top Talent Meets{' '}
            <span className="bg-gradient-to-r from-[#0B63FF] via-[#00B7FF] to-[#FFB703] bg-clip-text text-transparent">
              Top Employers
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-[#64748B] max-w-2xl mx-auto font-medium leading-relaxed">
            Connecting job seekers and corporate hiring teams across Ludhiana, Baddi, Mohali, Chandigarh, and Pan India with zero friction.
          </p>

          {/* Dual Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Briefcase className="w-5 h-5" />}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto shadow-lg shadow-indigo-500/20"
              onClick={() => {
                onSelectCandidateTab();
                document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Find Your Dream Job
            </Button>

            <Button
              variant="outline"
              size="lg"
              leftIcon={<Building2 className="w-5 h-5 text-[#4F46E5]" />}
              className="w-full sm:w-auto bg-white hover:bg-slate-50 border-slate-300"
              onClick={() => {
                onSelectEmployerTab();
                document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Hire Top Talent
            </Button>
          </div>

          {/* TalentBridge 3-Step Process Pills */}
          <div className="pt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
            <div className="bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-[#4F46E5] font-bold flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h4 className="font-bold text-[#0F172A] text-sm">Tell Us What You Need</h4>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Submit candidate resume or hiring requirement in under 60 seconds.
                </p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h4 className="font-bold text-[#0F172A] text-sm">We Shortlist Matches</h4>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Pre-screened verified profiles matched across IT, Pharma & Plant roles.
                </p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 font-bold flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h4 className="font-bold text-[#0F172A] text-sm">Connect & Hire Fast</h4>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Direct phone dialer access and instant recruiter desk assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
