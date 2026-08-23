// middleware.ts

import { NextResponse, type NextRequest } from 'next/server';

const PROTECTED_PATHS = [
  '/profile',
  '/address',
  '/security',
  '/orders',
  '/cart',
  '/checkout',
];

const AUTH_COOKIE_NAME = 'auth';

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some(
    (base) =>
      pathname === base ||
      pathname.startsWith(`${base}/`),
  );
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const authCookie = request.cookies.get(
    AUTH_COOKIE_NAME,
  );

  if (isProtectedPath(pathname) && !authCookie) {
    const loginUrl = new URL('/login', request.url);

    loginUrl.searchParams.set(
      'redirectTo',
      `${pathname}${search}`,
    );

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/address/:path*',
    '/security/:path*',
    '/orders/:path*',
    '/cart/:path*',
    '/checkout/:path*',
  ],
};
