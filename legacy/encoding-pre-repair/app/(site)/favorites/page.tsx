// src/app/(site)/favorites/page.tsx

'use client';

import { useMemo } from 'react';

import { useFavorites } from '@/core/hooks/useFavorites';

import {
  categoriesMock,
  productsMock,
} from '@/core/mocks/products.mock';

import type { ProductAPI } from '@/core/types/product-api';
import type { CardCategory } from '@/core/types/category';

import {
  mapProductsApiToProducts,
} from '@/core/domain/catalog/mapProductApiToProduct';

import ProductGrid from '@/features/catalog/pages/ProductGrid';

export default function FavoritesPage() {
  const { favoriteIds } = useFavorites();

  const products = useMemo(() => {
    const categories: CardCategory[] = categoriesMock.map(
      (category) => ({
        ...category,
      }),
    );

    const apiProducts: ProductAPI[] = productsMock.map(
      (product) => ({
        ...product,
        images: product.images
          ? [...product.images]
          : undefined,
        tags: product.tags
          ? [...product.tags]
          : undefined,
      }),
    );

    return mapProductsApiToProducts(
      apiProducts,
      categories,
    ).filter((product) =>
      favoriteIds.includes(product.id),
    );
  }, [favoriteIds]);

  return (
    <main className="page-container">
      <h1>Favoritos</h1>

      {products.length === 0 ? (
        <p>Você ainda não adicionou produtos aos favoritos.</p>
      ) : (
        <ProductGrid products={products} />
      )}
    </main>
  );
}
