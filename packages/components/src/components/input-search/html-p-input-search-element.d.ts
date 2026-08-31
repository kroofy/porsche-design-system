/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPInputSearchElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-input-search hosts.
 */
export {};

declare global {
  interface HTMLPInputSearchElement extends HTMLElement {
    value?: string;
    disabled?: boolean;
    readOnly?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-input-search': HTMLPInputSearchElement;
  }
}
