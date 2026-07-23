'use client';

import React from 'react';
import { CheckCircle2, PhoneCall, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title = 'Application Received Successfully!',
  subtitle = 'Our regional recruitment team at Ludhiana has logged your submission. For urgent or time-sensitive inquiries, feel free to call our direct helpline.',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-2xl text-center relative border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h3 className="text-2xl font-black text-[#0F172A] tracking-tight">{title}</h3>
        <p className="text-sm text-[#64748B] mt-2 leading-relaxed">{subtitle}</p>

        <div className="mt-8 space-y-3">
          <a href="tel:+919877005822">
            <Button
              variant="emerald"
              size="lg"
              leftIcon={<PhoneCall className="w-5 h-5" />}
              className="w-full justify-center shadow-lg shadow-emerald-500/20"
            >
              📞 Call Desk +91 9877005822
            </Button>
          </a>

          <Button variant="outline" size="md" onClick={onClose} className="w-full">
            Done / Close Window
          </Button>
        </div>
      </div>
    </div>
  );
};
