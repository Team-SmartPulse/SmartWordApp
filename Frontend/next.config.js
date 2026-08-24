/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/marketplace", destination: "/Marketplace", permanent: false },
      { source: "/games", destination: "/Game/level", permanent: false },
      { source: "/game", destination: "/Game/level", permanent: false },
    ];
  },
};

module.exports = nextConfig;
