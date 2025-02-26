import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ['assets.aceternity.com']
  }
};

export default nextConfig;
