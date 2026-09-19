/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPTextListElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-text-list hosts.
 */
export {};

declare global {
  interface HTMLPTextListElement extends HTMLElement {
    type?: string;
  }
  interface HTMLElementTagNameMap {
    'p-text-list': HTMLPTextListElement;
  }
}
