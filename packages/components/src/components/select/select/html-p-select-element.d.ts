/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPSelectElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-select hosts.
 */
export {};

declare global {
  interface HTMLPSelectElement extends HTMLElement {
    label?: string;
    description?: string;
    name?: string;
    value?: string | number | null;
    state?: string;
    message?: string;
    hideLabel?: unknown;
    disabled?: boolean;
    required?: boolean;
    dropdownDirection?: string;
    filter?: boolean;
    compact?: boolean;
    form?: string;
  }
  interface HTMLElementTagNameMap {
    'p-select': HTMLPSelectElement;
  }
}
