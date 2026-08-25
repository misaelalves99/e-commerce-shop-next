import 'server-only';

import {
  FieldValue,
  type DocumentData,
} from 'firebase-admin/firestore';

import { getFirebaseAdminFirestore } from '@/core/lib/firebase/admin/firebase-admin';
import type { CartItem } from '@/core/types/cart';

export interface CommerceData {
  cart: CartItem[];
  favoriteIds: string[];
}

const USERS_COLLECTION = 'users';

function commerceDocument(uid: string) {
  return getFirebaseAdminFirestore()
    .collection(USERS_COLLECTION)
    .doc(uid);
}

function normalizeCartItem(
  value: unknown,
): CartItem | null {
  if (
    !value ||
    typeof value !== 'object'
  ) {
    return null;
  }

  const candidate =
    value as Partial<CartItem>;

  if (
    typeof candidate.productId !== 'string' ||
    typeof candidate.title !== 'string' ||
    typeof candidate.image !== 'string' ||
    typeof candidate.price !== 'number' ||
    typeof candidate.quantity !== 'number'
  ) {
    return null;
  }

  const quantity = Math.max(
    1,
    Math.trunc(candidate.quantity),
  );

  const maxQuantity =
    typeof candidate.maxQuantity === 'number' &&
    candidate.maxQuantity > 0
      ? Math.trunc(candidate.maxQuantity)
      : undefined;

  return {
    productId: candidate.productId,
    title: candidate.title,
    image: candidate.image,
    price: candidate.price,
    oldPrice:
      typeof candidate.oldPrice === 'number'
        ? candidate.oldPrice
        : null,
    quantity:
      maxQuantity !== undefined
        ? Math.min(quantity, maxQuantity)
        : quantity,
    maxQuantity,
    maxInstallments:
      typeof candidate.maxInstallments === 'number'
        ? candidate.maxInstallments
        : undefined,
    categoryId:
      typeof candidate.categoryId === 'string'
        ? candidate.categoryId
        : undefined,
    discountPercentage:
      typeof candidate.discountPercentage === 'number'
        ? candidate.discountPercentage
        : undefined,
  };
}

export function normalizeCart(
  value: unknown,
): CartItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const unique = new Map<string, CartItem>();

  for (const entry of value) {
    const item = normalizeCartItem(entry);

    if (!item) {
      continue;
    }

    unique.set(item.productId, item);
  }

  return [...unique.values()];
}

export function normalizeFavoriteIds(
  value: unknown,
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return [
    ...new Set(
      value.filter(
        (entry): entry is string =>
          typeof entry === 'string' &&
          entry.trim().length > 0,
      ),
    ),
  ];
}

function normalizeDocument(
  data: DocumentData | undefined,
): CommerceData {
  if (!data) {
    return {
      cart: [],
      favoriteIds: [],
    };
  }

  return {
    cart: normalizeCart(data.cart),
    favoriteIds:
      normalizeFavoriteIds(
        data.favoriteIds,
      ),
  };
}

export async function getCommerceData(
  uid: string,
): Promise<CommerceData> {
  const snapshot =
    await commerceDocument(uid).get();

  if (!snapshot.exists) {
    return {
      cart: [],
      favoriteIds: [],
    };
  }

  return normalizeDocument(
    snapshot.data(),
  );
}

export async function saveCart(
  uid: string,
  value: unknown,
): Promise<CartItem[]> {
  const cart = normalizeCart(value);

  await commerceDocument(uid).set(
    {
      cart,
      commerceUpdatedAt:
        FieldValue.serverTimestamp(),
    },
    {
      merge: true,
    },
  );

  return cart;
}

export async function saveFavoriteIds(
  uid: string,
  value: unknown,
): Promise<string[]> {
  const favoriteIds =
    normalizeFavoriteIds(value);

  await commerceDocument(uid).set(
    {
      favoriteIds,
      commerceUpdatedAt:
        FieldValue.serverTimestamp(),
    },
    {
      merge: true,
    },
  );

  return favoriteIds;
}
