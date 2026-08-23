// src/core/types/cart.ts

export interface CartItem {
  productId: string;

  title: string;
  image: string;

  price: number;
  oldPrice?: number | null;

  quantity: number;
  maxQuantity?: number;

  maxInstallments?: number;
  categoryId?: string;
  discountPercentage?: number;
}

export interface CartTotals {
  itemsCount: number;
  subtotal: number;
  discountTotal: number;
  total: number;
}

export interface CartState {
  items: CartItem[];
  totals: CartTotals;
}
