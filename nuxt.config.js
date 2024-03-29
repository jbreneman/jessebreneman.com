export default {
	/*
	** Nuxt rendering mode
	** See https://nuxtjs.org/api/configuration-mode
	*/
	mode: 'universal',
	/*
	** Nuxt target
	** See https://nuxtjs.org/api/configuration-target
	*/
	target: 'static',
	/*
	** Headers of the page
	** See https://nuxtjs.org/api/configuration-head
	*/
	head: {
		title: 'Jesse Breneman - Front End Developer',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: 'The homepage of Jesse Breneman.' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,400;0,700;1,400;1,700&display=swap'
			}
		]
	},
	/*
	** Global CSS
	*/
	css: [
		'./assets/styles/vars',
		'./assets/styles/global'
	],
	styleResources: {
		scss: [
			'./assets/styles/autoload.scss'
		]
	},
	/*
	** Plugins to load before mounting the App
	** https://nuxtjs.org/guide/plugins
	*/
	plugins: [
		'~/plugins/observe-visibility.js',
		{ src: '~/plugins/panelbear.js', mode: 'client' },
	],
	/*
	** Auto import components
	** See https://nuxtjs.org/api/configuration-components
	*/
	components: true,
	/*
	** Nuxt.js dev-modules
	*/
	buildModules: [
		// Doc: https://github.com/nuxt-community/eslint-module
		'@nuxtjs/eslint-module',
		// Doc: https://github.com/nuxt-community/stylelint-module
		'@nuxtjs/stylelint-module',
		'@nuxtjs/style-resources',
		'@nuxtjs/color-mode',
	],
	/*
	** Nuxt.js modules
	*/
	modules: [
		'@nuxtjs/pwa',
		'nuxt-responsive-loader'
	],
	/*
	** Build configuration
	** See https://nuxtjs.org/api/configuration-build/
	*/
	build: {
	},
	responsiveLoader: {
		placeholder: true
	},
	publicRuntimeConfig: {
		panelbearId: process.env.PANELBEAR_ID
	},
}
