import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-pin-code' });

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

const isTrue = (v: any) => v === true || v === 'true' || v === '';

const pick = (obj: any, key: any, fallback: any) => {
  if (obj && typeof obj === 'object') {
    if (obj[key] === undefined) return fallback;
    return obj[key];
  }
  return obj;
};

const assignHide = (vars: Record<string, string>, bp: string, hidden: boolean) => {
  const p = bp === 'base' ? '--p-pc-lw' : `--p-pc-lw-${bp}`;
  const d = bp === 'base' ? '--p-pc-desc' : `--p-pc-desc-${bp}`;
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
    vars[`${d}-pos`] = 'absolute';
    vars[`${d}-w`] = '1px';
    vars[`${d}-h`] = '1px';
    vars[`${d}-pad`] = '0';
    vars[`${d}-m`] = '-1px';
    vars[`${d}-ov`] = 'hidden';
    vars[`${d}-clip`] = 'rect(0, 0, 0, 0)';
    vars[`${d}-ws`] = 'nowrap';
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
  vars[`${d}-pos`] = 'static';
  vars[`${d}-w`] = 'auto';
  vars[`${d}-h`] = 'auto';
  vars[`${d}-pad`] = '0';
  vars[`${d}-m`] = '0';
  vars[`${d}-ov`] = 'visible';
  vars[`${d}-clip`] = 'auto';
  vars[`${d}-ws`] = 'normal';
};

