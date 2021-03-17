import typescript from 'rollup-plugin-typescript2';
import del from 'rollup-plugin-delete';
import pkg from './package.json';
import svgr from '@svgr/rollup';
import url from 'rollup-plugin-url';

export default [
    {
        input: 'src/index.ts',
        output: [
            { file: pkg.main, format: 'cjs' },
            { file: pkg.module, format: 'esm' },
        ],
        plugins: [
            del({ targets: ['dist/*'] }),
            typescript(),
            url(),
            svgr()
        ],
        external: Object.keys(pkg.peerDependencies || {}),
    },
];
