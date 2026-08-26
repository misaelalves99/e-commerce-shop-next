// src/core/config/app-config.ts

export type CurrencyCode = 'BRL' | 'USD' | 'EUR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  locale: string;
  /**
   * Quantidade de casas decimais (ex: 2 para R$ 199,90)
   */
  fractionDigits: number;
}

export interface PaginationConfig {
  /**
   * Quantidade de itens por página na listagem de produtos.
   */
  productsPerPage: number;
  /**
   * Limite máximo de itens carregados em grids (ex: destaques).
   */
  maxGridItems: number;
}

export interface HomeSectionsConfig {
  showHeroBanner: boolean;
  showCategoryStrip: boolean;
  showDealsCarousel: boolean;
  showHighlightGrid: boolean;
}

export interface FeaturesConfig {
  enableFavorites: boolean;
  enableCart: boolean;
  enableCheckout: boolean;
  enableOrderHistory: boolean;
  enableAuthSocialLogin: boolean;
}

export interface BrandingConfig {
  storeName: string;
  storeShortName: string;
  tagline: string;
  baseUrl: string;
}

export interface AppConfig {
  branding: BrandingConfig;
  currency: CurrencyConfig;
  pagination: PaginationConfig;
  homeSections: HomeSectionsConfig;
  features: FeaturesConfig;
}

function resolvePublicSiteUrl(
  configuredUrl: string | undefined,
): string {
  const fallback =
    'http://localhost:3000';

  const value =
    configuredUrl?.trim() || fallback;

  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new Error(
      'NEXT_PUBLIC_SITE_URL must be a valid absolute URL.',
    );
  }

  if (
    url.protocol !== 'http:' &&
    url.protocol !== 'https:'
  ) {
    throw new Error(
      'NEXT_PUBLIC_SITE_URL must use http or https.',
    );
  }

  return url.origin;
}
export const APP_CONFIG: AppConfig = {
  branding: {
    storeName: 'E-Commerce Shop Next',
    storeShortName: 'ShopNext',
    tagline: 'Seu e-commerce moderno, rápido e seguro.',
    baseUrl: resolvePublicSiteUrl(
      process.env.NEXT_PUBLIC_SITE_URL,
    ),
  },
  currency: {
    code: 'BRL',
    symbol: 'R$',
    locale: 'pt-BR',
    fractionDigits: 2,
  },
  pagination: {
    productsPerPage: 12,
    maxGridItems: 8,
  },
  homeSections: {
    showHeroBanner: true,
    showCategoryStrip: true,
    showDealsCarousel: true,
    showHighlightGrid: true,
  },
  features: {
    enableFavorites: true,
    enableCart: true,
    enableCheckout: true,
    enableOrderHistory: true,
    enableAuthSocialLogin: true,
  },
};

/**
 * Helper para formatar preço de forma centralizada.
 */
export function formatPrice(value: number, config: CurrencyConfig = APP_CONFIG.currency): string {
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code,
    minimumFractionDigits: config.fractionDigits,
    maximumFractionDigits: config.fractionDigits,
  }).format(value);
}
