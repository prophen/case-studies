import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { getStudies, getStudy, remarkStudyHeadings } from '@/lib/case-studies';
import { mdxComponents, ProjectFacts, ProofLinks } from '@/components/case-study/components';
import { CaseStudyNav } from '@/components/case-study-nav';
import { WorkflowPreview } from '@/components/workflow-preview';
import { canonicalBase } from '@/lib/site';
import { socialMetadata } from '@/lib/social-metadata';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return getStudies().map(study => ({ slug: study.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getStudy((await params).slug);
  if (!study) return { title: 'Page not found', robots: { index: false, follow: false } };
  const base = canonicalBase();
  return { title: study.title, description: study.summary, ...socialMetadata(study.title, study.summary, `/case-studies/${study.slug}`), robots: { index: !study.draft && !!base, follow: !study.draft && !!base }, ...(base && !study.draft ? { alternates: { canonical: `${base}/case-studies/${study.slug}` } } : {}) };
}
export default async function StudyPage({ params }: Props) {
  const study = getStudy((await params).slug);
  if (!study) notFound();
  const { default: Content } = await evaluate(study.content, { ...runtime, remarkPlugins: [remarkStudyHeadings] });
  return <main id="main" className="study-page"><Link href="/#work" className="back-link">← All field notes</Link>
    {study.draft && <aside className="draft-notice"><strong>A work in progress.</strong> Draft narrative · project evidence and final copy are still being reviewed.</aside>}
    <div className="study-layout"><CaseStudyNav chapters={study.chapters}/><article className="study-article">
      <header className="study-hero"><p className="eyebrow">{study.project} / Field notes</p><h1>{study.title}</h1><p className="study-summary">{study.summary}</p><ProjectFacts study={study}/><ProofLinks links={study.links}/></header>
      {study.cover ? <figure className="study-cover"><Image src={study.cover} alt={study.coverAlt!} width={study.coverWidth!} height={study.coverHeight!} sizes="(max-width: 800px) 88vw, 1000px" priority/>{study.coverCaption && <figcaption>{study.coverCaption}</figcaption>}</figure> : study.draft && study.slug === 'social-content-agent' ? <WorkflowPreview/> : null}
      <div className="prose"><Content components={mdxComponents}/></div>
      <div className="study-end"><Link className="text-link" href="/#work">← Back to selected work</Link><span className="handwriting">More questions.<br/>Better next steps.</span></div>
    </article></div></main>;
}
