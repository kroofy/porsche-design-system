import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-checkbox' });

const CHECK_MASK =
  "url('data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"m20.22,7.47l-1.47-1.42-9.26,9.02-4.24-4.15-1.47,1.42,5.71,5.6,10.73-10.47Z\"/></svg>') center/contain no-repeat";
const DASH_MASK =
  "url('data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"m20,11v2H4v-2h16Z\"/></svg>') center/contain no-repeat";

const BREAKPOINTS = ['base', 'xs', 's', 'm', 'l', 'xl', 'xxl'] as const;

const assignHide = (vars: Record<string, string>, bp: string, hidden: boolean) => {
  const p = bp === 'base' ? '--p-cb-lw' : `--p-cb-lw-${bp}`;
  if (hidden) {
    vars[`${p}-pos`] = 'absolute';
    vars[`${p}-w`] = '1px';
    vars[`${p}-h`] = '1px';
    vars[`${p}-pad`] = '0';
    vars[`${p}-m`] = '-1px';
    vars[`${p}-ov`] = 'hidden';
    vars[`${p}-clip`] = 'rect(0, 0, 0, 0)';
    vars[`${p}-ws`] = 'nowrap';
    vars[`${p}-minw`] = '';
    vars[`${p}-pt`] = '';
    vars[`${p}-pis`] = '';
    return;
  }
  vars[`${p}-pos`] = 'static';
  vars[`${p}-w`] = 'auto';
  vars[`${p}-h`] = 'auto';
  vars[`${p}-pad`] = '0';
  vars[`${p}-m`] = '0';
  vars[`${p}-ov`] = 'visible';
  vars[`${p}-clip`] = 'auto';
  vars[`${p}-ws`] = 'normal';
  vars[`${p}-minw`] = 'fit-content';
  vars[`${p}-pt`] =
    'max(0px, calc((calc(var(--_p-checkbox-scaling) * 1.75rem) - var(--p-leading-normal)) / 2))';
  vars[`${p}-pis`] = 'calc(11.2px * (var(--_p-checkbox-scaling) - 0.64285714) + 4px)';
};

