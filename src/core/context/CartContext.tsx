// src/core/context/CartContext.tsx
'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { CartItem } from '../types/cart';
import type { Product } from '../types/product';
import {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  clearCart as clearCartItems,
  calculateCartTotals,
} from '../domain/cart/cart-service';

interface CartContextType {
  items: CartItem[];

  totalItems: number;
  subtotal: number;
  discountTotal: number;
  total: number;

  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  incrementItem: (productId: string) => void;
  decrementItem: (productId: string) => void;
  clearCart: () => void;

  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'ecommerce_cart_items';

function loadCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(items: CartItem[]): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Persistência client-side é best effort.
  }
}

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(loadCartFromStorage());
  }, []);

  useEffect(() => {
    saveCartToStorage(items);
  }, [items]);

  const totals = useMemo(
    () => calculateCartTotals(items),
    [items],
  );

  const addItem = (product: Product, quantity = 1) => {
    setItems((current) =>
      addItemToCart(current, product, quantity),
    );
  };

  const removeItem = (productId: string) => {
    setItems((current) =>
      removeItemFromCart(current, productId),
    );
  };

  const incrementItem = (productId: string) => {
    setItems((current) => {
      const item = current.find(
        (candidate) => candidate.productId === productId,
      );

      if (!item) return current;

      if (
        typeof item.maxQuantity === 'number' &&
        item.quantity >= item.maxQuantity
      ) {
        return current;
      }

      return updateCartItemQuantity(
        current,
        productId,
        item.quantity + 1,
      );
    });
  };

  const decrementItem = (productId: string) => {
    setItems((current) => {
      const item = current.find(
        (candidate) => candidate.productId === productId,
      );

      if (!item) return current;

      return updateCartItemQuantity(
        current,
        productId,
        item.quantity - 1,
      );
    });
  };

  const clearCart = () => {
    setItems(clearCartItems());
  };

  const isInCart = (productId: string): boolean =>
    items.some((item) => item.productId === productId);

  const value: CartContextType = {
    items,

    totalItems: totals.itemsCount,
    subtotal: totals.subtotal,
    discountTotal: totals.discountTotal,
    total: totals.total,

    addItem,
    removeItem,
    incrementItem,
    decrementItem,
    clearCart,

    isInCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContextInternal(): CartContextType {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error(
      'useCart deve ser usado dentro de um <CartProvider>.',
    );
  }

  return ctx;
}
