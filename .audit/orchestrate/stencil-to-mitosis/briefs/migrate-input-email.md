GOAL         Migrate p-input-email to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/InputEmail.lite.tsx and matching harness only, .audit/orchestrate/stencil-to-mitosis/reports/migrate-input-email.md, /opt/cursor/artifacts/mitosis_lit_input_email_after.png, /opt/cursor/artifacts/input_email_pixel_diff.png, a baseline under .audit/orchestrate/stencil-to-mitosis/baseline/. May not write: packages/components/**, packages/mitosis-probe/**, existing *.lite.tsx except InputEmail, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Input-text just passed byte-identical card swap. Playground: http://localhost:3333/?components=input-email. Stencil: packages/components/src/components/input-email/. InputBase sibling of input-text. Copy input-text harness, retarget the card. Keep nested p-icon/p-spinner as Stencil. You are the only writer in packages/mitosis-probe-lit.
ACCEPTANCE   InputEmail.lite.tsx compiles with target lit and useShadowDom true. rg my-fragment on InputEmail.ts is empty. Live card swap pixel-diff 0. Report written.
VERIFY       Recipe pixel-diff section. Control Stencil vs baseline 0 first.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
