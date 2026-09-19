/**
 * Stencil no longer owns p-tabs-bar. The playground tag is the Mitosis Lit
 * custom element from mitosis/tabs-bar/TabsBar.lite.tsx.
 * This file stays so generateConstructorMap can still import class TabsBar.
 */
import type { HTMLStencilElement } from '../../types/html-stencil-element';

export class TabsBar {
  host!: HTMLElement;
  activeTabIndex?: number;
  background?: string = 'none';
  size?: unknown = 'small';
  compact?: boolean;
  weight?: string = 'regular';
  aria?: unknown;
  render(): void {}
}

declare global {
  interface HTMLPTabsBarElement extends HTMLStencilElement {
    activeTabIndex?: number;
    background?: string;
    size?: unknown;
    compact?: boolean;
    weight?: string;
    aria?: unknown;
  }
  interface HTMLElementTagNameMap {
    'p-tabs-bar': HTMLPTabsBarElement;
  }
}
