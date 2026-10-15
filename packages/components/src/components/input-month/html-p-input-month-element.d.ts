/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPInputMonthElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-input-month hosts.
 */
export {};

declare global {
  interface HTMLPInputMonthElement extends HTMLElement {
    value?: string;
    disabled?: boolean;
    readOnly?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-input-month': HTMLPInputMonthElement;
  }
}
