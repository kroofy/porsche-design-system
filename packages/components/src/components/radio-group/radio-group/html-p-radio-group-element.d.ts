/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPRadioGroupElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-radio-group hosts.
 */
export {};

declare global {
  interface HTMLPRadioGroupElement extends HTMLElement {
    label?: string;
    description?: string;
    name?: string;
    value?: string | number | null;
    required?: boolean;
    loading?: boolean;
    direction?: unknown;
    disabled?: boolean;
    form?: string;
    state?: string;
    message?: string;
    hideLabel?: unknown;
    compact?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-radio-group': HTMLPRadioGroupElement;
  }
}
