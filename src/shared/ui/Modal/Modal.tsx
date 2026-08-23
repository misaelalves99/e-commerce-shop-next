// src/shared/ui/Modal/Modal.tsx

import type { ReactNode, MouseEvent } from 'react';
import { useEffect } from 'react';
import styles from './Modal.module.css';

export interface ModalProps {
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg';
  hideCloseButton?: boolean;
}

export function Modal({
  isOpen,
  title,
  children,
  onClose,
  size = 'md',
  hideCloseButton = false,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const dialogClasses = [
    styles.dialog,
    size === 'lg'
      ? styles.sizeLg
      : size === 'sm'
      ? styles.sizeSm
      : styles.sizeMd,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <section className={dialogClasses}>
        {(title || !hideCloseButton) && (
          <header className={styles.header}>
            {title && (
              <h2 id="modal-title" className={styles.title}>
                {title}
              </h2>
            )}

            {!hideCloseButton && (
              <button
                type="button"
                className={styles.closeButton}
                aria-label="Fechar"
                onClick={onClose}
              >
                ×
              </button>
            )}
          </header>
        )}

        <div className={styles.body}>{children}</div>
      </section>
    </div>
  );
}

export default Modal;
