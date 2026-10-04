import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variants = {
    default: 'bg-[#111622] border border-white/10 rounded-xl p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]',
    elevated: 'bg-[#182030] border border-white/15 rounded-xl p-6 shadow-xl',
    bordered: 'bg-transparent border border-[#D4A343]/30 rounded-xl p-6',
  };

  return (
    <div className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};
