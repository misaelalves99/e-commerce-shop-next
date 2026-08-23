// src/app/(account)/profile/page.tsx

import type { Metadata } from 'next';

import { SEO_CONFIG } from '@/core/config/seo-config';
import { APP_CONFIG } from '@/core/config/app-config';
import ProfilePage from '@/features/account/pages/ProfilePage';

export const metadata: Metadata = {
  title: SEO_CONFIG.routes.profile.title,
  description: SEO_CONFIG.routes.profile.description,
  openGraph: {
    title: SEO_CONFIG.routes.profile.title,
    description: SEO_CONFIG.routes.profile.description,
    url: SEO_CONFIG.routes.profile.url,
    images: SEO_CONFIG.routes.profile.image
      ? [{ url: SEO_CONFIG.routes.profile.image }]
      : undefined,
    siteName: APP_CONFIG.branding.storeName,
  },
};

export default function ProfileRoutePage() {
  return (
    <main className="page-container">
      <ProfilePage />
    </main>
  );
}
