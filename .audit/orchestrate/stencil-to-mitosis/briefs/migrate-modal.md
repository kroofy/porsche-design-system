GOAL         Migrate p-modal to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/Modal.lite.tsx and matching harness only, .audit/orchestrate/stencil-to-mitosis/reports/migrate-modal.md, /opt/cursor/artifacts/mitosis_lit_modal_after.png, /opt/cursor/artifacts/modal_pixel_diff.png, a baseline under .audit/orchestrate/stencil-to-mitosis/baseline/. May not write: packages/components/**, packages/mitosis-probe/**, existing *.lite.tsx except Modal, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Toast-item just passed byte-identical in-parent swap. Playground: http://localhost:3333/?components=modal. Stencil: packages/components/src/components/modal/. Keep nested p-text, p-button, p-button-pure as Stencil. Copy light-DOM children and named slots on in-card swap. Compare the card in its default closed state unless a host is already open. Dialog may be top-layer; wait for attached. You are the only writer in packages/mitosis-probe-lit.
ACCEPTANCE   Modal.lite.tsx compiles with target lit and useShadowDom true. rg my-fragment on Modal.ts is empty. Live card swap pixel-diff 0. Report written.
VERIFY       Recipe pixel-diff section. Control Stencil vs baseline 0 first.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
