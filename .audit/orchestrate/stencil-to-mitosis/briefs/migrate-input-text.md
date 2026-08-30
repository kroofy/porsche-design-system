GOAL         Migrate p-input-text to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/InputText.lite.tsx and matching harness only, .audit/orchestrate/stencil-to-mitosis/reports/migrate-input-text.md, /opt/cursor/artifacts/mitosis_lit_input_text_after.png, /opt/cursor/artifacts/input_text_pixel_diff.png, a baseline under .audit/orchestrate/stencil-to-mitosis/baseline/. May not write: packages/components/**, packages/mitosis-probe/**, existing *.lite.tsx except InputText, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Checkbox just passed byte-identical card swap. Playground: http://localhost:3333/?components=input-text. Stencil: packages/components/src/components/input-text/. Next form control after checkbox. Copy checkbox/switch harness patterns. Keep nested p-icon/p-spinner as Stencil. You are the only writer in packages/mitosis-probe-lit.
ACCEPTANCE   InputText.lite.tsx compiles with target lit and useShadowDom true. rg my-fragment on InputText.ts is empty. Live card swap pixel-diff 0. Report written.
VERIFY       Recipe pixel-diff section. Control Stencil vs baseline 0 first.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
