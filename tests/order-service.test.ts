import assert from 'node:assert/strict';
import test from 'node:test';

import {
  createOrderDraft,
  normalizeCreateOrderInput,
  OrderValidationError,
} from '../src/core/domain/order/order-service';

const address = {
  fullName: 'Test User',
  phone: '11999999999',
  zipCode: '01001-000',
  street: 'Test Street',
  number: '10',
  district: 'Center',
  city: 'São Paulo',
  state: 'SP',
};

const catalog = [
  {
    id: 'product-1',
    title: 'Product One',
    image: '/one.webp',
    price: 10.25,
    stock: 5,
  },
  {
    id: 'product-2',
    title: 'Product Two',
    image: '/two.webp',
    price: 20,
    stock: 10,
  },
];

test(
  'normalizeCreateOrderInput accepts the public creation contract',
  () => {
    assert.deepEqual(
      normalizeCreateOrderInput({
        items: [
          {
            productId:
              'product-1',
            quantity: 2,
          },
        ],
        address,
        paymentMethod: 'pix',
      }),
      {
        items: [
          {
            productId:
              'product-1',
            quantity: 2,
          },
        ],
        address,
        paymentMethod: 'pix',
      },
    );
  },
);

test(
  'normalizeCreateOrderInput rejects client-owned financial and malformed fields by ignoring authority outside contract',
  () => {
    const result =
      normalizeCreateOrderInput({
        items: [
          {
            productId:
              'product-1',
            quantity: 1,
            price: 0.01,
            title: 'Forged',
          },
        ],
        address: {
          ...address,
          id: 'forged-address',
          createdAt: 'fake',
        },
        paymentMethod:
          'credit-card',
        total: 0.01,
        status: 'delivered',
        userId: 'forged-user',
      });

    assert.deepEqual(
      result,
      {
        items: [
          {
            productId:
              'product-1',
            quantity: 1,
          },
        ],
        address,
        paymentMethod:
          'credit-card',
      },
    );
  },
);

test(
  'normalizeCreateOrderInput rejects invalid quantities and payment methods',
  () => {
    assert.equal(
      normalizeCreateOrderInput({
        items: [
          {
            productId:
              'product-1',
            quantity: 0,
          },
        ],
        address,
        paymentMethod: 'pix',
      }),
      null,
    );

    assert.equal(
      normalizeCreateOrderInput({
        items: [
          {
            productId:
              'product-1',
            quantity: 1,
          },
        ],
        address,
        paymentMethod: 'card',
      }),
      null,
    );
  },
);

test(
  'normalizeCreateOrderInput combines duplicate product quantities',
  () => {
    const result =
      normalizeCreateOrderInput({
        items: [
          {
            productId:
              'product-1',
            quantity: 2,
          },
          {
            productId:
              'product-1',
            quantity: 3,
          },
        ],
        address,
        paymentMethod: 'boleto',
      });

    assert.deepEqual(
      result?.items,
      [
        {
          productId:
            'product-1',
          quantity: 5,
        },
      ],
    );
  },
);

test(
  'createOrderDraft uses authoritative catalog price and computes totals',
  () => {
    const draft =
      createOrderDraft(
        {
          items: [
            {
              productId:
                'product-1',
              quantity: 2,
            },
            {
              productId:
                'product-2',
              quantity: 1,
            },
          ],
          address,
          paymentMethod: 'pix',
        },
        catalog,
      );

    assert.deepEqual(
      draft.items,
      [
        {
          productId:
            'product-1',
          title: 'Product One',
          image: '/one.webp',
          unitPrice: 10.25,
          quantity: 2,
          lineTotal: 20.5,
        },
        {
          productId:
            'product-2',
          title: 'Product Two',
          image: '/two.webp',
          unitPrice: 20,
          quantity: 1,
          lineTotal: 20,
        },
      ],
    );

    assert.equal(
      draft.itemsCount,
      3,
    );

    assert.equal(
      draft.subtotal,
      40.5,
    );

    assert.equal(
      draft.total,
      40.5,
    );
  },
);

test(
  'createOrderDraft rejects unknown products',
  () => {
    assert.throws(
      () =>
        createOrderDraft(
          {
            items: [
              {
                productId:
                  'missing',
                quantity: 1,
              },
            ],
            address,
            paymentMethod: 'pix',
          },
          catalog,
        ),
      OrderValidationError,
    );
  },
);

test(
  'createOrderDraft rejects quantities above authoritative stock',
  () => {
    assert.throws(
      () =>
        createOrderDraft(
          {
            items: [
              {
                productId:
                  'product-1',
                quantity: 6,
              },
            ],
            address,
            paymentMethod: 'pix',
          },
          catalog,
        ),
      /Insufficient stock/,
    );
  },
);
