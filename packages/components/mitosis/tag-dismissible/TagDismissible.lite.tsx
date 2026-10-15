import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-tag-dismissible' });

export default function LitTagDismissible(props: { label?: string; compact?: any; aria?: any }) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const compact = props.compact === true || props.compact === 'true' || props.compact === '';
      const hasLabel = !!(props.label && props.label !== '');
      const scale = compact ? '0.64285714' : '1';
      return {
        '--_p-tag-dismissible-a': scale,
        '--p-tag-dismissible-radius': compact ? 'var(--p-radius-lg)' : 'var(--p-radius-xl)',
        '--p-tag-dismissible-pad-block': hasLabel
          ? 'calc(16.8px * (var(--_p-tag-dismissible-a) - 0.64285714))'
          : 'calc(28px * (var(--_p-tag-dismissible-a) - 0.64285714) + 6px)',
        '--p-tag-dismissible-label-display': hasLabel ? 'block' : 'none',
      };
    },
    get ariaLabel(): string {
      let raw: any = props.aria;
      if (!raw) return '';
      if (typeof raw === 'string') {
        try {
          raw = JSON.parse(raw.replace(/'/g, '"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi, '"$1":'));
        } catch (e) {
          raw = null;
        }
      }
      if (typeof raw === 'object' && raw !== null) return raw['aria-label'] || '';
      return '';
    },
    get labelText(): string {
      return props.label || '';
    },
    get closeIconSrc(): string {
      return 'http://localhost:3001/icons/close.eec3c5d.svg';
    },
  });

  useStyle(`
    :host {
      display: inline-block;
      vertical-align: top;
    }
    :host([hidden]) {
      display: none !important;
    }
    :not(:defined, [data-ssr]) {
      visibility: hidden;
    }
    button {
      all: unset;
      display: flex;
      position: relative;
      align-items: center;
      gap: calc(22.4px * (var(--_p-tag-dismissible-a) - 0.64285714) + 4px);
      padding: var(--p-tag-dismissible-pad-block) calc(22.4px * (var(--_p-tag-dismissible-a) - 0.64285714) + 4px);
      border-radius: var(--p-tag-dismissible-radius);
      cursor: pointer;
      background: var(--p-color-frosted);
      color: var(--p-color-primary);
      text-align: start;
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
    }
    button:focus-visible {
      outline: 2px solid var(--p-color-focus);
      outline-offset: 2px;
    }
    @media (forced-colors: active) {
      button {
        outline: 2px solid CanvasText;
        outline-offset: -2px;
      }
      button:focus-visible {
        outline-color: Highlight;
      }
    }
    @media (hover: hover) {
      button:hover > .icon {
        background-color: var(--p-color-frosted);
      }
    }
    .label,
    button > span:nth-of-type(2) > span {
      display: var(--p-tag-dismissible-label-display);
      margin-bottom: -4px;
      color: var(--p-color-contrast-high);
      font-size: var(--p-typescale-xs);
    }
    .icon,
    button > span:last-of-type {
      padding: calc(11.2px * (var(--_p-tag-dismissible-a) - 0.64285714));
      margin: calc(-1 * calc(11.2px * (var(--_p-tag-dismissible-a) - 0.64285714)));
      transition: background-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
      border-radius: var(--p-radius-full);
    }
    .sr-only,
    span.sr-only,
    button > span:first-of-type {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
    }
  `);

  return (
    <button type="button" aria-label={state.ariaLabel}>
      <span class="sr-only">Remove:</span>
      <span>
        <span class="label">{state.labelText}</span>
        <slot></slot>
      </span>
      <span class="icon">
        <p-icon name="close" source={state.closeIconSrc} aria-hidden="true" />
      </span>
    </button>
  );
}
