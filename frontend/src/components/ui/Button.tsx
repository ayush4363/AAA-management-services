import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#D4A343] text-[#0B0E14] hover:bg-[#E2B559] focus:ring-[#D4A343]',
    secondary: 'bg-[#182030] text-[#F3F5F7] hover:bg-[#222C42] border border-white/10 focus:ring-slate-400',
    outline: 'border border-[#D4A343] text-[#D4A343] hover:bg-[#D4A343]/10 focus:ring-[#D4A343]',
    ghost: 'text-[#9BA3AF] hover:text-[#F3F5F7] hover:bg-white/5',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
      ) : null}
      {children}
    </button>
  );
};
