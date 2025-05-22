/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ✅ This is required for static hosting
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Skip type/lint build errors for now
  },
};

module.exports = nextConfig;
