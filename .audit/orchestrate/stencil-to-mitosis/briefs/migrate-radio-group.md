GOAL         Migrate p-radio-group to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/RadioGroup.lite.tsx and matching harness only, .audit/orchestrate/stencil-to-mitosis/reports/migrate-radio-group.md, /opt/cursor/artifacts/mitosis_lit_radio_group_after.png, /opt/cursor/artifacts/radio_group_pixel_diff.png, a baseline under .audit/orchestrate/stencil-to-mitosis/baseline/. May not write: packages/components/**, packages/mitosis-probe/**, existing *.lite.tsx except RadioGroup, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Segmented-control-item just passed byte-identical card swap. Playground: http://localhost:3333/?components=radio-group. Stencil: packages/components/src/components/radio-group/radio-group/. Wrapper: Label + slot of p-radio-group-option + StateMessage. Keep options as Stencil. Copy light-DOM children on in-card swap. Pause loading with --p-animation-duration: 0s on both sides. You are the only writer in packages/mitosis-probe-lit.
ACCEPTANCE   RadioGroup.lite.tsx compiles with target lit and useShadowDom true. rg my-fragment on RadioGroup.ts is empty. Live card swap pixel-diff 0. Report written.
VERIFY       Recipe pixel-diff section. Control Stencil vs baseline 0 first.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
