/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  basePath: '/outbrew',

  // API proxy for backend connection
  // With basePath: '/outbrew', rewrites operate on paths AFTER basePath is stripped.
  // Browser request: /outbrew/api/v1/auth/login
  // Rewrite source matches: /api/v1/auth/login  (path = "v1/auth/login")
  // Destination: http://backend:8000/api/v1/auth/login
  async rewrites() {
    const backendHost = process.env.NEXT_PUBLIC_BACKEND_HOST || 'http://localhost:8000';
    return [
      {
        source: '/api/:path*',
        destination: `${backendHost}/api/:path*`,
      },
    ]
  },

  // Allow images from external sources
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'metaminds.store',
      },
      {
        protocol: 'https',
        hostname: '*.metaminds.store',
      },
    ],
  },
}

module.exports = nextConfig
