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
- React `PButton` / `PLink` return the native tag. Public export still the CE wrapper.
- Label lives in a span *inside* the native tag so hide-label works.

## Next

Run `./docker.sh npm run test:vrt:components-js` on `native-button` / `native-link`.
Those pages put Stencil and native side by side. No icon/spinner yet.
Then icon children, Vue, Angular `button[pButton]`.
