import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'index.js',
  output: [
    { file: 'dist/sdk.cjs.js', format: 'cjs', exports: 'named' },
    { file: 'dist/sdk.esm.js', format: 'es' },
    { file: 'dist/sdk.umd.js', format: 'umd', name: 'MediaVizSdk', exports: 'named' },
  ],
  plugins: [resolve(), commonjs()],
};
