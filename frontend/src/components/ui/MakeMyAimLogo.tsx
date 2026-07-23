import React from 'react';

interface MakeMyAimLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const MakeMyAimLogo: React.FC<MakeMyAimLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const badgeSizes = {
    sm: 'w-8 h-8 rounded-lg text-lg',
    md: 'w-10 h-10 rounded-xl text-xl',
    lg: 'w-16 h-16 rounded-2xl text-3xl',
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl md:text-2xl',
    lg: 'text-3xl md:text-4xl',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Client's Official Gradient Badge with Letter 'M' */}
      <div
        className={`${badgeSizes[size]} font-black flex items-center justify-center text-white shadow-md transition-transform hover:scale-105`}
        style={{
          background: 'linear-gradient(135deg, #0f62fe, #4cc9f0, #ffd166)',
          boxShadow: '0 4px 14px rgba(15, 98, 254, 0.3)',
        }}
      >
        M
      </div>

      <div className="flex flex-col">
        {/* Client's Official Gradient Text Title */}
        <span
          className={`${titleSizes[size]} font-black tracking-tight`}
          style={{
            background: 'linear-gradient(90deg, #0b63ff, #00b7ff, #ffb703)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Make My Aim
        </span>

        {showSubtitle && size !== 'sm' && (
          <span className="text-[10px] md:text-xs font-bold text-slate-500 tracking-wide uppercase -mt-0.5">
            Job Placement Agency
          </span>
        )}
      </div>
    </div>
  );
};
