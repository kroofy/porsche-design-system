/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPOptgroupElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-optgroup hosts.
 */
import type { HTMLStencilElement } from '@stencil/core/internal';

export {};

declare global {
  interface HTMLPOptgroupElement extends HTMLStencilElement {
    label?: string;
    disabled?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-optgroup': HTMLPOptgroupElement;
  }
}
