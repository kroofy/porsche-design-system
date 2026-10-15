GOAL         Migrate p-text-list to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/TextList.lite.tsx and matching harness only, .audit/orchestrate/stencil-to-mitosis/reports/migrate-text-list.md, /opt/cursor/artifacts/mitosis_lit_text_list_after.png, /opt/cursor/artifacts/text_list_pixel_diff.png, a baseline under .audit/orchestrate/stencil-to-mitosis/baseline/. May not write: packages/components/**, packages/mitosis-probe/**, existing *.lite.tsx except TextList, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Fieldset just passed byte-identical card swap. Playground: http://localhost:3333/?components=text-list. Stencil: packages/components/src/components/text-list/text-list/. Wrapper: ul/ol + default slot. Keep p-text-list-item as Stencil. Copy light-DOM children on in-card swap. You are the only writer in packages/mitosis-probe-lit.
ACCEPTANCE   TextList.lite.tsx compiles with target lit and useShadowDom true. rg my-fragment on TextList.ts is empty. Live card swap pixel-diff 0. Report written.
VERIFY       Recipe pixel-diff section. Control Stencil vs baseline 0 first.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
