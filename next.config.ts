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
  env : {
    NEXT_PUBLIC_TOKEN_SYMBOL: process.env.NEXT_PUBLIC_TOKEN_SYMBOL,
    NEXT_PUBLIC_NETWORK_NAME: process.env.NEXT_PUBLIC_NETWORK_NAME,
    NEXT_PUBLIC_IMAGE_PROTOCOL: process.env.NEXT_PUBLIC_IMAGE_PROTOCOL,
    NEXT_PUBLIC_IMAGE_HOSTNAME: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME,
    NEXT_PUBLIC_IMAGE_PORT: process.env.NEXT_PUBLIC_IMAGE_PORT,
  },
};

export default nextConfig;
