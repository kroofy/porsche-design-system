GOAL         Migrate p-toast-item to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/ToastItem.lite.tsx and matching harness only, .audit/orchestrate/stencil-to-mitosis/reports/migrate-toast-item.md, /opt/cursor/artifacts/mitosis_lit_toast_item_after.png, /opt/cursor/artifacts/toast_item_pixel_diff.png, a baseline under .audit/orchestrate/stencil-to-mitosis/baseline/. May not write: packages/components/**, packages/mitosis-probe/**, existing *.lite.tsx except ToastItem, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Toast just passed byte-identical empty-host swap. Playground: http://localhost:3333/?components=toast. Stencil: packages/components/src/components/toast/toast-item/. Card default has no items. Open the same messages on both sides (or inject items) then swap item hosts only; leave parent as Stencil p-toast. Keep nested p-icon / p-button-pure as Stencil. Pause motion with --p-animation-duration: 0s. You are the only writer in packages/mitosis-probe-lit.
ACCEPTANCE   ToastItem.lite.tsx compiles with target lit and useShadowDom true. rg my-fragment on ToastItem.ts is empty. Live card swap pixel-diff 0. Report written.
VERIFY       Recipe pixel-diff section. Control Stencil vs baseline 0 first.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
