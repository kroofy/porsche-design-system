/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPTextListItemElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-text-list-item hosts.
 */
export {};

declare global {
  interface HTMLPTextListItemElement extends HTMLElement {}
  interface HTMLElementTagNameMap {
    'p-text-list-item': HTMLPTextListItemElement;
  }
}
