// src/core/context/FavoritesContext.tsx
'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { useAuth } from '../hooks/useAuth';
import {
  loadCommerceData,
  persistFavoriteIds,
} from '../data/commerce/commerce-client';
import {
  mergeFavoriteIds,
} from '../data/commerce/commerce-merge';

interface FavoritesContextType {
  favoriteIds: string[];
  toggleFavorite: (
    productId: string,
  ) => void;
  addFavorite: (
    productId: string,
  ) => void;
  removeFavorite: (
    productId: string,
  ) => void;
  isFavorite: (
    productId: string,
  ) => boolean;
}

const FavoritesContext =
  createContext<
    FavoritesContextType | undefined
  >(undefined);

const STORAGE_KEY =
  'ecommerce_favorites';

function loadFavoritesFromStorage(): string[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw =
      window.localStorage.getItem(
        STORAGE_KEY,
      );

    if (!raw) {
      return [];
    }

    const parsed =
      JSON.parse(raw) as string[];

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch {
    return [];
  }
}

function saveFavoritesToStorage(
  ids: string[],
): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(ids),
    );
  } catch {
    // Guest persistence is best effort.
  }
}

function clearFavoritesStorage(): void {
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

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({
  children,
}: FavoritesProviderProps) {
  const {
    isAuthenticated,
    loading: authLoading,
    serverSessionReady,
  } = useAuth();

  const [
    favoriteIds,
    setFavoriteIds,
  ] = useState<string[]>([]);

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
          loadFavoritesFromStorage();

        if (!cancelled) {
          hydratingRef.current = false;
          setFavoriteIds(guest);
          setHydrated(true);
        }

        return;
      }

      const guest =
        loadFavoritesFromStorage();

      const remote =
        await loadCommerceData();

      const merged =
        mergeFavoriteIds(
          remote.favoriteIds,
          guest,
        );

      const persisted =
        guest.length > 0
          ? await persistFavoriteIds(
              merged,
            )
          : remote.favoriteIds;

      clearFavoritesStorage();

      authenticatedRef.current = true;

      if (!cancelled) {
        hydratingRef.current = false;
        setFavoriteIds(persisted);
        setHydrated(true);
      }
    };

    hydratingRef.current = true;

    void hydrate().catch(() => {
      if (!cancelled) {
        hydratingRef.current = false;
        setFavoriteIds([]);
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
      saveFavoritesToStorage(
        favoriteIds,
      );
      return;
    }

    if (!authenticatedRef.current) {
      return;
    }

    void persistFavoriteIds(
      favoriteIds,
    );
  }, [
    favoriteIds,
    hydrated,
    isAuthenticated,
  ]);

  const addFavorite = (
    productId: string,
  ) => {
    setFavoriteIds((current) =>
      current.includes(productId)
        ? current
        : [...current, productId],
    );
  };

  const removeFavorite = (
    productId: string,
  ) => {
    setFavoriteIds((current) =>
      current.filter(
        (id) => id !== productId,
      ),
    );
  };

  const toggleFavorite = (
    productId: string,
  ) => {
    setFavoriteIds((current) =>
      current.includes(productId)
        ? current.filter(
            (id) => id !== productId,
          )
        : [...current, productId],
    );
  };

  const isFavorite = (
    productId: string,
  ): boolean =>
    favoriteIds.includes(productId);

  const value: FavoritesContextType = {
    favoriteIds,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider
      value={value}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContextInternal(): FavoritesContextType {
  const ctx =
    useContext(FavoritesContext);

  if (!ctx) {
    throw new Error(
      'useFavorites deve ser usado dentro de um <FavoritesProvider>.',
    );
  }

  return ctx;
}
