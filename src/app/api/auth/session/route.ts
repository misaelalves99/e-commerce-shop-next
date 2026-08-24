import { NextResponse } from 'next/server';

import {
  AUTH_SESSION_COOKIE_NAME,
  AUTH_SESSION_MAX_AGE_MILLISECONDS,
  AUTH_SESSION_MAX_AGE_SECONDS,
} from '@/core/auth/session';
import { getFirebaseAdminAuth } from '@/core/lib/firebase/admin/firebase-admin';

interface CreateSessionBody {
  idToken?: unknown;
}

const MAX_SIGN_IN_AGE_SECONDS = 5 * 60;

function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: AUTH_SESSION_MAX_AGE_SECONDS,
  };
}

export async function POST(request: Request) {
  let body: CreateSessionBody;

  try {
    body = (await request.json()) as CreateSessionBody;
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 },
    );
  }

  if (
    typeof body.idToken !== 'string' ||
    body.idToken.length === 0
  ) {
    return NextResponse.json(
      { error: 'Firebase ID token is required.' },
      { status: 400 },
    );
  }

  const adminAuth = getFirebaseAdminAuth();

  try {
    const decodedToken = await adminAuth.verifyIdToken(
      body.idToken,
      true,
    );

    const nowSeconds = Math.floor(Date.now() / 1000);

    if (
      nowSeconds - decodedToken.auth_time >
      MAX_SIGN_IN_AGE_SECONDS
    ) {
      return NextResponse.json(
        {
          error:
            'Recent authentication is required to create a server session.',
        },
        { status: 401 },
      );
    }

    const sessionCookie =
      await adminAuth.createSessionCookie(
        body.idToken,
        {
          expiresIn:
            AUTH_SESSION_MAX_AGE_MILLISECONDS,
        },
      );

    const response = NextResponse.json({
      authenticated: true,
    });

    response.cookies.set(
      AUTH_SESSION_COOKIE_NAME,
      sessionCookie,
      sessionCookieOptions(),
    );

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Invalid Firebase authentication token.' },
      { status: 401 },
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({
    authenticated: false,
  });

  response.cookies.set(
    AUTH_SESSION_COOKIE_NAME,
    '',
    {
      ...sessionCookieOptions(),
      maxAge: 0,
    },
  );

  return response;
}
