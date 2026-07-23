'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MakeMyAimLogo } from '@/components/ui/MakeMyAimLogo';
import { Button } from '@/components/ui/Button';
import { apiClient } from '@/lib/apiClient';
import { Lock, Mail, ShieldAlert, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      setLoading(true);
      const res = await apiClient.loginAdmin({ email, password });

      const token = res.data?.token || res.data?.accessToken;
      if (token) {
        localStorage.setItem('accessToken', token);
        router.push('/admin/dashboard');
      } else {
        setErrorMsg('Invalid authentication response.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid email credentials or unauthorized access.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xl space-y-6 relative">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Public Home
        </Link>

        <div className="text-center space-y-2">
          <MakeMyAimLogo size="md" className="justify-center" />
          <h2 className="text-2xl font-black text-[#0F172A] tracking-tight pt-2">Admin Portal Authentication</h2>
          <p className="text-xs text-[#64748B]">Internal Lead Viewer & Status Management Desk</p>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="admin@nextstepplacements.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-sm text-[#0F172A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-sm text-[#0F172A]"
              />
            </div>
          </div>

          <Button variant="primary" size="lg" isLoading={loading} className="w-full py-3.5">
            Authenticate & Open Desk
          </Button>
        </form>

        <div className="text-center pt-2">
          <p className="text-[11px] text-slate-400">
            Protected JWT Email Authentication • HttpOnly Cookie Protocol
          </p>
        </div>
      </div>
    </div>
  );
}
