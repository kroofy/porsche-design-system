import { AI_TAG_ROOT_CLASS, aiTagAppearance, aiTagLabel } from './ai-tag.appearance';

describe('aiTagAppearance()', () => {
  it('emits only the root class', () => {
    expect(aiTagAppearance()).toEqual({ className: AI_TAG_ROOT_CLASS, attrs: {} });
  });
});

describe('aiTagLabel()', () => {
  it('defaults to generated English copy', () => {
    expect(aiTagLabel()).toEqual({ kind: 'text', text: 'AI-generated' });
  });

  it('emits an abbr for the abbreviation variant', () => {
    expect(aiTagLabel('abbreviation')).toEqual({
      kind: 'abbr',
      title: 'artificial intelligence',
      text: 'AI',
    });
  });

  it('resolves locale copy', () => {
    expect(aiTagLabel('modified', 'de-DE')).toEqual({ kind: 'text', text: 'KI-modifiziert' });
    expect(aiTagLabel('abbreviation', 'de-DE')).toEqual({
      kind: 'abbr',
      title: 'künstliche Intelligenz',
      text: 'KI',
    });
  });
});
