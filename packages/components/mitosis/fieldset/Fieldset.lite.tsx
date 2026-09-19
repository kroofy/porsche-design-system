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
    get hostStyle(): Record<string, string> {
      const formState = props.state === 'success' || props.state === 'error' ? props.state : 'none';
      const message = props.message || '';
      const hasMsg = !!message && (formState === 'success' || formState === 'error');
      const label = props.label || '';
      const hasLabel = !!label;
      const small = (props.labelSize || 'medium') === 'small';
      const palettes: any = {
        none: '',
        success: 'var(--p-color-success)',
        error: 'var(--p-color-error)',
      };
      return {
        '--p-fieldset-legend-display': hasLabel ? '' : 'none',
        '--p-fieldset-legend-font': small
          ? 'var(--p-font-weight-semibold) var(--p-typescale-sm)'
          : 'var(--p-font-weight-normal) var(--p-typescale-md)',
        '--p-fieldset-msg-color': palettes[formState] || '',
        '--p-fieldset-msg-opacity': hasMsg ? '' : '0',
        '--p-fieldset-msg-pos': hasMsg ? '' : 'absolute',
        '--p-fieldset-icon-display': hasMsg ? '' : 'none',
      };
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
    :host {
      display: block;
    }
    :host([hidden]) {
      display: none !important;
    }
    :not(:defined, [data-ssr]) {
      visibility: hidden;
    }
    fieldset {
      all: unset;
      display: block;
    }
    legend {
      all: unset;
      display: var(--p-fieldset-legend-display);
      margin-bottom: var(--p-spacing-static-md);
      color: var(--p-color-primary);
      font: var(--p-fieldset-legend-font) / var(--p-leading-normal) var(--p-font-porsche-next);
    }
    .required {
      user-select: none;
    }
    .message {
      display: flex;
      gap: var(--p-spacing-static-xs);
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      color: var(--p-fieldset-msg-color);
      transition: color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), opacity var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
      margin-top: var(--p-spacing-static-md);
      opacity: var(--p-fieldset-msg-opacity);
      position: var(--p-fieldset-msg-pos);
    }
    .message:empty {
      opacity: 0;
      position: absolute;
    }
    .message p-icon {
      display: var(--p-fieldset-icon-display);
    }
  `);

  return (
    <fieldset>
      <legend>{state.labelText}</legend>
      <slot />
      <span class="message" id="message">
        <p-icon aria-hidden="true" />
        {state.messageText}
      </span>
    </fieldset>
  );
}
