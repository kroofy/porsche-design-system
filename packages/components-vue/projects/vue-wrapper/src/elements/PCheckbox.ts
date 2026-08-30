import { defineComponent, h, type PropType } from 'vue';
import type { Responsive } from '../../../../../components/src/elements/appearance';
import { type FieldState, checkboxAppearance } from '../../../../../components/src/elements/input/input.appearance';

export const PCheckbox = defineComponent({
  name: 'PCheckbox',
  inheritAttrs: false,
  props: {
    compact: { type: [Boolean, Object] as PropType<Responsive<boolean>>, default: undefined },
    state: { type: String as PropType<FieldState>, default: undefined },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    indeterminate: { type: Boolean, default: false },
  },
  setup(props, { attrs }) {
    return () => {
      const appearance = checkboxAppearance({
        compact: props.compact,
        state: props.state,
        loading: props.loading,
        indeterminate: props.indeterminate,
      });
      const { class: extraClass, ...rest } = attrs;

      return h('input', {
        ...rest,
        ...appearance.attrs,
        type: 'checkbox',
        disabled: Boolean(props.disabled || props.loading),
        'aria-busy': props.loading || undefined,
        indeterminate: props.indeterminate,
        class: [appearance.className, extraClass],
      });
    };
  },
});
