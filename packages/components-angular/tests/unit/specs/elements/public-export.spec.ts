import { expect, it } from 'vitest';
import { PButton as NativePButton } from '../../../../projects/angular-wrapper/src/elements';
import { PButton as PublicPButton } from '../../../../projects/angular-wrapper/src/public-api';

it('does not replace the public CE PButton', () => {
  expect(NativePButton).not.toBe(PublicPButton);
});
