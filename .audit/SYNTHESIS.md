# Native elements synthesis

Base: arena candidate 2.
Grafts: candidate 3 appearance + `.p-*` / `data-p-*`, candidate 1 golden markup, candidate 4 `@layer pds.elements`.
Rejected: Mitosis, light-DOM CE, schema IR.

## Contract

If the user interacts with one native element, PDS does not wrap it.
`PButton` is `<button class="p-button">`. `PLink` is `<a class="p-link">`. `PIcon` is `<img class="p-icon">`.
Stencil hosts stay frozen until a major removal.

## Done

- `linkAppearance()` / `buttonAppearance()`
- Shared `serializeResponsive` and `rewriteShadowElementCss`
- `getNativeButtonCss()` / `getNativeLinkCss()`: one stylesheet, all variants via `data-p-*`
- React, Vue, and Angular `PButton` / `PLink` / `PIcon` return the native tag. Public export still the CE wrapper.
- Angular is `button[pButton]` / `a[pLink]` / `img[pIcon]`. The host is the native element.
- Label lives in a span *inside* the native tag so hide-label works.
- Icon is a native `<img class="p-icon">` *inside* the control (`p-button__icon` / `p-link__icon`). Nothing wraps the button, link, or icon. Stencil `p-icon` stays frozen.
- Loading is native `disabled` + `aria-busy` + `data-p-loading` + a `span.p-button__spinner` SVG. Not `p-spinner`.
- Spinner freeze-frame matches `p-spinner` under Playwright `animations: 'disabled'` (no static dashoffset; `--p-temporary-spinner-stroke-dasharray`).
- Unlayered `color-scheme: inherit` on `.p-button` / `.p-link` / `.p-icon` so dark tokens resolve against demo/UA `button,a { color-scheme: light }`.
- Chrome and Safari VRT: native button/link sit next to Stencil. Light, dark, labels, icons, compact, loading match.

## Fields

- `PInputText` is `<input class="p-input">`. `PLabel` is `<label class="p-label" for>`. `PTextarea` is `<textarea class="p-textarea">`.
- Label is a sibling, never a host around the control. Required mark lives inside the label.
- Public export still the CE. Stencil hosts stay frozen.
- Chrome and Safari VRT: native input/textarea sit next to Stencil. Light, dark, compact, required, error/success match.
- Disabled text is slightly less faded than Stencil (native applies opacity once; Stencil stacks wrapper + child).

## Choice (in progress)

- `PCheckbox` is `<input type="checkbox" class="p-checkbox">`. `PRadio` is `<input type="radio" class="p-radio">`. `PSelect` is `<select class="p-select">`.
- Label is a sibling with `for`. `div.p-field` / `div.p-radios` are CSS-only layout.
- Public export still the CE. Stencil hosts stay frozen.

## Out of this family

Public export swap. Generated ID helper. Mitosis.
