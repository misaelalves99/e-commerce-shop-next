// src/shared/layout/Header/CartIndicator.tsx

'use client';

import type { ComponentType, SVGProps } from 'react';
import styles from './CartIndicator.module.css';

interface CartIndicatorProps {
  count: number;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export default function CartIndicator({ count, icon: Icon }: CartIndicatorProps) {
  const hasItems = count > 0;
  const label = hasItems
    ? `${count} item${count > 1 ? 's' : ''} no carrinho`
    : 'Carrinho vazio';

  return (
    <span className={styles.root} aria-label={label}>
      <span className={styles.iconWrapper}>
        <Icon className={styles.icon} />
        {hasItems && (
          <span className={styles.badge}>
            {count > 9 ? '9+' : count}
          </span>
        )}
      </span>
    </span>
  );
}
