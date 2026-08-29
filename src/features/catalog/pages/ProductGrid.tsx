
// src/features/catalog/components/ProductGrid.tsx

'use client';

import type { ReactElement } from 'react';

import type { Product } from '@/core/types/product';
import ProductCard from '@/shared/ui/ProductCard/ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import styles from '../styles/ProductGrid.module.css';

export interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  favoriteIds?: string[];
  onToggleFavorite?: (productId: string) => void;
  onAddToCart?: (product: Product) => void;
}

export default function ProductGrid({
  products,
  isLoading = false,
  favoriteIds = [],
  onToggleFavorite,
  onAddToCart,
}: ProductGridProps): ReactElement {
  if (isLoading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className={styles.empty}>
        <h2 className={styles.emptyTitle}>Nenhum produto encontrado</h2>
        <p className={styles.emptyText}>
          Ajuste os filtros ou tente uma palavra-chave diferente para continuar
          explorando nossa vitrine.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favoriteIds.includes(product.id)}
          onToggleFavorite={
            onToggleFavorite
              ? () => onToggleFavorite(product.id)
              : undefined
          }
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
