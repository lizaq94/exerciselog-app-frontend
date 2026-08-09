import type { NextConfig } from 'next';

const API_PROXY_TARGET = process.env.API_PROXY_TARGET;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    if (!API_PROXY_TARGET) return [];

    return [
      {
        source: '/api/:path*',
        destination: `${API_PROXY_TARGET.replace(/\/$/, '')}/:path*`,
      },
    ];
  },
};

export default nextConfig;
