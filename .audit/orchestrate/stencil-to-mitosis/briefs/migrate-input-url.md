GOAL         Migrate p-input-url to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/InputUrl.lite.tsx and matching harness only, .audit/orchestrate/stencil-to-mitosis/reports/migrate-input-url.md, /opt/cursor/artifacts/mitosis_lit_input_url_after.png, /opt/cursor/artifacts/input_url_pixel_diff.png, a baseline under .audit/orchestrate/stencil-to-mitosis/baseline/. May not write: packages/components/**, packages/mitosis-probe/**, existing *.lite.tsx except InputUrl, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Input-search just passed byte-identical card swap. Playground: http://localhost:3333/?components=input-url. Stencil: packages/components/src/components/input-url/. InputBase sibling. Copy input-search/email harness, retarget the card. Keep nested p-icon/p-spinner as Stencil. You are the only writer in packages/mitosis-probe-lit.
ACCEPTANCE   InputUrl.lite.tsx compiles with target lit and useShadowDom true. rg my-fragment on InputUrl.ts is empty. Live card swap pixel-diff 0. Report written.
VERIFY       Recipe pixel-diff section. Control Stencil vs baseline 0 first.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
