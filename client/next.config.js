/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

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
      {
        source: "/dashboard/posts#",
        destination: "/dashboard/posts#", // Keep post routes functional
      },
    ];
  },
};

module.exports = nextConfig;
