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
    ],
  },
};

export default nextConfig;