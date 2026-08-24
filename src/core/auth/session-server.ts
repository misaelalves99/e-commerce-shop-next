import 'server-only';

import type { DecodedIdToken } from 'firebase-admin/auth';

import { getFirebaseAdminAuth } from '@/core/lib/firebase/admin/firebase-admin';

export async function verifyServerSession(
  sessionCookie: string | undefined,
): Promise<DecodedIdToken | null> {
  if (!sessionCookie) {
    return null;
  }

  try {
    return await getFirebaseAdminAuth().verifySessionCookie(
      sessionCookie,
      true,
    );
  } catch {
    return null;
  }
}
