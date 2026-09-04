import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-input-text' });

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
  const p = bp === 'base' ? '--p-it-lw' : `--p-it-lw-${bp}`;
  const d = bp === 'base' ? '--p-it-desc' : `--p-it-desc-${bp}`;
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

export default function LitInputText(props: {
  label?: string;
  description?: string;
  message?: string;
  state?: string;
  hideLabel?: any;
  compact?: any;
  disabled?: any;
  loading?: any;
  readOnly?: any;
  required?: any;
  counter?: any;
  name?: string;
  value?: string;
  placeholder?: string;
  form?: string;
  maxLength?: any;
  minLength?: any;
  theme?: string;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const disabled = isTrue(props.disabled);
      const loading = isTrue(props.loading);
      const compact = isTrue(props.compact);
      const readOnly = isTrue(props.readOnly);
      const hasCounter = isTrue(props.counter);
      const formState = props.state === 'success' || props.state === 'error' ? props.state : 'none';
      const message = props.message || '';
      const hasMsg = !!message && (formState === 'success' || formState === 'error');
      const hideLabel = parse(props.hideLabel, false);
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
      const vars: Record<string, string> = {
        '--p-it-scale': compact ? '0.64285714' : '1',
        '--p-it-radius': compact ? 'var(--p-radius-lg)' : 'var(--p-radius-xl)',
        '--p-it-border': readOnly ? 'transparent' : palette.border,
        '--p-it-bg': readOnly ? 'var(--p-color-frosted)' : palette.bg,
        '--p-it-color': readOnly ? 'var(--p-color-contrast-medium)' : 'var(--p-color-primary)',
        '--p-it-hover': palette.hover,
        '--p-it-cursor': disabled ? 'not-allowed' : 'text',
        '--p-it-wrap-op': disabled ? '0.4' : '',
        '--p-it-child-op': disabled ? '0.4' : '',
        '--p-it-label-cursor': disabled || loading ? 'not-allowed' : 'pointer',
        '--p-it-pe': disabled || loading ? 'none' : '',
        '--p-it-opacity': disabled ? '0.4' : '',
        '--p-it-msg': palette.message || '',
        '--p-it-msg-op': hasMsg ? '' : '0',
        '--p-it-msg-pos': hasMsg ? '' : 'absolute',
        '--p-it-icon-display': hasMsg ? 'inline-flex' : 'none',
        '--p-it-spinner-display': loading ? 'inline-flex' : 'none',
        '--p-it-counter-display': hasCounter ? '' : 'none',
        '--p-it-font':
          'var(--p-font-weight-normal) var(--p-typescale-sm) / calc(var(--p-leading-normal) + 6px) var(--p-font-porsche-next)',
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
    get inputValue(): string {
      return props.value == null ? '' : String(props.value);
    },
    get maxLengthValue(): string {
      return props.maxLength == null || props.maxLength === '' ? '' : String(props.maxLength);
    },
    get maxLengthNumber(): number {
      const parsed = Number.parseInt(state.maxLengthValue, 10);
      return Number.isFinite(parsed) ? parsed : 0;
    },
    get hasCounter(): any {
      return props.counter === true || props.counter === 'true' || props.counter === '';
    },
    get counterText(): string {
      if (!state.hasCounter) return '';
      if (state.maxLengthNumber) return `${state.inputValue.length}/${state.maxLengthNumber}`;
      return `${state.inputValue.length}`;
    },
    get remainingText(): string {
      if (!state.hasCounter) return '';
      if (state.maxLengthNumber) {
        return `You have ${state.maxLengthNumber - state.inputValue.length} out of ${state.maxLengthNumber} characters left`;
      }
      return `${state.inputValue.length} characters entered`;
    },
    get isDisabled(): any {
      return props.disabled === true || props.disabled === 'true' || props.disabled === '';
    },
    get isReadOnly(): any {
      return props.readOnly === true || props.readOnly === 'true' || props.readOnly === '';
    },
    get ariaDisabled(): string {
      const disabled = props.disabled === true || props.disabled === 'true' || props.disabled === '';
      const loading = props.loading === true || props.loading === 'true' || props.loading === '';
      return disabled || loading ? 'true' : '';
    },
    get ariaInvalid(): string {
      return props.state === 'error' ? 'true' : '';
    },
    get ariaReadonly(): string {
      return props.readOnly === true || props.readOnly === 'true' || props.readOnly === '' ? 'true' : '';
    },
    get loadingText(): string {
      const loading = props.loading === true || props.loading === 'true' || props.loading === '';
      return loading ? 'Loading' : '';
    },
    get placeholderText(): string {
      return props.placeholder || '';
    },
  });

  useStyle(`
    :host {
      display: block;
      --_p-input-base-a: var(--p-it-scale, 1);
      --ref-p-input-slotted-padding: calc(11.2px * (var(--_p-input-base-a) - 0.64285714)) !important;
      --ref-p-input-slotted-margin: calc(-1 * calc(11.2px * (var(--_p-input-base-a) - 0.64285714))) !important;
    }
    :host([hidden]) {
      display: none !important;
    }
    :host(:dir(rtl)) input::placeholder {
      direction: rtl;
      text-align: end;
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
      display: flex;
      flex: 1;
      align-items: center;
      width: max(100%, 2ch);
      height: 100%;
      font: var(--p-it-font);
      text-overflow: ellipsis;
    }
    .root {
      display: grid;
      gap: var(--p-spacing-static-xs);
    }
    .wrapper {
      display: flex;
      align-items: center;
      gap: calc(22.4px * (var(--_p-input-base-a) - 0.64285714) + 4px);
      height: calc(var(--_p-input-base-a) * 3.5rem);
      box-sizing: border-box;
      padding-inline: calc(22.4px * (var(--_p-input-base-a) - 0.64285714) + 8px);
      border: 1px solid var(--p-it-border);
      border-radius: var(--p-it-radius, var(--p-radius-xl));
      background: var(--p-it-bg);
      color: var(--p-it-color);
      cursor: var(--p-it-cursor, text);
      opacity: var(--p-it-wrap-op);
      transition: background-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), border-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
    }
    .wrapper > * {
      opacity: var(--p-it-child-op);
    }
    .wrapper:not(:has(input:disabled)):focus-within {
      border-color: var(--p-it-hover);
    }
    .label-wrapper {
      min-width: var(--p-it-lw-minw);
      position: var(--p-it-lw-pos, static);
      width: var(--p-it-lw-w, auto);
      height: var(--p-it-lw-h, auto);
      padding: var(--p-it-lw-pad, 0);
      margin: var(--p-it-lw-m, 0);
      overflow: var(--p-it-lw-ov, visible);
      clip: var(--p-it-lw-clip, auto);
      white-space: var(--p-it-lw-ws, normal);
    }
    .label {
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      cursor: var(--p-it-label-cursor, pointer);
      color: var(--p-color-primary);
      pointer-events: var(--p-it-pe);
      opacity: var(--p-it-opacity);
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
      position: var(--p-it-desc-pos, static);
      width: var(--p-it-desc-w, auto);
      height: var(--p-it-desc-h, auto);
      padding: var(--p-it-desc-pad, 0);
      margin: var(--p-it-desc-m, 0);
      overflow: var(--p-it-desc-ov, visible);
      clip: var(--p-it-desc-clip, auto);
      white-space: var(--p-it-desc-ws, normal);
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
      color: var(--p-it-msg, inherit);
      opacity: var(--p-it-msg-op);
      position: var(--p-it-msg-pos);
      transition: color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), opacity var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
    }
    .message:empty {
      opacity: 0;
      position: absolute;
    }
    .message p-icon {
      display: var(--p-it-icon-display, none);
    }
    p-spinner {
      display: var(--p-it-spinner-display, none);
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
    .counter {
      pointer-events: none;
      max-width: 100%;
      box-sizing: border-box;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      color: var(--p-color-contrast-high);
      display: var(--p-it-counter-display);
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
      .wrapper:not(:has(input:disabled)):focus-within {
        outline: 2px solid Highlight;
        outline-offset: 2px;
      }
      :host([disabled]) .wrapper {
        opacity: 1;
        color: GrayText;
        border-color: GrayText;
      }
      :host([disabled]) .wrapper > * {
        opacity: 1;
        color: GrayText;
      }
      :host([disabled]) .label {
        opacity: 1;
        color: GrayText;
      }
    }
    @media (hover: hover) {
      :host(:not([disabled]):not([read-only]):not([loading])) .wrapper:hover:not(.button:hover),
      :host(:not([disabled]):not([read-only]):not([loading])) .label-wrapper:hover ~ .wrapper {
        border-color: var(--p-it-hover);
      }
    }
    @media (min-width: 480px) {
      .label-wrapper {
        min-width: var(--p-it-lw-xs-minw, var(--p-it-lw-minw));
        position: var(--p-it-lw-xs-pos, var(--p-it-lw-pos, static));
        width: var(--p-it-lw-xs-w, var(--p-it-lw-w, auto));
        height: var(--p-it-lw-xs-h, var(--p-it-lw-h, auto));
        padding: var(--p-it-lw-xs-pad, var(--p-it-lw-pad, 0));
        margin: var(--p-it-lw-xs-m, var(--p-it-lw-m, 0));
        overflow: var(--p-it-lw-xs-ov, var(--p-it-lw-ov, visible));
        clip: var(--p-it-lw-xs-clip, var(--p-it-lw-clip, auto));
        white-space: var(--p-it-lw-xs-ws, var(--p-it-lw-ws, normal));
      }
      .label:is(span) {
        position: var(--p-it-desc-xs-pos, var(--p-it-desc-pos, static));
        width: var(--p-it-desc-xs-w, var(--p-it-desc-w, auto));
        height: var(--p-it-desc-xs-h, var(--p-it-desc-h, auto));
        padding: var(--p-it-desc-xs-pad, var(--p-it-desc-pad, 0));
        margin: var(--p-it-desc-xs-m, var(--p-it-desc-m, 0));
        overflow: var(--p-it-desc-xs-ov, var(--p-it-desc-ov, visible));
        clip: var(--p-it-desc-xs-clip, var(--p-it-desc-clip, auto));
        white-space: var(--p-it-desc-xs-ws, var(--p-it-desc-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 760px) {
      .label-wrapper {
        min-width: var(--p-it-lw-s-minw, var(--p-it-lw-xs-minw, var(--p-it-lw-minw)));
        position: var(--p-it-lw-s-pos, var(--p-it-lw-xs-pos, var(--p-it-lw-pos, static)));
        width: var(--p-it-lw-s-w, var(--p-it-lw-xs-w, var(--p-it-lw-w, auto)));
        height: var(--p-it-lw-s-h, var(--p-it-lw-xs-h, var(--p-it-lw-h, auto)));
        padding: var(--p-it-lw-s-pad, var(--p-it-lw-xs-pad, var(--p-it-lw-pad, 0)));
        margin: var(--p-it-lw-s-m, var(--p-it-lw-xs-m, var(--p-it-lw-m, 0)));
        overflow: var(--p-it-lw-s-ov, var(--p-it-lw-xs-ov, var(--p-it-lw-ov, visible)));
        clip: var(--p-it-lw-s-clip, var(--p-it-lw-xs-clip, var(--p-it-lw-clip, auto)));
        white-space: var(--p-it-lw-s-ws, var(--p-it-lw-xs-ws, var(--p-it-lw-ws, normal)));
      }
      .label:is(span) {
        position: var(--p-it-desc-s-pos, var(--p-it-desc-xs-pos, var(--p-it-desc-pos, static)));
        width: var(--p-it-desc-s-w, var(--p-it-desc-xs-w, var(--p-it-desc-w, auto)));
        height: var(--p-it-desc-s-h, var(--p-it-desc-xs-h, var(--p-it-desc-h, auto)));
        padding: var(--p-it-desc-s-pad, var(--p-it-desc-xs-pad, var(--p-it-desc-pad, 0)));
        margin: var(--p-it-desc-s-m, var(--p-it-desc-xs-m, var(--p-it-desc-m, 0)));
        overflow: var(--p-it-desc-s-ov, var(--p-it-desc-xs-ov, var(--p-it-desc-ov, visible)));
        clip: var(--p-it-desc-s-clip, var(--p-it-desc-xs-clip, var(--p-it-desc-clip, auto)));
        white-space: var(--p-it-desc-s-ws, var(--p-it-desc-xs-ws, var(--p-it-desc-ws, normal)));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 1000px) {
      .label-wrapper {
        min-width: var(--p-it-lw-m-minw, var(--p-it-lw-s-minw));
        position: var(--p-it-lw-m-pos, var(--p-it-lw-s-pos, static));
        width: var(--p-it-lw-m-w, var(--p-it-lw-s-w, auto));
        height: var(--p-it-lw-m-h, var(--p-it-lw-s-h, auto));
        padding: var(--p-it-lw-m-pad, var(--p-it-lw-s-pad, 0));
        margin: var(--p-it-lw-m-m, var(--p-it-lw-s-m, 0));
        overflow: var(--p-it-lw-m-ov, var(--p-it-lw-s-ov, visible));
        clip: var(--p-it-lw-m-clip, var(--p-it-lw-s-clip, auto));
        white-space: var(--p-it-lw-m-ws, var(--p-it-lw-s-ws, normal));
      }
      .label:is(span) {
        position: var(--p-it-desc-m-pos, var(--p-it-desc-s-pos, static));
        width: var(--p-it-desc-m-w, var(--p-it-desc-s-w, auto));
        height: var(--p-it-desc-m-h, var(--p-it-desc-s-h, auto));
        padding: var(--p-it-desc-m-pad, var(--p-it-desc-s-pad, 0));
        margin: var(--p-it-desc-m-m, var(--p-it-desc-s-m, 0));
        overflow: var(--p-it-desc-m-ov, var(--p-it-desc-s-ov, visible));
        clip: var(--p-it-desc-m-clip, var(--p-it-desc-s-clip, auto));
        white-space: var(--p-it-desc-m-ws, var(--p-it-desc-s-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 1300px) {
      .label-wrapper {
        min-width: var(--p-it-lw-l-minw, var(--p-it-lw-m-minw));
        position: var(--p-it-lw-l-pos, var(--p-it-lw-m-pos, static));
        width: var(--p-it-lw-l-w, var(--p-it-lw-m-w, auto));
        height: var(--p-it-lw-l-h, var(--p-it-lw-m-h, auto));
        padding: var(--p-it-lw-l-pad, var(--p-it-lw-m-pad, 0));
        margin: var(--p-it-lw-l-m, var(--p-it-lw-m-m, 0));
        overflow: var(--p-it-lw-l-ov, var(--p-it-lw-m-ov, visible));
        clip: var(--p-it-lw-l-clip, var(--p-it-lw-m-clip, auto));
        white-space: var(--p-it-lw-l-ws, var(--p-it-lw-m-ws, normal));
      }
      .label:is(span) {
        position: var(--p-it-desc-l-pos, var(--p-it-desc-m-pos, static));
        width: var(--p-it-desc-l-w, var(--p-it-desc-m-w, auto));
        height: var(--p-it-desc-l-h, var(--p-it-desc-m-h, auto));
        padding: var(--p-it-desc-l-pad, var(--p-it-desc-m-pad, 0));
        margin: var(--p-it-desc-l-m, var(--p-it-desc-m-m, 0));
        overflow: var(--p-it-desc-l-ov, var(--p-it-desc-m-ov, visible));
        clip: var(--p-it-desc-l-clip, var(--p-it-desc-m-clip, auto));
        white-space: var(--p-it-desc-l-ws, var(--p-it-desc-m-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 1760px) {
      .label-wrapper {
        min-width: var(--p-it-lw-xl-minw, var(--p-it-lw-l-minw));
        position: var(--p-it-lw-xl-pos, var(--p-it-lw-l-pos, static));
        width: var(--p-it-lw-xl-w, var(--p-it-lw-l-w, auto));
        height: var(--p-it-lw-xl-h, var(--p-it-lw-l-h, auto));
        padding: var(--p-it-lw-xl-pad, var(--p-it-lw-l-pad, 0));
        margin: var(--p-it-lw-xl-m, var(--p-it-lw-l-m, 0));
        overflow: var(--p-it-lw-xl-ov, var(--p-it-lw-l-ov, visible));
        clip: var(--p-it-lw-xl-clip, var(--p-it-lw-l-clip, auto));
        white-space: var(--p-it-lw-xl-ws, var(--p-it-lw-l-ws, normal));
      }
      .label:is(span) {
        position: var(--p-it-desc-xl-pos, var(--p-it-desc-l-pos, static));
        width: var(--p-it-desc-xl-w, var(--p-it-desc-l-w, auto));
        height: var(--p-it-desc-xl-h, var(--p-it-desc-l-h, auto));
        padding: var(--p-it-desc-xl-pad, var(--p-it-desc-l-pad, 0));
        margin: var(--p-it-desc-xl-m, var(--p-it-desc-l-m, 0));
        overflow: var(--p-it-desc-xl-ov, var(--p-it-desc-l-ov, visible));
        clip: var(--p-it-desc-xl-clip, var(--p-it-desc-l-clip, auto));
        white-space: var(--p-it-desc-xl-ws, var(--p-it-desc-l-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 1920px) {
      .label-wrapper {
        min-width: var(--p-it-lw-xxl-minw, var(--p-it-lw-xl-minw));
        position: var(--p-it-lw-xxl-pos, var(--p-it-lw-xl-pos, static));
        width: var(--p-it-lw-xxl-w, var(--p-it-lw-xl-w, auto));
        height: var(--p-it-lw-xxl-h, var(--p-it-lw-xl-h, auto));
        padding: var(--p-it-lw-xxl-pad, var(--p-it-lw-xl-pad, 0));
        margin: var(--p-it-lw-xxl-m, var(--p-it-lw-xl-m, 0));
        overflow: var(--p-it-lw-xxl-ov, var(--p-it-lw-xl-ov, visible));
        clip: var(--p-it-lw-xxl-clip, var(--p-it-lw-xl-clip, auto));
        white-space: var(--p-it-lw-xxl-ws, var(--p-it-lw-xl-ws, normal));
      }
      .label:is(span) {
        position: var(--p-it-desc-xxl-pos, var(--p-it-desc-xl-pos, static));
        width: var(--p-it-desc-xxl-w, var(--p-it-desc-xl-w, auto));
        height: var(--p-it-desc-xxl-h, var(--p-it-desc-xl-h, auto));
        padding: var(--p-it-desc-xxl-pad, var(--p-it-desc-xl-pad, 0));
        margin: var(--p-it-desc-xxl-m, var(--p-it-desc-xl-m, 0));
        overflow: var(--p-it-desc-xxl-ov, var(--p-it-desc-xl-ov, visible));
        clip: var(--p-it-desc-xxl-clip, var(--p-it-desc-xl-clip, auto));
        white-space: var(--p-it-desc-xxl-ws, var(--p-it-desc-xl-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
  `);

  return (
    <div class="root">
      <div class="label-wrapper">
        <label class="label" id="label" for="input-text">
          {state.labelText}
        </label>
        <slot name="label-after" />
      </div>
      <span class="label" id="description">
        {state.descriptionText}
      </span>
      <div class="wrapper">
        <slot name="start" />
        <input type="text" id="input-text" dir="auto" />
        <span class="sr-only" aria-live="polite">
          {state.remainingText}
        </span>
        <span class="counter" aria-hidden="true">
          {state.counterText}
        </span>
        <slot name="end" />
        <p-spinner aria-hidden="true" />
      </div>
      <span class="message" id="message">
        <p-icon aria-hidden="true" />
        {state.messageText}
      </span>
      <span class="loading" id="loading" role="status">
        {state.loadingText}
      </span>
    </div>
  );
}
