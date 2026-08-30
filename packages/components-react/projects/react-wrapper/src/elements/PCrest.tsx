import { forwardRef, type HTMLAttributes, type ReactNode, type Ref } from 'react';
import { crestAppearance } from '../../../../../components/src/elements/crest/crest.appearance';
import {
  CREST_HEIGHT,
  CREST_WIDTH,
  nativeCrestImgSrc,
  nativeCrestSrcSet,
} from '../../../../../components/src/elements/crest/crest-url';

const CrestPicture = ({ children }: { children?: ReactNode }) => (
  <picture>
    <source srcSet={nativeCrestSrcSet('webp')} type="image/webp" />
    <source srcSet={nativeCrestSrcSet('png')} type="image/png" />
    <img src={nativeCrestImgSrc()} width={CREST_WIDTH} height={CREST_HEIGHT} alt="Porsche" />
    {children}
  </picture>
);

export type PCrestProps = Omit<HTMLAttributes<HTMLElement>, 'href'> & {
  href?: string;
  target?: string;
};

export const PCrest = forwardRef<HTMLElement, PCrestProps>(function PCrest(
  { href, target, className, children, ...rest },
  ref
) {
  const appearance = crestAppearance();
  const classNames = [appearance.className, className].filter(Boolean).join(' ');

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
        <CrestPicture />
        {children}
      </a>
    );
  }

  return (
    <picture {...rest} {...appearance.attrs} ref={ref as Ref<HTMLPictureElement>} className={classNames}>
      <source srcSet={nativeCrestSrcSet('webp')} type="image/webp" />
      <source srcSet={nativeCrestSrcSet('png')} type="image/png" />
      <img src={nativeCrestImgSrc()} width={CREST_WIDTH} height={CREST_HEIGHT} alt="Porsche" />
      {children}
    </picture>
  );
});
