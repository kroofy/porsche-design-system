/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPLinkTileProductElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-link-tile-product hosts.
 */
import type { HTMLStencilElement } from '../../types/html-stencil-element';
import type { BreakpointCustomizable } from '../../types';
import type { LinkTileProductAspectRatio, LinkTileProductTarget } from './link-tile-product-utils';

export {};

declare global {
  interface HTMLPLinkTileProductElement extends HTMLStencilElement {
    heading: string;
    price: string;
    priceOriginal?: string;
    description?: string;
    likeButton?: boolean;
    liked?: boolean;
    href?: string;
    aspectRatio?: BreakpointCustomizable<LinkTileProductAspectRatio>;
    target?: LinkTileProductTarget;
    rel?: string;
  }
  interface HTMLElementTagNameMap {
    'p-link-tile-product': HTMLPLinkTileProductElement;
  }
}
