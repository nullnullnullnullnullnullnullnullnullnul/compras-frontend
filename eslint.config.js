import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginSvelte from 'eslint-plugin-svelte';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...eslintPluginSvelte.configs['flat/recommended'],
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser
			}
		}
	},
	{
		ignores: ['.svelte-kit/', 'build/', 'node_modules/', 'dist/']
	}
);
