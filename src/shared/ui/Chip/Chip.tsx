// src/shared/ui/Chip/Chip.tsx

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Chip.module.css';

type ChipVariant = 'default' | 'brand' | 'outline' | 'success' | 'danger';
type ChipSize = 'sm' | 'md';

export interface ChipProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: ChipVariant;
  size?: ChipSize;
  selected?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  removable?: boolean;
  onRemove?: () => void;
}

export function Chip({
  variant = 'default',
  size = 'sm',
  selected = false,
  leftIcon,
  rightIcon,
  removable = false,
  onRemove,
  className,
  children,
  ...rest
}: ChipProps) {
  const variantClass =
    variant === 'brand'
      ? styles.brand
      : variant === 'outline'
      ? styles.outline
      : variant === 'success'
      ? styles.success
      : variant === 'danger'
      ? styles.danger
      : styles.default;

  const sizeClass = size === 'md' ? styles.sizeMd : styles.sizeSm;

  const classes = [
    styles.chip,
    variantClass,
    sizeClass,
    selected ? styles.selected : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={styles.wrapper}>
      <button
        type="button"
        className={classes}
        aria-pressed={selected || undefined}
        {...rest}
      >
        {leftIcon && (
          <span className={styles.iconLeft} aria-hidden="true">
            {leftIcon}
          </span>
        )}

        <span className={styles.label}>{children}</span>

        {rightIcon && (
          <span className={styles.iconRight} aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>

      {removable && (
        <button
          type="button"
          className={styles.removeButton}
          aria-label="Remover filtro"
          onClick={onRemove}
        >
          ×
        </button>
      )}
    </span>
  );
}

export default Chip;
