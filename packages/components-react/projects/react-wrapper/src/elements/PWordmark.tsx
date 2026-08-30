import { createElement, forwardRef, type HTMLAttributes, type ReactNode, type Ref, type SVGAttributes } from 'react';
import {
  type WordmarkAppearanceProps,
  wordmarkAppearance,
} from '../../../../../components/src/elements/wordmark/wordmark.appearance';
import {
  WORDMARK_PATH,
  WORDMARK_TITLE,
  WORDMARK_VIEWBOX,
} from '../../../../../components/src/elements/wordmark/wordmark-svg';

const WordmarkGlyph = ({ className }: { className?: string }) =>
  createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: WORDMARK_VIEWBOX,
      className,
    },
    createElement('title', null, WORDMARK_TITLE),
    createElement('path', { d: WORDMARK_PATH })
  );

export type PWordmarkProps = WordmarkAppearanceProps &
  Omit<HTMLAttributes<HTMLElement> & SVGAttributes<SVGSVGElement>, keyof WordmarkAppearanceProps> & {
    href?: string;
    target?: string;
    children?: ReactNode;
  };

export const PWordmark = forwardRef<HTMLElement, PWordmarkProps>(function PWordmark(
  { size, href, target, className, children, ...rest },
  ref
) {
  const appearance = wordmarkAppearance({ size });
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
        <WordmarkGlyph />
        {children}
      </a>
    );
  }

  return (
    <svg
      {...rest}
      {...appearance.attrs}
      ref={ref as Ref<SVGSVGElement>}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={WORDMARK_VIEWBOX}
      className={classNames}
    >
      <title>{WORDMARK_TITLE}</title>
      <path d={WORDMARK_PATH} />
      {children}
    </svg>
  );
});
