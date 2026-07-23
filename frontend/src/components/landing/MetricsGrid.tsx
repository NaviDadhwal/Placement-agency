import React from 'react';
import { Users, Building, Clock, Award } from 'lucide-react';

export const MetricsGrid: React.FC = () => {
  return (
    <section className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            Proven Placement Impact Across India
          </h2>
          <p className="text-sm text-[#64748B] mt-2">
            Delivering verified candidate shortlists and corporate hiring solutions with zero delay.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-6 text-center hover:border-indigo-200 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-[#4F46E5] flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-4xl font-black text-[#0F172A] tracking-tight">500+</div>
            <div className="text-sm font-semibold text-slate-700 mt-1">Candidates Placed</div>
            <div className="text-xs text-slate-500 mt-1">Across Ludhiana, Baddi & Mohali</div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-6 text-center hover:border-indigo-200 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto mb-4">
              <Building className="w-6 h-6" />
            </div>
            <div className="text-4xl font-black text-[#0F172A] tracking-tight">50+</div>
            <div className="text-sm font-semibold text-slate-700 mt-1">Corporate Hiring Partners</div>
            <div className="text-xs text-slate-500 mt-1">IT, Manufacturing & Pharma firms</div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-6 text-center hover:border-indigo-200 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <div className="text-4xl font-black text-[#0F172A] tracking-tight">24–48 Hrs</div>
            <div className="text-sm font-semibold text-slate-700 mt-1">Average Shortlisting Time</div>
            <div className="text-xs text-slate-500 mt-1">Rapid response for urgent hiring</div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-6 text-center hover:border-indigo-200 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-4xl font-black text-[#0F172A] tracking-tight">100%</div>
            <div className="text-sm font-semibold text-slate-700 mt-1">Free Candidate Services</div>
            <div className="text-xs text-slate-500 mt-1">No registration or processing fees</div>
          </div>
        </div>
      </div>
    </section>
  );
};
