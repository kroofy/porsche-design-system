GOAL         Migrate p-table-cell to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/TableCell.lite.tsx and matching harness only, .audit/orchestrate/stencil-to-mitosis/reports/migrate-table-cell.md, /opt/cursor/artifacts/mitosis_lit_table_cell_after.png, /opt/cursor/artifacts/table_cell_pixel_diff.png, a baseline under .audit/orchestrate/stencil-to-mitosis/baseline/. May not write: packages/components/**, packages/mitosis-probe/**, existing *.lite.tsx except TableCell, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Table-row just passed byte-identical in-parent swap. Playground: http://localhost:3333/?components=table. Stencil: packages/components/src/components/table/table-cell/. Swap cell hosts only inside [data-card="table"]; leave parent as Stencil p-table-row. Copy light-DOM children. throwIfParentIsNotOfKind on in-parent swap is benign. You are the only writer in packages/mitosis-probe-lit.
ACCEPTANCE   TableCell.lite.tsx compiles with target lit and useShadowDom true. rg my-fragment on TableCell.ts is empty. Live card swap pixel-diff 0. Report written.
VERIFY       Recipe pixel-diff section. Control Stencil vs baseline 0 first.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
