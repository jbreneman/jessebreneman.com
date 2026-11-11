<template>
	<div ref="hero" class="index-hero" :class="{ visible }">
		<div class="index-hero-section">
			<h1 :id="headingId" class="index-hero-heading">
				<span class="index-hero-eyebrow">
					Hey, I'm
				</span>
				<span class="index-hero-heading-text">
					Jesse Breneman
				</span>
			</h1>
			<p class="index-hero-subheading">
				I’m a Frontend Engineer focused on crafting a beautiful, accessible web.
			</p>
			<p class="index-hero-paragraph">
				<!-- eslint-disable-next-line -->
				I like building things like design systems and making sure that everything is accessible. I’m the guy
				who likes to nerd out about CSS and push the boundaries of what’s possible. I’m totally not a <a
					href="https://ninjarockstar.dev" class="animated-link">ninja
					rockstar dev</a>.
			</p>
			<p class="index-hero-paragraph">
				<!-- eslint-disable-next-line -->
				I'm based in Columbus, Ohio and currently building the world’s best checkout at <a
					href="https://shopify.com/" class="animated-link">Shopify</a>.
			</p>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		headingId: {
			type: String,
			default: undefined
		}
	},
	data() {
		return {
			visible: false
		};
	},
	mounted() {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
		this.observer = new IntersectionObserver(entries => {
			if (!entries.some(entry => entry.isIntersecting)) return;
			this.visible = true;
			this.observer.disconnect();
		}, { rootMargin: '0px -100px 0px 0px' });
		this.observer.observe(this.$refs.hero);
	},
	beforeUnmount() {
		this.observer?.disconnect();
	}
};
</script>

<style scoped>
@keyframes fadein {
	0% {
		text-shadow: 0 0 0 var(--fade-color, var(--primary));
		opacity: 0;
		transform: translate3d(-0.5rem, 0, 0);
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

.index-hero {
	padding-block: calc(var(--spacing-flex) * 2);
	display: flex;
	justify-content: center;
	align-items: center;
	--delay: .0s;
}

.index-hero.visible .index-hero-eyebrow,
.index-hero.visible .index-hero-heading-text,
.index-hero.visible .index-hero-subheading,
.index-hero.visible .index-hero-paragraph {
	animation: fadein 0.75s ease both var(--delay, 0);
}

.index-hero-eyebrow,
.index-hero-heading-text,
.index-hero-subheading,
.index-hero-paragraph {
	opacity: 1;
}

.index-hero-section {
	width: 100%;
	max-width: 90rem;
}

.index-hero-heading {
	font-size: clamp(2.5rem, 5vw, 4rem);
	font-weight: 700;
	line-height: 1.1;
	display: flex;
	flex-direction: column;
	margin-bottom: var(--spacing-300);
	max-width: 38rem;
}

.index-hero-eyebrow {
	font-size: clamp(1.25rem, 3vw, 1.5rem);
	font-weight: 400;
	line-height: 1.5;
	margin-bottom: calc(var(--spacing-100) * -1);
}

.index-hero-heading-text {
	--delay: .08s;
}

.index-hero-subheading {
	font-size: clamp(2rem, 3vw, 2.25rem);
	font-weight: 400;
	line-height: 1.4;
	margin-bottom: var(--spacing-300);
	--delay: .16s;
	max-width: 38rem;
}

.index-hero-paragraph {
	font-size: clamp(1.25rem, 3vw, 1.5rem);
	font-weight: 400;
	line-height: 1.5;
	color: var(--grey-600);
	max-width: 38rem;

	& + .index-hero-paragraph {
		margin-top: var(--spacing-300);
	}

	&:nth-of-type(2) {
		--delay: 0.32s;
	}

	&:nth-of-type(3) {
		--delay: 0.4s;
	}
}
</style>
