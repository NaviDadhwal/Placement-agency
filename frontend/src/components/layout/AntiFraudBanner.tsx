import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const AntiFraudBanner: React.FC = () => {
  return (
    <div className="bg-[#0F172A] text-white text-xs md:text-sm py-2 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-slate-800">
      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
      <span>
        <strong className="text-amber-300">Anti-Fraud Notice:</strong> Make My Aim NEVER requests payment, processing fees, or registration charges from job candidates.
      </span>
    </div>
  );
};
