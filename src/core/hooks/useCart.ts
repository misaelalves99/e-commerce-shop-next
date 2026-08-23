// src/core/hooks/useCart.ts
'use client';

import { useCartContextInternal } from '../context/CartContext';

/**
 * Hook público para consumir o contexto de carrinho.
 * Exemplo:
 * const { items, totals, addToCart } = useCart();
 */
export function useCart() {
  return useCartContextInternal();
}
