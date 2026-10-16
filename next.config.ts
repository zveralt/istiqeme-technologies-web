import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [{ source: "/portfolio", destination: "/work", permanent: false }];
  },
};

export default nextConfig;
