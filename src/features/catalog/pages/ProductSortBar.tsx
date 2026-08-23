
// src/features/catalog/components/ProductSortBar.tsx

'use client';

import type { ReactElement } from 'react';

import type { ChangeEvent } from 'react';
import styles from '../styles/ProductSortBar.module.css';

export type SortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
  | 'discount-desc';

export interface ProductSortBarProps {
  total: number;
  sort: SortOption;
  onSortChange: (next: SortOption) => void;
}

export default function ProductSortBar({
  total,
  sort,
  onSortChange,
}: ProductSortBarProps): ReactElement {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SortOption);
  };

  return (
    <div className={styles.bar}>
      <div className={styles.left}>
        <p className={styles.resultText}>
          <span className={styles.resultNumber}>{total}</span>{' '}
          {total === 1 ? 'produto encontrado' : 'produtos encontrados'}
        </p>
        <p className={styles.hintText}>
          Ordene por preço, relevância ou avaliação para encontrar a melhor
          opção.
        </p>
      </div>

      <div className={styles.right}>
        <label className={styles.sortLabel}>
          <span>Ordenar por</span>
          <div className={styles.selectWrapper}>
            <select
              value={sort}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="featured">Destaques</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
              <option value="rating-desc">Melhor avaliação</option>
              <option value="discount-desc">Maior desconto</option>
            </select>
          </div>
        </label>
      </div>
    </div>
  );
}
