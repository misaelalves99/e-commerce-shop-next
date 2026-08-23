// src/shared/ui/RatingStars/RatingStars.tsx

import type { HTMLAttributes } from 'react';
import { useMemo } from 'react';
import styles from './RatingStars.module.css';

export interface RatingStarsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  rating: number; // 0–5
  max?: number;
  size?: 'sm' | 'md';
  showValue?: boolean;
  readOnly?: boolean;
  onChange?: (value: number) => void;
}

export function RatingStars({
  rating,
  max = 5,
  size = 'sm',
  showValue = true,
  readOnly = true,
  onChange,
  className,
  ...rest
}: RatingStarsProps) {
  const value = Math.max(0, Math.min(max, rating));
  const isInteractive = !readOnly && typeof onChange === 'function';

  const containerClasses = [
    styles.container,
    size === 'md' ? styles.sizeMd : styles.sizeSm,
    isInteractive ? styles.interactive : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const stars = useMemo(
    () => Array.from({ length: max }, (_, i) => i + 1),
    [max]
  );

  const handleClick = (star: number) => {
    if (!isInteractive) return;
    onChange?.(star);
  };

  return (
    <div className={containerClasses} {...rest}>
      <div className={styles.stars} aria-hidden={isInteractive ? undefined : true}>
        {stars.map((star) => {
          const filled = star <= value;
          return (
            <button
              key={star}
              type="button"
              className={`${styles.star} ${filled ? styles.starFilled : ''}`}
              onClick={() => handleClick(star)}
              disabled={!isInteractive}
            >
              ★
            </button>
          );
        })}
      </div>

      {showValue && (
        <span className={styles.value}>
          {value.toFixed(1).replace('.0', '')}/{max}
        </span>
      )}

      {/* Texto acessível para leitores de tela */}
      <span className={styles.srOnly}>
        Avaliação {value.toFixed(1)} de {max}
      </span>
    </div>
  );
}

export default RatingStars;
