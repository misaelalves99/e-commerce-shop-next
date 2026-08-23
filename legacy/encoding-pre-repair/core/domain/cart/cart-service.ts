// src/core/domain/cart/cart-service.ts

import type { CartItem, CartTotals } from '../../types/cart';
import type { Product } from '../../types/product';

/**
 * Procura o Ã­ndice de um item no carrinho.
 */
function findCartItemIndex(cart: CartItem[], productId: string): number {
  return cart.findIndex((item) => item.productId === productId);
}

/**
 * Adiciona um item ao carrinho (ou incrementa a quantidade se jÃ¡ existir).
 */
export function addItemToCart(cart: CartItem[], product: Product, quantity = 1): CartItem[] {
  if (quantity <= 0) return cart;

  const index = findCartItemIndex(cart, product.id);

  if (index === -1) {
    const newItem: CartItem = {
      productId: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      oldPrice: product.originalPrice ?? null,
      quantity,
      maxQuantity: product.stock > 0 ? product.stock : undefined,
      maxInstallments: product.maxInstallments,
      categoryId: product.categoryId,
      discountPercentage: product.discountPercentage ?? 0,
    };

    return [...cart, newItem];
  }

  const updated = [...cart];
  const existing = updated[index];
  updated[index] = {
    ...existing,
    quantity: existing.quantity + quantity,
  };

  return updated;
}

/**
 * Remove um item do carrinho.
 */
export function removeItemFromCart(cart: CartItem[], productId: string): CartItem[] {
  return cart.filter((item) => item.productId !== productId);
}

/**
 * Atualiza a quantidade de um item no carrinho.
 * Se a quantidade for menor ou igual a zero, o item Ã© removido.
 */
export function updateCartItemQuantity(
  cart: CartItem[],
  productId: string,
  quantity: number
): CartItem[] {
  if (quantity <= 0) {
    return removeItemFromCart(cart, productId);
  }

  const index = findCartItemIndex(cart, productId);
  if (index === -1) return cart;

  const updated = [...cart];
  updated[index] = {
    ...updated[index],
    quantity,
  };

  return updated;
}

/**
 * Limpa completamente o carrinho.
 */
export function clearCart(): CartItem[] {
  return [];
}

/**
 * Calcula totais de forma pura, sem efeitos colaterais.
 */
export function calculateCartTotals(cart: CartItem[]): CartTotals {
  let itemsCount = 0;
  let subtotal = 0;
  let discountTotal = 0;

  for (const item of cart) {
    const qty = item.quantity;
    const linePrice = item.price * qty;
    const lineOldPrice =
      item.oldPrice && item.oldPrice > item.price ? item.oldPrice * qty : null;

    itemsCount += qty;
    subtotal += linePrice;

    if (lineOldPrice) {
      discountTotal += lineOldPrice - linePrice;
    }
  }

  const total = subtotal; // ponto de extensÃ£o p/ frete, cupom, etc.

  return {
    itemsCount,
    subtotal: Number(subtotal.toFixed(2)),
    discountTotal: Number(discountTotal.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
}


