# PRD — Nikema’s designed case-study site

## 1. Decision and source of truth

**Chosen direction: the quieter blue Engineering Field Notes design.** Build from `sketches/approved/index.html` and `sketches/approved/case-study.html`, with their adjacent screenshots. Nikema compared a more expressive version and explicitly preferred this previous version. Do not use the expressive variant’s serif headings, cobalt hero, decorative illustration, rotated screens, or horizontal desktop chapter navigation. Archived alternatives are historical context, not competing specifications.

The choice approves a visual direction, not every sentence of draft copy or every technical claim. The sketches are disposable standalone HTML, not production source. Recreate their appearance using maintainable React components; do not carry forward their accumulated CSS overrides.

## 2. Product objective

Create a separate, intentionally designed portfolio of substantive engineering case studies. Help hiring managers and technical readers understand what Nikema builds, how it works, why choices were made, and what evidence supports the account. Target web developer, developer advocate, and AI engineering opportunities without overstating project maturity.

Keep `nikema.dev` as the existing writing/home-base site. Link to it; do not migrate or duplicate its blog. The new site’s domain and repository are not yet selected.

### Success criteria
- A visitor can identify Nikema’s focus and enter the featured case study from the homepage.
- A reader can scan the problem, workflow, architecture, decisions, limitations, and proof without reading every paragraph.
- Nikema can add another study from a documented MDX starter without styling a new page or editing route code.
- One complete, evidence-backed study is sufficient for the first public release; no empty project grid or fabricated projects.

No numerical business impact targets or existing analytics are assumed.

## 3. Scope

### MVP
- Homepage at `/` with concise positioning, featured study, approach, and external writing link.
- Reusable detail route `/case-studies/[slug]` with desktop chapter navigation and compact mobile section links.
- Local MDX authoring with typed, validated metadata and a small curated component library.
- Real screenshots, descriptive captions, optional demo, architecture, decision/tradeoff blocks, explicit scope, and evidence status.
- Responsive, accessible design; per-page metadata; sitemap and robots configuration for the eventual public site.
- README, authoring guide, starter content, and repeatable checks.

### Not in scope
- CMS, admin editor, login, database, Supabase connection, search, analytics, contact form, agent backend, social publishing, or an AI chat widget.
- Rebuilding the Social Content Agent itself.
- Blog migration, speculative project listings, elaborate motion, or a redesign of the chosen visual direction.
- Creating a remote repo, pushing, public preview deployment, production deployment, domain/DNS changes, or modifying another app without explicit approval.

## 4. Content and evidence boundaries

First case study: **Social Content Agent**, with working title **The boundary between generation and action**. The story concerns AI-assisted drafting, human editing/review, approval, scheduling, and activity history. Prior conversation describes social publishing as simulated; retain this boundary until the owner provides contrary verified evidence.

The handoff does NOT contain a verified project URL, repository URL, video file/link, real screenshots, actual architecture, exact role/timeline, or command results from that project. Earlier discussion mentioned a deployment and a short walkthrough, but these assets were not independently inspected during sketching. Request them; never guess their locations or mark them verified.

Sketch safeguards, architecture, decision rationale, and future-work prose are proposed narrative. Check them against the code and owner’s account before presenting them as implemented facts. Do not infer a live publishing integration from scheduling UI. Do not call the project Composio unless the actual project evidence warrants that name.

### Draft versus public content
- Default new studies to `draft: true`.
- Local development may render drafts with a visible draft banner.
- Production builds exclude draft studies from pages, homepage entries, metadata indexes, and sitemap. Direct draft URLs must not render in production.
- If no study is publishable, the local preview can show the draft, but report public content readiness as blocked. Do not silently publish placeholders to fill the page.
- Hide absent proof links and optional demo blocks rather than shipping disabled buttons or placeholder modals. The sketch’s proof dialog is only a design-preview affordance.
- No fake metrics, fake timestamps, invented test results, made-up URLs, or stock images presented as product screenshots.
- Remove sketch-only component annotations and design-preview footers from the production UI; retain legitimate project scope disclosures.

## 5. Information architecture and behavior

### Homepage
Match the approved HTML: wordmark, Selected work/Writing/Approach navigation; large sans-serif positioning headline with restrained blue emphasis; short supporting description; featured case study in a split text/image composition; three approach statements; writing callout linking to `https://nikema.dev`.

Use a real screenshot for the featured visual before publication. Render only eligible published studies in production. The section should accommodate additional studies without filler entries. The first release does not need a separate case-study index route.

