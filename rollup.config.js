import rimraf from 'rimraf';
import ts from 'typescript';
import tsPlugin from 'rollup-plugin-typescript';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import sourceMaps from "rollup-plugin-sourcemaps";
import {
  uglify
} from 'rollup-plugin-uglify'

rimraf('./dist', function (error) {
  if (error) throw error;

})

const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const extensions = [".ts", ".tsx", ".js", ".jsx"]
const external = [
  'react', 'axios', 'mitt',
  'lodash.get', 'lodash.set', 'lodash.pick',
  'lodash.omit', 'lodash.clonedeep'
]

const plugins = [
  replace({
    'process.env.NODE_ENV': NODE_ENV
  }),
  sourceMaps(),
  nodeResolve({
    extensions
  }),
  commonjs({
    include: 'node_modules/**'
  }),
  tsPlugin({
    typescript: ts,
    importHelpers: true
  })
]

if (NODE_ENV === 'production') {
  plugins.push(uglify());
}

export default {
  plugins,
  external,
  input: './src/index.ts',
  output: {
    file: './dist/index.js',
    format: 'cjs'
  }
}
