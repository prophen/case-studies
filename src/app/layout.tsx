import type { Metadata } from 'next';
import Link from 'next/link';
import { canonicalBase } from '@/lib/site';
import { siteTitle, siteDescription, socialMetadata } from '@/lib/social-metadata';
import '@fontsource-variable/inter';
import '@fontsource/kalam/400.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(canonicalBase()!),
  title: { default: siteTitle, template: '%s · Nikema' },
  description: siteDescription,
  ...socialMetadata(siteTitle, siteDescription),
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="site-shell">
      <header className="site-header"><Link className="wordmark" href="/" aria-label="Nikema home">nikema<span className="wordmark-slash">/</span><span className="wordmark-note">works in progress</span></Link><nav aria-label="Main navigation"><Link href="/#work">Work</Link><a href="https://nikema.dev">Writing <span aria-hidden="true">↗</span></a><Link href="/#approach">Approach</Link></nav></header>
      {children}
      <footer className="site-footer"><Link href="/">nikema / field notes</Link><span>Built with curiosity. Always learning.</span><a href="https://nikema.dev">More writing ↗</a></footer>
    </div>
  </body></html>;
}
