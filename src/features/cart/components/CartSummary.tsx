
// src/features/cart/components/CartSummary.tsx
'use client';

import type { ReactElement } from 'react';

import Link from 'next/link';
import { useMemo } from 'react';

import { ROUTES } from '@/core/config/routes';

import styles from '../styles/CartPage.module.css';

type Props = {
  subtotal: number;
  totalItems: number;
  showCheckoutAction?: boolean;
};

export default function CartSummary({
  subtotal,
  totalItems,
  showCheckoutAction = true,
}: Props): ReactElement {
  const currency = useMemo(
    () =>
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
    []
  );

  const formattedSubtotal = currency.format(subtotal);
  const formattedTotal = formattedSubtotal; // frete e descontos futuros

  return (
    <section className={styles.summaryCard} aria-label="Resumo da compra">
      <header className={styles.summaryHeader}>
        <h2 className={styles.summaryTitle}>Resumo da compra</h2>
        <span className={styles.summaryItems}>
          {totalItems} {totalItems === 1 ? 'item' : 'itens'}
        </span>
      </header>

      <div className={styles.summaryRows}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Subtotal</span>
          <span className={styles.summaryValue}>{formattedSubtotal}</span>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Descontos</span>
          <span className={styles.summaryMuted}>—</span>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Frete</span>
          <span className={styles.summaryMuted}>
            Será calculado na próxima etapa
          </span>
        </div>

        <div className={styles.summaryDivider} />

        <div className={styles.summaryRowTotal}>
          <div className={styles.summaryTotalLabelBox}>
            <span className={styles.summaryTotalLabel}>Total</span>
            <span className={styles.summaryTotalSubLabel}>
              em até 12x sem juros (simulação)
            </span>
          </div>
          <span className={styles.summaryTotalValue}>{formattedTotal}</span>
        </div>
      </div>

      <div className={styles.summaryActions}>
        {showCheckoutAction && (
          <>
        <Link href={ROUTES.checkout} className={styles.summaryPrimaryButton}>
          Finalizar compra
        </Link>

        <p className={styles.summaryHint}>
          Ao finalizar a compra você concorda com os termos de uso e política de
          privacidade da loja.
        </p>

          </>
        )}

        <Link href={ROUTES.catalog} className={styles.summarySecondaryLink}>
          Escolher mais produtos
        </Link>
      </div>
    </section>
  );
}
