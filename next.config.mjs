const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    domains: ['blob.v0.dev'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  i18n: {
    locales: ['en', 'zh-CN', 'es', 'fr', 'ar', 'id', 'tr', 'ru', 'ja'],
    defaultLocale: 'en',
    localeDetection: true,
  },
}

export default nextConfig
