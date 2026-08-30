import { defineComponent, h, type PropType } from 'vue';
import {
  INLINE_NOTIFICATION_ACTION_CLASS,
  INLINE_NOTIFICATION_DISMISS_CLASS,
  INLINE_NOTIFICATION_DISMISS_LABEL,
  type InlineNotificationHeadingTag,
  type InlineNotificationState,
  inlineNotificationAppearance,
  inlineNotificationLive,
} from '../../../../../components/src/elements/inline-notification/inline-notification.appearance';
import { PButtonPure } from './PButtonPure';

export const PInlineNotification = defineComponent({
  name: 'PInlineNotification',
  inheritAttrs: false,
  props: {
    state: { type: String as PropType<InlineNotificationState>, default: undefined },
    heading: { type: String, default: undefined },
    headingTag: { type: String as PropType<InlineNotificationHeadingTag>, default: 'h5' },
    description: { type: String, default: undefined },
    dismissButton: { type: Boolean, default: true },
    actionLabel: { type: String, default: undefined },
    actionLoading: { type: Boolean, default: false },
    actionIcon: { type: String, default: 'arrow-right' },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const appearance = inlineNotificationAppearance({ state: props.state });
      const live = inlineNotificationLive(props.state);
      const { class: extraClass, 'aria-label': ariaLabel, ...rest } = attrs;

      return h(
        'aside',
        {
          ...live,
          ...rest,
          ...appearance.attrs,
          'aria-label': (ariaLabel as string | undefined) ?? props.heading,
          class: [appearance.className, extraClass],
        },
        [
          props.heading ? h(props.headingTag, props.heading) : null,
          props.description ? h('p', props.description) : null,
          slots.default?.(),
          props.actionLabel
            ? h(
                PButtonPure,
                {
                  class: INLINE_NOTIFICATION_ACTION_CLASS,
                  type: 'button',
                  icon: props.actionIcon,
                  loading: props.actionLoading,
                },
                () => props.actionLabel
              )
            : null,
          props.dismissButton
            ? h(
                'button',
                {
                  type: 'button',
                  class: INLINE_NOTIFICATION_DISMISS_CLASS,
                  'aria-label': INLINE_NOTIFICATION_DISMISS_LABEL,
                  ...(props.heading ? { 'aria-description': props.heading } : {}),
                },
                [h('span', INLINE_NOTIFICATION_DISMISS_LABEL)]
              )
            : null,
        ]
      );
    };
  },
});
