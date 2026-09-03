GOAL         Prove whether Mitosis Lit webcomponent output can replace Stencil for p-divider at PDS parity.
SCOPE        May write: packages/mitosis-probe-lit/**, .audit/orchestrate/stencil-to-mitosis/reports/fitness-lit.md, /opt/cursor/artifacts/mitosis_lit_divider_after.png, /opt/cursor/artifacts/divider_pixel_diff.png. May not write: packages/components/**, packages/mitosis-probe/** (that tree is frozen evidence), framework wrappers.
CONTEXT      customElement probe failed: no JSS attachComponentCss, no breakpoint direction, HCM invisible, no attribute reactivity. Report: .audit/orchestrate/stencil-to-mitosis/reports/fitness-divider.md. Stencil baseline: /opt/cursor/artifacts/stencil_divider_before.png and .audit/orchestrate/stencil-to-mitosis/baseline/stencil_divider_before.png. Capture script: .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-divider-baseline.mjs. PDS m breakpoint is 760px; do not test responsive direction at 640px. Playground still at http://localhost:3333/?components=divider.
ACCEPTANCE   mitosis.config.js target is webcomponent (Lit), not customElement, not stencil.
ACCEPTANCE   Live Chromium verification covers shadow, color, direction=vertical, direction breakpoint object at a viewport where m is active (>=760px), attribute change after connect, forced-colors.
ACCEPTANCE   A pixel-diff image exists against the Stencil baseline of the same fixture, or the report states why a same-fixture diff was impossible and still fails the unit.
ACCEPTANCE   Report names each standing-order-5 gap that remains.
VERIFY       mitosis build, then a Playwright/Chromium script. Pixel-diff nonzero is fail.
TIMEBOX      45 minutes. On expiry return partial findings and stop.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components edits, no baseline tamper, no claiming pixel-diff 0 without an image.
REPORT       status, branch, SHA, verdict, commands, live JSON, follow-ups.
STANDING     1. Done predicate: every TAG_NAME has Mitosis .lite.tsx, Stencil gone, selected targets generate, pixel-diff 0.
STANDING     3. Workers never rebase, never force-push, never run gt. One writer per branch.
STANDING     6. Verification bar: live screenshot, not compile-success.
STANDING     customElement is dead for PDS parity. This unit is Lit webcomponent only. Viewport must make breakpoint m active. Run a real pixel-diff. No migrate fan-out until Lit is live-verified or also fails.
