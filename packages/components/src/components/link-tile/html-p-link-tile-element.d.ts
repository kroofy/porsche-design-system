/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPLinkTileElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-link-tile hosts.
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

export {};

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
