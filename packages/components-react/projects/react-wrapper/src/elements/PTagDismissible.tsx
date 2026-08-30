import { type ButtonHTMLAttributes, forwardRef, type ReactNode, type Ref } from 'react';
import {
  TAG_DISMISSIBLE_CLOSE_ICON,
  TAG_DISMISSIBLE_CONTENT_CLASS,
  TAG_DISMISSIBLE_ICON_CLASS,
  TAG_DISMISSIBLE_LABEL_CLASS,
  TAG_DISMISSIBLE_SR_CLASS,
  TAG_DISMISSIBLE_SR_TEXT,
  type TagDismissibleAppearanceProps,
  tagDismissibleAppearance,
} from '../../../../../components/src/elements/tag-dismissible/tag-dismissible.appearance';
import { PIcon } from './PIcon';

export type PTagDismissibleProps = TagDismissibleAppearanceProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof TagDismissibleAppearanceProps | 'type'> & {
    label?: string;
    children?: ReactNode;
  };

export const PTagDismissible = forwardRef<HTMLButtonElement, PTagDismissibleProps>(function PTagDismissible(
  { compact = false, label, className, children, ...rest },
  ref
) {
  const appearance = tagDismissibleAppearance({ compact });
  const classNames = [appearance.className, className].filter(Boolean).join(' ');

  return (
    <button {...rest} {...appearance.attrs} ref={ref as Ref<HTMLButtonElement>} type="button" className={classNames}>
      <span className={TAG_DISMISSIBLE_SR_CLASS}>{TAG_DISMISSIBLE_SR_TEXT}</span>
      <span className={TAG_DISMISSIBLE_CONTENT_CLASS}>
        {label ? <span className={TAG_DISMISSIBLE_LABEL_CLASS}>{label}</span> : null}
        {children}
      </span>
      <span className={TAG_DISMISSIBLE_ICON_CLASS}>
        <PIcon name={TAG_DISMISSIBLE_CLOSE_ICON} aria-hidden="true" />
      </span>
    </button>
  );
});
