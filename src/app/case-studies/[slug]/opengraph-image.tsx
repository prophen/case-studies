import { notFound } from 'next/navigation';
import { getStudy } from '@/lib/case-studies';
import { socialImage } from '@/lib/social-image';

export const alt = 'Nikema / Field notes — Case study';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const study = getStudy((await params).slug);
  if (!study) notFound();
  return socialImage({ title: study.title, description: study.summary, label: `${study.project} / ${study.draft ? 'Draft field notes' : 'Field notes'}` });
}
