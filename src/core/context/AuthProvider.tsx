'use client';

import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

import { mapFirebaseUserToAuthUser } from '../auth/firebase-auth';
import { AuthContext } from './AuthContext';
import { getFirebaseAuth } from '../lib/firebase/client';
import {
  clearAuthCookie,
  setAuthCookie,
} from '../lib/firebase/storage/auth-storage';
import type {
  AuthContextType,
  AuthUser,
  RegisterWithEmailParams,
} from '../types/auth';
import type { AddressData } from '../types/address';
import type { PasswordFormData } from '../types/password';
import type { UserData } from '../types/user-data';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserData | null>(null);
  const [address, setAddress] = useState<AddressData | null>(null);

  useEffect(() => {
    const auth = getFirebaseAuth();

    return onAuthStateChanged(
      auth,
      (firebaseUser) => {
        if (firebaseUser) {
          setUser(mapFirebaseUserToAuthUser(firebaseUser));
          setAuthCookie();
        } else {
          setUser(null);
          clearAuthCookie();
        }

        setLoading(false);
      },
      () => {
        setUser(null);
        clearAuthCookie();
        setLoading(false);
      },
    );
  }, []);

  const loginWithEmail = useCallback(
    async (email: string, password: string) => {
      setLoading(true);

      try {
        const credential = await signInWithEmailAndPassword(
          getFirebaseAuth(),
          email.trim(),
          password,
        );

        setUser(mapFirebaseUserToAuthUser(credential.user));
        setAuthCookie();
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const registerWithEmail = useCallback(
    async ({ name, email, password }: RegisterWithEmailParams) => {
      setLoading(true);

      try {
        const credential = await createUserWithEmailAndPassword(
          getFirebaseAuth(),
          email.trim(),
          password,
        );

        const normalizedName = name.trim();

        if (normalizedName) {
          await updateProfile(credential.user, {
            displayName: normalizedName,
          });
        }

        await credential.user.reload();

        const refreshedUser =
          getFirebaseAuth().currentUser ?? credential.user;

        setUser(mapFirebaseUserToAuthUser(refreshedUser));
        setAuthCookie();
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const loginWithGoogle = useCallback(async () => {
    setLoading(true);

    try {
      const credential = await signInWithPopup(
        getFirebaseAuth(),
        new GoogleAuthProvider(),
      );

      setUser(mapFirebaseUserToAuthUser(credential.user));
      setAuthCookie();
    } finally {
      setLoading(false);
    }
  }, []);

  const loginWithFacebook = useCallback(async () => {
    setLoading(true);

    try {
      const credential = await signInWithPopup(
        getFirebaseAuth(),
        new FacebookAuthProvider(),
      );

      setUser(mapFirebaseUserToAuthUser(credential.user));
      setAuthCookie();
    } finally {
      setLoading(false);
    }
  }, []);

  const loginWithAuth0 = useCallback(async () => {
    throw new Error(
      'Login com Auth0 ainda não está habilitado nesta etapa.',
    );
  }, []);

  const updateUserProfile = useCallback(async (data: UserData) => {
    setProfile(data);
  }, []);

  const updateAddress = useCallback(async (data: AddressData) => {
    setAddress(data);
  }, []);

  const changePassword = useCallback(
    async (_data: PasswordFormData) => {
      throw new Error(
        'Alteração de senha será habilitada na próxima etapa de autenticação.',
      );
    },
    [],
  );

  const logout = useCallback(async () => {
    setLoading(true);

    try {
      await signOut(getFirebaseAuth());
      setUser(null);
      clearAuthCookie();
    } finally {
      setLoading(false);
    }
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: Boolean(user),

    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    loginWithFacebook,
    loginWithAuth0,
    logout,

    profile,
    isLoadingProfile: loading,
    updateUserProfile,

    address,
    updateAddress,

    changePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
