// src/core/lib/http/api-client.ts
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiClientOptions extends RequestInit {
  method?: HttpMethod;
  query?: Record<string, string | number | boolean | undefined>;
}

/**
 * Base URL da API. Pode apontar para:
 * - Backend próprio (ex: https://api.minhaloja.com)
 * - Rotas internas /api do Next
 * - Um mock (ex: https://dummyjson.com)
 */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ?? '';

function buildUrl(path: string, query?: ApiClientOptions['query']): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(API_BASE_URL + normalizedPath, 'http://dummy-base');

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined) return;
      url.searchParams.set(key, String(value));
    });
  }

  // Remove a base dummy e retorna apenas path + search
  return url.pathname + url.search;
}

/**
 * Wrapper genérico para fetch tipado.
 *
 * Exemplo:
 * const products = await apiClient<Product[]>('/api/products');
 */
export async function apiClient<TResponse>(
  path: string,
  options: ApiClientOptions = {}
): Promise<TResponse> {
  const { method = 'GET', query, headers, body, ...rest } = options;

  const url = buildUrl(path, query);

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(headers ?? {}),
    },
    body: body ? (typeof body === 'string' ? body : JSON.stringify(body)) : undefined,
    ...rest,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(
      `Erro na requisição: ${response.status} ${response.statusText} - ${text}`
    );
  }

  // Tenta parsear JSON, se não conseguir, retorna "as unknown as TResponse"
  try {
    const data = (await response.json()) as TResponse;
    return data;
  } catch {
    return undefined as unknown as TResponse;
  }
}
