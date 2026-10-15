/**
 * Stencil --dev regenerates src/components.d.ts and drops HTMLPCarouselElement
 * after @Component is stripped. Keep the host type here so other files can still
 * name p-carousel hosts.
 */
import type { HTMLStencilElement } from '../../types/html-stencil-element';

export {};

declare global {
  interface HTMLPCarouselElement extends HTMLStencilElement {
    heading?: string;
    description?: string;
    headingSize?: string;
    width?: string;
    rewind?: boolean;
    pagination?: any;
    slidesPerPage?: any;
    activeSlideIndex?: number;
  }
  interface HTMLElementTagNameMap {
    'p-carousel': HTMLPCarouselElement;
  }
}
