import typescript from "rollup-plugin-typescript2";
import nodeResolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";

const plugins = [nodeResolve(), typescript(), json(), terser()];
export default [
  {
    inlineDynamicImports: true,
    input: "src/floorplan-card.js",
    output: {
      dir: "dist",
      format: "esm",
      sourcemap: true,
    },
    plugins: [...plugins],
  },
];
