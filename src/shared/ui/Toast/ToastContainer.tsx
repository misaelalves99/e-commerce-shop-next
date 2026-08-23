// src/shared/ui/Toast/ToastContainer.tsx

import type { ToastVariant } from './Toast';
import Toast from './Toast';
import styles from './Toast.module.css';

export interface ToastItem {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  autoHideMs?: number;
}

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left';

export interface ToastContainerProps {
  toasts: ToastItem[];
  onClose: (id: string) => void;
  position?: ToastPosition;
}

export function ToastContainer({
  toasts,
  onClose,
  position = 'top-right',
}: ToastContainerProps) {
  if (!toasts.length) return null;

  const positionClass =
    position === 'top-left'
      ? styles.topLeft
      : position === 'bottom-right'
      ? styles.bottomRight
      : position === 'bottom-left'
      ? styles.bottomLeft
      : styles.topRight;

  return (
    <div className={`${styles.container} ${positionClass}`}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          autoHideMs={toast.autoHideMs}
          onClose={() => onClose(toast.id)}
        />
      ))}
    </div>
  );
}

export default ToastContainer;
