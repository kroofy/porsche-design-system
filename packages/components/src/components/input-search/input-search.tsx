/**
 * Stencil no longer owns p-input-search. The playground tag is the Mitosis Lit
 * custom element from mitosis/input-search/InputSearch.lite.tsx.
 * This file stays so generateConstructorMap can still import class InputSearch.
 * Global HTMLPInputSearchElement stays if other files still type those hosts after
 * Stencil drops the @Component declaration.
 */
export class InputSearch {
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
  clear?: boolean = false;
  indicator?: boolean = false;
  readOnly?: boolean = false;
  compact?: boolean = false;
  render(): void {}
}

declare global {
  interface HTMLPInputSearchElement extends HTMLElement {
    value?: string;
    disabled?: boolean;
    readOnly?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-input-search': HTMLPInputSearchElement;
  }
}
