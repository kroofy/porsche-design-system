GOAL         Migrate p-flag to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/Flag.lite.tsx and matching harness only, .audit/orchestrate/stencil-to-mitosis/reports/migrate-flag.md, /opt/cursor/artifacts/mitosis_lit_flag_after.png, /opt/cursor/artifacts/flag_pixel_diff.png, a flag baseline under .audit/orchestrate/stencil-to-mitosis/baseline/. May not write: packages/components/**, packages/mitosis-probe/**, Crest.lite.tsx, Wordmark.lite.tsx, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Crest and wordmark passed byte-identical card swaps. Playground: http://localhost:3333/?components=flag. Stencil: packages/components/src/components/flag/. Copy wordmark harness, retarget the card.
ACCEPTANCE   Flag.lite.tsx compiles with target lit and useShadowDom true. rg my-fragment on Flag.ts is empty. Live card swap pixel-diff 0. Report written.
VERIFY       Recipe pixel-diff section. Control Stencil vs baseline 0 first.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
