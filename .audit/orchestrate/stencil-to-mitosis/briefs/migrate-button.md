GOAL         Migrate p-button to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/Button.lite.tsx and matching harness only, .audit/orchestrate/stencil-to-mitosis/reports/migrate-button.md, /opt/cursor/artifacts/mitosis_lit_button_after.png, /opt/cursor/artifacts/button_pixel_diff.png, a baseline under .audit/orchestrate/stencil-to-mitosis/baseline/. May not write: packages/components/**, packages/mitosis-probe/**, existing *.lite.tsx except Button, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Button-pure just passed byte-identical card swap. Playground: http://localhost:3333/?components=button. Stencil: packages/components/src/components/button/. Sibling of button-pure/link: slotted label, nested p-icon, optional p-spinner when loading. Keep inner icons/spinners as p-icon/p-spinner. If loading animation dirties control, pause --p-animation-duration 0s on both sides. Copy button-pure harness, retarget the card. You are the only writer in packages/mitosis-probe-lit.
ACCEPTANCE   Button.lite.tsx compiles with target lit and useShadowDom true. rg my-fragment on Button.ts is empty. Live card swap pixel-diff 0. Report written.
VERIFY       Recipe pixel-diff section. Control Stencil vs baseline 0 first.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
