/**
 * Stencil no longer owns p-input-time. The playground tag is the Mitosis Lit
 * custom element from mitosis/input-time/InputTime.lite.tsx.
 * This file stays so generateConstructorMap can still import class InputTime.
 * Global HTMLPInputTimeElement stays if other files still type those hosts after
 * Stencil drops the @Component declaration.
 */
export class InputTime {
  host!: HTMLElement;
  label?: string = '';
  description?: string = '';
  placeholder?: string = '';
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
  interface HTMLPInputTimeElement extends HTMLElement {
    value?: string;
    disabled?: boolean;
    readOnly?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-input-time': HTMLPInputTimeElement;
  }
}
