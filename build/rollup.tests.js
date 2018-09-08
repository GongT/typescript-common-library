import typescript from 'rollup-plugin-typescript2';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { resolve } from 'path';
import { sync } from 'glob';

const OPWD = process.cwd();

process.chdir(resolve(__dirname, '..'));

const pkg = require(resolve('package.json'));
const tsconfig = resolve('src/tsconfig.json');

const external = [
	'path', 'fs', 'module',
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
				declaration: false,
				module: 'ESNext',
			},
		},
	}),
];

const commonOutput = {
	banner: 'require(\'source-map-support/register\')',
	sourcemap: true,
};

const config = sync('src/**/*.test.ts').map((file) => {
	return {
		input: file,
		plugins,
		external,
		watch,
		output: [
			{
				file: resolve('dist/tests', file.replace(/^src/, '').replace(/^\/*/, '').replace(/\.ts$/, '.js')),
				format: 'cjs',
				...commonOutput,
			},
		],
	};
});

process.chdir(OPWD);
export default config;
