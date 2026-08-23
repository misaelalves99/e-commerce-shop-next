// src/core/domain/catalog/catalog-service.ts

import type { Product } from '../../types/product';
import type { CardCategory } from '../../types/category';

export type CatalogSortOption =
  | 'relevance'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
  | 'discount-desc'
  | 'newest';

export interface CatalogFilterParams {
  categoryId?: string | null;
  searchTerm?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  onlyInStock?: boolean;
  tag?: string | null;
}

/**
 * Filtra a lista de produtos com base em múltiplos critérios.
 * Função pura, ideal para ser usada em hooks/contexts.
 */
export function filterProducts(products: Product[], params: CatalogFilterParams): Product[] {
  const {
    categoryId,
    searchTerm,
    minPrice,
    maxPrice,
    onlyInStock = false,
    tag,
  } = params;

  const term = (searchTerm ?? '').trim().toLowerCase();
  const activeCategory = categoryId?.trim() || null;
  const activeTag = tag?.trim().toLowerCase() || null;

  return products.filter((product) => {
    if (activeCategory && product.categoryId !== activeCategory) {
      return false;
    }

    if (onlyInStock && !product.isInStock) {
      return false;
    }

    if (typeof minPrice === 'number' && product.price < minPrice) {
      return false;
    }

    if (typeof maxPrice === 'number' && product.price > maxPrice) {
      return false;
    }

    if (activeTag && !product.tags.some((t) => t.toLowerCase() === activeTag)) {
      return false;
    }

    if (!term) return true;

    const text =
      `${product.title} ${product.description} ${product.categoryLabel} ${product.tags.join(' ')}`.toLowerCase();

    return text.includes(term);
  });
}

/**
 * Ordena produtos com base em uma estratégia de ordenação.
 */
export function sortProducts(products: Product[], sortBy: CatalogSortOption): Product[] {
  const clone = [...products];

  switch (sortBy) {
    case 'price-asc':
      return clone.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return clone.sort((a, b) => b.price - a.price);
    case 'rating-desc':
      return clone.sort((a, b) => {
        if (b.rating === a.rating) {
          return b.ratingCount - a.ratingCount;
        }
        return b.rating - a.rating;
      });
    case 'discount-desc':
      return clone.sort((a, b) => (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0));
    case 'newest':
      // não temos data de criação aqui; podemos usar ratingCount como proxy
      return clone.sort((a, b) => b.ratingCount - a.ratingCount);
    case 'relevance':
    default:
      // "Relevância" simples: featured primeiro, depois rating e desconto
      return clone.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;

        const byRating = b.rating - a.rating;
        if (byRating !== 0) return byRating;

        const byDiscount = (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0);
        if (byDiscount !== 0) return byDiscount;

        return b.ratingCount - a.ratingCount;
      });
  }
}

/**
 * Retorna os produtos em destaque para a home.
 */
export function getFeaturedProducts(products: Product[], limit = 8): Product[] {
  const featured = products.filter((p) => p.isFeatured);
  return sortProducts(featured, 'relevance').slice(0, limit);
}

/**
 * Retorna os produtos mais bem avaliados (para seção "avaliados").
 */
export function getTopRatedProducts(products: Product[], limit = 8): Product[] {
  return sortProducts(products, 'rating-desc').slice(0, limit);
}

/**
 * Retorna uma lista limitada da categoria informada (para grids da home).
 */
export function getProductsByCategory(
  products: Product[],
  categoryId: string,
  limit = 8
): Product[] {
  return products
    .filter((p) => p.categoryId === categoryId)
    .slice(0, limit);
}

/**
 * Normaliza categorias a partir dos produtos (caso queira gerar a faixa de categorias automaticamente).
 */
export function buildCategoriesFromProducts(products: Product[]): CardCategory[] {
  const map = new Map<string, CardCategory>();

  for (const p of products) {
    if (!map.has(p.categoryId)) {
      map.set(p.categoryId, {
        id: p.categoryId,
        slug: p.categorySlug,
        label: p.categoryLabel,
        description: '',
      });
    }
  }

  return Array.from(map.values());
}
