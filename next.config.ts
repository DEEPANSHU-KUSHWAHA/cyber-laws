import type { NextConfig } from 'next';

const isStatic = process.env.STATIC_EXPORT === '1';
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
const basePath = isStatic && repo ? `/${repo}` : '';

const nextConfig: NextConfig = {
  output: isStatic ? 'export' : undefined,
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: isStatic,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
