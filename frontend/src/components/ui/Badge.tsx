import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'neutral' | 'success' | 'danger';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  className = '',
  ...props
}) => {
  const variants = {
    gold: 'bg-[#D4A343]/15 text-[#D4A343] border border-[#D4A343]/30',
    neutral: 'bg-white/5 text-[#9BA3AF] border border-white/10',
    success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    danger: 'bg-red-500/15 text-red-400 border border-red-500/30',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
