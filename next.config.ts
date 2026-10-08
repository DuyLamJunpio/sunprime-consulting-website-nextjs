import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'hoirqrkdgbmvpwutwuwj.supabase.co',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'sunprime.vn',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '**.sunprime.vn',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'blogg.advokatguiden.no',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.advokatguiden.no',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.advokatguiden.no',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        ],
      },
    ];
  },
};

export default nextConfig;