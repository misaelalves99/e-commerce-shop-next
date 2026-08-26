import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import {
  AUTH_SESSION_COOKIE_NAME,
} from '@/core/auth/session';
import { verifyServerSession } from '@/core/auth/session-server';
import {
  normalizeAddress,
  normalizeUserProfile,
} from '@/core/data/account/account-normalize';
import {
  getAccountData,
  saveAddress,
  saveUserProfile,
} from '@/core/data/account/account-repository';

interface UpdateAccountBody {
  profile?: unknown;
  address?: unknown;
}

async function authenticatedUid(): Promise<string | null> {
  const cookieStore =
    await cookies();

  const session =
    await verifyServerSession(
      cookieStore.get(
        AUTH_SESSION_COOKIE_NAME,
      )?.value,
    );

  return session?.uid ?? null;
}

export async function GET() {
  const uid =
    await authenticatedUid();

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

  const account =
    await getAccountData(uid);

  return NextResponse.json(
    account,
  );
}

export async function PATCH(
  request: Request,
) {
  const uid =
    await authenticatedUid();

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

  let body: UpdateAccountBody;

  try {
    body =
      (await request.json()) as
        UpdateAccountBody;
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

  if (body.profile !== undefined) {
    const profile =
      normalizeUserProfile(
        body.profile,
      );

    if (!profile) {
      return NextResponse.json(
        {
          error:
            'Invalid profile data.',
        },
        {
          status: 400,
        },
      );
    }

    const savedProfile =
      await saveUserProfile(
        uid,
        profile,
      );

    return NextResponse.json({
      profile: savedProfile,
    });
  }

  if (body.address !== undefined) {
    const address =
      normalizeAddress(
        body.address,
      );

    if (!address) {
      return NextResponse.json(
        {
          error:
            'Invalid address data.',
        },
        {
          status: 400,
        },
      );
    }

    const savedAddress =
      await saveAddress(
        uid,
        address,
      );

    return NextResponse.json({
      address: savedAddress,
    });
  }

  return NextResponse.json(
    {
      error:
        'Profile or address data is required.',
    },
    {
      status: 400,
    },
  );
}
