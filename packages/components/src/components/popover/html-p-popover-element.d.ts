/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPPopoverElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-popover hosts.
 */
import type { HTMLStencilElement } from '@stencil/core/internal';
import type { SelectedAriaAttributes } from '../../types';
import type { PopoverAriaAttribute, PopoverDirection } from './popover-utils';

export {};

declare global {
  interface HTMLPPopoverElement extends HTMLStencilElement {
    open?: boolean;
    direction?: PopoverDirection;
    description?: string;
    compact?: boolean;
    aria?: SelectedAriaAttributes<PopoverAriaAttribute>;
  }
  interface HTMLElementTagNameMap {
    'p-popover': HTMLPPopoverElement;
  }
}
