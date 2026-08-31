import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-fieldset' });

export default function LitFieldset(props: {
  label?: string;
  labelSize?: string;
  required?: any;
  message?: string;
  state?: string;
  theme?: string;
}) {
  const state = useStore({
    get cssText(): string {
      const formState = props.state === 'success' || props.state === 'error' ? props.state : 'none';
      const message = props.message || '';
      const hasMsg = !!message && (formState === 'success' || formState === 'error');
      const label = props.label || '';
      const hasLabel = !!label;
      const labelSize = props.labelSize || 'medium';
      const small = labelSize === 'small';
      const palettes: any = {
        none: '',
        success: 'var(--p-color-success)',
        error: 'var(--p-color-error)',
      };
      const messageColor = palettes[formState] || '';
      let out =
        ':host{display:block}' +
        ':host([hidden]){display:none !important}' +
        ':not(:defined,[data-ssr]){visibility:hidden}' +
        'fieldset{all:unset;display:block}';
      if (hasLabel) {
        out +=
          'legend{all:unset;margin-bottom:var(--p-spacing-static-md);color:var(--p-color-primary);font:' +
          (small ? 'var(--p-font-weight-semibold) var(--p-typescale-sm)' : 'var(--p-font-weight-normal) var(--p-typescale-md)') +
          ' / var(--p-leading-normal) var(--p-font-porsche-next)}';
      } else {
        out += 'legend{display:none}';
      }
      out +=
        '.required{user-select:none}' +
        '.message{display:flex;gap:var(--p-spacing-static-xs);font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next)';
      if (messageColor) out += ';color:' + messageColor;
      out +=
        ';transition:color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), opacity var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);margin-top:var(--p-spacing-static-md)}.message:empty{opacity:0;position:absolute}';
      if (!hasMsg) out += '.message{opacity:0;position:absolute}.message p-icon{display:none}';
      return out;
    },
    get labelText(): string {
      return props.label || '';
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
  });

  useStyle(`
    :host([hidden]) {
      display: none !important;
    }
  `);

  return (
    <fieldset>
      <style innerHTML={state.cssText} />
      <legend>{state.labelText}</legend>
      <slot />
      <span class="message" id="message">
        <p-icon aria-hidden="true" />
        {state.messageText}
      </span>
    </fieldset>
  );
}
