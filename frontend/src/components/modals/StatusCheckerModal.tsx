'use client';

import React, { useState } from 'react';
import { Search, X, CheckCircle2, Clock, AlertCircle, Sparkles, Building, UserCheck, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { apiClient } from '../../lib/apiClient';
import { StatusCheckResult } from '../../types/api';

interface StatusCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StatusCheckerModal: React.FC<StatusCheckerModalProps> = ({ isOpen, onClose }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StatusCheckResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setResult(null);

    if (phone.trim().length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      setLoading(true);
      const res = await apiClient.checkCandidateStatus(phone.trim());
      setResult(res.data);
    } catch (err: any) {
      setErrorMsg(err.message || 'No candidate application found for this phone number.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'JOB_PROVIDED':
        return <Badge variant="emerald">🎉 Job Provided / Placed</Badge>;
      case 'SHORTLISTED':
        return <Badge variant="violet">⭐ Shortlisted For Interview</Badge>;
      case 'UNDER_REVIEW':
        return <Badge variant="amber" className="font-bold">🔍 Under Active Triage</Badge>;
      case 'REJECTED':
        return <Badge variant="rose">Closed / Archived</Badge>;
      default:
        return <Badge variant="blue">📥 Application Received</Badge>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-slate-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#0F172A]">Track Application Status</h3>
            <p className="text-xs text-[#64748B]">Instant real-time status lookup without login</p>
          </div>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Enter Your Registered Phone Number
            </label>
            <div className="flex gap-2">
              <input
                type="tel"
                required
                placeholder="e.g. 9877005822"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-sm text-[#0F172A]"
              />
              <Button variant="primary" size="md" isLoading={loading}>
                Check
              </Button>
            </div>
          </div>
        </form>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mt-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Status Result Box */}
        {result && (
          <div className="mt-6 bg-[#F8FAFC] border border-slate-200 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Applicant</span>
                <h4 className="font-bold text-[#0F172A] text-base">{result.fullName}</h4>
              </div>
              <div>{getStatusBadge(result.status)}</div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Preferred Corridor</span>
                <span className="font-bold text-slate-700">{result.preferredLocation}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Industry Sector</span>
                <span className="font-bold text-slate-700">{result.industry}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> Last Updated: {new Date(result.updatedAt).toLocaleDateString()}
              </span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Privacy Shield Active
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
