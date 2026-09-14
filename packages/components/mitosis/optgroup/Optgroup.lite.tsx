import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-optgroup' });

export default function LitOptgroup(props: {
  label?: string;
  disabled?: any;
  hidden?: any;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const disabled = props.disabled === true || props.disabled === 'true' || props.disabled === '';
      return {
        '--p-optgroup-opacity': disabled ? '0.4' : '1',
        '--p-optgroup-hcm-color': disabled ? 'GrayText' : 'var(--p-color-primary)',
      };
    },
    get labelText(): string {
      return props.label || '';
    },
    get isDisabled(): any {
      return props.disabled === true || props.disabled === 'true' || props.disabled === '';
    },
  });

  useStyle(`
    :host {
      display: block;
    }
    :host([hidden]) {
      display: none !important;
    }
    ::slotted(*) {
      --_p-select-option-b: calc(44.8px * (var(--_p-optgroup-a) - 0.64285714) + 12px);
      --_p-multi-select-option-b: calc(44.8px * (var(--_p-optgroup-a) - 0.64285714) + 12px);
    }
    [role="group"] {
      display: flex;
      flex-direction: column;
      gap: calc(11.2px * (var(--_p-optgroup-a) - 0.64285714) + 4px);
    }
    [role="presentation"] {
      padding-block: calc(11.2px * (var(--_p-optgroup-a) - 0.64285714) + 4px);
      padding-inline: calc(16.8px * (var(--_p-optgroup-a) - 0.64285714) + 6px);
      font: var(--p-font-weight-semibold) var(--p-typescale-xs) / var(--p-leading-normal) var(--p-font-porsche-next);
      color: var(--p-color-primary);
      opacity: var(--p-optgroup-opacity, 1);
    }
    @media (forced-colors: active) {
      [role="presentation"] {
        opacity: 1;
        color: var(--p-optgroup-hcm-color, var(--p-color-primary));
      }
    }
  `);

  return (
    <div role="group">
      <span id="label" role="presentation">
        {state.labelText}
      </span>
      <slot />
    </div>
  );
}
