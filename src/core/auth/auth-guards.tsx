'use client';

import { useEffect, type ReactNode } from 'react';
import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import { resolveAppRoute, type AppRoute } from '../config/routes';
import { useAuth } from '../hooks/useAuth';

interface RequireAuthProps {
  children: ReactNode;
  redirectTo?: AppRoute;
}

export function RequireAuth({
  children,
  redirectTo = '/login',
}: RequireAuthProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }

    const search = pathname
      ? `?redirectTo=${encodeURIComponent(pathname)}`
      : '';

    router.replace(
      resolveAppRoute(
        `${redirectTo}${search}`,
        redirectTo,
      ),
    );
  }, [
    isAuthenticated,
    loading,
    pathname,
    redirectTo,
    router,
  ]);

  if (loading) {
    return (
      <div
        className="page-container"
        style={{ minHeight: '60vh' }}
      >
        <p className="text-muted">
          Carregando sua sessão...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

interface RequireGuestProps {
  children: ReactNode;
  redirectTo?: AppRoute;
}

export function RequireGuest({
  children,
  redirectTo = '/',
}: RequireGuestProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    loading,
    isAuthenticated,
    reconcileInvalidSession,
  } = useAuth();

  const sessionInvalid =
    searchParams.get('sessionInvalid') === '1';

  useEffect(() => {
    if (
      loading ||
      !isAuthenticated ||
      sessionInvalid
    ) {
      return;
    }

    router.replace(redirectTo);
  }, [
    isAuthenticated,
    loading,
    redirectTo,
    router,
    sessionInvalid,
  ]);

  useEffect(() => {
    if (
      loading ||
      !sessionInvalid
    ) {
      return;
    }

    void reconcileInvalidSession();
  }, [
    loading,
    reconcileInvalidSession,
    sessionInvalid,
  ]);

  if (loading) {
    return (
      <div
        className="page-container"
        style={{ minHeight: '60vh' }}
      >
        <p className="text-muted">Carregando...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
