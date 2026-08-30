import { defineComponent, h } from 'vue';
import { optgroupAppearance } from '../../../../../components/src/elements/input/input.appearance';

export const POptgroup = defineComponent({
  name: 'POptgroup',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      const appearance = optgroupAppearance();
      const { class: extraClass, ...rest } = attrs;

      return h(
        'optgroup',
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
