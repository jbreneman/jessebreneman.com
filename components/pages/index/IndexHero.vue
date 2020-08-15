<template>
	<div class="index-hero">
		<div class="index-hero__section">
			<h1 class="index-hero__heading">
				<transition name="slide-in">
					<span
						class="index-hero__eyebrow"
						v-if="mounted"
					>
						Hey, I'm
					</span>
				</transition>
				<transition name="slide-in">
					<span
						class="index-hero__heading-text"
						v-if="mounted"
					>
						Jesse Breneman
					</span>
				</transition>
			</h1>
			<transition name="slide-in">
				<p
					class="index-hero__subheading"
					v-if="mounted"
				>
					I’m a UI developer focused on crafting a beautiful, accessible web.
				</p>
			</transition>
			<transition name="slide-in">
				<p
					class="index-hero__paragraph"
					v-if="mounted"
				>
					<!-- eslint-disable-next-line -->
					I like building things like design systems and component libraries. I’m that guy who thinks CSS isn’t <em>that</em> bad. I’m totally not a <a href="https://ninjarockstar.dev" class="index-hero__link">ninja rockstar dev</a>.
				</p>
			</transition>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			mounted: false
		};
	},
	mounted() {
		this.mounted = true;
	}
}
</script>

<style lang="scss" scoped>
$block: '.index-hero';

.slide-in-enter {
	transform: translate3d(0, 8px, 0);
	opacity: 0;
}

.slide-in-enter-active {
	transition: transform .36s cubic-bezier(0.215, 0.61, 0.355, 1), opacity .48s cubic-bezier(0.215, 0.61, 0.355, 1);
}

#{$block} {
	padding: calc(var(--spacing-flex) * 2);
	display: flex;
	justify-content: center;
	align-items: center;

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
		transition-delay: .24s;
		max-width: 38rem;
	}

	&__link {
		@include link;
	}
}
</style>