import { defineComponent, h, type PropType } from 'vue';
import type { Responsive } from '../../../../../components/src/elements/appearance';
import { type FlagSize, flagAppearance } from '../../../../../components/src/elements/flag/flag.appearance';
import { DEFAULT_FLAG_NAME, nativeFlagUrl } from '../../../../../components/src/elements/flag/flag-url';

export const PFlag = defineComponent({
  name: 'PFlag',
  inheritAttrs: false,
  props: {
    name: { type: String, default: DEFAULT_FLAG_NAME },
    size: { type: [String, Object] as PropType<Responsive<FlagSize>>, default: undefined },
  },
  setup(props, { attrs }) {
    return () => {
      const appearance = flagAppearance({ size: props.size });
      const { class: extraClass, ...rest } = attrs;

      return h('img', {
        ...rest,
        ...appearance.attrs,
        src: nativeFlagUrl(props.name),
        alt: typeof rest.alt === 'string' ? rest.alt : '',
        width: 24,
        height: 24,
        loading: 'lazy',
        class: [appearance.className, extraClass],
      });
    };
  },
});
