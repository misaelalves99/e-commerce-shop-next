import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import {
  AUTH_SESSION_COOKIE_NAME,
} from '@/core/auth/session';
import {
  verifyServerSession,
} from '@/core/auth/session-server';
import {
  getCommerceData,
  saveCart,
  saveFavoriteIds,
} from '@/core/data/commerce/commerce-repository';

interface CommercePatchBody {
  cart?: unknown;
  favoriteIds?: unknown;
}

async function authenticatedUid(): Promise<string | null> {
  const cookieStore = await cookies();

  const session =
    await verifyServerSession(
      cookieStore.get(
        AUTH_SESSION_COOKIE_NAME,
      )?.value,
    );

  return session?.uid ?? null;
}

export async function GET() {
  const uid = await authenticatedUid();

  if (!uid) {
    return NextResponse.json(
      {
        error:
          'Authentication required.',
      },
      {
        status: 401,
      },
    );
  }

  const commerce =
    await getCommerceData(uid);

  return NextResponse.json(commerce);
}

export async function PATCH(
  request: Request,
) {
  const uid = await authenticatedUid();

  if (!uid) {
    return NextResponse.json(
      {
        error:
          'Authentication required.',
      },
      {
        status: 401,
      },
    );
  }

  let body: CommercePatchBody;

  try {
    body =
      (await request.json()) as CommercePatchBody;
  } catch {
    return NextResponse.json(
      {
        error:
          'Invalid request body.',
      },
      {
        status: 400,
      },
    );
  }

  if (
    Object.prototype.hasOwnProperty.call(
      body,
      'cart',
    )
  ) {
    const cart =
      await saveCart(uid, body.cart);

    return NextResponse.json({
      cart,
    });
  }

  if (
    Object.prototype.hasOwnProperty.call(
      body,
      'favoriteIds',
    )
  ) {
    const favoriteIds =
      await saveFavoriteIds(
        uid,
        body.favoriteIds,
      );

    return NextResponse.json({
      favoriteIds,
    });
  }

  return NextResponse.json(
    {
      error:
        'Cart or favoriteIds data is required.',
    },
    {
      status: 400,
    },
  );
}
