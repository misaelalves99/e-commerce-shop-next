import type { User } from 'firebase/auth';

import type { AuthProviderId, AuthUser } from '@/core/types/auth';

function resolveProvider(user: User): AuthProviderId {
  const providerId = user.providerData[0]?.providerId;

  switch (providerId) {
    case 'password':
      return 'password';
    case 'google.com':
      return 'google';
    case 'facebook.com':
      return 'facebook';
    default:
      return 'firebase';
  }
}

export function mapFirebaseUserToAuthUser(user: User): AuthUser {
  return {
    id: user.uid,
    name:
      user.displayName?.trim() ||
      user.email?.split('@')[0] ||
      'Usuário',
    email: user.email ?? '',
    avatarUrl: user.photoURL ?? undefined,
    provider: resolveProvider(user),
    createdAt: user.metadata.creationTime,
    emailVerified: user.emailVerified,
  };
}
