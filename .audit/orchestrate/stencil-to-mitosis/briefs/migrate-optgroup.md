GOAL         Migrate p-optgroup to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/Optgroup.lite.tsx and matching harness only, .audit/orchestrate/stencil-to-mitosis/reports/migrate-optgroup.md, /opt/cursor/artifacts/mitosis_lit_optgroup_after.png, /opt/cursor/artifacts/optgroup_pixel_diff.png, a baseline under .audit/orchestrate/stencil-to-mitosis/baseline/. May not write: packages/components/**, packages/mitosis-probe/**, existing *.lite.tsx except Optgroup, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Select-option just passed byte-identical closed-card swap. Playground: http://localhost:3333/?components=select. Stencil: packages/components/src/components/optgroup/. Swap optgroup hosts only; leave parent p-select and p-select-option as Stencil. Copy light-DOM children. You are the only writer in packages/mitosis-probe-lit.
ACCEPTANCE   Optgroup.lite.tsx compiles with target lit and useShadowDom true. rg my-fragment on Optgroup.ts is empty. Live card swap pixel-diff 0. Report written.
VERIFY       Recipe pixel-diff section. Control Stencil vs baseline 0 first.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
