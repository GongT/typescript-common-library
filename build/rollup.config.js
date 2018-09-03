import typescript from 'rollup-plugin-typescript2';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { resolve } from 'path';
import * as glob from 'glob';

const OPWD = process.cwd();

process.chdir(resolve(__dirname, '..'));

const pkg = require(resolve('package.json'));
const tsconfig = resolve('src/tsconfig.json');

const external = [
	pkg.name,
	...Object.keys(pkg.dependencies || {}),
	...Object.keys(pkg.devDependencies || {}),
];

const watch = {
	chokidar: true,
	include: 'src/**',
};

const plugins = [
	nodeResolve(),
	typescript({
		tsconfig,
		tsconfigOverride: {
			compilerOptions: {
				module: 'ESNext',
			},
		},
	}),
	commonjs(),
];

const mainFile = pkg.main || resolve('dist/main.js');
const moduleFile = pkg.module || resolve('dist/main.module.js');

const commonOutput = {
	sourcemap: true,
	name: pkg.name.replace(/^@/, '').replace(/\//g, '__'),
};

const config = [
	{
		input: 'src/index.ts',
		plugins,
		external,
		watch,
		output: [
			{file: mainFile, format: 'cjs', ...commonOutput},
			{file: moduleFile, format: 'esm', ...commonOutput},
		],
	},
];

process.chdir(OPWD);
export default config;
