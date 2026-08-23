// src/core/types/product-api.ts

export interface ProductAPI {
  id: string;
  slug: string;
  title: string;
  description?: string;

  categoryId: string;

  price: number;
  oldPrice?: number | null;

  rating?: number;
  ratingCount?: number;

  image: string;
  images?: string[];

  tags?: string[];

  featured?: boolean;
  isFlashDeal?: boolean;

  stock?: number;
  maxInstallments?: number;

  brand?: string;
}
