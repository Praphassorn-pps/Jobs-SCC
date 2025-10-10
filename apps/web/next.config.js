/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['profile.line-scdn.net', 'static.line-scdn.net']
  },
  // Ensure CSS is processed correctly
  webpack: (config) => {
    return config;
  },
}

module.exports = nextConfig