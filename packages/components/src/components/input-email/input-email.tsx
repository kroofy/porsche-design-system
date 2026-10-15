/**
 * Stencil no longer owns p-input-email. The playground tag is the Mitosis Lit
 * custom element from mitosis/input-email/InputEmail.lite.tsx.
 * This file stays so generateConstructorMap can still import class InputEmail.
 * Global HTMLPInputEmailElement stays if other files still type those hosts after
 * Stencil drops the @Component declaration.
 */
export class InputEmail {
  host!: HTMLElement;
  label?: string = '';
  description?: string = '';
  placeholder?: string = '';
  name?: string = '';
  value?: string = '';
  multiple?: boolean = false;
  required?: boolean = false;
  loading?: boolean = false;
  disabled?: boolean = false;
  pattern?: string;
  maxLength?: number;
  minLength?: number;
  form?: string;
  autoComplete?: string;
  state?: string = 'none';
  message?: string = '';
  hideLabel?: unknown = false;
  indicator?: boolean = false;
  readOnly?: boolean = false;
  compact?: boolean = false;
  render(): void {}
}

declare global {
  interface HTMLPInputEmailElement extends HTMLElement {
    value?: string;
    disabled?: boolean;
    readOnly?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-input-email': HTMLPInputEmailElement;
  }
}
