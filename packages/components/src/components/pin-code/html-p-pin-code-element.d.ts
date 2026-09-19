/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPPinCodeElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-pin-code hosts.
 */
export {};

declare global {
  interface HTMLPPinCodeElement extends HTMLElement {
    label?: string;
    description?: string;
    name?: string;
    length?: number;
    hideLabel?: unknown;
    state?: string;
    disabled?: boolean;
    loading?: boolean;
    required?: boolean;
    message?: string;
    type?: string;
    value?: string | number | null;
    compact?: boolean;
    form?: string;
  }
  interface HTMLElementTagNameMap {
    'p-pin-code': HTMLPPinCodeElement;
  }
}
