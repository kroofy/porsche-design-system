/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPSelectOptionElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-select-option hosts.
 */
import type { HTMLStencilElement } from '../../../types/html-stencil-element';

export {};

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
