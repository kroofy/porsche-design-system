import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-multi-select-option' });

const CHECK_MASK =
  "url('data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"m20.22,7.47l-1.47-1.42-9.26,9.02-4.24-4.15-1.47,1.42,5.71,5.6,10.73-10.47Z\"/></svg>') center/contain no-repeat";

export default function LitMultiSelectOption(props: {
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
      const selected = isTrue(props.selected);
      return {
        '--p-mso-opacity': disabled ? '0.4' : '',
        '--p-mso-fc-opacity': disabled ? '1' : '',
        '--p-mso-fc-color': disabled ? 'GrayText' : '',
        '--p-mso-pe': disabled ? 'none' : '',
        '--p-mso-cb-fc-border': disabled ? 'GrayText' : '',
        '--p-mso-mask': selected ? CHECK_MASK : '',
        '--p-mso-mask-bg': selected ? 'var(--p-checkbox-icon-color, var(--p-color-canvas))' : '',
        '--p-mso-cb-bg': selected ? 'var(--p-color-primary)' : '',
        '--p-mso-fc-check': selected ? 'CanvasText' : '',
        '--p-mso-hover-border': selected
          ? 'transparent'
          : 'var(--p-checkbox-border-color, var(--p-color-primary))',
        '--p-mso-hover-bg': selected ? 'var(--p-checkbox-border-color, var(--p-color-contrast-high))' : '',
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
      opacity: var(--p-mso-opacity) !important;
      scroll-margin-block-start: calc(max(2px, var(--_p-multi-select-option-a, 1) * 6px) + 36px) !important;
      scroll-margin-block-end: max(2px, var(--_p-multi-select-option-a, 1) * 6px) !important;
      --_p-checkbox-scaling: var(--_p-multi-select-option-a) !important;
    }
    :host([hidden]) {
      display: none !important;
    }
    slot {
      display: block;
      padding-top: max(0px, calc((calc(var(--_p-checkbox-scaling) * 1.75rem) - var(--p-leading-normal)) / 2));
    }
    :not(:defined, [data-ssr]) {
      visibility: hidden;
    }
    .option {
      display: flex;
      gap: calc(11.2px * (var(--_p-multi-select-option-a) - 0.64285714) + 4px);
      padding-block: calc(11.2px * (var(--_p-multi-select-option-a) - 0.64285714) + 4px);
      padding-inline: var(--_p-multi-select-option-b, calc(16.8px * (var(--_p-multi-select-option-a) - 0.64285714) + 6px)) calc(16.8px * (var(--_p-multi-select-option-a) - 0.64285714) + 6px);
      min-height: var(--p-leading-normal);
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      color: var(--p-color-contrast-high);
      cursor: pointer;
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
    .checkbox {
      all: unset;
      display: grid;
      width: calc(var(--_p-checkbox-scaling) * 1.75rem);
      height: calc(var(--_p-checkbox-scaling) * 1.75rem);
      margin-block: max(0px, calc((var(--p-leading-normal) - calc(var(--_p-checkbox-scaling) * 1.75rem)) / 2));
      box-sizing: border-box;
      font: var(--p-typescale-sm) var(--p-font-porsche-next);
      background: var(--p-mso-cb-bg, var(--p-checkbox-background-color, var(--p-color-frosted)));
      transition: background-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out), border-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out);
      border: 1px solid var(--p-checkbox-border-color, var(--p-color-contrast-lower));
      border-radius: var(--p-radius-md);
      pointer-events: var(--p-mso-pe);
      flex-shrink: 0;
    }
    .checkbox::before {
      content: "";
      grid-area: 1 / 1;
      -webkit-mask: var(--p-mso-mask);
      mask: var(--p-mso-mask);
      background-color: var(--p-mso-mask-bg);
    }
    .checkbox::after {
      content: "";
      margin: calc(-1px - max(0px, calc(24px - calc(var(--_p-checkbox-scaling) * 1.75rem)) / 2));
      grid-area: 1 / 1;
    }
    @media (forced-colors: active) {
      :host {
        opacity: var(--p-mso-fc-opacity) !important;
        color: var(--p-mso-fc-color) !important;
      }
      .option--disabled {
        color: GrayText;
      }
      .option--highlighted {
        forced-color-adjust: none;
        outline: 2px solid Highlight;
        outline-offset: -2px;
      }
      .checkbox {
        border-color: var(--p-mso-cb-fc-border);
      }
      .checkbox::before {
        background: var(--p-mso-fc-check);
      }
    }
    @media (hover: hover) {
      .checkbox:hover {
        border-color: var(--p-mso-hover-border);
        background-color: var(--p-mso-hover-bg);
      }
    }
  `);

  return (
    <div class="option">
      <span class="checkbox" />
      <slot />
    </div>
  );
}
