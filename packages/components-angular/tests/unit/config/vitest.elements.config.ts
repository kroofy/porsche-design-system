import * as path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    root: path.resolve(__dirname, '../../..'),
    environment: 'jsdom',
    setupFiles: ['tests/unit/config/vitest.elements.setup.ts'],
    include: ['tests/unit/specs/elements/**/*.spec.ts'],
    clearMocks: true,
    restoreMocks: true,
  },
});
