/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPInputTimeElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-input-time hosts.
 */
export {};

declare global {
  interface HTMLPInputTimeElement extends HTMLElement {
    value?: string;
    disabled?: boolean;
    readOnly?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-input-time': HTMLPInputTimeElement;
  }
}
