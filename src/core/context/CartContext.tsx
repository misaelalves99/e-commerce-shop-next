// src/core/context/CartContext.tsx
'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { useAuth } from '../hooks/useAuth';
import {
  loadCommerceData,
  persistCart,
} from '../data/commerce/commerce-client';
import {
  mergeCartItems,
} from '../data/commerce/commerce-merge';
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

const CartContext =
  createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'ecommerce_cart_items';

function loadCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw =
      window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed =
      JSON.parse(raw) as CartItem[];

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(
  items: CartItem[],
): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items),
    );
  } catch {
    // Guest persistence is best effort.
  }
}

function clearCartStorage(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.removeItem(
      STORAGE_KEY,
    );
  } catch {
    // Guest storage cleanup is best effort.
  }
}

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({
  children,
}: CartProviderProps) {
  const {
    isAuthenticated,
    loading: authLoading,
    serverSessionReady,
  } = useAuth();

  const [items, setItems] =
    useState<CartItem[]>([]);

  const [hydrated, setHydrated] =
    useState(false);

  const authenticatedRef =
    useRef(false);

  const hydratingRef =
    useRef(false);

  useEffect(() => {
    if (
      authLoading ||
      (isAuthenticated && !serverSessionReady)
    ) {
      return;
    }

    let cancelled = false;

    const hydrate = async () => {
      if (!isAuthenticated) {
        authenticatedRef.current = false;

        const guest =
          loadCartFromStorage();

        if (!cancelled) {
          hydratingRef.current = false;
          setItems(guest);
          setHydrated(true);
        }

        return;
      }

      const guest =
        loadCartFromStorage();

      const remote =
        await loadCommerceData();

      const merged =
        mergeCartItems(
          remote.cart,
          guest,
        );

      const persisted =
        guest.length > 0
          ? await persistCart(merged)
          : remote.cart;

      clearCartStorage();

      authenticatedRef.current = true;

      if (!cancelled) {
        hydratingRef.current = false;
        setItems(persisted);
        setHydrated(true);
      }
    };

    hydratingRef.current = true;

    void hydrate().catch(() => {
      if (!cancelled) {
        hydratingRef.current = false;
        setItems([]);
        setHydrated(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [
    authLoading,
    isAuthenticated,
    serverSessionReady,
  ]);

  useEffect(() => {
    if (
      !hydrated ||
      hydratingRef.current
    ) {
      return;
    }

    if (!isAuthenticated) {
      saveCartToStorage(items);
      return;
    }

    if (!authenticatedRef.current) {
      return;
    }

    void persistCart(items);
  }, [
    hydrated,
    isAuthenticated,
    items,
  ]);

  const totals = useMemo(
    () => calculateCartTotals(items),
    [items],
  );

  const addItem = (
    product: Product,
    quantity = 1,
  ) => {
    setItems((current) =>
      addItemToCart(
        current,
        product,
        quantity,
      ),
    );
  };

  const removeItem = (
    productId: string,
  ) => {
    setItems((current) =>
      removeItemFromCart(
        current,
        productId,
      ),
    );
  };

  const incrementItem = (
    productId: string,
  ) => {
    setItems((current) => {
      const item = current.find(
        (candidate) =>
          candidate.productId === productId,
      );

      if (!item) {
        return current;
      }

      return updateCartItemQuantity(
        current,
        productId,
        item.quantity + 1,
      );
    });
  };

  const decrementItem = (
    productId: string,
  ) => {
    setItems((current) => {
      const item = current.find(
        (candidate) =>
          candidate.productId === productId,
      );

      if (!item) {
        return current;
      }

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

  const isInCart = (
    productId: string,
  ): boolean =>
    items.some(
      (item) =>
        item.productId === productId,
    );

  const value: CartContextType = {
    items,

    totalItems: totals.itemsCount,
    subtotal: totals.subtotal,
    discountTotal:
      totals.discountTotal,
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
