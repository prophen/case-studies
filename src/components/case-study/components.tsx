import Image from 'next/image';
import type { ReactNode } from 'react';
import type { MDXComponents } from 'mdx/types';
import type { StudyMetadata } from '@/lib/case-study-schema';

type Children = { children?: ReactNode };
export function Callout({ title = 'Scope note', children }: Children & { title?: string }) { return <aside className="callout"><p className="eyebrow">{title}</p><div>{children}</div></aside>; }
export function Decision({ title, why, tradeoff, children }: Children & { title: string; why: string; tradeoff: string }) { return <div className="decision"><h3>{title}</h3><dl><dt>Why</dt><dd>{why}</dd><dt>The tradeoff</dt><dd>{tradeoff}</dd></dl>{children && <details><summary>Notes &amp; evidence</summary><div className="disclosure-body">{children}</div></details>}</div>; }
export function WorkflowSteps({ children }: Children) { return <ol className="workflow-steps">{children}</ol>; }
export function Step({ title, children }: Children & { title: string }) { return <li><h3>{title}</h3><div>{children}</div></li>; }
type ImageProps = { src: string; alt: string; caption: string; width: string; height: string };
export function ProductImage({ src, alt, caption, width, height }: ImageProps) { return <figure className="product-image"><Image src={src} alt={alt} width={Number(width)} height={Number(height)} sizes="(max-width: 800px) 88vw, 900px"/><figcaption>{caption}</figcaption></figure>; }
export function ImageGallery({ children }: Children) { return <div className="image-gallery">{children}</div>; }
export function ArchitectureDiagram({ description, ...props }: ImageProps & { description: string }) { return <div className="architecture-diagram"><ProductImage {...props}/><p>{description}</p></div>; }
export function Verification({ children }: Children) { return <dl className="verification">{children}</dl>; }
export function Evidence({ title, status, result, href, children }: Children & { title: string; status: 'verified' | 'not-run' | 'unconfirmed'; result?: string; href?: string }) { return <div className="evidence-row"><dt>{title}<span className={`evidence-status ${status}`}>{status.replace('-', ' ')}</span></dt><dd>{result && <p>{result}</p>}{children}{href && <a href={href}>View evidence ↗</a>}</dd></div>; }
export function ResultsOrLearnings({ children }: Children) { return <div className="learnings">{children}</div>; }
export function DemoEmbed({ href, title }: { href?: string; title: string }) { return href ? <aside className="demo-link"><p className="eyebrow">Project walkthrough</p><a className="text-link" href={href}>{title} ↗</a></aside> : null; }
export function VideoEmbed({ videoId, caption }: { videoId: string; caption: string }) { return <figure className="video-embed"><div className="video-frame"><iframe src={`https://www.youtube-nocookie.com/embed/${id}`} title="Project walkthrough video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div><figcaption>{caption}</figcaption></figure>; }
export function ProofLinks({ links }: { links?: StudyMetadata['links'] }) {
  if (!links || !Object.values(links).some(Boolean)) return null;
  const labels = { live: 'Explore the project', source: 'Read the source', demo: 'Watch the demo', writeup: 'Related writing' };
  return <nav className="proof-links" aria-label="Project evidence">{(Object.keys(labels) as (keyof typeof labels)[]).map(key => links[key] ? <a className="text-link" key={key} href={links[key]}>{labels[key]} ↗</a> : null)}</nav>;
}
export function ProjectFacts({ study }: { study: StudyMetadata }) {
  const facts = [['Role', study.role], ['Stack', study.stack?.join(', ')], ['Timeline', study.timeline], ['Status', study.projectStatus], ['Scope', study.scope]].filter(([,value]) => value);
  return facts.length ? <dl className="project-facts">{facts.map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl> : null;
}
export const mdxComponents: MDXComponents = { Callout, Decision, WorkflowSteps, Step, ProductImage, ImageGallery, ArchitectureDiagram, Verification, Evidence, ResultsOrLearnings, DemoEmbed, VideoEmbed };
