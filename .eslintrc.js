"use strict";

// eslint-disable-next-line no-undef
module.exports = {
	parserOptions: {
		ecmaVersion: 7,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
			modules: true
		}
	},
	extends: ["eslint:recommended", "plugin:react/recommended"],
	rules: {
		"prettier/prettier": "off",
		"react/prop-types": "off",
		"curly": "error"
	},
	overrides: [
		{
			files: ["{bin,test}/**/*.js"],
			rules: {
				"no-undef": "error",
				"no-restricted-syntax": [
					"error",
					{
						selector: "SequenceExpression",
						message:
							"The comma operator is confusing and a common mistake. Don’t use it!"
					}
				],
				quotes: [
					"error",
					"double",
					{ avoidEscape: true, allowTemplateLiterals: false }
				]
			}
		},
		{
			files: ["*.test.js"],
			env: { jest: true }
		}
	]
};
