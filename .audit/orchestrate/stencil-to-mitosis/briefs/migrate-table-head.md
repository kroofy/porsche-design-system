GOAL         Migrate p-table-head to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/TableHead.lite.tsx and matching harness only, .audit/orchestrate/stencil-to-mitosis/reports/migrate-table-head.md, /opt/cursor/artifacts/mitosis_lit_table_head_after.png, /opt/cursor/artifacts/table_head_pixel_diff.png, a baseline under .audit/orchestrate/stencil-to-mitosis/baseline/. May not write: packages/components/**, packages/mitosis-probe/**, existing *.lite.tsx except TableHead, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Table just passed byte-identical card swap. Playground: http://localhost:3333/?components=table. Stencil: packages/components/src/components/table/table-head/. Swap head hosts only inside [data-card="table"]; leave parent as Stencil p-table. Copy light-DOM children. Keep p-table-head-row / p-table-head-cell as Stencil. throwIfParentIsNotOfKind on in-parent swap is benign. You are the only writer in packages/mitosis-probe-lit.
ACCEPTANCE   TableHead.lite.tsx compiles with target lit and useShadowDom true. rg my-fragment on TableHead.ts is empty. Live card swap pixel-diff 0. Report written.
VERIFY       Recipe pixel-diff section. Control Stencil vs baseline 0 first.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
