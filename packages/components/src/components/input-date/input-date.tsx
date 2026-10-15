/**
 * Stencil no longer owns p-input-date. The playground tag is the Mitosis Lit
 * custom element from mitosis/input-date/InputDate.lite.tsx.
 * This file stays so generateConstructorMap can still import class InputDate.
 * Global HTMLPInputDateElement stays if other files still type those hosts after
 * Stencil drops the @Component declaration.
 */
export class InputDate {
  host!: HTMLElement;
  label?: string = '';
  description?: string = '';
  name?: string = '';
  value?: string = '';
  required?: boolean = false;
  loading?: boolean = false;
  disabled?: boolean = false;
  step?: number;
  min?: string;
  max?: string;
  form?: string;
  autoComplete?: string;
  state?: string = 'none';
  message?: string = '';
  hideLabel?: unknown = false;
  readOnly?: boolean = false;
  compact?: boolean = false;
  render(): void {}
}

declare global {
  interface HTMLPInputDateElement extends HTMLElement {
    value?: string;
    disabled?: boolean;
    readOnly?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-input-date': HTMLPInputDateElement;
  }
}
