// src/app/(site)/page.tsx

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

import AdvertisingSection from '@/features/home/sections/AdvertisingSection';
import EmphasisSection from '@/features/home/sections/EmphasisSection';
import EvaluatedSection from '@/features/home/sections/EvaluatedSection';
import SaleSection from '@/features/home/sections/SaleSection';

export const metadata: Metadata = {
  title: SEO_CONFIG.routes.home.title,
  description: SEO_CONFIG.routes.home.description,
  openGraph: {
    title: SEO_CONFIG.routes.home.title,
    description: SEO_CONFIG.routes.home.description,
    url: SEO_CONFIG.routes.home.url,
    images: SEO_CONFIG.routes.home.image
      ? [SEO_CONFIG.routes.home.image]
      : undefined,
  },
};

export default function HomePage() {
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
    <main>
      <AdvertisingSection categories={categories} />
      <SaleSection products={products} />
      <EmphasisSection products={products} />
      <EvaluatedSection products={products} />
    </main>
  );
}
