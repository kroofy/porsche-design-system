import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-pin-code' });

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
      const loading = isTrue(props.loading);
      const compact = isTrue(props.compact);
      const formState = props.state === 'success' || props.state === 'error' ? props.state : 'none';
      const message = props.message || '';
      const hasMsg = !!message && (formState === 'success' || formState === 'error');
      const hideLabel = parse(props.hideLabel, false);
      const hideBase = typeof hideLabel === 'object' && hideLabel !== null ? pick(hideLabel, 'base', false) : hideLabel;
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
      const labelVisFor = (h: any) =>
        isTrue(h)
          ? 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap'
          : 'min-width:fit-content;position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal';
      const descVisFor = (h: any) =>
        isTrue(h)
          ? 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;margin-top:calc(-1 * var(--p-spacing-static-xs))'
          : 'position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal;margin-top:calc(-1 * var(--p-spacing-static-xs))';
      const pad = 'calc(11.2px * (var(--_p-pin-code-a) - 0.64285714) + 4px)';
      let out =
        ':host{display:block;--_p-pin-code-a:' +
        (compact ? '0.64285714' : '1') +
        '}' +
        ':host([hidden]){display:none !important}' +
        'slot[name="label-after"]{display:inline-block;vertical-align:top}' +
        'slot[name="label-after"]::slotted(*){margin-inline-start:var(--p-spacing-static-xs) !important}' +
        '.label-after{display:inline-block;vertical-align:top}' +
        ':not(:defined,[data-ssr]){visibility:hidden}' +
        'input{all:unset;display:block;width:auto;min-width:calc(1ch + ' +
        pad +
        ' * 2 + 1px * 2);max-width:calc(var(--_p-pin-code-a) * 3.5rem);height:calc(var(--_p-pin-code-a) * 3.5rem);padding:' +
        pad +
        ';box-sizing:border-box;border:1px solid ' +
        palette.border +
        ';border-radius:' +
        (compact ? 'var(--p-radius-lg)' : 'var(--p-radius-xl)') +
        ';background:' +
        palette.bg +
        ';font:var(--p-font-weight-normal) var(--p-typescale-sm) / calc(var(--p-leading-normal) + 6px) var(--p-font-porsche-next);color:var(--p-color-primary);transition:background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), border-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);text-overflow:ellipsis;cursor:' +
        (disabled || loading ? 'not-allowed' : 'text') +
        ';text-align:center';
      if (disabled || loading) out += ';opacity:0.4';
      out += '}input:focus-visible{border-color:' + palette.hover + '}';
      if (!disabled && !loading) {
        out += '@media(hover:hover){input:hover{border-color:' + palette.hover + '}}';
      }
      if (disabled || loading) {
        out += '@media(forced-colors:active){input{opacity:1;color:GrayText}}';
      }
      out +=
        '.root{all:unset;display:grid;gap:var(--p-spacing-static-xs)}' +
        '.wrapper{position:relative;display:grid;grid-template-columns:repeat(' +
        length +
        ', 1fr);justify-self:flex-start;gap:' +
        pad +
        '}';
      if (loading) {
        out += '.spinner{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);pointer-events:none}';
      }
      out += '.label-wrapper{' + labelVisFor(hideBase) + '}';
      out +=
        '.label{font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);cursor:' +
        (disabled || loading ? 'not-allowed' : 'pointer') +
        ';color:var(--p-color-primary)';
      if (disabled || loading) out += ';pointer-events:none';
      if (disabled) out += ';opacity:0.4';
      out +=
        ';transition:color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);display:inline}.label:empty{display:none}.label:is(span){cursor:unset;font-size:var(--p-typescale-xs);color:var(--p-color-contrast-high);' +
        descVisFor(hideBase) +
        '}.label > slot[name="label"]::slotted(*){display:inline !important}.required{user-select:none}' +
        '.message{display:flex;gap:var(--p-spacing-static-xs);font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next)';
      if (palette.message) out += ';color:' + palette.message;
      out +=
        ';transition:color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), opacity var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)}.message:empty{opacity:0;position:absolute}';
      if (!hasMsg) out += '.message{opacity:0;position:absolute}.message p-icon{display:none}';
      out +=
        '.loading{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}';
      if (disabled) {
        out += '@media(forced-colors:active){.label{opacity:1;color:GrayText}}';
      }
      const keys: any = {};
      if (typeof hideLabel === 'object' && hideLabel !== null) for (const k of Object.keys(hideLabel)) keys[k] = 1;
      for (const bp of Object.keys(keys)) {
        if (bp === 'base') continue;
        if (!minWidth[bp]) continue;
        const h = pick(hideLabel, bp, hideBase);
        out +=
          '@media(min-width:' + minWidth[bp] + 'px){.label-wrapper{' + labelVisFor(h) + '}.label:is(span){' + descVisFor(h) + '}}';
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
    :host([hidden]) {
      display: none !important;
    }
  `);

  return (
    <fieldset class="root">
      <style innerHTML={state.cssText} />
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
