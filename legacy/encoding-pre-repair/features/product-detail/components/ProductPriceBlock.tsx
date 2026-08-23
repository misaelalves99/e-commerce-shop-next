
// src/features/product-detail/components/ProductPriceBlock.tsx

'use client';

import type { ReactElement } from 'react';

import styles from '../styles/ProductDetail.module.css';

export interface ProductPriceBlockProps {
  price: number;
  originalPrice?: number | null;
  discountPercentage?: number | null;
  maxInstallments?: number | null;
  freeShipping?: boolean | null;
}

export default function ProductPriceBlock({
  price,
  originalPrice,
  discountPercentage,
  maxInstallments,
  freeShipping,
}: ProductPriceBlockProps): ReactElement {
  const hasOriginalPrice =
    typeof originalPrice === 'number' && originalPrice > price;

  const computedDiscount =
    typeof discountPercentage === 'number'
      ? discountPercentage
      : hasOriginalPrice
      ? Math.round(((originalPrice! - price) / originalPrice!) * 100)
      : 0;

  const hasDiscount = computedDiscount > 0;

  const installments = maxInstallments && maxInstallments > 1 ? maxInstallments : 1;

  const priceBRL = (value: number) =>
    value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

  const installmentValue = installments > 1 ? price / installments : price;

  return (
    <section className={styles.priceSection} aria-label="InformaÃ§Ãµes de preÃ§o">
      <div className={styles.priceRow}>
        <div className={styles.priceColumn}>
          <div className={styles.currentPriceRow}>
            <span className={styles.priceLabel}>Por</span>
            <span className={styles.currentPrice}>{priceBRL(price)}</span>
            {hasDiscount && (
              <span className={styles.discountBadgeInline}>-{computedDiscount}%</span>
            )}
          </div>

          {hasOriginalPrice && (
            <div className={styles.originalPriceRow}>
              <span className={styles.originalPriceLabel}>De</span>
              <span className={styles.originalPrice}>{priceBRL(originalPrice!)}</span>
            </div>
          )}

          {installments > 1 && (
            <p className={styles.installmentsText}>
              em atÃ©{' '}
              <strong>
                {installments}x de {priceBRL(installmentValue)}
              </strong>{' '}
              sem juros
            </p>
          )}

          <p className={styles.pixText}>
            <span className={styles.pixHighlight}>
              {priceBRL(price * 0.96)} Ã  vista no PIX
            </span>
            <span className={styles.pixBadge}>4% OFF</span>
          </p>
        </div>

        {freeShipping && (
          <div className={styles.shippingBadge}>
            <span className={styles.shippingLabel}>Frete grÃ¡tis</span>
            <span className={styles.shippingSub}>
              para Sudeste em compras acima de R$ 99,90
            </span>
          </div>
        )}
      </div>
    </section>
  );
}



