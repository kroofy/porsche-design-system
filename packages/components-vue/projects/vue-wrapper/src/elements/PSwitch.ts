import { defineComponent, h, type PropType } from 'vue';
import type { Responsive } from '../../../../../components/src/elements/appearance';
import {
  SWITCH_KNOB_CLASS,
  SWITCH_LABEL_CLASS,
  SWITCH_SPINNER_CLASS,
  SWITCH_TOGGLE_CLASS,
  type SwitchAlignLabel,
  switchAppearance,
} from '../../../../../components/src/elements/switch/switch.appearance';
import { PSpinner } from './PSpinner';

export const PSwitch = defineComponent({
  name: 'PSwitch',
  inheritAttrs: false,
  props: {
    alignLabel: { type: [String, Object] as PropType<Responsive<SwitchAlignLabel>>, default: undefined },
    hideLabel: { type: [Boolean, Object] as PropType<Responsive<boolean>>, default: undefined },
    stretch: { type: [Boolean, Object] as PropType<Responsive<boolean>>, default: undefined },
    compact: { type: [Boolean, Object] as PropType<Responsive<boolean>>, default: undefined },
    loading: { type: Boolean, default: false },
    checked: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const appearance = switchAppearance({
        alignLabel: props.alignLabel,
        hideLabel: props.hideLabel,
        stretch: props.stretch,
        compact: props.compact,
        loading: props.loading,
      });
      const { class: extraClass, ...rest } = attrs;

      return h(
        'button',
        {
          ...rest,
          ...appearance.attrs,
          type: 'button',
          role: 'switch',
          disabled: Boolean(props.disabled || props.loading),
          'aria-checked': props.checked ? 'true' : 'false',
          'aria-busy': props.loading || undefined,
          class: [appearance.className, extraClass],
        },
        [
          h('span', { class: SWITCH_TOGGLE_CLASS }, [
            h('span', { class: SWITCH_KNOB_CLASS }, [
              ...(props.loading
                ? [h(PSpinner, { class: SWITCH_SPINNER_CLASS, 'aria-hidden': 'true', role: 'presentation' })]
                : []),
            ]),
          ]),
          h('span', { class: SWITCH_LABEL_CLASS }, slots.default?.()),
        ]
      );
    };
  },
});
