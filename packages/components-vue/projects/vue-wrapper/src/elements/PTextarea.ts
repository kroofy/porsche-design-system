import { defineComponent, h, type PropType } from 'vue';
import type { Responsive } from '../../../../../components/src/elements/appearance';
import { type FieldState, textareaAppearance } from '../../../../../components/src/elements/input';

export const PTextarea = defineComponent({
  name: 'PTextarea',
  inheritAttrs: false,
  props: {
    compact: { type: [Boolean, Object] as PropType<Responsive<boolean>>, default: undefined },
    state: { type: String as PropType<FieldState>, default: undefined },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  setup(props, { attrs }) {
    return () => {
      const appearance = textareaAppearance({
        compact: props.compact,
        state: props.state,
        loading: props.loading,
      });
      const { class: extraClass, ...rest } = attrs;

      return h('textarea', {
        ...rest,
        ...appearance.attrs,
        disabled: Boolean(props.disabled || props.loading),
        'aria-busy': props.loading || undefined,
        dir: 'auto',
        class: [appearance.className, extraClass],
      });
    };
  },
});
