// src/core/context/AuthProvider.tsx
'use client';

import {
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { AuthContext } from './AuthContext';
import type {
  AuthUser,
  AuthContextType,
  RegisterWithEmailParams,
} from '../types/auth';
import type { UserData } from '../types/user-data';
import type { AddressData } from '../types/address';
import type { PasswordFormData } from '../types/password';

/**
 * Helpers simples para persistir usuÃ¡rio no localStorage.
 * Depois vocÃª pode trocar para Firebase/Auth0 sem mudar a API do contexto.
 */
const STORAGE_KEY = 'ecommerce_auth_user';

function loadUserFromStorage(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

function saveUserToStorage(user: AuthUser | null): void {
  if (typeof window === 'undefined') return;
  if (!user) {
    window.localStorage.removeItem(STORAGE_KEY);
    document.cookie = 'auth=; path=/; max-age=0';
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  // Cookie simples para o middleware proteger /account, /checkout, etc.
  document.cookie = 'auth=true; path=/; max-age=60*60*24*7';
}

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provider de autenticaÃ§Ã£o.
 * Hoje usa localStorage como mock, mas a API jÃ¡ estÃ¡ pronta para Firebase/Auth0.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserData | null>(null);
  const [address, setAddress] = useState<AddressData | null>(null);

  // Carrega usuÃ¡rio do storage na inicializaÃ§Ã£o
  useEffect(() => {
    const storedUser = loadUserFromStorage();
    setUser(storedUser);
    setLoading(false);
  }, []);

  const loginWithEmail = useCallback(async (email: string, _password: string) => {
    setLoading(true);
    try {
      // Aqui vocÃª pluga Firebase Auth ou Auth0.
      const mockUser: AuthUser = {
        id: `local-${email}`,
        name: email.split('@')[0] ?? 'UsuÃ¡rio',
        email,
        avatarUrl: undefined,
        provider: 'password',
      };

      setUser(mockUser);
      saveUserToStorage(mockUser);
    } finally {
      setLoading(false);
    }
  }, []);

  const registerWithEmail = useCallback(async ({ name, email, password: _password }: RegisterWithEmailParams) => {
    setLoading(true);
    try {
      // Registro mock. Em produÃ§Ã£o, use Firebase/Auth0 + backend.
      const mockUser: AuthUser = {
        id: `local-${email}`,
        name,
        email,
        avatarUrl: undefined,
        provider: 'password',
      };

      setUser(mockUser);
      saveUserToStorage(mockUser);
    } finally {
      setLoading(false);
    }
  }, []);

  const loginWithGoogle = useCallback(async () => {
    setLoading(true);
    try {
      // TODO: integrar com Firebase/Auth0 Google Sign-In
      const mockUser: AuthUser = {
        id: 'google-mock',
        name: 'UsuÃ¡rio Google',
        email: 'user-google@example.com',
        avatarUrl: undefined,
        provider: 'google',
      };

      setUser(mockUser);
      saveUserToStorage(mockUser);
    } finally {
      setLoading(false);
    }
  }, []);

  const loginWithFacebook = useCallback(async () => {
    setLoading(true);
    try {
      // TODO: integrar com Firebase/Auth0 Facebook Login
      const mockUser: AuthUser = {
        id: 'facebook-mock',
        name: 'UsuÃ¡rio Facebook',
        email: 'user-facebook@example.com',
        avatarUrl: undefined,
        provider: 'facebook',
      };

      setUser(mockUser);
      saveUserToStorage(mockUser);
    } finally {
      setLoading(false);
    }
  }, []);

  const loginWithAuth0 = useCallback(async () => {
    setLoading(true);
    try {
      const mockUser: AuthUser = {
        id: 'auth0-mock',
        name: 'Usuário Auth0',
        email: 'user-auth0@example.com',
        avatarUrl: undefined,
        provider: 'auth0',
      };

      setUser(mockUser);
      saveUserToStorage(mockUser);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUserProfile = useCallback(async (data: UserData) => {
    setProfile(data);
  }, []);

  const updateAddress = useCallback(async (data: AddressData) => {
    setAddress(data);
  }, []);

  const changePassword = useCallback(async (_data: PasswordFormData) => {
    // Fluxo demonstrativo: nenhuma credencial real é persistida.
    await Promise.resolve();
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      setUser(null);
      saveUserToStorage(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    loginWithFacebook,
    loginWithAuth0,

    profile,
    isLoadingProfile: loading,
    updateUserProfile,

    address,
    updateAddress,

    changePassword,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}





