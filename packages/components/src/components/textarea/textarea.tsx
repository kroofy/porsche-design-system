/**
 * Stencil no longer owns p-textarea. The playground tag is the Mitosis Lit
 * custom element from mitosis/textarea/Textarea.lite.tsx.
 * This file stays so generateConstructorMap can still import class Textarea.
 * Global HTMLPTextareaElement stays if other files still type those hosts after
 * Stencil drops the @Component declaration.
 */
export class Textarea {
  host!: HTMLElement;
  label?: string = '';
  description?: string = '';
  placeholder?: string = '';
  name?: string = '';
  value?: string = '';
  required?: boolean = false;
  disabled?: boolean = false;
  counter?: boolean = false;
  maxLength?: number;
  minLength?: number;
  rows?: number = 7;
  form?: string;
  autoComplete?: string;
  resize?: string = 'vertical';
  state?: string = 'none';
  message?: string = '';
  hideLabel?: unknown = false;
  readOnly?: boolean = false;
  compact?: boolean = false;
  render(): void {}
}

declare global {
  interface HTMLPTextareaElement extends HTMLElement {
    value?: string;
    disabled?: boolean;
    readOnly?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-textarea': HTMLPTextareaElement;
  }
}
