import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const plugins = [resolve(), commonjs()];

export default [
  {
    input: 'index.js',
    output: [
      { file: 'dist/sdk.cjs', format: 'cjs', exports: 'named' },
      { file: 'dist/sdk.esm.js', format: 'es' },
    ],
    plugins,
  },
  {
    input: 'react_entry.js',
    output: [
      { file: 'dist/react.cjs', format: 'cjs', exports: 'named' },
      { file: 'dist/react.esm.js', format: 'es' },
    ],
    plugins,
    external: ['react'],
  },
];
