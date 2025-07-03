import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: "incremental",
    useCache: true,
  },
  images: {
    remotePatterns: [new URL("https://covers.openlibrary.org/**")],
  },
};

export default nextConfig;