export default function LitPinCode(props: {
  label?: string;
  description?: string;
  message?: string;
  state?: string;
  hideLabel?: any;
  compact?: any;
  disabled?: any;
  loading?: any;
  required?: any;
  name?: string;
  value?: any;
  length?: any;
  type?: string;
  form?: string;
  theme?: string;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const disabled = isTrue(props.disabled);
      const loading = isTrue(props.loading);
      const compact = isTrue(props.compact);
      const formState = props.state === 'success' || props.state === 'error' ? props.state : 'none';
      const message = props.message || '';
      const hasMsg = !!message && (formState === 'success' || formState === 'error');
      const hideLabel = parse(props.hideLabel, false);
      let length = Number(props.length);
      if (!Number.isFinite(length) || length < 1) length = 4;
      if (length > 6) length = 6;
      const palettes: any = {
        none: {
          bg: 'var(--p-color-frosted)',
          border: 'var(--p-color-contrast-lower)',
          hover: 'var(--p-color-primary)',
          message: '',
        },
        success: {
          bg: 'var(--p-color-success-frosted-soft)',
          border: 'var(--p-color-success)',
          hover: 'var(--p-color-success)',
          message: 'var(--p-color-success)',
        },
        error: {
          bg: 'var(--p-color-error-frosted-soft)',
          border: 'var(--p-color-error)',
          hover: 'var(--p-color-error)',
          message: 'var(--p-color-error)',
        },
      };
      const palette = palettes[formState] || palettes.none;
      const pad = 'calc(11.2px * (var(--_p-pin-code-a) - 0.64285714) + 4px)';
      const vars: Record<string, string> = {
        '--p-pc-scale': compact ? '0.64285714' : '1',
        '--p-pc-radius': compact ? 'var(--p-radius-lg)' : 'var(--p-radius-xl)',
        '--p-pc-border': palette.border,
        '--p-pc-bg': palette.bg,
        '--p-pc-hover': palette.hover,
        '--p-pc-pad': pad,
        '--p-pc-cols': 'repeat(' + length + ', 1fr)',
        '--p-pc-font':
          'var(--p-font-weight-normal) var(--p-typescale-sm) / calc(var(--p-leading-normal) + 6px) var(--p-font-porsche-next)',
        '--p-pc-cursor': disabled || loading ? 'not-allowed' : 'text',
        '--p-pc-input-op': disabled || loading ? '0.4' : '',
        '--p-pc-input-fc-op': disabled || loading ? '1' : '',
        '--p-pc-input-fc-color': disabled || loading ? 'GrayText' : '',
        '--p-pc-label-cursor': disabled || loading ? 'not-allowed' : 'pointer',
        '--p-pc-pe': disabled || loading ? 'none' : '',
        '--p-pc-opacity': disabled ? '0.4' : '',
        '--p-pc-fc-op': disabled ? '1' : '',
        '--p-pc-fc-color': disabled ? 'GrayText' : '',
        '--p-pc-msg': palette.message || '',
        '--p-pc-msg-op': hasMsg ? '' : '0',
        '--p-pc-msg-pos': hasMsg ? '' : 'absolute',
        '--p-pc-icon-display': hasMsg ? 'inline-flex' : 'none',
      };
      if (typeof hideLabel === 'object' && hideLabel !== null) {
        let last = isTrue(pick(hideLabel, 'base', false));
        for (const bp of BREAKPOINTS) {
          if (hideLabel[bp] !== undefined) last = isTrue(pick(hideLabel, bp, false));
          assignHide(vars, bp, last);
        }
      } else {
        const hidden = isTrue(hideLabel);
        for (const bp of BREAKPOINTS) assignHide(vars, bp, hidden);
      }
      return vars;
    },
    get labelText(): string {
      return props.label || '';
    },
    get descriptionText(): string {
      return props.description || '';
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
    get isDisabled(): any {
      return props.disabled === true || props.disabled === 'true' || props.disabled === '';
    },
    get isLoading(): any {
      return props.loading === true || props.loading === 'true' || props.loading === '';
    },
    get isRequired(): any {
      return props.required === true || props.required === 'true' || props.required === '';
    },
    get ariaInvalid(): string {
      return props.state === 'error' ? 'true' : '';
    },
    get messageRole(): string {
      return props.state === 'success' ? 'status' : 'alert';
    },
    get loadingText(): string {
      if (props.loading === true || props.loading === 'true' || props.loading === '') return 'Loading';
      return '';
    },
    get inputType(): string {
      return props.type === 'password' ? 'password' : 'text';
    },
    get pinLength(): any {
      let length = Number(props.length);
      if (!Number.isFinite(length) || length < 1) length = 4;
      if (length > 6) length = 6;
      return length;
    },
    get parsedValue(): string {
      return props.value == null ? '' : String(props.value);
    },
  });

  useStyle(`
    :host {
      display: block;
      --_p-pin-code-a: var(--p-pc-scale, 1);
    }
    :host([hidden]) {
      display: none !important;
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
    :not(:defined, [data-ssr]) {
      visibility: hidden;
    }
    input {
      all: unset;
      display: block;
      width: auto;
      min-width: calc(1ch + var(--p-pc-pad) * 2 + 1px * 2);
      max-width: calc(var(--_p-pin-code-a) * 3.5rem);
      height: calc(var(--_p-pin-code-a) * 3.5rem);
      padding: var(--p-pc-pad);
      box-sizing: border-box;
      border: 1px solid var(--p-pc-border);
      border-radius: var(--p-pc-radius, var(--p-radius-xl));
      background: var(--p-pc-bg);
      font: var(--p-pc-font);
      color: var(--p-color-primary);
      transition: background-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), border-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
      text-overflow: ellipsis;
      cursor: var(--p-pc-cursor, text);
      text-align: center;
      opacity: var(--p-pc-input-op);
    }
    input:focus-visible {
      border-color: var(--p-pc-hover);
    }
    .root {
      all: unset;
      display: grid;
      gap: var(--p-spacing-static-xs);
    }
    .wrapper {
      position: relative;
      display: grid;
      grid-template-columns: var(--p-pc-cols);
      justify-self: flex-start;
      gap: var(--p-pc-pad);
    }
    .spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
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
    .label-wrapper {
      min-width: var(--p-pc-lw-minw);
      position: var(--p-pc-lw-pos, static);
      width: var(--p-pc-lw-w, auto);
      height: var(--p-pc-lw-h, auto);
      padding: var(--p-pc-lw-pad, 0);
      margin: var(--p-pc-lw-m, 0);
      overflow: var(--p-pc-lw-ov, visible);
      clip: var(--p-pc-lw-clip, auto);
      white-space: var(--p-pc-lw-ws, normal);
    }
    .label {
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      cursor: var(--p-pc-label-cursor, pointer);
      color: var(--p-color-primary);
      pointer-events: var(--p-pc-pe);
      opacity: var(--p-pc-opacity);
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
      min-width: unset;
      position: var(--p-pc-desc-pos, static);
      width: var(--p-pc-desc-w, auto);
      height: var(--p-pc-desc-h, auto);
      padding: var(--p-pc-desc-pad, 0);
      margin: var(--p-pc-desc-m, 0);
      overflow: var(--p-pc-desc-ov, visible);
      clip: var(--p-pc-desc-clip, auto);
      white-space: var(--p-pc-desc-ws, normal);
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
      color: var(--p-pc-msg, inherit);
      opacity: var(--p-pc-msg-op);
      position: var(--p-pc-msg-pos);
      transition: color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), opacity var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
    }
    .message:empty {
      opacity: 0;
      position: absolute;
    }
    .message p-icon {
      display: var(--p-pc-icon-display, none);
    }
    @media (forced-colors: active) {
      input {
        opacity: var(--p-pc-input-fc-op, var(--p-pc-input-op, 1));
        color: var(--p-pc-input-fc-color, var(--p-color-primary));
      }
      .label {
        opacity: var(--p-pc-fc-op, var(--p-pc-opacity, 1));
        color: var(--p-pc-fc-color, var(--p-color-primary));
      }
    }
    @media (hover: hover) {
      :host(:not([disabled]):not([loading])) input:hover {
        border-color: var(--p-pc-hover);
      }
    }
    @media (min-width: 480px) {
      .label-wrapper {
        min-width: var(--p-pc-lw-xs-minw, var(--p-pc-lw-minw));
        position: var(--p-pc-lw-xs-pos, var(--p-pc-lw-pos, static));
        width: var(--p-pc-lw-xs-w, var(--p-pc-lw-w, auto));
        height: var(--p-pc-lw-xs-h, var(--p-pc-lw-h, auto));
        padding: var(--p-pc-lw-xs-pad, var(--p-pc-lw-pad, 0));
        margin: var(--p-pc-lw-xs-m, var(--p-pc-lw-m, 0));
        overflow: var(--p-pc-lw-xs-ov, var(--p-pc-lw-ov, visible));
        clip: var(--p-pc-lw-xs-clip, var(--p-pc-lw-clip, auto));
        white-space: var(--p-pc-lw-xs-ws, var(--p-pc-lw-ws, normal));
      }
      .label:is(span) {
        position: var(--p-pc-desc-xs-pos, var(--p-pc-desc-pos, static));
        width: var(--p-pc-desc-xs-w, var(--p-pc-desc-w, auto));
        height: var(--p-pc-desc-xs-h, var(--p-pc-desc-h, auto));
        padding: var(--p-pc-desc-xs-pad, var(--p-pc-desc-pad, 0));
        margin: var(--p-pc-desc-xs-m, var(--p-pc-desc-m, 0));
        overflow: var(--p-pc-desc-xs-ov, var(--p-pc-desc-ov, visible));
        clip: var(--p-pc-desc-xs-clip, var(--p-pc-desc-clip, auto));
        white-space: var(--p-pc-desc-xs-ws, var(--p-pc-desc-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 760px) {
      .label-wrapper {
        min-width: var(--p-pc-lw-s-minw, var(--p-pc-lw-xs-minw, var(--p-pc-lw-minw)));
        position: var(--p-pc-lw-s-pos, var(--p-pc-lw-xs-pos, var(--p-pc-lw-pos, static)));
        width: var(--p-pc-lw-s-w, var(--p-pc-lw-xs-w, var(--p-pc-lw-w, auto)));
        height: var(--p-pc-lw-s-h, var(--p-pc-lw-xs-h, var(--p-pc-lw-h, auto)));
        padding: var(--p-pc-lw-s-pad, var(--p-pc-lw-xs-pad, var(--p-pc-lw-pad, 0)));
        margin: var(--p-pc-lw-s-m, var(--p-pc-lw-xs-m, var(--p-pc-lw-m, 0)));
        overflow: var(--p-pc-lw-s-ov, var(--p-pc-lw-xs-ov, var(--p-pc-lw-ov, visible)));
        clip: var(--p-pc-lw-s-clip, var(--p-pc-lw-xs-clip, var(--p-pc-lw-clip, auto)));
        white-space: var(--p-pc-lw-s-ws, var(--p-pc-lw-xs-ws, var(--p-pc-lw-ws, normal)));
      }
      .label:is(span) {
        position: var(--p-pc-desc-s-pos, var(--p-pc-desc-xs-pos, var(--p-pc-desc-pos, static)));
        width: var(--p-pc-desc-s-w, var(--p-pc-desc-xs-w, var(--p-pc-desc-w, auto)));
        height: var(--p-pc-desc-s-h, var(--p-pc-desc-xs-h, var(--p-pc-desc-h, auto)));
        padding: var(--p-pc-desc-s-pad, var(--p-pc-desc-xs-pad, var(--p-pc-desc-pad, 0)));
        margin: var(--p-pc-desc-s-m, var(--p-pc-desc-xs-m, var(--p-pc-desc-m, 0)));
        overflow: var(--p-pc-desc-s-ov, var(--p-pc-desc-xs-ov, var(--p-pc-desc-ov, visible)));
        clip: var(--p-pc-desc-s-clip, var(--p-pc-desc-xs-clip, var(--p-pc-desc-clip, auto)));
        white-space: var(--p-pc-desc-s-ws, var(--p-pc-desc-xs-ws, var(--p-pc-desc-ws, normal)));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 1000px) {
      .label-wrapper {
        min-width: var(--p-pc-lw-m-minw, var(--p-pc-lw-s-minw));
        position: var(--p-pc-lw-m-pos, var(--p-pc-lw-s-pos, static));
        width: var(--p-pc-lw-m-w, var(--p-pc-lw-s-w, auto));
        height: var(--p-pc-lw-m-h, var(--p-pc-lw-s-h, auto));
        padding: var(--p-pc-lw-m-pad, var(--p-pc-lw-s-pad, 0));
        margin: var(--p-pc-lw-m-m, var(--p-pc-lw-s-m, 0));
        overflow: var(--p-pc-lw-m-ov, var(--p-pc-lw-s-ov, visible));
        clip: var(--p-pc-lw-m-clip, var(--p-pc-lw-s-clip, auto));
        white-space: var(--p-pc-lw-m-ws, var(--p-pc-lw-s-ws, normal));
      }
      .label:is(span) {
        position: var(--p-pc-desc-m-pos, var(--p-pc-desc-s-pos, static));
        width: var(--p-pc-desc-m-w, var(--p-pc-desc-s-w, auto));
        height: var(--p-pc-desc-m-h, var(--p-pc-desc-s-h, auto));
        padding: var(--p-pc-desc-m-pad, var(--p-pc-desc-s-pad, 0));
        margin: var(--p-pc-desc-m-m, var(--p-pc-desc-s-m, 0));
        overflow: var(--p-pc-desc-m-ov, var(--p-pc-desc-s-ov, visible));
        clip: var(--p-pc-desc-m-clip, var(--p-pc-desc-s-clip, auto));
        white-space: var(--p-pc-desc-m-ws, var(--p-pc-desc-s-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 1300px) {
      .label-wrapper {
        min-width: var(--p-pc-lw-l-minw, var(--p-pc-lw-m-minw));
        position: var(--p-pc-lw-l-pos, var(--p-pc-lw-m-pos, static));
        width: var(--p-pc-lw-l-w, var(--p-pc-lw-m-w, auto));
        height: var(--p-pc-lw-l-h, var(--p-pc-lw-m-h, auto));
        padding: var(--p-pc-lw-l-pad, var(--p-pc-lw-m-pad, 0));
        margin: var(--p-pc-lw-l-m, var(--p-pc-lw-m-m, 0));
        overflow: var(--p-pc-lw-l-ov, var(--p-pc-lw-m-ov, visible));
        clip: var(--p-pc-lw-l-clip, var(--p-pc-lw-m-clip, auto));
        white-space: var(--p-pc-lw-l-ws, var(--p-pc-lw-m-ws, normal));
      }
      .label:is(span) {
        position: var(--p-pc-desc-l-pos, var(--p-pc-desc-m-pos, static));
        width: var(--p-pc-desc-l-w, var(--p-pc-desc-m-w, auto));
        height: var(--p-pc-desc-l-h, var(--p-pc-desc-m-h, auto));
        padding: var(--p-pc-desc-l-pad, var(--p-pc-desc-m-pad, 0));
        margin: var(--p-pc-desc-l-m, var(--p-pc-desc-m-m, 0));
        overflow: var(--p-pc-desc-l-ov, var(--p-pc-desc-m-ov, visible));
        clip: var(--p-pc-desc-l-clip, var(--p-pc-desc-m-clip, auto));
        white-space: var(--p-pc-desc-l-ws, var(--p-pc-desc-m-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 1760px) {
      .label-wrapper {
        min-width: var(--p-pc-lw-xl-minw, var(--p-pc-lw-l-minw));
        position: var(--p-pc-lw-xl-pos, var(--p-pc-lw-l-pos, static));
        width: var(--p-pc-lw-xl-w, var(--p-pc-lw-l-w, auto));
        height: var(--p-pc-lw-xl-h, var(--p-pc-lw-l-h, auto));
        padding: var(--p-pc-lw-xl-pad, var(--p-pc-lw-l-pad, 0));
        margin: var(--p-pc-lw-xl-m, var(--p-pc-lw-l-m, 0));
        overflow: var(--p-pc-lw-xl-ov, var(--p-pc-lw-l-ov, visible));
        clip: var(--p-pc-lw-xl-clip, var(--p-pc-lw-l-clip, auto));
        white-space: var(--p-pc-lw-xl-ws, var(--p-pc-lw-l-ws, normal));
      }
      .label:is(span) {
        position: var(--p-pc-desc-xl-pos, var(--p-pc-desc-l-pos, static));
        width: var(--p-pc-desc-xl-w, var(--p-pc-desc-l-w, auto));
        height: var(--p-pc-desc-xl-h, var(--p-pc-desc-l-h, auto));
        padding: var(--p-pc-desc-xl-pad, var(--p-pc-desc-l-pad, 0));
        margin: var(--p-pc-desc-xl-m, var(--p-pc-desc-l-m, 0));
        overflow: var(--p-pc-desc-xl-ov, var(--p-pc-desc-l-ov, visible));
        clip: var(--p-pc-desc-xl-clip, var(--p-pc-desc-l-clip, auto));
        white-space: var(--p-pc-desc-xl-ws, var(--p-pc-desc-l-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 1920px) {
      .label-wrapper {
        min-width: var(--p-pc-lw-xxl-minw, var(--p-pc-lw-xl-minw));
        position: var(--p-pc-lw-xxl-pos, var(--p-pc-lw-xl-pos, static));
        width: var(--p-pc-lw-xxl-w, var(--p-pc-lw-xl-w, auto));
        height: var(--p-pc-lw-xxl-h, var(--p-pc-lw-xl-h, auto));
        padding: var(--p-pc-lw-xxl-pad, var(--p-pc-lw-xl-pad, 0));
        margin: var(--p-pc-lw-xxl-m, var(--p-pc-lw-xl-m, 0));
        overflow: var(--p-pc-lw-xxl-ov, var(--p-pc-lw-xl-ov, visible));
        clip: var(--p-pc-lw-xxl-clip, var(--p-pc-lw-xl-clip, auto));
        white-space: var(--p-pc-lw-xxl-ws, var(--p-pc-lw-xl-ws, normal));
      }
      .label:is(span) {
        position: var(--p-pc-desc-xxl-pos, var(--p-pc-desc-xl-pos, static));
        width: var(--p-pc-desc-xxl-w, var(--p-pc-desc-xl-w, auto));
        height: var(--p-pc-desc-xxl-h, var(--p-pc-desc-xl-h, auto));
        padding: var(--p-pc-desc-xxl-pad, var(--p-pc-desc-xl-pad, 0));
        margin: var(--p-pc-desc-xxl-m, var(--p-pc-desc-xl-m, 0));
        overflow: var(--p-pc-desc-xxl-ov, var(--p-pc-desc-xl-ov, visible));
        clip: var(--p-pc-desc-xxl-clip, var(--p-pc-desc-xl-clip, auto));
        white-space: var(--p-pc-desc-xxl-ws, var(--p-pc-desc-xl-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
  `);

  return (
    <fieldset class="root">
      <div class="label-wrapper">
        <label class="label" id="label" for="current-input">
          {state.labelText}
        </label>
        <slot name="label-after" />
      </div>
      <span class="label" id="description">
        {state.descriptionText}
      </span>
      <div class="wrapper">
        <input />
        <input />
        <input />
        <input />
      </div>
      <span class="message" id="message">
        <p-icon aria-hidden="true" />
        {state.messageText}
      </span>
      <span class="loading" id="loading">
        {state.loadingText}
      </span>
    </fieldset>
  );
}
