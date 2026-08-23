// src/core/types/product.ts

import type { CardCategory } from './category';

export interface Product {
  id: string;
  slug: string;

  title: string;
  description: string;

  categoryId: CardCategory['id'];
  categoryLabel: string;
  categorySlug: string;

  price: number;
  originalPrice?: number | null;
  discountPercentage: number;

  rating: number;
  ratingCount: number;

  image: string;
  images: string[];

  tags: string[];

  isFlashDeal: boolean;
  isFeatured: boolean;

  stock: number;
  isInStock: boolean;

  maxInstallments: number;
  installmentValue: number | null;
  pixPrice: number;

  brand?: string;
}
