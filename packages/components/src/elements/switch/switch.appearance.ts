import { type NativeAppearance, type Responsive, serializeResponsive } from '../appearance';

export const SWITCH_ROOT_CLASS = 'p-switch' as const;
export const SWITCH_TOGGLE_CLASS = 'p-switch__toggle' as const;
export const SWITCH_KNOB_CLASS = 'p-switch__knob' as const;
export const SWITCH_LABEL_CLASS = 'p-switch__label' as const;
export const SWITCH_SPINNER_CLASS = 'p-switch__spinner' as const;

export const SWITCH_ALIGN_LABELS = ['start', 'end'] as const;
export type SwitchAlignLabel = (typeof SWITCH_ALIGN_LABELS)[number];

export type SwitchAppearanceProps = {
  alignLabel?: Responsive<SwitchAlignLabel>;
  hideLabel?: Responsive<boolean>;
  stretch?: Responsive<boolean>;
  compact?: Responsive<boolean>;
  loading?: boolean;
};

const DEFAULT_ALIGN: SwitchAlignLabel = 'end';

export const switchAppearance = (props: SwitchAppearanceProps = {}): NativeAppearance => {
  const { alignLabel, hideLabel, stretch, compact, loading = false } = props;
  return {
    className: SWITCH_ROOT_CLASS,
    attrs: {
      ...serializeResponsive('align-label', alignLabel, DEFAULT_ALIGN),
      ...serializeResponsive('hide-label', hideLabel, false),
      ...serializeResponsive('stretch', stretch, false),
      ...serializeResponsive('compact', compact, false),
      ...(loading ? { 'data-p-loading': 'true' } : {}),
    },
  };
};
