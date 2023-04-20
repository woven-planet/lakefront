import ts from 'rollup-plugin-ts';
import del from 'rollup-plugin-delete';
import pkg from './package.json';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import { terser } from 'rollup-plugin-terser';

export default [
    {
        input: 'src/index.ts',
        output: [
            { file: pkg.main, format: 'cjs' },
            { file: pkg.module, format: 'esm' }
        ],
        plugins: [
            del({ targets: ['dist/*'] }),
            ts(),
            url(),
            svgr(),
            terser()
        ],
        external: Object.keys(pkg.peerDependencies || {})
    },
];
