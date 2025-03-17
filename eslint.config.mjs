import { includeIgnoreFile } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import pluginQuery from "@tanstack/eslint-plugin-query";
import { dirname, resolve } from "path";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "url";

/*
References: 
https://github.com/aridanpantoja/eslint-prettier-nextjs
https://www.youtube.com/watch?v=Mloeq7mvI00
*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const gitignorePath = resolve(__dirname, "./.gitignore");

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...pluginQuery.configs["flat/recommended"],
	...tseslint.configs.recommendedTypeChecked,
	...compat.config({
		parserOptions: {
			projectService: true,
			tsconfigRootDir: __dirname,
		},
		extends: [
			"next/core-web-vitals",
			"next/typescript",
			"plugin:prettier/recommended",
			"plugin:@typescript-eslint/recommended-type-checked",
		],
		plugins: ["prettier", "@typescript-eslint"],
		rules: {
			"@typescript-eslint/consistent-type-imports": [
				"warn",
				{
					prefer: "type-imports",
					fixStyle: "inline-type-imports",
				},
			],
			"@typescript-eslint/no-unsafe-assignment": ["warn"],
			"@typescript-eslint/no-unsafe-call": ["warn"],
			"@typescript-eslint/no-unsafe-member-access": ["warn"],
			"@typescript-eslint/no-unsafe-return": ["warn"],
			"@typescript-eslint/no-unused-vars": ["warn"],
			"@typescript-eslint/no-unsafe-argument": ["warn"],
			"prefer-arrow-callback": ["error"],
			"prefer-template": ["error"],
			"prettier/prettier": [
				"error",
				{
					usePrettierrc: true,
				},
			],
		},
	}),
	includeIgnoreFile(gitignorePath),
];

export default eslintConfig;
