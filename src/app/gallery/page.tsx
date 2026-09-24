import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { galleryArtifacts, type GalleryArtifact } from '@/lib/gallery';
import { canonicalBase } from '@/lib/site';

export function generateMetadata(): Metadata {
  const base = canonicalBase();
  const title = 'Gallery · Nikema';
  const description = 'Images and video generated while building in public: campaign visuals, narration, and finished cuts from MotionBrief.';
  return {
    title,
    description,
    robots: { index: !!base && process.env.NODE_ENV === 'production', follow: !!base && process.env.NODE_ENV === 'production' },
    ...(base ? { alternates: { canonical: `${base}/gallery` } } : {}),
  };
}

function ArtifactCard({ artifact }: { artifact: GalleryArtifact }) {
  return (
    <article className="gallery-card">
      <figure>
        {artifact.kind === 'image' ? (
          <Image
            src={artifact.src}
            alt={artifact.title}
            width={artifact.width}
            height={artifact.height}
            sizes="(max-width: 800px) 88vw, 30vw"
          />
        ) : (
          <video
            src={artifact.src}
            poster={artifact.poster}
            width={artifact.width}
            height={artifact.height}
            controls
            playsInline
            preload="metadata"
            aria-label={artifact.title}
          />
        )}
        <figcaption>
          <div className="gallery-card-head">
            <h3>{artifact.title}</h3>
            {artifact.placeholder && <span className="draft-badge">Placeholder</span>}
          </div>
          <p className="gallery-prompt"><span>Prompt</span> {artifact.prompt}</p>
          <p className="gallery-model">{artifact.model}</p>
          <p>{artifact.caption}</p>
        </figcaption>
      </figure>
    </article>
  );
}

export default function Gallery() {
  return (
    <main id="main" className="gallery-page">
      <section className="gallery-hero" aria-label="Introduction">
        <p className="eyebrow">The artifacts</p>
        <h1>
          Made things,
          <br />
          not just plans.
        </h1>
        <p>
          Images and video generated while building in public. Each piece started as a rough prompt
          and came out the other side as something you can watch. The notes say how.
        </p>
        <p>
          <Link className="text-link" href="/case-studies/motionbrief">
            How they got made: the MotionBrief case study <span aria-hidden="true">→</span>
          </Link>
        </p>
      </section>
      <section className="gallery-grid" aria-label="Gallery">
        {galleryArtifacts.map((artifact) => (
          <ArtifactCard key={artifact.id} artifact={artifact} />
        ))}
      </section>
      <section className="gallery-outro" aria-label="More about the process">
        <p>
          Every piece above came out of MotionBrief.{' '}
          <Link className="text-link" href="/case-studies/motionbrief">
            Read the case study <span aria-hidden="true">→</span>
          </Link>
        </p>
      </section>
    </main>
  );
}
