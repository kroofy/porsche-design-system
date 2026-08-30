1. Done predicate: every TAG_NAME in packages/shared/src/lib/tagNames.ts has a Mitosis .lite.tsx source; Stencil is gone from packages/components; selected targets generate from Mitosis; each public component has before/after pixel-diff 0.
2. Selected Mitosis targets for the pilot: customElement, react, vue, angular. Do not keep Stencil as a compile target if the goal is to delete Stencil.
3. Workers never rebase, never force-push, never run gt. One writer per branch. Coordinator never authors component code.
4. Baseline screenshots of the live Stencil playground before any component rewrite. Do not edit the baseline harness to pass a diff.
5. Pilot p-divider first. No fan-out until Mitosis compiles it and a screenshot compare exists. If Mitosis cannot express shadow DOM, JSS attachComponentCss, or breakpoint props, return a dead-end report instead of faking it.
6. Verification bar: live screenshot of the real component, not compile-success. Ledger verdicts use live-ui-verified or verifier-failed.
7. Commit without asking. Decision log at .audit/orchestrate/stencil-to-mitosis/decisions.tsv. Timebox: if still blocked after a few hours, stop and write why.
8. No production deploys. No force-push to main. Escalate only irreversible actions or a program-level dead end.
9. STOP: Mitosis customElement cannot replace PDS Stencil at pixel-diff 0. No further migrate units. Leave the probe as evidence.
10. customElement is dead for PDS parity. One remaining fitness unit: Mitosis Lit webcomponent target for p-divider. Same dead-end criteria. Viewport must make breakpoint m active. Run a real pixel-diff against the Stencil baseline, not two unrelated crops. Do not fan out migrate units until Lit is live-verified or also fails.
11. Mitosis target is lit, not webcomponent (webcomponent aliases customElement). PDS m breakpoint is 1000px. Do not fan out 74 components until the migrate lever exists: cssText stylesheet pattern, no JSX fragments, lit/decorators.js alias.
