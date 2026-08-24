// src/core/auth/auth-utils.ts
import type { AuthUser } from '../types/auth';

/**
 * Tipos "like" mínimos para evitar dependência direta de libs aqui.
 * Você pode substituir por `import type { User as FirebaseUser } from 'firebase/auth'`
 * e tipos do Auth0 quando integrar de fato.
 */
interface Auth0UserLike {
  sub?: string;
  name?: string;
  email?: string;
  picture?: string;
}

/**
 * Mapeia um usuário do Auth0 (ou OIDC similar) para AuthUser.
 */
export function mapAuth0UserToAuthUser(user: Auth0UserLike): AuthUser {
  return {
    id: user.sub ?? user.email ?? 'auth0-user',
    name: user.name ?? user.email ?? 'Usuário',
    email: user.email ?? '',
    avatarUrl: user.picture ?? undefined,
    provider: 'auth0',
  };
}

/**
 * Gera iniciais do usuário (para avatar fallback).
 */
export function getUserInitials(nameOrEmail?: string | null): string {
  if (!nameOrEmail) return 'U';
  const trimmed = nameOrEmail.trim();
  if (!trimmed) return 'U';

  const parts = trimmed.split(' ');
  if (parts.length === 1) {
    // Talvez seja email
    const [userPart] = trimmed.split('@');
    if (!userPart) return trimmed[0]?.toUpperCase() ?? 'U';
    return userPart.slice(0, 2).toUpperCase();
  }

  const first = parts[0]?.[0];
  const last = parts[parts.length - 1]?.[0];

  return `${first ?? ''}${last ?? ''}`.toUpperCase();
}
