import { defineComponent, h, type PropType } from 'vue';
import type { Responsive } from '../../../../../components/src/elements/appearance';
import {
  FLYOUT_DISMISS_CLASS,
  FLYOUT_PANEL_CLASS,
  FLYOUT_SCROLLER_CLASS,
  type FlyoutBackdrop,
  type FlyoutBackground,
  type FlyoutFooterBehavior,
  type FlyoutPosition,
  flyoutAppearance,
} from '../../../../../components/src/elements/flyout/flyout.appearance';

export const PFlyout = defineComponent({
  name: 'PFlyout',
  inheritAttrs: false,
  props: {
    background: { type: String as PropType<FlyoutBackground>, default: undefined },
    backdrop: { type: String as PropType<FlyoutBackdrop>, default: undefined },
    position: { type: String as PropType<FlyoutPosition>, default: undefined },
    fullscreen: { type: [Boolean, Object] as PropType<Responsive<boolean>>, default: undefined },
    footerBehavior: { type: String as PropType<FlyoutFooterBehavior>, default: undefined },
    dismissButton: { type: Boolean, default: true },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const appearance = flyoutAppearance({
        background: props.background,
        backdrop: props.backdrop,
        position: props.position,
        fullscreen: props.fullscreen,
        footerBehavior: props.footerBehavior,
      });
      const { class: extraClass, ...rest } = attrs;

      return h(
        'dialog',
        {
          'aria-modal': 'true',
          tabindex: -1,
          ...rest,
          ...appearance.attrs,
          class: [appearance.className, extraClass],
        },
        [
          h('div', { class: FLYOUT_SCROLLER_CLASS }, [
            h('div', { class: FLYOUT_PANEL_CLASS }, [
              ...(props.dismissButton
                ? [
                    h('button', { type: 'button', class: FLYOUT_DISMISS_CLASS, 'aria-label': 'Dismiss flyout' }, [
                      h('span', 'Dismiss flyout'),
                    ]),
                  ]
                : []),
              slots.default?.(),
            ]),
          ]),
        ]
      );
    };
  },
});
