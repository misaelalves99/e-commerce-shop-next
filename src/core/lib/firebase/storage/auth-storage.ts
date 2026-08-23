// src/core/lib/storage/auth-storage.ts
/**
 * Utilitários para lidar com autenticação em storage/cookies.
 * O objetivo é ter um ponto único para leitura/escrita do cookie "auth"
 * que o middleware usa para proteger /account, /checkout, etc.
 */

const AUTH_COOKIE_NAME = 'auth';

/**
 * Define o cookie de autenticação.
 * maxAge em segundos (por padrão, 7 dias).
 */
export function setAuthCookie(maxAgeSeconds = 60 * 60 * 24 * 7): void {
  if (typeof document === 'undefined') return;

  document.cookie = `${AUTH_COOKIE_NAME}=true; path=/; max-age=${maxAgeSeconds}`;
}

/**
 * Remove o cookie de autenticação.
 */
export function clearAuthCookie(): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0`;
}

/**
 * Verifica se o cookie de autenticação existe no client.
 */
export function hasAuthCookie(): boolean {
  if (typeof document === 'undefined') return false;

  return document.cookie
    .split(';')
    .map((part) => part.trim())
    .some((cookie) => cookie.startsWith(`${AUTH_COOKIE_NAME}=`));
}

/**
 * Retorna o valor cru do cookie de autenticação (se existir).
 */
export function getAuthCookieValue(): string | null {
  if (typeof document === 'undefined') return null;

  const cookie = document.cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${AUTH_COOKIE_NAME}=`));

  if (!cookie) return null;

  const [, value] = cookie.split('=');
  return value ?? null;
}
