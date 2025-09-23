import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // Skip environment variable validation during CI builds
  experimental: {
    skipTrailingSlashRedirect: true,
  },
  // Handle missing environment variables gracefully
  env: {
    SKIP_ENV_VALIDATION: process.env.NEXT_PUBLIC_SKIP_ENV_VALIDATION || 'false',
  },
};

export default nextConfig;
