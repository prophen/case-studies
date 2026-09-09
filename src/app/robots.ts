import type { MetadataRoute } from 'next';
import { canonicalBase } from '@/lib/site';
export default function robots(): MetadataRoute.Robots {
  const base = canonicalBase();
  return base && process.env.NODE_ENV === 'production' ? { rules: { userAgent: '*', allow: '/' }, sitemap: `${base}/sitemap.xml` } : { rules: { userAgent: '*', disallow: '/' } };
}
