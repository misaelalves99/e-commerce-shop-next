// src/app/(site)/product/[id]/page.tsx

import { notFound } from 'next/navigation';

import {
  categoriesMock,
  productsMock,
} from '@/core/mocks/products.mock';

import type { ProductAPI } from '@/core/types/product-api';
import type { CardCategory } from '@/core/types/category';

import {
  mapProductsApiToProducts,
} from '@/core/domain/catalog/mapProductApiToProduct';

import ProductDetailPage from '@/features/product-detail/pages/ProductDetailPage';

interface ProductRouteProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductRoute({
  params,
}: ProductRouteProps) {
  const { id } = await params;

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

  const product = products.find(
    (item) =>
      item.id === id ||
      item.slug === id,
  );

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter(
      (item) =>
        item.id !== product.id &&
        item.categoryId === product.categoryId,
    )
    .slice(0, 4);

  return (
    <ProductDetailPage
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
