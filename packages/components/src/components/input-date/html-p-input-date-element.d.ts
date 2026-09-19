/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPInputDateElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-input-date hosts.
 */
export {};

declare global {
  interface HTMLPInputDateElement extends HTMLElement {
    value?: string;
    disabled?: boolean;
    readOnly?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-input-date': HTMLPInputDateElement;
  }
}
