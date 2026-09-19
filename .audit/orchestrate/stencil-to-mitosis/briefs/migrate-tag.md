GOAL         Migrate p-tag to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/Tag.lite.tsx and matching harness only, .audit/orchestrate/stencil-to-mitosis/reports/migrate-tag.md, /opt/cursor/artifacts/mitosis_lit_tag_after.png, /opt/cursor/artifacts/tag_pixel_diff.png, a baseline under .audit/orchestrate/stencil-to-mitosis/baseline/. May not write: packages/components/**, packages/mitosis-probe/**, existing *.lite.tsx except Tag, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Spinner just passed byte-identical card swap. Playground: http://localhost:3333/?components=tag. Stencil: packages/components/src/components/tag/. Slotted label plus optional nested p-icon (still defined on the page as Stencil). Render <p-icon> inside the Lit shadow; do not swap inner icons to lit-icon. Copy heading slot-swap so light-DOM children survive. You are the only writer in packages/mitosis-probe-lit.
ACCEPTANCE   Tag.lite.tsx compiles with target lit and useShadowDom true. rg my-fragment on Tag.ts is empty. Live card swap pixel-diff 0. Report written.
VERIFY       Recipe pixel-diff section. Control Stencil vs baseline 0 first.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
