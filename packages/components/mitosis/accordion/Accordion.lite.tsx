import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-accordion' });

const BREAKPOINTS = ['base', 'xs', 's', 'm', 'l', 'xl', 'xxl'] as const;

const parse = (raw: any, fallback: any) => {
  if (raw === undefined || raw === null || raw === '') return fallback;
  if (typeof raw === 'string' && raw.charAt(0) === '{') {
    try {
      return JSON.parse(raw.replace(/'/g, '"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi, '"$1":'));
    } catch {
      return fallback;
    }
  }
  return raw;
};

const pick = (obj: any, key: any, fallback: any) => {
  if (obj && typeof obj === 'object') {
    if (obj[key] === undefined) return fallback;
    return obj[key];
  }
  return obj;
};

export default function LitAccordion(props: {
  open?: any;
  alignMarker?: string;
  background?: string;
  compact?: any;
  indent?: any;
  sticky?: any;
  size?: any;
  heading?: string;
  headingTag?: string;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const isTrue = (v: any) => v === true || v === 'true' || v === '';
      const isOpen = isTrue(props.open);
      const isCompact = isTrue(props.compact);
      const align = props.alignMarker || 'end';
      const isStart = align === 'start';
      const background = props.background || 'none';
      const indent = parse(props.indent, false);
      const size = parse(props.size, 'small');
      const hasBefore = state.hasSummaryBefore;
      const hasAfter = state.hasSummaryAfter;
      const compactFactor = isCompact ? 0.64285714 : 1;
      const paddingBlock = 'calc(28px * (' + compactFactor + ' - 0.64285714) + 6px)';
      const paddingInline = 'calc(11.2px * (' + compactFactor + ' - 0.64285714) + 12px)';
      const gap = 'calc(11.2px * (' + compactFactor + ' - 0.64285714) + 4px)';
      const py = background === 'none' ? '0' : paddingBlock;
      const px = background === 'none' ? '0' : paddingInline;
      const radius = isCompact ? 'var(--p-radius-xl)' : 'var(--p-radius-2xl)';
      const bgMap: any = {
        canvas: 'var(--p-color-canvas)',
        surface: 'var(--p-color-surface)',
        frosted: 'var(--p-color-frosted)',
        none: 'transparent',
      };
      const summaryCol = hasBefore && isStart ? 3 : hasBefore || isStart ? 2 : 1;
      const iconCol = isStart ? 1 : hasBefore && hasAfter ? 4 : hasBefore || hasAfter ? 3 : 2;
      const beforeCol = isStart ? 2 : 1;
      const afterCol = hasBefore && isStart ? 4 : hasBefore || isStart ? 3 : 2;
      const cols =
        (hasBefore ? 'auto ' : '') +
        (isStart ? 'auto minmax(0, 1fr)' : 'minmax(0, 1fr) auto') +
        (hasAfter ? ' auto ' : '');
      const fontSizeFor = (s: any) => (s === 'medium' ? 'var(--p-typescale-md)' : 'var(--p-typescale-sm)');
      const indentVal = (on: any) => (isTrue(on) ? String(summaryCol) : '1');
      const vars: Record<string, string> = {
        '--p-acc-gap': gap,
        '--p-acc-py': py,
        '--p-acc-px': px,
        '--p-acc-py-fc': paddingBlock,
        '--p-acc-px-fc': paddingInline,
        '--p-acc-radius': radius,
        '--p-acc-bg': bgMap[background] || bgMap.none,
        '--p-acc-dur': isOpen
          ? 'var(--p-transition-duration, var(--p-duration-md))'
          : 'var(--p-transition-duration, var(--p-duration-sm))',
        '--p-acc-ease': isOpen ? 'var(--p-ease-in)' : 'var(--p-ease-out)',
        '--p-acc-pad-top': paddingBlock,
        '--p-acc-cols': cols,
        '--p-acc-summary-col': String(summaryCol),
        '--p-acc-icon-col': String(iconCol),
        '--p-acc-before-col': String(beforeCol),
        '--p-acc-after-col': String(afterCol),
        '--p-acc-fc-off': background === 'none' ? '0' : '-1px',
      };
      if (typeof size === 'object' && size !== null) {
        let last = String(pick(size, 'base', 'small') || 'small');
        for (const bp of BREAKPOINTS) {
          if (size[bp] !== undefined) last = String(pick(size, bp, last));
          const key = bp === 'base' ? '--p-acc-fs' : `--p-acc-fs-${bp}`;
          vars[key] = fontSizeFor(last);
        }
      } else {
        const fs = fontSizeFor(size);
        vars['--p-acc-fs'] = fs;
        for (const bp of BREAKPOINTS) {
          if (bp === 'base') continue;
          vars[`--p-acc-fs-${bp}`] = fs;
        }
      }
      if (typeof indent === 'object' && indent !== null) {
        let lastOn = isTrue(pick(indent, 'base', false));
        let last = indentVal(lastOn);
        for (const bp of BREAKPOINTS) {
          if (indent[bp] !== undefined) {
            lastOn = isTrue(pick(indent, bp, lastOn));
            last = indentVal(lastOn);
          }
          const key = bp === 'base' ? '--p-acc-indent' : `--p-acc-indent-${bp}`;
          vars[key] = last;
        }
      } else {
        const val = indentVal(indent);
        vars['--p-acc-indent'] = val;
        for (const bp of BREAKPOINTS) {
          if (bp === 'base') continue;
          vars[`--p-acc-indent-${bp}`] = val;
        }
      }
      return vars;
    },
    get headingText(): string {
      return props.heading || '';
    },
    get headingTagValue(): string {
      return props.headingTag || 'h2';
    },
    get isOpenFlag(): any {
      return props.open === true || props.open === 'true' || props.open === '';
    },
    get hasSummaryBefore(): any {
      return false;
    },
    get hasSummaryAfter(): any {
      return false;
    },
    get hasSummarySlot(): any {
      return false;
    },
  });

  useStyle(`
    @keyframes overflow-hidden {
      from {
        overflow: hidden;
      }
      to {
        overflow: hidden;
      }
    }
    :host {
      display: block;
    }
    :host([hidden]) {
      display: none !important;
    }
    slot[name="summary-before"],
    slot[name="summary"],
    slot[name="summary-after"] {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--p-acc-gap);
    }
    slot[name="summary-before"] {
      grid-area: 1 / var(--p-acc-before-col);
      z-index: 2;
    }
    slot[name="summary"] {
      grid-area: 1 / var(--p-acc-summary-col);
    }
    slot[name="summary-after"] {
      grid-area: 1 / var(--p-acc-after-col);
      z-index: 2;
    }
    slot:not([name]) {
      display: block;
      overflow: hidden;
      transform: translate3d(0, 0, 0);
    }
    details[open] slot:not([name]) {
      overflow: visible;
      animation: overflow-hidden var(--p-acc-dur);
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      all: unset;
      grid-area: 1 / var(--p-acc-summary-col);
      font: inherit;
      font-weight: var(--p-font-weight-semibold);
      font-size: var(--p-acc-fs);
    }
    details {
      all: unset;
      font: var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      color: var(--p-color-primary);
      display: grid;
      grid-template: repeat(2, auto) / var(--p-acc-cols);
      column-gap: var(--p-acc-gap);
      align-items: center;
      padding: var(--p-accordion-py, var(--p-acc-py)) var(--p-accordion-px, var(--p-acc-px));
      background: var(--p-acc-bg);
      border-radius: var(--p-acc-radius);
    }
    :host([background="frosted"]) details {
      -webkit-backdrop-filter: var(--p-blur-frosted);
      backdrop-filter: var(--p-blur-frosted);
    }
    details::details-content {
      display: contents !important;
      content-visibility: visible !important;
    }
    details > div {
      grid-area: 2/1/auto/-1;
      grid-column-start: var(--p-acc-indent);
      z-index: 0;
      display: grid;
      opacity: 0;
      margin-top: 0px;
      grid-template-rows: 0fr;
      visibility: hidden;
      transition: visibility 0s linear var(--p-acc-dur), grid-template-rows var(--p-acc-dur) var(--p-acc-ease), padding-top var(--p-acc-dur) var(--p-acc-ease), opacity var(--p-acc-dur) var(--p-acc-ease);
    }
    details[open] > div {
      opacity: 1;
      padding-top: var(--p-acc-pad-top);
      z-index: 2;
      padding-inline: var(--p-accordion-px, var(--p-acc-px));
      margin-inline: calc(-1 * var(--p-accordion-px, var(--p-acc-px)));
      grid-template-rows: 1fr;
      visibility: inherit;
      transition: visibility 0s linear 0s, grid-template-rows var(--p-acc-dur) var(--p-acc-ease), margin-top var(--p-acc-dur) var(--p-acc-ease), opacity var(--p-acc-dur) var(--p-acc-ease);
    }
    summary {
      all: unset;
      grid-area: 1/1/auto/-1;
      z-index: 1;
      display: grid;
      grid-template-columns: subgrid;
      align-items: center;
      cursor: pointer;
      padding: var(--p-accordion-py, var(--p-acc-py)) var(--p-accordion-px, var(--p-acc-px));
      margin: calc(-1 * var(--p-accordion-py, var(--p-acc-py))) calc(-1 * var(--p-accordion-px, var(--p-acc-px)));
    }
    :host([sticky][background="canvas"]) summary,
    :host([sticky][background="surface"]) summary {
      position: sticky;
      top: var(--p-accordion-summary-top, var(--p-accordion-position-sticky-top, 0px));
      background: linear-gradient(180deg, var(--p-acc-bg) 0%, var(--p-acc-bg) 90%, transparent 100%);
      border-radius: var(--p-acc-radius);
    }
    summary:focus-visible::before {
      outline: 2px solid var(--p-color-focus);
      outline-offset: 2px;
    }
    summary::before {
      grid-area: 1 / var(--p-acc-icon-col);
      place-self: center;
      content: "";
      width: 1.5rem;
      height: 1.5rem;
      pointer-events: none;
      border-radius: var(--p-radius-full);
      background: transparent;
      transition: background-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
    }
    summary::after {
      grid-area: 1 / var(--p-acc-icon-col);
      place-self: center;
      content: "";
      width: 1rem;
      height: 1rem;
      pointer-events: none;
      -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m12 15.125h-.001l-.005-.006-6.494-5.476.642-.768 5.858 4.94 5.858-4.94.642.769-6.497 5.477z"/></svg>') center/contain no-repeat;
      mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m12 15.125h-.001l-.005-.006-6.494-5.476.642-.768 5.858 4.94 5.858-4.94.642.769-6.497 5.477z"/></svg>') center/contain no-repeat;
      background: var(--p-color-primary);
      transform: rotate3d(0);
      transition: transform var(--p-acc-dur) var(--p-acc-ease);
    }
    details[open] summary::after {
      transform: rotate3d(0, 0, 1, 180deg);
    }
    @media (forced-colors: active) {
      details {
        outline: 1px solid CanvasText;
        outline-offset: var(--p-acc-fc-off);
        padding: var(--p-accordion-py, var(--p-acc-py-fc)) var(--p-accordion-px, var(--p-acc-px-fc));
      }
      summary::after {
        background-color: LinkText;
      }
      summary:focus-visible::before {
        outline-color: Highlight;
      }
    }
    @media (hover: hover) {
      summary:hover::before {
        background: var(--p-color-frosted);
      }
    }
    :host(:not([data-before])) slot[name="summary-before"] {
      display: none;
    }
    :host(:not([data-after])) slot[name="summary-after"] {
      display: none;
    }
    :host([data-summary]) summary > h1,
    :host([data-summary]) summary > h2,
    :host([data-summary]) summary > h3,
    :host([data-summary]) summary > h4,
    :host([data-summary]) summary > h5,
    :host([data-summary]) summary > h6 {
      display: none;
    }
    :host(:not([data-summary])) slot[name="summary"] {
      display: none;
    }
    @media (min-width: 480px) {
      details > div {
        grid-column-start: var(--p-acc-indent-xs, var(--p-acc-indent));
      }
    }
    @media (min-width: 760px) {
      details > div {
        grid-column-start: var(--p-acc-indent-s, var(--p-acc-indent-xs, var(--p-acc-indent)));
      }
    }
    @media (min-width: 1000px) {
      details > div {
        grid-column-start: var(--p-acc-indent-m, var(--p-acc-indent-s, var(--p-acc-indent)));
      }
    }
    @media (min-width: 1300px) {
      details > div {
        grid-column-start: var(--p-acc-indent-l, var(--p-acc-indent-m, var(--p-acc-indent)));
      }
    }
    @media (min-width: 1760px) {
      details > div {
        grid-column-start: var(--p-acc-indent-xl, var(--p-acc-indent-l, var(--p-acc-indent)));
      }
    }
    @media (min-width: 1920px) {
      details > div {
        grid-column-start: var(--p-acc-indent-xxl, var(--p-acc-indent-xl, var(--p-acc-indent)));
      }
    }
  `);

  return (
    <details>
      <summary>
        <slot name="summary" />
        <h2>
          {state.headingText}
          <slot name="heading" />
        </h2>
      </summary>
      <slot name="summary-before" />
      <slot name="summary-after" />
      <div>
        <slot />
      </div>
    </details>
  );
}
