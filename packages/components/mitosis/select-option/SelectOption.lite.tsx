import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-select-option' });

export default function LitSelectOption(props: {
  value?: any;
  disabled?: any;
  selected?: any;
  highlighted?: any;
  disabledParent?: any;
  hidden?: any;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const isTrue = (v: any) => v === true || v === 'true' || v === '';
      const disabled = isTrue(props.disabled) || isTrue(props.disabledParent);
      return {
        '--p-select-option-opacity': disabled ? '0.4' : '',
        '--p-select-option-fc-opacity': disabled ? '1' : '',
        '--p-select-option-fc-color': disabled ? 'GrayText' : '',
        '--p-select-option-cursor': disabled ? 'not-allowed' : '',
      };
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
    get isHighlighted(): any {
      return props.highlighted === true || props.highlighted === 'true' || props.highlighted === '';
    },
    get optionClass(): string {
      const disabled =
        props.disabled === true ||
        props.disabled === 'true' ||
        props.disabled === '' ||
        props.disabledParent === true ||
        props.disabledParent === 'true' ||
        props.disabledParent === '';
      const selected = props.selected === true || props.selected === 'true' || props.selected === '';
      const highlighted = props.highlighted === true || props.highlighted === 'true' || props.highlighted === '';
      let name = 'option';
      if (selected) name += ' option--selected';
      if (highlighted) name += ' option--highlighted';
      if (disabled) name += ' option--disabled';
      return name;
    },
  });

  useStyle(`
    :host {
      display: block;
      opacity: var(--p-select-option-opacity) !important;
      scroll-margin-block-start: calc(max(2px, var(--_p-select-option-a, 1) * 6px) + 36px) !important;
      scroll-margin-block-end: max(2px, var(--_p-select-option-a, 1) * 6px) !important;
    }
    :host([hidden]) {
      display: none !important;
    }
    ::slotted(img) {
      font: var(--p-typescale-sm) var(--p-font-porsche-next) !important;
      width: auto !important;
      height: var(--p-leading-normal) !important;
      border-radius: var(--p-radius-sm) !important;
    }
    :not(:defined, [data-ssr]) {
      visibility: hidden;
    }
    .option {
      display: flex;
      gap: calc(11.2px * (var(--_p-select-option-a) - 0.64285714) + 4px);
      padding-block: calc(11.2px * (var(--_p-select-option-a) - 0.64285714) + 4px);
      padding-inline: var(--_p-select-option-b, calc(16.8px * (var(--_p-select-option-a) - 0.64285714) + 6px)) calc(16.8px * (var(--_p-select-option-a) - 0.64285714) + 6px);
      min-height: var(--p-leading-normal);
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      color: var(--p-color-contrast-high);
      cursor: var(--p-select-option-cursor, pointer);
      text-align: start;
      word-break: break-word;
      box-sizing: content-box;
      border-radius: var(--p-radius-sm);
      transition: background-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
    }
    .option--highlighted {
      background: var(--p-color-frosted);
    }
    .option--highlighted,
    .option--selected {
      color: var(--p-color-primary);
    }
    .option--disabled {
      cursor: not-allowed;
    }
    .option--hidden {
      display: none;
    }
    .icon {
      margin-inline-start: auto;
    }
    @media (forced-colors: active) {
      :host {
        opacity: var(--p-select-option-fc-opacity) !important;
        color: var(--p-select-option-fc-color) !important;
      }
      .option--disabled {
        color: GrayText;
      }
      .option--highlighted {
        forced-color-adjust: none;
        outline: 2px solid Highlight;
        outline-offset: -2px;
      }
    }
  `);

  return (
    <div class="option">
      <slot />
      <p-icon name="check" color="primary" />
    </div>
  );
}
