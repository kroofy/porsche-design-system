/**
 * Stencil no longer owns p-link-tile. The playground tag is the Mitosis Lit
 * custom element from mitosis/link-tile/LinkTile.lite.tsx.
 * This file stays so generateConstructorMap can still import class LinkTile.
 */
import type { HTMLStencilElement } from '../../types/html-stencil-element';
import type { BreakpointCustomizable, SelectedAriaAttributes } from '../../types';
import type {
  LinkTileAlign,
  LinkTileAriaAttribute,
  LinkTileAspectRatio,
  LinkTileSize,
  LinkTileTarget,
  LinkTileWeight,
} from './link-tile-utils';

export class LinkTile {
  host!: HTMLElement;
  size?: BreakpointCustomizable<LinkTileSize> = 'medium';
  weight?: BreakpointCustomizable<LinkTileWeight> = 'semi-bold';
  aspectRatio?: BreakpointCustomizable<LinkTileAspectRatio> = '4/3';
  label: string;
  description: string;
  align?: LinkTileAlign = 'bottom';
  gradient?: boolean = false;
  compact?: BreakpointCustomizable<boolean> = false;
  href: string;
  target?: LinkTileTarget = '_self';
  download?: string;
  rel?: string;
  aria?: SelectedAriaAttributes<LinkTileAriaAttribute>;
  render(): void {}
}

declare global {
  interface HTMLPLinkTileElement extends HTMLStencilElement {
    size?: BreakpointCustomizable<LinkTileSize>;
    weight?: BreakpointCustomizable<LinkTileWeight>;
    aspectRatio?: BreakpointCustomizable<LinkTileAspectRatio>;
    label: string;
    description: string;
    align?: LinkTileAlign;
    gradient?: boolean;
    compact?: BreakpointCustomizable<boolean>;
    href: string;
    target?: LinkTileTarget;
    download?: string;
    rel?: string;
    aria?: SelectedAriaAttributes<LinkTileAriaAttribute>;
  }
  interface HTMLElementTagNameMap {
    'p-link-tile': HTMLPLinkTileElement;
  }
}
