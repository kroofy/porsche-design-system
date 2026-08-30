import { defineComponent, h, type PropType } from 'vue';
import type { Responsive } from '../../../../../components/src/elements/appearance';
import {
  type DividerColor,
  type DividerDirection,
  dividerAppearance,
} from '../../../../../components/src/elements/divider/divider.appearance';

export const PDivider = defineComponent({
  name: 'PDivider',
  inheritAttrs: false,
  props: {
    color: { type: String as PropType<DividerColor>, default: undefined },
    direction: { type: [String, Object] as PropType<Responsive<DividerDirection>>, default: undefined },
  },
  setup(props, { attrs }) {
    return () => {
      const appearance = dividerAppearance({ color: props.color, direction: props.direction });
      const { class: extraClass, ...rest } = attrs;

      return h('hr', {
        ...rest,
        ...appearance.attrs,
        class: [appearance.className, extraClass],
      });
    };
  },
});
