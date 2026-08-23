// src/app/(auth)/login/page.tsx

import { Suspense } from 'react';
import type { Metadata } from 'next';

import { SEO_CONFIG } from '@/core/config/seo-config';
import { APP_CONFIG } from '@/core/config/app-config';
import LoginPage from '@/features/auth/pages/LoginPage';

export const metadata: Metadata = {
  title: SEO_CONFIG.routes.login.title,
  description: SEO_CONFIG.routes.login.description,
  openGraph: {
    title: SEO_CONFIG.routes.login.title,
    description: SEO_CONFIG.routes.login.description,
    url: SEO_CONFIG.routes.login.url,
    images: SEO_CONFIG.routes.login.image
      ? [{ url: SEO_CONFIG.routes.login.image }]
      : undefined,
    siteName: APP_CONFIG.branding.storeName,
  },
};

function LoginFallback() {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      style={{
        minHeight: '40vh',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      Carregando login...
    </div>
  );
}

export default function LoginRoutePage() {
  return (
    <main className="page-container">
      <Suspense fallback={<LoginFallback />}>
        <LoginPage />
      </Suspense>
    </main>
  );
}
