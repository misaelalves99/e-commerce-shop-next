// src/core/types/auth.ts

import type { UserData } from './user-data';
import type { AddressData } from './address';
import type { PasswordFormData } from './password';

export type AuthProviderId =
  | 'password'
  | 'credentials'
  | 'google'
  | 'facebook'
  | 'auth0'
  | 'firebase';

export type AuthStatus =
  | 'idle'
  | 'loading'
  | 'authenticated'
  | 'unauthenticated';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  provider: AuthProviderId;
  createdAt?: string;
  emailVerified?: boolean;
}

export interface RegisterWithEmailParams {
  name: string;
  email: string;
  password: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  serverSessionReady: boolean;

  loginWithEmail: (
    email: string,
    password: string,
  ) => Promise<void>;

  registerWithEmail: (
    params: RegisterWithEmailParams,
  ) => Promise<void>;

  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  loginWithAuth0: () => Promise<void>;

  logout: () => Promise<void>;
  reconcileInvalidSession: () => Promise<void>;

  profile: UserData | null;
  isLoadingProfile: boolean;
  updateUserProfile: (data: UserData) => Promise<void>;

  address: AddressData | null;
  updateAddress: (data: AddressData) => Promise<void>;

  changePassword: (data: PasswordFormData) => Promise<void>;
}
