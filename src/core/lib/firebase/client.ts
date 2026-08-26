// src/core/lib/firebase/client.ts
import {
  getApp,
  getApps,
  initializeApp,
  type FirebaseApp,
  type FirebaseOptions,
} from 'firebase/app';
import {
  getAuth,
  type Auth,
} from 'firebase/auth';

interface PublicFirebaseEnvironment {
  apiKey: string | undefined;
  authDomain: string | undefined;
  projectId: string | undefined;
  storageBucket: string | undefined;
  messagingSenderId: string | undefined;
  appId: string | undefined;
}

function requirePublicFirebaseValue(
  name: string,
  value: string | undefined,
): string {
  const normalized = value?.trim();

  if (!normalized) {
    throw new Error(
      `Missing required public Firebase configuration: ${name}`,
    );
  }

  return normalized;
}

function firebaseEnvironment():
  PublicFirebaseEnvironment {
  return {
    apiKey:
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain:
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId:
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket:
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId:
      process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
}

function firebaseOptions():
  FirebaseOptions {
  const env =
    firebaseEnvironment();

  return {
    apiKey:
      requirePublicFirebaseValue(
        'NEXT_PUBLIC_FIREBASE_API_KEY',
        env.apiKey,
      ),
    authDomain:
      requirePublicFirebaseValue(
        'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
        env.authDomain,
      ),
    projectId:
      requirePublicFirebaseValue(
        'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
        env.projectId,
      ),
    storageBucket:
      requirePublicFirebaseValue(
        'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
        env.storageBucket,
      ),
    messagingSenderId:
      requirePublicFirebaseValue(
        'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
        env.messagingSenderId,
      ),
    appId:
      requirePublicFirebaseValue(
        'NEXT_PUBLIC_FIREBASE_APP_ID',
        env.appId,
      ),
  };
}

let firebaseApp: FirebaseApp | null = null;

/**
 * Initializes exactly one Firebase client app.
 *
 * Configuration is validated only when Firebase is actually
 * requested, keeping unrelated build/runtime paths independent
 * while still producing an actionable configuration error.
 */
export function getFirebaseApp(): FirebaseApp {
  if (firebaseApp) {
    return firebaseApp;
  }

  if (!getApps().length) {
    firebaseApp =
      initializeApp(
        firebaseOptions(),
      );
  } else {
    firebaseApp = getApp();
  }

  return firebaseApp;
}

/**
 * Returns the browser Firebase Auth instance.
 */
export function getFirebaseAuth(): Auth {
  return getAuth(
    getFirebaseApp(),
  );
}
