GOAL         Migrate p-drilldown to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/Drilldown.lite.tsx and matching harness only, .audit/orchestrate/stencil-to-mitosis/reports/migrate-drilldown.md, /opt/cursor/artifacts/mitosis_lit_drilldown_after.png, /opt/cursor/artifacts/drilldown_pixel_diff.png, a baseline under .audit/orchestrate/stencil-to-mitosis/baseline/. May not write: packages/components/**, packages/mitosis-probe/**, existing *.lite.tsx except Drilldown, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Sheet just passed byte-identical closed-card swap. Playground: http://localhost:3333/?components=drilldown. Stencil: packages/components/src/components/drilldown/drilldown/. Keep nested p-drilldown-item, p-drilldown-link, p-button as Stencil. Copy light-DOM children on in-card swap. Compare the card in its default closed state unless a host is already open. Dialog may be top-layer; wait for attached. throwIfParentIsNotOfKind on children is benign. You are the only writer in packages/mitosis-probe-lit.
ACCEPTANCE   Drilldown.lite.tsx compiles with target lit and useShadowDom true. rg my-fragment on Drilldown.ts is empty. Live card swap pixel-diff 0. Report written.
VERIFY       Recipe pixel-diff section. Control Stencil vs baseline 0 first.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
