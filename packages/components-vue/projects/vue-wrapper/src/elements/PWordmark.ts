import { defineComponent, h, type PropType } from 'vue';
import {
  type WordmarkSize,
  wordmarkAppearance,
} from '../../../../../components/src/elements/wordmark/wordmark.appearance';
import {
  WORDMARK_PATH,
  WORDMARK_TITLE,
  WORDMARK_VIEWBOX,
} from '../../../../../components/src/elements/wordmark/wordmark-svg';

const wordmarkGlyph = (className?: unknown) =>
  h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: WORDMARK_VIEWBOX, class: className }, [
    h('title', WORDMARK_TITLE),
    h('path', { d: WORDMARK_PATH }),
  ]);

export const PWordmark = defineComponent({
  name: 'PWordmark',
  inheritAttrs: false,
  props: {
    size: { type: String as PropType<WordmarkSize>, default: undefined },
    href: { type: String, default: undefined },
    target: { type: String, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const appearance = wordmarkAppearance({ size: props.size });
      const { class: extraClass, ...rest } = attrs;
      const className = [appearance.className, extraClass];

      if (props.href !== undefined) {
        return h(
          'a',
          {
            ...rest,
            ...appearance.attrs,
            href: props.href,
            target: props.target,
            class: className,
          },
          [wordmarkGlyph(), slots.default?.()]
        );
      }

      return h(
        'svg',
        {
          ...rest,
          ...appearance.attrs,
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: WORDMARK_VIEWBOX,
          class: className,
        },
        [h('title', WORDMARK_TITLE), h('path', { d: WORDMARK_PATH }), slots.default?.()]
      );
    };
  },
});
