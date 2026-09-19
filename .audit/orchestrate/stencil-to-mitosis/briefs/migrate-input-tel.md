GOAL         Migrate p-input-tel to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/InputTel.lite.tsx and matching harness only, .audit/orchestrate/stencil-to-mitosis/reports/migrate-input-tel.md, /opt/cursor/artifacts/mitosis_lit_input_tel_after.png, /opt/cursor/artifacts/input_tel_pixel_diff.png, a baseline under .audit/orchestrate/stencil-to-mitosis/baseline/. May not write: packages/components/**, packages/mitosis-probe/**, existing *.lite.tsx except InputTel, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Input-url just passed byte-identical card swap. Playground: http://localhost:3333/?components=input-tel. Stencil: packages/components/src/components/input-tel/. InputBase sibling. Copy input-url harness, retarget the card. Keep nested p-icon/p-spinner as Stencil. You are the only writer in packages/mitosis-probe-lit.
ACCEPTANCE   InputTel.lite.tsx compiles with target lit and useShadowDom true. rg my-fragment on InputTel.ts is empty. Live card swap pixel-diff 0. Report written.
VERIFY       Recipe pixel-diff section. Control Stencil vs baseline 0 first.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
