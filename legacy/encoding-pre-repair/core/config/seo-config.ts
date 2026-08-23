// src/core/config/seo-config.ts

import { APP_CONFIG } from './app-config';
import { ROUTES } from './routes';

export interface SeoMeta {
  title: string;
  description: string;
  url?: string;
  image?: string;
  keywords?: string[];
}

export interface SeoConfig {
  default: SeoMeta;
  routes: {
    home: SeoMeta;
    catalog: SeoMeta;
    productDetail: (productName?: string) => SeoMeta;

    contact: SeoMeta;
    favorites: SeoMeta;

    cart: SeoMeta;
    checkout: SeoMeta;

    login: SeoMeta;
    register: SeoMeta;

    profile: SeoMeta;
    address: SeoMeta;
    security: SeoMeta;
    orders: SeoMeta;
  };
}

const base = APP_CONFIG.branding.baseUrl;
const store = APP_CONFIG.branding.storeShortName;

export const SEO_CONFIG: SeoConfig = {
  default: {
    title: `${APP_CONFIG.branding.storeName} | ${APP_CONFIG.branding.tagline}`,
    description:
      'Explore um e-commerce moderno com experiência fluida, catálogo completo, ofertas especiais e fluxo de compra otimizado para o usuário.',
    url: base + ROUTES.home,
    image: `${base}/og-image.png`,
    keywords: [
      'ecommerce',
      'loja virtual',
      'next.js',
      'react',
      'roupas',
      'calçados',
      'eletrônicos',
      'comprar online',
    ],
  },

  routes: {
    home: {
      title: `${store} | Ofertas de hoje e destaques`,
      description:
        'Encontre ofertas, categorias e produtos em destaque em uma experiência moderna de comércio eletrônico.',
      url: base + ROUTES.home,
      image: `${base}/og-home.png`,
      keywords: ['ofertas', 'promoções', 'destaques'],
    },

    catalog: {
      title: `${store} | Catálogo de produtos`,
      description:
        'Navegue por categorias, filtros e ordenação para encontrar produtos no catálogo.',
      url: base + ROUTES.catalog,
      image: `${base}/og-catalog.png`,
      keywords: ['catálogo', 'produtos', 'categorias', 'filtros'],
    },

    productDetail: (productName?: string): SeoMeta => ({
      title: productName
        ? `${productName} | ${store}`
        : `Detalhe do produto | ${store}`,
      description:
        'Consulte informações, imagens, avaliações e condições comerciais do produto.',
      image: `${base}/og-product.png`,
      keywords: ['produto', 'detalhes', 'avaliações'],
    }),

    contact: {
      title: `Contato | ${store}`,
      description:
        'Entre em contato para dúvidas, informações e suporte.',
      url: base + ROUTES.contact,
      image: `${base}/og-contact.png`,
      keywords: ['contato', 'suporte', 'atendimento'],
    },

    favorites: {
      title: `Favoritos | ${store}`,
      description:
        'Consulte os produtos salvos em sua lista de favoritos.',
      url: base + ROUTES.favorites,
      image: `${base}/og-favorites.png`,
      keywords: ['favoritos', 'produtos salvos'],
    },

    cart: {
      title: `Carrinho | ${store}`,
      description:
        'Revise produtos, quantidades e valores antes de continuar para o checkout.',
      url: base + ROUTES.cart,
      image: `${base}/og-cart.png`,
      keywords: ['carrinho', 'compras'],
    },

    checkout: {
      title: `Checkout | ${store}`,
      description:
        'Avance pelo fluxo demonstrativo de endereço, pagamento e revisão da compra.',
      url: base + ROUTES.checkout,
      image: `${base}/og-checkout.png`,
      keywords: ['checkout', 'endereço', 'revisão'],
    },

    login: {
      title: `Entrar | ${store}`,
      description:
        'Acesse a experiência demonstrativa de conta do e-commerce.',
      url: base + ROUTES.login,
      image: `${base}/og-auth.png`,
      keywords: ['login', 'entrar', 'conta'],
    },

    register: {
      title: `Criar conta | ${store}`,
      description:
        'Crie uma conta demonstrativa para acessar as áreas de usuário.',
      url: base + ROUTES.register,
      image: `${base}/og-auth.png`,
      keywords: ['cadastro', 'conta'],
    },

    profile: {
      title: `Meu perfil | ${store}`,
      description:
        'Consulte e gerencie os dados demonstrativos do perfil de usuário.',
      url: base + ROUTES.account.profile,
      image: `${base}/og-account.png`,
      keywords: ['perfil', 'minha conta'],
    },

    address: {
      title: `Endereço | ${store}`,
      description:
        'Consulte e edite os dados demonstrativos de endereço da conta.',
      url: base + ROUTES.account.address,
      image: `${base}/og-account.png`,
      keywords: ['endereço', 'conta'],
    },

    security: {
      title: `Segurança | ${store}`,
      description:
        'Acesse as configurações demonstrativas relacionadas à segurança da conta.',
      url: base + ROUTES.account.security,
      image: `${base}/og-account.png`,
      keywords: ['segurança', 'senha', 'conta'],
    },

    orders: {
      title: `Pedidos | ${store}`,
      description:
        'Consulte a experiência demonstrativa de histórico de pedidos.',
      url: base + ROUTES.account.orders,
      image: `${base}/og-account.png`,
      keywords: ['pedidos', 'histórico', 'conta'],
    },
  },
};
