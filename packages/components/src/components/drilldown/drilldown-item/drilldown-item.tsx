/**
 * Stencil no longer owns p-drilldown-item. The playground tag is the Mitosis Lit
 * custom element from mitosis/drilldown-item/DrilldownItem.lite.tsx.
 * This file stays so generateConstructorMap can still import class DrilldownItem.
 */
import type { HTMLStencilElement } from '@stencil/core/internal';

export class DrilldownItem {
  host!: HTMLElement;
  identifier: string = '';
  label?: string;
  primary?: boolean = false;
  secondary?: boolean = false;
  cascade?: boolean = false;
  render(): void {}
}

declare global {
  interface HTMLPDrilldownItemElement extends HTMLStencilElement {
    identifier: string;
    label?: string;
    primary?: boolean;
    secondary?: boolean;
    cascade?: boolean;
  }
  interface HTMLElementTagNameMap {
    'p-drilldown-item': HTMLPDrilldownItemElement;
  }
}
