import React from 'react';
import { PhoneCall, Zap, Clock } from 'lucide-react';
import { Button } from '../ui/Button';

export const HotlineStrip: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-[#0F172A] via-slate-900 to-[#0F172A] text-white py-6 border-y border-slate-800 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <PhoneCall className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-base md:text-lg">Need Immediate Hiring Assistance?</h3>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border border-emerald-500/30">
                Live Hotline
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-400">
              Speak directly with our Ludhiana Regional Recruitment Desk for urgent requirements.
            </p>
          </div>
        </div>

        <a href="tel:+919877005822" className="shrink-0">
          <Button
            variant="emerald"
            size="lg"
            leftIcon={<PhoneCall className="w-5 h-5" />}
            className="shadow-lg shadow-emerald-500/20"
          >
            📞 Call Desk +91 9877005822
          </Button>
        </a>
      </div>
    </section>
  );
};
