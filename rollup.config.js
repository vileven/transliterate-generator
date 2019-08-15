import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';

export default {
	input: 'src/index.ts',
	output: [
		{
			file: 'dist/index.js',
			format: 'cjs',
		}
	],
	// external: [
	// 	...Object.keys(pkg.dependencies || {}),
	// ],
	plugins: [
		commonjs(),
		typescript({lib: ['esnext']}),
	],
}
