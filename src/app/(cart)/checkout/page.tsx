// src/app/(cart)/checkout/page.tsx

import type { Metadata } from 'next';

import { SEO_CONFIG } from '@/core/config/seo-config';
import { APP_CONFIG } from '@/core/config/app-config';

import CheckoutPage from '@/features/checkout/pages/CheckoutPage';

export const metadata: Metadata = {
  title: SEO_CONFIG.routes.checkout.title,
  description: SEO_CONFIG.routes.checkout.description,
  openGraph: {
    title: SEO_CONFIG.routes.checkout.title,
    description: SEO_CONFIG.routes.checkout.description,
    url: SEO_CONFIG.routes.checkout.url,
    images: SEO_CONFIG.routes.checkout.image
      ? [{ url: SEO_CONFIG.routes.checkout.image }]
      : undefined,
    siteName: APP_CONFIG.branding.storeName,
  },
};

export default function CheckoutRoutePage() {
  return (
    <main className="page-container">
      <CheckoutPage />
    </main>
  );
}
