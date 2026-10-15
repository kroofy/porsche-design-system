/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPTextareaElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-textarea hosts.
 */
export {};

declare global {
  interface HTMLPTextareaElement extends HTMLElement {
    value?: string;
    disabled?: boolean;
    readOnly?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-textarea': HTMLPTextareaElement;
  }
}
