/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow any domain (use carefully)
      },
    ],
  },
};

export default nextConfig;
