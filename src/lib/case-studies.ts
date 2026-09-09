import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import { caseStudySchema, componentNames, type StudyMetadata } from './case-study-schema';

type AstNode = { type: string; value?: string; depth?: number; name?: string; url?: string; children?: AstNode[]; attributes?: { type: string; name?: string; value?: unknown }[]; data?: Record<string, unknown> };
export type Chapter = { id: string; title: string };
export type Study = StudyMetadata & { content: string; chapters: Chapter[] };
const defaultRoot = path.join(process.cwd(), 'content', 'case-studies');
const defaultPublic = path.join(process.cwd(), 'public');
const toId = (value: string) => value.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
const nodeText = (node: AstNode): string => node.value ?? (node.children ?? []).map(nodeText).join('');

export function validateAsset(src: string, publicRoot = defaultPublic) {
  if (!src.startsWith('/case-studies/') || src.includes('\\') || /[?#%]/.test(src)) throw new Error(`Invalid asset path: ${src}. Use /case-studies/<slug>/<file>.`);
  const root = path.resolve(publicRoot);
  const target = path.resolve(root, `.${src}`);
  // Public assets are explicitly included in next.config.ts; avoid tracing unrelated workspace files.
  if (!target.startsWith(root + path.sep) || !fs.existsSync(/* turbopackIgnore: true */ target) || !fs.statSync(/* turbopackIgnore: true */ target).isFile()) throw new Error(`Missing or unsafe asset: ${src}`);
}

function validateLink(url: string) {
  if (/^#[a-z0-9-]+$/.test(url) || /^\/(?!\/)[a-zA-Z0-9/_#.-]*$/.test(url)) return;
  try { if (['https:', 'http:'].includes(new URL(url).protocol)) return; } catch {}
  throw new Error(`Unsafe link: ${url}. Use http(s), a site path, or a heading anchor.`);
}

function inspectTree(tree: AstNode, publicRoot: string): Chapter[] {
  const ids = new Set<string>();
  const chapters: Chapter[] = [];
  const anchors: string[] = [];
  let previousDepth = 1;
  function walk(node: AstNode) {
    if (['mdxjsEsm', 'mdxFlowExpression', 'mdxTextExpression'].includes(node.type)) throw new Error('MDX imports, exports, and JavaScript expressions are not supported. Use the curated components with string props.');
    if (node.type === 'heading') {
      if (node.depth === 1 || (node.depth ?? 2) > 3) throw new Error('Use level 2 or 3 headings; the page provides the title.');
      if ((node.depth ?? 2) > previousDepth + 1) throw new Error('Do not skip heading levels.');
      previousDepth = node.depth!;
      const title = nodeText(node);
      const id = toId(title);
      if (!id || ids.has(id)) throw new Error(`Duplicate or empty heading ID: ${id}`);
      ids.add(id);
      node.data = { ...node.data, hProperties: { id, tabIndex: -1 } };
      if (node.depth === 2) chapters.push({ id, title });
    }
    if (node.type === 'image' || node.type === 'imageReference') throw new Error('Use ProductImage with dimensions, caption, and alt text instead of Markdown images.');
    if (node.url) { validateLink(node.url); if (node.url.startsWith('#')) anchors.push(node.url.slice(1)); }
    if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
      if (!componentNames.includes(node.name as typeof componentNames[number])) throw new Error(`Unknown component: ${node.name}. Allowed: ${componentNames.join(', ')}`);
      const props: Record<string, string> = {};
      for (const attr of node.attributes ?? []) {
        if (attr.type !== 'mdxJsxAttribute' || typeof attr.value !== 'string' || !attr.name || attr.name.startsWith('on') || ['style', 'id', 'dangerouslySetInnerHTML'].includes(attr.name)) throw new Error('Use named string props only; scripts, arbitrary IDs, and inline styles are not supported.');
        props[attr.name] = attr.value;
        if (attr.name === 'href') validateLink(attr.value);
      }
      const required: Record<string, string[]> = { Decision: ['title', 'why', 'tradeoff'], Step: ['title'], Evidence: ['title'] };
      for (const name of required[node.name!] ?? []) if (!props[name]?.trim()) throw new Error(`${node.name} requires ${name}.`);
      if (['ProductImage', 'ArchitectureDiagram'].includes(node.name!)) {
        if (!props.src || !props.alt?.trim() || !props.caption?.trim() || !/^[1-9]\d*$/.test(props.width ?? '') || !/^[1-9]\d*$/.test(props.height ?? '')) throw new Error(`${node.name} requires src, alt, caption, width, and height.`);
        validateAsset(props.src, publicRoot);
        if (node.name === 'ArchitectureDiagram' && !props.description?.trim()) throw new Error('ArchitectureDiagram requires a meaningful description.');
      }
      if (node.name === 'DemoEmbed' && (!props.href || !props.title)) throw new Error('DemoEmbed requires href and title.');
      if (node.name === 'Evidence') {
        if (!['verified', 'not-run', 'unconfirmed'].includes(props.status)) throw new Error('Evidence status must be verified, not-run, or unconfirmed.');
        if (props.status === 'verified' && (!props.href || !props.result)) throw new Error('Verified evidence requires a source href and an actual result.');
      }
    }
    for (const child of node.children ?? []) walk(child);
  }
  walk(tree);
  for (const anchor of anchors) if (!ids.has(anchor)) throw new Error(`Unknown heading anchor: #${anchor}`);
  return chapters;
}

export function remarkStudyHeadings() {
  return (tree: unknown) => { inspectTree(tree as AstNode, defaultPublic); };
}

export function parseStudy(raw: string, publicRoot = defaultPublic): Study {
  const { data, content } = matter(raw);
  const metadata = caseStudySchema.parse(data);
  if (metadata.cover) validateAsset(metadata.cover, publicRoot);
  const tree = unified().use(remarkParse).use(remarkMdx).parse(content) as AstNode;
  const chapters = inspectTree(tree, publicRoot);
  if (!chapters.length) throw new Error('A case study needs at least one level 2 heading.');
  return { ...metadata, content, chapters };
}

export function readStudies(root = defaultRoot, publicRoot = defaultPublic): Study[] {
  if (!fs.existsSync(root)) return [];
  const seen = new Set<string>();
  const studies = fs.readdirSync(root, { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => {
    const file = path.join(root, entry.name, 'index.mdx');
    try {
      const study = parseStudy(fs.readFileSync(file, 'utf8'), publicRoot);
      if (seen.has(study.slug)) throw new Error(`Duplicate slug: ${study.slug}`);
      seen.add(study.slug);
      return study;
    } catch (error) { throw new Error(`${entry.name}/index.mdx: ${error instanceof Error ? error.message : String(error)}`); }
  });
  return studies.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function visibleStudies(studies: Study[], mode = process.env.NODE_ENV): Study[] {
  return studies.filter(study => !study.draft || mode === 'development');
}
export function getStudies(): Study[] { return visibleStudies(readStudies()); }
export function getStudy(slug: string): Study | undefined { return getStudies().find(study => study.slug === slug); }
