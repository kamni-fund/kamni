/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/ru/tokens/stas",
        destination: "/stas",
        permanent: true,
      },
      {
        source: "/ru/verification/mtla",
        destination: "/verify",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/.well-known/stellar.toml",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Content-Type", value: "text/plain" },
        ],
      },
      {
        source: "/.well-known/:path*",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];
  },
  poweredByHeader: false,
  generateEtags: false,
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.optimization.minimize = false;
      config.optimization.moduleIds = "named";
      config.optimization.chunkIds = "named";
    }
    return config;
  },
  transpilePackages: ["@swc/core"],
  staticPageGenerationTimeout: 180,
  images: {
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
