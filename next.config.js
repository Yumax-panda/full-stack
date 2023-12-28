/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qiita.com',
      },
      {
        protocol: 'https',
        hostname: 'qiita-user-contents.imgix.net',
      },
      {
        protocol: 'https',
        hostname: 'zenn.dev',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}

module.exports = nextConfig
