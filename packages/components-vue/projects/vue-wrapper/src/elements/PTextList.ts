import { defineComponent, h, type PropType } from 'vue';
import {
  type TextListType,
  textListAppearance,
  textListTagForType,
} from '../../../../../components/src/elements/text-list/text-list.appearance';

export const PTextList = defineComponent({
  name: 'PTextList',
  inheritAttrs: false,
  props: {
    type: { type: String as PropType<TextListType>, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const appearance = textListAppearance({ type: props.type });
      const { class: extraClass, ...rest } = attrs;

      return h(
        textListTagForType(props.type),
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
