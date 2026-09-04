import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-radio-group' });

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
  const p = bp === 'base' ? '--p-rg-lw' : `--p-rg-lw-${bp}`;
  const d = bp === 'base' ? '--p-rg-desc' : `--p-rg-desc-${bp}`;
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

const assignDir = (vars: Record<string, string>, bp: string, dir: any) => {
  const row = dir === 'row';
  const flow = row ? 'row wrap' : 'column nowrap';
  const align = row ? 'start' : 'stretch';
  if (bp === 'base') {
    vars['--p-rg-flow'] = flow;
    vars['--p-rg-align'] = align;
    return;
  }
  vars[`--p-rg-flow-${bp}`] = flow;
  vars[`--p-rg-align-${bp}`] = align;
};

export default function LitRadioGroup(props: {
  label?: string;
  description?: string;
  message?: string;
  state?: string;
  hideLabel?: any;
  compact?: any;
  disabled?: any;
  loading?: any;
  required?: any;
  direction?: any;
  value?: any;
  name?: string;
  form?: string;
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
      const direction = parse(props.direction, 'column');
      const scale = compact ? '0.64285714' : '1';
      const palettes: any = {
        none: '',
        success: 'var(--p-color-success)',
        error: 'var(--p-color-error)',
      };
      const vars: Record<string, string> = {
        '--_p-radio-group-a': scale,
        '--_p-radio-group-option-a': scale,
        '--p-rg-cursor': disabled ? 'not-allowed' : 'inherit',
        '--p-rg-pe': disabled || loading ? 'none' : '',
        '--p-rg-opacity': disabled ? '0.4' : '',
        '--p-rg-fc-opacity': disabled ? '1' : '',
        '--p-rg-fc-color': disabled ? 'GrayText' : '',
        '--p-rg-msg': palettes[formState] || '',
        '--p-rg-msg-op': hasMsg ? '' : '0',
        '--p-rg-msg-pos': hasMsg ? '' : 'absolute',
        '--p-rg-icon-display': hasMsg ? 'inline-flex' : 'none',
      };
      void loading;
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
      if (typeof direction === 'object' && direction !== null) {
        let last = pick(direction, 'base', 'column');
        for (const bp of BREAKPOINTS) {
          if (direction[bp] !== undefined) last = pick(direction, bp, 'column');
          assignDir(vars, bp, last);
        }
      } else {
        for (const bp of BREAKPOINTS) assignDir(vars, bp, direction);
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
  });

  useStyle(`
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
    :host([loading]) ::slotted(*:not([slot])) {
      opacity: 0.4 !important;
    }
    :not(:defined, [data-ssr]) {
      visibility: hidden;
    }
    .root {
      all: unset;
      display: grid;
      justify-self: flex-start;
      row-gap: var(--p-spacing-static-xs);
    }
    .wrapper {
      position: relative;
      display: flex;
      flex-flow: var(--p-rg-flow, column nowrap);
      align-items: var(--p-rg-align, stretch);
      column-gap: calc(22.4px * (var(--_p-radio-group-a) - 0.64285714) + 8px);
      row-gap: calc(11.2px * (var(--_p-radio-group-a) - 0.64285714) + 4px);
    }
    .spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
    }
    .label-wrapper {
      min-width: var(--p-rg-lw-minw);
      position: var(--p-rg-lw-pos, static);
      width: var(--p-rg-lw-w, auto);
      height: var(--p-rg-lw-h, auto);
      padding: var(--p-rg-lw-pad, 0);
      margin: var(--p-rg-lw-m, 0);
      overflow: var(--p-rg-lw-ov, visible);
      clip: var(--p-rg-lw-clip, auto);
      white-space: var(--p-rg-lw-ws, normal);
    }
    .label {
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      cursor: var(--p-rg-cursor, inherit);
      color: var(--p-color-primary);
      pointer-events: var(--p-rg-pe);
      opacity: var(--p-rg-opacity);
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
      position: var(--p-rg-desc-pos, static);
      width: var(--p-rg-desc-w, auto);
      height: var(--p-rg-desc-h, auto);
      padding: var(--p-rg-desc-pad, 0);
      margin: var(--p-rg-desc-m, 0);
      overflow: var(--p-rg-desc-ov, visible);
      clip: var(--p-rg-desc-clip, auto);
      white-space: var(--p-rg-desc-ws, normal);
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
      color: var(--p-rg-msg, inherit);
      opacity: var(--p-rg-msg-op);
      position: var(--p-rg-msg-pos);
      transition: color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), opacity var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
    }
    .message:empty {
      opacity: 0;
      position: absolute;
    }
    .message p-icon {
      display: var(--p-rg-icon-display, none);
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
      .label {
        opacity: var(--p-rg-fc-opacity, var(--p-rg-opacity, 1));
        color: var(--p-rg-fc-color, var(--p-color-primary));
      }
      :host([loading]) ::slotted(*:not([slot])) {
        opacity: 1 !important;
        color: GrayText !important;
      }
    }
    @media (min-width: 480px) {
      .wrapper {
        flex-flow: var(--p-rg-flow-xs, var(--p-rg-flow, column nowrap));
        align-items: var(--p-rg-align-xs, var(--p-rg-align, stretch));
      }
      .label-wrapper {
        min-width: var(--p-rg-lw-xs-minw, var(--p-rg-lw-minw));
        position: var(--p-rg-lw-xs-pos, var(--p-rg-lw-pos, static));
        width: var(--p-rg-lw-xs-w, var(--p-rg-lw-w, auto));
        height: var(--p-rg-lw-xs-h, var(--p-rg-lw-h, auto));
        padding: var(--p-rg-lw-xs-pad, var(--p-rg-lw-pad, 0));
        margin: var(--p-rg-lw-xs-m, var(--p-rg-lw-m, 0));
        overflow: var(--p-rg-lw-xs-ov, var(--p-rg-lw-ov, visible));
        clip: var(--p-rg-lw-xs-clip, var(--p-rg-lw-clip, auto));
        white-space: var(--p-rg-lw-xs-ws, var(--p-rg-lw-ws, normal));
      }
      .label:is(span) {
        position: var(--p-rg-desc-xs-pos, var(--p-rg-desc-pos, static));
        width: var(--p-rg-desc-xs-w, var(--p-rg-desc-w, auto));
        height: var(--p-rg-desc-xs-h, var(--p-rg-desc-h, auto));
        padding: var(--p-rg-desc-xs-pad, var(--p-rg-desc-pad, 0));
        margin: var(--p-rg-desc-xs-m, var(--p-rg-desc-m, 0));
        overflow: var(--p-rg-desc-xs-ov, var(--p-rg-desc-ov, visible));
        clip: var(--p-rg-desc-xs-clip, var(--p-rg-desc-clip, auto));
        white-space: var(--p-rg-desc-xs-ws, var(--p-rg-desc-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 760px) {
      .wrapper {
        flex-flow: var(--p-rg-flow-s, var(--p-rg-flow-xs, var(--p-rg-flow, column nowrap)));
        align-items: var(--p-rg-align-s, var(--p-rg-align-xs, var(--p-rg-align, stretch)));
      }
      .label-wrapper {
        min-width: var(--p-rg-lw-s-minw, var(--p-rg-lw-xs-minw, var(--p-rg-lw-minw)));
        position: var(--p-rg-lw-s-pos, var(--p-rg-lw-xs-pos, var(--p-rg-lw-pos, static)));
        width: var(--p-rg-lw-s-w, var(--p-rg-lw-xs-w, var(--p-rg-lw-w, auto)));
        height: var(--p-rg-lw-s-h, var(--p-rg-lw-xs-h, var(--p-rg-lw-h, auto)));
        padding: var(--p-rg-lw-s-pad, var(--p-rg-lw-xs-pad, var(--p-rg-lw-pad, 0)));
        margin: var(--p-rg-lw-s-m, var(--p-rg-lw-xs-m, var(--p-rg-lw-m, 0)));
        overflow: var(--p-rg-lw-s-ov, var(--p-rg-lw-xs-ov, var(--p-rg-lw-ov, visible)));
        clip: var(--p-rg-lw-s-clip, var(--p-rg-lw-xs-clip, var(--p-rg-lw-clip, auto)));
        white-space: var(--p-rg-lw-s-ws, var(--p-rg-lw-xs-ws, var(--p-rg-lw-ws, normal)));
      }
      .label:is(span) {
        position: var(--p-rg-desc-s-pos, var(--p-rg-desc-xs-pos, var(--p-rg-desc-pos, static)));
        width: var(--p-rg-desc-s-w, var(--p-rg-desc-xs-w, var(--p-rg-desc-w, auto)));
        height: var(--p-rg-desc-s-h, var(--p-rg-desc-xs-h, var(--p-rg-desc-h, auto)));
        padding: var(--p-rg-desc-s-pad, var(--p-rg-desc-xs-pad, var(--p-rg-desc-pad, 0)));
        margin: var(--p-rg-desc-s-m, var(--p-rg-desc-xs-m, var(--p-rg-desc-m, 0)));
        overflow: var(--p-rg-desc-s-ov, var(--p-rg-desc-xs-ov, var(--p-rg-desc-ov, visible)));
        clip: var(--p-rg-desc-s-clip, var(--p-rg-desc-xs-clip, var(--p-rg-desc-clip, auto)));
        white-space: var(--p-rg-desc-s-ws, var(--p-rg-desc-xs-ws, var(--p-rg-desc-ws, normal)));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 1000px) {
      .wrapper {
        flex-flow: var(--p-rg-flow-m, var(--p-rg-flow-s));
        align-items: var(--p-rg-align-m, var(--p-rg-align-s));
      }
      .label-wrapper {
        min-width: var(--p-rg-lw-m-minw, var(--p-rg-lw-s-minw));
        position: var(--p-rg-lw-m-pos, var(--p-rg-lw-s-pos, static));
        width: var(--p-rg-lw-m-w, var(--p-rg-lw-s-w, auto));
        height: var(--p-rg-lw-m-h, var(--p-rg-lw-s-h, auto));
        padding: var(--p-rg-lw-m-pad, var(--p-rg-lw-s-pad, 0));
        margin: var(--p-rg-lw-m-m, var(--p-rg-lw-s-m, 0));
        overflow: var(--p-rg-lw-m-ov, var(--p-rg-lw-s-ov, visible));
        clip: var(--p-rg-lw-m-clip, var(--p-rg-lw-s-clip, auto));
        white-space: var(--p-rg-lw-m-ws, var(--p-rg-lw-s-ws, normal));
      }
      .label:is(span) {
        position: var(--p-rg-desc-m-pos, var(--p-rg-desc-s-pos, static));
        width: var(--p-rg-desc-m-w, var(--p-rg-desc-s-w, auto));
        height: var(--p-rg-desc-m-h, var(--p-rg-desc-s-h, auto));
        padding: var(--p-rg-desc-m-pad, var(--p-rg-desc-s-pad, 0));
        margin: var(--p-rg-desc-m-m, var(--p-rg-desc-s-m, 0));
        overflow: var(--p-rg-desc-m-ov, var(--p-rg-desc-s-ov, visible));
        clip: var(--p-rg-desc-m-clip, var(--p-rg-desc-s-clip, auto));
        white-space: var(--p-rg-desc-m-ws, var(--p-rg-desc-s-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 1300px) {
      .wrapper {
        flex-flow: var(--p-rg-flow-l, var(--p-rg-flow-m));
        align-items: var(--p-rg-align-l, var(--p-rg-align-m));
      }
      .label-wrapper {
        min-width: var(--p-rg-lw-l-minw, var(--p-rg-lw-m-minw));
        position: var(--p-rg-lw-l-pos, var(--p-rg-lw-m-pos, static));
        width: var(--p-rg-lw-l-w, var(--p-rg-lw-m-w, auto));
        height: var(--p-rg-lw-l-h, var(--p-rg-lw-m-h, auto));
        padding: var(--p-rg-lw-l-pad, var(--p-rg-lw-m-pad, 0));
        margin: var(--p-rg-lw-l-m, var(--p-rg-lw-m-m, 0));
        overflow: var(--p-rg-lw-l-ov, var(--p-rg-lw-m-ov, visible));
        clip: var(--p-rg-lw-l-clip, var(--p-rg-lw-m-clip, auto));
        white-space: var(--p-rg-lw-l-ws, var(--p-rg-lw-m-ws, normal));
      }
      .label:is(span) {
        position: var(--p-rg-desc-l-pos, var(--p-rg-desc-m-pos, static));
        width: var(--p-rg-desc-l-w, var(--p-rg-desc-m-w, auto));
        height: var(--p-rg-desc-l-h, var(--p-rg-desc-m-h, auto));
        padding: var(--p-rg-desc-l-pad, var(--p-rg-desc-m-pad, 0));
        margin: var(--p-rg-desc-l-m, var(--p-rg-desc-m-m, 0));
        overflow: var(--p-rg-desc-l-ov, var(--p-rg-desc-m-ov, visible));
        clip: var(--p-rg-desc-l-clip, var(--p-rg-desc-m-clip, auto));
        white-space: var(--p-rg-desc-l-ws, var(--p-rg-desc-m-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 1760px) {
      .wrapper {
        flex-flow: var(--p-rg-flow-xl, var(--p-rg-flow-l));
        align-items: var(--p-rg-align-xl, var(--p-rg-align-l));
      }
      .label-wrapper {
        min-width: var(--p-rg-lw-xl-minw, var(--p-rg-lw-l-minw));
        position: var(--p-rg-lw-xl-pos, var(--p-rg-lw-l-pos, static));
        width: var(--p-rg-lw-xl-w, var(--p-rg-lw-l-w, auto));
        height: var(--p-rg-lw-xl-h, var(--p-rg-lw-l-h, auto));
        padding: var(--p-rg-lw-xl-pad, var(--p-rg-lw-l-pad, 0));
        margin: var(--p-rg-lw-xl-m, var(--p-rg-lw-l-m, 0));
        overflow: var(--p-rg-lw-xl-ov, var(--p-rg-lw-l-ov, visible));
        clip: var(--p-rg-lw-xl-clip, var(--p-rg-lw-l-clip, auto));
        white-space: var(--p-rg-lw-xl-ws, var(--p-rg-lw-l-ws, normal));
      }
      .label:is(span) {
        position: var(--p-rg-desc-xl-pos, var(--p-rg-desc-l-pos, static));
        width: var(--p-rg-desc-xl-w, var(--p-rg-desc-l-w, auto));
        height: var(--p-rg-desc-xl-h, var(--p-rg-desc-l-h, auto));
        padding: var(--p-rg-desc-xl-pad, var(--p-rg-desc-l-pad, 0));
        margin: var(--p-rg-desc-xl-m, var(--p-rg-desc-l-m, 0));
        overflow: var(--p-rg-desc-xl-ov, var(--p-rg-desc-l-ov, visible));
        clip: var(--p-rg-desc-xl-clip, var(--p-rg-desc-l-clip, auto));
        white-space: var(--p-rg-desc-xl-ws, var(--p-rg-desc-l-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 1920px) {
      .wrapper {
        flex-flow: var(--p-rg-flow-xxl, var(--p-rg-flow-xl));
        align-items: var(--p-rg-align-xxl, var(--p-rg-align-xl));
      }
      .label-wrapper {
        min-width: var(--p-rg-lw-xxl-minw, var(--p-rg-lw-xl-minw));
        position: var(--p-rg-lw-xxl-pos, var(--p-rg-lw-xl-pos, static));
        width: var(--p-rg-lw-xxl-w, var(--p-rg-lw-xl-w, auto));
        height: var(--p-rg-lw-xxl-h, var(--p-rg-lw-xl-h, auto));
        padding: var(--p-rg-lw-xxl-pad, var(--p-rg-lw-xl-pad, 0));
        margin: var(--p-rg-lw-xxl-m, var(--p-rg-lw-xl-m, 0));
        overflow: var(--p-rg-lw-xxl-ov, var(--p-rg-lw-xl-ov, visible));
        clip: var(--p-rg-lw-xxl-clip, var(--p-rg-lw-xl-clip, auto));
        white-space: var(--p-rg-lw-xxl-ws, var(--p-rg-lw-xl-ws, normal));
      }
      .label:is(span) {
        position: var(--p-rg-desc-xxl-pos, var(--p-rg-desc-xl-pos, static));
        width: var(--p-rg-desc-xxl-w, var(--p-rg-desc-xl-w, auto));
        height: var(--p-rg-desc-xxl-h, var(--p-rg-desc-xl-h, auto));
        padding: var(--p-rg-desc-xxl-pad, var(--p-rg-desc-xl-pad, 0));
        margin: var(--p-rg-desc-xxl-m, var(--p-rg-desc-xl-m, 0));
        overflow: var(--p-rg-desc-xxl-ov, var(--p-rg-desc-xl-ov, visible));
        clip: var(--p-rg-desc-xxl-clip, var(--p-rg-desc-xl-clip, auto));
        white-space: var(--p-rg-desc-xxl-ws, var(--p-rg-desc-xl-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
  `);

  return (
    <fieldset class="root">
      <div class="label-wrapper">
        <div class="label" id="label">
          {state.labelText}
          <slot name="label" />
        </div>
        <slot name="label-after" />
      </div>
      <span class="label" id="description">
        {state.descriptionText}
        <slot name="description" />
      </span>
      <div class="wrapper">
        <slot />
        <p-spinner class="spinner" aria-hidden="true" />
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
