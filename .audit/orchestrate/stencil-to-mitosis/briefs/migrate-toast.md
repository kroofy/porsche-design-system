GOAL         Migrate p-toast to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/Toast.lite.tsx and matching harness only, .audit/orchestrate/stencil-to-mitosis/reports/migrate-toast.md, /opt/cursor/artifacts/mitosis_lit_toast_after.png, /opt/cursor/artifacts/toast_pixel_diff.png, a baseline under .audit/orchestrate/stencil-to-mitosis/baseline/. May not write: packages/components/**, packages/mitosis-probe/**, existing *.lite.tsx except Toast, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Table-cell just passed byte-identical in-parent swap. Playground: http://localhost:3333/?components=toast. Stencil: packages/components/src/components/toast/. Keep p-toast-item and sibling p-button as Stencil. Copy light-DOM children on in-card swap. Card default is an empty p-toast; compare that closed/empty state unless you open messages on both sides the same way. Pause toast motion with --p-animation-duration: 0s. You are the only writer in packages/mitosis-probe-lit.
ACCEPTANCE   Toast.lite.tsx compiles with target lit and useShadowDom true. rg my-fragment on Toast.ts is empty. Live card swap pixel-diff 0. Report written.
VERIFY       Recipe pixel-diff section. Control Stencil vs baseline 0 first.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
