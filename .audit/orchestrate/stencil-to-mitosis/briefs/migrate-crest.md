GOAL         Migrate p-crest to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/Crest.lite.tsx and matching harness/config only as needed, .audit/orchestrate/stencil-to-mitosis/reports/migrate-crest.md, /opt/cursor/artifacts/mitosis_lit_crest_after.png, /opt/cursor/artifacts/crest_pixel_diff.png. May not write: packages/components/**, packages/mitosis-probe/**, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Playground: http://localhost:3333/?components=crest. Stencil source: packages/components/src/components/crest/. Divider probe already proved the Lit channel. Do not redo divider.
ACCEPTANCE   Crest.lite.tsx compiles with target lit and useShadowDom true.
ACCEPTANCE   rg my-fragment output/lit is empty.
ACCEPTANCE   Live card swap pixel-diff 0 vs a same-session Stencil control of [data-card=crest], artifacts saved.
ACCEPTANCE   Report at reports/migrate-crest.md.
VERIFY       Follow the recipe screenshot and pixel-diff sections. Exit nonzero on mismatch.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components edits, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, live JSON, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
