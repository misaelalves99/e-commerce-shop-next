import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildCategoryLookup,
  mapProductApiToProduct,
} from '../src/core/domain/catalog/mapProductApiToProduct';

import type { CardCategory } from '../src/core/types/category';
import type { ProductAPI } from '../src/core/types/product-api';

const categories: CardCategory[] = [
  {
    id: 'electronics',
    slug: 'electronics',
    label: 'Electronics',
  },
];

test('buildCategoryLookup indexes categories by id', () => {
  const lookup = buildCategoryLookup(categories);

  assert.equal(lookup.electronics?.label, 'Electronics');
});

test('product mapper computes derived commerce fields', () => {
  const product: ProductAPI = {
    id: 'product-1',
    slug: 'example-product',
    title: 'Example Product',
    categoryId: 'electronics',
    price: 80,
    oldPrice: 100,
    rating: 4.5,
    ratingCount: 10,
    image: '/product.jpg',
    stock: 5,
    maxInstallments: 4,
  };

  const mapped = mapProductApiToProduct(product, categories);

  assert.equal(mapped.categoryLabel, 'Electronics');
  assert.equal(mapped.discountPercentage, 20);
  assert.equal(mapped.installmentValue, 20);
  assert.equal(mapped.pixPrice, 76);
  assert.equal(mapped.isInStock, true);
});

test('product mapper applies safe fallbacks', () => {
  const product: ProductAPI = {
    id: 'product-2',
    slug: 'fallback-product',
    title: 'Fallback Product',
    categoryId: 'unknown',
    price: 50,
    image: '/fallback.jpg',
  };

  const mapped = mapProductApiToProduct(product, []);

  assert.equal(mapped.categoryLabel, 'Categoria');
  assert.equal(mapped.discountPercentage, 0);
  assert.equal(mapped.installmentValue, null);
  assert.equal(mapped.rating, 0);
  assert.equal(mapped.ratingCount, 0);
  assert.equal(mapped.stock, 0);
  assert.equal(mapped.isInStock, false);
});
