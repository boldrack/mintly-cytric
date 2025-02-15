/** @type {import('next').NextConfig} */
const nextConfig = {
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
