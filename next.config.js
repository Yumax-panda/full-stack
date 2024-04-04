const remotePatterns = [
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
  {
    protocol: 'https',
    hostname: 'd2l930y2yx77uc.cloudfront.net',
  },
  {
    protocol: 'https',
    hostname: 'firebasestorage.googleapis.com',
  },
]

if (process.env.NODE_ENV !== 'production') {
  remotePatterns.push({
    protocol: 'http',
    hostname: '127.0.0.1',
  })
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns,
  },
}

module.exports = nextConfig
