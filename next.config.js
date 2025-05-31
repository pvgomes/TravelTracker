/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@neondatabase/serverless'],
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    SESSION_SECRET: process.env.SESSION_SECRET,
    NEXTAUTH_SECRET: process.env.SESSION_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000'
  },
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '.',
      '@components': './components',
      '@lib': './lib',
      '@shared': './shared',
      '@hooks': './components/hooks'
    }
    return config
  }
}

export default nextConfig