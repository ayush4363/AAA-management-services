import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || props.name || Math.random().toString(36).substring(7);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium text-[#9BA3AF]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full px-3.5 py-2.5 bg-[#111622] border rounded-lg text-sm text-[#F3F5F7] placeholder-[#60697B] focus:outline-none focus:ring-1 transition-colors ${
            error
              ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500'
              : 'border-white/10 focus:border-[#D4A343] focus:ring-[#D4A343]'
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-400">{error}</span>}
        {!error && helperText && <span className="text-xs text-[#60697B]">{helperText}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
