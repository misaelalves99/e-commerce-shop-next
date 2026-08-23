// src/core/hooks/useFavorites.ts
'use client';

import { useFavoritesContextInternal } from '../context/FavoritesContext';

/**
 * Hook público para consumir o contexto de favoritos.
 * Exemplo:
 * const { favoriteIds, toggleFavorite, isFavorite } = useFavorites();
 */
export function useFavorites() {
  return useFavoritesContextInternal();
}
