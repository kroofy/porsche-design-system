import { defineComponent, h, type PropType } from 'vue';
import type { Responsive } from '../../../../../components/src/elements/appearance';
import {
  type DisplayAlign,
  type DisplayColor,
  type DisplaySize,
  type DisplayTag,
  displayAppearance,
  displayTagForSize,
} from '../../../../../components/src/elements/display/display.appearance';

export const PDisplay = defineComponent({
  name: 'PDisplay',
  inheritAttrs: false,
  props: {
    size: { type: [String, Object] as PropType<Responsive<DisplaySize>>, default: undefined },
    align: { type: String as PropType<DisplayAlign>, default: undefined },
    color: { type: String as PropType<DisplayColor>, default: undefined },
    ellipsis: { type: Boolean, default: false },
    tag: { type: String as PropType<DisplayTag>, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const appearance = displayAppearance({
        size: props.size,
        align: props.align,
        color: props.color,
        ellipsis: props.ellipsis,
      });
      const { class: extraClass, ...rest } = attrs;

      return h(
        displayTagForSize(props.size, props.tag),
        {
          ...rest,
          ...appearance.attrs,
          class: [appearance.className, extraClass],
        },
        slots.default?.()
      );
    };
  },
});
