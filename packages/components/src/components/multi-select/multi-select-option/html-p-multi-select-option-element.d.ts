/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPMultiSelectOptionElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-multi-select-option hosts.
 */
import type { HTMLStencilElement } from '../../../types/html-stencil-element';

export {};

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
