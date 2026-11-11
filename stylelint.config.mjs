export default {
	ignoreFiles: ['node_modules/**', '.nuxt/**', '.output/**', 'dist/**'],
	overrides: [
		{ files: ['**/*.vue'], customSyntax: 'postcss-html' },
		{ files: ['**/*.scss'], customSyntax: 'postcss-scss' }
	],
	rules: {
		'block-no-empty': true,
		'comment-no-empty': true,
		'color-no-invalid-hex': true
	}
};
