import { defineComponent, h, type PropType } from 'vue';
import type { Responsive } from '../../../../../components/src/elements/appearance';
import { type FieldState, radioAppearance } from '../../../../../components/src/elements/input/input.appearance';

export const PRadio = defineComponent({
  name: 'PRadio',
  inheritAttrs: false,
  props: {
    compact: { type: [Boolean, Object] as PropType<Responsive<boolean>>, default: undefined },
    state: { type: String as PropType<FieldState>, default: undefined },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  setup(props, { attrs }) {
    return () => {
      const appearance = radioAppearance({
        compact: props.compact,
        state: props.state,
        loading: props.loading,
      });
      const { class: extraClass, ...rest } = attrs;

      return h('input', {
        ...rest,
        ...appearance.attrs,
        type: 'radio',
        disabled: Boolean(props.disabled || props.loading),
        'aria-busy': props.loading || undefined,
        class: [appearance.className, extraClass],
      });
    };
  },
});
