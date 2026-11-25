/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: "/sliding-window", destination: "/sliding-window.html" },
      { source: "/basis-vectors", destination: "/basis-vectors.html" },
      { source: "/svd", destination: "/svd.html" },
    ];
  },
};

export default nextConfig;
