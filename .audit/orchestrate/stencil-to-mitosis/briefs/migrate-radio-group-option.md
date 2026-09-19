GOAL         Migrate p-radio-group-option to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/RadioGroupOption.lite.tsx and matching harness only, .audit/orchestrate/stencil-to-mitosis/reports/migrate-radio-group-option.md, /opt/cursor/artifacts/mitosis_lit_radio_group_option_after.png, /opt/cursor/artifacts/radio_group_option_pixel_diff.png, a baseline under .audit/orchestrate/stencil-to-mitosis/baseline/. May not write: packages/components/**, packages/mitosis-probe/**, existing *.lite.tsx except RadioGroupOption, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Radio-group just passed byte-identical card swap. Playground: http://localhost:3333/?components=radio-group. Stencil: packages/components/src/components/radio-group/radio-group-option/. Swap option hosts only; leave parent as Stencil p-radio-group. Keep nested p-icon / p-spinner as Stencil. Pause loading with --p-animation-duration: 0s on both sides. Copy light-DOM children on in-card swap. You are the only writer in packages/mitosis-probe-lit.
ACCEPTANCE   RadioGroupOption.lite.tsx compiles with target lit and useShadowDom true. rg my-fragment on RadioGroupOption.ts is empty. Live card swap pixel-diff 0. Report written.
VERIFY       Recipe pixel-diff section. Control Stencil vs baseline 0 first.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
