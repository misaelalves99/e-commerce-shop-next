// src/app/(auth)/register/page.tsx

import { Suspense } from 'react';
import type { Metadata } from 'next';

import { SEO_CONFIG } from '@/core/config/seo-config';
import { APP_CONFIG } from '@/core/config/app-config';
import { RequireGuest } from '@/core/auth/auth-guards';
import RegisterPage from '@/features/auth/pages/RegisterPage';

export const metadata: Metadata = {
  title: SEO_CONFIG.routes.register.title,
  description: SEO_CONFIG.routes.register.description,
  openGraph: {
    title: SEO_CONFIG.routes.register.title,
    description: SEO_CONFIG.routes.register.description,
    url: SEO_CONFIG.routes.register.url,
    images: SEO_CONFIG.routes.register.image
      ? [{ url: SEO_CONFIG.routes.register.image }]
      : undefined,
    siteName: APP_CONFIG.branding.storeName,
  },
};

export default function RegisterRoutePage() {
  return (
    <div className="page-container">
      <Suspense fallback={null}>
        <RequireGuest>
          <RegisterPage />
        </RequireGuest>
      </Suspense>
    </div>
  );
}
