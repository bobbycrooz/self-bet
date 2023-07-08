/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.api-sports.io',
        // port: '',
        // pathname: '/account123/**',
        },
         {
        protocol: 'https',
        hostname: 'media-3.api-sports.io',
        // port: '',
        // pathname: '/account123/**',
      },
    ],
  },


      images: {
    domains: ['media-3.api-sports.io', 'media.api-sports.io'],
  },
}

module.exports = nextConfig
