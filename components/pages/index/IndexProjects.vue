<template>
	<div class="index-projects"> 
		<div class="index-projects__section">
			<h2
				class="index-projects__heading"
				:class="{ visible: visible.heading }"
				v-observe-visibility="{
					callback: (isVisible) => isVisible && visibilityChanged('heading'),
					once: true,
					intersection: {
						rootMargin: '0px -100px 0px 0px',
					},
				}"
			>
				Projects
			</h2>
			<div
				class="index-projects__grid"
				v-observe-visibility="{
					callback: (isVisible) => isVisible && visibilityChanged('projects'),
					once: true,
					intersection: {
						rootMargin: '0px -100px 0px 0px',
					},
				}"
			>
				<project-card
					class="index-projects__item"
					:key="project.name"
					:class="{ visible: visible.projects }"
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
		description: 'Web app for easily saving recipes and building your own cookbooks.',
		link: 'https://myvirtual.kitchen'
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
		description: `A project I keep rewriting to learn new stuff. Current iteration was written to learn React + Typescript.`,
		link: 'https://suggest.breneman.dev'
	},
];

export default {
	data() {
		return {
			visible: {
				heading: false,
				projects: false
			},
			projects
		};
	},
	methods: {
		visibilityChanged(name) {
			this.visible[name] = true;
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

	.visible {
		transform: translate3d(0, 0, 0);
		opacity: 1;
	}

	&__heading, &__item {
		transform: translate3d(0, 8px, 0);
		opacity: 0;
		transition: transform .72s cubic-bezier(0.215, 0.61, 0.355, 1), opacity .8s cubic-bezier(0.215, 0.61, 0.355, 1);
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
		background: -webkit-linear-gradient(115deg, var(--gradient));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;

		&::after {
			content: '';
			position: absolute;
			right: 0;
			bottom: .25rem;
			width: 100%;
			height: 100%;
			background: linear-gradient(-45deg, var(--gradient));
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