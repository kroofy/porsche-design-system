import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-segmented-control' });

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

const colWidthFor = (col: any, measuredMin: any, measuredMax: any) => {
  if (col === 'auto' || col === undefined || col === null || col === '') {
    const w = (measuredMax > 220 && 220) || (measuredMax < 46 && measuredMin) || measuredMax;
    return 'repeat(auto-fit, ' + w + 'px)';
  }
  return 'repeat(' + col + ', minmax(0, 1fr))';
};

const assignHide = (vars: Record<string, string>, bp: string, hidden: boolean) => {
  const p = bp === 'base' ? '--p-sc-lw' : `--p-sc-lw-${bp}`;
  const d = bp === 'base' ? '--p-sc-desc' : `--p-sc-desc-${bp}`;
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

const assignCols = (vars: Record<string, string>, bp: string, value: string) => {
  if (bp === 'base') {
    vars['--p-sc-cols'] = value;
    return;
  }
  vars[`--p-sc-cols-${bp}`] = value;
};

export default function LitSegmentedControl(props: {
  label?: string;
  description?: string;
  message?: string;
  state?: string;
  hideLabel?: any;
  compact?: any;
  disabled?: any;
  required?: any;
  columns?: any;
  noWrap?: any;
  value?: any;
  name?: string;
  form?: string;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const disabled = isTrue(props.disabled);
      const compact = isTrue(props.compact);
      const noWrap = isTrue(props.noWrap);
      const formState = props.state === 'success' || props.state === 'error' ? props.state : 'none';
      const message = props.message || '';
      const hasMsg = !!message && (formState === 'success' || formState === 'error');
      const hideLabel = parse(props.hideLabel, false);
      const columns = parse(props.columns, 'auto');
      const measuredMin: any = 46;
      const measuredMax: any = 80;
      const palettes: any = {
        none: '',
        success: 'var(--p-color-success)',
        error: 'var(--p-color-error)',
      };
      const vars: Record<string, string> = {
        '--p-sc-cursor': disabled ? 'not-allowed' : 'inherit',
        '--p-sc-pe': disabled ? 'none' : '',
        '--p-sc-opacity': disabled ? '0.4' : '',
        '--p-sc-fc-opacity': disabled ? '1' : '',
        '--p-sc-fc-color': disabled ? 'GrayText' : '',
        '--p-sc-msg': palettes[formState] || '',
        '--p-sc-msg-opacity': hasMsg ? '' : '0',
        '--p-sc-msg-pos': hasMsg ? '' : 'absolute',
        '--p-sc-icon-display': hasMsg ? 'inline-flex' : 'none',
        '--p-sc-flow': noWrap ? 'column' : '',
        '--p-sc-auto-cols': noWrap ? 'max-content' : '',
        '--p-sc-scroller-m': noWrap ? 'calc(-1 * var(--p-spacing-static-xs)) 0' : '',
      };
      void compact;
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
      if (noWrap) {
        for (const bp of BREAKPOINTS) assignCols(vars, bp, '');
      } else if (typeof columns === 'object' && columns !== null) {
        let last = colWidthFor(pick(columns, 'base', 'auto'), measuredMin, measuredMax);
        for (const bp of BREAKPOINTS) {
          if (columns[bp] !== undefined) last = colWidthFor(pick(columns, bp, 'auto'), measuredMin, measuredMax);
          assignCols(vars, bp, last);
        }
      } else {
        const cols = colWidthFor(columns, measuredMin, measuredMax);
        for (const bp of BREAKPOINTS) assignCols(vars, bp, cols);
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
    :not(:defined, [data-ssr]) {
      visibility: hidden;
    }
    slot:not([name]) {
      display: grid;
      grid-auto-rows: 1fr;
      grid-auto-flow: var(--p-sc-flow);
      grid-auto-columns: var(--p-sc-auto-cols);
      grid-template-columns: var(--p-sc-cols);
      gap: 6px;
    }
    .root {
      all: unset;
      display: grid;
      gap: var(--p-spacing-static-xs);
    }
    .scroller {
      margin: var(--p-sc-scroller-m);
    }
    .label-wrapper {
      min-width: var(--p-sc-lw-minw);
      position: var(--p-sc-lw-pos, static);
      width: var(--p-sc-lw-w, auto);
      height: var(--p-sc-lw-h, auto);
      padding: var(--p-sc-lw-pad, 0);
      margin: var(--p-sc-lw-m, 0);
      overflow: var(--p-sc-lw-ov, visible);
      clip: var(--p-sc-lw-clip, auto);
      white-space: var(--p-sc-lw-ws, normal);
    }
    .label {
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      cursor: var(--p-sc-cursor, inherit);
      color: var(--p-color-primary);
      pointer-events: var(--p-sc-pe);
      opacity: var(--p-sc-opacity);
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
      position: var(--p-sc-desc-pos, static);
      width: var(--p-sc-desc-w, auto);
      height: var(--p-sc-desc-h, auto);
      padding: var(--p-sc-desc-pad, 0);
      margin: var(--p-sc-desc-m, 0);
      overflow: var(--p-sc-desc-ov, visible);
      clip: var(--p-sc-desc-clip, auto);
      white-space: var(--p-sc-desc-ws, normal);
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
      color: var(--p-sc-msg);
      opacity: var(--p-sc-msg-opacity);
      position: var(--p-sc-msg-pos);
      transition: color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), opacity var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
    }
    .message:empty {
      opacity: 0;
      position: absolute;
    }
    .message p-icon {
      display: var(--p-sc-icon-display, none);
    }
    @media (forced-colors: active) {
      .label {
        opacity: var(--p-sc-fc-opacity, var(--p-sc-opacity, 1));
        color: var(--p-sc-fc-color, var(--p-color-primary));
      }
    }
    @media (min-width: 480px) {
      slot:not([name]) {
        grid-template-columns: var(--p-sc-cols-xs, var(--p-sc-cols));
      }
      .label-wrapper {
        min-width: var(--p-sc-lw-xs-minw, var(--p-sc-lw-minw));
        position: var(--p-sc-lw-xs-pos, var(--p-sc-lw-pos, static));
        width: var(--p-sc-lw-xs-w, var(--p-sc-lw-w, auto));
        height: var(--p-sc-lw-xs-h, var(--p-sc-lw-h, auto));
        padding: var(--p-sc-lw-xs-pad, var(--p-sc-lw-pad, 0));
        margin: var(--p-sc-lw-xs-m, var(--p-sc-lw-m, 0));
        overflow: var(--p-sc-lw-xs-ov, var(--p-sc-lw-ov, visible));
        clip: var(--p-sc-lw-xs-clip, var(--p-sc-lw-clip, auto));
        white-space: var(--p-sc-lw-xs-ws, var(--p-sc-lw-ws, normal));
      }
      .label:is(span) {
        position: var(--p-sc-desc-xs-pos, var(--p-sc-desc-pos, static));
        width: var(--p-sc-desc-xs-w, var(--p-sc-desc-w, auto));
        height: var(--p-sc-desc-xs-h, var(--p-sc-desc-h, auto));
        padding: var(--p-sc-desc-xs-pad, var(--p-sc-desc-pad, 0));
        margin: var(--p-sc-desc-xs-m, var(--p-sc-desc-m, 0));
        overflow: var(--p-sc-desc-xs-ov, var(--p-sc-desc-ov, visible));
        clip: var(--p-sc-desc-xs-clip, var(--p-sc-desc-clip, auto));
        white-space: var(--p-sc-desc-xs-ws, var(--p-sc-desc-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 760px) {
      slot:not([name]) {
        grid-template-columns: var(--p-sc-cols-s, var(--p-sc-cols-xs, var(--p-sc-cols)));
      }
      .label-wrapper {
        min-width: var(--p-sc-lw-s-minw, var(--p-sc-lw-xs-minw, var(--p-sc-lw-minw)));
        position: var(--p-sc-lw-s-pos, var(--p-sc-lw-xs-pos, var(--p-sc-lw-pos, static)));
        width: var(--p-sc-lw-s-w, var(--p-sc-lw-xs-w, var(--p-sc-lw-w, auto)));
        height: var(--p-sc-lw-s-h, var(--p-sc-lw-xs-h, var(--p-sc-lw-h, auto)));
        padding: var(--p-sc-lw-s-pad, var(--p-sc-lw-xs-pad, var(--p-sc-lw-pad, 0)));
        margin: var(--p-sc-lw-s-m, var(--p-sc-lw-xs-m, var(--p-sc-lw-m, 0)));
        overflow: var(--p-sc-lw-s-ov, var(--p-sc-lw-xs-ov, var(--p-sc-lw-ov, visible)));
        clip: var(--p-sc-lw-s-clip, var(--p-sc-lw-xs-clip, var(--p-sc-lw-clip, auto)));
        white-space: var(--p-sc-lw-s-ws, var(--p-sc-lw-xs-ws, var(--p-sc-lw-ws, normal)));
      }
      .label:is(span) {
        position: var(--p-sc-desc-s-pos, var(--p-sc-desc-xs-pos, var(--p-sc-desc-pos, static)));
        width: var(--p-sc-desc-s-w, var(--p-sc-desc-xs-w, var(--p-sc-desc-w, auto)));
        height: var(--p-sc-desc-s-h, var(--p-sc-desc-xs-h, var(--p-sc-desc-h, auto)));
        padding: var(--p-sc-desc-s-pad, var(--p-sc-desc-xs-pad, var(--p-sc-desc-pad, 0)));
        margin: var(--p-sc-desc-s-m, var(--p-sc-desc-xs-m, var(--p-sc-desc-m, 0)));
        overflow: var(--p-sc-desc-s-ov, var(--p-sc-desc-xs-ov, var(--p-sc-desc-ov, visible)));
        clip: var(--p-sc-desc-s-clip, var(--p-sc-desc-xs-clip, var(--p-sc-desc-clip, auto)));
        white-space: var(--p-sc-desc-s-ws, var(--p-sc-desc-xs-ws, var(--p-sc-desc-ws, normal)));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 1000px) {
      slot:not([name]) {
        grid-template-columns: var(--p-sc-cols-m, var(--p-sc-cols-s, var(--p-sc-cols-xs, var(--p-sc-cols))));
      }
      .label-wrapper {
        min-width: var(--p-sc-lw-m-minw, var(--p-sc-lw-s-minw));
        position: var(--p-sc-lw-m-pos, var(--p-sc-lw-s-pos, static));
        width: var(--p-sc-lw-m-w, var(--p-sc-lw-s-w, auto));
        height: var(--p-sc-lw-m-h, var(--p-sc-lw-s-h, auto));
        padding: var(--p-sc-lw-m-pad, var(--p-sc-lw-s-pad, 0));
        margin: var(--p-sc-lw-m-m, var(--p-sc-lw-s-m, 0));
        overflow: var(--p-sc-lw-m-ov, var(--p-sc-lw-s-ov, visible));
        clip: var(--p-sc-lw-m-clip, var(--p-sc-lw-s-clip, auto));
        white-space: var(--p-sc-lw-m-ws, var(--p-sc-lw-s-ws, normal));
      }
      .label:is(span) {
        position: var(--p-sc-desc-m-pos, var(--p-sc-desc-s-pos, static));
        width: var(--p-sc-desc-m-w, var(--p-sc-desc-s-w, auto));
        height: var(--p-sc-desc-m-h, var(--p-sc-desc-s-h, auto));
        padding: var(--p-sc-desc-m-pad, var(--p-sc-desc-s-pad, 0));
        margin: var(--p-sc-desc-m-m, var(--p-sc-desc-s-m, 0));
        overflow: var(--p-sc-desc-m-ov, var(--p-sc-desc-s-ov, visible));
        clip: var(--p-sc-desc-m-clip, var(--p-sc-desc-s-clip, auto));
        white-space: var(--p-sc-desc-m-ws, var(--p-sc-desc-s-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 1300px) {
      slot:not([name]) {
        grid-template-columns: var(--p-sc-cols-l, var(--p-sc-cols-m));
      }
      .label-wrapper {
        min-width: var(--p-sc-lw-l-minw, var(--p-sc-lw-m-minw));
        position: var(--p-sc-lw-l-pos, var(--p-sc-lw-m-pos, static));
        width: var(--p-sc-lw-l-w, var(--p-sc-lw-m-w, auto));
        height: var(--p-sc-lw-l-h, var(--p-sc-lw-m-h, auto));
        padding: var(--p-sc-lw-l-pad, var(--p-sc-lw-m-pad, 0));
        margin: var(--p-sc-lw-l-m, var(--p-sc-lw-m-m, 0));
        overflow: var(--p-sc-lw-l-ov, var(--p-sc-lw-m-ov, visible));
        clip: var(--p-sc-lw-l-clip, var(--p-sc-lw-m-clip, auto));
        white-space: var(--p-sc-lw-l-ws, var(--p-sc-lw-m-ws, normal));
      }
      .label:is(span) {
        position: var(--p-sc-desc-l-pos, var(--p-sc-desc-m-pos, static));
        width: var(--p-sc-desc-l-w, var(--p-sc-desc-m-w, auto));
        height: var(--p-sc-desc-l-h, var(--p-sc-desc-m-h, auto));
        padding: var(--p-sc-desc-l-pad, var(--p-sc-desc-m-pad, 0));
        margin: var(--p-sc-desc-l-m, var(--p-sc-desc-m-m, 0));
        overflow: var(--p-sc-desc-l-ov, var(--p-sc-desc-m-ov, visible));
        clip: var(--p-sc-desc-l-clip, var(--p-sc-desc-m-clip, auto));
        white-space: var(--p-sc-desc-l-ws, var(--p-sc-desc-m-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 1760px) {
      slot:not([name]) {
        grid-template-columns: var(--p-sc-cols-xl, var(--p-sc-cols-l));
      }
      .label-wrapper {
        min-width: var(--p-sc-lw-xl-minw, var(--p-sc-lw-l-minw));
        position: var(--p-sc-lw-xl-pos, var(--p-sc-lw-l-pos, static));
        width: var(--p-sc-lw-xl-w, var(--p-sc-lw-l-w, auto));
        height: var(--p-sc-lw-xl-h, var(--p-sc-lw-l-h, auto));
        padding: var(--p-sc-lw-xl-pad, var(--p-sc-lw-l-pad, 0));
        margin: var(--p-sc-lw-xl-m, var(--p-sc-lw-l-m, 0));
        overflow: var(--p-sc-lw-xl-ov, var(--p-sc-lw-l-ov, visible));
        clip: var(--p-sc-lw-xl-clip, var(--p-sc-lw-l-clip, auto));
        white-space: var(--p-sc-lw-xl-ws, var(--p-sc-lw-l-ws, normal));
      }
      .label:is(span) {
        position: var(--p-sc-desc-xl-pos, var(--p-sc-desc-l-pos, static));
        width: var(--p-sc-desc-xl-w, var(--p-sc-desc-l-w, auto));
        height: var(--p-sc-desc-xl-h, var(--p-sc-desc-l-h, auto));
        padding: var(--p-sc-desc-xl-pad, var(--p-sc-desc-l-pad, 0));
        margin: var(--p-sc-desc-xl-m, var(--p-sc-desc-l-m, 0));
        overflow: var(--p-sc-desc-xl-ov, var(--p-sc-desc-l-ov, visible));
        clip: var(--p-sc-desc-xl-clip, var(--p-sc-desc-l-clip, auto));
        white-space: var(--p-sc-desc-xl-ws, var(--p-sc-desc-l-ws, normal));
        margin-top: calc(-1 * var(--p-spacing-static-xs));
      }
    }
    @media (min-width: 1920px) {
      slot:not([name]) {
        grid-template-columns: var(--p-sc-cols-xxl, var(--p-sc-cols-xl));
      }
      .label-wrapper {
        min-width: var(--p-sc-lw-xxl-minw, var(--p-sc-lw-xl-minw));
        position: var(--p-sc-lw-xxl-pos, var(--p-sc-lw-xl-pos, static));
        width: var(--p-sc-lw-xxl-w, var(--p-sc-lw-xl-w, auto));
        height: var(--p-sc-lw-xxl-h, var(--p-sc-lw-xl-h, auto));
        padding: var(--p-sc-lw-xxl-pad, var(--p-sc-lw-xl-pad, 0));
        margin: var(--p-sc-lw-xxl-m, var(--p-sc-lw-xl-m, 0));
        overflow: var(--p-sc-lw-xxl-ov, var(--p-sc-lw-xl-ov, visible));
        clip: var(--p-sc-lw-xxl-clip, var(--p-sc-lw-xl-clip, auto));
        white-space: var(--p-sc-lw-xxl-ws, var(--p-sc-lw-xl-ws, normal));
      }
      .label:is(span) {
        position: var(--p-sc-desc-xxl-pos, var(--p-sc-desc-xl-pos, static));
        width: var(--p-sc-desc-xxl-w, var(--p-sc-desc-xl-w, auto));
        height: var(--p-sc-desc-xxl-h, var(--p-sc-desc-xl-h, auto));
        padding: var(--p-sc-desc-xxl-pad, var(--p-sc-desc-xl-pad, 0));
        margin: var(--p-sc-desc-xxl-m, var(--p-sc-desc-xl-m, 0));
        overflow: var(--p-sc-desc-xxl-ov, var(--p-sc-desc-xl-ov, visible));
        clip: var(--p-sc-desc-xxl-clip, var(--p-sc-desc-xl-clip, auto));
        white-space: var(--p-sc-desc-xxl-ws, var(--p-sc-desc-xl-ws, normal));
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
      <slot />
      <span class="message" id="message">
        <p-icon aria-hidden="true" />
        {state.messageText}
      </span>
    </fieldset>
  );
}
