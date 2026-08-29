import * as path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    root: path.resolve(__dirname, '../../../'),
    environment: 'jsdom',
    include: ['**/tests/unit/specs/elements/**/*.spec.ts'],
  },
});
