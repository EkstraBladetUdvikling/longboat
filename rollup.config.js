import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

const sharedTerserOptions = {
  format: {
    comments: false,
    indent_level: 2,
    quote_style: 1,
  },
  keep_fnames: false,
  mangle: true,
};

const terserOptions = {
  ...sharedTerserOptions,
  compress: false,
  keep_fnames: true,
  mangle: false,
  nameCache: null,
  toplevel: false,
  warnings: false,
};

const plugins = [
  typescript(),
  resolve({
    browser: true,
  }),
  commonjs(),
  terser(terserOptions),
];

export default {
  input: 'src/longboat.ts',
  output: {
    sourcemap: false,
    format: 'iife',
    name: 'longboat',
    file: 'index.js',
  },
  plugins,
};
