// src/lib/firebase.ts

import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, type Auth } from "firebase/auth";

// Configuração do Firebase usando variáveis de ambiente do Next.js
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// Inicializa o Firebase App
const app: FirebaseApp = initializeApp(firebaseConfig);

// Inicializa o Auth
const auth: Auth = getAuth(app);

// Provedores de login social
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Exporta para uso em AuthProvider ou hooks
export { app, auth, googleProvider, facebookProvider };
