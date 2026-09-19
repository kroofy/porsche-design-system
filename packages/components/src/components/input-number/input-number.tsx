/**
 * Stencil no longer owns p-input-number. The playground tag is the Mitosis Lit
 * custom element from mitosis/input-number/InputNumber.lite.tsx.
 * This file stays so generateConstructorMap can still import class InputNumber.
 * Global HTMLPInputNumberElement stays if other files still type those hosts after
 * Stencil drops the @Component declaration.
 */
export class InputNumber {
  host!: HTMLElement;
  label?: string = '';
  description?: string = '';
  placeholder?: string = '';
  name?: string = '';
  value?: string = '';
  required?: boolean = false;
  loading?: boolean = false;
  disabled?: boolean = false;
  step?: number = 1;
  min?: number;
  max?: number;
  form?: string;
  autoComplete?: string;
  state?: string = 'none';
  message?: string = '';
  hideLabel?: unknown = false;
  controls?: boolean = false;
  readOnly?: boolean = false;
  compact?: boolean = false;
  render(): void {}
}

declare global {
  interface HTMLPInputNumberElement extends HTMLElement {
    value?: string;
    disabled?: boolean;
    readOnly?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-input-number': HTMLPInputNumberElement;
  }
}
