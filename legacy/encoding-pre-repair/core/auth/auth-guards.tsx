// src/core/auth/auth-guards.tsx
'use client';

import type { ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { useAuth } from '../hooks/useAuth';
import { resolveAppRoute, type AppRoute } from '../config/routes';
import { hasAuthCookie, setAuthCookie, clearAuthCookie } from '../lib/firebase/storage/auth-storage';

/**
 * Guard para pÃ¡ginas que exigem usuÃ¡rio autenticado.
 * Exemplo de uso:
 *
 * <RequireAuth>
 *   <ProfilePage />
 * </RequireAuth>
 */
interface RequireAuthProps {
  children: ReactNode;
  redirectTo?: AppRoute;
}

export function RequireAuth({ children, redirectTo = '/login' }: RequireAuthProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { loading, isAuthenticated } = useAuth();

  // sincroniza cookie com estado de auth (para o middleware)
  if (!loading) {
    if (isAuthenticated && !hasAuthCookie()) {
      setAuthCookie();
    }
    if (!isAuthenticated && hasAuthCookie()) {
      clearAuthCookie();
    }
  }

  if (loading) {
    return (
      <div className="page-container" style={{ minHeight: '60vh' }}>
        <p className="text-muted">Carregando sua sessÃ£o...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // MantÃ©m um redirect para voltar depois do login
    const search = pathname ? `?redirect=${encodeURIComponent(pathname)}` : '';
    router.push(resolveAppRoute(`${redirectTo}${search}`, redirectTo));
    return null;
  }

  return <>{children}</>;
}

/**
 * Guard para pÃ¡ginas que sÃ³ devem ser acessadas por convidados (nÃ£o logados),
 * como /login e /register.
 */
interface RequireGuestProps {
  children: ReactNode;
  redirectTo?: AppRoute;
}

export function RequireGuest({ children, redirectTo = '/' }: RequireGuestProps) {
  const router = useRouter();
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="page-container" style={{ minHeight: '60vh' }}>
        <p className="text-muted">Carregando...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    router.replace(redirectTo);
    return null;
  }

  return <>{children}</>;
}


