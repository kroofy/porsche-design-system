/**
 * Stencil no longer owns p-pin-code. The playground tag is the Mitosis Lit
 * custom element from mitosis/pin-code/PinCode.lite.tsx.
 * This file stays so generateConstructorMap can still import class PinCode.
 * Global HTMLPPinCodeElement stays if other files still type those hosts after
 * Stencil drops the @Component declaration.
 */
export class PinCode {
  host!: HTMLElement;
  label?: string = '';
  description?: string = '';
  name?: string;
  length?: number = 4;
  hideLabel?: unknown = false;
  state?: string = 'none';
  disabled?: boolean = false;
  loading?: boolean = false;
  required?: boolean = false;
  message?: string = '';
  type?: string = 'number';
  value?: string | number | null = '';
  compact?: boolean = false;
  form?: string;
  render(): void {}
}

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
