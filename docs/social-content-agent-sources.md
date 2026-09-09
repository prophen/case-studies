# Social Content Agent: content provenance

Reviewed September 8, 2026. Local source: `C:/Users/admin/Development/social-content-agent`. Clean source checkout at `c68bd8d2f28480145c75fcebc7961bc2f97a08d5`. No application source edits or live data mutations were made.

## Owner account incorporated

Nikema described building it to start working with AI as an engineer and to meet a need for a social content agent. The original expectation was an agent that could create content and post to a social channel; the first-project scope was overly ambitious, and the resulting workflow became a starting point for building with AI integrated. The opening and closing paragraphs paraphrase those statements. Do not infer a deliberate original plan to defer publishing.

## Source evidence

Additional owner clarification: the first version was built with guidance from Perplexity, and Nikema did not write any of the code. This is now stated explicitly in the case study. Do not attribute code authorship or independent implementation of the inspected safeguards to Nikema. The precise guided workflow and personal learning still need the owner's account.

The owner further clarified that Perplexity supplied code and instructions for setting up Supabase and Vercel. The build-process section now records that concrete workflow. Troubleshooting, independent decisions, and lessons have not yet been described.

Subsequent learning reflection: this was the owner's first real Next.js app, through which they learned about Next.js structure and client/server separation. They have since moved to coding with Codex and their Hermes coding-bot. Their stated next goal is a better understanding of the code and confidence making additions independently. These reflections are now included in the closing section. Do not attribute the first version to those later tools or turn the independence goal into an already-achieved capability. No specific troubleshooting anecdote was recalled, so none was added.

- `package.json`: Next.js, React, TypeScript, OpenAI SDK, Supabase.
- `app/api/generate-draft/route.ts`: authentication, topic validation, stored brand voice, Responses API, 10/hour count-then-record quota. Concurrent-request enforcement is not atomic.
- `lib/brandVoiceStore.ts`: per-user persistence and default voice fallback.
- `lib/drafts.ts`: changed content revokes approval and schedule; approval and future scheduling gates; simulated due-draft publisher; separate state and event writes.
- `app/api/jobs/publish-due-drafts/route.ts`: bearer-secret gate, GET and POST handlers.
- `supabase/migrations/`: ownership policy definitions. The draft-creation migration lacks `approved_at` even though the application uses it. Live schema was not inspected.
- `vercel.json`: `0 17 * * *` (daily 17:00 UTC), not the every-five-minutes README example. Live cron operation was not verified.
- `npm test`: freshly run, 84 tests passed across 8 files, 31.77 seconds. Supabase and OpenAI mocked at their module boundaries. This does not verify real model outputs, deployed behavior, database integration, or live RLS enforcement.

Source repository link was taken from the configured Git remote and returned HTTP 200. Implementation citations are pinned to the inspected commit. The linked video page returned HTTP 200 but generic YouTube metadata; playback and captions were not reviewed. It appears as an explicitly qualified README link, not verified demo evidence.

## Image provenance

- `draft-dashboard.png`: retrieved from the existing README URL `https://github.com/user-attachments/assets/24ae27e1-0f75-4498-96d8-ef40d7dc64d4`; 1802 × 1503. Visually inspected. Historical draft library screen, with simulated publication labels.
- `generated-draft.png`: retrieved from `https://github.com/user-attachments/assets/9309727d-f64d-4aa9-9dec-7a5d5e3e487c`; 1802 × 1260. Visually inspected. Existing new-draft/editor screen, not a fresh capture of the current deployment.
- `architecture.svg`: new source-derived diagram. Labeled as reconstructed, not a product screenshot or live infrastructure verification.

The local demo thumbnail was inspected and found to be an illustration; it was not used as product imagery. No AI-generated product screen is presented as evidence.

## Still awaiting owner input

The owner supplied `https://social-content-agent-pi.vercel.app` as the deployed application URL. It is now the live project link and the project status is Deployed. The web tool could not open the URL, so deployment functionality has not been independently checked. Deployment does not change the simulated-publishing scope or the case study's draft status.

Personal reasoning behind specific implementation decisions, exact role and AI/tool collaboration, any desired timeline, final wording, intended next iteration, and any live deployment/demo review. Keep `draft: true` and `evidenceReviewed: false` until final owner review.

This source review updates the content-readiness statements in the original site verification report: source and two existing screenshots are now available and the isolated project tests have now been run. Live integration remains unverified.


## Updated portfolio verification

September 9 clarification: the owner confirmed that the hosted database already has approved_at. The discrepancy was in checked-in migration history. The migration work is now committed at 6798cb0, and the local branch matches its origin/main tracking reference. The earlier description below records its initially uncommitted state. No hosted SQL was applied by this review, and existing hosted timestamp triggers have not been inspected. README, migration guidance, and case-study copy now reflect this distinction.

Follow-up maintenance after the source review: `social-content-agent/supabase/migrations/20260909010000_complete_draft_timestamps.sql` now adds nullable approved_at and a drafts updated_at trigger. This is an uncommitted local change after the pinned source snapshot, not part of c68bd8d or proof of a deployed schema change. Seven PGlite tests run real SQL against fresh and upgraded in-memory PostgreSQL databases with minimal Supabase auth substitutes. All 91 application tests, lint, and typecheck passed. The live database remains unchanged. The case-study note now distinguishes this follow-up fix from the original source-review finding.

After integrating these assets and content, the portfolio tests passed (22 tests), lint passed, the production build passed, and all 9 browser checks passed in 34.2 seconds. Browser checks include actual image loading, responsive layouts, axe scans, keyboard navigation, and production draft exclusion. The new homepage screenshot was visually reviewed. Source checkout remained clean and matched origin/main.
