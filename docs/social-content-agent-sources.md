# Social Content Agent: content provenance

## Publication approval — September 9, 2026

After the final copy review and live verification, the owner explicitly requested publication. The study now has `draft: false` and `evidenceReviewed: true`, making it eligible for production routes, homepage listing, and sitemap inclusion. This approval does not change the documented limits of the technical checks. Earlier draft-status notes below describe previous review stages.

## Account-isolation check — September 9, 2026

The owner signed into their second account (B). Its library was empty and did not list account A's disposable draft `4537c072-ecf9-48c7-a381-690e087f8eb4`. Opening that exact URL in a fresh tab returned Draft unavailable / Draft not found. Saving a changed test string from A's previously opened editor returned Save failed: Draft not found. Refreshing its activity showed no events. A service-role read limited to the two test IDs confirmed A's original content was unchanged and both test drafts have different owner IDs.

B's own draft was successfully created through the UI: `6630f41e-0c78-483d-989f-c9e6abb8be15`, topic `Disposable account-isolation verification B — 2026-09-09`. After the owner signed back into A, opening B's exact URL in a fresh tab also returned Draft unavailable / Draft not found. A fresh tab could still open A's own draft, with the original content and only its creation event.

The retained B editor had been navigated to the library during the account switch, so the reverse-direction stale-editor save was not exercised. Do not claim both-direction write coverage. Both accounts successfully accessed their own test drafts; the two owner IDs were independently confirmed different. User-entered sign-ins restored working sessions, but signup, password recovery, and other authentication paths were not tested.

A final service-role read confirmed both test contents unchanged and both statuses draft. Cleanup removed exactly the two disposable IDs after checking their contents and test-topic prefix. Follow-up reads found zero matching drafts and zero matching activity events. No test schedules remain.

Observed UI limitation: an already-open editor retains previously loaded draft text after an account switch. Its save was rejected by the server, but the cached content was not cleared automatically. Fresh direct navigation did not expose that content. These are deployed application checks, not a comprehensive direct RLS policy test.

Follow-up fix (committed at 15544e90ef15372c97e22d2a12808d5c2a28331b): `app/components/PrivateSessionBoundary.tsx` wraps both the drafts layout (library, new draft, and editor) and the brand-voice layout. Private pages wait for the initial auth event, unmount on sign-out, and remount when the user identity changes. Same-user token refreshes preserve unsaved work. A revision counter also resets a batched sign-out/sign-in to the same account. Five regression tests exercise the actual draft editor behind this boundary, including a late previous-account response. All 96 application tests, lint, and typecheck passed. The owner subsequently reported pushing the fix and confirmed verification after receiving the two-tab sign-out/account-switch procedure. This is owner-reported live verification, not a second agent-observed browser run. The observations above describe the deployed version before the fix.

## Deployed publisher check — September 9, 2026

A disposable draft (`4fc6c880-e3f3-4350-9134-df2602642201`) was created and approved through the deployed UI, then scheduled for 09:07 America/Los_Angeles (16:07 UTC). A service-role preflight found no existing scheduled drafts; subsequent preflights prevented manually triggering the global job if any other scheduled draft appeared.

- Authenticated POST to the deployed publisher at 16:06:28 UTC returned HTTP 200 and publishedCount 0 before the due time.
- Authenticated POST at 16:07:28 UTC returned HTTP 200 and publishedCount 1, with only the test ID.
- Authenticated GET at 16:07:54 UTC returned HTTP 200 and publishedCount 0. The test record had status published and exactly one draft_published event, alongside creation, approval, and scheduling events.
- Reopening the UI showed the simulated published record, read-only text, and the publication activity event.
- Cleanup deleted only the exact test ID and topic through the database API; one record was removed and zero test events remained.

These results verify manual execution of the deployed job before and after a due time and a sequential repeat. They do not verify Vercel's automatic daily trigger, overlapping runs, or failure recovery. Service-role reads here are verification of job effects, not proof of user-facing row-level security. No social-network posts were sent.

The subsequent account-isolation check and cleanup are recorded above.

## Live workflow check — September 9, 2026

