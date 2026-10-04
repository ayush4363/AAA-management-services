import React from 'react';

export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'standard' | 'narrow' | 'full';
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = '',
  maxWidth = 'standard',
}) => {
  const maxWidths = {
    standard: 'max-w-[1360px]',
    narrow: 'max-w-4xl',
    full: 'max-w-full',
  };

  return (
    <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${maxWidths[maxWidth]} ${className}`}>
      {children}
    </div>
  );
};
