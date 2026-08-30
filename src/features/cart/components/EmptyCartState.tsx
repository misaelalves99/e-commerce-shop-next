
// src/features/cart/components/EmptyCartState.tsx
'use client';

import type { AppRoute } from '@/core/config/routes';

import type { ReactElement } from 'react';

import Link from 'next/link';

import styles from '../styles/CartPage.module.css';

type Props = {
  ctaLabel: string;
  description: string;
  href: AppRoute;
};

export default function EmptyCartState({
  ctaLabel,
  description,
  href,
}: Props): ReactElement {
  return (
    <section className={styles.emptyState}>
      <div className={styles.emptyIcon}>🛒</div>

      <h2 className={styles.emptyTitle}>Seu carrinho está vazio</h2>

      <p className={styles.emptyDescription}>{description}</p>

      <Link href={href} className={styles.emptyCta}>
        {ctaLabel}
      </Link>

      <p className={styles.emptyHint}>
        Dica: salve seus produtos favoritos e acompanhe as ofertas para
        encontrar boas oportunidades.
      </p>
    </section>
  );
}
