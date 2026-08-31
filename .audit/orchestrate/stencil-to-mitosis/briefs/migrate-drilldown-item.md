GOAL         Migrate p-drilldown-item to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/DrilldownItem.lite.tsx and matching harness only, .audit/orchestrate/stencil-to-mitosis/reports/migrate-drilldown-item.md, /opt/cursor/artifacts/mitosis_lit_drilldown_item_after.png, /opt/cursor/artifacts/drilldown_item_pixel_diff.png, a baseline under .audit/orchestrate/stencil-to-mitosis/baseline/. May not write: packages/components/**, packages/mitosis-probe/**, existing *.lite.tsx except DrilldownItem, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Parent p-drilldown just passed byte-identical closed-card swap. Playground: http://localhost:3333/?components=drilldown. Stencil: packages/components/src/components/drilldown/drilldown-item/. Swap item hosts only; leave parent as Stencil p-drilldown. Keep nested p-drilldown-link and p-button-pure as Stencil. Copy light-DOM children and named slots (button, header). Compare closed unless a host is already open. throwIfParentIsNotOfKind is benign after in-parent swap. You are the only writer in packages/mitosis-probe-lit.
ACCEPTANCE   DrilldownItem.lite.tsx compiles with target lit and useShadowDom true. rg my-fragment on DrilldownItem.ts is empty. Live card swap pixel-diff 0. Report written.
VERIFY       Recipe pixel-diff section. Control Stencil vs baseline 0 first.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
