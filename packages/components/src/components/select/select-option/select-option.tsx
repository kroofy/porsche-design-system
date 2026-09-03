/**
 * Stencil no longer owns p-select-option. The playground tag is the Mitosis Lit
 * custom element from mitosis/select-option/SelectOption.lite.tsx.
 * This file stays so generateConstructorMap can still import class SelectOption.
 */
import type { HTMLStencilElement } from '../../../types/html-stencil-element';

export class SelectOption {
  host!: HTMLElement;
  value?: string | number | null;
  disabled?: boolean = false;
  selected?: boolean;
  highlighted?: boolean;
  disabledParent?: boolean;
  render(): void {}
}

declare global {
  interface HTMLPSelectOptionElement extends HTMLStencilElement {
    value?: string | number | null;
    disabled?: boolean;
    selected?: boolean;
    highlighted?: boolean;
    disabledParent?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-select-option': HTMLPSelectOptionElement;
  }
}
