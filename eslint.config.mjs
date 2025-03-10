import { includeIgnoreFile } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import pluginQuery from "@tanstack/eslint-plugin-query";
import { dirname, resolve } from "path";
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
	...compat.config({
		extends: [
			"next/core-web-vitals",
			"next/typescript",
			"plugin:prettier/recommended",
		],
		plugins: ["prettier"],
		rules: {
			"prefer-arrow-callback": ["error"],
			"prefer-template": ["error"],
			"prettier/prettier": [
				"error",
				{
					semi: true,
					singleQuote: false,
					useTabs: true,
					tabWidth: 2,
					printWidth: 80,
					trailingComma: "es5",
					bracketSameLine: true,
					endOfLine: "auto",
					importOrder: [
						"^(react|next?/?([a-zA-Z/]*))$",
						"<THIRD_PARTY_MODULES>",
						"^@/(.*)$",
						"^[./]",
					],
					importOrderSeparation: true,
					importOrderSortSpecifiers: true,
					plugins: [
						"@trivago/prettier-plugin-sort-imports",
						"prettier-plugin-tailwindcss",
					],
				},
				{
					usePrettierrc: false,
				},
			],
		},
	}),
	includeIgnoreFile(gitignorePath),
];

export default eslintConfig;
