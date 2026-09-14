import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-textarea' });

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
  const p = bp === 'base' ? '--p-ta-lw' : `--p-ta-lw-${bp}`;
  const d = bp === 'base' ? '--p-ta-desc' : `--p-ta-desc-${bp}`;
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

export default function LitTextarea(props: {
  label?: string;
  description?: string;
  message?: string;
  state?: string;
  hideLabel?: any;
  compact?: any;
  disabled?: any;
  readOnly?: any;
  required?: any;
  counter?: any;
  name?: string;
  value?: string;
  placeholder?: string;
  form?: string;
  maxLength?: any;
  minLength?: any;
  rows?: any;
  resize?: string;
  theme?: string;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const disabled = isTrue(props.disabled);
      const compact = isTrue(props.compact);
      const readOnly = isTrue(props.readOnly);
      const hasCounter = isTrue(props.counter);
      const resize = props.resize || 'vertical';
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
      const padBlock = 'calc(28px * (var(--_p-textarea-a) - 0.64285714) + 5px)';
      const padInline = 'calc(22.4px * (var(--_p-textarea-a) - 0.64285714) + 8px)';
      const padBottom = 'calc(var(--p-leading-normal) + calc(22.4px * (var(--_p-textarea-a) - 0.64285714) + 4px))';
      const vars: Record<string, string> = {
        '--p-ta-scale': compact ? '0.64285714' : '1',
        '--p-ta-resize': resize,
        '--p-ta-radius': compact ? 'var(--p-radius-lg)' : 'var(--p-radius-xl)',
        '--p-ta-border': readOnly ? 'transparent' : palette.border,
        '--p-ta-bg': readOnly ? 'var(--p-color-frosted)' : palette.bg,
        '--p-ta-color': readOnly ? 'var(--p-color-contrast-medium)' : 'var(--p-color-primary)',
        '--p-ta-hover': palette.hover,
        '--p-ta-pad': hasCounter ? padBlock + ' ' + padInline + ' ' + padBottom : padBlock + ' ' + padInline,
        '--p-ta-cursor': disabled ? 'not-allowed' : 'text',
        '--p-ta-wrap-op': disabled ? '0.4' : '',
        '--p-ta-label-cursor': disabled ? 'not-allowed' : 'pointer',
        '--p-ta-pe': disabled ? 'none' : '',
        '--p-ta-opacity': disabled ? '0.4' : '',
        '--p-ta-fc-op': disabled ? '1' : '',
        '--p-ta-fc-color': disabled ? 'GrayText' : '',
        '--p-ta-msg': palette.message || '',
        '--p-ta-msg-op': hasMsg ? '' : '0',
        '--p-ta-msg-pos': hasMsg ? '' : 'absolute',
        '--p-ta-icon-display': hasMsg ? 'inline-flex' : 'none',
        '--p-ta-counter-display': hasCounter ? '' : 'none',
        '--p-ta-counter-me': padInline,
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
    get rowsValue(): string {
      if (props.rows == null || props.rows === '') return '7';
      return String(props.rows);
    },
    get counterText(): string {
      const value = props.value == null ? '' : String(props.value);
      const max = props.maxLength == null || props.maxLength === '' ? '' : String(props.maxLength);
      if (max) return value.length + '/' + max;
      return String(value.length);
    },
    get srOnlyText(): string {
      const value = props.value == null ? '' : String(props.value);
      const max = props.maxLength == null || props.maxLength === '' ? '' : String(props.maxLength);
      if (max) return 'You have ' + (Number(max) - value.length) + ' out of ' + max + ' characters left';
      return value.length + ' characters entered';
    },
    get isDisabled(): any {
      return props.disabled === true || props.disabled === 'true' || props.disabled === '';
    },
    get isReadOnly(): any {
      return props.readOnly === true || props.readOnly === 'true' || props.readOnly === '';
    },
    get ariaInvalid(): string {
      return props.state === 'error' ? 'true' : '';
    },
    get placeholderText(): string {
      return props.placeholder || '';
    },
  });

  useStyle(`
    :host {
      display: block;
      --_p-textarea-a: var(--p-ta-scale, 1);
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
    textarea {
      all: unset;
      grid-area: 1 / 1;
      display: block;
      resize: var(--p-ta-resize, vertical);
      field-sizing: var(--p-textarea-field-sizing, unset);
      min-width: var(--p-textarea-min-width, 2ch);
      max-width: var(--p-textarea-max-width, unset);
      min-height: var(--p-textarea-min-height, calc(var(--_p-textarea-a) * 3.5rem));
      max-height: var(--p-textarea-max-height, unset);
      border: 1px solid var(--p-ta-border);
      border-radius: var(--p-ta-radius, var(--p-radius-xl));
      background: var(--p-ta-bg);
      color: var(--p-ta-color);
      box-sizing: border-box;
      transition: background-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), border-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      padding: var(--p-ta-pad);
      cursor: var(--p-ta-cursor, text);
    }
    textarea:focus {
      border-color: var(--p-ta-hover);
    }
    .root {
      display: grid;
      gap: var(--p-spacing-static-xs);
    }
    .wrapper {
      display: grid;
      opacity: var(--p-ta-wrap-op);
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
      grid-area: 1 / 1;
      place-self: flex-end;
      margin-inline-end: var(--p-ta-counter-me);
      margin-bottom: calc(11.2px * (var(--_p-textarea-a) - 0.64285714) + 4px);
      display: var(--p-ta-counter-display);
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
      display: var(--p-ta-counter-display);
    }
    .label-wrapper {
      min-width: var(--p-ta-lw-minw);
      position: var(--p-ta-lw-pos, static);
      width: var(--p-ta-lw-w, auto);
      height: var(--p-ta-lw-h, auto);
      padding: var(--p-ta-lw-pad, 0);
      margin: var(--p-ta-lw-m, 0);
      overflow: var(--p-ta-lw-ov, visible);
      clip: var(--p-ta-lw-clip, auto);
      white-space: var(--p-ta-lw-ws, normal);
    }
    .label {
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      cursor: var(--p-ta-label-cursor, pointer);
      color: var(--p-color-primary);
      pointer-events: var(--p-ta-pe);
      opacity: var(--p-ta-opacity);
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
      position: var(--p-ta-desc-pos, static);
      width: var(--p-ta-desc-w, auto);
      height: var(--p-ta-desc-h, auto);
      padding: var(--p-ta-desc-pad, 0);
      margin: var(--p-ta-desc-m, 0);
      overflow: var(--p-ta-desc-ov, visible);
      clip: var(--p-ta-desc-clip, auto);
      white-space: var(--p-ta-desc-ws, normal);
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
      color: var(--p-ta-msg, inherit);
      opacity: var(--p-ta-msg-op);
      position: var(--p-ta-msg-pos);
      transition: color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), opacity var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
    }
    .message:empty {
      opacity: 0;
      position: absolute;
    }
    .message p-icon {
      display: var(--p-ta-icon-display, none);
    }
    @media (forced-colors: active) {
      .wrapper {
        opacity: var(--p-ta-fc-op, var(--p-ta-wrap-op, 1));
        color: var(--p-ta-fc-color, inherit);
      }
      .label {
        opacity: var(--p-ta-fc-op, var(--p-ta-opacity, 1));
        color: var(--p-ta-fc-color, var(--p-color-primary));
      }
    }
    @media (hover: hover) {
      :host(:not([disabled]):not([read-only])) textarea:hover,
      :host(:not([disabled]):not([read-only])) .label-wrapper:hover ~ textarea {
        border-color: var(--p-ta-hover);
      }
    }
    @media (min-width: 480px) {
      .label-wrapper {
        min-width: var(--p-ta-lw-xs-minw, var(--p-ta-lw-minw));
        position: var(--p-ta-lw-xs-pos, var(--p-ta-lw-pos, static));
        width: var(--p-ta-lw-xs-w, var(--p-ta-lw-w, auto));
        height: var(--p-ta-lw-xs-h, var(--p-ta-lw-h, auto));
        padding: var(--p-ta-lw-xs-pad, var(--p-ta-lw-pad, 0));
        margin: var(--p-ta-lw-xs-m, var(--p-ta-lw-m, 0));
        overflow: var(--p-ta-lw-xs-ov, var(--p-ta-lw-ov, visible));
        clip: var(--p-ta-lw-xs-clip, var(--p-ta-lw-clip, auto));
        white-space: var(--p-ta-lw-xs-ws, var(--p-ta-lw-ws, normal));
      }
      .label:is(span) {
        position: var(--p-ta-desc-xs-pos, var(--p-ta-desc-pos, static));
        width: var(--p-ta-desc-xs-w, var(--p-ta-desc-w, auto));
        height: var(--p-ta-desc-xs-h, var(--p-ta-desc-h, auto));
        padding: var(--p-ta-desc-xs-pad, var(--p-ta-desc-pad, 0));
        margin: var(--p-ta-desc-xs-m, var(--p-ta-desc-m, 0));
        overflow: var(--p-ta-desc-xs-ov, var(--p-ta-desc-ov, visible));
        clip: var(--p-ta-desc-xs-clip, var(--p-ta-desc-clip, auto));
        white-space: var(--p-ta-desc-xs-ws, var(--p-ta-desc-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 760px) {
      .label-wrapper {
        min-width: var(--p-ta-lw-s-minw, var(--p-ta-lw-xs-minw, var(--p-ta-lw-minw)));
        position: var(--p-ta-lw-s-pos, var(--p-ta-lw-xs-pos, var(--p-ta-lw-pos, static)));
        width: var(--p-ta-lw-s-w, var(--p-ta-lw-xs-w, var(--p-ta-lw-w, auto)));
        height: var(--p-ta-lw-s-h, var(--p-ta-lw-xs-h, var(--p-ta-lw-h, auto)));
        padding: var(--p-ta-lw-s-pad, var(--p-ta-lw-xs-pad, var(--p-ta-lw-pad, 0)));
        margin: var(--p-ta-lw-s-m, var(--p-ta-lw-xs-m, var(--p-ta-lw-m, 0)));
        overflow: var(--p-ta-lw-s-ov, var(--p-ta-lw-xs-ov, var(--p-ta-lw-ov, visible)));
        clip: var(--p-ta-lw-s-clip, var(--p-ta-lw-xs-clip, var(--p-ta-lw-clip, auto)));
        white-space: var(--p-ta-lw-s-ws, var(--p-ta-lw-xs-ws, var(--p-ta-lw-ws, normal)));
      }
      .label:is(span) {
        position: var(--p-ta-desc-s-pos, var(--p-ta-desc-xs-pos, var(--p-ta-desc-pos, static)));
        width: var(--p-ta-desc-s-w, var(--p-ta-desc-xs-w, var(--p-ta-desc-w, auto)));
        height: var(--p-ta-desc-s-h, var(--p-ta-desc-xs-h, var(--p-ta-desc-h, auto)));
        padding: var(--p-ta-desc-s-pad, var(--p-ta-desc-xs-pad, var(--p-ta-desc-pad, 0)));
        margin: var(--p-ta-desc-s-m, var(--p-ta-desc-xs-m, var(--p-ta-desc-m, 0)));
        overflow: var(--p-ta-desc-s-ov, var(--p-ta-desc-xs-ov, var(--p-ta-desc-ov, visible)));
        clip: var(--p-ta-desc-s-clip, var(--p-ta-desc-xs-clip, var(--p-ta-desc-clip, auto)));
        white-space: var(--p-ta-desc-s-ws, var(--p-ta-desc-xs-ws, var(--p-ta-desc-ws, normal)));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 1000px) {
      .label-wrapper {
        min-width: var(--p-ta-lw-m-minw, var(--p-ta-lw-s-minw));
        position: var(--p-ta-lw-m-pos, var(--p-ta-lw-s-pos, static));
        width: var(--p-ta-lw-m-w, var(--p-ta-lw-s-w, auto));
        height: var(--p-ta-lw-m-h, var(--p-ta-lw-s-h, auto));
        padding: var(--p-ta-lw-m-pad, var(--p-ta-lw-s-pad, 0));
        margin: var(--p-ta-lw-m-m, var(--p-ta-lw-s-m, 0));
        overflow: var(--p-ta-lw-m-ov, var(--p-ta-lw-s-ov, visible));
        clip: var(--p-ta-lw-m-clip, var(--p-ta-lw-s-clip, auto));
        white-space: var(--p-ta-lw-m-ws, var(--p-ta-lw-s-ws, normal));
      }
      .label:is(span) {
        position: var(--p-ta-desc-m-pos, var(--p-ta-desc-s-pos, static));
        width: var(--p-ta-desc-m-w, var(--p-ta-desc-s-w, auto));
        height: var(--p-ta-desc-m-h, var(--p-ta-desc-s-h, auto));
        padding: var(--p-ta-desc-m-pad, var(--p-ta-desc-s-pad, 0));
        margin: var(--p-ta-desc-m-m, var(--p-ta-desc-s-m, 0));
        overflow: var(--p-ta-desc-m-ov, var(--p-ta-desc-s-ov, visible));
        clip: var(--p-ta-desc-m-clip, var(--p-ta-desc-s-clip, auto));
        white-space: var(--p-ta-desc-m-ws, var(--p-ta-desc-s-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 1300px) {
      .label-wrapper {
        min-width: var(--p-ta-lw-l-minw, var(--p-ta-lw-m-minw));
        position: var(--p-ta-lw-l-pos, var(--p-ta-lw-m-pos, static));
        width: var(--p-ta-lw-l-w, var(--p-ta-lw-m-w, auto));
        height: var(--p-ta-lw-l-h, var(--p-ta-lw-m-h, auto));
        padding: var(--p-ta-lw-l-pad, var(--p-ta-lw-m-pad, 0));
        margin: var(--p-ta-lw-l-m, var(--p-ta-lw-m-m, 0));
        overflow: var(--p-ta-lw-l-ov, var(--p-ta-lw-m-ov, visible));
        clip: var(--p-ta-lw-l-clip, var(--p-ta-lw-m-clip, auto));
        white-space: var(--p-ta-lw-l-ws, var(--p-ta-lw-m-ws, normal));
      }
      .label:is(span) {
        position: var(--p-ta-desc-l-pos, var(--p-ta-desc-m-pos, static));
        width: var(--p-ta-desc-l-w, var(--p-ta-desc-m-w, auto));
        height: var(--p-ta-desc-l-h, var(--p-ta-desc-m-h, auto));
        padding: var(--p-ta-desc-l-pad, var(--p-ta-desc-m-pad, 0));
        margin: var(--p-ta-desc-l-m, var(--p-ta-desc-m-m, 0));
        overflow: var(--p-ta-desc-l-ov, var(--p-ta-desc-m-ov, visible));
        clip: var(--p-ta-desc-l-clip, var(--p-ta-desc-m-clip, auto));
        white-space: var(--p-ta-desc-l-ws, var(--p-ta-desc-m-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 1760px) {
      .label-wrapper {
        min-width: var(--p-ta-lw-xl-minw, var(--p-ta-lw-l-minw));
        position: var(--p-ta-lw-xl-pos, var(--p-ta-lw-l-pos, static));
        width: var(--p-ta-lw-xl-w, var(--p-ta-lw-l-w, auto));
        height: var(--p-ta-lw-xl-h, var(--p-ta-lw-l-h, auto));
        padding: var(--p-ta-lw-xl-pad, var(--p-ta-lw-l-pad, 0));
        margin: var(--p-ta-lw-xl-m, var(--p-ta-lw-l-m, 0));
        overflow: var(--p-ta-lw-xl-ov, var(--p-ta-lw-l-ov, visible));
        clip: var(--p-ta-lw-xl-clip, var(--p-ta-lw-l-clip, auto));
        white-space: var(--p-ta-lw-xl-ws, var(--p-ta-lw-l-ws, normal));
      }
      .label:is(span) {
        position: var(--p-ta-desc-xl-pos, var(--p-ta-desc-l-pos, static));
        width: var(--p-ta-desc-xl-w, var(--p-ta-desc-l-w, auto));
        height: var(--p-ta-desc-xl-h, var(--p-ta-desc-l-h, auto));
        padding: var(--p-ta-desc-xl-pad, var(--p-ta-desc-l-pad, 0));
        margin: var(--p-ta-desc-xl-m, var(--p-ta-desc-l-m, 0));
        overflow: var(--p-ta-desc-xl-ov, var(--p-ta-desc-l-ov, visible));
        clip: var(--p-ta-desc-xl-clip, var(--p-ta-desc-l-clip, auto));
        white-space: var(--p-ta-desc-xl-ws, var(--p-ta-desc-l-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 1920px) {
      .label-wrapper {
        min-width: var(--p-ta-lw-xxl-minw, var(--p-ta-lw-xl-minw));
        position: var(--p-ta-lw-xxl-pos, var(--p-ta-lw-xl-pos, static));
        width: var(--p-ta-lw-xxl-w, var(--p-ta-lw-xl-w, auto));
        height: var(--p-ta-lw-xxl-h, var(--p-ta-lw-xl-h, auto));
        padding: var(--p-ta-lw-xxl-pad, var(--p-ta-lw-xl-pad, 0));
        margin: var(--p-ta-lw-xxl-m, var(--p-ta-lw-xl-m, 0));
        overflow: var(--p-ta-lw-xxl-ov, var(--p-ta-lw-xl-ov, visible));
        clip: var(--p-ta-lw-xxl-clip, var(--p-ta-lw-xl-clip, auto));
        white-space: var(--p-ta-lw-xxl-ws, var(--p-ta-lw-xl-ws, normal));
      }
      .label:is(span) {
        position: var(--p-ta-desc-xxl-pos, var(--p-ta-desc-xl-pos, static));
        width: var(--p-ta-desc-xxl-w, var(--p-ta-desc-xl-w, auto));
        height: var(--p-ta-desc-xxl-h, var(--p-ta-desc-xl-h, auto));
        padding: var(--p-ta-desc-xxl-pad, var(--p-ta-desc-xl-pad, 0));
        margin: var(--p-ta-desc-xxl-m, var(--p-ta-desc-xl-m, 0));
        overflow: var(--p-ta-desc-xxl-ov, var(--p-ta-desc-xl-ov, visible));
        clip: var(--p-ta-desc-xxl-clip, var(--p-ta-desc-xl-clip, auto));
        white-space: var(--p-ta-desc-xxl-ws, var(--p-ta-desc-xl-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
  `);

  return (
    <div class="root">
      <div class="label-wrapper">
        <label class="label" id="label" for="textarea">
          {state.labelText}
        </label>
        <slot name="label-after" />
      </div>
      <span class="label" id="description">
        {state.descriptionText}
      </span>
      <div class="wrapper">
        <textarea id="textarea" />
        <span class="sr-only" aria-live="polite">
          {state.srOnlyText}
        </span>
        <span class="counter" aria-hidden="true">
          {state.counterText}
        </span>
      </div>
      <span class="message" id="message">
        <p-icon aria-hidden="true" />
        {state.messageText}
      </span>
    </div>
  );
}
