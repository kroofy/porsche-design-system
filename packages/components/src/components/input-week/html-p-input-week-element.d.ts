/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPInputWeekElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-input-week hosts.
 */
export {};

declare global {
  interface HTMLPInputWeekElement extends HTMLElement {
    value?: string;
    disabled?: boolean;
    readOnly?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-input-week': HTMLPInputWeekElement;
  }
}
