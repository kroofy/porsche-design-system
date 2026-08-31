/**
 * Stencil no longer owns p-drilldown-link. The playground tag is the Mitosis Lit
 * custom element from mitosis/drilldown-link/DrilldownLink.lite.tsx.
 * This file stays so generateConstructorMap can still import class DrilldownLink.
 */
import type { HTMLStencilElement } from '@stencil/core/internal';

export class DrilldownLink {
  host!: HTMLElement;
  href?: string;
  active?: boolean = false;
  target?: string = '_self';
  download?: string;
  rel?: string;
  render(): void {}
}

declare global {
  interface HTMLPDrilldownLinkElement extends HTMLStencilElement {
    href?: string;
    active?: boolean;
    target?: string;
    download?: string;
    rel?: string;
  }
  interface HTMLElementTagNameMap {
    'p-drilldown-link': HTMLPDrilldownLinkElement;
  }
}
