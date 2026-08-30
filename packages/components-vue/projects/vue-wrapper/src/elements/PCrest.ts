import { defineComponent, h } from 'vue';
import { crestAppearance } from '../../../../../components/src/elements/crest/crest.appearance';
import {
  CREST_HEIGHT,
  CREST_WIDTH,
  nativeCrestImgSrc,
  nativeCrestSrcSet,
} from '../../../../../components/src/elements/crest/crest-url';

const crestSources = () => [
  h('source', { srcset: nativeCrestSrcSet('webp'), type: 'image/webp' }),
  h('source', { srcset: nativeCrestSrcSet('png'), type: 'image/png' }),
  h('img', { src: nativeCrestImgSrc(), width: CREST_WIDTH, height: CREST_HEIGHT, alt: 'Porsche' }),
];

export const PCrest = defineComponent({
  name: 'PCrest',
  inheritAttrs: false,
  props: {
    href: { type: String, default: undefined },
    target: { type: String, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const appearance = crestAppearance();
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
          [h('picture', {}, crestSources()), slots.default?.()]
        );
      }

      return h(
        'picture',
        {
          ...rest,
          ...appearance.attrs,
          class: className,
        },
        [...crestSources(), slots.default?.()]
      );
    };
  },
});
