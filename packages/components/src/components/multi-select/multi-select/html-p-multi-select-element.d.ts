/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPMultiSelectElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-multi-select hosts.
 */
import type { HTMLStencilElement } from '../../../types/html-stencil-element';

export {};

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
