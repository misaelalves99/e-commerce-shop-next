import {
  NextResponse,
  type NextRequest,
} from 'next/server';

import {
  AUTH_SESSION_COOKIE_NAME,
} from '@/core/auth/session';
import {
  verifyServerSession,
} from '@/core/auth/session-server';

const PROTECTED_PATHS = [
  '/profile',
  '/address',
  '/security',
  '/orders',
  '/cart',
  '/checkout',
];

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some(
    (base) =>
      pathname === base ||
      pathname.startsWith(`${base}/`),
  );
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(
    AUTH_SESSION_COOKIE_NAME,
  )?.value;

  const session = await verifyServerSession(
    sessionCookie,
  );

  if (!session) {
    const loginUrl = new URL('/login', request.url);

    loginUrl.searchParams.set(
      'redirectTo',
      `${pathname}${search}`,
    );

    const response =
      NextResponse.redirect(loginUrl);

    if (sessionCookie) {
      response.cookies.set(
        AUTH_SESSION_COOKIE_NAME,
        '',
        {
          httpOnly: true,
          secure:
            process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 0,
        },
      );
    }

    return response;
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
