/**
 * Stencil no longer owns p-multi-select. The playground tag is the Mitosis Lit
 * custom element from mitosis/multi-select/MultiSelect.lite.tsx.
 * This file stays so generateConstructorMap can still import class MultiSelect.
 */
import type { HTMLStencilElement } from '@stencil/core/internal';

export class MultiSelect {
  host!: HTMLElement;
  label?: string = '';
  description?: string = '';
  name?: string;
  value?: string[] | number[] | null;
  state?: string = 'none';
  message?: string = '';
  hideLabel?: unknown = false;
  disabled?: boolean = false;
  required?: boolean = false;
  dropdownDirection?: string = 'auto';
  compact?: boolean = false;
  form?: string;
  render(): void {}
}

declare global {
  interface HTMLPMultiSelectElement extends HTMLStencilElement {
    label?: string;
    description?: string;
    name?: string;
    value?: string[] | number[] | null;
    state?: string;
    message?: string;
    hideLabel?: unknown;
    disabled?: boolean;
    required?: boolean;
    dropdownDirection?: string;
    compact?: boolean;
    form?: string;
  }
  interface HTMLElementTagNameMap {
    'p-multi-select': HTMLPMultiSelectElement;
  }
}
