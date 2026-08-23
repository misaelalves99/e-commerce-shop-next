// src/app/(account)/security/page.tsx

import type { Metadata } from 'next';

import { SEO_CONFIG } from '@/core/config/seo-config';
import { APP_CONFIG } from '@/core/config/app-config';
import SecurityPage from '@/features/account/pages/SecurityPage';

export const metadata: Metadata = {
  title: SEO_CONFIG.routes.security.title,
  description: SEO_CONFIG.routes.security.description,
  openGraph: {
    title: SEO_CONFIG.routes.security.title,
    description: SEO_CONFIG.routes.security.description,
    url: SEO_CONFIG.routes.security.url,
    images: SEO_CONFIG.routes.security.image
      ? [{ url: SEO_CONFIG.routes.security.image }]
      : undefined,
    siteName: APP_CONFIG.branding.storeName,
  },
};

export default function SecurityRoutePage() {
  return (
    <main className="page-container">
      <SecurityPage />
    </main>
  );
}
