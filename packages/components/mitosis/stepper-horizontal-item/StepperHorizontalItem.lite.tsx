import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-stepper-horizontal-item' });

export default function LitStepperHorizontalItem(props: { state?: string; disabled?: any }) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const isTrue = (v: any) => v === true || v === 'true' || v === '';
      const step = props.state || '';
      const disabled = isTrue(props.disabled);
      const isCurrent = step === 'current';
      const isDot = !step || isCurrent;
      const isDisabled = !step || disabled;
      return {
        '--p-shi-opacity': isDisabled ? '0.4' : '',
        '--p-shi-cursor': isDisabled ? 'not-allowed' : 'pointer',
        '--p-shi-btn-bg': isCurrent ? 'var(--p-color-frosted)' : '',
        '--p-shi-btn-blur': isCurrent ? 'var(--p-blur-frosted)' : 'none',
        '--p-shi-hover-bg': isDisabled ? '' : 'var(--p-color-frosted)',
        '--p-shi-hover-blur': isDisabled ? '' : 'var(--p-blur-frosted)',
        '--p-shi-transition': isDisabled
          ? ''
          : 'background-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out)',
        '--p-shi-icon-display': isDot ? 'grid' : 'inline-flex',
        '--p-shi-dot': isDot
          ? 'radial-gradient(circle, var(--p-color-primary) 60%, transparent 62%)'
          : 'none',
        '--p-shi-dot-fc': isDot && isDisabled
          ? 'radial-gradient(circle, GrayText 60%, transparent 62%)'
          : '',
        '--p-shi-before': isDot ? '""' : 'none',
        '--p-shi-fc-opacity': isDisabled ? '1' : '',
        '--p-shi-fc-color': isDisabled ? 'GrayText' : '',
        '--p-shi-fc-outline': isCurrent ? '1px solid CanvasText' : '',
      };
    },
    get isIcon(): any {
      return props.state === 'complete' || props.state === 'warning';
    },
    get iconName(): any {
      return props.state === 'complete' ? 'success' : 'warning';
    },
    get stateLabel(): any {
      return props.state || '';
    },
  });

  useStyle(`
    :host {
      font-size: inherit !important;
      opacity: var(--p-shi-opacity);
    }
    :host([hidden]) {
      display: none !important;
    }
    :not(:defined, [data-ssr]) {
      visibility: hidden;
    }
    button {
      all: unset;
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      gap: 4px;
      color: var(--p-color-primary);
      padding-inline: 8px 12px;
      padding-block: 6px;
      width: max-content;
      cursor: var(--p-shi-cursor, pointer);
      font: var(--p-font-weight-normal) inherit / var(--p-leading-normal) var(--p-font-porsche-next);
      border-radius: var(--p-radius-xl);
      background: var(--p-shi-btn-bg);
      -webkit-backdrop-filter: var(--p-shi-btn-blur);
      backdrop-filter: var(--p-shi-btn-blur);
      transition: var(--p-shi-transition);
    }
    button:focus-visible {
      outline: 2px solid var(--p-color-focus);
      outline-offset: 2px;
    }
    .icon {
      font: inherit var(--p-font-porsche-next);
      width: var(--p-leading-normal);
      height: var(--p-leading-normal);
      forced-color-adjust: none;
      display: var(--p-shi-icon-display, grid);
      background-image: var(--p-shi-dot, none);
    }
    .icon::before {
      content: var(--p-shi-before, none);
    }
    :host(:nth-of-type(1)) .icon::before {
      -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m12.33 8.67-2.43.91v-.94l2.6-1.03h.85v8.78h-1.02z"/></svg>') center/contain no-repeat;
      mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m12.33 8.67-2.43.91v-.94l2.6-1.03h.85v8.78h-1.02z"/></svg>') center/contain no-repeat;
      background-color: var(--p-color-canvas);
    }
    :host(:nth-of-type(2)) .icon::before {
      -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m9.46 15.58c0-1.35.73-2.07 1.7-2.72l.95-.63c.78-.52 1.57-1.05 1.57-2.24 0-1.12-.62-1.58-1.7-1.58s-1.68.48-1.78 1.97h-.96c.06-1.82.78-2.91 2.74-2.91s2.72.92 2.72 2.52-.92 2.23-1.79 2.8l-.95.63c-1.11.75-1.52 1.18-1.52 2.01v.16h4.17v.81h-5.15v-.81z"/></svg>') center/contain no-repeat;
      mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m9.46 15.58c0-1.35.73-2.07 1.7-2.72l.95-.63c.78-.52 1.57-1.05 1.57-2.24 0-1.12-.62-1.58-1.7-1.58s-1.68.48-1.78 1.97h-.96c.06-1.82.78-2.91 2.74-2.91s2.72.92 2.72 2.52-.92 2.23-1.79 2.8l-.95.63c-1.11.75-1.52 1.18-1.52 2.01v.16h4.17v.81h-5.15v-.81z"/></svg>') center/contain no-repeat;
      background-color: var(--p-color-canvas);
    }
    :host(:nth-of-type(3)) .icon::before {
      -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m10.1 13.73c.1 1.43.63 2 1.92 2 1.2 0 1.8-.49 1.8-1.68 0-1.08-.51-1.66-1.8-1.66h-.89v-.9h.83c1.12 0 1.66-.56 1.66-1.53 0-1.08-.64-1.55-1.73-1.55s-1.69.49-1.79 1.97h-.97c.1-1.79.84-2.91 2.76-2.91s2.74.92 2.74 2.49c0 .79-.38 1.54-1.16 1.9.84.28 1.36.92 1.36 2.19 0 1.54-.97 2.49-2.81 2.49-1.96 0-2.8-.9-2.88-2.81z"/></svg>') center/contain no-repeat;
      mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m10.1 13.73c.1 1.43.63 2 1.92 2 1.2 0 1.8-.49 1.8-1.68 0-1.08-.51-1.66-1.8-1.66h-.89v-.9h.83c1.12 0 1.66-.56 1.66-1.53 0-1.08-.64-1.55-1.73-1.55s-1.69.49-1.79 1.97h-.97c.1-1.79.84-2.91 2.76-2.91s2.74.92 2.74 2.49c0 .79-.38 1.54-1.16 1.9.84.28 1.36.92 1.36 2.19 0 1.54-.97 2.49-2.81 2.49-1.96 0-2.8-.9-2.88-2.81z"/></svg>') center/contain no-repeat;
      background-color: var(--p-color-canvas);
    }
    :host(:nth-of-type(4)) .icon::before {
      -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m8.87 13.6 3.54-5.99h1.43v5.89h1.25v.86h-1.25v2.02h-.99v-2.02h-3.98zm3.98-.1v-4.98l-2.91 4.98z"/></svg>') center/contain no-repeat;
      mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m8.87 13.6 3.54-5.99h1.43v5.89h1.25v.86h-1.25v2.02h-.99v-2.02h-3.98zm3.98-.1v-4.98l-2.91 4.98z"/></svg>') center/contain no-repeat;
      background-color: var(--p-color-canvas);
    }
    :host(:nth-of-type(5)) .icon::before {
      -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m9.34 12.45.42-4.83h4.71v.94h-3.9l-.26 2.95c.38-.43 1-.68 1.79-.68 1.86 0 2.76.9 2.76 2.81 0 2.06-1.03 2.91-2.86 2.91s-2.74-.84-2.81-2.51h.97c.06 1.13.57 1.7 1.84 1.7 1.39 0 1.85-.68 1.85-2.06s-.48-2-1.85-2c-1.07 0-1.54.42-1.75 1.17h-.91v-.39z"/></svg>') center/contain no-repeat;
      mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m9.34 12.45.42-4.83h4.71v.94h-3.9l-.26 2.95c.38-.43 1-.68 1.79-.68 1.86 0 2.76.9 2.76 2.81 0 2.06-1.03 2.91-2.86 2.91s-2.74-.84-2.81-2.51h.97c.06 1.13.57 1.7 1.84 1.7 1.39 0 1.85-.68 1.85-2.06s-.48-2-1.85-2c-1.07 0-1.54.42-1.75 1.17h-.91v-.39z"/></svg>') center/contain no-repeat;
      background-color: var(--p-color-canvas);
    }
    :host(:nth-of-type(6)) .icon::before {
      -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m9.97 11.02 2.22-3.4h1.1l-2.27 3.44c.33-.16.69-.23 1.1-.23 1.84 0 2.76.9 2.76 2.81 0 2.06-1.04 2.91-2.86 2.91s-2.87-.85-2.87-2.91c0-1.08.3-1.8.83-2.61zm2.05 4.71c1.38 0 1.84-.68 1.84-2.05s-.47-2.01-1.84-2.01-1.85.64-1.85 2.01.46 2.05 1.85 2.05z"/></svg>') center/contain no-repeat;
      mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m9.97 11.02 2.22-3.4h1.1l-2.27 3.44c.33-.16.69-.23 1.1-.23 1.84 0 2.76.9 2.76 2.81 0 2.06-1.04 2.91-2.86 2.91s-2.87-.85-2.87-2.91c0-1.08.3-1.8.83-2.61zm2.05 4.71c1.38 0 1.84-.68 1.84-2.05s-.47-2.01-1.84-2.01-1.85.64-1.85 2.01.46 2.05 1.85 2.05z"/></svg>') center/contain no-repeat;
      background-color: var(--p-color-canvas);
    }
    :host(:nth-of-type(7)) .icon::before {
      -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m9.21 7.61h5.57v.74l-3.58 8.04h-1.05l3.54-7.84h-4.49v-.94z"/></svg>') center/contain no-repeat;
      mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m9.21 7.61h5.57v.74l-3.58 8.04h-1.05l3.54-7.84h-4.49v-.94z"/></svg>') center/contain no-repeat;
      background-color: var(--p-color-canvas);
    }
    :host(:nth-of-type(8)) .icon::before {
      -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m10.47 11.94c-.65-.33-1.13-.92-1.13-2.01 0-1.53.85-2.47 2.66-2.47s2.66.94 2.66 2.47c0 1.08-.47 1.68-1.15 2.01.92.35 1.34 1.07 1.34 2.11 0 1.73-.99 2.49-2.86 2.49s-2.86-.76-2.86-2.49c0-1.04.41-1.76 1.33-2.11zm1.53 3.78c1.27 0 1.85-.51 1.85-1.69 0-1.1-.58-1.61-1.85-1.61s-1.85.52-1.85 1.61c0 1.18.58 1.69 1.85 1.69zm1.65-5.76c0-1.1-.56-1.56-1.65-1.56s-1.65.47-1.65 1.56c0 1 .46 1.6 1.65 1.6s1.65-.6 1.65-1.6z"/></svg>') center/contain no-repeat;
      mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m10.47 11.94c-.65-.33-1.13-.92-1.13-2.01 0-1.53.85-2.47 2.66-2.47s2.66.94 2.66 2.47c0 1.08-.47 1.68-1.15 2.01.92.35 1.34 1.07 1.34 2.11 0 1.73-.99 2.49-2.86 2.49s-2.86-.76-2.86-2.49c0-1.04.41-1.76 1.33-2.11zm1.53 3.78c1.27 0 1.85-.51 1.85-1.69 0-1.1-.58-1.61-1.85-1.61s-1.85.52-1.85 1.61c0 1.18.58 1.69 1.85 1.69zm1.65-5.76c0-1.1-.56-1.56-1.65-1.56s-1.65.47-1.65 1.56c0 1 .46 1.6 1.65 1.6s1.65-.6 1.65-1.6z"/></svg>') center/contain no-repeat;
      background-color: var(--p-color-canvas);
    }
    :host(:nth-of-type(9)) .icon::before {
      -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m9.16 10.33c0-2.03 1.02-2.86 2.83-2.86s2.82.81 2.82 2.85c0 1.11-.3 1.82-.81 2.64l-2.18 3.44h-1.1l2.18-3.37c-.31.14-.65.2-1.01.2-1.82 0-2.74-.99-2.74-2.9zm4.65 0c0-1.23-.47-1.92-1.81-1.92s-1.81.69-1.81 1.92c0 1.37.49 2.05 1.81 2.05s1.81-.68 1.81-2.05z"/></svg>') center/contain no-repeat;
      mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m9.16 10.33c0-2.03 1.02-2.86 2.83-2.86s2.82.81 2.82 2.85c0 1.11-.3 1.82-.81 2.64l-2.18 3.44h-1.1l2.18-3.37c-.31.14-.65.2-1.01.2-1.82 0-2.74-.99-2.74-2.9zm4.65 0c0-1.23-.47-1.92-1.81-1.92s-1.81.69-1.81 1.92c0 1.37.49 2.05 1.81 2.05s1.81-.68 1.81-2.05z"/></svg>') center/contain no-repeat;
      background-color: var(--p-color-canvas);
    }
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
    }
    @media (forced-colors: active) {
      :host {
        opacity: var(--p-shi-fc-opacity, var(--p-shi-opacity, 1));
        color: var(--p-shi-fc-color);
      }
      button {
        color: var(--p-shi-fc-color, var(--p-color-primary));
        border-color: var(--p-shi-fc-color);
        outline: var(--p-shi-fc-outline);
      }
      button:focus-visible {
        outline-color: Highlight;
      }
      .icon {
        background-image: var(--p-shi-dot-fc, var(--p-shi-dot, none));
      }
    }
    @media (hover: hover) {
      button:hover {
        -webkit-backdrop-filter: var(--p-shi-hover-blur, var(--p-shi-btn-blur));
        backdrop-filter: var(--p-shi-hover-blur, var(--p-shi-btn-blur));
        background: var(--p-shi-hover-bg, var(--p-shi-btn-bg));
      }
    }
  `);

  return (
    <button type="button">
      <span class="icon" />
      <slot />
    </button>
  );
}
