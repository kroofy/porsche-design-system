/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPFieldsetElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-fieldset hosts.
 */
export {};

declare global {
  interface HTMLPFieldsetElement extends HTMLElement {
    label?: string;
    labelSize?: string;
    required?: boolean;
    state?: string;
    message?: string;
  }
  interface HTMLElementTagNameMap {
    'p-fieldset': HTMLPFieldsetElement;
  }
}
