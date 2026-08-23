
// src/features/catalog/pages/ProductsPage.tsx

'use client';

import type { ReactElement } from 'react';

import { useMemo, useState } from 'react';

import type { Product } from '@/core/types/product';
import type { CardCategory } from '@/core/types/category';
import { useCart } from '@/core/hooks/useCart';
import { useFavorites } from '@/core/hooks/useFavorites';
import ProductGrid from './ProductGrid';
import ProductFilters, {
  type CatalogFilterState,
} from './ProductFilters';
import ProductSortBar, { type SortOption } from './ProductSortBar';

export interface ProductsPageProps {
  allProducts: Product[];
  categories: CardCategory[];
  isLoading?: boolean;
}

export default function ProductsPage({
  allProducts,
  categories,
  isLoading = false,
}: ProductsPageProps): ReactElement {
  const { addItem } = useCart();
  const { favoriteIds, toggleFavorite } = useFavorites();

  const [filterState, setFilterState] = useState<CatalogFilterState>({
    categoryId: 'all',
    priceRange: 'all',
    onlyDiscounted: false,
  });

  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    let products = [...allProducts];

    // Search
    if (searchTerm.trim().length > 0) {
      const q = searchTerm.trim().toLowerCase();
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          (Array.isArray(p.tags) &&
            p.tags.some((tag) => tag.toLowerCase().includes(q)))
      );
    }

    // Category filter
    if (filterState.categoryId !== 'all') {
      products = products.filter(
        (p) => p.categoryId === filterState.categoryId
      );
    }

    // Discount filter
    if (filterState.onlyDiscounted) {
      products = products.filter((p) => {
        if (typeof p.discountPercentage === 'number') {
          return p.discountPercentage > 0;
        }
        if (typeof p.originalPrice === 'number') {
          return p.originalPrice > p.price;
        }
        return false;
      });
    }

    // Price range
    if (filterState.priceRange !== 'all') {
      products = products.filter((p) => {
        const price = p.price;
        switch (filterState.priceRange) {
          case '0-100':
            return price <= 100;
          case '100-300':
            return price > 100 && price <= 300;
          case '300-600':
            return price > 300 && price <= 600;
          case '600+':
            return price > 600;
          default:
            return true;
        }
      });
    }

    // Sort
    products.sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc': {
          const ratingA = a.rating ?? 0;
          const ratingB = b.rating ?? 0;
          if (ratingB !== ratingA) return ratingB - ratingA;
          const countA = a.ratingCount ?? 0;
          const countB = b.ratingCount ?? 0;
          return countB - countA;
        }
        case 'discount-desc': {
          const discountA =
            typeof a.discountPercentage === 'number'
              ? a.discountPercentage
              : typeof a.originalPrice === 'number'
              ? ((a.originalPrice - a.price) / a.originalPrice) * 100
              : 0;
          const discountB =
            typeof b.discountPercentage === 'number'
              ? b.discountPercentage
              : typeof b.originalPrice === 'number'
              ? ((b.originalPrice - b.price) / b.originalPrice) * 100
              : 0;
          return discountB - discountA;
        }
        case 'featured':
        default:
          // destaque: combinando flag isFeatured + rating + desconto
          const score = (p: Product) => {
            const base = p.isFeatured ? 2 : 0;
            const rating = (p.rating ?? 0) / 5;
            const discount =
              typeof p.discountPercentage === 'number'
                ? p.discountPercentage / 100
                : 0;
            return base + rating + discount;
          };
          return score(b) - score(a);
      }
    });

    return products;
  }, [allProducts, filterState, searchTerm, sortOption]);

  const total = filteredProducts.length;

  return (
    <section className="page-container">
      <header className="page-header">
        <div className="page-header__left">
          <p className="eyebrow-label">Catálogo completo</p>
          <h1 className="page-title">Encontre tudo em um só lugar</h1>
          <p className="page-subtitle">
            Filtre por categoria, preço e ofertas para encontrar os melhores
            produtos com frete rápido e pagamento seguro.
          </p>
        </div>
      </header>

      <div className="page-layout page-layout--with-sidebar">
        <aside className="page-layout__sidebar">
          <ProductFilters
            categories={categories}
            value={filterState}
            searchTerm={searchTerm}
            onChange={setFilterState}
            onSearchChange={setSearchTerm}
          />
        </aside>

        <main className="page-layout__content">
          <ProductSortBar
            total={total}
            sort={sortOption}
            onSortChange={setSortOption}
          />

          <ProductGrid
            products={filteredProducts}
            isLoading={isLoading}
            favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite}
            onAddToCart={addItem}
          />
        </main>
      </div>
    </section>
  );
}
