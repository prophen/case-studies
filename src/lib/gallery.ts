// Gallery artifacts: images and video generated while building in public.
//
// HOW TO REPLACE A PLACEHOLDER
// 1. Export the visual (portrait PNG/JPG) or final MP4 from MotionBrief's project library.
// 2. Drop the file into public/gallery/<project>/ and update the `src` below.
// 3. Fill in `title`, `prompt`, and `caption` from the real campaign.
// 4. Set `placeholder: false` (or delete the line) and remove the <span> badge on the page.
// 5. Delete the placeholder file from public/gallery.

export type GalleryKind = 'image' | 'video';

export interface GalleryArtifact {
  id: string;
  title: string;
  project: string;
  projectHref: string;
  kind: GalleryKind;
  src: string;
  poster?: string;
  width: number;
  height: number;
  /** The rough campaign prompt that produced this artifact. */
  prompt: string;
  /** Model and path, e.g. "FLUX.1 Schnell via fal". */
  model: string;
  caption: string;
  /** True while the file is a stand-in waiting for a real export. */
  placeholder?: boolean;
}

export const galleryArtifacts: GalleryArtifact[] = [
  // ---- MotionBrief: replace each placeholder with a real export ----
  {
    id: 'motionbrief-still-1',
    title: 'Cardamom oat milk latte launch',
    project: 'MotionBrief',
    projectHref: '/case-studies/motionbrief',
    kind: 'image',
    src: '/gallery/motionbrief/cardamom-latte.png',
    width: 720,
    height: 1280,
    prompt:
      'A cozy Sacramento coffee shop launching a cardamom oat milk latte for fall. Warm golden-hour light, ceramic cup with latte art, cinnamon sticks and fallen leaves on a wooden table, steam rising.',
    model: 'FLUX.1 Schnell via fal',
    caption:
      'The key visual for a fall drink launch: latte art, cinnamon, and golden-hour warmth doing all the selling.',
  },
  {
    id: 'motionbrief-still-2',
    title: 'Black history walking tour',
    project: 'MotionBrief',
    projectHref: '/case-studies/motionbrief',
    kind: 'image',
    src: '/gallery/motionbrief/walking-tour.png',
    width: 720,
    height: 1280,
    prompt:
      'A guided Black history walking tour through Old Sacramento. A joyful group walking past historic brick buildings at sunset, a tour guide holding up an old photograph, warm and welcoming energy.',
    model: 'FLUX.1 Schnell via fal',
    caption:
      'The key visual for a walking tour promo: the guide holding history up to the present, sunset doing the rest.',
  },
  {
    id: 'motionbrief-video-1',
    title: 'Field Notes promo',
    project: 'MotionBrief',
    projectHref: '/case-studies/motionbrief',
    kind: 'video',
    src: '/gallery/motionbrief/field-notes-promo.mp4',
    poster: '/gallery/motionbrief/field-notes-poster.jpg',
    width: 720,
    height: 1280,
    prompt:
      'A 5-second vertical promo for Field Notes, a site where a software engineer writes up what she builds, including what didn\u2019t work. Warm, confident, editorial style. The visual: a desk at golden hour, notebook open beside a laptop showing code, coffee going cold.',
    model: 'FLUX.1 Schnell via fal, narration via ElevenLabs, render via Shotstack',
    caption:
      'A slow push-in across a golden-hour desk: code on the laptop, sketches in the notebook, coffee going cold. The cut sells the whole Field Notes premise in five seconds.',
  },
  {
    id: 'motionbrief-video-2',
    title: 'Rooftop afterparty invite',
    project: 'MotionBrief',
    projectHref: '/case-studies/motionbrief',
    kind: 'video',
    src: '/gallery/motionbrief/rooftop-afterparty.mp4',
    poster: '/gallery/motionbrief/rooftop-afterparty-poster.jpg',
    width: 720,
    height: 1280,
    prompt:
      'An invite for a developers\u2019 rooftop afterparty after a tech conference. Neon signs, city skyline at night, people laughing with drinks, confetti in the air, electric and fun.',
    model: 'FLUX.1 Schnell via fal, narration via ElevenLabs, render via Shotstack',
    caption:
      'The finished five-second cut for a conference afterparty invite: neon, skyline, and confetti in the air.',
  },
  {
    id: 'motionbrief-still-4',
    title: 'Vitamin C serum launch',
    project: 'MotionBrief',
    projectHref: '/case-studies/motionbrief',
    kind: 'image',
    src: '/gallery/motionbrief/vitamin-c-serum.jpg',
    width: 576,
    height: 1024,
    prompt:
      'A new vitamin C serum launch. Minimal dewy aesthetic, a glass serum bottle with water droplets on a wet stone surface, soft morning light, fresh orange slices blurred in the background.',
    model: 'FLUX.1 Schnell via fal',
    caption:
      'The key visual for a serum launch: droplets, wet stone, and morning light selling the dewy promise.',
  },
  {
    id: 'motionbrief-still-5',
    title: 'Midnight release party',
    project: 'MotionBrief',
    projectHref: '/case-studies/motionbrief',
    kind: 'image',
    src: '/gallery/motionbrief/bookstore-midnight.jpg',
    width: 576,
    height: 1024,
    prompt:
      'A neighborhood bookstore\u2019s midnight release party for a fantasy novel. A crowd of readers holding glowing lanterns outside the shop at night, stars overhead, magical and a little mysterious.',
    model: 'FLUX.1 Schnell via fal',
    caption:
      'The key visual for a bookstore event: lanterns, starlight, and a crowd ready for magic.',
  },
];
