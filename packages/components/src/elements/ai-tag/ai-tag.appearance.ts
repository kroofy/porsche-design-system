import { type AiTagLocale, type AiTagVariant, getAiTagTranslation } from '../../components/ai-tag/ai-tag-utils';
import type { NativeAppearance } from '../appearance';

export { AI_TAG_VARIANTS, type AiTagLocale, type AiTagVariant } from '../../components/ai-tag/ai-tag-utils';

export const AI_TAG_ROOT_CLASS = 'p-ai-tag' as const;

export type AiTagAppearanceProps = {
  locale?: AiTagLocale | string;
  variant?: AiTagVariant;
};

const DEFAULT_VARIANT: AiTagVariant = 'generated';
const DEFAULT_LOCALE = 'en-US';

export const aiTagAppearance = (): NativeAppearance => ({
  className: AI_TAG_ROOT_CLASS,
  attrs: {},
});

export type AiTagLabel = { kind: 'abbr'; title: string; text: string } | { kind: 'text'; text: string };

export const aiTagLabel = (variant: AiTagVariant = DEFAULT_VARIANT, locale: string = DEFAULT_LOCALE): AiTagLabel => {
  const copy = getAiTagTranslation(locale);
  if (variant === 'abbreviation') {
    return { kind: 'abbr', title: copy.long, text: copy.short };
  }
  return { kind: 'text', text: variant === 'modified' ? copy.modified : copy.generated };
};
