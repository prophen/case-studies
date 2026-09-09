# Nikema / Field notes

A local Next.js + TypeScript + MDX case-study portfolio in the approved **builder’s studio with notebook touches** direction: warm paper, ink blue, expressive sans-serif type, and small handwritten annotations.

## Run locally

Requires Node 22.18+ and npm. Run `npm ci`, then `npm run dev` and open http://127.0.0.1:5188. Fonts are bundled locally; there are no third-party embeds or required API keys.

## Verification

- `npm run validate:content`
- `npm run lint`
- `npm run typecheck`
- `npm run test -- --run`
- `npm run build`
- `npx playwright install chromium` (one-time browser setup)
- `npm run test:e2e` (run after build; starts a production server on 5189 and reuses/starts development on 5188)

The browser suite covers both pages at 320, 390, 768, and 1440px, axe accessibility checks, keyboard navigation and disclosures, enlarged text, reduced motion, and actual production draft exclusion. Screenshots are saved in `docs/screenshots/`.

## Add a study

See [the authoring guide](docs/authoring-case-studies.md) and `content/templates/case-study.mdx`. New studies use the generic `/case-studies/[slug]` route.

## Publication status

The first Social Content Agent study is intentionally draft. Its text is proposed narrative, its workflow graphic is a labeled concept, and publishing is simulated. No project source, real screenshots, demo, architecture, role, timeline, or implementation results have been verified by this site work.

Drafts render only in development. Production returns 404 for their URLs and excludes them from the homepage and sitemap. Publication requires reviewed evidence and a real cover. No canonical domain is invented: set `SITE_URL` to an owner-confirmed HTTPS origin only before an approved release. With no origin configured, the site requests no indexing and emits an empty sitemap.

No remote repository or deployment has been created.

## Handoff and design history

The original `START-HERE.md`, `PRD.md`, `CODEX-PROMPT.md`, and `sketches/` are retained unchanged. The later conversation approval supersedes the original cool-blue visual direction; see [design decision](docs/design-decision.md). Their original manifest describes the original handoff files only.

Implementation references: [MDX evaluate](https://mdxjs.com/packages/mdx/#evaluatefile-options) and [Next.js route generation](https://nextjs.org/docs/app/api-reference/functions/generate-static-params). Only repository-local, validated MDX is compiled on the server; no remote MDX is accepted.
