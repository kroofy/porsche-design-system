/**
 * Stencil no longer owns p-carousel. The playground tag is the Mitosis Lit
 * custom element from mitosis/carousel/Carousel.lite.tsx.
 * This file stays so generateConstructorMap can still import class Carousel.
 */
import type { HTMLStencilElement } from '../../types/html-stencil-element';

export class Carousel {
  host!: HTMLElement;
  heading?: string;
  description?: string;
  headingSize?: string = 'x-large';
  width?: string = 'basic';
  rewind?: boolean = false;
  pagination?: any = false;
  slidesPerPage?: any = 1;
  activeSlideIndex?: number = 0;
  render(): void {}
}

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
