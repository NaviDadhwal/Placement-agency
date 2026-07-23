import React from 'react';
import { Laptop, Factory, Truck, TrendingUp, Users, Calculator, Shield, Cpu } from 'lucide-react';

export const SectorMatrix: React.FC = () => {
  const sectors = [
    { title: 'IT & Software Support', icon: Laptop, desc: 'Full-stack, QA, DevOps & Technical Support' },
    { title: 'Industrial Manufacturing', icon: Factory, desc: 'Plant Supervisors, QA/QC, Mechanical Engineers' },
    { title: 'Pharmaceuticals & Biotech', icon: Cpu, desc: 'Formulation, QA, QC, Regulatory Affairs' },
    { title: 'Logistics & Supply Chain', icon: Truck, desc: 'Warehouse Managers, Supply Chain Officers' },
    { title: 'Sales & Business Development', icon: TrendingUp, desc: 'B2B Sales Executives, Regional Leads' },
    { title: 'HR, Operations & Admin', icon: Users, desc: 'HR Generalists, Recruiters, Admin Staff' },
    { title: 'Finance, Accounts & Audit', icon: Calculator, desc: 'Accountants, Tally Operators, Financial Analysts' },
    { title: 'Non-IT & General Operations', icon: Shield, desc: 'Field Operations & Executive Roles' },
  ];

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            Industry Sector Specialization
          </h2>
          <p className="text-sm text-[#64748B] mt-2">
            Providing tailored recruitment solutions for freshers and experienced talent across Pan India.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/80 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-[#4F46E5] group-hover:bg-[#4F46E5] group-hover:text-white flex items-center justify-center transition-colors mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-[#0F172A] text-base mb-1">{sec.title}</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">{sec.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
