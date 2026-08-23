// src/shared/ui/Badge/Badge.tsx

import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Badge.module.css';

type BadgeVariant =
  | 'default'
  | 'brand'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'outline';

type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Badge({
  variant = 'default',
  size = 'sm',
  leftIcon,
  rightIcon,
  className,
  children,
  ...rest
}: BadgeProps) {
  const variantClass =
    variant === 'brand'
      ? styles.brand
      : variant === 'success'
      ? styles.success
      : variant === 'warning'
      ? styles.warning
      : variant === 'danger'
      ? styles.danger
      : variant === 'info'
      ? styles.info
      : variant === 'outline'
      ? styles.outline
      : styles.default;

  const sizeClass = size === 'md' ? styles.sizeMd : styles.sizeSm;

  const classes = [
    styles.badge,
    variantClass,
    sizeClass,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
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
    </span>
  );
}

export default Badge;
