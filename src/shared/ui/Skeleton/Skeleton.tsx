// src/shared/ui/Skeleton/Skeleton.tsx

import type { HTMLAttributes } from 'react';
import styles from './Skeleton.module.css';

type SkeletonVariant = 'block' | 'text' | 'circle';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  lines?: number; // usado quando variant === 'text'
}

function toCssSize(value?: number | string): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return `${value}px`;
  return value;
}

export function Skeleton({
  variant = 'block',
  width,
  height,
  lines = 1,
  className,
  style,
  ...rest
}: SkeletonProps) {
  const baseStyle = {
    ...style,
    '--skeleton-width': toCssSize(width),
    '--skeleton-height': toCssSize(height),
  } as React.CSSProperties;

  const baseClass = [
    styles.skeleton,
    variant === 'circle'
      ? styles.circle
      : variant === 'text'
      ? styles.text
      : styles.block,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  if (variant === 'text' && lines > 1) {
    return (
      <div className={styles.textWrapper} style={baseStyle}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClass} ${
              index === lines - 1 ? styles.textLastLine : ''
            }`}
          />
        ))}
      </div>
    );
  }

  return <div className={baseClass} style={baseStyle} {...rest} />;
}

export default Skeleton;