### Case-study detail
- Hero: title, summary, project facts, available proof links.
- Problem and deliberate scope.
- Ordered workflow; screenshot with caption; optional genuine recorded demo.
- Architecture image/diagram with adjacent accessible text equivalent.
- Technical decisions: decision, rationale, tradeoff, implementation evidence.
- Verification with explicit status and actual evidence.
- Learnings/limitations and next iteration; back to selected work.
- Desktop chapter rail remains visible while reading and never overlaps the footer/content. Mobile uses a visible, keyboard-operable section-link pattern.
- Anchor navigation reaches correct headings; focus and scroll offsets account for any sticky elements.
- Keep native disclosure behavior for supplemental decision evidence when useful.
- All interactive controls must navigate or produce a meaningful accessible state change. No inert production UI.

## 6. Visual system

Approved HTML is the visual reference, not the archived expressive variant. Use screenshots for visual comparison and the HTML for layout/interaction inspection.

### Starting tokens (from chosen sketch)
- Canvas `#f5f7fa`
- Text `#19283c`
- Muted text `#556579`
- Accent/action blue `#2455cc`
- Border `#d5ddea`
- Surface `#ffffff`
- Soft blue section background `#e8eef9`
- Tag background `#e8eefc`

Validate contrast in actual use; tokens alone do not prove accessibility. Use white text on blue primary actions where compliant. Preserve clear hover, active, disabled, and focus states.

### Typography and layout
- Sans-serif body and headings; approved sketch uses Arial/system sans. Monospace is for short labels, workflow markers, and evidence status, not long prose.
- Large but restrained headings; approved desktop homepage headline around 64px and detail headline around 55px, scaled for mobile. Body around 16–19px.
- Desktop content width around 1320px including gutters; detail rail around 175px with roughly 45px gap; comfortable reading measure.
- Low-radius panels (approximately 3–8px), subtle borders, minimal shadows, generous whitespace.
- Avoid serif/italic display type, giant decorative art, rotated panels, excessive pill shapes, full cobalt hero backgrounds, and gradients.
- Responsive layouts must adapt to content, not only one breakpoint. Preserve the visual hierarchy at 390px mobile and 1440px desktop; also test 320px and tablet widths.

## 7. Recommended architecture

Next.js App Router + TypeScript + local MDX. Use current stable compatible dependencies at implementation time and a lockfile; do not guess version numbers from this document. Prefer server-rendered/static content and minimal client JavaScript. No application database is required.

### Suggested paths
```text
src/app/page.tsx
src/app/case-studies/[slug]/page.tsx
src/app/layout.tsx
src/app/globals.css
src/components/site-header.tsx
src/components/case-study-nav.tsx
src/components/case-study/*.tsx
src/lib/case-studies.ts
src/lib/case-study-schema.ts
content/case-studies/social-content-agent/index.mdx
content/templates/case-study.mdx
public/case-studies/social-content-agent/
docs/authoring-case-studies.md
tests/content.test.ts
tests/components.test.tsx
tests/e2e/portfolio.spec.ts
```

For straightforward Next.js asset handling, keep publishable media in `public/case-studies/<slug>/` and reference absolute site paths in MDX. This differs from the early concept of colocating images beside MDX but avoids an unnecessary custom asset loader. Document the content/assets folder pair as the authoring unit.

Load only trusted local MDX with an explicit component allowlist/map; never fetch and execute arbitrary remote MDX. Validate slugs, duplicate IDs, frontmatter, referenced local assets, and external link protocols. Choose the MDX integration after checking current Next.js compatibility.

## 8. Reusable elements

- `CaseStudyHero`: title, summary, contextual project label; single page h1.
- `ProjectFacts`: optional owner-approved role, scope, stack, timeline, status. Omit unknown fields.
- `ProofLinks`: optional validated live/source/demo/write-up URLs; descriptive labels; no placeholder buttons.
- `ProductImage` / `ImageGallery`: source, intrinsic size, required alt text or deliberate decorative designation, caption; responsive sizing.
- `DemoEmbed`: verified source or poster/link, title, accessible fallback, captions/transcript where available; no autoplay.
- `WorkflowSteps`: ordered list of title/description entries; handles narrow screens without horizontal overflow.
- `ArchitectureDiagram`: diagram asset plus meaningful text equivalent, not a generic alt label alone.
- `Decision`: title, decision, why, tradeoff, optional verified evidence links, optional disclosure.
- `Callout`: scope, limitation, or note; information remains understandable without color.
- `Verification`: evidence entries with explicit status, source, optional actual command/date/result. Unknown or not-run is not pass.
- `ResultsOrLearnings`: authentic results only, otherwise learnings; no compulsory metric fields.

Separate content from layout. Reuse the same components across studies; avoid a one-off hardcoded Social Content Agent route.

## 9. Content schema and authoring

Recommended frontmatter contract:
```yaml
slug: social-content-agent
project: Social Content Agent
title: The boundary between generation and action
summary: A human-in-the-loop content workflow.
draft: true
featured: true
order: 1
# Add role, stack, projectStatus, dates, and URLs only after confirmation.
# cover: /case-studies/social-content-agent/cover.png
# coverAlt: Describe the real screenshot here.
```

