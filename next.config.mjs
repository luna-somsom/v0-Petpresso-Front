/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['v0.blob.com'], // 외부 이미지 도메인 추가
    unoptimized: process.env.NODE_ENV === 'production', // 정적 내보내기를 위한 설정
  },
}

export default nextConfig
