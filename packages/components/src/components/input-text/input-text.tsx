/**
 * Stencil no longer owns p-input-text. The playground tag is the Mitosis Lit
 * custom element from mitosis/input-text/InputText.lite.tsx.
 * This file stays so generateConstructorMap can still import class InputText.
 * Global HTMLPInputTextElement stays if other files still type those hosts after
 * Stencil drops the @Component declaration.
 */
export class InputText {
  host!: HTMLElement;
  label?: string = '';
  description?: string = '';
  placeholder?: string = '';
  name?: string = '';
  value?: string = '';
  spellCheck?: boolean;
  counter?: boolean = false;
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
  readOnly?: boolean = false;
  compact?: boolean = false;
  render(): void {}
}

declare global {
  interface HTMLPInputTextElement extends HTMLElement {
    value?: string;
    disabled?: boolean;
    readOnly?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-input-text': HTMLPInputTextElement;
  }
}
