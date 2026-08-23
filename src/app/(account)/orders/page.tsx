// src/app/(account)/orders/page.tsx

import type { Metadata } from 'next';

import { SEO_CONFIG } from '@/core/config/seo-config';
import { APP_CONFIG } from '@/core/config/app-config';
import OrdersPage from '@/features/account/pages/OrdersPage';

export const metadata: Metadata = {
  title: SEO_CONFIG.routes.orders.title,
  description: SEO_CONFIG.routes.orders.description,
  openGraph: {
    title: SEO_CONFIG.routes.orders.title,
    description: SEO_CONFIG.routes.orders.description,
    url: SEO_CONFIG.routes.orders.url,
    images: SEO_CONFIG.routes.orders.image
      ? [{ url: SEO_CONFIG.routes.orders.image }]
      : undefined,
    siteName: APP_CONFIG.branding.storeName,
  },
};

export default function OrdersRoutePage() {
  return (
    <main className="page-container">
      <OrdersPage />
    </main>
  );
}
