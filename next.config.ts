import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  experimental: {
    cssChunking: true,
    webVitalsAttribution: ['CLS', 'LCP'],
  },

  devIndicators: false,
  reactCompiler: true,
  typedRoutes: true,


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

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
