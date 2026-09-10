# MotionBrief live checks — September 9, 2026

Run in the deployed application with the owner's signed-in session and explicit authorization for up to $1 total. Local date: September 9, America/Los_Angeles; recorded timestamps use September 10 UTC.

Test project: `1788999332773-ro34zwzb4`, generated title **Bravery Starts Small**. A new project was used; the photographed Small Brave Moments project was not regenerated or edited. The test project remains available for reproducing the persistence issue.

## Results

- Saved a fresh hamster campaign prompt, then generated a structured brief through the UI.
- Generated one visual with the displayed estimate **$0.006**. The resulting image loaded and remained available after reload.
- Selected pull-back, pan-left, and pan-right and inspected the rendered image's corresponding CSS animation and transform. The default push-in animation was also observed after reload. These are browser preview checks, not a comparison of all four exported camera effects.
- Selected Sarah instead of the default George voice and generated one narration. The displayed estimate was **$0.0038** for “Every tiny peek can become a brave beginning.” The audio element loaded with no error, duration **2.647075 seconds**, and entered playing state.
- Submitted one final render through the UI. Observed queued, copying-to-storage, and ready states. The video loaded with **720 × 1280** dimensions and **5.055667 seconds** duration; playback advanced. Audio intelligibility and frame-by-frame motion fidelity were not assessed.
- Reloaded the project and returned to Export: the same visual, narration, and final MP4 links remained present, and the final video preview loaded again.
- Copy brief showed a success notification, but the browser automation clipboard read was empty. Clipboard delivery is unconfirmed; this does not establish an application defect. File downloads were not checked.

## Failed persistence check

After generating the brief, changed the project title to “MotionBrief live check — September 9” and headline to “One small peek. One brave beginning.” Clicked Save. On the repeat attempt, explicitly observed “Brief saved / Your editable concept is synced in DeepSpace.” Reloading restored both fields to **Bravery Starts Small**. The first attempt reloaded while saving; only the repeat with the confirmed success notification establishes the failure.

Likely cause from the local source: `src/pages/(app)/home.tsx`, around lines 599–627, reapplies a succeeded brief job whenever the in-memory `appliedBriefJob` ref has not seen the job ID. On a fresh mount that ref resets. The effect spreads the generated brief over the draft and calls `putConfirmed`, which can overwrite subsequent saved edits. This is a source-based diagnosis, not a deployed fix. No MotionBrief code was changed or deployed during this check.

The motion selector returned to Slow push in after reload, although Pan right had been selected before narration/render. A separate confirmed-save reproduction for motion alone was not performed, so it is not classified as a second confirmed defect.

## Timing

The render click was recorded at **00:19:48.546 UTC**; the ready state was observed at **00:20:10.553 UTC**: approximately **22 seconds click-to-observed-ready**. The ledger shows the paid render entry at 00:19:49 and final polling at 00:20:00. These ledger timestamps are not a substitute for exact UI completion time.

`motionbrief-live-timings.json` records start and observed-completion timestamps for the other stages. Those intervals include gaps spent inspecting source and other controls, so they are upper bounds, not provider performance benchmarks.

## Recorded spend and estimate comparison

Read `npx deepspace app usage --json` and retained only entries from this test window in `motionbrief-live-usage.json`. The endpoint is account-wide; attribution uses the four provider calls and their timestamps during this isolated test, rather than an app ID field in the ledger.

- OpenAI: **$0.013689** across two positive entries.
- FAL: **$0.013** currently recorded, versus the button's **$0.006** estimate.
- ElevenLabs: **$0.002925** recorded, below the button's **$0.0038** estimate.
- Shotstack: **$0.0325** recorded. The button said “usage-based,” with no numeric estimate.
- Total at inspection: **$0.062114**, below the approved **$1** budget.

The image charge may not be finally settled. Earlier account entries show $0.013 FAL charges followed by later -$0.0091 adjustments. No adjustment for this new image was visible in either usage read, so final image-estimate accuracy remains unresolved. Do not present a predicted refund as an observed result or treat the current total as a final invoice.

As a pre-render reasonableness check, [Shotstack's published pricing](https://shotstack.io/pricing/) lists $0.30 per minute PAYG and per-second charging. The actual evidence above comes from the DeepSpace usage ledger, not an inference that direct-provider prices equal platform charges.

## Evidence and limits

`public/case-studies/motionbrief/live-check-export.jpg` shows the fresh completed project. Existing case-study cover and workflow screenshots still depict Small Brave Moments, from the earlier screenshot walkthrough.

This was one fresh successful generation/render run, with a reproducible failure to retain edited brief fields after reopening. It does not establish multi-user isolation, concurrent-job behavior, or broad production reliability. The follow-up below resolves the reproduced persistence defect; the case study remains a draft pending owner review.

## Persistence fix and live retest

The owner requested a fix. MotionBrief now stores a generation request ID and an applied-job ID in the project. Existing populated briefs are adopted without replaying historical generated text, new requests can recover after reopening, and media completions patch only their own fields. All 50 unit tests (including eight new regressions), type checking, lint, and the production build pass.

The fix was deployed as `rel_01M24C5VGMYJS8JSMXE3B6JRYF`; edge and data plane were confirmed serving. The GitHub-source release shipped the local working tree, which has not yet been committed or pushed.

Live retest on the same disposable project:

1. Saved the original failing title/headline edits, waited for the save confirmation, and reloaded. Both survived.
2. Requested one new brief generation and reloaded while it was pending. The new result, Bravery Begins With a Peek, was recovered after reopening.
3. Changed the title to “MotionBrief persistence check — passed” and headline to “One small peek. Saved for the next visit.” Saved and reloaded. Both remained intact.

The screenshot `public/case-studies/motionbrief/live-check-persistence-fixed.jpg` records the final persisted fields. No additional image, voice, or render requests were made during the fix verification.

The refreshed test-window ledger includes a **-$0.0091 FAL adjustment**, bringing the image's net recorded cost to **$0.0039**, below the **$0.006** estimate. The extra brief-generation check recorded **$0.013923**. The total for the original checks plus fix verification is now **$0.066937**, still below the owner's $1 limit. The earlier $0.062114 figure was the pre-adjustment snapshot, not the final test-window total.
