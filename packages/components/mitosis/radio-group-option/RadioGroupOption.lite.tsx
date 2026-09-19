import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-radio-group-option' });

export default function LitRadioGroupOption(props: {
  value?: any;
  label?: string;
  disabled?: any;
  loading?: any;
  selected?: any;
  disabledParent?: any;
  loadingParent?: any;
  name?: string;
  state?: string;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const isTrue = (v: any) => v === true || v === 'true' || v === '';
      const disabled = isTrue(props.disabled) || isTrue(props.disabledParent);
      const selected = isTrue(props.selected);
      const optionLoading = isTrue(props.loading) && !selected;
      const loading = optionLoading || isTrue(props.loadingParent);
      const blocked = disabled || loading;
      const formState = props.state === 'success' || props.state === 'error' ? props.state : 'none';
      const palettes: any = {
        none: {
          bg: 'var(--p-color-frosted)',
          border: 'var(--p-color-contrast-lower)',
          hover: 'var(--p-color-primary)',
          checked: 'var(--p-color-primary)',
        },
        success: {
          bg: 'var(--p-color-success-frosted-soft)',
          border: 'var(--p-color-success)',
          hover: 'var(--p-color-success)',
          checked: 'var(--p-color-success)',
        },
        error: {
          bg: 'var(--p-color-error-frosted-soft)',
          border: 'var(--p-color-error)',
          hover: 'var(--p-color-error)',
          checked: 'var(--p-color-error)',
        },
      };
      const palette = palettes[formState] || palettes.none;
      return {
        '--p-rgo-bg': palette.bg,
        '--p-rgo-border': palette.border,
        '--p-rgo-hover': blocked ? '' : palette.hover,
        '--p-rgo-checked': palette.checked,
        '--p-rgo-pe': blocked ? 'none' : '',
        '--p-rgo-cursor': blocked ? 'not-allowed' : 'pointer',
        '--p-rgo-opacity': disabled ? '0.4' : '',
        '--p-rgo-fc-opacity': disabled ? '1' : '',
        '--p-rgo-fc-color': disabled ? 'GrayText' : '',
        '--p-rgo-fc-input-border': blocked ? 'GrayText' : '',
      };
    },
    get labelText(): string {
      return props.label || '';
    },
    get isDisabled(): any {
      return (
        props.disabled === true ||
        props.disabled === 'true' ||
        props.disabled === '' ||
        props.disabledParent === true ||
        props.disabledParent === 'true' ||
        props.disabledParent === ''
      );
    },
    get isSelected(): any {
      return props.selected === true || props.selected === 'true' || props.selected === '';
    },
    get isLoadingParent(): any {
      return props.loadingParent === true || props.loadingParent === 'true' || props.loadingParent === '';
    },
    get isOptionLoading(): any {
      const selected = props.selected === true || props.selected === 'true' || props.selected === '';
      const loading = props.loading === true || props.loading === 'true' || props.loading === '';
      return loading && !selected;
    },
    get isLoading(): any {
      const selected = props.selected === true || props.selected === 'true' || props.selected === '';
      const loading = props.loading === true || props.loading === 'true' || props.loading === '';
      const loadingParent =
        props.loadingParent === true || props.loadingParent === 'true' || props.loadingParent === '';
      return (loading && !selected) || loadingParent;
    },
    get loadingText(): string {
      const selected = props.selected === true || props.selected === 'true' || props.selected === '';
      const loading = props.loading === true || props.loading === 'true' || props.loading === '';
      const loadingParent =
        props.loadingParent === true || props.loadingParent === 'true' || props.loadingParent === '';
      if (loadingParent) return '';
      if (loading && !selected) return 'Loading';
      return '';
    },
    get ariaInvalid(): string {
      return props.state === 'error' ? 'true' : '';
    },
    get inputName(): string {
      return props.name || '';
    },
    get inputValue(): string {
      return props.value == null ? '' : String(props.value);
    },
  });

  useStyle(`
    :host {
      display: block;
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
    input {
      all: unset;
      display: grid;
      width: calc(var(--_p-radio-group-option-a) * 1.75rem);
      height: calc(var(--_p-radio-group-option-a) * 1.75rem);
      margin-block: max(0px, calc((var(--p-leading-normal) - calc(var(--_p-radio-group-option-a) * 1.75rem)) / 2));
      box-sizing: border-box;
      font: var(--p-typescale-sm) var(--p-font-porsche-next);
      background: var(--p-rgo-bg);
      transition: background-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), border-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
      border: 1px solid var(--p-rgo-border);
      border-radius: var(--p-radius-full);
      pointer-events: var(--p-rgo-pe);
    }
    input:focus-visible {
      outline: 2px solid var(--p-color-focus);
      outline-offset: 2px;
    }
    input:checked {
      background: var(--p-rgo-checked);
    }
    input::before {
      content: "";
      grid-area: 1 / 1;
    }
    input::after {
      content: "";
      margin: calc(-1px - max(0px, calc(24px - calc(var(--_p-radio-group-option-a) * 1.75rem)) / 2));
      grid-area: 1 / 1;
    }
    input:checked::before {
      -webkit-mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6"/></svg>') center / contain no-repeat;
      mask: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6"/></svg>') center / contain no-repeat;
      background-color: var(--p-color-canvas);
    }
    .root {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      row-gap: var(--p-spacing-static-xs);
    }
    .wrapper {
      position: relative;
      display: flex;
      align-items: center;
      align-self: flex-start;
      min-height: var(--p-leading-normal);
      cursor: var(--p-rgo-cursor, pointer);
      opacity: var(--p-rgo-opacity);
    }
    .spinner {
      --p-spinner-size: calc(calc(var(--_p-radio-group-option-a) * 1.75rem) - 2px);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .label-wrapper {
      min-width: fit-content;
      position: static;
      width: auto;
      height: auto;
      padding: 0;
      margin: 0;
      overflow: visible;
      clip: auto;
      white-space: normal;
      padding-top: max(0px, calc((calc(var(--_p-radio-group-option-a) * 1.75rem) - var(--p-leading-normal)) / 2));
      padding-inline-start: calc(11.2px * (var(--_p-radio-group-option-a) - 0.64285714) + 4px);
    }
    .label {
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      cursor: var(--p-rgo-cursor, pointer);
      color: var(--p-color-primary);
      pointer-events: var(--p-rgo-pe);
      opacity: var(--p-rgo-opacity);
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
      position: static;
      width: auto;
      height: auto;
      padding: 0;
      margin: 0;
      overflow: visible;
      clip: auto;
      white-space: normal;
      margin-top: calc(-1 * var(--p-spacing-static-xs));
    }
    .label > slot[name="label"]::slotted(*) {
      display: inline !important;
    }
    .required {
      user-select: none;
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
    @media (forced-colors: active) {
      input {
        border-color: var(--p-rgo-fc-input-border);
      }
      input:checked::before {
        background: CanvasText;
      }
      input:focus-visible {
        outline-color: Highlight;
      }
      .wrapper {
        opacity: var(--p-rgo-fc-opacity);
        color: var(--p-rgo-fc-color);
      }
      .label {
        opacity: var(--p-rgo-fc-opacity);
        color: var(--p-rgo-fc-color);
      }
    }
    @media (hover: hover) {
      input:hover {
        border-color: var(--p-rgo-hover);
      }
    }
  `);

  return (
    <div class="root">
      <div class="wrapper">
        <input type="radio" />
        <p-spinner class="spinner" aria-hidden="true" />
      </div>
      <div class="label-wrapper">
        <label class="label" id="label">
          {state.labelText}
          <slot name="label" />
        </label>
        <span class="label-after">
          <slot name="label-after" />
        </span>
      </div>
      <span class="loading" id="loading">
        {state.loadingText}
      </span>
    </div>
  );
}
