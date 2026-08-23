
// src/features/cart/components/CartItemRow.tsx
'use client';

import type { ReactElement } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

import { useCart } from '@/core/hooks/useCart';
import { ROUTES } from '@/core/config/routes';
import type { CartItem } from '@/core/types/cart';

import styles from '../styles/CartItemRow.module.css';

type Props = {
  item: CartItem;
};

export default function CartItemRow({ item }: Props): ReactElement {
  const { incrementItem, decrementItem, removeItem } = useCart();

  const currency = useMemo(
    () =>
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
    []
  );

  const totalPrice = item.price * item.quantity;
  const isMaxReached =
    typeof item.maxQuantity === 'number' && item.quantity >= item.maxQuantity;

  const handleIncrease = () => {
    if (!isMaxReached) {
      incrementItem(item.productId);
    }
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      decrementItem(item.productId);
    }
  };

  const handleRemove = () => {
    removeItem(item.productId);
  };

  return (
    <article className={styles.row} aria-label={`Produto ${item.title}`}>
      <div className={styles.infoColumn}>
        <Link
          href={ROUTES.productDetail(item.productId)}
          className={styles.imageWrapper}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 96px, 128px"
            className={styles.image}
          />
        </Link>

        <div className={styles.textBox}>
          <Link
            href={ROUTES.productDetail(item.productId)}
            className={styles.name}
            title={item.title}
          >
            {item.title}
          </Link>

          <p className={styles.meta}>
            Envio rápido • Devolução grátis • Garantia estendida opcional
          </p>

          <div className={styles.tagsRow}>
            <span className={styles.tagHighlight}>Frete rápido</span>
            <span className={styles.tagMuted}>Devolução em até 7 dias</span>
          </div>

          <button
            type="button"
            className={styles.removeButton}
            onClick={handleRemove}
          >
            Remover
          </button>
        </div>
      </div>

      <div className={styles.controlsColumn}>
        <div className={styles.priceBlock}>
          <span className={styles.totalPrice}>
            {currency.format(totalPrice)}
          </span>
          <span className={styles.unitPrice}>
            {currency.format(item.price)} cada
          </span>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.quantityWrapper}>
            <span className={styles.quantityLabel}>Quantidade</span>

            <div className={styles.quantityControl}>
              <button
                type="button"
                className={styles.qtyButton}
                onClick={handleDecrease}
                aria-label="Diminuir quantidade"
                disabled={item.quantity <= 1}
              >
                −
              </button>
              <span className={styles.qtyValue}>{item.quantity}</span>
              <button
                type="button"
                className={styles.qtyButton}
                onClick={handleIncrease}
                aria-label="Aumentar quantidade"
                disabled={isMaxReached}
              >
                +
              </button>
            </div>

            {isMaxReached ? (
              <span className={styles.stockHintDanger}>
                Máximo disponível para este produto
              </span>
            ) : (
              <span className={styles.stockHint}>
                {item.quantity <= 3
                  ? 'Em estoque • últimas unidades'
                  : 'Em estoque'}
              </span>
            )}
          </div>

          <div className={styles.actionsRow}>
            <button
              type="button"
              className={styles.saveForLaterButton}
              // futura implementação: mover para "salvos"
              onClick={handleRemove}
            >
              Salvar para depois
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
