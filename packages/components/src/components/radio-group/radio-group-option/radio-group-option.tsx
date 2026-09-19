/**
 * Stencil no longer owns p-radio-group-option. The playground tag is the Mitosis Lit
 * custom element from mitosis/radio-group-option/RadioGroupOption.lite.tsx.
 * This file stays so generateConstructorMap can still import class RadioGroupOption.
 */
export class RadioGroupOption {
  host!: HTMLElement;
  value?: string | number;
  label?: string;
  disabled?: boolean = false;
  loading?: boolean = false;
  selected?: boolean;
  disabledParent?: boolean;
  loadingParent?: boolean;
  name?: string;
  state?: string;
  render(): void {}
}

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
