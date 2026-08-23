// src/core/context/AuthContext.tsx
'use client';

import {
  createContext,
  useContext,
  type ReactNode,
} from 'react';
import type { AuthContextType } from '../types/auth';

// Context inicial com valor undefined para forçar uso dentro do provider
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

// Esse componente é implementado em AuthProvider.tsx
// Aqui deixamos apenas a tipagem do contexto centralizada.
export function AuthContextProvider({ children }: AuthContextProviderProps) {
  throw new Error(
    'AuthContextProvider deve ser implementado em AuthProvider.tsx e usado no layout root.'
  );
}

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
