// src/shared/ui/Toast/Toast.tsx

import { useEffect } from 'react';
import styles from './Toast.module.css';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id?: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  autoHideMs?: number;
  onClose?: () => void;
}

export function Toast({
  title,
  description,
  variant = 'default',
  autoHideMs = 4000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (!autoHideMs || !onClose) return;

    const timeout = setTimeout(() => {
      onClose();
    }, autoHideMs);

    return () => clearTimeout(timeout);
  }, [autoHideMs, onClose]);

  const variantClass =
    variant === 'success'
      ? styles.success
      : variant === 'error'
      ? styles.error
      : variant === 'warning'
      ? styles.warning
      : variant === 'info'
      ? styles.info
      : styles.default;

  return (
    <div className={`${styles.toast} ${variantClass}`}>
      <div className={styles.content}>
        {title && <strong className={styles.title}>{title}</strong>}
        {description && (
          <p className={styles.description}>{description}</p>
        )}
      </div>

      {onClose && (
        <button
          type="button"
          className={styles.closeButton}
          aria-label="Fechar notificação"
          onClick={onClose}
        >
          ×
        </button>
      )}
    </div>
  );
}

export default Toast;
