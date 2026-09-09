import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { Decision, DemoEmbed, ProofLinks, ProjectFacts } from '../src/components/case-study/components';
import { caseStudySchema } from '../src/lib/case-study-schema';

describe('Optional content and evidence interactions', () => {
  it('omits missing proof links and demos completely', () => {
    expect(renderToStaticMarkup(<ProofLinks/>)).toBe('');
    expect(renderToStaticMarkup(<ProofLinks links={{}}/>)).toBe('');
    expect(renderToStaticMarkup(<DemoEmbed title="Demo"/>)).toBe('');
  });
  it('renders only supplied proof destinations', () => {
    const html = renderToStaticMarkup(<ProofLinks links={{ source: 'https://github.com/example/repo' }}/>);
    expect(html).toContain('Read the source'); expect(html).not.toContain('Watch the demo');
  });
  it('gives supplementary evidence a native keyboard-operable disclosure', () => {
    const html = renderToStaticMarkup(<Decision title="A decision" why="Reason" tradeoff="Cost">Source review pending</Decision>);
    expect(html).toContain('<details>'); expect(html).toContain('<summary>Notes &amp; evidence</summary>');
    expect(html).toContain('Source review pending');
  });
  it('does not invent facts for unknown project metadata', () => {
    const study = caseStudySchema.parse({ slug: 'test', project: 'Test', title: 'Test', summary: 'Test', draft: true });
    expect(renderToStaticMarkup(<ProjectFacts study={study}/>)).toBe('');
  });
});