export default function LitCheckbox(props: {
  label?: string;
  name?: string;
  value?: string;
  checked?: any;
  indeterminate?: any;
  disabled?: any;
  loading?: any;
  compact?: any;
  required?: any;
  state?: string;
  message?: string;
  hideLabel?: any;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const parse = (raw: any, fallback: any) => {
        if (raw === undefined || raw === null || raw === '') return fallback;
        if (typeof raw === 'string' && raw.charAt(0) === '{') {
          try {
            return JSON.parse(raw.replace(/'/g, '"').replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi, '"$1":'));
          } catch (e) {
            return fallback;
          }
        }
        return raw;
      };
      const isTrue = (v: any) => v === true || v === 'true' || v === '';
      const pick = (obj: any, key: any, fallback: any) => {
        if (obj && typeof obj === 'object') {
          if (obj[key] === undefined) return fallback;
          return obj[key];
        }
        return obj;
      };
      const disabled = isTrue(props.disabled);
      const loading = isTrue(props.loading);
      const compact = isTrue(props.compact);
      const blocked = disabled || loading;
      const formState = props.state || 'none';
      const message = props.message || '';
      const hasMsg = !!message && (formState === 'success' || formState === 'error');
      const hasLbl = !!(props.label || '');
      const hideLabel = parse(props.hideLabel, false);
      const hideBase = typeof hideLabel === 'object' && hideLabel !== null ? pick(hideLabel, 'base', false) : hideLabel;
      const palettes: any = {
        none: {
          bg: 'var(--p-checkbox-background-color, var(--p-color-frosted))',
          border: 'var(--p-checkbox-border-color, var(--p-color-contrast-lower))',
          hover: 'var(--p-checkbox-border-color, var(--p-color-primary))',
          checked: 'var(--p-color-primary)',
          checkedHover: 'var(--p-checkbox-border-color, var(--p-color-contrast-high))',
          indeterminate: 'var(--p-color-primary)',
          message: '',
        },
        success: {
          bg: 'var(--p-checkbox-background-color, var(--p-color-success-frosted-soft))',
          border: 'var(--p-checkbox-border-color, var(--p-color-success))',
          hover: 'var(--p-checkbox-border-color, var(--p-color-success))',
          checked: 'var(--p-color-success)',
          checkedHover: '',
          indeterminate: 'var(--p-color-success)',
          message: 'var(--p-color-success)',
        },
        error: {
          bg: 'var(--p-checkbox-background-color, var(--p-color-error-frosted-soft))',
          border: 'var(--p-checkbox-border-color, var(--p-color-error))',
          hover: 'var(--p-checkbox-border-color, var(--p-color-error))',
          checked: 'var(--p-color-error)',
          checkedHover: '',
          indeterminate: 'var(--p-color-error)',
          message: 'var(--p-color-error)',
        },
      };
      const palette = palettes[formState] || palettes.none;
      const vars: Record<string, string> = {
        '--p-cb-scale': compact ? '0.64285714' : '1',
        '--p-cb-radius': compact ? 'var(--p-radius-md)' : 'var(--p-radius-lg)',
        '--p-cb-bg': palette.bg,
        '--p-cb-border': palette.border,
        '--p-cb-hover': palette.hover,
        '--p-cb-checked': loading ? '' : palette.checked,
        '--p-cb-checked-hover': !loading && formState === 'none' ? palette.checkedHover : '',
        '--p-cb-checked-hover-border': !loading && formState === 'none' ? 'transparent' : '',
        '--p-cb-indeterminate': loading ? '' : palette.indeterminate,
        '--p-cb-check-mask': loading ? '' : CHECK_MASK,
        '--p-cb-dash-mask': loading ? '' : DASH_MASK,
        '--p-cb-icon-bg': loading ? '' : 'var(--p-checkbox-icon-color, var(--p-color-canvas))',
        '--p-cb-pe': blocked ? 'none' : '',
        '--p-cb-cursor': blocked ? 'not-allowed' : 'pointer',
        '--p-cb-opacity': disabled ? '0.4' : '',
        '--p-cb-fc-border': blocked ? 'GrayText' : '',
        '--p-cb-spinner-display': loading ? '' : 'none',
        '--p-cb-lw-display': hasLbl ? '' : 'none',
        '--p-cb-msg': palette.message,
        '--p-cb-msg-opacity': hasMsg ? '' : '0',
        '--p-cb-msg-pos': hasMsg ? '' : 'absolute',
        '--p-cb-icon-display': hasMsg ? '' : 'none',
      };
      if (typeof hideLabel === 'object' && hideLabel !== null) {
        let last = isTrue(hideBase);
        for (const bp of BREAKPOINTS) {
          if (hideLabel[bp] !== undefined) last = isTrue(pick(hideLabel, bp, hideBase));
          assignHide(vars, bp, last);
        }
      } else {
        assignHide(vars, 'base', isTrue(hideBase));
      }
      return vars;
    },
    get labelText(): string {
      return props.label || '';
    },
    get messageText(): string {
      const formState = props.state || 'none';
      const message = props.message || '';
      if (!message || (formState !== 'success' && formState !== 'error')) return '';
      return message;
    },
    get iconName(): string {
      const formState = props.state || 'none';
      const message = props.message || '';
      if (!message || (formState !== 'success' && formState !== 'error')) return '';
      return formState === 'error' ? 'exclamation' : 'check';
    },
    get iconColor(): string {
      const formState = props.state || 'none';
      if (formState === 'error') return 'error';
      if (formState === 'success') return 'success';
      return '';
    },
    get isChecked(): any {
      return props.checked === true || props.checked === 'true' || props.checked === '';
    },
    get isDisabled(): any {
      return props.disabled === true || props.disabled === 'true' || props.disabled === '';
    },
    get ariaDisabled(): string {
      const disabled = props.disabled === true || props.disabled === 'true' || props.disabled === '';
      const loading = props.loading === true || props.loading === 'true' || props.loading === '';
      return disabled || loading ? 'true' : '';
    },
    get ariaInvalid(): string {
      return props.state === 'error' ? 'true' : '';
    },
    get loadingText(): string {
      const loading = props.loading === true || props.loading === 'true' || props.loading === '';
      return loading ? 'Loading' : '';
    },
  });

  useStyle(`
    :host {
      display: block;
      --_p-checkbox-scaling: var(--p-cb-scale, 1);
    }
    :host([hidden]) {
      display: none !important;
    }
    :not(:defined, [data-ssr]) {
      visibility: hidden;
    }
    slot[name="label-after"] {
      display: inline-block;
      vertical-align: top;
    }
    slot[name="label-after"]::slotted(*) {
      margin-inline-start: var(--p-spacing-static-xs) !important;
    }
    .label-after {
      display: inline-block;
      vertical-align: top;
    }
    input {
      all: unset;
      display: grid;
      width: calc(var(--_p-checkbox-scaling) * 1.75rem);
      height: calc(var(--_p-checkbox-scaling) * 1.75rem);
      margin-block: max(0px, calc((var(--p-leading-normal) - calc(var(--_p-checkbox-scaling) * 1.75rem)) / 2));
      box-sizing: border-box;
      font: var(--p-typescale-sm) var(--p-font-porsche-next);
      background: var(--p-cb-bg);
      transition: background-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), border-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
      border: 1px solid var(--p-cb-border);
      border-radius: var(--p-cb-radius);
      pointer-events: var(--p-cb-pe);
    }
    input::before {
      content: "";
      grid-area: 1 / 1;
    }
    input::after {
      content: "";
      margin: calc(-1px - max(0px, calc(24px - calc(var(--_p-checkbox-scaling) * 1.75rem)) / 2));
      grid-area: 1 / 1;
    }
    input:focus-visible {
      outline: 2px solid var(--p-color-focus);
      outline-offset: 2px;
    }
    input:indeterminate::before {
      -webkit-mask: var(--p-cb-dash-mask);
      mask: var(--p-cb-dash-mask);
      background-color: var(--p-cb-indeterminate);
    }
    input:checked {
      background: var(--p-cb-checked, var(--p-cb-bg));
    }
    input:checked::before {
      -webkit-mask: var(--p-cb-check-mask);
      mask: var(--p-cb-check-mask);
      background-color: var(--p-cb-icon-bg);
    }
    .root {
      display: grid;
      row-gap: var(--p-spacing-static-xs);
    }
    .wrapper {
      position: relative;
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
    }
    .input-wrapper {
      position: relative;
      align-items: center;
      display: grid;
      align-self: flex-start;
      min-height: var(--p-leading-normal);
      cursor: var(--p-cb-cursor, pointer);
      opacity: var(--p-cb-opacity);
    }
    .spinner,
    p-spinner {
      display: var(--p-cb-spinner-display);
    }
    .spinner {
      --p-spinner-size: calc(calc(var(--_p-checkbox-scaling) * 1.75rem) - 2px);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .label-wrapper {
      display: var(--p-cb-lw-display);
      position: var(--p-cb-lw-pos, static);
      width: var(--p-cb-lw-w, auto);
      height: var(--p-cb-lw-h, auto);
      padding: var(--p-cb-lw-pad, 0);
      margin: var(--p-cb-lw-m, 0);
      overflow: var(--p-cb-lw-ov, visible);
      clip: var(--p-cb-lw-clip, auto);
      white-space: var(--p-cb-lw-ws, normal);
      min-width: var(--p-cb-lw-minw);
      padding-top: var(--p-cb-lw-pt);
      padding-inline-start: var(--p-cb-lw-pis);
    }
    .label {
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      cursor: var(--p-cb-cursor, pointer);
      color: var(--p-color-primary);
      pointer-events: var(--p-cb-pe);
      opacity: var(--p-cb-opacity);
      transition: color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
      display: inline;
    }
    .label:empty {
      display: none;
    }
    .label:is(span) {
      cursor: unset;
      font-size: var(--p-typescale-xs);
      color: var(--p-color-contrast-high);
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
    .label > slot[name="label"]::slotted(*) {
      display: inline !important;
    }
    .required {
      user-select: none;
    }
    .message {
      display: flex;
      gap: var(--p-spacing-static-xs);
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      color: var(--p-cb-msg);
      opacity: var(--p-cb-msg-opacity);
      position: var(--p-cb-msg-pos);
      transition: color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), opacity var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
    }
    .message:empty {
      opacity: 0;
      position: absolute;
    }
    .message p-icon {
      display: var(--p-cb-icon-display);
    }
    .loading {
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
      input {
        border-color: var(--p-cb-fc-border);
      }
      input:focus-visible {
        outline-color: Highlight;
      }
      input:indeterminate::before {
        background: CanvasText;
      }
      input:checked::before {
        background: CanvasText;
      }
    }
    @media (hover: hover) {
      input:hover {
        border-color: var(--p-cb-hover);
      }
      input:checked:hover {
        background-color: var(--p-cb-checked-hover);
        border-color: var(--p-cb-checked-hover-border);
      }
    }
    @media (min-width: 480px) {
      .label-wrapper {
        position: var(--p-cb-lw-xs-pos, var(--p-cb-lw-pos, static));
        width: var(--p-cb-lw-xs-w, var(--p-cb-lw-w, auto));
        height: var(--p-cb-lw-xs-h, var(--p-cb-lw-h, auto));
        padding: var(--p-cb-lw-xs-pad, var(--p-cb-lw-pad, 0));
        margin: var(--p-cb-lw-xs-m, var(--p-cb-lw-m, 0));
        overflow: var(--p-cb-lw-xs-ov, var(--p-cb-lw-ov, visible));
        clip: var(--p-cb-lw-xs-clip, var(--p-cb-lw-clip, auto));
        white-space: var(--p-cb-lw-xs-ws, var(--p-cb-lw-ws, normal));
        min-width: var(--p-cb-lw-xs-minw, var(--p-cb-lw-minw));
        padding-top: var(--p-cb-lw-xs-pt, var(--p-cb-lw-pt));
        padding-inline-start: var(--p-cb-lw-xs-pis, var(--p-cb-lw-pis));
      }
    }
    @media (min-width: 760px) {
      .label-wrapper {
        position: var(--p-cb-lw-s-pos, var(--p-cb-lw-xs-pos, var(--p-cb-lw-pos, static)));
        width: var(--p-cb-lw-s-w, var(--p-cb-lw-xs-w, var(--p-cb-lw-w, auto)));
        height: var(--p-cb-lw-s-h, var(--p-cb-lw-xs-h, var(--p-cb-lw-h, auto)));
        padding: var(--p-cb-lw-s-pad, var(--p-cb-lw-xs-pad, var(--p-cb-lw-pad, 0)));
        margin: var(--p-cb-lw-s-m, var(--p-cb-lw-xs-m, var(--p-cb-lw-m, 0)));
        overflow: var(--p-cb-lw-s-ov, var(--p-cb-lw-xs-ov, var(--p-cb-lw-ov, visible)));
        clip: var(--p-cb-lw-s-clip, var(--p-cb-lw-xs-clip, var(--p-cb-lw-clip, auto)));
        white-space: var(--p-cb-lw-s-ws, var(--p-cb-lw-xs-ws, var(--p-cb-lw-ws, normal)));
        min-width: var(--p-cb-lw-s-minw, var(--p-cb-lw-xs-minw, var(--p-cb-lw-minw)));
        padding-top: var(--p-cb-lw-s-pt, var(--p-cb-lw-xs-pt, var(--p-cb-lw-pt)));
        padding-inline-start: var(--p-cb-lw-s-pis, var(--p-cb-lw-xs-pis, var(--p-cb-lw-pis)));
      }
    }
    @media (min-width: 1000px) {
      .label-wrapper {
        position: var(--p-cb-lw-m-pos, var(--p-cb-lw-s-pos, var(--p-cb-lw-xs-pos, var(--p-cb-lw-pos, static))));
        width: var(--p-cb-lw-m-w, var(--p-cb-lw-s-w, var(--p-cb-lw-xs-w, var(--p-cb-lw-w, auto))));
        height: var(--p-cb-lw-m-h, var(--p-cb-lw-s-h, var(--p-cb-lw-xs-h, var(--p-cb-lw-h, auto))));
        padding: var(--p-cb-lw-m-pad, var(--p-cb-lw-s-pad, var(--p-cb-lw-xs-pad, var(--p-cb-lw-pad, 0))));
        margin: var(--p-cb-lw-m-m, var(--p-cb-lw-s-m, var(--p-cb-lw-xs-m, var(--p-cb-lw-m, 0))));
        overflow: var(--p-cb-lw-m-ov, var(--p-cb-lw-s-ov, var(--p-cb-lw-xs-ov, var(--p-cb-lw-ov, visible))));
        clip: var(--p-cb-lw-m-clip, var(--p-cb-lw-s-clip, var(--p-cb-lw-xs-clip, var(--p-cb-lw-clip, auto))));
        white-space: var(--p-cb-lw-m-ws, var(--p-cb-lw-s-ws, var(--p-cb-lw-xs-ws, var(--p-cb-lw-ws, normal))));
        min-width: var(--p-cb-lw-m-minw, var(--p-cb-lw-s-minw, var(--p-cb-lw-xs-minw, var(--p-cb-lw-minw))));
        padding-top: var(--p-cb-lw-m-pt, var(--p-cb-lw-s-pt, var(--p-cb-lw-xs-pt, var(--p-cb-lw-pt))));
        padding-inline-start: var(--p-cb-lw-m-pis, var(--p-cb-lw-s-pis, var(--p-cb-lw-xs-pis, var(--p-cb-lw-pis))));
      }
    }
    @media (min-width: 1300px) {
      .label-wrapper {
        position: var(--p-cb-lw-l-pos, var(--p-cb-lw-m-pos, var(--p-cb-lw-s-pos, var(--p-cb-lw-xs-pos, var(--p-cb-lw-pos, static)))));
        width: var(--p-cb-lw-l-w, var(--p-cb-lw-m-w, var(--p-cb-lw-s-w, var(--p-cb-lw-xs-w, var(--p-cb-lw-w, auto)))));
        height: var(--p-cb-lw-l-h, var(--p-cb-lw-m-h, var(--p-cb-lw-s-h, var(--p-cb-lw-xs-h, var(--p-cb-lw-h, auto)))));
        padding: var(--p-cb-lw-l-pad, var(--p-cb-lw-m-pad, var(--p-cb-lw-s-pad, var(--p-cb-lw-xs-pad, var(--p-cb-lw-pad, 0)))));
        margin: var(--p-cb-lw-l-m, var(--p-cb-lw-m-m, var(--p-cb-lw-s-m, var(--p-cb-lw-xs-m, var(--p-cb-lw-m, 0)))));
        overflow: var(--p-cb-lw-l-ov, var(--p-cb-lw-m-ov, var(--p-cb-lw-s-ov, var(--p-cb-lw-xs-ov, var(--p-cb-lw-ov, visible)))));
        clip: var(--p-cb-lw-l-clip, var(--p-cb-lw-m-clip, var(--p-cb-lw-s-clip, var(--p-cb-lw-xs-clip, var(--p-cb-lw-clip, auto)))));
        white-space: var(--p-cb-lw-l-ws, var(--p-cb-lw-m-ws, var(--p-cb-lw-s-ws, var(--p-cb-lw-xs-ws, var(--p-cb-lw-ws, normal)))));
        min-width: var(--p-cb-lw-l-minw, var(--p-cb-lw-m-minw, var(--p-cb-lw-s-minw, var(--p-cb-lw-xs-minw, var(--p-cb-lw-minw)))));
        padding-top: var(--p-cb-lw-l-pt, var(--p-cb-lw-m-pt, var(--p-cb-lw-s-pt, var(--p-cb-lw-xs-pt, var(--p-cb-lw-pt)))));
        padding-inline-start: var(--p-cb-lw-l-pis, var(--p-cb-lw-m-pis, var(--p-cb-lw-s-pis, var(--p-cb-lw-xs-pis, var(--p-cb-lw-pis)))));
      }
    }
    @media (min-width: 1760px) {
      .label-wrapper {
        position: var(--p-cb-lw-xl-pos, var(--p-cb-lw-l-pos));
        width: var(--p-cb-lw-xl-w, var(--p-cb-lw-l-w));
        height: var(--p-cb-lw-xl-h, var(--p-cb-lw-l-h));
        padding: var(--p-cb-lw-xl-pad, var(--p-cb-lw-l-pad));
        margin: var(--p-cb-lw-xl-m, var(--p-cb-lw-l-m));
        overflow: var(--p-cb-lw-xl-ov, var(--p-cb-lw-l-ov));
        clip: var(--p-cb-lw-xl-clip, var(--p-cb-lw-l-clip));
        white-space: var(--p-cb-lw-xl-ws, var(--p-cb-lw-l-ws));
        min-width: var(--p-cb-lw-xl-minw, var(--p-cb-lw-l-minw));
        padding-top: var(--p-cb-lw-xl-pt, var(--p-cb-lw-l-pt));
        padding-inline-start: var(--p-cb-lw-xl-pis, var(--p-cb-lw-l-pis));
      }
    }
    @media (min-width: 1920px) {
      .label-wrapper {
        position: var(--p-cb-lw-xxl-pos, var(--p-cb-lw-xl-pos));
        width: var(--p-cb-lw-xxl-w, var(--p-cb-lw-xl-w));
        height: var(--p-cb-lw-xxl-h, var(--p-cb-lw-xl-h));
        padding: var(--p-cb-lw-xxl-pad, var(--p-cb-lw-xl-pad));
        margin: var(--p-cb-lw-xxl-m, var(--p-cb-lw-xl-m));
        overflow: var(--p-cb-lw-xxl-ov, var(--p-cb-lw-xl-ov));
        clip: var(--p-cb-lw-xxl-clip, var(--p-cb-lw-xl-clip));
        white-space: var(--p-cb-lw-xxl-ws, var(--p-cb-lw-xl-ws));
        min-width: var(--p-cb-lw-xxl-minw, var(--p-cb-lw-xl-minw));
        padding-top: var(--p-cb-lw-xxl-pt, var(--p-cb-lw-xl-pt));
        padding-inline-start: var(--p-cb-lw-xxl-pis, var(--p-cb-lw-xl-pis));
      }
    }
  `);

  return (
    <div class="root">
      <div class="wrapper">
        <div class="input-wrapper">
          <input type="checkbox" />
          <p-spinner class="spinner" aria-hidden="true" />
        </div>
        <div class="label-wrapper">
          <label class="label">{state.labelText}</label>
        </div>
      </div>
      <span class="message">
        <p-icon aria-hidden="true" />
        {state.messageText}
      </span>
      <span class="loading" id="loading" role="status">
        {state.loadingText}
      </span>
    </div>
  );
}
