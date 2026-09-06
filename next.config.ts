import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
