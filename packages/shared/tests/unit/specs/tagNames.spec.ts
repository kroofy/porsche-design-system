import { TAG_NAMES } from '../../../src';

it('lists every Mitosis lite tagName', () => {
  expect(TAG_NAMES).toHaveLength(75);
  expect(TAG_NAMES).toContain('p-button');
  expect(TAG_NAMES).toContain('p-ai-tag');
  expect(TAG_NAMES).toContain('p-toast-item');
});
