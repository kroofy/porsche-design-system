import { defineComponent, h, type PropType } from 'vue';
import type { Responsive } from '../../../../../components/src/elements/appearance';
import { type FieldState, selectAppearance } from '../../../../../components/src/elements/input';

export const PSelect = defineComponent({
  name: 'PSelect',
  inheritAttrs: false,
  props: {
    compact: { type: [Boolean, Object] as PropType<Responsive<boolean>>, default: undefined },
    state: { type: String as PropType<FieldState>, default: undefined },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const appearance = selectAppearance({
        compact: props.compact,
        state: props.state,
        loading: props.loading,
      });
      const { class: extraClass, ...rest } = attrs;
      const children = slots.default?.();

      return h(
        'select',
        {
          ...rest,
          ...appearance.attrs,
          disabled: Boolean(props.disabled || props.loading),
          'aria-busy': props.loading || undefined,
          class: [appearance.className, extraClass],
        },
        children
      );
    };
  },
});
