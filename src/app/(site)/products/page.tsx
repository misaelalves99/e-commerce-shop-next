// src/app/(site)/products/page.tsx

import type { Metadata } from 'next';

import { SEO_CONFIG } from '@/core/config/seo-config';

import {
  categoriesMock,
  productsMock,
} from '@/core/mocks/products.mock';

import type { ProductAPI } from '@/core/types/product-api';
import type { CardCategory } from '@/core/types/category';

import {
  mapProductsApiToProducts,
} from '@/core/domain/catalog/mapProductApiToProduct';

import ProductsPage from '@/features/catalog/pages/ProductsPage';

export const metadata: Metadata = {
  title: SEO_CONFIG.routes.catalog.title,
  description: SEO_CONFIG.routes.catalog.description,
};

export default function ProductsRoute() {
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

  const products = mapProductsApiToProducts(
    apiProducts,
    categories,
  );

  return (
    <ProductsPage
      allProducts={products}
      categories={categories}
    />
  );
}
