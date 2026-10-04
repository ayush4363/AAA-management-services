import React from 'react';

export interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading security data...',
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 gap-3 text-center">
      <div className="w-8 h-8 border-2 border-[#D4A343] border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-[#9BA3AF]">{message}</p>
    </div>
  );
};
