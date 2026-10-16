import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Directory routes work on static hosts without extension-rewrite rules.
  // The build script also supplies separate legacy .html compatibility entries.
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: { root: process.cwd() },
};

export default nextConfig;
