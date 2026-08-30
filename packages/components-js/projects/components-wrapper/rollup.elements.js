import { nodeResolve } from '@rollup/plugin-node-resolve';
import * as esbuild from 'esbuild';
import copy from 'rollup-plugin-copy';
import { dts } from 'rollup-plugin-dts';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const esbuildTs = () => ({
  name: 'esbuild-ts',
  async transform(code, id) {
    if (!/\.[cm]?tsx?$/.test(id) || id.includes('node_modules')) {
      return null;
    }
    const result = await esbuild.transform(code, {
      loader: 'ts',
      sourcemap: true,
    });
    return { code: result.code, map: result.map };
  },
});

const projectDir = 'projects/components-wrapper';
const outputDir = 'dist/components-wrapper';

export default [
  {
    input: `${projectDir}/src/elements/index.ts`,
    output: [
      {
        file: `${outputDir}/elements/cjs/index.cjs`,
        format: 'cjs',
      },
      {
        file: `${outputDir}/elements/esm/index.mjs`,
        format: 'esm',
      },
    ],
    plugins: [
      nodeResolve({ extensions: ['.ts', '.js', '.mjs'] }),
      esbuildTs(),
      copy({
        targets: [
          {
            src: '../components/src/elements/elements.css',
            dest: `${outputDir}/elements`,
            rename: 'index.css',
          },
        ],
      }),
      generatePackageJson({
        outputFolder: `${outputDir}/elements`,
        baseContents: {
          main: 'cjs/index.cjs',
          module: 'esm/index.mjs',
          types: 'esm/index.d.ts',
          style: 'index.css',
          sideEffects: ['*.css'],
        },
      }),
    ],
  },
  {
    input: `${projectDir}/src/elements/index.ts`,
    output: {
      file: `${outputDir}/elements/esm/index.d.ts`,
      format: 'es',
    },
    plugins: [dts({ tsconfig: `${projectDir}/tsconfig.elements.json` })],
  },
];
