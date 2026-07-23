import React from 'react';

interface BadgeProps {
  variant?: 'blue' | 'amber' | 'emerald' | 'violet' | 'rose' | 'slate';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'blue', children, className = '' }) => {
  const variantStyles = {
    blue: 'bg-sky-50 text-sky-700 border-sky-200/60',
    amber: 'bg-amber-50 text-amber-700 border-amber-200/60',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    violet: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
    rose: 'bg-rose-50 text-rose-700 border-rose-200/60',
    slate: 'bg-slate-100 text-slate-700 border-slate-200/60',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
