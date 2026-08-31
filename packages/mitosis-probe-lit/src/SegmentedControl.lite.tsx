import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'lit-segmented-control' });

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
    get cssText(): string {
      const minWidth: any = { xs: 480, s: 760, m: 1000, l: 1300, xl: 1760, xxl: 1920 };
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
      const compact = isTrue(props.compact);
      const noWrap = isTrue(props.noWrap);
      const formState = props.state === 'success' || props.state === 'error' ? props.state : 'none';
      const message = props.message || '';
      const hasMsg = !!message && (formState === 'success' || formState === 'error');
      const hideLabel = parse(props.hideLabel, false);
      const hideBase = typeof hideLabel === 'object' && hideLabel !== null ? pick(hideLabel, 'base', false) : hideLabel;
      const columns = parse(props.columns, 'auto');
      const columnsBase = typeof columns === 'object' && columns !== null ? pick(columns, 'base', 'auto') : columns;
      const minItem = 46;
      const maxCap = 220;
      const measuredMin: any = 46;
      const measuredMax: any = 80;
      const colWidthFor = (col: any) => {
        if (col === 'auto' || col === undefined || col === null || col === '') {
          const w = (measuredMax > maxCap && maxCap) || (measuredMax < minItem && measuredMin) || measuredMax;
          return 'repeat(auto-fit, ' + w + 'px)';
        }
        return 'repeat(' + col + ', minmax(0, 1fr))';
      };
      const palettes: any = {
        none: '',
        success: 'var(--p-color-success)',
        error: 'var(--p-color-error)',
      };
      const messageColor = palettes[formState] || '';
      const labelVisFor = (h: any) =>
        isTrue(h)
          ? 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap'
          : 'min-width:fit-content;position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal';
      const descVisFor = (h: any) =>
        isTrue(h)
          ? 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;margin-top:calc(-1 * var(--p-spacing-static-xs))'
          : 'position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal;margin-top:calc(-1 * var(--p-spacing-static-xs))';
      let out =
        ':host([hidden]){display:none !important}' +
        'slot[name="label-after"]{display:inline-block;vertical-align:top}' +
        'slot[name="label-after"]::slotted(*){margin-inline-start:var(--p-spacing-static-xs) !important}' +
        '.label-after{display:inline-block;vertical-align:top}' +
        ':not(:defined,[data-ssr]){visibility:hidden}' +
        'slot:not([name]){display:grid;grid-auto-rows:1fr';
      if (noWrap) {
        out += ';grid-auto-flow:column;grid-auto-columns:max-content';
      } else {
        out += ';grid-template-columns:' + colWidthFor(columnsBase);
      }
      out += ';gap:6px}.root{all:unset;display:grid;gap:var(--p-spacing-static-xs)}';
      if (noWrap) out += '.scroller{margin:calc(-1 * var(--p-spacing-static-xs)) 0}';
      out += '.label-wrapper{' + labelVisFor(hideBase) + '}';
      out +=
        '.label{font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);cursor:' +
        (disabled ? 'not-allowed' : 'inherit') +
        ';color:var(--p-color-primary)';
      if (disabled) out += ';pointer-events:none;opacity:0.4';
      out +=
        ';transition:color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);display:inline}.label:empty{display:none}.label:is(span){cursor:unset;font-size:var(--p-typescale-xs);color:var(--p-color-contrast-high);' +
        descVisFor(hideBase) +
        '}.label > slot[name="label"]::slotted(*){display:inline !important}.required{user-select:none}' +
        '.message{display:flex;gap:var(--p-spacing-static-xs);font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next)';
      if (messageColor) out += ';color:' + messageColor;
      out +=
        ';transition:color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), opacity var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)}.message:empty{opacity:0;position:absolute}';
      if (!hasMsg) out += '.message{opacity:0;position:absolute}.message p-icon{display:none}';
      if (disabled) {
        out += '@media(forced-colors:active){.label{opacity:1;color:GrayText}}';
      }
      const keys: any = {};
      if (typeof hideLabel === 'object' && hideLabel !== null) for (const k of Object.keys(hideLabel)) keys[k] = 1;
      if (typeof columns === 'object' && columns !== null) for (const k of Object.keys(columns)) keys[k] = 1;
      for (const bp of Object.keys(keys)) {
        if (bp === 'base') continue;
        if (!minWidth[bp]) continue;
        let media = '@media(min-width:' + minWidth[bp] + 'px){';
        if (typeof hideLabel === 'object' && hideLabel !== null && hideLabel[bp] !== undefined) {
          const h = pick(hideLabel, bp, hideBase);
          media += '.label-wrapper{' + labelVisFor(h) + '}.label:is(span){' + descVisFor(h) + '}';
        }
        if (!noWrap && typeof columns === 'object' && columns !== null && columns[bp] !== undefined) {
          media += 'slot:not([name]){grid-template-columns:' + colWidthFor(pick(columns, bp, columnsBase)) + '}';
        }
        media += '}';
        out += media;
      }
      return out;
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
  `);

  return (
    <fieldset class="root">
      <style innerHTML={state.cssText} />
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
