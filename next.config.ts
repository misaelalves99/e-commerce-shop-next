// next.config.ts

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  typedRoutes: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
