import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';

import pkg from './package.json';

const env = process.env.NODE_ENV;

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'es',
      exports: 'named',
      name: 'rjr-core',
      sourcemap: false,
      strict: false,
      plugins: [terser()],
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
  ],
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    replace({ 'process.env.NODE_ENV': JSON.stringify('env') }),
    commonjs(),
    typescript(),
    babel({
      exclude: 'node_modules/**',
    }),
    json(),
  ],
  external: ['react', 'react-dom', 'lodash'],
};
