import type { NextConfig } from 'next';
const config: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  outputFileTracingIncludes: { '/*': ['./content/case-studies/**/*.mdx', './public/case-studies/**/*'] },
};
export default config;
