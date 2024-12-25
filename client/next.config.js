/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**", // Matches all paths
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/api/:path*", // API routes unchanged
      },
      {
        source: "/Media/:path*",
        destination: "/Media/:path*", // Keep media routes functional
      },
    ];
  },
};

module.exports = nextConfig;
