// src/core/domain/catalog/mapProductApiToProduct.ts

import type { ProductAPI } from '../../types/product-api';
import type { Product } from '../../types/product';
import type { CardCategory } from '../../types/category';

/**
 * Calcula o percentual de desconto com base no preÃ§o atual e antigo.
 */
function computeDiscountPercentage(price: number, oldPrice?: number | null): number {
  if (!oldPrice || oldPrice <= price) return 0;
  const discount = (1 - price / oldPrice) * 100;
  return Math.round(discount);
}

/**
 * Calcula o valor aproximado da parcela (sem juros).
 */
function computeInstallmentValue(price: number, maxInstallments?: number | null): number | null {
  if (!maxInstallments || maxInstallments <= 1) return null;
  const value = price / maxInstallments;
  return Number(value.toFixed(2));
}

/**
 * Mapa de categorias para consulta rÃ¡pida por id.
 */
export function buildCategoryLookup(categories: CardCategory[]): Record<string, CardCategory> {
  return categories.reduce<Record<string, CardCategory>>((acc, category) => {
    acc[category.id] = category;
    return acc;
  }, {});
}

/**
 * Converte um ProductAPI (mock cru) em Product (modelo final usado na UI).
 */
export function mapProductApiToProduct(
  apiProduct: ProductAPI,
  categories: CardCategory[] | Record<string, CardCategory>
): Product {
  const categoryLookup =
    Array.isArray(categories) ? buildCategoryLookup(categories) : (categories as Record<string, CardCategory>);

  const category = categoryLookup[apiProduct.categoryId];

  const discountPercentage = computeDiscountPercentage(apiProduct.price, apiProduct.oldPrice);
  const installmentValue = computeInstallmentValue(apiProduct.price, apiProduct.maxInstallments);

  return {
    id: apiProduct.id,
    categoryId: apiProduct.categoryId,
    categoryLabel: category?.label ?? 'Categoria',
    categorySlug: category?.slug ?? apiProduct.categoryId,
    title: apiProduct.title,
    slug: apiProduct.slug,
    description: apiProduct.description ?? '',
    price: apiProduct.price,
    originalPrice: apiProduct.oldPrice ?? null,
    discountPercentage,
    rating: apiProduct.rating ?? 0,
    ratingCount: apiProduct.ratingCount ?? 0,
    image: apiProduct.image,
    images: apiProduct.images ?? [apiProduct.image],
    tags: apiProduct.tags ?? [],
    isFeatured: Boolean(apiProduct.featured),
    isFlashDeal: Boolean(apiProduct.isFlashDeal),
    stock: apiProduct.stock ?? 0,
    maxInstallments: apiProduct.maxInstallments ?? 1,
    installmentValue,
    /**
     * SugestÃ£o: custo estimado no PIX com pequeno desconto adicional
     * (apenas visual, sem regra real de pagamento).
     */
    pixPrice: Number((apiProduct.price * 0.95).toFixed(2)),
    isInStock: (apiProduct.stock ?? 0) > 0,
  };
}

/**
 * Mapeia uma lista de ProductAPI para Product.
 */
export function mapProductsApiToProducts(
  apiProducts: ProductAPI[],
  categories: CardCategory[] | Record<string, CardCategory>
): Product[] {
  return apiProducts.map((p) => mapProductApiToProduct(p, categories));
}



