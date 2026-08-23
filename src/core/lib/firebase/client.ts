// src/core/lib/firebase/client.ts
import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

/**
 * Configuração do Firebase usando variáveis de ambiente públicas.
 * Ajuste as variáveis no .env.local / .env.example:
 *
 * NEXT_PUBLIC_FIREBASE_API_KEY=
 * NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
 * NEXT_PUBLIC_FIREBASE_PROJECT_ID=
 * NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
 * NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
 * NEXT_PUBLIC_FIREBASE_APP_ID=
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let firebaseApp: FirebaseApp | null = null;

/**
 * Garante apenas uma instância do Firebase App (singleton).
 */
export function getFirebaseApp(): FirebaseApp {
  if (firebaseApp) return firebaseApp;

  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = getApp();
  }

  return firebaseApp;
}

/**
 * Retorna a instância de Auth.
 * Deve ser usada apenas no client (componentes com 'use client').
 */
export function getFirebaseAuth(): Auth {
  const app = getFirebaseApp();
  return getAuth(app);
}
