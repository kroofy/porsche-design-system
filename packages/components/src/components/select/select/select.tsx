/**
 * Stencil no longer owns p-select. The playground tag is the Mitosis Lit
 * custom element from mitosis/select/Select.lite.tsx.
 * This file stays so generateConstructorMap can still import class Select.
 */
export class Select {
  host!: HTMLElement;
  label?: string = '';
  description?: string = '';
  name?: string;
  value?: string | number | null;
  state?: string = 'none';
  message?: string = '';
  hideLabel?: unknown = false;
  disabled?: boolean = false;
  required?: boolean = false;
  dropdownDirection?: string = 'auto';
  filter?: boolean = false;
  compact?: boolean = false;
  form?: string;
  render(): void {}
}

declare global {
  interface HTMLPSelectElement extends HTMLElement {
    label?: string;
    description?: string;
    name?: string;
    value?: string | number | null;
    state?: string;
    message?: string;
    hideLabel?: unknown;
    disabled?: boolean;
    required?: boolean;
    dropdownDirection?: string;
    filter?: boolean;
    compact?: boolean;
    form?: string;
  }
  interface HTMLElementTagNameMap {
    'p-select': HTMLPSelectElement;
  }
}
