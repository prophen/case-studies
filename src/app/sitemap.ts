import type { MetadataRoute } from 'next';
import { readStudies, visibleStudies } from '@/lib/case-studies';
import { canonicalBase } from '@/lib/site';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = canonicalBase();
  if (!base) return [];
  return [{ url: base }, { url: `${base}/gallery` }, ...visibleStudies(readStudies(), 'production').map(study => ({ url: `${base}/case-studies/${study.slug}` }))];
}