Validate required strings and slug format; `draft` must be explicit. `featured` defaults false; optional URLs must use http/https. Define duplicate-slug and unknown-component failures clearly. Model verification status separately from project maturity and publication/draft status.

Authoring guide must explain how to:
1. Copy the MDX starter into a new slug directory.
2. Fill in validated metadata and retain draft status while gathering evidence.
3. Add real assets in the paired public directory.
4. Compose the standard components without touching route code or CSS.
5. Preview locally; inspect desktop/mobile; run content validation.
6. Confirm claims and links; switch out of draft only when ready.
7. Request deployment approval separately.

Prove this workflow with a temporary second test fixture; do not publish an invented second project.

## 10. Accessibility and quality

Target WCAG 2.2 AA: semantic landmarks and heading order, skip link, visible keyboard focus, no focus traps, appropriate link/button semantics, meaningful image descriptions, non-color status indicators, sufficient text/control contrast, reduced-motion support, and usable 200% zoom. Avoid unnecessary animation.

Use optimized responsive images with explicit dimensions to avoid layout shift. Defer video/third-party embeds and provide fallbacks. Avoid loading third-party scripts when a plain link suffices. Metadata must use a confirmed canonical base URL; do not ship localhost/example canonical URLs. No secrets or unrelated local paths in client bundles.

## 11. Implementation sequence for Codex

1. Read START-HERE, this PRD, and approved HTML/screenshots. Inspect the selected target workspace before making changes. Confirm the destination if ambiguous; do not overwrite another project.
2. Summarize chosen design, content blockers, and implementation plan. Build only the locally authorized app; no remote operations/deployment.
3. Establish app shell, tokens, semantic layout, and responsive header.
4. Add content schema/loader and tests for valid/invalid metadata, asset references, duplicate slugs, and draft exclusion.
5. Implement reusable case-study components; test disclosures, optional proof links, and content overflow.
6. Build homepage and generic detail route from MDX; start with a visibly draft first study.
7. Obtain real source assets and owner-confirmed narrative. If unavailable, continue local structural work but explicitly report public-release blockers.
8. Compare desktop/mobile browser renders with the approved screenshots; correct visual drift before adding features.
9. Exercise the authoring workflow with a temporary fixture; document it.
10. Run checks and report real results and limitations. Stop before deployment and request explicit approval.

## 12. Acceptance checklist

- [ ] Chosen quieter blue design matched on both pages; no expressive-variant styling substituted.
- [ ] Homepage and generic detail route render and navigate correctly.
- [ ] Desktop rail and mobile section navigation work with keyboard and pointer.
- [ ] New study can be added via MDX + assets without route/layout code changes.
- [ ] Missing optional proof/demo/metadata does not create inert controls or awkward empty panels.
- [ ] Drafts are absent from production routes, homepage, and sitemap; tests verify direct URL exclusion.
- [ ] Real public-ready study uses verified imagery, links, architecture, and claims; simulated-publishing disclosure retained.
- [ ] Unknown verification is not presented as pass; no invented metrics or project evidence.
- [ ] Components are reusable and type-safe; invalid content gets actionable errors.
- [ ] No horizontal overflow at 320, 390, 768, and 1440px, and layout remains usable at 200% zoom.
- [ ] Keyboard navigation, focus, headings, alt text, contrast, and reduced motion reviewed.
- [ ] Production build and agreed tests actually run; exact commands/results recorded.
- [ ] No blog migration, database, auth, remote repo, push, or deployment performed without approval.

Provide package scripts for `lint`, `typecheck`, `test`, `test:e2e`, and `build` (npm is a proposed default, respect an existing lockfile). Expected verification commands are `npm run lint`, `npm run typecheck`, `npm run test -- --run`, `npm run test:e2e`, and `npm run build`; implement the scripts before claiming these commands are available. Unit tests may use Vitest; browser checks may use Playwright. Add an accessibility scan plus manual keyboard/contrast review. Do not invent counts or pass output.

## 13. Handoff verification versus application verification

These sketches were opened in a browser. The approved expanded preview’s homepage-to-study navigation, proof-dialog opening, and decision disclosure were exercised. A browser check reported no horizontal overflow at 390px for both approved pages. That is limited sketch verification, not an accessibility audit or production test suite. No production Next.js application or Social Content Agent code was built/tested as part of this handoff.

## 14. Owner inputs and release blockers

- Destination directory/repository (not provided).
- Final site name/domain and canonical URL (not provided).
- Verified Social Content Agent deployment/source/demo links and real media.
- Confirmed role, stack, dates, architecture, safeguards, and factual narrative.
- Approval of final public-facing copy and deployment.

Do not block ordinary local layout/component work on unavailable public assets, but do block claims of a publish-ready complete case study until the evidence is supplied.
