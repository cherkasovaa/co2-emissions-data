import { useEffect, useRef, type ReactNode } from 'react';
import { Portal } from './Portal';

export const Modal = ({
  children,
  isOpen,
  onClose,
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const closeOnClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const isInsideClick = contentRef.current?.contains(target);

      if (!isInsideClick) onClose();
    };

    document.body.addEventListener('keydown', closeOnEscape);
    document.body.addEventListener('mousedown', closeOnClickOutside);

    return () => {
      document.body.removeEventListener('keydown', closeOnEscape);
      document.body.removeEventListener('mousedown', closeOnClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div
        onClick={onClose}
        className="modal-overlay"
        style={{
          position: 'fixed',
          inset: '0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(0, 0, 0, 0.5)',
          transition: 'all 0.3s ease-in-out',
          overflow: 'hidden',
          zIndex: '999',
          padding: '2rem',
        }}
      >
        <div onClick={(event) => event.stopPropagation()} className="modal">
          <div ref={contentRef}>{children}</div>
        </div>
      </div>
    </Portal>
  );
};
