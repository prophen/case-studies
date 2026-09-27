import type { NextConfig } from 'next';
const config: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  images: { qualities: [75, 90] },
  outputFileTracingIncludes: { '/*': ['./content/case-studies/**/*.mdx', './public/case-studies/**/*', './public/gallery/**/*'] },
};
export default config;
