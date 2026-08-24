'use client';

import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  updateProfile,
} from 'firebase/auth';

import { mapFirebaseUserToAuthUser } from '../auth/firebase-auth';
import { AuthContext } from './AuthContext';
import { getFirebaseAuth } from '../lib/firebase/client';
import {
  createServerSession,
  deleteServerSession,
} from '../auth/session-client';
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
        } else {
          setUser(null);
        }

        setLoading(false);
      },
      () => {
        setUser(null);
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

        await createServerSession(credential.user);

        setUser(mapFirebaseUserToAuthUser(credential.user));
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

        await createServerSession(refreshedUser);

        setUser(mapFirebaseUserToAuthUser(refreshedUser));
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

      await createServerSession(credential.user);

      setUser(mapFirebaseUserToAuthUser(credential.user));
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

      await createServerSession(credential.user);

      setUser(mapFirebaseUserToAuthUser(credential.user));
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
    async ({
      currentPassword,
      newPassword,
      confirmPassword,
    }: PasswordFormData) => {
      if (newPassword !== confirmPassword) {
        throw new Error('A confirmação da nova senha não coincide.');
      }

      const auth = getFirebaseAuth();
      const firebaseUser = auth.currentUser;

      if (!firebaseUser) {
        throw new Error(
          'Sua sessão expirou. Entre novamente antes de alterar a senha.',
        );
      }

      const hasPasswordProvider = firebaseUser.providerData.some(
        ({ providerId }) => providerId === 'password',
      );

      if (!hasPasswordProvider || !firebaseUser.email) {
        throw new Error(
          'Esta conta usa um provedor externo. Gerencie a senha no provedor de login.',
        );
      }

      const credential = EmailAuthProvider.credential(
        firebaseUser.email,
        currentPassword,
      );

      try {
        await reauthenticateWithCredential(
          firebaseUser,
          credential,
        );

        await updatePassword(
          firebaseUser,
          newPassword,
        );
      } catch (error: unknown) {
        const code =
          typeof error === 'object' &&
          error !== null &&
          'code' in error &&
          typeof error.code === 'string'
            ? error.code
            : null;

        if (
          code === 'auth/invalid-credential' ||
          code === 'auth/wrong-password'
        ) {
          throw new Error('A senha atual está incorreta.');
        }

        if (code === 'auth/weak-password') {
          throw new Error(
            'A nova senha não atende aos requisitos de segurança.',
          );
        }

        if (code === 'auth/too-many-requests') {
          throw new Error(
            'Muitas tentativas foram realizadas. Aguarde alguns minutos e tente novamente.',
          );
        }

        if (code === 'auth/requires-recent-login') {
          throw new Error(
            'Por segurança, entre novamente na conta antes de alterar a senha.',
          );
        }

        throw error;
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    setLoading(true);

    try {
      await deleteServerSession();
      await signOut(getFirebaseAuth());
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);
  const reconcileInvalidSession = useCallback(
    async () => {
      await signOut(getFirebaseAuth());
      setUser(null);
    },
    [],
  );

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
    reconcileInvalidSession,
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
