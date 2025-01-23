import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  webpack5: true,
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

export default nextConfig;
