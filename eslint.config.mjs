import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

/*
References: 
https://github.com/aridanpantoja/eslint-prettier-nextjs
https://www.youtube.com/watch?v=Mloeq7mvI00
*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
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
						"prettier-plugin-tailwindcss",
						"@trivago/prettier-plugin-sort-imports",
					],
				},
				{
					usePrettierrc: false,
				},
			],
		},
	}),
];

export default eslintConfig;
