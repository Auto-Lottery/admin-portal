import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  async rewrites() {
    return [
      {
        source: "/auth/:slug*",
        destination: `${process.env.AUTH_API_URL}/v1/:slug*`, // Proxy to Backend
      },
      {
        source: "/generator/:slug*",
        destination: `${process.env.GENERATOR_API_URL}/v1/:slug*`, // Proxy to Backend
      },
      {
        source: "/transaction/:slug*",
        destination: `${process.env.TRANSACTION_API_URL}/v1/:slug*`, // Proxy to Backend
      },
      {
        source: "/message/:slug*",
        destination: `${process.env.MESSAGE_API_URL}/v1/:slug*`, // Proxy to Backend
      },
    ];
  },
});
