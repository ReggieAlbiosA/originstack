import type { NextConfig } from "next";
// import path from "path";

const nextConfig: NextConfig = {

  // turbopack: {
  //   root: path.resolve(__dirname, '..'),
  // },

  typedRoutes: true,
  reactCompiler: true,
  cacheComponents: true,
  reactStrictMode: true,

  serverExternalPackages: ["@prisma/client", ".prisma/client"],

  experimental: {
    cssChunking: true,
    webVitalsAttribution: ['CLS', 'LCP'],
    globalNotFound: true,

  },


  compiler: {
    styledComponents: true,
  },


  async redirects() {
    return [
      {
        source: '/',
        destination: '/nextjs-demo',
        permanent: true,
      },
    ];
  },

} satisfies NextConfig;

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
