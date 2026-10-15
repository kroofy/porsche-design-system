/// <reference types="vitest" />

import { readFileSync } from 'node:fs';
import * as path from 'node:path';
import { defineConfig } from 'vitest/config';

// Specs for Stencil classes that are now Mitosis stubs are listed once, in tsconfig.test.json.
const stencilStubSpecs: string[] = JSON.parse(
  readFileSync(path.resolve(__dirname, '../../../tsconfig.test.json'), 'utf8')
).exclude.filter((pattern: string) => pattern.endsWith('.spec.ts'));

export default defineConfig({
  test: {
    environment: 'jsdom', // replaces `testEnvironment: 'jsdom'`
    root: path.resolve(__dirname, '../../../'), // replaces `rootDir`
    setupFiles: ['tests/unit/config/vitest.setup.ts'], // same purpose
    include: ['src/**/*.spec.ts', 'tests/unit/specs/**/*.spec.ts'], // replaces `testMatch`
    exclude: ['dist', ...stencilStubSpecs], // replaces `modulePathIgnorePatterns`
    globals: true, // enables global test APIs like describe, it, expect
    // Vitest 5 truncates interpolated values in `test.each` titles at 40 chars, which hides the
    // values that distinguish cases and collapses distinct snapshot keys into one. 0 disables it.
    taskTitleValueFormatTruncate: 0,
    clearMocks: true,
    restoreMocks: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    typecheck: {
      tsconfig: 'tsconfig.test.json',
    },
  },
  define: {
    ROLLUP_REPLACE_IS_STAGING: JSON.stringify('production'),
    ROLLUP_REPLACE_CDN_BASE_URL: JSON.stringify('https://cdn.ui.porsche.com/porsche-design-system'),
  },
});
