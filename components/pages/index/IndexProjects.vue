<template>
	<div
		class="index-projects"
		:class="{ visible }"
		v-observe-visibility="{
			callback: visibilityChanged,
			once: true,
			intersection: {
				rootMargin: '0px -100px 0px 0px'
			},
		}"
	> 
		<div class="index-projects__section">
			<h2 class="index-projects__heading">
				Projects
			</h2>
			<div class="index-projects__grid">
				<project-card
					class="index-projects__item"
					:key="project.name"
					v-bind="project"
					v-for="project in projects"
				/>
			</div>
		</div>
	</div>
</template>

<script>
const projects = [
	{
		name: 'Ninjarockstar.dev',
		image: 'ninjarockstar.png',
		description: 'My tech blog. Updated about once a quarter. :)',
		link: 'https://ninjarockstar.dev'
	},
	{
		name: 'My virtual kitchen',
		image: 'myvirtualkitchen.png',
		description: 'Coming soon! Web app for easily saving recipes and eventually building your own cookbooks.'
	},
	{
		name: 'Background gradient builder',
		image: 'backgroundgradient.png',
		description: 'An experimental app I built to generate complex gradients.',
		link: 'https://background-gradient-builder.netlify.app/'
	},
	{
		name: 'TeaTimer',
		image: 'teatimer.png',
		description: 'A simple tea timer. Built to explore PWA technology back when it was new. I still use this to make tea!',
		link: 'https://teatimer.website'
	},
	{
		name: 'Suggestmycolors',
		image: 'suggestmycolors.png',
		description: 'A very old project that\'s been through multiple iterations. Takes a color and applies a bunch of math to generate more colors.',
		link: 'http://projects.jessebreneman.com/suggest/'
	},
];

export default {
	data() {
		return {
			visible: false,
			projects
		};
	},
	methods: {
		visibilityChanged() {
			this.visible = true;
		}
	}
}
</script>

<style lang="scss" scoped>
$block: '.index-projects';

@keyframes pulse {
	0% {
		opacity: 1;
	}
	50% {
		opacity: .5;
	}
	100% {
		opacity: 1;
	}
}

#{$block} {
	position: relative;
	padding: calc(var(--spacing-flex) * 2);
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: var(--grey-100);

	&::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 8rem;
		background: linear-gradient(rgba(black, .02), transparent);
	}

	&.visible {
		#{$block} {
			&__heading, &__item {
				transform: translate3d(0, 0, 0);
				opacity: 1;
			}
		}
	}

	&__heading, &__item {
		transform: translate3d(0, 8px, 0);
		opacity: 0;
		transition: transform .36s cubic-bezier(0.215, 0.61, 0.355, 1), opacity .48s cubic-bezier(0.215, 0.61, 0.355, 1);
	}

	&__section {
		width: 100%;
		max-width: 90rem;
	}
	
	&__heading {
		@include heading-large;
		position: relative;
		display: inline;
		line-height: 1.18;
		background: -webkit-linear-gradient(115deg, var(--primary), var(--secondary));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;

		&::after {
			content: '';
			position: absolute;
			right: 0;
			bottom: .25rem;
			width: 100%;
			height: 100%;
			background: linear-gradient(-45deg, var(--primary), var(--secondary));
			clip-path: inset(calc(100% - .75rem) 1rem .5rem 50%);
			animation: 10s pulse ease-in-out infinite;
		}
	}
	
	&__grid {
		margin-top: var(--spacing-flex);
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: calc(var(--spacing-flex) / 2);
	}

	&__item {
		grid-column: 1 / span 2;

		&:nth-of-type(even) {
			grid-column: 2 / span 2;
		}

		@for $i from 1 through 20 {
			&:nth-of-type(#{$i}) {
				transition-delay: #{.08 * $i}s;
			}
		}
	}
}

@media screen and (max-width: 820px) {
	#{$block} {
		&__item {
			grid-column: 1 / span 3;

			&:nth-of-type(even) {
				grid-column: 1 / span 3;
			}
		}
	}
}

@media screen and (max-width: 540px) {
	#{$block} {
		padding: var(--spacing-flex);
	}
}
</style>