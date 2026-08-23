// src/shared/ui/IconButton/IconButton.tsx

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './IconButton.module.css';

type IconButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'children'> {
  icon: ReactNode;
  'aria-label': string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  type?: 'button' | 'submit' | 'reset';
}

export function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  type = 'button',
  className,
  disabled,
  ...rest
}: IconButtonProps) {
  const variantClass =
    variant === 'primary'
      ? styles.primary
      : variant === 'secondary'
      ? styles.secondary
      : variant === 'outline'
      ? styles.outline
      : styles.ghost;

  const sizeClass =
    size === 'xs'
      ? styles.sizeXs
      : size === 'sm'
      ? styles.sizeSm
      : size === 'lg'
      ? styles.sizeLg
      : styles.sizeMd;

  const classes = [
    styles.iconButton,
    variantClass,
    sizeClass,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      {...rest}
    >
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
    </button>
  );
}

export default IconButton;
