import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/night/:id",
        destination: "/nuit/:id",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
