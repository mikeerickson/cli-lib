module.exports = {
	env: {
		es6: true,
		node: true,
		jest: false
	},
	plugins: ["prettier"],
	extends: ["eslint:recommended"],
	parserOptions: {
		ecmaVersion: 2017
	},
	rules: {
		indent: ["error", 2],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"no-unused-vars": "off",
		"no-undef": "off",
		"no-console": [
			"error",
			{
				allow: ["log", "error", "dir"]
			}
		]
	}
};
