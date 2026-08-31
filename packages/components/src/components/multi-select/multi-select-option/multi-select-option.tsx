/**
 * Stencil no longer owns p-multi-select-option. The playground tag is the Mitosis Lit
 * custom element from mitosis/multi-select-option/MultiSelectOption.lite.tsx.
 * This file stays so generateConstructorMap can still import class MultiSelectOption.
 */
import type { HTMLStencilElement } from '../../../types/html-stencil-element';

export class MultiSelectOption {
  host!: HTMLElement;
  value?: string | number;
  disabled?: boolean = false;
  selected?: boolean;
  highlighted?: boolean;
  disabledParent?: boolean;
  render(): void {}
}

declare global {
  interface HTMLPMultiSelectOptionElement extends HTMLStencilElement {
    value?: string | number;
    disabled?: boolean;
    selected?: boolean;
    highlighted?: boolean;
    disabledParent?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-multi-select-option': HTMLPMultiSelectOptionElement;
  }
}
