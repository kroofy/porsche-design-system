GOAL         Migrate p-tabs-item to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/TabsItem.lite.tsx and matching harness only, .audit/orchestrate/stencil-to-mitosis/reports/migrate-tabs-item.md, /opt/cursor/artifacts/mitosis_lit_tabs_item_after.png, /opt/cursor/artifacts/tabs_item_pixel_diff.png, a baseline under .audit/orchestrate/stencil-to-mitosis/baseline/. May not write: packages/components/**, packages/mitosis-probe/**, existing *.lite.tsx except TabsItem, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Tabs just passed byte-identical card swap. Playground: http://localhost:3333/?components=tabs. Stencil: packages/components/src/components/tabs/tabs-item/. Swap item hosts only inside [data-card="tabs"]; leave parent as Stencil p-tabs. Copy light-DOM children. Keep nested p-text as Stencil. throwIfParentIsNotOfKind on in-parent swap is benign. You are the only writer in packages/mitosis-probe-lit.
ACCEPTANCE   TabsItem.lite.tsx compiles with target lit and useShadowDom true. rg my-fragment on TabsItem.ts is empty. Live card swap pixel-diff 0. Report written.
VERIFY       Recipe pixel-diff section. Control Stencil vs baseline 0 first.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
