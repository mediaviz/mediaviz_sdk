import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'index.js',
  output: {
    file: 'dist/mediaviz-sdk.umd.js',
    format: 'umd',
    name: 'MediaVizSdk',
  },
  plugins: [resolve()],
};
