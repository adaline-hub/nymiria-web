import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: "/install.sh", destination: "/api/install/sh" },
      { source: "/install.ps1", destination: "/api/install/ps1" },
      { source: "/brew/nymiria.rb", destination: "/api/install/brew" },
    ];
  },
};

export default config;
