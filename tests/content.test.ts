import { afterEach, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parseStudy, readStudies, visibleStudies } from '../src/lib/case-studies';

const draft = `---\nslug: example-study\nproject: Example\ntitle: A study\nsummary: A useful summary\ndraft: true\n---\n\n## Starting point\n\nSome notes.\n`;
const temps: string[] = [];
afterEach(() => { for (const dir of temps.splice(0)) {
  const resolved = path.resolve(dir);
  if (path.dirname(resolved) !== path.resolve(os.tmpdir()) || !path.basename(resolved).startsWith('case-studies-test-')) throw new Error('Unexpected test cleanup path');
  fs.rmSync(resolved, { recursive: true, force: true });
} });

describe('Content safety and publication boundaries', () => {
  it('extracts chapter links and defaults optional metadata', () => {
    const study = parseStudy(draft);
    expect(study.chapters).toEqual([{ id: 'starting-point', title: 'Starting point' }]);
    expect(study.featured).toBe(false);
    expect(study.links).toBeUndefined();
  });
  it('requires explicit draft state', () => expect(() => parseStudy(draft.replace('draft: true\n', ''))).toThrow());
  it('rejects unsafe metadata links', () => expect(() => parseStudy(draft.replace('draft: true', 'draft: true\nlinks:\n  source: "javascript:alert(1)"'))).toThrow());
  it.each(['[unsafe](javascript:alert%281%29)', '<Unknown />', '{process.env.SECRET}', 'export const secret = 1', '<Callout title={"computed"}>Hi</Callout>', '<script>alert(1)</script>'])('rejects unsupported MDX: %s', body => expect(() => parseStudy(draft + '\n' + body)).toThrow());
  it('rejects duplicate heading anchors', () => expect(() => parseStudy(draft + '\n## Starting point\n')).toThrow(/Duplicate/));
  it('rejects broken heading links', () => expect(() => parseStudy(draft + '\n[Read](#missing)')).toThrow(/Unknown heading anchor/));
  it('rejects missing assets', () => expect(() => parseStudy(draft + '\n<ProductImage src="/case-studies/example/missing.png" alt="A screen" caption="A screen" width="400" height="300" />')).toThrow(/Missing/));
  it('rejects images without dimensions and alt text', () => expect(() => parseStudy(draft + '\n<ProductImage src="/case-studies/example/screen.png" />')).toThrow(/requires/));
  it('rejects unsupported evidence states and unsupported pass claims', () => {
    expect(() => parseStudy(draft + '\n<Evidence title="Test" status="pass" />')).toThrow(/status/);
    expect(() => parseStudy(draft + '\n<Evidence title="Test" status="verified" />')).toThrow(/requires/);
  });
  it('requires reviewed evidence and a real cover to publish', () => expect(() => parseStudy(draft.replace('draft: true', 'draft: false'))).toThrow(/Publishing/));
  it('shows drafts only during development', () => {
    const study = parseStudy(draft);
    expect(visibleStudies([study], 'development')).toHaveLength(1);
    expect(visibleStudies([study], 'production')).toHaveLength(0);
    expect(visibleStudies([study], 'test')).toHaveLength(0);
  });
  it('supports a second MDX-and-assets study without route changes and catches duplicate slugs', () => {
    const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'case-studies-test-')); temps.push(temp);
    const root = path.join(temp, 'content'); const publicRoot = path.join(temp, 'public');
    fs.mkdirSync(path.join(root, 'first'), { recursive: true });
    fs.mkdirSync(path.join(root, 'second'), { recursive: true });
    fs.mkdirSync(path.join(publicRoot, 'case-studies', 'second'), { recursive: true });
    fs.writeFileSync(path.join(publicRoot, 'case-studies', 'second', 'cover.png'), Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jX1sAAAAASUVORK5CYII=', 'base64'));
    fs.writeFileSync(path.join(root, 'first', 'index.mdx'), draft);
    const published = draft.replace('example-study', 'second').replace('draft: true', 'draft: false\nevidenceReviewed: true\ncover: /case-studies/second/cover.png\ncoverAlt: Test fixture pixel\ncoverWidth: 1\ncoverHeight: 1');
    fs.writeFileSync(path.join(root, 'second', 'index.mdx'), published);
    const studies = readStudies(root, publicRoot);
    expect(studies).toHaveLength(2);
    expect(visibleStudies(studies, 'production').map(study => study.slug)).toEqual(['second']);
    fs.writeFileSync(path.join(root, 'second', 'index.mdx'), draft);
    expect(() => readStudies(root, publicRoot)).toThrow(/Duplicate slug/);
  });
  it('validates the local studies and keeps MotionBrief in draft', () => {
    const studies = readStudies();
    expect(studies.map(study => study.slug)).toEqual(['social-content-agent', 'motionbrief']);
    expect(visibleStudies(studies, 'production').map(study => study.slug)).toEqual(['social-content-agent']);
  });
});
