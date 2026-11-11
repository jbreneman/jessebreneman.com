export default defineNuxtConfig({
	compatibilityDate: '2026-11-10',
	ssr: true,
	app: {
		head: {
			htmlAttrs: { lang: 'en' },
			title: 'Jesse Breneman - Front End Developer',
			meta: [
				{ name: 'description', content: 'The homepage of Jesse Breneman.' },
				{ name: 'theme-color', content: 'black' },
				{ property: 'og:type', content: 'website' },
				{ property: 'og:site_name', content: 'jessebreneman.com' }
			],
			link: [
				{ rel: 'icon', type: 'image/png', href: '/favicon.png' },
				{ rel: 'apple-touch-icon', href: '/icon.png' },
				{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,400;0,700;1,400;1,700&display=swap' }
			]
		}
	},
	css: ['~/assets/styles/vars.css', '~/assets/styles/global.css'],
	components: [{ path: '~/components', pathPrefix: false }],
	modules: ['@nuxt/image', '@nuxtjs/color-mode', '@nuxt/eslint'],
	colorMode: {
		preference: 'system',
		fallback: 'light',
		classSuffix: '-mode',
		storage: 'localStorage',
		storageKey: 'nuxt-color-mode'
	}
});
