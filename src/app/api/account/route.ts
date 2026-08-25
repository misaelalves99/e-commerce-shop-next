import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import {
  AUTH_SESSION_COOKIE_NAME,
} from '@/core/auth/session';
import { verifyServerSession } from '@/core/auth/session-server';
import {
  getAccountData,
  saveAddress,
  saveUserProfile,
} from '@/core/data/account/account-repository';
import type { AddressData } from '@/core/types/address';
import type { UserData } from '@/core/types/user-data';

interface UpdateAccountBody {
  profile?: UserData;
  address?: AddressData;
}

async function authenticatedUid(): Promise<string | null> {
  const cookieStore = await cookies();

  const session = await verifyServerSession(
    cookieStore.get(AUTH_SESSION_COOKIE_NAME)?.value,
  );

  return session?.uid ?? null;
}

export async function GET() {
  const uid = await authenticatedUid();

  if (!uid) {
    return NextResponse.json(
      {
        error: 'Authentication required.',
      },
      {
        status: 401,
      },
    );
  }

  const account = await getAccountData(uid);

  return NextResponse.json(account);
}

export async function PATCH(request: Request) {
  const uid = await authenticatedUid();

  if (!uid) {
    return NextResponse.json(
      {
        error: 'Authentication required.',
      },
      {
        status: 401,
      },
    );
  }

  let body: UpdateAccountBody;

  try {
    body = (await request.json()) as UpdateAccountBody;
  } catch {
    return NextResponse.json(
      {
        error: 'Invalid request body.',
      },
      {
        status: 400,
      },
    );
  }

  if (body.profile) {
    const profile = await saveUserProfile(
      uid,
      body.profile,
    );

    return NextResponse.json({
      profile,
    });
  }

  if (body.address) {
    const address = await saveAddress(
      uid,
      body.address,
    );

    return NextResponse.json({
      address,
    });
  }

  return NextResponse.json(
    {
      error: 'Profile or address data is required.',
    },
    {
      status: 400,
    },
  );
}
