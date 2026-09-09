import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/oauth-sdk.umd.js',
      format: 'umd',
      name: 'OAuthSDK',
      exports: 'named',
      plugins: [terser()],
    },
    {
      file: 'dist/oauth-sdk.esm.js',
      format: 'esm',
    },
  ],
  plugins: [nodeResolve(), commonjs()],
};
