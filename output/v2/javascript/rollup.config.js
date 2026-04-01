import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'index.js',
  output: {
    file: 'dist/mediaviz-sdk.umd.js',
    format: 'umd',
    name: 'MediaVizSdk',
  },
  plugins: [resolve(), commonjs()],
};
