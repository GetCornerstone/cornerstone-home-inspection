import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone is for packing deploy/. Vercel injects its own adapter;
  // Next 16.3 + standalone together fail the Vercel build.
  ...(process.env.VERCEL ? {} : { output: "standalone" as const }),
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "0.0.0.0",
    "*.cursor.sh",
    "*.cursor.com",
    "*.cursorusercontent.com",
  ],
};

export default nextConfig;
