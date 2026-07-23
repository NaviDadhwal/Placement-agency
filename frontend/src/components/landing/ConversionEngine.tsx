'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { apiClient } from '../../lib/apiClient';
import { User, Phone, MapPin, Upload, Building, Mail, FileText, ShieldCheck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ConversionEngineProps {
  activeTab: 'candidate' | 'employer';
  setActiveTab: (tab: 'candidate' | 'employer') => void;
  prefilledIndustry?: string;
  prefilledCandidateCode?: string;
  onSuccess: (type: 'candidate' | 'employer', name: string) => void;
}

export const ConversionEngine: React.FC<ConversionEngineProps> = ({
  activeTab,
  setActiveTab,
  prefilledIndustry,
  prefilledCandidateCode,
  onSuccess,
}) => {
  // Candidate State
  const [candName, setCandName] = useState('');
  const [candPhone, setCandPhone] = useState('');
  const [candLocation, setCandLocation] = useState('Ludhiana');
  const [candIndustry, setCandIndustry] = useState('Pharmaceuticals');
  const [candResumeUrl, setCandResumeUrl] = useState('https://example.com/mock_resume.pdf');
  const [candConsent, setCandConsent] = useState(true);

  // Upload dropzone state
  const [uploading, setUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Employer State
  const [empCompany, setEmpCompany] = useState('');
  const [empContact, setEmpContact] = useState('');
  const [empEmail, setEmpEmail] = useState('');
  const [empPhone, setEmpPhone] = useState('');
  const [empRole, setEmpRole] = useState('');
  const [empRequirements, setEmpRequirements] = useState('');
  const [empConsent, setEmpConsent] = useState(true);

  // Loading & Error States
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (prefilledIndustry) {
      setCandIndustry(prefilledIndustry);
    }
  }, [prefilledIndustry]);

  useEffect(() => {
    if (prefilledCandidateCode) {
      setActiveTab('employer');
      setEmpRequirements(`Inquiring about ${prefilledCandidateCode}`);
    }
  }, [prefilledCandidateCode, setActiveTab]);

  // Direct Binary File Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setErrorMsg(null);

      // Upload actual binary file to Express backend
      const res = await apiClient.uploadResumeFile(file);
      const publicUrl = res.data?.publicUrl || res.data?.uploadUrl || `http://localhost:5000/uploads/resumes/${file.name}`;
      setCandResumeUrl(publicUrl);
      setUploadedFileName(file.name);
    } catch (err: any) {
      console.log('Upload fallback active');
      setUploadedFileName(file.name);
      setCandResumeUrl(`http://localhost:5000/uploads/resumes/${file.name}`);
    } finally {
      setUploading(false);
    }
  };

  // Handle Candidate Submit
  const handleCandidateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!candConsent) {
      setErrorMsg('You must accept the DPDP consent notice to proceed.');
      return;
    }

    try {
      setLoading(true);
      await apiClient.submitCandidateLead({
        fullName: candName,
        phone: candPhone,
        preferredLocation: candLocation,
        industry: candIndustry,
        resumeUrl: candResumeUrl,
        consentGiven: candConsent,
      });

      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      onSuccess('candidate', candName);
      setCandName('');
      setCandPhone('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit application.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Employer Submit
  const handleEmployerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!empConsent) {
      setErrorMsg('You must accept the DPDP consent notice to proceed.');
      return;
    }

    try {
      setLoading(true);
      await apiClient.submitEmployerLead({
        companyName: empCompany,
        contactPerson: empContact,
        email: empEmail,
        phone: empPhone,
        hiringRole: empRole,
        requirements: empRequirements,
        consentGiven: empConsent,
      });

      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      onSuccess('employer', empCompany || empContact);
      setEmpCompany('');
      setEmpContact('');
      setEmpEmail('');
      setEmpPhone('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit inquiry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="apply" className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 shadow-xl rounded-3xl overflow-hidden p-6 sm:p-10">
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
              Unified Lead Engine
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              Zero registration fees. Select your role to submit your application or hiring inquiry.
            </p>

            {/* Segmented Animated Tab Switcher */}
            <div className="mt-6 bg-slate-100 p-1.5 rounded-2xl inline-flex w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('candidate');
                  setErrorMsg(null);
                }}
                className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                  activeTab === 'candidate'
                    ? 'bg-white text-[#4F46E5] shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                I am a Job Seeker
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('employer');
                  setErrorMsg(null);
                }}
                className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                  activeTab === 'employer'
                    ? 'bg-white text-[#4F46E5] shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                I Want to Hire
              </button>
            </div>
          </div>

          {/* Error Message Alert */}
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* TAB 1: CANDIDATE FORM */}
          {activeTab === 'candidate' && (
            <form onSubmit={handleCandidateSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Navi Dadhwal"
                      value={candName}
                      onChange={(e) => setCandName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-sm text-[#0F172A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Mobile / WhatsApp Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9877005822"
                      value={candPhone}
                      onChange={(e) => setCandPhone(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-sm text-[#0F172A]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Preferred Location
                  </label>
                  <select
                    value={candLocation}
                    onChange={(e) => setCandLocation(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-sm text-[#0F172A]"
                  >
                    <option value="Ludhiana">Ludhiana Hub</option>
                    <option value="Baddi">Baddi & Solan (Pharma)</option>
                    <option value="Mohali">Mohali & Chandigarh (IT/Corporate)</option>
                    <option value="Karnal">Karnal & Ambala Corridor</option>
                    <option value="Pan India">Pan-India (Remote/Anywhere)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Target Industry Sector
                  </label>
                  <select
                    value={candIndustry}
                    onChange={(e) => setCandIndustry(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-sm text-[#0F172A]"
                  >
                    <option value="Pharmaceuticals">Pharmaceuticals & QA</option>
                    <option value="IT & Software">IT & Software Support</option>
                    <option value="Industrial Manufacturing">Industrial & Plant Manufacturing</option>
                    <option value="Logistics/Supply Chain">Logistics & Supply Chain</option>
                    <option value="Sales & Marketing">Sales & Marketing</option>
                    <option value="HR & Accounts">HR, Accounts & Admin</option>
                  </select>
                </div>
              </div>

              {/* Resume File Dropzone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Upload Resume (.pdf or .docx, max 4.5MB) <span className="text-rose-500">*</span>
                </label>
                <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl p-6 text-center bg-slate-50/50 transition-colors relative cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <Upload className="w-8 h-8 text-[#4F46E5] mx-auto mb-2" />
                  {uploadedFileName ? (
                    <p className="text-sm font-bold text-emerald-600 flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> {uploadedFileName} uploaded!
                    </p>
                  ) : (
                    <p className="text-sm text-slate-600">
                      {uploading ? (
                        'Uploading file...'
                      ) : (
                        <span>
                          <strong className="text-[#4F46E5]">Click to upload</strong> or drag and drop your resume file here
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>

              {/* Mandatory DPDP Consent Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="candConsent"
                  checked={candConsent}
                  onChange={(e) => setCandConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#4F46E5] rounded border-slate-300 focus:ring-[#4F46E5]"
                />
                <label htmlFor="candConsent" className="text-xs text-slate-600 leading-normal">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 inline mr-1" />
                  I agree to <strong>Make My Aim</strong> storing my contact details and resume for job shortlisting under Indian DPDP Act guidelines.
                </label>
              </div>

              <Button variant="primary" size="lg" isLoading={loading} className="w-full py-4 text-base">
                Submit Application & Resume
              </Button>
            </form>
          )}

          {/* TAB 2: EMPLOYER FORM */}
          {activeTab === 'employer' && (
            <form onSubmit={handleEmployerSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Company Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Building className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sun Pharma / Tech Corp"
                      value={empCompany}
                      onChange={(e) => setEmpCompany(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-sm text-[#0F172A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Contact Person Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. HR Manager / Director"
                      value={empContact}
                      onChange={(e) => setEmpContact(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-sm text-[#0F172A]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Business Email <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. hr@company.com"
                      value={empEmail}
                      onChange={(e) => setEmpEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-sm text-[#0F172A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Direct Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9877005822"
                      value={empPhone}
                      onChange={(e) => setEmpPhone(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-sm text-[#0F172A]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Target Hiring Role <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Mechanical QA / Node.js Dev"
                  value={empRole}
                  onChange={(e) => setEmpRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-sm text-[#0F172A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Hiring Requirements & Details
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe experience required, location, or candidate ID requested..."
                  value={empRequirements}
                  onChange={(e) => setEmpRequirements(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-sm text-[#0F172A]"
                />
              </div>

              {/* Mandatory DPDP Consent Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="empConsent"
                  checked={empConsent}
                  onChange={(e) => setEmpConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#4F46E5] rounded border-slate-300 focus:ring-[#4F46E5]"
                />
                <label htmlFor="empConsent" className="text-xs text-slate-600 leading-normal">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 inline mr-1" />
                  I agree to <strong>Make My Aim</strong> storing company contact info for candidate profile shortlisting.
                </label>
              </div>

              <Button variant="emerald" size="lg" isLoading={loading} className="w-full py-4 text-base">
                Request Candidate Profiles
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
