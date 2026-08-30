// src/app/(cart)/cart/page.tsx

import type { Metadata } from 'next';

import { SEO_CONFIG } from '@/core/config/seo-config';
import { APP_CONFIG } from '@/core/config/app-config';

import CartPage from '@/features/cart/pages/CartPage';

export const metadata: Metadata = {
  title: SEO_CONFIG.routes.cart.title,
  description: SEO_CONFIG.routes.cart.description,
  openGraph: {
    title: SEO_CONFIG.routes.cart.title,
    description: SEO_CONFIG.routes.cart.description,
    url: SEO_CONFIG.routes.cart.url,
    images: SEO_CONFIG.routes.cart.image ? [{ url: SEO_CONFIG.routes.cart.image }] : undefined,
    siteName: APP_CONFIG.branding.storeName,
  },
};

export default function CartRoutePage() {
  return (
    <div className="page-container">
      <CartPage />
    </div>
  );
}
