import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [96, 128, 200, 256, 384],
  },
  async redirects() {
    return [
      { source: "/portfolio", destination: "/work", permanent: false },
      { source: "/team", destination: "/#problems", permanent: false },
    ];
  },
};

export default nextConfig;
