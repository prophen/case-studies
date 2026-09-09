'use client';
import { useEffect, useState } from 'react';
import type { Chapter } from '@/lib/case-studies';

export function CaseStudyNav({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(chapters[0]?.id);
  useEffect(() => {
    const elements = chapters.map(({ id }) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const update = () => {
      let current = elements[0]?.id;
      for (const element of elements) if (element.getBoundingClientRect().top <= 150) current = element.id;
      setActive(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [chapters]);
  return <nav className="chapter-nav" aria-label="Case study chapters"><p className="eyebrow">In these notes</p><ol>{chapters.map((chapter, index) => <li key={chapter.id}><a href={`#${chapter.id}`} aria-current={active === chapter.id ? 'location' : undefined}><span>{String(index + 1).padStart(2, '0')}</span>{chapter.title}</a></li>)}</ol><span className="handwriting">Follow the thread.<br/>Take your time.</span></nav>;
}
