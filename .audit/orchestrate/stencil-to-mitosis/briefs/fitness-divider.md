GOAL         Prove whether Mitosis can replace Stencil for p-divider: compile one .lite.tsx to customElement, react, vue, angular; render the customElement; report gaps vs current Stencil p-divider.
SCOPE        May write: packages/mitosis-probe/**, .audit/orchestrate/stencil-to-mitosis/reports/fitness-divider.md. May not write: packages/components/**, packages/components-js/**, any existing wrapper, baseline screenshots.
CONTEXT      Current divider: packages/components/src/components/divider/divider.tsx (shadow DOM, attachComponentCss + JSS, color + breakpoint direction, renders <hr>). Styles: divider-styles.ts, divider-utils.ts. Mitosis docs: static JSX subset, targets include customElement, webcomponent, react, vue, angular, and also stencil (do not use stencil as a target). Playground live at http://localhost:3333/?components=divider.
ACCEPTANCE   A mitosis.config.js exists under packages/mitosis-probe.
ACCEPTANCE   A Divider.lite.tsx compiles with @builder.io/mitosis to customElement, react, vue, angular without using the stencil target.
ACCEPTANCE   The customElement output is loaded in a browser and a screenshot is saved under /opt/cursor/artifacts/mitosis_divider_after.png.
ACCEPTANCE   Report names each PDS divider capability Mitosis cannot express (shadow, JSS attachComponentCss, breakpoint props, prop validation).
VERIFY       Run mitosis build in packages/mitosis-probe. Open the generated custom element in Chrome or Playwright. Screenshot it. Do not claim parity without an image.
TIMEBOX      45 minutes. On expiry return partial findings and stop.
FORBIDDEN    no gt, no rebase, no force-push, no edits under packages/components, no baseline tampering, no faking a compile.
REPORT       status, branch, head SHA, verdict, commands run, deviations, follow-ups. Paste compile errors in full.
STANDING     1. Done predicate: every TAG_NAME in packages/shared/src/lib/tagNames.ts has a Mitosis .lite.tsx source; Stencil is gone from packages/components; selected targets generate from Mitosis; each public component has before/after pixel-diff 0.
STANDING     2. Selected Mitosis targets for the pilot: customElement, react, vue, angular. Do not keep Stencil as a compile target if the goal is to delete Stencil.
STANDING     3. Workers never rebase, never force-push, never run gt. One writer per branch. Coordinator never authors component code.
STANDING     4. Baseline screenshots of the live Stencil playground before any component rewrite. Do not edit the baseline harness to pass a diff.
STANDING     5. Pilot p-divider first. No fan-out until Mitosis compiles it and a screenshot compare exists. If Mitosis cannot express shadow DOM, JSS attachComponentCss, or breakpoint props, return a dead-end report instead of faking it.
STANDING     6. Verification bar: live screenshot of the real component, not compile-success. Ledger verdicts use live-ui-verified or verifier-failed.
STANDING     7. Commit without asking. Decision log at .audit/orchestrate/stencil-to-mitosis/decisions.tsv. Timebox: if still blocked after a few hours, stop and write why.
STANDING     8. No production deploys. No force-push to main. Escalate only irreversible actions or a program-level dead end.
