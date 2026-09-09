# Start here — Nikema case-study site handoff

## The design decision

**Build the quieter blue Engineering Field Notes version in `sketches/approved/`.** Nikema preferred it over the later expressive version. The latter is archived and is NOT the implementation target.

This package is a design/requirements handoff, not a production app or deployment authorization.

## Read in this order

1. `PRD.md` — scope, design, components, content model, acceptance criteria, and missing inputs.
2. `sketches/approved/homepage.png` and `case-study-full.png` — chosen visuals.
3. `sketches/approved/index.html` and `case-study.html` — linked interactive sketches. Double-click `index.html`; no server or build is required.
4. `sketches/approved/components.png` — readable detail close-up.
5. `CODEX-PROMPT.md` — paste this into Codex after selecting the intended project workspace.

## Package map

- `sketches/approved/`: selected homepage and full case-study page; relative links work offline. Writing links intentionally lead to nikema.dev.
- `sketches/archive/initial-directions/`: original three directions; reference only.
- `sketches/archive/expressive-not-selected/`: later experiment, explicitly NOT selected.
- `MANIFEST.json`: file inventory, byte sizes, and SHA-256 hashes for integrity verification. Manifest excludes itself.

Sketches are self-contained HTML with inline CSS and JavaScript, no external frontend dependencies. Do not treat their illustrative product UI as actual screenshots. The proof buttons in the selected preview open explanatory dialogs; production should omit missing links instead.

## Important boundaries

- Separate case-study site, not a nikema.dev migration.
- Next.js + TypeScript + local MDX; reusable components and documented authoring workflow.
- First real study: Social Content Agent. Publishing is simulated in the described version.
- No real source/demo/deployment links or project media are supplied here. Architecture and safeguards in the sketches are proposed narrative, not verified implementation facts.
- Build may progress locally with visibly draft content, but public-release readiness depends on real evidence and owner approval.
- No repo creation, push, deployment, domain changes, or edits to unrelated apps are authorized by this package.

## Using with Codex

Extract the ZIP. Open/select the intended app workspace in Codex. Make this extracted handoff folder available in that workspace, or provide Codex its exact path. Paste `CODEX-PROMPT.md`. Codex does not automatically inherit the Discord conversation.

Retain archived alternatives only as context; `PRD.md` and `sketches/approved/` take precedence.
