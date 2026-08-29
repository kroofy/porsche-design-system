import { defineComponent, h, type PropType } from 'vue';
import type { Responsive } from '../../../../../components/src/elements/appearance';
import { type FieldState, inputAppearance } from '../../../../../components/src/elements/input';

export const PInputText = defineComponent({
  name: 'PInputText',
  inheritAttrs: false,
  props: {
    compact: { type: [Boolean, Object] as PropType<Responsive<boolean>>, default: undefined },
    state: { type: String as PropType<FieldState>, default: undefined },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    type: { type: String as PropType<'text'>, default: 'text' },
  },
  setup(props, { attrs }) {
    return () => {
      const appearance = inputAppearance({
        compact: props.compact,
        state: props.state,
        loading: props.loading,
      });
      const { class: extraClass, ...rest } = attrs;

      return h('input', {
        ...rest,
        ...appearance.attrs,
        type: props.type,
        disabled: Boolean(props.disabled || props.loading),
        'aria-busy': props.loading || undefined,
        dir: 'auto',
        class: [appearance.className, extraClass],
      });
    };
  },
});
