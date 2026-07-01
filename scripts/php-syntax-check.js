#!/usr/bin/env node
/**
 * PHP syntax check — validates all theme PHP files.
 * Used by npm run lint:php:syntax and CI.
 */
const { execSync } = require('child_process');
const { readdirSync, statSync } = require('fs');
const { join } = require('path');

const ROOT = join(__dirname, '..');
const EXCLUDE = new Set(['vendor', 'node_modules', 'build', 'dist', '.git']);

function collectPhpFiles(dir, files = []) {
	for (const entry of readdirSync(dir)) {
		if (EXCLUDE.has(entry)) {
			continue;
		}
		const fullPath = join(dir, entry);
		const stat = statSync(fullPath);
		if (stat.isDirectory()) {
			collectPhpFiles(fullPath, files);
		} else if (entry.endsWith('.php')) {
			files.push(fullPath);
		}
	}
	return files;
}

const phpBinary = process.env.PHP_BINARY || 'php';
const files = collectPhpFiles(ROOT);

if (files.length === 0) {
	console.log('No PHP files found.');
	process.exit(0);
}

let failed = false;

for (const file of files) {
	try {
		execSync(`"${phpBinary}" -l "${file}"`, { stdio: 'pipe' });
	} catch (error) {
		failed = true;
		console.error(error.stdout?.toString() || error.message);
	}
}

if (failed) {
	process.exit(1);
}

console.log(`PHP syntax OK (${files.length} files).`);
