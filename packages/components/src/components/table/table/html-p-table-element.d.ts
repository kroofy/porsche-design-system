/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPTableElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-table hosts.
 */
import type { HTMLStencilElement } from '../../../types/html-stencil-element';
import type { TableLayout } from './table-utils';

export {};

declare global {
  interface HTMLPTableElement extends HTMLStencilElement {
    caption?: string;
    compact?: boolean;
    layout?: TableLayout;
    sticky?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-table': HTMLPTableElement;
  }
}
