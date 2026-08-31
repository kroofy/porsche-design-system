/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPSelectOptionElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-select-option hosts.
 */
export {};

declare global {
  interface HTMLPSelectOptionElement extends HTMLElement {
    value?: string | number | null;
    disabled?: boolean;
    selected?: boolean;
    highlighted?: boolean;
    disabledParent?: boolean;
    hidden?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-select-option': HTMLPSelectOptionElement;
  }
}
