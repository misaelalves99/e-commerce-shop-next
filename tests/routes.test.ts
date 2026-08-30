import assert from 'node:assert/strict';
import test from 'node:test';

import {
  ROUTES,
  isGuestOnlyRoute,
  isProtectedRoute,
  resolveAppRoute,
} from '../src/core/config/routes';

test('canonical route contract', () => {
  assert.equal(ROUTES.home, '/');
  assert.equal(ROUTES.catalog, '/products');
  assert.equal(ROUTES.productDetail('abc'), '/product/abc');
  assert.equal(ROUTES.account.profile, '/profile');
});

test('protected routes include exact and nested paths', () => {
  assert.equal(isProtectedRoute('/profile'), true);
  assert.equal(isProtectedRoute('/profile/preferences'), true);
  assert.equal(isProtectedRoute('/checkout'), true);
  assert.equal(isProtectedRoute('/cart'), false);
  assert.equal(isProtectedRoute('/products'), false);
});

test('guest-only routes are restricted to auth entry points', () => {
  assert.equal(isGuestOnlyRoute('/login'), true);
  assert.equal(isGuestOnlyRoute('/register'), true);
  assert.equal(isGuestOnlyRoute('/profile'), false);
});

test('resolveAppRoute accepts known routes and product detail paths', () => {
  assert.equal(resolveAppRoute('/products'), '/products');
  assert.equal(
    resolveAppRoute('/product/example-product'),
    '/product/example-product',
  );
  assert.equal(
    resolveAppRoute('/products?category=shoes'),
    '/products?category=shoes',
  );
});

test('resolveAppRoute rejects unknown and external destinations', () => {
  assert.equal(resolveAppRoute('https://example.com'), '/');
  assert.equal(resolveAppRoute('//example.com'), '/');
  assert.equal(resolveAppRoute('/unknown-route'), '/');
});
