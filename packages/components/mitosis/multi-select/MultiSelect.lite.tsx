import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-multi-select' });

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
  const p = bp === 'base' ? '--p-ms-lw' : `--p-ms-lw-${bp}`;
  const d = bp === 'base' ? '--p-ms-desc' : `--p-ms-desc-${bp}`;
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

export default function LitMultiSelect(props: {
  label?: string;
  description?: string;
  message?: string;
  state?: string;
  hideLabel?: any;
  compact?: any;
  disabled?: any;
  required?: any;
  name?: string;
  value?: any;
  form?: string;
  dropdownDirection?: string;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const disabled = isTrue(props.disabled);
      const compact = isTrue(props.compact);
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
        '--p-ms-scale': compact ? '0.64285714' : '1',
        '--p-ms-radius': compact ? 'var(--p-radius-lg)' : 'var(--p-radius-xl)',
        '--p-ms-bg': palette.bg,
        '--p-ms-border': palette.border,
        '--p-ms-hover': palette.hover,
        '--p-ms-btn-cursor': disabled ? 'not-allowed' : 'pointer',
        '--p-ms-btn-op': disabled ? '0.4' : '',
        '--p-ms-btn-fc-op': disabled ? '1' : '',
        '--p-ms-btn-fc-color': disabled ? 'GrayText' : '',
        '--p-ms-cursor': disabled ? 'not-allowed' : 'pointer',
        '--p-ms-pe': disabled ? 'none' : '',
        '--p-ms-opacity': disabled ? '0.4' : '',
        '--p-ms-fc-opacity': disabled ? '1' : '',
        '--p-ms-fc-color': disabled ? 'GrayText' : '',
        '--p-ms-msg': palette.message || '',
        '--p-ms-msg-op': hasMsg ? '' : '0',
        '--p-ms-msg-pos': hasMsg ? '' : 'absolute',
        '--p-ms-icon-display': hasMsg ? 'inline-flex' : 'none',
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
    get isRequired(): any {
      return props.required === true || props.required === 'true' || props.required === '';
    },
    get ariaInvalid(): string {
      return props.state === 'error' ? 'true' : '';
    },
    get messageRole(): string {
      return props.state === 'success' ? 'status' : 'alert';
    },
    get selectedText(): string {
      return '';
    },
  });

  useStyle(`
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    :host {
      display: block;
      --_p-multi-select-a: var(--p-ms-scale, 1) !important;
      --_p-multi-select-option-a: var(--p-ms-scale, 1) !important;
      --_p-optgroup-a: var(--p-ms-scale, 1) !important;
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
    button {
      all: unset;
      display: flex;
      align-items: center;
      gap: calc(22.4px * (var(--_p-multi-select-a) - 0.64285714) + 4px);
      height: calc(var(--_p-multi-select-a) * 3.5rem);
      box-sizing: border-box;
      min-width: 0;
      padding-inline: calc(22.4px * (var(--_p-multi-select-a) - 0.64285714) + 8px);
      border: 1px solid var(--p-multi-select-border-color, var(--p-ms-border));
      border-radius: var(--p-ms-radius, var(--p-radius-xl));
      background: var(--p-multi-select-background-color, var(--p-ms-bg));
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      color: var(--p-multi-select-text-color, var(--p-color-primary));
      cursor: var(--p-ms-btn-cursor, pointer);
      opacity: var(--p-ms-btn-op);
      transition: background-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), border-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
    }
    :host(:not([disabled])) button:focus-visible {
      outline: 2px solid var(--p-color-focus);
      outline-offset: 2px;
    }
    button span {
      flex-grow: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    [popover] {
      all: unset;
      position: absolute;
      z-index: 99;
      padding: calc(11.2px * (var(--_p-multi-select-a) - 0.64285714) + 4px);
      display: none;
      flex-direction: column;
      gap: calc(11.2px * (var(--_p-multi-select-a) - 0.64285714) + 4px);
      max-height: max(calc(242px), calc(50vh - 54px / 2 - 6px * 2));
      box-sizing: border-box;
      overflow: hidden auto;
      scrollbar-width: thin;
      scrollbar-color: auto;
      animation: var(--p-animation-duration, var(--p-duration-sm)) fade-in var(--p-ease-in-out) forwards;
      filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.15));
      background: var(--p-color-canvas);
      border: 1px solid var(--p-color-contrast-low);
      border-radius: var(--p-radius-xl);
    }
    [popover]:not(:popover-open) {
      display: none;
    }
    slot[name="selected"] {
      display: block;
      height: 100%;
      flex-grow: 1;
      overflow: hidden;
    }
    .root {
      display: grid;
      gap: var(--p-spacing-static-xs);
      min-width: calc(1rem + var(--p-spacing-static-md) + 1px * 2 + calc(9px + var(--p-spacing-static-md) / 2 + (var(--p-leading-normal) + var(--p-spacing-static-xs) * 2) * 2));
    }
    .options {
      display: flex;
      flex-direction: column;
      gap: calc(11.2px * (var(--_p-multi-select-a) - 0.64285714) + 4px);
    }
    .icon {
      margin-inline-end: -3px;
      pointer-events: none;
      transform: rotate3d(0, 0, 1, 0.0001deg);
      transition: transform var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
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
    .label-wrapper {
      min-width: var(--p-ms-lw-minw);
      position: var(--p-ms-lw-pos, static);
      width: var(--p-ms-lw-w, auto);
      height: var(--p-ms-lw-h, auto);
      padding: var(--p-ms-lw-pad, 0);
      margin: var(--p-ms-lw-m, 0);
      overflow: var(--p-ms-lw-ov, visible);
      clip: var(--p-ms-lw-clip, auto);
      white-space: var(--p-ms-lw-ws, normal);
    }
    .label {
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      cursor: var(--p-ms-cursor, pointer);
      color: var(--p-color-primary);
      pointer-events: var(--p-ms-pe);
      opacity: var(--p-ms-opacity);
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
      position: var(--p-ms-desc-pos, static);
      width: var(--p-ms-desc-w, auto);
      height: var(--p-ms-desc-h, auto);
      padding: var(--p-ms-desc-pad, 0);
      margin: var(--p-ms-desc-m, 0);
      overflow: var(--p-ms-desc-ov, visible);
      clip: var(--p-ms-desc-clip, auto);
      white-space: var(--p-ms-desc-ws, normal);
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
      color: var(--p-ms-msg, inherit);
      opacity: var(--p-ms-msg-op);
      position: var(--p-ms-msg-pos);
      transition: color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), opacity var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
    }
    .message:empty {
      opacity: 0;
      position: absolute;
    }
    .message p-icon {
      display: var(--p-ms-icon-display, none);
    }
    @media (forced-colors: active) {
      button {
        opacity: var(--p-ms-btn-fc-op, var(--p-ms-btn-op, 1));
        color: var(--p-ms-btn-fc-color, var(--p-multi-select-text-color, var(--p-color-primary)));
      }
      .label {
        opacity: var(--p-ms-fc-opacity, var(--p-ms-opacity, 1));
        color: var(--p-ms-fc-color, var(--p-color-primary));
      }
      :host(:not([disabled])) button:focus-visible {
        outline-color: Highlight;
      }
    }
    @media (hover: hover) {
      :host(:not([disabled])) button:hover,
      :host(:not([disabled])) label:hover ~ button {
        border-color: var(--p-multi-select-border-color, var(--p-ms-hover));
      }
    }
    @media (min-width: 480px) {
      .label-wrapper {
        min-width: var(--p-ms-lw-xs-minw, var(--p-ms-lw-minw));
        position: var(--p-ms-lw-xs-pos, var(--p-ms-lw-pos, static));
        width: var(--p-ms-lw-xs-w, var(--p-ms-lw-w, auto));
        height: var(--p-ms-lw-xs-h, var(--p-ms-lw-h, auto));
        padding: var(--p-ms-lw-xs-pad, var(--p-ms-lw-pad, 0));
        margin: var(--p-ms-lw-xs-m, var(--p-ms-lw-m, 0));
        overflow: var(--p-ms-lw-xs-ov, var(--p-ms-lw-ov, visible));
        clip: var(--p-ms-lw-xs-clip, var(--p-ms-lw-clip, auto));
        white-space: var(--p-ms-lw-xs-ws, var(--p-ms-lw-ws, normal));
      }
      .label:is(span) {
        position: var(--p-ms-desc-xs-pos, var(--p-ms-desc-pos, static));
        width: var(--p-ms-desc-xs-w, var(--p-ms-desc-w, auto));
        height: var(--p-ms-desc-xs-h, var(--p-ms-desc-h, auto));
        padding: var(--p-ms-desc-xs-pad, var(--p-ms-desc-pad, 0));
        margin: var(--p-ms-desc-xs-m, var(--p-ms-desc-m, 0));
        overflow: var(--p-ms-desc-xs-ov, var(--p-ms-desc-ov, visible));
        clip: var(--p-ms-desc-xs-clip, var(--p-ms-desc-clip, auto));
        white-space: var(--p-ms-desc-xs-ws, var(--p-ms-desc-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 760px) {
      .label-wrapper {
        min-width: var(--p-ms-lw-s-minw, var(--p-ms-lw-xs-minw, var(--p-ms-lw-minw)));
        position: var(--p-ms-lw-s-pos, var(--p-ms-lw-xs-pos, var(--p-ms-lw-pos, static)));
        width: var(--p-ms-lw-s-w, var(--p-ms-lw-xs-w, var(--p-ms-lw-w, auto)));
        height: var(--p-ms-lw-s-h, var(--p-ms-lw-xs-h, var(--p-ms-lw-h, auto)));
        padding: var(--p-ms-lw-s-pad, var(--p-ms-lw-xs-pad, var(--p-ms-lw-pad, 0)));
        margin: var(--p-ms-lw-s-m, var(--p-ms-lw-xs-m, var(--p-ms-lw-m, 0)));
        overflow: var(--p-ms-lw-s-ov, var(--p-ms-lw-xs-ov, var(--p-ms-lw-ov, visible)));
        clip: var(--p-ms-lw-s-clip, var(--p-ms-lw-xs-clip, var(--p-ms-lw-clip, auto)));
        white-space: var(--p-ms-lw-s-ws, var(--p-ms-lw-xs-ws, var(--p-ms-lw-ws, normal)));
      }
      .label:is(span) {
        position: var(--p-ms-desc-s-pos, var(--p-ms-desc-xs-pos, var(--p-ms-desc-pos, static)));
        width: var(--p-ms-desc-s-w, var(--p-ms-desc-xs-w, var(--p-ms-desc-w, auto)));
        height: var(--p-ms-desc-s-h, var(--p-ms-desc-xs-h, var(--p-ms-desc-h, auto)));
        padding: var(--p-ms-desc-s-pad, var(--p-ms-desc-xs-pad, var(--p-ms-desc-pad, 0)));
        margin: var(--p-ms-desc-s-m, var(--p-ms-desc-xs-m, var(--p-ms-desc-m, 0)));
        overflow: var(--p-ms-desc-s-ov, var(--p-ms-desc-xs-ov, var(--p-ms-desc-ov, visible)));
        clip: var(--p-ms-desc-s-clip, var(--p-ms-desc-xs-clip, var(--p-ms-desc-clip, auto)));
        white-space: var(--p-ms-desc-s-ws, var(--p-ms-desc-xs-ws, var(--p-ms-desc-ws, normal)));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 1000px) {
      .label-wrapper {
        min-width: var(--p-ms-lw-m-minw, var(--p-ms-lw-s-minw));
        position: var(--p-ms-lw-m-pos, var(--p-ms-lw-s-pos, static));
        width: var(--p-ms-lw-m-w, var(--p-ms-lw-s-w, auto));
        height: var(--p-ms-lw-m-h, var(--p-ms-lw-s-h, auto));
        padding: var(--p-ms-lw-m-pad, var(--p-ms-lw-s-pad, 0));
        margin: var(--p-ms-lw-m-m, var(--p-ms-lw-s-m, 0));
        overflow: var(--p-ms-lw-m-ov, var(--p-ms-lw-s-ov, visible));
        clip: var(--p-ms-lw-m-clip, var(--p-ms-lw-s-clip, auto));
        white-space: var(--p-ms-lw-m-ws, var(--p-ms-lw-s-ws, normal));
      }
      .label:is(span) {
        position: var(--p-ms-desc-m-pos, var(--p-ms-desc-s-pos, static));
        width: var(--p-ms-desc-m-w, var(--p-ms-desc-s-w, auto));
        height: var(--p-ms-desc-m-h, var(--p-ms-desc-s-h, auto));
        padding: var(--p-ms-desc-m-pad, var(--p-ms-desc-s-pad, 0));
        margin: var(--p-ms-desc-m-m, var(--p-ms-desc-s-m, 0));
        overflow: var(--p-ms-desc-m-ov, var(--p-ms-desc-s-ov, visible));
        clip: var(--p-ms-desc-m-clip, var(--p-ms-desc-s-clip, auto));
        white-space: var(--p-ms-desc-m-ws, var(--p-ms-desc-s-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 1300px) {
      .label-wrapper {
        min-width: var(--p-ms-lw-l-minw, var(--p-ms-lw-m-minw));
        position: var(--p-ms-lw-l-pos, var(--p-ms-lw-m-pos, static));
        width: var(--p-ms-lw-l-w, var(--p-ms-lw-m-w, auto));
        height: var(--p-ms-lw-l-h, var(--p-ms-lw-m-h, auto));
        padding: var(--p-ms-lw-l-pad, var(--p-ms-lw-m-pad, 0));
        margin: var(--p-ms-lw-l-m, var(--p-ms-lw-m-m, 0));
        overflow: var(--p-ms-lw-l-ov, var(--p-ms-lw-m-ov, visible));
        clip: var(--p-ms-lw-l-clip, var(--p-ms-lw-m-clip, auto));
        white-space: var(--p-ms-lw-l-ws, var(--p-ms-lw-m-ws, normal));
      }
      .label:is(span) {
        position: var(--p-ms-desc-l-pos, var(--p-ms-desc-m-pos, static));
        width: var(--p-ms-desc-l-w, var(--p-ms-desc-m-w, auto));
        height: var(--p-ms-desc-l-h, var(--p-ms-desc-m-h, auto));
        padding: var(--p-ms-desc-l-pad, var(--p-ms-desc-m-pad, 0));
        margin: var(--p-ms-desc-l-m, var(--p-ms-desc-m-m, 0));
        overflow: var(--p-ms-desc-l-ov, var(--p-ms-desc-m-ov, visible));
        clip: var(--p-ms-desc-l-clip, var(--p-ms-desc-m-clip, auto));
        white-space: var(--p-ms-desc-l-ws, var(--p-ms-desc-m-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 1760px) {
      .label-wrapper {
        min-width: var(--p-ms-lw-xl-minw, var(--p-ms-lw-l-minw));
        position: var(--p-ms-lw-xl-pos, var(--p-ms-lw-l-pos, static));
        width: var(--p-ms-lw-xl-w, var(--p-ms-lw-l-w, auto));
        height: var(--p-ms-lw-xl-h, var(--p-ms-lw-l-h, auto));
        padding: var(--p-ms-lw-xl-pad, var(--p-ms-lw-l-pad, 0));
        margin: var(--p-ms-lw-xl-m, var(--p-ms-lw-l-m, 0));
        overflow: var(--p-ms-lw-xl-ov, var(--p-ms-lw-l-ov, visible));
        clip: var(--p-ms-lw-xl-clip, var(--p-ms-lw-l-clip, auto));
        white-space: var(--p-ms-lw-xl-ws, var(--p-ms-lw-l-ws, normal));
      }
      .label:is(span) {
        position: var(--p-ms-desc-xl-pos, var(--p-ms-desc-l-pos, static));
        width: var(--p-ms-desc-xl-w, var(--p-ms-desc-l-w, auto));
        height: var(--p-ms-desc-xl-h, var(--p-ms-desc-l-h, auto));
        padding: var(--p-ms-desc-xl-pad, var(--p-ms-desc-l-pad, 0));
        margin: var(--p-ms-desc-xl-m, var(--p-ms-desc-l-m, 0));
        overflow: var(--p-ms-desc-xl-ov, var(--p-ms-desc-l-ov, visible));
        clip: var(--p-ms-desc-xl-clip, var(--p-ms-desc-l-clip, auto));
        white-space: var(--p-ms-desc-xl-ws, var(--p-ms-desc-l-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 1920px) {
      .label-wrapper {
        min-width: var(--p-ms-lw-xxl-minw, var(--p-ms-lw-xl-minw));
        position: var(--p-ms-lw-xxl-pos, var(--p-ms-lw-xl-pos, static));
        width: var(--p-ms-lw-xxl-w, var(--p-ms-lw-xl-w, auto));
        height: var(--p-ms-lw-xxl-h, var(--p-ms-lw-xl-h, auto));
        padding: var(--p-ms-lw-xxl-pad, var(--p-ms-lw-xl-pad, 0));
        margin: var(--p-ms-lw-xxl-m, var(--p-ms-lw-xl-m, 0));
        overflow: var(--p-ms-lw-xxl-ov, var(--p-ms-lw-xl-ov, visible));
        clip: var(--p-ms-lw-xxl-clip, var(--p-ms-lw-xl-clip, auto));
        white-space: var(--p-ms-lw-xxl-ws, var(--p-ms-lw-xl-ws, normal));
      }
      .label:is(span) {
        position: var(--p-ms-desc-xxl-pos, var(--p-ms-desc-xl-pos, static));
        width: var(--p-ms-desc-xxl-w, var(--p-ms-desc-xl-w, auto));
        height: var(--p-ms-desc-xxl-h, var(--p-ms-desc-xl-h, auto));
        padding: var(--p-ms-desc-xxl-pad, var(--p-ms-desc-xl-pad, 0));
        margin: var(--p-ms-desc-xxl-m, var(--p-ms-desc-xl-m, 0));
        overflow: var(--p-ms-desc-xxl-ov, var(--p-ms-desc-xl-ov, visible));
        clip: var(--p-ms-desc-xxl-clip, var(--p-ms-desc-xl-clip, auto));
        white-space: var(--p-ms-desc-xxl-ws, var(--p-ms-desc-xl-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
  `);

  return (
    <div class="root">
      <div class="label-wrapper">
        <label class="label" id="label" for="button">
          {state.labelText}
          <slot name="label" />
        </label>
        <slot name="label-after" />
      </div>
      <span class="label" id="description">
        {state.descriptionText}
        <slot name="description" />
      </span>
      <button type="button" role="combobox" id="button">
        <span>{state.selectedText}</span>
        <p-icon name="arrow-head-down" color="primary" />
      </button>
      <div>
        <div class="options" id="listbox">
          <slot />
        </div>
      </div>
      <span class="message" id="message">
        <p-icon />
        {state.messageText}
      </span>
    </div>
  );
}
