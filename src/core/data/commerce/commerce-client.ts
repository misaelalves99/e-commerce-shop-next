import type { CartItem } from '@/core/types/cart';

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

export async function persistCart(
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

export async function persistFavoriteIds(
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
