import type { NextConfig } from "next";
import path from "path";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  /* config options here */

  // Required for OpenNext Cloudflare deployment
  output: 'standalone',
  reactCompiler: true,

  experimental: {
    cssChunking: true,
    webVitalsAttribution: ['CLS', 'LCP'],
  },

  devIndicators: false,
  typedRoutes: true,
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/',              // The root route
        destination: '/nextjs-demo',     // The desired new default route
        permanent: true,          // Use true for permanent (301) redirect, false for temporary (307)
      },
    ];
  },

} satisfies NextConfig;

export default withBundleAnalyzer(nextConfig);

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

initOpenNextCloudflareForDev();
