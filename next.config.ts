import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: "incremental",
  },
  images: {
    remotePatterns: [new URL("https://covers.openlibrary.org/**")],
  },
};

export default nextConfig;
