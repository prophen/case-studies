import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { StudioDiagram } from '@/components/studio-diagram';
import { WorkflowPreview } from '@/components/workflow-preview';
import { getStudies } from '@/lib/case-studies';
import { canonicalBase } from '@/lib/site';

export function generateMetadata(): Metadata {
  const base = canonicalBase();
  return { robots: { index: !!base && process.env.NODE_ENV === 'production', follow: !!base && process.env.NODE_ENV === 'production' }, ...(base ? { alternates: { canonical: base } } : {}) };
}

export default function Home() {
  const studies = getStudies();
  return <main id="main">
    <section className="home-hero" aria-label="Introduction"><div className="hero-copy"><h1>I build things.<br/>Then ask <span className="underlined">better</span><br/>questions.</h1><p>Case studies in building, testing,<br className="desktop-break"/> and figuring things out.</p></div><StudioDiagram/></section>
    <section id="work" className="work-section"><div className="section-label"><h2>01 / Selected work</h2><span>A closer look at the process.</span></div>
      {studies.length ? studies.map(study => <article className="feature" key={study.slug}><div className="feature-copy"><p className="eyebrow">{study.project}</p><h3>{study.title}</h3><p className="feature-summary">{study.summary}</p>{study.draft && <span className="draft-badge">Draft case study</span>}<Link className="text-link" href={`/case-studies/${study.slug}`}>Open the field notes <span aria-hidden="true">↗</span></Link></div>{study.cover ? <figure className="feature-photo"><Image className="feature-cover" src={study.cover} alt={study.coverAlt!} width={study.coverWidth!} height={study.coverHeight!} sizes="(max-width: 800px) 88vw, 65vw"/>{study.coverCaption && <figcaption>{study.coverCaption}</figcaption>}</figure> : study.draft && study.slug === 'social-content-agent' ? <WorkflowPreview/> : <p className="handwriting">A story taking shape.</p>}</article>) : <div className="empty-work"><h3>The field notes are taking shape.</h3><p>For now, you can find my writing on <a href="https://nikema.dev">nikema.dev ↗</a>.</p></div>}
    </section>
    <section id="approach" className="approach"><h2>The decisions behind<br/>the interface.</h2><div><span className="index-number">01</span><h3>Start with a question.</h3><p>What does the person on the other side of the screen need?</p></div><div><span className="index-number">02</span><h3>Follow the friction.</h3><p>Look closely at the places where a good idea becomes difficult to use.</p></div><div><span className="index-number">03</span><h3>Show the reasoning.</h3><p>Make room for the tradeoffs, the rough edges, and what comes next.</p></div></section>
    <section className="writing-callout"><div><p className="eyebrow">Outside the case studies</p><h2>More thinking, in public.</h2><p>Notes on the things I’m learning and making.</p></div><a className="text-link" href="https://nikema.dev">Read on nikema.dev ↗</a><span className="handwriting">Same curiosity,<br/>different pages.</span></section>
  </main>;
}

