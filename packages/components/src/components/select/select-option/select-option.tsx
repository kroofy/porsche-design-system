/**
 * Stencil no longer owns p-select-option. The playground tag is the Mitosis Lit
 * custom element from mitosis/select-option/SelectOption.lite.tsx.
 * This file stays so generateConstructorMap can still import class SelectOption.
 */
export class SelectOption {
  host!: HTMLElement;
  value?: string | number | null;
  disabled?: boolean = false;
  selected?: boolean;
  highlighted?: boolean;
  disabledParent?: boolean;
  hidden?: boolean;
  render(): void {}
}

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
