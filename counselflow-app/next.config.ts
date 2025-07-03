/** @type {import('next').NextConfig} */
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'counselflow.com'],
    unoptimized: process.env.NODE_ENV === 'development'
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
}

export default nextConfig
