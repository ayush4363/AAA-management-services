import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', id, rows = 4, ...props }, ref) => {
    const textareaId = id || props.name || Math.random().toString(36).substring(7);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={textareaId} className="text-xs font-medium text-[#9BA3AF]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={`w-full px-3.5 py-2.5 bg-[#111622] border rounded-lg text-sm text-[#F3F5F7] placeholder-[#60697B] focus:outline-none focus:ring-1 transition-colors resize-y ${
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

Textarea.displayName = 'Textarea';
