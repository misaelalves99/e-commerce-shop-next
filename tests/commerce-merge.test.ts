import assert from 'node:assert/strict';
import test from 'node:test';

import {
  mergeCartItems,
  mergeFavoriteIds,
} from '../src/core/data/commerce/commerce-merge';
import type { CartItem } from '../src/core/types/cart';

function cartItem(
  productId: string,
  quantity: number,
  maxQuantity?: number,
): CartItem {
  return {
    productId,
    title: productId,
    image: '/test.webp',
    price: 10,
    oldPrice: null,
    quantity,
    maxQuantity,
  };
}

test(
  'mergeFavoriteIds preserves remote order and appends unique guest ids',
  () => {
    assert.deepEqual(
      mergeFavoriteIds(
        ['remote-1', 'shared'],
        ['shared', 'guest-1'],
      ),
      [
        'remote-1',
        'shared',
        'guest-1',
      ],
    );
  },
);

test(
  'mergeCartItems combines quantities for the same product',
  () => {
    const result =
      mergeCartItems(
        [
          cartItem(
            'product-1',
            2,
            10,
          ),
        ],
        [
          cartItem(
            'product-1',
            3,
            10,
          ),
        ],
      );

    assert.equal(
      result.length,
      1,
    );

    assert.equal(
      result[0]?.quantity,
      5,
    );
  },
);

test(
  'mergeCartItems respects maxQuantity',
  () => {
    const result =
      mergeCartItems(
        [
          cartItem(
            'product-1',
            4,
            5,
          ),
        ],
        [
          cartItem(
            'product-1',
            4,
            5,
          ),
        ],
      );

    assert.equal(
      result[0]?.quantity,
      5,
    );
  },
);

test(
  'mergeCartItems preserves products that exist in only one source',
  () => {
    const result =
      mergeCartItems(
        [
          cartItem(
            'remote-only',
            1,
          ),
        ],
        [
          cartItem(
            'guest-only',
            2,
          ),
        ],
      );

    assert.deepEqual(
      result.map(
        ({ productId }) =>
          productId,
      ),
      [
        'remote-only',
        'guest-only',
      ],
    );
  },
);
