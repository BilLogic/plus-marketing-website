import type { NextConfig } from "next"
import path from "path"

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ["**/.next/**", "**/src/data/cache/**"],
      }
    }
    return config
  },
  async redirects() {
    return [
      {
        source: "/research",
        destination: "/publications",
        permanent: true,
      },
    ]
  },
  /**
   * Pin Turbopack root so a parent `~/package-lock.json` is not treated as the monorepo root.
   * Run `npm run dev` from this repo root (so `process.cwd()` is correct).
   */
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  images: {
    remotePatterns: [
      { hostname: "*.amazonaws.com" },
      { hostname: "*.notion.so" },
      { hostname: "www.figma.com" },
      { hostname: "framerusercontent.com" },
      { hostname: "i.ytimg.com" },
    ],
  },
}

export default nextConfig
