import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'lit-textarea' });

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
      const readOnly = isTrue(props.readOnly);
      const hasCounter = isTrue(props.counter);
      const resize = props.resize || 'vertical';
      const formState = props.state === 'success' || props.state === 'error' ? props.state : 'none';
      const message = props.message || '';
      const hasMsg = !!message && (formState === 'success' || formState === 'error');
      const hideLabel = parse(props.hideLabel, false);
      const hideBase = typeof hideLabel === 'object' && hideLabel !== null ? pick(hideLabel, 'base', false) : hideLabel;
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
      const padBlock = 'calc(28px * (var(--_p-textarea-a) - 0.64285714) + 5px)';
      const padInline = 'calc(22.4px * (var(--_p-textarea-a) - 0.64285714) + 8px)';
      const padBottom = 'calc(var(--p-leading-normal) + calc(22.4px * (var(--_p-textarea-a) - 0.64285714) + 4px))';
      const padding = hasCounter ? padBlock + ' ' + padInline + ' ' + padBottom : padBlock + ' ' + padInline;
      let out =
        ':host{display:block;--_p-textarea-a:' +
        (compact ? '0.64285714' : '1') +
        '}' +
        ':host([hidden]){display:none !important}' +
        'slot[name="label-after"]{display:inline-block;vertical-align:top}' +
        'slot[name="label-after"]::slotted(*){margin-inline-start:var(--p-spacing-static-xs) !important}' +
        '.label-after{display:inline-block;vertical-align:top}' +
        ':not(:defined,[data-ssr]){visibility:hidden}' +
        'textarea{all:unset;grid-area:1/1;display:block;resize:' +
        resize +
        ';field-sizing:var(--p-textarea-field-sizing,unset);min-width:var(--p-textarea-min-width,2ch);max-width:var(--p-textarea-max-width,unset);min-height:var(--p-textarea-min-height,calc(var(--_p-textarea-a) * 3.5rem));max-height:var(--p-textarea-max-height,unset);border:1px solid ' +
        (readOnly ? 'transparent' : palette.border) +
        ';border-radius:' +
        (compact ? 'var(--p-radius-lg)' : 'var(--p-radius-xl)') +
        ';background:' +
        (readOnly ? 'var(--p-color-frosted)' : palette.bg) +
        ';color:' +
        (readOnly ? 'var(--p-color-contrast-medium)' : 'var(--p-color-primary)') +
        ';box-sizing:border-box;transition:background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), border-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);padding:' +
        padding +
        ';cursor:' +
        (disabled ? 'not-allowed' : 'text') +
        '}' +
        'textarea:focus{border-color:' +
        palette.hover +
        '}';
      if (!disabled && !readOnly) {
        out +=
          '@media(hover:hover){textarea:hover, .label-wrapper:hover~textarea{border-color:' + palette.hover + '}}';
      }
      out += '.root{display:grid;gap:var(--p-spacing-static-xs)}.wrapper{display:grid';
      if (disabled) out += ';opacity:0.4';
      out += '}';
      if (hasCounter) {
        out +=
          '.counter{pointer-events:none;max-width:100%;box-sizing:border-box;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);color:var(--p-color-contrast-high);grid-area:1/1;place-self:flex-end;margin-inline-end:' +
          padInline +
          ';margin-bottom:calc(11.2px * (var(--_p-textarea-a) - 0.64285714) + 4px)}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}';
      } else {
        out += '.counter,.sr-only{display:none}';
      }
      out += '.label-wrapper{' + labelVisFor(hideBase) + '}';
      out +=
        '.label{font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);cursor:' +
        (disabled ? 'not-allowed' : 'pointer') +
        ';color:var(--p-color-primary)';
      if (disabled) out += ';pointer-events:none;opacity:0.4';
      out +=
        ';transition:color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);display:inline}.label:empty{display:none}.label:is(span){cursor:unset;font-size:var(--p-typescale-xs);color:var(--p-color-contrast-high);' +
        descVisFor(hideBase) +
        '}.label > slot[name="label"]::slotted(*){display:inline !important}.required{user-select:none}' +
        '.message{display:flex;gap:var(--p-spacing-static-xs);font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next)';
      if (palette.message) out += ';color:' + palette.message;
      out +=
        ';transition:color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), opacity var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)}.message:empty{opacity:0;position:absolute}';
      if (!hasMsg) out += '.message{opacity:0;position:absolute}.message p-icon{display:none}';
      if (disabled) {
        out +=
          '@media(forced-colors:active){.wrapper{opacity:1;color:GrayText}.label{opacity:1;color:GrayText}}';
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
    :host([hidden]) {
      display: none !important;
    }
  `);

  return (
    <div class="root">
      <style innerHTML={state.cssText} />
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
