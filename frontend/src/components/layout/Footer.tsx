'use client';

import React, { useState } from 'react';
import { MakeMyAimLogo } from '../ui/MakeMyAimLogo';
import { MapPin, Phone, Mail, ShieldCheck, Lock, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  return (
    <footer id="about" className="bg-[#0F172A] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-1 space-y-4">
            <MakeMyAimLogo size="md" />
            <p className="text-sm text-slate-400 leading-relaxed pt-2">
              Pan-India job solutions connecting freshers and experienced professionals with trusted employers across IT, Non-IT, Manufacturing, Logistics, Sales, and Corporate sectors.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>DPDP Act 2023 Compliant Data Policy</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Home Gateway
                </a>
              </li>
              <li>
                <a href="#openings" className="hover:text-white transition-colors">
                  Hot Active Openings
                </a>
              </li>
              <li>
                <a href="#talent-pool" className="hover:text-white transition-colors">
                  Featured Candidate Pool
                </a>
              </li>
              <li>
                <a href="#apply" className="hover:text-white transition-colors">
                  Submit Resume / Requirement
                </a>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> Admin Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Industrial Corridors Covered */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Major Industrial Belts</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Ludhiana & Ambala Manufacturing Corridors</li>
              <li>Baddi & Solan Pharmaceutical Hub</li>
              <li>Mohali & Chandigarh IT & Tech Parks</li>
              <li>Karnal & Panipat Textile & Supply Chain</li>
              <li>Pan-India Corporate & Executive Hiring</li>
            </ul>
          </div>

          {/* Column 4: Official Client Contact & Address */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact & Office</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#4CC9F0] shrink-0 mt-0.5" />
                <span>
                  <strong>Headquarters:</strong> B4, Grand Trunk Road, Opposite Ramgharia Gurudwara, Ludhiana, Punjab 141008
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+919877005822" className="hover:text-emerald-400 font-bold text-white transition-colors">
                  +91 9877005822
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#4CC9F0] shrink-0" />
                <span>contact@makemyaim.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Legal Terms Modal Trigger */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Make My Aim (Job Placement Company). All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setPrivacyModalOpen(true)}
              className="hover:text-slate-300 underline underline-offset-4 transition-colors"
            >
              Privacy Policy & DPDP Data Handling Terms
            </button>
          </div>
        </div>
      </div>

      {/* DPDP Legal Terms Modal */}
      {privacyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 max-w-2xl w-full rounded-2xl p-6 md:p-8 max-h-[85vh] overflow-y-auto shadow-2xl relative">
            <h3 className="text-xl font-bold text-[#0F172A] mb-4 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              Privacy Policy & Digital Personal Data Protection Notice
            </h3>
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                <strong>Make My Aim</strong> is committed to protecting candidate personal data in full compliance with the <strong>Digital Personal Data Protection (DPDP) Act 2023</strong> of India.
              </p>
              <h4 className="font-semibold text-slate-900 text-base">1. Data Collection & Purpose</h4>
              <p>
                We collect personal information (Full Name, Phone Number, Preferred Location, Industry Category, and Resume Files) solely for recruitment, job matching, and candidate shortlisting for registered hiring employers.
              </p>
              <h4 className="font-semibold text-slate-900 text-base">2. Zero Fee Guarantee</h4>
              <p>
                Make My Aim NEVER charges candidates any fee, processing charge, or registration fee. Services for job seekers are 100% free of charge.
              </p>
              <h4 className="font-semibold text-slate-900 text-base">3. Data Security & Retention</h4>
              <p>
                Resumes and phone contact numbers are encrypted and stored in secure cloud storage. Data is never sold to third-party marketing telemarketers.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setPrivacyModalOpen(false)}
                className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-800 transition-colors"
              >
                Close Privacy Terms
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
