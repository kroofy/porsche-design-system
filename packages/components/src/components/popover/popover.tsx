/**
 * Stencil no longer owns p-popover. The playground tag is the Mitosis Lit
 * custom element from mitosis/popover/Popover.lite.tsx.
 * This file stays so generateConstructorMap can still import class Popover.
 */
import type { HTMLStencilElement } from '../../types/html-stencil-element';
import type { SelectedAriaAttributes } from '../../types';
import type { PopoverAriaAttribute, PopoverDirection, PopoverDismissEventDetail } from './popover-utils';

export class Popover {
  host!: HTMLElement;
  open?: boolean;
  direction?: PopoverDirection = 'bottom';
  description?: string;
  compact?: boolean;
  aria?: SelectedAriaAttributes<PopoverAriaAttribute>;
  dismiss?: { emit: (detail: PopoverDismissEventDetail) => void };
  render(): void {}
}

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
