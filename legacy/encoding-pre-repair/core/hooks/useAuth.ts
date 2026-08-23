// src/core/hooks/useAuth.ts
'use client';

import { useAuthContextInternal } from '../context/AuthContext';

/**
 * Hook público para consumir o contexto de autenticação.
 * Exemplo de uso:
 * const { user, loginWithEmail, logout } = useAuth();
 */
export function useAuth() {
  return useAuthContextInternal();
}
