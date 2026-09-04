import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-carousel' });

export default function LitCarousel(props: {
  heading?: any;
  headingSize?: any;
  description?: any;
  alignHeader?: any;
  alignControls?: any;
  rewind?: any;
  width?: any;
  slidesPerPage?: any;
  pagination?: any;
  aria?: any;
  intl?: any;
  activeSlideIndex?: any;
  skipLinkTarget?: any;
  focusOnCenterSlide?: any;
  gradient?: any;
  trimSpace?: any;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const isTrue = (v: any) => v === true || v === 'true' || v === '';
      const parse = (raw: any, fallback: any) => {
        if (raw === undefined || raw === null || raw === '') return fallback;
        if (typeof raw === 'string' && raw.charAt(0) === '{') {
          try {
            return JSON.parse(
              raw.replace(/'/g, '"').replace(/([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:/g, '$1"$2":')
            );
          } catch (e) {
            return fallback;
          }
        }
        return raw;
      };
      const heading = props.heading || '';
      const description = props.description || '';
      const hasHeading = !!heading;
      const hasDescription = !!description;
      const hasControls = false;
      const headingSize = props.headingSize || 'x-large';
      const width = props.width || 'basic';
      const alignHeader = props.alignHeader || 'start';
      const alignControls = props.alignControls || 'auto';
      const gradient = isTrue(props.gradient);
      const pagination = parse(props.pagination, false);
      const hasPagination = pagination === true || pagination === 'true' || (pagination && typeof pagination === 'object');
      const isCenter = alignHeader === 'center';
      const just = alignControls !== 'auto' ? alignControls : isCenter ? 'center' : 'start';
      return {
        '--p-car-col': width === 'extended' ? '1' : '2',
        '--p-car-fs': headingSize === 'xx-large' ? 'var(--p-typescale-2xl)' : 'var(--p-typescale-xl)',
        '--p-car-h-mb': hasDescription ? '0' : 'var(--p-spacing-fluid-md)',
        '--p-car-ctrl-just': just,
        '--p-car-heading': hasHeading ? '1' : '',
        '--p-car-desc': hasDescription ? '1' : '',
        '--p-car-controls': hasControls ? '1' : '',
        '--p-car-center': isCenter ? '1' : '',
        '--p-car-gradient': gradient ? '1' : '',
        '--p-car-pag': hasPagination ? '1' : '',
      };
    },
  });

  useStyle(`
    :host {
      display: flex;
      gap: var(--p-spacing-fluid-md) !important;
      flex-direction: column !important;
      box-sizing: content-box !important;
    }
    :host([hidden]) {
      display: none !important;
    }
    :not(:defined, [data-ssr]) {
      visibility: hidden;
    }
    ::slotted(*) {
      border-radius: var(--p-carousel-border-radius, var(--p-radius-3xl)) !important;
    }
    :host([data-heading]) .heading,
    :host([data-heading]) p,
    :host([data-heading]) ::slotted([slot="description"]),
    :host([data-desc]) .heading,
    :host([data-desc]) p,
    :host([data-desc]) ::slotted([slot="description"]) {
      grid-column: 1 / -1 !important;
      color: var(--p-color-primary) !important;
    }
    :host([data-center]) .heading,
    :host([data-center]) p,
    :host([data-center]) ::slotted([slot="description"]) {
      text-align: center !important;
      justify-self: center !important;
    }
    :host([data-heading]) .heading {
      max-width: 56.25rem !important;
      margin: 0 0 var(--p-car-h-mb, var(--p-spacing-fluid-md)) !important;
      font: var(--p-font-weight-normal) var(--p-car-fs, var(--p-typescale-xl)) / var(--p-leading-normal) var(--p-font-porsche-next) !important;
    }
    :host([data-heading]) ::slotted([slot="heading"]) {
      margin: 0 !important;
      font: var(--p-font-weight-normal) var(--p-car-fs, var(--p-typescale-xl)) / var(--p-leading-normal) var(--p-font-porsche-next) !important;
    }
    :host([data-desc]) p,
    :host([data-desc]) ::slotted([slot="description"]) {
      max-width: 34.375rem !important;
      margin: var(--p-spacing-fluid-sm) 0 var(--p-spacing-fluid-md) !important;
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next) !important;
    }
    :host([data-controls]) slot[name="controls"] {
      display: block;
      grid-column: 1 / -1;
      grid-row-start: 3;
      align-self: center;
      justify-self: var(--p-car-ctrl-just, start);
    }
    .header {
      display: grid;
      padding-inline-start: var(--p-carousel-ps, var(--p-carousel-px, max(22px, 10.625vw - 12px)));
      padding-inline-end: var(--p-carousel-ps, var(--p-carousel-px, max(22px, 10.625vw - 12px)));
    }
    .nav {
      display: none;
      color-scheme: var(--p-carousel-prev-next-color-scheme);
    }
    .btn {
      padding: var(--p-spacing-static-sm);
    }
    .skip-link:not(:focus) {
      opacity: 0;
      pointer-events: none;
    }
    .slide-status {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
    }
    .splide {
      overflow: hidden;
      padding: 4px 0;
      margin: -4px 0;
    }
    .splide__track {
      position: relative;
      padding-block: 0px !important;
      padding-inline-start: var(--p-carousel-ps, var(--p-carousel-px, max(22px, 10.625vw - 12px))) !important;
      padding-inline-end: var(--p-carousel-ps, var(--p-carousel-px, max(22px, 10.625vw - 12px))) !important;
    }
    :host([data-gradient]) .splide__track {
      -webkit-mask: linear-gradient(90deg, transparent 20%, #000 var(--p-gradient-color-width, 33%) calc(100% - var(--p-gradient-color-width, 33%)), transparent 80%);
      mask: linear-gradient(90deg, transparent 20%, #000 var(--p-gradient-color-width, 33%) calc(100% - var(--p-gradient-color-width, 33%)), transparent 80%);
    }
    .splide__list {
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      display: flex;
    }
    .splide__slide {
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      flex-shrink: 0;
      transform: translateZ(0);
      border-radius: var(--p-carousel-border-radius, var(--p-radius-3xl));
    }
    .splide__slide:focus-visible {
      outline: 2px solid var(--p-color-focus);
      outline-offset: 2px;
    }
    .splide__sr {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
    }
    .splide__track--draggable {
      cursor: grab;
      user-select: none;
      -webkit-user-select: none;
      -webkit-touch-callout: none;
    }
    :host([data-center]) .splide:not(.is-overflow) .splide__list {
      justify-content: center;
    }
    :host([data-center]) .splide:not(.is-overflow) .splide__slide:last-child {
      margin-inline-end: 0 !important;
    }
    :host([data-pag]) .pagination-container {
      display: flex;
      position: relative;
      justify-content: center;
      width: calc(20px + 8px * 4 + 8px * 4);
      left: calc(50% - (calc(20px + 8px * 4 + 8px * 4)) / 2);
      overflow-x: hidden;
    }
    :host([data-pag]) .pagination {
      display: flex;
      align-items: center;
      width: fit-content;
      height: 8px;
      gap: 8px;
      transition: transform var(--p-transition-duration, var(--p-duration-md));
    }
    :host([data-pag]) .bullet {
      border-radius: var(--p-radius-full);
      background: var(--p-color-contrast-medium);
      width: 8px;
      height: 8px;
      transition:
        background-color var(--p-transition-duration, var(--p-duration-md)),
        width var(--p-transition-duration, var(--p-duration-md));
    }
    :host([data-pag]) .bullet--active {
      background: var(--p-color-primary);
      height: 8px;
      width: 20px !important;
    }
    .header {
      display: grid;
    }
    @media (min-width: 760px) {
      .header {
        grid-template-columns: minmax(0px, 1fr) auto;
        padding-inline-start: var(--p-carousel-ps, var(--p-carousel-px, calc(calc(5vw - 16px) + (clamp(16px, 1.25vw + 12px, 36px) + calc((100vw - calc(5vw - 16px) * 2 - clamp(16px, 1.25vw + 12px, 36px) * 15) / 16)) * var(--p-car-col, 2))));
        padding-inline-end: var(--p-carousel-ps, var(--p-carousel-px, calc(calc(5vw - 16px) + (clamp(16px, 1.25vw + 12px, 36px) + calc((100vw - calc(5vw - 16px) * 2 - clamp(16px, 1.25vw + 12px, 36px) * 15) / 16)) * var(--p-car-col, 2))));
        column-gap: var(--p-spacing-static-md);
      }
      .nav {
        grid-row-start: 3;
        grid-column-end: -1;
        display: flex;
        gap: var(--p-spacing-static-xs);
        align-self: flex-start;
      }
      .splide__track {
        padding-inline-start: var(--p-carousel-ps, var(--p-carousel-px, calc(calc(5vw - 16px) + (clamp(16px, 1.25vw + 12px, 36px) + calc((100vw - calc(5vw - 16px) * 2 - clamp(16px, 1.25vw + 12px, 36px) * 15) / 16)) * var(--p-car-col, 2)))) !important;
        padding-inline-end: var(--p-carousel-ps, var(--p-carousel-px, calc(calc(5vw - 16px) + (clamp(16px, 1.25vw + 12px, 36px) + calc((100vw - calc(5vw - 16px) * 2 - clamp(16px, 1.25vw + 12px, 36px) * 15) / 16)) * var(--p-car-col, 2)))) !important;
      }
    }
    @media (min-width: 1920px) {
      .header {
        padding-inline-start: var(--p-carousel-ps, var(--p-carousel-px, calc(max(0px, 50vw - 2560px / 2) + min(50vw - 880px, 400px) + (clamp(16px, 1.25vw + 12px, 36px) + calc((min(100vw, 2560px) - min(50vw - 880px, 400px) * 2 - clamp(16px, 1.25vw + 12px, 36px) * 15) / 16)) * var(--p-car-col, 2))));
        padding-inline-end: var(--p-carousel-ps, var(--p-carousel-px, calc(max(0px, 50vw - 2560px / 2) + min(50vw - 880px, 400px) + (clamp(16px, 1.25vw + 12px, 36px) + calc((min(100vw, 2560px) - min(50vw - 880px, 400px) * 2 - clamp(16px, 1.25vw + 12px, 36px) * 15) / 16)) * var(--p-car-col, 2))));
      }
      .splide__track {
        padding-inline-start: var(--p-carousel-ps, var(--p-carousel-px, calc(max(0px, 50vw - 2560px / 2) + min(50vw - 880px, 400px) + (clamp(16px, 1.25vw + 12px, 36px) + calc((min(100vw, 2560px) - min(50vw - 880px, 400px) * 2 - clamp(16px, 1.25vw + 12px, 36px) * 15) / 16)) * var(--p-car-col, 2)))) !important;
        padding-inline-end: var(--p-carousel-ps, var(--p-carousel-px, calc(max(0px, 50vw - 2560px / 2) + min(50vw - 880px, 400px) + (clamp(16px, 1.25vw + 12px, 36px) + calc((min(100vw, 2560px) - min(50vw - 880px, 400px) * 2 - clamp(16px, 1.25vw + 12px, 36px) * 15) / 16)) * var(--p-car-col, 2)))) !important;
      }
    }
    @media (pointer: coarse) {
      :host([data-pag]) .pagination-container {
        width: calc(20px + 8px * 4 + 16px * 4 + 2 * 8px);
        left: calc(50% - calc(20px + 8px * 4 + 16px * 4 + 2 * 8px) / 2);
      }
      :host([data-pag]) .pagination {
        height: calc(8px + 2 * 8px);
        gap: 16px;
      }
      :host([data-pag]) .bullet {
        position: relative;
      }
      :host([data-pag]) .bullet::before {
        content: "";
        position: absolute;
        inset: -8px;
      }
    }
    @media (hover: hover) {
      :host([data-pag]) .bullet {
        cursor: pointer;
      }
    }
    @media (forced-colors: active) {
      .splide__slide:focus-visible {
        outline-color: Highlight;
      }
    }
  `);

  return (
    <div class="header">
      <div class="nav"></div>
    </div>
  );
}
