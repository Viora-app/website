import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_IMAGE_PROTOCOL || 'http',
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME || 'localhost',
        port: process.env.NEXT_PUBLIC_IMAGE_PORT || '3000',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
