import typescript from 'rollup-plugin-typescript2';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { resolve } from 'path';

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
	commonjs(),
	typescript({
		tsconfig,
		tsconfigOverride: {
			compilerOptions: {
				module: 'ESNext',
			},
		},
	}),
];

const mainFile = pkg.main || resolve('dist/main.js');
const moduleFile = pkg.module || resolve('dist/main.module.js');

const commonOutput = {
	sourcemap: true,
	name: 'Common',
};

const config = [
	{
		input: 'src/_index.ts',
		plugins,
		external,
		watch,
		output: [
			{file: mainFile, format: 'umd', ...commonOutput},
			{file: moduleFile, format: 'esm', ...commonOutput},
		],
	},
];

process.chdir(OPWD);
export default config;
