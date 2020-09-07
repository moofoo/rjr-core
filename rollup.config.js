import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import pkg from './package.json';
export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      name: 'rjr-core',
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [commonjs(), typescript(), babel(), json()],
  external: ['react', 'react-dom'],
};
