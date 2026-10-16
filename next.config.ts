import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/portfolio", destination: "/work", permanent: false },
      { source: "/team", destination: "/#problems", permanent: false },
    ];
  },
};

export default nextConfig;
