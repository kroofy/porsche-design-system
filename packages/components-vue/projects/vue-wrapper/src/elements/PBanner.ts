import { defineComponent, h, onBeforeUnmount, onMounted, type PropType, type Ref, ref } from 'vue';
import type { Responsive } from '../../../../../components/src/elements/appearance';
import {
  BANNER_DISMISS_CLASS,
  BANNER_DISMISS_LABEL,
  type BannerHeadingTag,
  type BannerPosition,
  type BannerState,
  bannerAppearance,
  bannerLive,
} from '../../../../../components/src/elements/banner/banner.appearance';

export const PBanner = defineComponent({
  name: 'PBanner',
  inheritAttrs: false,
  props: {
    state: { type: String as PropType<BannerState>, default: undefined },
    position: { type: [String, Object] as PropType<Responsive<BannerPosition>>, default: undefined },
    heading: { type: String, default: undefined },
    headingTag: { type: String as PropType<BannerHeadingTag>, default: 'h5' },
    description: { type: String, default: undefined },
    dismissButton: { type: Boolean, default: true },
  },
  setup(props, { attrs, slots }) {
    const root = ref<HTMLElement | null>(null);
    const onKey = (event: KeyboardEvent) => {
      if (props.dismissButton && event.key === 'Escape' && root.value?.matches(':popover-open')) {
        root.value.hidePopover();
      }
    };
    onMounted(() => document.addEventListener('keydown', onKey));
    onBeforeUnmount(() => document.removeEventListener('keydown', onKey));

    return () => {
      const appearance = bannerAppearance({ state: props.state, position: props.position });
      const live = bannerLive(props.state);
      const { class: extraClass, 'aria-label': ariaLabel, ...rest } = attrs;

      return h(
        'aside',
        {
          popover: 'manual',
          ...live,
          ...rest,
          ...appearance.attrs,
          'aria-label': (ariaLabel as string | undefined) ?? props.heading,
          class: [appearance.className, extraClass],
          ref: root as Ref<HTMLElement | null>,
        },
        [
          ...(props.heading ? [h(props.headingTag, props.heading)] : []),
          ...(props.description ? [h('p', props.description)] : []),
          slots.default?.(),
          ...(props.dismissButton
            ? [
                h(
                  'button',
                  {
                    type: 'button',
                    class: BANNER_DISMISS_CLASS,
                    'aria-label': BANNER_DISMISS_LABEL,
                    ...(props.heading ? { 'aria-description': props.heading } : {}),
                    onClick: (event: Event) => (event.currentTarget as HTMLElement).parentElement?.hidePopover(),
                  },
                  [h('span', BANNER_DISMISS_LABEL)]
                ),
              ]
            : []),
        ]
      );
    };
  },
});
