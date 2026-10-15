import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-tag' });

const TEXT: Record<string, string> = {
  primary: 'var(--p-color-canvas)',
  secondary: 'var(--p-color-primary)',
  info: 'var(--p-color-canvas)',
  'info-frosted': 'var(--p-color-primary)',
  success: 'var(--p-color-canvas)',
  'success-frosted': 'var(--p-color-primary)',
  warning: 'var(--p-color-canvas)',
  'warning-frosted': 'var(--p-color-primary)',
  error: 'var(--p-color-canvas)',
  'error-frosted': 'var(--p-color-primary)',
};

const BG: Record<string, string> = {
  primary: 'var(--p-color-primary)',
  secondary: 'var(--p-color-frosted-strong)',
  info: 'var(--p-color-info)',
  'info-frosted': 'var(--p-color-info-frosted)',
  success: 'var(--p-color-success)',
  'success-frosted': 'var(--p-color-success-frosted)',
  warning: 'var(--p-color-warning)',
  'warning-frosted': 'var(--p-color-warning-frosted)',
  error: 'var(--p-color-error)',
  'error-frosted': 'var(--p-color-error-frosted)',
};

const HOVER: Record<string, string> = {
  primary: 'var(--p-color-contrast-high)',
  secondary: 'var(--p-color-frosted)',
  info: 'var(--p-color-info-medium)',
  'info-frosted': 'var(--p-color-info-frosted-soft)',
  success: 'var(--p-color-success-medium)',
  'success-frosted': 'var(--p-color-success-frosted-soft)',
  warning: 'var(--p-color-warning-medium)',
  'warning-frosted': 'var(--p-color-warning-frosted-soft)',
  error: 'var(--p-color-error-medium)',
  'error-frosted': 'var(--p-color-error-frosted-soft)',
};

const FROSTED: Record<string, number> = {
  secondary: 1,
  'info-frosted': 1,
  'success-frosted': 1,
  'warning-frosted': 1,
  'error-frosted': 1,
};

export default function LitTag(props: { variant?: string; icon?: string; iconSource?: string; compact?: any }) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const variant = props.variant || 'secondary';
      const compact = props.compact === true || props.compact === 'true' || props.compact === '';
      const icon = props.icon || 'none';
      const source = props.iconSource || '';
      const hasIcon = (icon !== 'none' && icon !== '') || source !== '';
      return {
        '--p-tag-color': TEXT[variant] || TEXT.secondary,
        '--p-tag-bg': BG[variant] || BG.secondary,
        '--p-tag-hover': HOVER[variant] || HOVER.secondary,
        '--p-tag-pad': compact
          ? 'var(--p-spacing-static-2xs) var(--p-spacing-static-sm)'
          : '4px calc(12 * var(--p-spacing-static-2xs))',
        '--p-tag-radius': compact
          ? 'calc(1px + (var(--p-leading-normal) / 2))'
          : 'calc(4px + (var(--p-leading-normal) / 2))',
        '--p-tag-blur': FROSTED[variant] ? 'var(--p-blur-frosted)' : '',
        '--p-tag-icon-display': hasIcon ? '' : 'none',
        '--p-tag-icon-margin': hasIcon ? '-2px' : '',
      };
    },
    get iconName(): string {
      const icon = props.icon || 'none';
      if (icon === 'none' || icon === '') return '';
      return icon;
    },
    get iconSrc(): string {
      return props.iconSource || '';
    },
  });

  useStyle(`
    :host {
      display: inline-flex;
      vertical-align: top;
      white-space: nowrap;
    }
    :host([hidden]) {
      display: none !important;
    }
    :not(:defined, [data-ssr]) {
      visibility: hidden;
    }
    span {
      position: relative;
      display: flex;
      gap: 2px;
      padding: var(--p-tag-pad);
      border-radius: var(--p-tag-radius);
      font: var(--p-font-weight-normal) var(--p-typescale-xs) / var(--p-leading-normal) var(--p-font-porsche-next);
      -webkit-backdrop-filter: var(--p-tag-blur);
      backdrop-filter: var(--p-tag-blur);
      color: var(--p-tag-color);
      background: var(--p-tag-bg);
      transition: color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), background-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), backdrop-filter var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
    }
    ::slotted(a),
    ::slotted(button) {
      all: unset !important;
      text-decoration: underline !important;
      cursor: pointer !important;
      font: inherit !important;
      color: inherit !important;
    }
    ::slotted(a)::before,
    ::slotted(button)::before {
      content: "" !important;
      position: absolute !important;
      inset: 0 !important;
      border-radius: var(--p-radius-full) !important;
    }
    ::slotted(a:focus-visible)::before,
    ::slotted(button:focus-visible)::before {
      outline: 2px solid var(--p-color-focus) !important;
      outline-offset: 2px !important;
    }
    ::slotted(br) {
      display: none !important;
    }
    @media (forced-colors: active) {
      span {
        outline: 2px solid CanvasText;
        outline-offset: -2px;
        background-color: Canvas;
        color: CanvasText;
      }
      ::slotted(a:focus-visible)::before,
      ::slotted(button:focus-visible)::before {
        outline-color: Highlight !important;
      }
    }
    @media (hover: hover) {
      span:hover {
        background: var(--p-tag-hover);
      }
    }
    p-icon {
      display: var(--p-tag-icon-display, unset);
      margin-inline-start: var(--p-tag-icon-margin, unset);
    }
  `);

  return (
    <span>
      <p-icon
        class="icon"
        name={state.iconName}
        source={state.iconSrc}
        color="inherit"
        size="x-small"
        aria-hidden="true"
      />
      <slot></slot>
    </span>
  );
}
