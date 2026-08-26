import type { CartItem } from '@/core/types/cart';

import {
  createSerializedWriter,
} from './serialized-writer';

export interface CommerceData {
  cart: CartItem[];
  favoriteIds: string[];
}

interface CommerceResponse {
  cart?: CartItem[];
  favoriteIds?: string[];
  error?: string;
}

async function commerceRequest(
  init?: RequestInit,
): Promise<CommerceResponse> {
  const response = await fetch(
    '/api/commerce',
    {
      ...init,
      headers: {
        'Content-Type':
          'application/json',
        ...init?.headers,
      },
    },
  );

  const body =
    (await response.json()) as CommerceResponse;

  if (!response.ok) {
    throw new Error(
      body.error ??
        'Commerce request failed.',
    );
  }

  return body;
}

export async function loadCommerceData(): Promise<CommerceData> {
  const response =
    await commerceRequest({
      method: 'GET',
    });

  return {
    cart: response.cart ?? [],
    favoriteIds:
      response.favoriteIds ?? [],
  };
}

async function persistCartRequest(
  cart: CartItem[],
): Promise<CartItem[]> {
  const response =
    await commerceRequest({
      method: 'PATCH',
      body: JSON.stringify({
        cart,
      }),
    });

  if (!response.cart) {
    throw new Error(
      'Commerce cart response is missing.',
    );
  }

  return response.cart;
}

async function persistFavoriteIdsRequest(
  favoriteIds: string[],
): Promise<string[]> {
  const response =
    await commerceRequest({
      method: 'PATCH',
      body: JSON.stringify({
        favoriteIds,
      }),
    });

  if (!response.favoriteIds) {
    throw new Error(
      'Commerce favorites response is missing.',
    );
  }

  return response.favoriteIds;
}

const cartWriter =
  createSerializedWriter<CartItem[]>(
    persistCartRequest,
  );

const favoritesWriter =
  createSerializedWriter<string[]>(
    persistFavoriteIdsRequest,
  );

export function persistCart(
  cart: CartItem[],
): Promise<CartItem[]> {
  return cartWriter.write(cart);
}

export function persistFavoriteIds(
  favoriteIds: string[],
): Promise<string[]> {
  return favoritesWriter.write(
    favoriteIds,
  );
}
