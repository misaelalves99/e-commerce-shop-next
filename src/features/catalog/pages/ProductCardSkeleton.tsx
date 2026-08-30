
// src/features/catalog/components/ProductCardSkeleton.tsx

'use client';

import type { ReactElement } from 'react';

import styles from '@/shared/ui/ProductCard/ProductCard.module.css';

export default function ProductCardSkeleton(): ReactElement {
  return (
    <article className={`${styles.card} ${styles.skeleton}`}>
      <div className={styles.cardInner}>
        <div className={styles.skeletonFavorite} />

        <div className={styles.skeletonDiscount} />

        <div className={styles.skeletonImage} />

        <div className={styles.skeletonContent}>
          <div className={styles.skeletonLineShort} />
          <div className={styles.skeletonLine} />
          <div className={styles.skeletonRatingRow} />
          <div className={styles.skeletonPriceRow} />
        </div>

        <div className={styles.skeletonButton} />
      </div>
    </article>
  );
}
