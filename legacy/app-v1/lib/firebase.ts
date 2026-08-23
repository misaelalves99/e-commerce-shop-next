// src/lib/firebase.ts
import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  type Auth,
} from "firebase/auth";

/**
 * 🔹 Configuração do Firebase (React 19 + Vite)
 * As variáveis vêm do arquivo `.env` com prefixo VITE_
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY!,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN!,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID!,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID!,
  appId: import.meta.env.VITE_FIREBASE_APP_ID!,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

/** Inicializa o Firebase App */
const app: FirebaseApp = initializeApp(firebaseConfig);

/** Inicializa o Auth */
const auth: Auth = getAuth(app);

/** Provedores de login social */
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

/** Exporta para uso em AuthProvider ou hooks */
export { app, auth, googleProvider, facebookProvider };
