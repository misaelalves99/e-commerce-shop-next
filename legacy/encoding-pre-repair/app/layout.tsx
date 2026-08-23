// src/app/layout.tsx

import type { ReactNode } from 'react';
import type { Metadata } from 'next';

import './globals.css';
import './styles/typography.css';
import './styles/forms.css';
import './styles/utilities.css';

import { APP_CONFIG } from '@/core/config/app-config';
import { SEO_CONFIG } from '@/core/config/seo-config';

import { AuthProvider } from '@/core/context/AuthProvider';
import { CartProvider } from '@/core/context/CartContext';
import { FavoritesProvider } from '@/core/context/FavoritesContext';

import MainShell from '@/shared/layout/MainShell/MainShell';

export const metadata: Metadata = {
  title: SEO_CONFIG.default.title,
  description: SEO_CONFIG.default.description,
  metadataBase: new URL(APP_CONFIG.branding.baseUrl),
  openGraph: {
    title: SEO_CONFIG.default.title,
    description: SEO_CONFIG.default.description,
    url: SEO_CONFIG.default.url,
    images: SEO_CONFIG.default.image ? [{ url: SEO_CONFIG.default.image }] : undefined,
    siteName: APP_CONFIG.branding.storeName,
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_CONFIG.default.title,
    description: SEO_CONFIG.default.description,
    images: SEO_CONFIG.default.image ? [SEO_CONFIG.default.image] : undefined,
  },
};

/**
 * Wrapper de Auth0.
 * Aqui deixamos como stub para não depender de libs externas:
 * se quiser integrar Auth0 de verdade, é só trocar este componente.
 */
function Auth0ProviderWrapper({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <Auth0ProviderWrapper>
          <AuthProvider>
            <CartProvider>
              <FavoritesProvider>
                <MainShell>{children}</MainShell>
              </FavoritesProvider>
            </CartProvider>
          </AuthProvider>
        </Auth0ProviderWrapper>
      </body>
    </html>
  );
}
