import type { Metadata } from 'next';

export const siteTitle = 'Nikema — Field notes';
export const siteDescription = 'Case studies in building, testing, and figuring things out.';

export function socialMetadata(title: string, description: string, path = '/'): Metadata {
  const image = {
    url: path === '/' ? '/opengraph-image' : `${path}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: `${title} · Nikema / Field notes`,
  };
  return {
    openGraph: {
      type: path === '/' ? 'website' : 'article',
      locale: 'en_US',
      siteName: siteTitle,
      title,
      description,
      url: path,
      images: [image],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
