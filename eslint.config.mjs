import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
	{ files: ['**/*.{js,mjs,cjs,ts}'], ignorePatterns: ['node_modules/'] },
	{ languageOptions: { globals: globals.node } },
	{
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					varsIgnorePattern: '^_',
					argsIgnorePattern: '^_',
				},
			],
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
];
