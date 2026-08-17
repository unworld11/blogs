import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/blogs",
        destination: "/#writing",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
