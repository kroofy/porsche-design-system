import type { NativeAppearance } from '../appearance';

export const WORDMARK_ROOT_CLASS = 'p-wordmark' as const;

export const WORDMARK_SIZES = ['small', 'inherit'] as const;
export type WordmarkSize = (typeof WORDMARK_SIZES)[number];

export type WordmarkAppearanceProps = {
  size?: WordmarkSize;
};

const DEFAULT_SIZE: WordmarkSize = 'small';

export const wordmarkAppearance = (props: WordmarkAppearanceProps = {}): NativeAppearance => {
  const { size = DEFAULT_SIZE } = props;
  return {
    className: WORDMARK_ROOT_CLASS,
    attrs: {
      ...(size !== DEFAULT_SIZE ? { 'data-p-size': size } : {}),
    },
  };
};
