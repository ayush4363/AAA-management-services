import React, { useEffect } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg bg-[#111622] border border-white/10 rounded-xl p-6 shadow-2xl">
        {title && (
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <h3 className="text-lg font-semibold text-[#F3F5F7]">{title}</h3>
            <button
              onClick={onClose}
              className="text-[#9BA3AF] hover:text-[#F3F5F7] p-1 rounded-md"
            >
              ✕
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
