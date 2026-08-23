
// src/features/catalog/components/ProductFilters.tsx

'use client';

import type { ReactElement } from 'react';

import type { ChangeEvent } from 'react';

import type { CardCategory } from '@/core/types/category';
import styles from '../styles/ProductFilters.module.css';

export type PriceRangeValue = 'all' | '0-100' | '100-300' | '300-600' | '600+';

export interface CatalogFilterState {
  categoryId: string | 'all';
  priceRange: PriceRangeValue;
  onlyDiscounted: boolean;
}

export interface ProductFiltersProps {
  categories: CardCategory[];
  value: CatalogFilterState;
  searchTerm: string;
  onChange: (next: CatalogFilterState) => void;
  onSearchChange: (value: string) => void;
}

export default function ProductFilters({
  categories,
  value,
  searchTerm,
  onChange,
  onSearchChange,
}: ProductFiltersProps): ReactElement {
  const handleCategoryChange = (categoryId: string | 'all') => {
    onChange({ ...value, categoryId });
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value as PriceRangeValue;
    onChange({ ...value, priceRange: v });
  };

  const handleOnlyDiscountedChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    onChange({ ...value, onlyDiscounted: event.target.checked });
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.searchBlock}>
        <label className={styles.label} htmlFor="catalog-search">
          Buscar produtos
        </label>
        <div className={styles.searchInputWrapper}>
          <input
            id="catalog-search"
            type="search"
            placeholder="Buscar por nome ou categoria..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Categorias</h3>
          <button
            type="button"
            className={styles.clearButton}
            onClick={() =>
              onChange({ ...value, categoryId: 'all', priceRange: 'all' })
            }
          >
            Limpar filtros
          </button>
        </div>

        <div className={styles.categoryList}>
          <button
            type={value.categoryId === 'all' ? 'button' : 'button'}
            className={
              value.categoryId === 'all'
                ? `${styles.categoryPill} ${styles.categoryPillActive}`
                : styles.categoryPill
            }
            onClick={() => handleCategoryChange('all')}
          >
            Todos
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={
                value.categoryId === category.id
                  ? `${styles.categoryPill} ${styles.categoryPillActive}`
                  : styles.categoryPill
              }
              onClick={() => handleCategoryChange(category.id)}
            >
              <span
                className={styles.categoryPillDot}
                aria-hidden="true"
                style={
                  category.highlightColor
                    ? { backgroundColor: category.highlightColor }
                    : undefined
                }
              />
              <span className={styles.categoryPillLabel}>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Faixa de preÃ§o</h3>
        <div className={styles.priceList}>
          <label className={styles.priceOption}>
            <input
              type="radio"
              name="price-range"
              value="all"
              checked={value.priceRange === 'all'}
              onChange={handlePriceChange}
            />
            <span>Qualquer preÃ§o</span>
          </label>

          <label className={styles.priceOption}>
            <input
              type="radio"
              name="price-range"
              value="0-100"
              checked={value.priceRange === '0-100'}
              onChange={handlePriceChange}
            />
            <span>AtÃ© R$ 100</span>
          </label>

          <label className={styles.priceOption}>
            <input
              type="radio"
              name="price-range"
              value="100-300"
              checked={value.priceRange === '100-300'}
              onChange={handlePriceChange}
            />
            <span>R$ 100 a R$ 300</span>
          </label>

          <label className={styles.priceOption}>
            <input
              type="radio"
              name="price-range"
              value="300-600"
              checked={value.priceRange === '300-600'}
              onChange={handlePriceChange}
            />
            <span>R$ 300 a R$ 600</span>
          </label>

          <label className={styles.priceOption}>
            <input
              type="radio"
              name="price-range"
              value="600+"
              checked={value.priceRange === '600+'}
              onChange={handlePriceChange}
            />
            <span>Acima de R$ 600</span>
          </label>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Ofertas</h3>
        <label className={styles.switchRow}>
          <input
            type="checkbox"
            checked={value.onlyDiscounted}
            onChange={handleOnlyDiscountedChange}
          />
          <span>Mostrar apenas produtos em promoÃ§Ã£o</span>
        </label>
        <p className={styles.helperText}>
          Ideal para destacar ofertas relÃ¢mpago, cupons ativos e descontos
          agressivos.
        </p>
      </div>
    </div>
  );
}




