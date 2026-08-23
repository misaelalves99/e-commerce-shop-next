
// src/features/cart/pages/CartPage.tsx

'use client';

import type { ReactElement } from 'react';

import Link from 'next/link';

import CartItemRow from '../components/CartItemRow';
import CartSummary from '../components/CartSummary';
import EmptyCartState from '../components/EmptyCartState';

import { useCart } from '@/core/hooks/useCart';
import { ROUTES } from '@/core/config/routes';

import styles from '../styles/CartPage.module.css';

export default function CartPage(): ReactElement {
  const { items, totalItems, subtotal } = useCart();

  const hasItems = Array.isArray(items) && items.length > 0;

  if (!hasItems) {
    return (
      <main className={styles.page}>
        <section className={styles.header}>
          <h1 className={styles.title}>Seu carrinho</h1>
          <p className={styles.subtitle}>
            VocÃª ainda nÃ£o adicionou nenhum produto. Explore as ofertas e comece a
            montar sua sacola.
          </p>
        </section>

        <EmptyCartState
          ctaLabel="Ver ofertas"
          description="Navegue pelo catÃ¡logo de produtos e encontre itens com o melhor custo-benefÃ­cio em um visual inspirado nos grandes players do mercado."
          href={ROUTES.catalog}
        />
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <h1 className={styles.title}>Seu carrinho</h1>

        <div className={styles.headerMeta}>
          <p className={styles.subtitle}>
            Revise os itens antes de finalizar a compra. VocÃª pode ajustar quantidades ou
            remover produtos da sacola.
          </p>
          <span className={styles.itemsPill}>
            {totalItems} {totalItems === 1 ? 'item' : 'itens'}
          </span>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.itemsColumn}>
          <div className={styles.itemsHeader}>
            <span className={styles.itemsHeaderTitle}>Produtos</span>
            <span className={styles.itemsHeaderPrice}>PreÃ§o</span>
          </div>

          <div className={styles.itemsList}>
            {items.map((item) => (
              <CartItemRow key={item.productId} item={item} />
            ))}
          </div>

          <div className={styles.continueRow}>
            <Link href={ROUTES.catalog} className={styles.continueLink}>
              â† Continuar comprando
            </Link>
          </div>
        </div>

        <aside className={styles.summaryColumn}>
          <CartSummary subtotal={subtotal} totalItems={totalItems} />
        </aside>
      </section>
    </main>
  );
}