The historical review notes below are superseded for the specific live behaviors tested here. Browser verification used https://social-content-agent-pi.vercel.app in an existing signed-in session; fresh sign-in was not exercised.

- One real Generate with AI request returned editable text for a clearly labeled disposable workflow test.
- Create draft saved record `417d95ab-31cc-45ef-bee6-441d6d97a788` and showed a creation event.
- Approval succeeded. Scheduling for September 10 at noon displayed that same local time and added approval and scheduling events.
- Editing the scheduled text and saving returned the record to draft and removed the pending schedule. Navigating to the library and reopening the record confirmed the edited text, draft status, and four activity events persisted.
- The disposable record was deleted afterward. The library count fell from 14 to 13 and the test item was absent. No test schedule remains.

This verifies a single-user deployed workflow through the UI, not every integration property. At this stage, fresh sign-in, brand-voice changes, cross-user access, concurrency, quota boundaries, timestamp-trigger correctness, and background-job execution were untested. Later publisher and account checks are recorded above. The UI displayed minute-resolution timestamps, so this check cannot establish automatic updated_at behavior. Existing published records are not evidence that this review exercised the publisher. No social-network post was sent, and no hosted SQL or deployment configuration was changed.

The case-study evidence and architecture caption now distinguish these live results from the remaining checks. The case study remains a draft pending final owner review.

Reviewed September 8, 2026 against a local checkout of the social-content-agent source. Clean source checkout at `c68bd8d2f28480145c75fcebc7961bc2f97a08d5`. No application source edits or live data mutations were made.

## Owner account incorporated

Nikema described building it to start working with AI as an engineer and to meet a need for a social content agent. The original expectation was an agent that could create content and post to a social channel; the first-project scope was overly ambitious, and the resulting workflow became a starting point for building with AI integrated. The opening and closing paragraphs paraphrase those statements. Do not infer a deliberate original plan to defer publishing.

## Source evidence

Additional owner clarification: the first version was built with guidance from Perplexity, and Nikema did not write any of the code. This is now stated explicitly in the case study. Do not attribute code authorship or independent implementation of the inspected safeguards to Nikema. Later owner clarifications below supply the guided workflow and personal learning.

The owner further clarified that Perplexity supplied code and instructions for setting up Supabase and Vercel. The build-process section now records that concrete workflow. The owner did not recall a specific troubleshooting example; the learning reflection follows below.

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

## Publication readiness

The deployed URL, first-build role, tool collaboration, learning, and next personal goal have been supplied by the owner. Live workflow, manual publisher, account-access checks, and owner verification of the session fix are recorded above. The linked walkthrough video remains unreviewed. Keep the study in draft until the owner approves publication.

Final editorial pass: updated the test count to 96, linked the session fix to its commit, grouped follow-up findings under What testing changed, and removed stale pending-check notes. The original 84-test and later 91-test results below are historical checkpoints.

## Updated portfolio verification

September 9 clarification: the owner confirmed that the hosted database already has approved_at. The discrepancy was in checked-in migration history. The migration work is now committed at 6798cb0, and the local branch matches its origin/main tracking reference. The earlier description below records its initially uncommitted state. No hosted SQL was applied by this review, and existing hosted timestamp triggers have not been inspected. README, migration guidance, and case-study copy now reflect this distinction.

Follow-up maintenance after the source review: `social-content-agent/supabase/migrations/20260909010000_complete_draft_timestamps.sql` now adds nullable approved_at and a drafts updated_at trigger. This was subsequently committed at 6798cb0 after the pinned source snapshot; it is not part of c68bd8d or proof of a deployed schema change. Seven PGlite tests run real SQL against fresh and upgraded in-memory PostgreSQL databases with minimal Supabase auth substitutes. All 91 application tests, lint, and typecheck passed. The live database remains unchanged. The case-study note now distinguishes this follow-up fix from the original source-review finding.

After integrating these assets and content, the portfolio tests passed (22 tests), lint passed, the production build passed, and all 9 browser checks passed in 34.2 seconds. Browser checks include actual image loading, responsive layouts, axe scans, keyboard navigation, and production draft exclusion. The new homepage screenshot was visually reviewed. Source checkout remained clean and matched origin/main.
