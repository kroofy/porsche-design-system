import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-segmented-control-item' });

export default function LitSegmentedControlItem(props: {
  value?: any;
  disabled?: any;
  label?: string;
  icon?: string;
  iconSource?: string;
  selected?: any;
  compact?: any;
  disabledParent?: any;
  state?: string;
  message?: string;
}) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const isTrue = (v: any) => v === true || v === 'true' || v === '';
      const compact = isTrue(props.compact);
      const disabled = isTrue(props.disabled) || isTrue(props.disabledParent);
      const selected = isTrue(props.selected);
      const formState = props.state === 'success' || props.state === 'error' ? props.state : 'none';
      const icon = props.icon || '';
      const source = props.iconSource || '';
      const hasIcon = icon !== '' || source !== '';
      const hasSlotted = true;
      const scaling = compact ? '0.5' : '1';
      const vp = 'max(2px, var(--p-spacing-static-sm) * var(--_p-segmented-control-a, var(--p-sci-a, 1)))';
      const hp = 'calc(' + vp + ' + 4px)';
      const borders: any = {
        none: 'var(--p-color-contrast-lower)',
        success: 'var(--p-color-success)',
        error: 'var(--p-color-error)',
      };
      const borderHovers: any = {
        none: 'var(--p-color-primary)',
        success: 'var(--p-color-success)',
        error: 'var(--p-color-error)',
      };
      const backgrounds: any = {
        none: 'var(--p-color-frosted)',
        success: 'var(--p-color-success-frosted-soft)',
        error: 'var(--p-color-error-frosted-soft)',
      };
      const border = selected ? borderHovers[formState] || borderHovers.none : borders[formState] || borders.none;
      const background = selected ? 'var(--p-color-frosted-strong)' : backgrounds[formState] || backgrounds.none;
      return {
        '--p-sci-a': scaling,
        '--p-sci-radius': compact ? 'var(--p-radius-lg)' : 'var(--p-radius-xl)',
        '--p-sci-pad': hasIcon && hasSlotted ? vp + ' ' + hp + ' ' + vp + ' ' + vp : vp + ' ' + hp,
        '--p-sci-border': border,
        '--p-sci-bg': background,
        '--p-sci-hover-bg': !disabled && !selected ? 'var(--p-color-frosted-strong)' : background,
        '--p-sci-cursor': disabled ? 'not-allowed' : 'pointer',
        '--p-sci-opacity': disabled ? '0.4' : '',
        '--p-sci-span': selected ? 'var(--p-color-contrast-high)' : 'var(--p-color-contrast-medium)',
        '--p-sci-icon-me': hasIcon && hasSlotted ? '0.25rem' : '0',
        '--p-sci-icon-display': hasIcon ? '' : 'none',
        '--p-sci-fc-opacity': disabled ? '1' : '',
        '--p-sci-fc-color': disabled ? 'GrayText' : '',
        '--p-sci-fc-border': disabled ? 'GrayText' : '',
        '--p-sci-hover-transition': !disabled && !selected
          ? 'background-color var(--p-transition-duration, var(--p-duration-sm)) var(--p-ease-in-out)'
          : '',
      };
    },
    get labelText(): string {
      return props.label || '';
    },
    get iconName(): string {
      return props.icon || '';
    },
    get iconSrc(): string {
      return props.iconSource || '';
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
  });

  useStyle(`
    :host {
      display: block;
      opacity: var(--p-sci-opacity);
    }
    :host([hidden]) {
      display: none !important;
    }
    :not(:defined, [data-ssr]) {
      visibility: hidden;
    }
    button {
      position: relative;
      display: block;
      height: 100%;
      width: 100%;
      min-height: calc(max(var(--p-leading-normal), var(--_p-segmented-control-a, var(--p-sci-a, 1)) * (var(--p-leading-normal) + 10px)) + (max(2px, var(--p-spacing-static-sm) * var(--_p-segmented-control-a, var(--p-sci-a, 1))) + 1px) * 2);
      min-width: calc(max(var(--p-leading-normal), var(--_p-segmented-control-a, var(--p-sci-a, 1)) * (var(--p-leading-normal) + 10px)) + (max(2px, var(--p-spacing-static-sm) * var(--_p-segmented-control-a, var(--p-sci-a, 1))) + 1px) * 2);
      padding: var(--p-sci-pad);
      border: 1px solid var(--p-sci-border);
      border-radius: var(--p-sci-radius);
      background: var(--p-sci-bg);
      color: var(--p-color-primary);
      font: normal normal 400 1rem/calc(6px + 2.125ex) 'Porsche Next', 'Arial Narrow', Arial, 'Heiti SC', SimHei, sans-serif;
      cursor: var(--p-sci-cursor, pointer);
      transition: var(--p-sci-hover-transition);
    }
    button:focus-visible {
      outline: 2px solid var(--p-color-focus);
      outline-offset: 2px;
    }
    span {
      display: block;
      font: normal normal 400 .875rem/calc(6px + 2.125ex) 'Porsche Next', 'Arial Narrow', Arial, 'Heiti SC', SimHei, sans-serif;
      overflow-wrap: normal;
      color: var(--p-sci-span);
    }
    .icon {
      display: var(--p-sci-icon-display);
      height: 1.5rem;
      width: 1.5rem;
      margin-inline-end: var(--p-sci-icon-me);
    }
    @media (forced-colors: active) {
      :host {
        opacity: var(--p-sci-fc-opacity, var(--p-sci-opacity, 1));
        color: var(--p-sci-fc-color);
      }
      button {
        color: var(--p-sci-fc-color, var(--p-color-primary));
        border-color: var(--p-sci-fc-border, var(--p-sci-border));
      }
      button:focus-visible {
        outline-color: Highlight;
      }
      span {
        color: var(--p-sci-fc-color, var(--p-sci-span));
      }
    }
    @media (hover: hover) {
      button:hover {
        background-color: var(--p-sci-hover-bg, var(--p-sci-bg));
      }
    }
  `);

  return (
    <button type="button">
      <span>{state.labelText}</span>
      <p-icon class="icon" name={state.iconName} source={state.iconSrc} color="inherit" size="inherit" aria-hidden="true" />
      <slot />
    </button>
  );
}
