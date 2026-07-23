'use client';

import React from 'react';
import { Briefcase, UserCheck, MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface DualTeasersProps {
  onApplyForJob: (industry: string) => void;
  onRequestCandidate: (candCode: string) => void;
}

export const DualTeasers: React.FC<DualTeasersProps> = ({
  onApplyForJob,
  onRequestCandidate,
}) => {
  const hotJobs = [
    {
      title: 'Production & QA Supervisor Roles',
      location: 'Baddi Industrial Belt (Pharma Hub)',
      salary: '₹25,000 – ₹45,000 / month',
      category: 'Pharmaceuticals',
      badge: 'Immediate Hiring',
    },
    {
      title: 'Full-Stack & IT Support Engineers',
      location: 'Mohali & Chandigarh Tech Parks',
      salary: '₹35,000 – ₹80,000 / month',
      category: 'IT & Software',
      badge: 'Multiple Positions',
    },
    {
      title: 'Logistics & Plant Operations Managers',
      location: 'Ludhiana & Ambala Hubs',
      salary: '₹30,000 – ₹60,000 / month',
      category: 'Industrial Manufacturing',
      badge: 'High Urgency',
    },
  ];

  const candidatePool = [
    {
      id: 'Cand #102',
      role: 'Senior Mechanical QA Engineer',
      exp: '6 Years Experience',
      location: 'Baddi Hub',
      availability: 'Immediate Joiner',
    },
    {
      id: 'Cand #108',
      role: 'Full-Stack Node.js & React Developer',
      exp: '3.5 Years Experience',
      location: 'Mohali Tech Hub',
      availability: '15 Days Notice',
    },
    {
      id: 'Cand #114',
      role: 'Pharma Production & QA Manager',
      exp: '8 Years Experience',
      location: 'Solan / Ludhiana',
      availability: 'Immediate Joiner',
    },
  ];

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Hot Active Openings (For Job Seekers) */}
          <div id="openings" className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-[#4F46E5] flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#0F172A]">Hot Active Industry Openings</h3>
                <p className="text-xs text-[#64748B]">For job seekers looking for placement</p>
              </div>
            </div>

            <div className="space-y-4">
              {hotJobs.map((job, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-[#0F172A] text-base">{job.title}</h4>
                    <Badge variant="emerald">{job.badge}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#64748B]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                    </span>
                    <span className="font-semibold text-slate-700">{job.salary}</span>
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                      {job.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onApplyForJob(job.category);
                        document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-xs font-bold text-[#4F46E5] hover:text-[#4338CA] flex items-center gap-1 cursor-pointer"
                    >
                      Apply For Role <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Featured Candidate Pool (For Employers) */}
          <div id="talent-pool" className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#0F172A]">Featured Pre-Screened Talent</h3>
                <p className="text-xs text-[#64748B]">For employers seeking candidate profiles</p>
              </div>
            </div>

            <div className="space-y-4">
              {candidatePool.map((cand, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {cand.id}
                      </span>
                      <h4 className="font-bold text-[#0F172A] text-base mt-1">{cand.role}</h4>
                    </div>
                    <Badge variant="violet">{cand.availability}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#64748B]">
                    <span>{cand.exp}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {cand.location}
                    </span>
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-emerald-700 flex items-center gap-1 font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Verified Background
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onRequestCandidate(cand.id);
                        document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      Request Profile <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
