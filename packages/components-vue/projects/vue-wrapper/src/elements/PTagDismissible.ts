import { defineComponent, h } from 'vue';
import {
  TAG_DISMISSIBLE_CLOSE_ICON,
  TAG_DISMISSIBLE_CONTENT_CLASS,
  TAG_DISMISSIBLE_ICON_CLASS,
  TAG_DISMISSIBLE_LABEL_CLASS,
  TAG_DISMISSIBLE_SR_CLASS,
  TAG_DISMISSIBLE_SR_TEXT,
  tagDismissibleAppearance,
} from '../../../../../components/src/elements/tag-dismissible/tag-dismissible.appearance';
import { PIcon } from './PIcon';

export const PTagDismissible = defineComponent({
  name: 'PTagDismissible',
  inheritAttrs: false,
  props: {
    compact: { type: Boolean, default: false },
    label: { type: String, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const appearance = tagDismissibleAppearance({ compact: props.compact });
      const { class: extraClass, ...rest } = attrs;
      const content = [
        ...(props.label ? [h('span', { class: TAG_DISMISSIBLE_LABEL_CLASS }, props.label)] : []),
        slots.default?.(),
      ];

      return h(
        'button',
        {
          ...rest,
          ...appearance.attrs,
          type: 'button',
          class: [appearance.className, extraClass],
        },
        [
          h('span', { class: TAG_DISMISSIBLE_SR_CLASS }, TAG_DISMISSIBLE_SR_TEXT),
          h('span', { class: TAG_DISMISSIBLE_CONTENT_CLASS }, content),
          h('span', { class: TAG_DISMISSIBLE_ICON_CLASS }, [
            h(PIcon, { name: TAG_DISMISSIBLE_CLOSE_ICON, 'aria-hidden': 'true' }),
          ]),
        ]
      );
    };
  },
});
