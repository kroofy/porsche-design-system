/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPInputTelElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-input-tel hosts.
 */
export {};

declare global {
  interface HTMLPInputTelElement extends HTMLElement {
    value?: string;
    disabled?: boolean;
    readOnly?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-input-tel': HTMLPInputTelElement;
  }
}
