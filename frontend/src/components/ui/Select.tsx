import React from 'react';

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className = '', id, ...props }, ref) => {
    const selectId = id || props.name || Math.random().toString(36).substring(7);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={selectId} className="text-xs font-medium text-[#9BA3AF]">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`w-full px-3.5 py-2.5 bg-[#111622] border rounded-lg text-sm text-[#F3F5F7] focus:outline-none focus:ring-1 transition-colors ${
            error
              ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500'
              : 'border-white/10 focus:border-[#D4A343] focus:ring-[#D4A343]'
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#111622] text-[#F3F5F7]">
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="text-xs text-red-400">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
