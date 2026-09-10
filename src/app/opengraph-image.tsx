import { socialImage } from '@/lib/social-image';
import { siteDescription } from '@/lib/social-metadata';

export const alt = 'Nikema / Field notes — I build things. Then ask better questions.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return socialImage({ title: 'I build things. Then ask better questions.', description: siteDescription });
}
