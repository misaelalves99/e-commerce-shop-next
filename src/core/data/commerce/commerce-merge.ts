import type { CartItem } from '@/core/types/cart';

export function mergeFavoriteIds(
  remote: string[],
  guest: string[],
): string[] {
  return [...new Set([...remote, ...guest])];
}

export function mergeCartItems(
  remote: CartItem[],
  guest: CartItem[],
): CartItem[] {
  const merged = new Map<string, CartItem>();

  for (const item of remote) {
    merged.set(item.productId, item);
  }

  for (const guestItem of guest) {
    const existing =
      merged.get(guestItem.productId);

    if (!existing) {
      merged.set(
        guestItem.productId,
        guestItem,
      );
      continue;
    }

    const maxQuantity =
      existing.maxQuantity ??
      guestItem.maxQuantity;

    const quantity =
      existing.quantity +
      guestItem.quantity;

    merged.set(
      guestItem.productId,
      {
        ...existing,
        ...guestItem,
        quantity:
          maxQuantity !== undefined
            ? Math.min(
                quantity,
                maxQuantity,
              )
            : quantity,
        maxQuantity,
      },
    );
  }

  return [...merged.values()];
}
