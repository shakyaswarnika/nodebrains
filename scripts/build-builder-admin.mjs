import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import autoprefixer from 'autoprefixer';
import tailwindcss from '@tailwindcss/postcss';
import * as esbuild from 'esbuild';
import postcss from 'postcss';

const themeRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(themeRoot, 'assets/admin/builder');
const cssInput = path.join(themeRoot, 'apps/builder/src/app/globals.css');
const cssOutput = path.join(outDir, 'builder.css');
const jsOutput = path.join(outDir, 'builder.js');

mkdirSync(outDir, { recursive: true });

const cssSource = readFileSync(cssInput, 'utf8');
const cssResult = await postcss([
	tailwindcss({
		config: path.join(themeRoot, 'tailwind.config.js'),
	}),
	autoprefixer(),
]).process(cssSource, {
	from: cssInput,
	to: cssOutput,
});

writeFileSync(cssOutput, cssResult.css, 'utf8');

await esbuild.build({
	absWorkingDir: themeRoot,
	entryPoints: ['apps/builder/src/wp/mount.tsx'],
	bundle: true,
	outfile: jsOutput,
	format: 'iife',
	platform: 'browser',
	target: ['es2020'],
	loader: {
		'.tsx': 'tsx',
		'.ts': 'ts',
	},
	jsx: 'automatic',
	alias: {
		'@builder': path.join(themeRoot, 'apps/builder/src'),
		'@theme': themeRoot,
	},
	minify: true,
	sourcemap: true,
	define: {
		'process.env.NODE_ENV': '"production"',
	},
});

console.log('Built Node Builder admin assets in assets/admin/builder/');
