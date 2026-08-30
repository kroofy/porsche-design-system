import { forwardRef, type HTMLAttributes } from 'react';
import {
  type AiTagAppearanceProps,
  aiTagAppearance,
  aiTagLabel,
} from '../../../../../components/src/elements/ai-tag/ai-tag.appearance';

export type PAiTagProps = AiTagAppearanceProps & Omit<HTMLAttributes<HTMLSpanElement>, keyof AiTagAppearanceProps>;

export const PAiTag = forwardRef<HTMLSpanElement, PAiTagProps>(function PAiTag(
  { locale, variant, className, children, ...rest },
  ref
) {
  const appearance = aiTagAppearance();
  const label = aiTagLabel(variant, locale);

  return (
    <span
      {...rest}
      {...appearance.attrs}
      ref={ref}
      className={[appearance.className, className].filter(Boolean).join(' ')}
    >
      {children ?? (label.kind === 'abbr' ? <abbr title={label.title}>{label.text}</abbr> : label.text)}
    </span>
  );
});
