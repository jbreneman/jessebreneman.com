<template>
	<div
		class="index-hero"
		:class="{ visible }"
		v-observe-visibility="{
			callback: visibilityChanged,
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
				I'm based in Columbus, Ohio and currently building the next big post-purchase platform for Shopify at <a href="https://loop.love" class="index-hero__link">Loop Returns</a>.
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

#{$block} {
	padding: calc(var(--spacing-flex) * 2);
	display: flex;
	justify-content: center;
	align-items: center;

	&.visible {
		#{$block} {
			&__eyebrow, &__heading-text, &__subheading, &__paragraph {
				transform: translate3d(0, 0, 0);
				opacity: 1;
			}
		}
	}

	&__eyebrow, &__heading-text, &__subheading, &__paragraph {
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
		transition-delay: .08s;
	}

	&__subheading {
		@include heading-medium;
		margin-bottom: var(--spacing-300);
		transition-delay: .16s;
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
				transition-delay: #{.16 + (.08 * $i)}s;
			}
		}
	}

	&__link {
		@include link;
	}
}
</style>