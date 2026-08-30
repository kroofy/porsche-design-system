import { defineComponent, h } from 'vue';
import { textListItemAppearance } from '../../../../../components/src/elements/text-list/text-list.appearance';

export const PTextListItem = defineComponent({
  name: 'PTextListItem',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      const appearance = textListItemAppearance();
      const { class: extraClass, ...rest } = attrs;

      return h(
        'li',
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
