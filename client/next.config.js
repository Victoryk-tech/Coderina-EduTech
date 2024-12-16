/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Ensure API routes work as expected
        destination: "/api/:path*",
      },
      {
        source: "/(.*)", // Catch all other routes
        destination: "/",
      },
    ];
  },
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
};

module.exports = nextConfig;
