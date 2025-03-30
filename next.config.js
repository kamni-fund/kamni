/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
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
};

module.exports = nextConfig;
