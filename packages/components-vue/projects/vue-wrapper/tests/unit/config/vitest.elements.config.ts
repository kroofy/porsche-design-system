import * as path from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [vue()],
  test: {
    root: path.resolve(__dirname, '../../../'),
    environment: 'jsdom',
    include: ['**/tests/unit/specs/elements/**/*.spec.ts'],
  },
});
