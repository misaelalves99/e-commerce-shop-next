// src/shared/ui/Drawer/Drawer.tsx

import type { ReactNode, MouseEvent, KeyboardEvent } from 'react';
import { useEffect } from 'react';
import styles from './Drawer.module.css';

export type DrawerSide = 'right' | 'left';

export interface DrawerProps {
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
  side?: DrawerSide;
  width?: 'sm' | 'md' | 'lg';
}

export function Drawer({
  isOpen,
  title,
  children,
  onClose,
  side = 'right',
  width = 'md',
}: DrawerProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent | KeyboardEventInit | any) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown as any);
    return () => window.removeEventListener('keydown', handleKeyDown as any);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const drawerClasses = [
    styles.drawer,
    side === 'left' ? styles.left : styles.right,
    width === 'lg'
      ? styles.widthLg
      : width === 'sm'
      ? styles.widthSm
      : styles.widthMd,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? 'drawer-title' : undefined}
    >
      <aside className={drawerClasses}>
        <header className={styles.header}>
          {title && (
            <h2 id="drawer-title" className={styles.title}>
              {title}
            </h2>
          )}

          <button
            type="button"
            className={styles.closeButton}
            aria-label="Fechar"
            onClick={onClose}
          >
            ×
          </button>
        </header>

        <div className={styles.body}>{children}</div>
      </aside>
    </div>
  );
}

export default Drawer;
