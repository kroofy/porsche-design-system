import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-switch' });

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

const assignStretch = (vars: Record<string, string>, bp: string, stretch: boolean) => {
  const p = bp === 'base' ? '--p-sw' : `--p-sw-${bp}`;
  if (stretch) {
    vars[`${p}-display`] = 'flex';
    vars[`${p}-justify`] = 'space-between';
    vars[`${p}-w`] = '100%';
    vars[`${p}-va`] = 'top';
    return;
  }
  vars[`${p}-display`] = 'inline-flex';
  vars[`${p}-justify`] = 'flex-start';
  vars[`${p}-w`] = 'auto';
  vars[`${p}-va`] = 'top';
};

const assignAlign = (vars: Record<string, string>, bp: string, align: any) => {
  const p = bp === 'base' ? '--p-sw-order' : `--p-sw-${bp}-order`;
  vars[p] = align === 'start' ? '-1' : '0';
};

const assignHide = (vars: Record<string, string>, bp: string, hidden: boolean) => {
  const p = bp === 'base' ? '--p-sw-lbl' : `--p-sw-${bp}-lbl`;
  if (hidden) {
    vars[`${p}-pos`] = 'absolute';
    vars[`${p}-w`] = '1px';
    vars[`${p}-h`] = '1px';
    vars[`${p}-pad`] = '0';
    vars[`${p}-m`] = '-1px';
    vars[`${p}-ov`] = 'hidden';
    vars[`${p}-clip`] = 'rect(0, 0, 0, 0)';
    vars[`${p}-ws`] = 'nowrap';
    vars[`${p}-pt`] = '0';
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
  vars[`${p}-pt`] =
    'max(0px, calc((calc(var(--_p-switch-a) * 1.75rem) - var(--p-leading-normal)) / 2))';
};

const walkBreakpoints = (raw: any, fallback: any, assign: (vars: Record<string, string>, bp: string, value: any) => void, vars: Record<string, string>, normalize: (v: any) => any) => {
  if (typeof raw === 'object' && raw !== null) {
    let last = normalize(pick(raw, 'base', fallback));
    for (const bp of BREAKPOINTS) {
      if (raw[bp] !== undefined) last = normalize(pick(raw, bp, fallback));
      assign(vars, bp, last);
    }
    return;
  }
  const value = normalize(raw);
  for (const bp of BREAKPOINTS) assign(vars, bp, value);
};

export default function LitSwitch(props: {
  alignLabel?: any;
  hideLabel?: any;
  stretch?: any;
  checked?: any;
  disabled?: any;
  loading?: any;
  compact?: any;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const checked = isTrue(props.checked);
      const disabled = isTrue(props.disabled);
      const loading = isTrue(props.loading);
      const compact = isTrue(props.compact);
      const blocked = disabled || loading;
      const alignLabel = parse(props.alignLabel, 'end');
      const hideLabel = parse(props.hideLabel, false);
      const stretch = parse(props.stretch, false);
      const toggleOff = 'calc(var(--_p-switch-a) * .1875rem)';
      const toggleOn =
        'calc(calc(var(--_p-switch-a) * 3rem) - 1px * 2 - 100% - calc(var(--_p-switch-a) * .1875rem))';
      const vars: Record<string, string> = {
        '--p-sw-a': compact ? '0.64285714' : '1',
        '--p-sw-border': checked ? 'var(--p-color-success-low)' : 'var(--p-color-contrast-low)',
        '--p-sw-hover-border': blocked
          ? checked
            ? 'var(--p-color-success-low)'
            : 'var(--p-color-contrast-low)'
          : checked
            ? 'var(--p-color-success)'
            : 'var(--p-color-primary)',
        '--p-sw-btn-bg': checked ? 'var(--p-color-success-frosted-soft)' : 'var(--p-color-frosted-soft)',
        '--p-sw-toggle-bg': loading
          ? 'transparent'
          : checked
            ? 'var(--p-color-success)'
            : 'var(--p-color-primary)',
        '--p-sw-toggle-x': checked ? toggleOn : toggleOff,
        '--p-sw-cursor': blocked ? 'not-allowed' : 'pointer',
        '--p-sw-opacity': disabled ? '0.4' : '',
        '--p-sw-spinner-display': loading ? '' : 'none',
        '--p-sw-fc-opacity': disabled ? '1' : '',
        '--p-sw-fc-color': disabled ? 'GrayText' : '',
        '--p-sw-fc-border': blocked ? 'GrayText' : '',
        '--p-sw-fc-label': blocked ? 'GrayText' : '',
      };
      walkBreakpoints(stretch, false, assignStretch, vars, isTrue);
      walkBreakpoints(alignLabel, 'end', assignAlign, vars, (v) => v);
      walkBreakpoints(hideLabel, false, assignHide, vars, isTrue);
      return vars;
    },
    get ariaDisabled(): string {
      const disabled = props.disabled === true || props.disabled === 'true' || props.disabled === '';
      const loading = props.loading === true || props.loading === 'true' || props.loading === '';
      return disabled || loading ? 'true' : '';
    },
    get ariaChecked(): string {
      const checked = props.checked === true || props.checked === 'true' || props.checked === '';
      return checked ? 'true' : 'false';
    },
    get loadingText(): string {
      const loading = props.loading === true || props.loading === 'true' || props.loading === '';
      return loading ? 'Loading' : '';
    },
  });

  useStyle(`
    .wrap {
      display: contents;
    }
    :host {
      --_p-switch-a: var(--p-sw-a, 1);
      display: var(--p-sw-display, inline-flex);
      justify-content: var(--p-sw-justify, flex-start) !important;
      width: var(--p-sw-w, auto) !important;
      vertical-align: var(--p-sw-va, top) !important;
      opacity: var(--p-sw-opacity);
      outline: 0 !important;
      font: var(--p-typescale-sm) var(--p-font-porsche-next) !important;
      gap: calc(11.2px * (var(--_p-switch-a) - 0.64285714) + 4px) !important;
    }
    :host([hidden]) {
      display: none !important;
    }
    :not(:defined, [data-ssr]) {
      visibility: hidden;
    }
    button {
      all: unset;
      position: relative;
      display: flex;
      align-items: center;
      flex-shrink: 0;
      box-sizing: border-box;
      width: calc(var(--_p-switch-a) * 3rem);
      height: calc(var(--_p-switch-a) * 1.75rem);
      margin-block: max(0px, calc((var(--p-leading-normal) - calc(var(--_p-switch-a) * 1.75rem)) / 2));
      font: var(--p-typescale-sm) var(--p-font-porsche-next);
      border: 1px solid var(--p-sw-border);
      border-radius: var(--p-radius-full);
      background: var(--p-sw-btn-bg);
      cursor: var(--p-sw-cursor, pointer);
      transition: background-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), border-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
    }
    button:focus-visible {
      outline: 2px solid var(--p-color-focus);
      outline-offset: 2px;
    }
    button::before {
      content: "";
      position: absolute;
      inset: calc(-1px - max(0px, calc(24px - calc(var(--_p-switch-a) * 1.75rem)) / 2));
    }
    label {
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      min-width: 0;
      min-height: 0;
      cursor: var(--p-sw-cursor, pointer);
      color: var(--p-color-primary);
      order: var(--p-sw-order, 0);
      position: var(--p-sw-lbl-pos, static);
      width: var(--p-sw-lbl-w, auto);
      height: var(--p-sw-lbl-h, auto);
      padding: var(--p-sw-lbl-pad, 0);
      margin: var(--p-sw-lbl-m, 0);
      overflow: var(--p-sw-lbl-ov, visible);
      clip: var(--p-sw-lbl-clip, auto);
      white-space: var(--p-sw-lbl-ws, normal);
      padding-top: var(--p-sw-lbl-pt);
    }
    .toggle {
      display: flex;
      place-items: center;
      place-content: center;
      width: calc(var(--_p-switch-a) * 1.25rem);
      height: calc(var(--_p-switch-a) * 1.25rem);
      border-radius: var(--p-radius-full);
      background: var(--p-sw-toggle-bg);
      transition: transform var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
      transform: translate3d(var(--p-sw-toggle-x), 0, 0);
    }
    .toggle:dir(rtl) {
      transform: translate3d(calc(var(--p-sw-toggle-x) * -1), 0, 0);
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
    .spinner {
      --p-spinner-size: calc(var(--_p-switch-a) * 1.75rem);
    }
    .spinner,
    p-spinner {
      display: var(--p-sw-spinner-display);
    }
    @media (forced-colors: active) {
      :host {
        opacity: var(--p-sw-fc-opacity, var(--p-sw-opacity, 1));
        color: var(--p-sw-fc-color);
      }
      button {
        border-color: var(--p-sw-fc-border, var(--p-sw-border));
      }
      button:focus-visible {
        outline-color: Highlight;
      }
      label {
        color: var(--p-sw-fc-label, var(--p-color-primary));
      }
      .toggle {
        background: CanvasText;
      }
    }
    @media (hover: hover) {
      button:hover {
        border-color: var(--p-sw-hover-border, var(--p-sw-border));
      }
    }
    @media (min-width: 480px) {
      :host {
        display: var(--p-sw-xs-display, var(--p-sw-display, inline-flex));
        justify-content: var(--p-sw-xs-justify, var(--p-sw-justify, flex-start)) !important;
        width: var(--p-sw-xs-w, var(--p-sw-w, auto)) !important;
        vertical-align: var(--p-sw-xs-va, var(--p-sw-va, top)) !important;
      }
      label {
        order: var(--p-sw-xs-order, var(--p-sw-order, 0));
        position: var(--p-sw-xs-lbl-pos, var(--p-sw-lbl-pos, static));
        width: var(--p-sw-xs-lbl-w, var(--p-sw-lbl-w, auto));
        height: var(--p-sw-xs-lbl-h, var(--p-sw-lbl-h, auto));
        padding: var(--p-sw-xs-lbl-pad, var(--p-sw-lbl-pad, 0));
        margin: var(--p-sw-xs-lbl-m, var(--p-sw-lbl-m, 0));
        overflow: var(--p-sw-xs-lbl-ov, var(--p-sw-lbl-ov, visible));
        clip: var(--p-sw-xs-lbl-clip, var(--p-sw-lbl-clip, auto));
        white-space: var(--p-sw-xs-lbl-ws, var(--p-sw-lbl-ws, normal));
        padding-top: var(--p-sw-xs-lbl-pt, var(--p-sw-lbl-pt));
      }
    }
    @media (min-width: 760px) {
      :host {
        display: var(--p-sw-s-display, var(--p-sw-xs-display, var(--p-sw-display, inline-flex)));
        justify-content: var(--p-sw-s-justify, var(--p-sw-xs-justify, var(--p-sw-justify, flex-start))) !important;
        width: var(--p-sw-s-w, var(--p-sw-xs-w, var(--p-sw-w, auto))) !important;
        vertical-align: var(--p-sw-s-va, var(--p-sw-xs-va, var(--p-sw-va, top))) !important;
      }
      label {
        order: var(--p-sw-s-order, var(--p-sw-xs-order, var(--p-sw-order, 0)));
        position: var(--p-sw-s-lbl-pos, var(--p-sw-xs-lbl-pos, var(--p-sw-lbl-pos, static)));
        width: var(--p-sw-s-lbl-w, var(--p-sw-xs-lbl-w, var(--p-sw-lbl-w, auto)));
        height: var(--p-sw-s-lbl-h, var(--p-sw-xs-lbl-h, var(--p-sw-lbl-h, auto)));
        padding: var(--p-sw-s-lbl-pad, var(--p-sw-xs-lbl-pad, var(--p-sw-lbl-pad, 0)));
        margin: var(--p-sw-s-lbl-m, var(--p-sw-xs-lbl-m, var(--p-sw-lbl-m, 0)));
        overflow: var(--p-sw-s-lbl-ov, var(--p-sw-xs-lbl-ov, var(--p-sw-lbl-ov, visible)));
        clip: var(--p-sw-s-lbl-clip, var(--p-sw-xs-lbl-clip, var(--p-sw-lbl-clip, auto)));
        white-space: var(--p-sw-s-lbl-ws, var(--p-sw-xs-lbl-ws, var(--p-sw-lbl-ws, normal)));
        padding-top: var(--p-sw-s-lbl-pt, var(--p-sw-xs-lbl-pt, var(--p-sw-lbl-pt)));
      }
    }
    @media (min-width: 1000px) {
      :host {
        display: var(--p-sw-m-display, var(--p-sw-s-display, var(--p-sw-xs-display, var(--p-sw-display, inline-flex))));
        justify-content: var(--p-sw-m-justify, var(--p-sw-s-justify, var(--p-sw-xs-justify, var(--p-sw-justify, flex-start)))) !important;
        width: var(--p-sw-m-w, var(--p-sw-s-w, var(--p-sw-xs-w, var(--p-sw-w, auto)))) !important;
        vertical-align: var(--p-sw-m-va, var(--p-sw-s-va, var(--p-sw-xs-va, var(--p-sw-va, top)))) !important;
      }
      label {
        order: var(--p-sw-m-order, var(--p-sw-s-order, var(--p-sw-xs-order, var(--p-sw-order, 0))));
        position: var(--p-sw-m-lbl-pos, var(--p-sw-s-lbl-pos, var(--p-sw-xs-lbl-pos, var(--p-sw-lbl-pos, static))));
        width: var(--p-sw-m-lbl-w, var(--p-sw-s-lbl-w, var(--p-sw-xs-lbl-w, var(--p-sw-lbl-w, auto))));
        height: var(--p-sw-m-lbl-h, var(--p-sw-s-lbl-h, var(--p-sw-xs-lbl-h, var(--p-sw-lbl-h, auto))));
        padding: var(--p-sw-m-lbl-pad, var(--p-sw-s-lbl-pad, var(--p-sw-xs-lbl-pad, var(--p-sw-lbl-pad, 0))));
        margin: var(--p-sw-m-lbl-m, var(--p-sw-s-lbl-m, var(--p-sw-xs-lbl-m, var(--p-sw-lbl-m, 0))));
        overflow: var(--p-sw-m-lbl-ov, var(--p-sw-s-lbl-ov, var(--p-sw-xs-lbl-ov, var(--p-sw-lbl-ov, visible))));
        clip: var(--p-sw-m-lbl-clip, var(--p-sw-s-lbl-clip, var(--p-sw-xs-lbl-clip, var(--p-sw-lbl-clip, auto))));
        white-space: var(--p-sw-m-lbl-ws, var(--p-sw-s-lbl-ws, var(--p-sw-xs-lbl-ws, var(--p-sw-lbl-ws, normal))));
        padding-top: var(--p-sw-m-lbl-pt, var(--p-sw-s-lbl-pt, var(--p-sw-xs-lbl-pt, var(--p-sw-lbl-pt))));
      }
    }
    @media (min-width: 1300px) {
      :host {
        display: var(--p-sw-l-display, var(--p-sw-m-display));
        justify-content: var(--p-sw-l-justify, var(--p-sw-m-justify)) !important;
        width: var(--p-sw-l-w, var(--p-sw-m-w)) !important;
        vertical-align: var(--p-sw-l-va, var(--p-sw-m-va)) !important;
      }
      label {
        order: var(--p-sw-l-order, var(--p-sw-m-order));
        position: var(--p-sw-l-lbl-pos, var(--p-sw-m-lbl-pos));
        width: var(--p-sw-l-lbl-w, var(--p-sw-m-lbl-w));
        height: var(--p-sw-l-lbl-h, var(--p-sw-m-lbl-h));
        padding: var(--p-sw-l-lbl-pad, var(--p-sw-m-lbl-pad));
        margin: var(--p-sw-l-lbl-m, var(--p-sw-m-lbl-m));
        overflow: var(--p-sw-l-lbl-ov, var(--p-sw-m-lbl-ov));
        clip: var(--p-sw-l-lbl-clip, var(--p-sw-m-lbl-clip));
        white-space: var(--p-sw-l-lbl-ws, var(--p-sw-m-lbl-ws));
        padding-top: var(--p-sw-l-lbl-pt, var(--p-sw-m-lbl-pt));
      }
    }
    @media (min-width: 1760px) {
      :host {
        display: var(--p-sw-xl-display, var(--p-sw-l-display));
        justify-content: var(--p-sw-xl-justify, var(--p-sw-l-justify)) !important;
        width: var(--p-sw-xl-w, var(--p-sw-l-w)) !important;
        vertical-align: var(--p-sw-xl-va, var(--p-sw-l-va)) !important;
      }
      label {
        order: var(--p-sw-xl-order, var(--p-sw-l-order));
        position: var(--p-sw-xl-lbl-pos, var(--p-sw-l-lbl-pos));
        width: var(--p-sw-xl-lbl-w, var(--p-sw-l-lbl-w));
        height: var(--p-sw-xl-lbl-h, var(--p-sw-l-lbl-h));
        padding: var(--p-sw-xl-lbl-pad, var(--p-sw-l-lbl-pad));
        margin: var(--p-sw-xl-lbl-m, var(--p-sw-l-lbl-m));
        overflow: var(--p-sw-xl-lbl-ov, var(--p-sw-l-lbl-ov));
        clip: var(--p-sw-xl-lbl-clip, var(--p-sw-l-lbl-clip));
        white-space: var(--p-sw-xl-lbl-ws, var(--p-sw-l-lbl-ws));
        padding-top: var(--p-sw-xl-lbl-pt, var(--p-sw-l-lbl-pt));
      }
    }
    @media (min-width: 1920px) {
      :host {
        display: var(--p-sw-xxl-display, var(--p-sw-xl-display));
        justify-content: var(--p-sw-xxl-justify, var(--p-sw-xl-justify)) !important;
        width: var(--p-sw-xxl-w, var(--p-sw-xl-w)) !important;
        vertical-align: var(--p-sw-xxl-va, var(--p-sw-xl-va)) !important;
      }
      label {
        order: var(--p-sw-xxl-order, var(--p-sw-xl-order));
        position: var(--p-sw-xxl-lbl-pos, var(--p-sw-xl-lbl-pos));
        width: var(--p-sw-xxl-lbl-w, var(--p-sw-xl-lbl-w));
        height: var(--p-sw-xxl-lbl-h, var(--p-sw-xl-lbl-h));
        padding: var(--p-sw-xxl-lbl-pad, var(--p-sw-xl-lbl-pad));
        margin: var(--p-sw-xxl-lbl-m, var(--p-sw-xl-lbl-m));
        overflow: var(--p-sw-xxl-lbl-ov, var(--p-sw-xl-lbl-ov));
        clip: var(--p-sw-xxl-lbl-clip, var(--p-sw-xl-lbl-clip));
        white-space: var(--p-sw-xxl-lbl-ws, var(--p-sw-xl-lbl-ws));
        padding-top: var(--p-sw-xxl-lbl-pt, var(--p-sw-xl-lbl-pt));
      }
    }
  `);

  return (
    <div class="wrap">
      <button type="button" role="switch">
        <span class="toggle">
          <p-spinner class="spinner" aria-hidden="true" />
        </span>
      </button>
      <label>
        <slot></slot>
      </label>
      <span class="loading" id="loading" role="status">
        {state.loadingText}
      </span>
    </div>
  );
}
