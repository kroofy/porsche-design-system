/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPInputNumberElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-input-number hosts.
 */
export {};

declare global {
  interface HTMLPInputNumberElement extends HTMLElement {
    value?: string;
    disabled?: boolean;
    readOnly?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-input-number': HTMLPInputNumberElement;
  }
}
