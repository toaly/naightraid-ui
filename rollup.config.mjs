import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import ts from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss'
import packageJson from "./package.json" assert {type: "json"};

// rollup.config.mjs
export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true
            }
        ],
        plugins: [resolve(), commonjs(), ts({ tsconfig: "./tsconfig.json" }), postcss({
            extensions: ['scss'],
            minimize: true,
            sourceMap: true,
            modules: true
        })],
    },
    {
        input: "dist/esm/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [dts()],
        external: [/\.css$/, /\.scss$/]
    }
]

