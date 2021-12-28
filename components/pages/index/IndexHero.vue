<template>
	<div
		class="index-hero"
		:class="{ visible }"
		v-observe-visibility="{
			callback: (isVisible) => isVisible && visibilityChanged(),
			once: true,
			intersection: {
				rootMargin: '0px -100px 0px 0px'
			},
		}"
	>
		<div class="index-hero__section">
			<h1 class="index-hero__heading">
				<span class="index-hero__eyebrow">
					Hey, I'm
				</span>
				<span class="index-hero__heading-text">
					Jesse Breneman
				</span>
			</h1>
			<p class="index-hero__subheading">
				I’m a UI developer focused on crafting a beautiful, accessible web.
			</p>
			<p class="index-hero__paragraph">
				<!-- eslint-disable-next-line -->
				I like building things like design systems and component libraries. I’m that guy who thinks CSS isn’t <em>that</em> bad. I’m totally not a <a href="https://ninjarockstar.dev" class="index-hero__link">ninja rockstar dev</a>.
			</p>
			<p class="index-hero__paragraph">
				<!-- eslint-disable-next-line -->
				I'm based in Columbus, Ohio and currently building design systems at <a href="https://blend.com" class="index-hero__link">Blend</a>.
			</p>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			visible: false
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
$block: '.index-hero';

@keyframes fadein {
	0% {
		text-shadow: 0 0 0 var(--fade-color, var(--primary));
		opacity: 0;
		transform: translate3d(-.5rem, 0, 0);
		color: transparent;
	}
	75% {
		text-shadow: 0 0 0 var(--fade-color, var(--secondary));
		color: transparent;
	}
	75.1% {
		text-shadow: 0 0 0 var(--fade-color, var(--secondary));
	}
	100% {
		opacity: 1;
		color: inherit;
		transform: translate3d(0, 0, 0);
	}
}

#{$block} {
	padding: calc(var(--spacing-flex) * 2);
	display: flex;
	justify-content: center;
	align-items: center;
	--delay: .0s;

	&.visible {
		#{$block} {
			&__eyebrow, &__heading-text, &__subheading, &__paragraph {
				animation: fadein .75s ease forwards var(--delay, 0);
			}
		}
	}

	&__eyebrow, &__heading-text, &__subheading, &__paragraph {
		opacity: 0;
	}

	&__section {
		width: 100%;
		max-width: 90rem;
	}
	
	&__heading {
		@include heading-large;
		display: flex;
		flex-direction: column;
		margin-bottom: var(--spacing-300);
		max-width: 38rem;
	}

	&__eyebrow {
		@include heading-small;
		margin-bottom: calc(var(--spacing-100) * -1);
	}

	&__heading-text {
		--delay: .08s;
	}

	&__subheading {
		@include heading-medium;
		margin-bottom: var(--spacing-300);
		--delay: .16s;
		max-width: 38rem;
	}

	&__paragraph {
		@include heading-small;
		color: var(--grey-600);
		max-width: 38rem;

		& + & {
			margin-top: var(--spacing-300);
		}

		@for $i from 1 through 20 {
			&:nth-of-type(#{$i}) {
				--delay: #{.16 + (.08 * $i)}s;
			}
		}
	}

	&__link {
		@include link;
	}
}
</style>