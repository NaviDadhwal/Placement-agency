'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MakeMyAimLogo } from '../ui/MakeMyAimLogo';
import { Button } from '../ui/Button';
import { Search, ShieldCheck, Menu, X, Lock } from 'lucide-react';

interface HeaderNavbarProps {
  onOpenStatusModal: () => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({ onOpenStatusModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo Component */}
        <Link href="/" className="flex items-center">
          <MakeMyAimLogo size="md" />
        </Link>

        {/* Desktop Smooth Scroll Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#hero" className="hover:text-[#4F46E5] transition-colors">
            Home
          </a>
          <a href="#openings" className="hover:text-[#4F46E5] transition-colors">
            Hot Jobs
          </a>
          <a href="#talent-pool" className="hover:text-[#4F46E5] transition-colors">
            Talent Pool
          </a>
          <a href="#apply" className="hover:text-[#4F46E5] transition-colors">
            Apply / Hire
          </a>
          <a href="#about" className="hover:text-[#4F46E5] transition-colors">
            About Us
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Instant Application Status Checker Modal Trigger */}
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Search className="w-4 h-4 text-[#4F46E5]" />}
            onClick={onOpenStatusModal}
          >
            Track Status
          </Button>

          {/* Admin Login Button */}
          <Link href="/admin/login">
            <Button variant="ghost" size="sm" leftIcon={<Lock className="w-4 h-4" />}>
              Admin Login
            </Button>
          </Link>

          {/* Direct Phone Call Button */}
          <a href="tel:+919877005822">
            <Button variant="emerald" size="sm">
              📞 Call +91 9877005822
            </Button>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenStatusModal}
            aria-label="Track Application Status"
          >
            <Search className="w-4 h-4 text-[#4F46E5]" />
          </Button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-3 font-semibold text-slate-700">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Home
            </a>
            <a
              href="#openings"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Hot Jobs
            </a>
            <a
              href="#talent-pool"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Talent Pool
            </a>
            <a
              href="#apply"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Apply / Hire
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              About Us
            </a>
          </nav>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Button
              variant="outline"
              size="md"
              className="w-full justify-start"
              leftIcon={<Search className="w-4 h-4 text-[#4F46E5]" />}
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStatusModal();
              }}
            >
              Track Application Status
            </Button>
            <Link href="/admin/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" size="md" className="w-full justify-start">
                Admin Sign In
              </Button>
            </Link>
            <a href="tel:+919877005822">
              <Button variant="emerald" size="md" className="w-full">
                📞 Call +91 9877005822
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
