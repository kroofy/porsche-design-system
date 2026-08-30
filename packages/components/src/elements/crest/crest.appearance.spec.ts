import { CREST_ROOT_CLASS, crestAppearance } from './crest.appearance';

describe('crestAppearance()', () => {
  it('emits only the root class', () => {
    expect(crestAppearance()).toEqual({ className: CREST_ROOT_CLASS, attrs: {} });
  });
});
