import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server for the container image only (the Dockerfile sets
  // NEXT_OUTPUT); the Vercel build is unchanged.
  output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : undefined,
  reactCompiler: true,
  // AVIF first: the hero photographs are the largest thing on the pages that have them.
  images: { formats: ["image/avif", "image/webp"] },
  allowedDevOrigins: ["id.qeet.localhost"],
  async redirects() {
    return [
      // Retired: invented customer stories, an "illustrative" status page, a
      // changelog with version numbers no release ever had, and open roles.
      { source: "/customers", destination: "/", permanent: true },
      { source: "/customers/:slug", destination: "/", permanent: true },
      { source: "/status", destination: "/", permanent: true },
      { source: "/changelog", destination: "/", permanent: true },
      { source: "/careers", destination: "https://qeet.in/careers", permanent: true },
      // Not compared to the /compare standard yet (sourced, dated facts —
      // config/compare.ts RETIRED_SLUGS); temporary, so each can come back.
      {
        source:
          "/compare/:slug(authentik|clerk|cognito|descope|firebase|frontegg|fusionauth|propelauth|stytch|supabase|supertokens)",
        destination: "/compare",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
