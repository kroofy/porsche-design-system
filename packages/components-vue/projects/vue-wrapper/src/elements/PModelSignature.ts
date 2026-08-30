import { defineComponent, h, type PropType } from 'vue';
import {
  type ModelSignatureColor,
  type ModelSignatureSize,
  modelSignatureAppearance,
} from '../../../../../components/src/elements/model-signature/model-signature.appearance';
import {
  DEFAULT_MODEL_SIGNATURE_MODEL,
  nativeModelSignatureUrl,
} from '../../../../../components/src/elements/model-signature/model-signature-url';

export const PModelSignature = defineComponent({
  name: 'PModelSignature',
  inheritAttrs: false,
  props: {
    model: { type: String, default: DEFAULT_MODEL_SIGNATURE_MODEL },
    size: { type: String as PropType<ModelSignatureSize>, default: undefined },
    color: { type: String as PropType<ModelSignatureColor>, default: undefined },
    safeZone: { type: Boolean, default: true },
  },
  setup(props, { attrs }) {
    return () => {
      const appearance = modelSignatureAppearance({
        model: props.model,
        size: props.size,
        color: props.color,
        safeZone: props.safeZone,
      });
      const { class: extraClass, ...rest } = attrs;

      return h('img', {
        ...rest,
        ...appearance.attrs,
        src: nativeModelSignatureUrl(props.model),
        alt: typeof rest.alt === 'string' ? rest.alt : props.model,
        class: [appearance.className, extraClass],
      });
    };
  },
});
