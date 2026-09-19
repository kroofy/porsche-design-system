/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPInputUrlElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-input-url hosts.
 */
export {};

declare global {
  interface HTMLPInputUrlElement extends HTMLElement {
    value?: string;
    disabled?: boolean;
    readOnly?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-input-url': HTMLPInputUrlElement;
  }
}
