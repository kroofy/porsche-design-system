import { bundles } from '@porsche-design-system/shared';
import replace from '@rollup/plugin-replace';
import type { Config } from '@stencil/core';
import { version } from './package.json';

const isDevBuild = process.env.PDS_IS_STAGING === '1';

export const config: Config = {
  namespace: 'porsche-design-system',
  taskQueue: 'async',
  invisiblePrehydration: false, // done manually
  outputTargets: [
    { type: 'dist' },
    {
      type: 'www',
      serviceWorker: null,
      copy: [
        {
          src: './favicon.ico',
          dest: 'favicon.ico',
        },
        {
          src: './debug.html',
          dest: 'debug.html',
        },
        {
          src: './assets/p-divider.iife.js',
          dest: 'assets/p-divider.iife.js',
        },
        {
          src: './assets/p-divider.iife.js',
          dest: 'build/p-divider.iife.js',
        },
        {
          src: './assets/p-crest.iife.js',
          dest: 'assets/p-crest.iife.js',
        },
        {
          src: './assets/p-crest.iife.js',
          dest: 'build/p-crest.iife.js',
        },
        {
          src: './assets/p-wordmark.iife.js',
          dest: 'assets/p-wordmark.iife.js',
        },
        {
          src: './assets/p-wordmark.iife.js',
          dest: 'build/p-wordmark.iife.js',
        },
        {
          src: './assets/p-flag.iife.js',
          dest: 'assets/p-flag.iife.js',
        },
        {
          src: './assets/p-flag.iife.js',
          dest: 'build/p-flag.iife.js',
        },
        {
          src: './assets/p-model-signature.iife.js',
          dest: 'assets/p-model-signature.iife.js',
        },
        {
          src: './assets/p-model-signature.iife.js',
          dest: 'build/p-model-signature.iife.js',
        },
        {
          src: './assets/p-icon.iife.js',
          dest: 'assets/p-icon.iife.js',
        },
        {
          src: './assets/p-icon.iife.js',
          dest: 'build/p-icon.iife.js',
        },
        {
          src: './assets/p-heading.iife.js',
          dest: 'assets/p-heading.iife.js',
        },
        {
          src: './assets/p-heading.iife.js',
          dest: 'build/p-heading.iife.js',
        },
        {
          src: './assets/p-text.iife.js',
          dest: 'assets/p-text.iife.js',
        },
        {
          src: './assets/p-text.iife.js',
          dest: 'build/p-text.iife.js',
        },
        {
          src: './assets/p-display.iife.js',
          dest: 'assets/p-display.iife.js',
        },
        {
          src: './assets/p-display.iife.js',
          dest: 'build/p-display.iife.js',
        },
        {
          src: './assets/p-spinner.iife.js',
          dest: 'assets/p-spinner.iife.js',
        },
        {
          src: './assets/p-spinner.iife.js',
          dest: 'build/p-spinner.iife.js',
        },
        {
          src: './assets/p-tag.iife.js',
          dest: 'assets/p-tag.iife.js',
        },
        {
          src: './assets/p-tag.iife.js',
          dest: 'build/p-tag.iife.js',
        },
        {
          src: './assets/p-tag-dismissible.iife.js',
          dest: 'assets/p-tag-dismissible.iife.js',
        },
        {
          src: './assets/p-tag-dismissible.iife.js',
          dest: 'build/p-tag-dismissible.iife.js',
        },
        {
          src: './assets/p-link-pure.iife.js',
          dest: 'assets/p-link-pure.iife.js',
        },
        {
          src: './assets/p-link-pure.iife.js',
          dest: 'build/p-link-pure.iife.js',
        },
        {
          src: './assets/p-link.iife.js',
          dest: 'assets/p-link.iife.js',
        },
        {
          src: './assets/p-link.iife.js',
          dest: 'build/p-link.iife.js',
        },
        {
          src: './assets/p-button-pure.iife.js',
          dest: 'assets/p-button-pure.iife.js',
        },
        {
          src: './assets/p-button-pure.iife.js',
          dest: 'build/p-button-pure.iife.js',
        },
        {
          src: './assets/p-button.iife.js',
          dest: 'assets/p-button.iife.js',
        },
        {
          src: './assets/p-button.iife.js',
          dest: 'build/p-button.iife.js',
        },
        {
          src: './assets/p-switch.iife.js',
          dest: 'assets/p-switch.iife.js',
        },
        {
          src: './assets/p-switch.iife.js',
          dest: 'build/p-switch.iife.js',
        },
        {
          src: './assets/p-checkbox.iife.js',
          dest: 'assets/p-checkbox.iife.js',
        },
        {
          src: './assets/p-checkbox.iife.js',
          dest: 'build/p-checkbox.iife.js',
        },
        {
          src: './assets/p-input-text.iife.js',
          dest: 'assets/p-input-text.iife.js',
        },
        {
          src: './assets/p-input-text.iife.js',
          dest: 'build/p-input-text.iife.js',
        },
        {
          src: './assets/p-input-email.iife.js',
          dest: 'assets/p-input-email.iife.js',
        },
        {
          src: './assets/p-input-email.iife.js',
          dest: 'build/p-input-email.iife.js',
        },
      ],
    },
  ],
  bundles,
  // Dev builds ignore this (Stencil only excludes in --prod). p-divider is
  // also no longer a @Component, so --dev does not emit the Stencil host.
  excludeComponents: [
    'p-divider',
    'p-crest',
    'p-wordmark',
    'p-flag',
    'p-model-signature',
    'p-icon',
    'p-heading',
    'p-text',
    'p-display',
    'p-spinner',
    'p-tag',
    'p-tag-dismissible',
    'p-link-pure',
    'p-link',
    'p-button-pure',
    'p-button',
    'p-switch',
    'p-checkbox',
    'p-input-text',
    'p-input-email',
  ],
  enableCache: true,
  rollupPlugins: {
    after: [
      replace({
        preventAssignment: true,
        ROLLUP_REPLACE_IS_STAGING: isDevBuild ? '"staging"' : '"production"',
        ROLLUP_REPLACE_VERSION: `"${version}"`,
        ROLLUP_REPLACE_CDN_BASE_URL: isDevBuild
          ? '"http://localhost:3001"'
          : 'document.porscheDesignSystem.cdn.url + "/porsche-design-system"', // document variable is set via components-js load() call
      }),
    ],
  },
  globalScript: 'src/setup.ts',
  extras: {
    // emit lifecycle events like componentWillLoad, didLoad, willUpdate, didUpdate only in dev build for e2e tests
    ...(isDevBuild && { lifecycleDOMEvents: true }),
    tagNameTransform: true,
  },
};
