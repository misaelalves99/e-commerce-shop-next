import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import {
  AUTH_SESSION_COOKIE_NAME,
} from '@/core/auth/session';
import {
  verifyServerSession,
} from '@/core/auth/session-server';
import {
  createOrderDraft,
  normalizeCreateOrderInput,
  OrderValidationError,
} from '@/core/domain/order/order-service';
import {
  createOrder,
  listOrders,
} from '@/core/data/order/order-repository';

async function authenticatedUid():
  Promise<string | null> {
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

  const orders =
    await listOrders(uid);

  return NextResponse.json({
    orders,
  });
}

export async function POST(
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

  let body: unknown;

  try {
    body =
      await request.json();
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

  const input =
    normalizeCreateOrderInput(
      body,
    );

  if (!input) {
    return NextResponse.json(
      {
        error:
          'Invalid order data.',
      },
      {
        status: 400,
      },
    );
  }

  try {
    const draft =
      createOrderDraft(input);

    const order =
      await createOrder(
        uid,
        draft,
      );

    return NextResponse.json(
      {
        order,
      },
      {
        status: 201,
      },
    );
  } catch (error: unknown) {
    if (
      error instanceof
        OrderValidationError
    ) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 400,
        },
      );
    }

    throw error;
  }
}
