import type { NativeAppearance } from '../appearance';

export const CREST_ROOT_CLASS = 'p-crest' as const;

export const crestAppearance = (): NativeAppearance => ({
  className: CREST_ROOT_CLASS,
  attrs: {},
});
