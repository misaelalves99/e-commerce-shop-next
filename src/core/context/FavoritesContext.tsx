// src/core/context/FavoritesContext.tsx
'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

interface FavoritesContextType {
  favoriteIds: string[];
  toggleFavorite: (productId: string) => void;
  addFavorite: (productId: string) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'ecommerce_favorites';

function loadFavoritesFromStorage(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as string[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function saveFavoritesToStorage(ids: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // silencioso
  }
}

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = loadFavoritesFromStorage();
    // localStorage is an external client-side source hydrated after SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFavoriteIds(stored);
  }, []);

  useEffect(() => {
    saveFavoritesToStorage(favoriteIds);
  }, [favoriteIds]);

  const addFavorite = (productId: string) => {
    setFavoriteIds((current) =>
      current.includes(productId) ? current : [...current, productId]
    );
  };

  const removeFavorite = (productId: string) => {
    setFavoriteIds((current) => current.filter((id) => id !== productId));
  };

  const toggleFavorite = (productId: string) => {
    setFavoriteIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
  };

  const isFavorite = (productId: string): boolean =>
    favoriteIds.includes(productId);

  const value: FavoritesContextType = {
    favoriteIds,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContextInternal(): FavoritesContextType {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error('useFavorites deve ser usado dentro de um <FavoritesProvider>.');
  }
  return ctx;
}
