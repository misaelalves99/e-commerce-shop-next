// src/core/types/user.ts

/**
 * Usuário mínimo para fluxo de login/registro com email/senha.
 * Esse model é usado principalmente em mocks / localStorage.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;

  /** Definido quando o usuário aceita termos / LGPD (mock) */
  acceptedTermsAt?: string; // ISO
}
