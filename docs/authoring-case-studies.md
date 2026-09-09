# Adding and maintaining a case study

1. Create `content/case-studies/<slug>/` and copy `content/templates/case-study.mdx` into it as `index.mdx`. Choose a unique lowercase hyphenated slug.
2. Fill in project, title, summary, and an explicit `draft: true`. Add optional role, stack (a YAML list), timeline, projectStatus, scope, order, and featured only when useful and confirmed. Never infer project maturity from evidence status.
3. Put real media in `public/case-studies/<slug>/`. Add `cover`, `coverAlt`, `coverWidth`, and `coverHeight` to frontmatter. `cover` must start with `/case-studies/`. Draft media in public remains addressable by URL; do not put private or sensitive files there.
4. Write level-two headings for chapters and level-three subheadings. The loader derives heading IDs and the navigation automatically. Duplicate IDs and broken local heading anchors are errors. Do not add a level-one heading.
5. Compose the standard components below. Props use quoted strings, including dimensions. Imports, exports, JavaScript expressions, arbitrary HTML, inline styles, and unknown components are rejected. MDX is trusted local authoring material, never an upload or remote feed.
6. Run `npm run validate:content`, then preview with `npm run dev`. Check narrow and wide layouts. Run the checks listed in README. No route or CSS changes are needed to add a study.
7. Review claims, imagery, links, alt text, scope, and copy with the owner. Set `evidenceReviewed: true` and then `draft: false` only when approved. Published metadata requires a real cover. Production must be rebuilt after content changes.
8. Configure the confirmed canonical origin through `SITE_URL` and request publication separately. No deployment is part of local authoring.

## Components

`Callout title="Scope"` wraps a scope note. `Decision title="..." why="..." tradeoff="..."` wraps supporting evidence in a native disclosure. `WorkflowSteps` contains `Step title="..."` children. `ResultsOrLearnings` wraps authentic outcomes and limitations.

```mdx
<ProductImage src="/case-studies/your-project/review.png" alt="Review page showing an edited draft awaiting approval" caption="The review step in the actual application." width="1440" height="900" />
```

Use `ImageGallery` to group ProductImage elements. Use `ArchitectureDiagram` with the same image props plus `description="..."` for a meaningful adjacent text equivalent. Use the actual intrinsic image dimensions. Markdown image syntax is rejected to keep alt text, captions, and dimensions explicit.

```mdx
<Verification>
  <Evidence title="Approval transition" status="unconfirmed">Awaiting source review.</Evidence>
</Verification>
```

Evidence status is `unconfirmed`, `not-run`, or `verified`. Verified entries require `href` to real evidence and a `result` describing an actual finding. Do not turn a site build result into a claim about the project described by the study.

`DemoEmbed href="https://..." title="Watch the walkthrough"` renders a plain link, with no autoplay or third-party script. Ensure the destination has captions or a transcript. Omit the component when no genuine demo exists.

## Optional proof and project metadata

Frontmatter `links` may contain `live`, `source`, `demo`, and `writeup` using http(s) URLs. Absent fields produce no controls. Unknown metadata fields fail validation so typos do not silently hide content.

Do not copy the Social Content Agent concept graphic for an unrelated study. Studies without a cover show only a simple draft note locally. Published studies require their own real image.

The unit suite creates a temporary second study and asset, loads it through the same content model, checks production inclusion, and removes the fixture. No invented second project is added to the actual portfolio.
