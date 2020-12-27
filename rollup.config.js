import pluginResolve from "@rollup/plugin-node-resolve";
import pluginTypescript from "@rollup/plugin-typescript";
import pluginCommonjs from "@rollup/plugin-commonjs";
import { default as pluginBabel } from "@rollup/plugin-babel";
import { terser as pluginTerser } from "rollup-plugin-terser";

import camelCase from "lodash.camelcase";
import upperFirst from "lodash.upperfirst";

import typescript from "typescript";

import pkg from "./package.json";

const moduleName = upperFirst(camelCase(pkg.name.replace(/^\@.*\//, "")));

const banner = `/*!
  ${moduleName}.js v${pkg.version}
  ${pkg.homepage}
  Released under the ${pkg.license} License.
*/`;

export default [
  // for Browser
  {
    input: "src/index.ts",
    output: [
      {
        name: moduleName,
        file: pkg.browser,
        format: "iife",
        sourcemap: "inline",
        banner,
      },
      {
        name: moduleName,
        file: pkg.browser.replace(".js", ".min.js"),
        format: "iife",
        banner,
        plugins: [pluginTerser()],
      },
    ],
    external: [...Object.keys(pkg.devDependencies || {})],
    plugins: [
      pluginResolve(),
      pluginTypescript({
        typescript: typescript,
      }),
      pluginCommonjs(),
      pluginBabel({
        babelHelpers: "bundled",
      }),
    ],
  },
  // For NPM
  {
    input: "src/minimal-collapse.ts",
    output: [
      {
        file: pkg.module,
        format: "es",
        sourcemap: "inline",
        banner,
        exports: "named",
      },
    ],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.devDependencies || {})],
    plugins: [
      pluginTypescript({
        typescript: typescript,
      }),
      pluginCommonjs(),
    ],
  },
  // For NPM
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: "inline",
        banner,
        exports: "default",
      },
    ],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.devDependencies || {})],
    plugins: [
      pluginTypescript({
        typescript: typescript,
      }),
      pluginCommonjs(),
    ],
  },
];
