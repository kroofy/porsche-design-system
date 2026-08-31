/**
 * Stencil no longer owns p-link-tile-product. The playground tag is the Mitosis Lit
 * custom element from mitosis/link-tile-product/LinkTileProduct.lite.tsx.
 * This file stays so generateConstructorMap can still import class LinkTileProduct.
 */
import type { HTMLStencilElement } from '@stencil/core/internal';
import type { BreakpointCustomizable } from '../../types';
import type {
  LinkTileProductAspectRatio,
  LinkTileProductLikeEventDetail,
  LinkTileProductTarget,
} from './link-tile-product-utils';

export class LinkTileProduct {
  host!: HTMLElement;
  heading: string;
  price: string;
  priceOriginal?: string;
  description?: string;
  likeButton?: boolean = true;
  liked?: boolean = false;
  href?: string;
  aspectRatio?: BreakpointCustomizable<LinkTileProductAspectRatio> = '3/4';
  target?: LinkTileProductTarget = '_self';
  rel?: string;
  like?: { emit: (detail: LinkTileProductLikeEventDetail) => void };
  render(): void {}
}

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
