import 'server-only';

import {
  cert,
  getApps,
  initializeApp,
  type App,
} from 'firebase-admin/app';
import {
  getAuth,
  type Auth,
} from 'firebase-admin/auth';
import {
  getFirestore,
  type Firestore,
} from 'firebase-admin/firestore';

function requireServerEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Missing required server environment variable: ${name}`,
    );
  }

  return value;
}

function getFirebaseAdminApp(): App {
  const existingApp = getApps()[0];

  if (existingApp) {
    return existingApp;
  }

  const projectId = requireServerEnv(
    'FIREBASE_ADMIN_PROJECT_ID',
  );

  const clientEmail = requireServerEnv(
    'FIREBASE_ADMIN_CLIENT_EMAIL',
  );

  const privateKey = requireServerEnv(
    'FIREBASE_ADMIN_PRIVATE_KEY',
  ).replace(/\\n/g, '\n');

  return initializeApp({
    projectId,
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

export function getFirebaseAdminAuth(): Auth {
  return getAuth(getFirebaseAdminApp());
}
export function getFirebaseAdminFirestore(): Firestore {
  return getFirestore(getFirebaseAdminApp());
}
