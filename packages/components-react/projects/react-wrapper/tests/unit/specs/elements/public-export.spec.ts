import { expect, it } from 'vitest';
import { PButton as NativePButton } from '../../../../src/elements';
import { PButton as PublicPButton } from '../../../../src/public-api';

it('does not replace the public CE PButton', () => {
  expect(NativePButton).not.toBe(PublicPButton);
});
