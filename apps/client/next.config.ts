/**
 * Next.js configuration for the RVsync client application.
 * Features:
 * - Sentry error tracking
 * - Package optimization
 * - Image domains
 * - Turbo config
 *
 * By Hitesh S P
 */

import path from 'path';
import type { NextConfig } from 'next';

import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, '../../'),
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: [
      '@codesandbox/sandpack-react',
      '@mdxeditor/editor',
      '@monaco-editor/react',
      'monaco-editor',
    ],
    turbo: {
      minify: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

const isCi = process.env.CI === 'true';

export default withSentryConfig(nextConfig, {
  org: 'rvsync',
  project: 'rvsync',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: {
    enabled: true,
  },
  tunnelRoute: '/monitoring',
  disableLogger: true,
  automaticVercelMonitors: true,
  sourcemaps: {
    deleteSourcemapsAfterUpload: isCi,
  },
  telemetry: !isCi,
});
