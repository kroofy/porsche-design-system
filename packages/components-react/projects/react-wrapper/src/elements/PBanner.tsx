import { createElement, forwardRef, type HTMLAttributes, type ReactNode, type Ref, useEffect, useRef } from 'react';
import {
  BANNER_DISMISS_CLASS,
  BANNER_DISMISS_LABEL,
  type BannerAppearanceProps,
  type BannerHeadingTag,
  bannerAppearance,
  bannerLive,
} from '../../../../../components/src/elements/banner/banner.appearance';

export type PBannerProps = BannerAppearanceProps &
  Omit<HTMLAttributes<HTMLElement>, keyof BannerAppearanceProps> & {
    heading?: string;
    headingTag?: BannerHeadingTag;
    description?: string;
    dismissButton?: boolean;
    children?: ReactNode;
  };

export const PBanner = forwardRef<HTMLElement, PBannerProps>(function PBanner(
  { state, position, heading, headingTag = 'h5', description, dismissButton = true, className, children, ...rest },
  ref
) {
  const localRef = useRef<HTMLElement | null>(null);
  const appearance = bannerAppearance({ state, position });
  const live = bannerLive(state);
  const { ['aria-label']: ariaLabel, ...attrs } = rest;

  const setRef = (node: HTMLElement | null) => {
    localRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      (ref as { current: HTMLElement | null }).current = node;
    }
  };

  useEffect(() => {
    if (!dismissButton) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && localRef.current?.matches(':popover-open')) {
        localRef.current.hidePopover();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [dismissButton]);

  return (
    <aside
      popover="manual"
      {...live}
      {...attrs}
      {...appearance.attrs}
      aria-label={ariaLabel ?? heading ?? undefined}
      ref={setRef as Ref<HTMLElement>}
      className={[appearance.className, className].filter(Boolean).join(' ')}
    >
      {heading ? createElement(headingTag, null, heading) : null}
      {description ? <p>{description}</p> : null}
      {children}
      {dismissButton ? (
        <button
          type="button"
          className={BANNER_DISMISS_CLASS}
          aria-label={BANNER_DISMISS_LABEL}
          {...(heading ? { 'aria-description': heading } : {})}
          onClick={(event) => (event.currentTarget.parentElement as HTMLElement | null)?.hidePopover()}
        >
          <span>{BANNER_DISMISS_LABEL}</span>
        </button>
      ) : null}
    </aside>
  );
});
