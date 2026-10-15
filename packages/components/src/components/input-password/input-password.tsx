/**
 * Stencil no longer owns p-input-password. The playground tag is the Mitosis Lit
 * custom element from mitosis/input-password/InputPassword.lite.tsx.
 * This file stays so generateConstructorMap can still import class InputPassword.
 * Global HTMLPInputPasswordElement stays if other files still type those hosts after
 * Stencil drops the @Component declaration.
 */
export class InputPassword {
  host!: HTMLElement;
  label?: string = '';
  description?: string = '';
  placeholder?: string = '';
  name?: string = '';
  value?: string = '';
  required?: boolean = false;
  loading?: boolean = false;
  disabled?: boolean = false;
  maxLength?: number;
  minLength?: number;
  form?: string;
  autoComplete?: string;
  state?: string = 'none';
  message?: string = '';
  hideLabel?: unknown = false;
  toggle?: boolean = false;
  readOnly?: boolean = false;
  compact?: boolean = false;
  render(): void {}
}

declare global {
  interface HTMLPInputPasswordElement extends HTMLElement {
    value?: string;
    disabled?: boolean;
    readOnly?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-input-password': HTMLPInputPasswordElement;
  }
}
