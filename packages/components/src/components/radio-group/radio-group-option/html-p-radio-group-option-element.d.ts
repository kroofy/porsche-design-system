/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPRadioGroupOptionElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-radio-group-option hosts.
 */
export {};

declare global {
  interface HTMLPRadioGroupOptionElement extends HTMLElement {
    value?: string | number;
    label?: string;
    disabled?: boolean;
    loading?: boolean;
    selected?: boolean;
    disabledParent?: boolean;
    loadingParent?: boolean;
    name?: string;
    state?: string;
  }
  interface HTMLElementTagNameMap {
    'p-radio-group-option': HTMLPRadioGroupOptionElement;
  }
}
