# Native elements synthesis

Base: arena candidate 2.
Grafts: candidate 3 appearance + `.p-*` / `data-p-*`, candidate 1 golden markup, candidate 4 `@layer pds.elements`.
Rejected: Mitosis, light-DOM CE, schema IR.

## Contract

If the user interacts with one native element, PDS does not wrap it.
`PButton` is `<button class="p-button">`. `PLink` is `<a class="p-link">`.
Stencil hosts stay frozen until a major removal.

## Done

- `linkAppearance()` / `buttonAppearance()`
- Shared `serializeResponsive` and `rewriteShadowElementCss`
- `getNativeButtonCss()` / `getNativeLinkCss()`: one stylesheet, all variants via `data-p-*`
- React, Vue, and Angular `PButton` / `PLink` / `PIcon` return the native tag. Public export still the CE wrapper.
- Angular is `button[pButton]` / `a[pLink]` / `img[pIcon]`. The host is the native element.
- Label lives in a span *inside* the native tag so hide-label works.
- Icon is a native `<img class="p-icon">` *inside* the control (`p-button__icon` / `p-link__icon`). Nothing wraps the button, link, or icon. Stencil `p-icon` stays frozen.

## Next

Spinner for loading (`p-button__spinner`). Then `./docker.sh` VRT on `native-button` / `native-link`.
