/**
 * Stencil no longer owns p-radio-group. The playground tag is the Mitosis Lit
 * custom element from mitosis/radio-group/RadioGroup.lite.tsx.
 * This file stays so generateConstructorMap can still import class RadioGroup.
 * Global HTMLPRadioGroupElement stays if other files still type those hosts after
 * Stencil drops the @Component declaration.
 */
export class RadioGroup {
  host!: HTMLElement;
  label?: string = '';
  description?: string = '';
  name?: string;
  value?: string | number | null;
  required?: boolean = false;
  loading?: boolean = false;
  direction?: unknown = 'column';
  disabled?: boolean = false;
  form?: string;
  state?: string = 'none';
  message?: string = '';
  hideLabel?: unknown = false;
  compact?: boolean = false;
  render(): void {}
}

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
