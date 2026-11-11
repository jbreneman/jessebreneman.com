import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
	rules: {
		'vue/require-default-prop': 'off',
		'vue/multi-word-component-names': 'off'
	}
}, {
	files: ['public/sw.js'],
	languageOptions: { globals: { self: 'readonly', caches: 'readonly' } }
});
