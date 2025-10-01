"use client";

import React, { useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext, AuthUser } from "./AuthContext";
import { auth, googleProvider, facebookProvider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuth0, Auth0Provider } from "@auth0/auth0-react";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const router = useRouter();

  // Auth0 hook
  const { loginWithRedirect, user: auth0User } = useAuth0();

  // Sincroniza usuário Auth0
  useEffect(() => {
    if (auth0User) {
      setUser({
        id: auth0User.sub || "",
        name: auth0User.name || "Usuário",
        email: auth0User.email || "",
        avatarUrl: auth0User.picture,
        provider: "auth0",
      });
    }
  }, [auth0User]);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      setUser({
        id: firebaseUser.uid,
        name: firebaseUser.displayName || "Usuário",
        email: firebaseUser.email || "",
        avatarUrl: firebaseUser.photoURL || "",
        provider: "firebase",
      });
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Erro ao fazer login com Google.");
    }
  };

  const loginWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const firebaseUser = result.user;
      setUser({
        id: firebaseUser.uid,
        name: firebaseUser.displayName || "Usuário",
        email: firebaseUser.email || "",
        avatarUrl: firebaseUser.photoURL || "",
        provider: "firebase",
      });
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Erro ao fazer login com Facebook.");
    }
  };

  const loginWithAuth0 = () => loginWithRedirect();

  const logout = () => {
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, loginWithFacebook, loginWithAuth0, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Wrapper Auth0 para colocar no _app.tsx ou layout
export const Auth0ProviderWrapper = ({ children }: { children: React.ReactNode }) => (
  <Auth0Provider
    domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
    clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
    authorizationParams={{ redirect_uri: typeof window !== "undefined" ? window.location.origin : "" }}
  >
    {children}
  </Auth0Provider>
);
