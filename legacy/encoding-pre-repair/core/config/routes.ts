// src/core/config/routes.ts

import type { Route } from 'next';

/**
 * Rotas canônicas da aplicação.
 *
 * Os route groups do App Router, como `(account)`, `(auth)` e `(site)`,
 * organizam fisicamente o código, mas não fazem parte da URL pública.
 */
export const ROUTES = {
  home: '/',
  catalog: '/products',
  productDetail: (id: string | number) => `/product/${id}` as const,

  contact: '/contact',
  favorites: '/favorites',

  cart: '/cart',
  checkout: '/checkout',

  login: '/login',
  register: '/register',

  account: {
    root: '/profile',
    profile: '/profile',
    address: '/address',
    security: '/security',
    orders: '/orders',
  },
} as const;

/**
 * Prefixos das rotas protegidas.
 * Deve permanecer sincronizado com middleware.ts.
 */
export const PROTECTED_ROUTES_PREFIXES: string[] = [
  '/profile',
  '/address',
  '/security',
  '/orders',
  '/checkout',
];

/**
 * Rotas exclusivas para usuários não autenticados.
 */
export const GUEST_ONLY_ROUTES: string[] = [
  '/login',
  '/register',
];

export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES_PREFIXES.some(
    (prefix) =>
      pathname === prefix ||
      pathname.startsWith(`${prefix}/`),
  );
}

export function isGuestOnlyRoute(pathname: string): boolean {
  return GUEST_ONLY_ROUTES.includes(pathname);
}


export type AppRoute = Route;

/**
 * Converte valores vindos de runtime em uma rota interna conhecida.
 *
 * Aceita:
 * - rotas estáticas registradas pela aplicação;
 * - detalhes de produto;
 * - query/hash sobre uma rota válida.
 *
 * Rejeita URLs externas e caminhos desconhecidos.
 */
export function resolveAppRoute(
  value: string | null | undefined,
  fallback: AppRoute = ROUTES.home,
): AppRoute {
  if (!value || !value.startsWith('/') || value.startsWith('//')) {
    return fallback;
  }

  const pathname = value.split(/[?#]/)[0] ?? '';

  const staticRoutes = new Set<string>([
    ROUTES.home,
    ROUTES.catalog,
    ROUTES.contact,
    ROUTES.favorites,
    ROUTES.cart,
    ROUTES.checkout,
    ROUTES.login,
    ROUTES.register,
    ROUTES.account.root,
    ROUTES.account.profile,
    ROUTES.account.address,
    ROUTES.account.security,
    ROUTES.account.orders,
  ]);

  const isStaticRoute = staticRoutes.has(pathname);
  const isProductRoute = /^\/product\/[^/?#]+$/.test(pathname);

  if (!isStaticRoute && !isProductRoute) {
    return fallback;
  }

  return value as AppRoute;
}
