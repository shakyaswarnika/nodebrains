/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./*.php',
		'./template-parts/**/*.php',
		'./inc/**/*.php',
		'./assets/js/**/*.js',
		'./apps/builder/**/*.{js,ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				accent: '#2563eb',
				surface: '#f5f5f5',
			},
			fontFamily: {
				sans: [
					'system-ui',
					'-apple-system',
					'Segoe UI',
					'Roboto',
					'Helvetica Neue',
					'Arial',
					'sans-serif',
				],
			},
		},
	},
	plugins: [],
};
