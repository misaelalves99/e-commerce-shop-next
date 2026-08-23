// src/app/api/revalidate/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { APP_CONFIG } from '@/core/config/app-config';

type RevalidateBody = {
  path?: string;
  tag?: string;
};

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

export async function POST(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get('secret');

    if (!REVALIDATE_SECRET || secret !== REVALIDATE_SECRET) {
      return NextResponse.json(
        { ok: false, message: 'Unauthorized revalidation' },
        { status: 401 },
      );
    }

    const body = (await req.json()) as RevalidateBody | null;

    if (body?.tag) {
      revalidateTag(body.tag, 'max');
      return NextResponse.json({
        ok: true,
        type: 'tag',
        target: body.tag,
        store: APP_CONFIG.branding.storeName,
      });
    }

    const path = body?.path || '/';

    revalidatePath(path);
    return NextResponse.json({
      ok: true,
      type: 'path',
      target: path,
      store: APP_CONFIG.branding.storeName,
    });
  } catch (error) {
    console.error('[REVALIDATE_ERROR]', error);
    return NextResponse.json(
      { ok: false, message: 'Internal error while revalidating' },
      { status: 500 },
    );
  }
}
