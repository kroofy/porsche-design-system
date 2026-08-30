GOAL         Capture Stencil p-divider baseline screenshots from the live playground before any rewrite.
SCOPE        May write: .audit/orchestrate/stencil-to-mitosis/baseline/**, /opt/cursor/artifacts/stencil_divider_before.png, a small capture script under .audit/orchestrate/stencil-to-mitosis/scripts/. May not write: packages/**.
CONTEXT      Playground: http://localhost:3333/?components=divider (Stencil watch server already running). Divider source: packages/components/src/components/divider/divider.tsx.
ACCEPTANCE   At least one PNG of the live Stencil divider exists at /opt/cursor/artifacts/stencil_divider_before.png.
ACCEPTANCE   The capture command is written so a later agent can rerun it.
VERIFY       File exists, is a real PNG, and is not a blank or error page. Open it and confirm a horizontal rule is visible.
TIMEBOX      20 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no component source edits, no harness changes that alter how divider looks.
REPORT       status, screenshot paths, command used, whether the rule is visible.
STANDING     1. Done predicate: every TAG_NAME in packages/shared/src/lib/tagNames.ts has a Mitosis .lite.tsx source; Stencil is gone from packages/components; selected targets generate from Mitosis; each public component has before/after pixel-diff 0.
STANDING     2. Selected Mitosis targets for the pilot: customElement, react, vue, angular. Do not keep Stencil as a compile target if the goal is to delete Stencil.
STANDING     3. Workers never rebase, never force-push, never run gt. One writer per branch. Coordinator never authors component code.
STANDING     4. Baseline screenshots of the live Stencil playground before any component rewrite. Do not edit the baseline harness to pass a diff.
STANDING     5. Pilot p-divider first. No fan-out until Mitosis compiles it and a screenshot compare exists. If Mitosis cannot express shadow DOM, JSS attachComponentCss, or breakpoint props, return a dead-end report instead of faking it.
STANDING     6. Verification bar: live screenshot of the real component, not compile-success. Ledger verdicts use live-ui-verified or verifier-failed.
STANDING     7. Commit without asking. Decision log at .audit/orchestrate/stencil-to-mitosis/decisions.tsv. Timebox: if still blocked after a few hours, stop and write why.
STANDING     8. No production deploys. No force-push to main. Escalate only irreversible actions or a program-level dead end.
