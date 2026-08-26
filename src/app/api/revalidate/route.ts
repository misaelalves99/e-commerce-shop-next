// src/app/api/revalidate/route.ts

import {
  revalidatePath,
  revalidateTag,
} from 'next/cache';
import {
  NextRequest,
  NextResponse,
} from 'next/server';

import { APP_CONFIG } from '@/core/config/app-config';

interface RevalidateBody {
  path?: string;
  tag?: string;
}

const REVALIDATE_SECRET_HEADER =
  'x-revalidate-secret';

function configuredSecret():
  string | null {
  const value =
    process.env.REVALIDATE_SECRET?.trim();

  return value || null;
}

export async function POST(
  request: NextRequest,
) {
  const expectedSecret =
    configuredSecret();

  if (!expectedSecret) {
    return NextResponse.json(
      {
        ok: false,
        message:
          'Revalidation is not configured.',
      },
      {
        status: 503,
      },
    );
  }

  const suppliedSecret =
    request.headers.get(
      REVALIDATE_SECRET_HEADER,
    );

  if (
    !suppliedSecret ||
    suppliedSecret !== expectedSecret
  ) {
    return NextResponse.json(
      {
        ok: false,
        message:
          'Unauthorized revalidation.',
      },
      {
        status: 401,
      },
    );
  }

  let body: RevalidateBody;

  try {
    body =
      (await request.json()) as RevalidateBody;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message:
          'Invalid request body.',
      },
      {
        status: 400,
      },
    );
  }

  if (
    typeof body.tag === 'string' &&
    body.tag.trim()
  ) {
    const tag =
      body.tag.trim();

    revalidateTag(
      tag,
      'max',
    );

    return NextResponse.json({
      ok: true,
      type: 'tag',
      target: tag,
      store:
        APP_CONFIG.branding.storeName,
    });
  }

  const path =
    typeof body.path === 'string' &&
    body.path.startsWith('/')
      ? body.path
      : '/';

  revalidatePath(path);

  return NextResponse.json({
    ok: true,
    type: 'path',
    target: path,
    store:
      APP_CONFIG.branding.storeName,
  });
}
