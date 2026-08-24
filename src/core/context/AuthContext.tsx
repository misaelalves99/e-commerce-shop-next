// src/core/context/AuthContext.tsx
'use client';

import {
  createContext,
  useContext,
} from 'react';
import type { AuthContextType } from '../types/auth';

// Context inicial com valor undefined para forçar uso dentro do provider
export const AuthContext = createContext<AuthContextType | undefined>(undefined);


/**
 * Hook interno de segurança usado em useAuth.
 */
export function useAuthContextInternal(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth deve ser usado dentro de um <AuthProvider>.');
  }
  return ctx;
}
