import React from 'react';
import { Button } from '../ui/Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'System Notice',
  message = 'Unable to fetch operational data at this time.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 gap-3 text-center border border-red-500/20 bg-red-500/5 rounded-xl max-w-lg mx-auto">
      <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 font-bold">
        !
      </div>
      <h4 className="text-base font-semibold text-[#F3F5F7]">{title}</h4>
      <p className="text-sm text-[#9BA3AF]">{message}</p>
      {onRetry && (
        <Button size="sm" variant="outline" onClick={onRetry} className="mt-2">
          Retry Request
        </Button>
      )}
    </div>
  );
};
