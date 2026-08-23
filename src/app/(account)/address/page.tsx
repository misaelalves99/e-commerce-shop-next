// src/app/(account)/address/page.tsx

import type { Metadata } from 'next';

import { SEO_CONFIG } from '@/core/config/seo-config';
import { APP_CONFIG } from '@/core/config/app-config';
import AddressPage from '@/features/account/pages/AddressPage';

export const metadata: Metadata = {
  title: SEO_CONFIG.routes.address.title,
  description: SEO_CONFIG.routes.address.description,
  openGraph: {
    title: SEO_CONFIG.routes.address.title,
    description: SEO_CONFIG.routes.address.description,
    url: SEO_CONFIG.routes.address.url,
    images: SEO_CONFIG.routes.address.image
      ? [{ url: SEO_CONFIG.routes.address.image }]
      : undefined,
    siteName: APP_CONFIG.branding.storeName,
  },
};

export default function AddressRoutePage() {
  return (
    <main className="page-container">
      <AddressPage />
    </main>
  );
}
