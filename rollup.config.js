import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import ts from 'rollup-plugin-ts';

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
  ts(),
  resolve({
    browser: true,
  }),
  commonjs(),
  terser(terserOptions),
];

export default {
  input: 'src/index.ts',
  output: {
    sourcemap: false,
    format: 'iife',
    name: 'longboat',
    file: 'longboat.js',
  },
  plugins,
};
