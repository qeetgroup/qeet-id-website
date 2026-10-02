import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server for the container image only (the Dockerfile sets
  // NEXT_OUTPUT); the Vercel build is unchanged.
  output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : undefined,
  reactCompiler: true,
  transpilePackages: ["@qeetrix/ui"],
  allowedDevOrigins: ["id.qeet.localhost"],
};

export default nextConfig;
