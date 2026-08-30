import { forwardRef, type HTMLAttributes, type ReactNode, type Ref } from 'react';
import {
  TAG_ICON_CLASS,
  type TagAppearanceProps,
  tagAppearance,
} from '../../../../../components/src/elements/tag/tag.appearance';
import { PIcon } from './PIcon';

export type PTagProps = TagAppearanceProps &
  Omit<HTMLAttributes<HTMLElement>, keyof TagAppearanceProps | 'href'> & {
    href?: string;
    target?: string;
    type?: 'button' | 'submit' | 'reset';
    icon?: string | 'none';
    iconSource?: string;
    children?: ReactNode;
  };

export const PTag = forwardRef<HTMLElement, PTagProps>(function PTag(
  { variant, compact = false, href, target, type, icon = 'none', iconSource, className, children, ...rest },
  ref
) {
  const appearance = tagAppearance({ variant, compact });
  const classNames = [appearance.className, className].filter(Boolean).join(' ');
  const hasIcon = icon !== 'none' || !!iconSource;
  const content = (
    <>
      {hasIcon && (
        <PIcon
          className={TAG_ICON_CLASS}
          name={icon === 'none' ? undefined : icon}
          source={iconSource}
          size="xs"
          color="inherit"
          aria-hidden="true"
        />
      )}
      {children}
    </>
  );

  if (href !== undefined) {
    return (
      <a
        {...rest}
        {...appearance.attrs}
        ref={ref as Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        className={classNames}
      >
        {content}
      </a>
    );
  }

  if (type !== undefined) {
    return (
      <button {...rest} {...appearance.attrs} ref={ref as Ref<HTMLButtonElement>} type={type} className={classNames}>
        {content}
      </button>
    );
  }

  return (
    <span {...rest} {...appearance.attrs} ref={ref} className={classNames}>
      {content}
    </span>
  );
});
