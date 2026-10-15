/**
 * Stencil no longer owns p-checkbox. The playground tag is the Mitosis Lit
 * custom element from mitosis/checkbox/Checkbox.lite.tsx.
 * This file stays so generateConstructorMap can still import class Checkbox.
 * Global HTMLPCheckboxElement stays if other files still type those hosts after
 * Stencil drops the @Component declaration.
 */
export class Checkbox {
  host!: HTMLElement;
  label?: string = '';
  name?: string = '';
  value?: string = 'on';
  checked?: boolean = false;
  indeterminate?: boolean = false;
  disabled?: boolean = false;
  loading?: boolean = false;
  compact?: boolean = false;
  required?: boolean = false;
  state?: string = 'none';
  message?: string = '';
  hideLabel?: unknown = false;
  form?: string;
  render(): void {}
}

declare global {
  interface HTMLPCheckboxElement extends HTMLElement {
    checked?: boolean;
    disabled?: boolean;
    indeterminate?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-checkbox': HTMLPCheckboxElement;
  }
}
