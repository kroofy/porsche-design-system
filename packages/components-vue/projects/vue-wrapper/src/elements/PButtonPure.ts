import { defineComponent, h, type PropType } from 'vue';
import type { Responsive } from '../../../../../components/src/elements/appearance';
import {
  BUTTON_PURE_ICON_CLASS,
  BUTTON_PURE_LABEL_CLASS,
  BUTTON_PURE_SPINNER_CLASS,
  type ButtonPureAlignLabel,
  type ButtonPureColor,
  type ButtonPureSize,
  buttonPureAppearance,
} from '../../../../../components/src/elements/button-pure/button-pure.appearance';
import { PIcon } from './PIcon';

export const PButtonPure = defineComponent({
  name: 'PButtonPure',
  inheritAttrs: false,
  props: {
    size: { type: [String, Object] as PropType<Responsive<ButtonPureSize>>, default: undefined },
    color: { type: String as PropType<ButtonPureColor>, default: undefined },
    icon: { type: String, default: 'arrow-right' },
    iconSource: { type: String, default: undefined },
    hideLabel: { type: [Boolean, Object] as PropType<Responsive<boolean>>, default: undefined },
    alignLabel: { type: [String, Object] as PropType<Responsive<ButtonPureAlignLabel>>, default: undefined },
    stretch: { type: [Boolean, Object] as PropType<Responsive<boolean>>, default: undefined },
    underline: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    type: { type: String as PropType<'button' | 'submit' | 'reset'>, default: 'submit' },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const appearance = buttonPureAppearance({
        size: props.size,
        color: props.color,
        icon: props.icon,
        hideLabel: props.hideLabel,
        alignLabel: props.alignLabel,
        stretch: props.stretch,
        underline: props.underline,
        active: props.active,
        loading: props.loading,
      });
      const { class: extraClass, ...rest } = attrs;
      const showIcon = props.icon !== 'none' || Boolean(props.iconSource);

      return h(
        'button',
        {
          ...rest,
          ...appearance.attrs,
          type: props.type,
          disabled: Boolean(props.disabled || props.loading),
          'aria-busy': props.loading || undefined,
          class: [appearance.className, extraClass],
        },
        [
          ...(props.loading
            ? [
                h('span', { class: BUTTON_PURE_SPINNER_CLASS, 'aria-hidden': 'true' }, [
                  h(
                    'svg',
                    {
                      viewBox: '-16 -16 32 32',
                      width: '100%',
                      height: '100%',
                      focusable: 'false',
                      'aria-hidden': 'true',
                    },
                    [h('circle', { r: '11' }), h('circle', { r: '11' })]
                  ),
                ]),
              ]
            : showIcon
              ? [
                  h(PIcon, {
                    class: BUTTON_PURE_ICON_CLASS,
                    name: props.icon === 'none' ? 'arrow-right' : props.icon,
                    source: props.iconSource,
                    size: 'inherit',
                    color: 'inherit',
                    'aria-hidden': 'true',
                  }),
                ]
              : []),
          h('span', { class: BUTTON_PURE_LABEL_CLASS }, slots.default?.()),
        ]
      );
    };
  },
});
