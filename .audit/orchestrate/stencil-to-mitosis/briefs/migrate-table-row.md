GOAL         Migrate p-table-row to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/TableRow.lite.tsx and matching harness only, .audit/orchestrate/stencil-to-mitosis/reports/migrate-table-row.md, /opt/cursor/artifacts/mitosis_lit_table_row_after.png, /opt/cursor/artifacts/table_row_pixel_diff.png, a baseline under .audit/orchestrate/stencil-to-mitosis/baseline/. May not write: packages/components/**, packages/mitosis-probe/**, existing *.lite.tsx except TableRow, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Table-body just passed byte-identical in-parent swap. Playground: http://localhost:3333/?components=table. Stencil: packages/components/src/components/table/table-row/. Swap row hosts only inside [data-card="table"]; leave parent as Stencil p-table-body. Copy light-DOM children. Keep p-table-cell as Stencil. throwIfParentIsNotOfKind on in-parent swap is benign. You are the only writer in packages/mitosis-probe-lit.
ACCEPTANCE   TableRow.lite.tsx compiles with target lit and useShadowDom true. rg my-fragment on TableRow.ts is empty. Live card swap pixel-diff 0. Report written.
VERIFY       Recipe pixel-diff section. Control Stencil vs baseline 0 first.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
