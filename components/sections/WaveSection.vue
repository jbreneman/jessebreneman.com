<template>
	<section class="wave-section" :style="{
		backgroundColor: background,
		'--wave-next-background': nextBackground
	}">
		<slot name="background" />
		<div class="wave-section__content">
			<slot />
		</div>
		<wave-transition :color="nextBackground" />
	</section>
</template>

<script>
export default {
	props: {
		background: {
			type: String,
			default: 'var(--grey-100)'
		},
		nextBackground: {
			type: String,
			default: 'var(--grey-0)'
		}
	}
};
</script>

<style scoped>
.wave-section {
	--wave-height: clamp(3rem, 8vw, 6rem);
	--section-padding: calc(var(--spacing-flex) * 2);

	position: relative;
	isolation: isolate;
	overflow: hidden;
	/* Match the surface below underneath the clip-path's antialiased edge. */
	background-image: linear-gradient(to top, var(--wave-next-background) 2px, transparent 2px);
	padding: var(--section-padding);
	margin-bottom: -1px;
	padding-bottom: calc(var(--section-padding) + var(--wave-height) + 1px);
}

/* Vary each edge's proportions and motion with stable, CSS-only presets. */
.wave-section:nth-of-type(5n + 1) {
	--wave-height: clamp(3.5rem, 9vw, 7rem);
	--wave-amplitude: 42%;
	--wave-crest-position: 48%;
	--wave-duration: 17s;
	--wave-delay: -3s;
}

.wave-section:nth-of-type(5n + 2) {
	--wave-height: clamp(2.5rem, 7vw, 5rem);
	--wave-amplitude: 26%;
	--wave-crest-position: 62%;
	--wave-duration: 13s;
	--wave-delay: -8s;
}

.wave-section:nth-of-type(5n + 3) {
	--wave-height: clamp(4rem, 10vw, 8rem);
	--wave-amplitude: 46%;
	--wave-crest-position: 42%;
	--wave-duration: 19s;
	--wave-delay: -2s;
}

.wave-section:nth-of-type(5n + 4) {
	--wave-height: clamp(3rem, 8vw, 6rem);
	--wave-amplitude: 32%;
	--wave-crest-position: 58%;
	--wave-duration: 15s;
	--wave-delay: -5s;
}

.wave-section:nth-of-type(5n) {
	--wave-height: clamp(3.25rem, 9vw, 7.5rem);
	--wave-amplitude: 38%;
	--wave-crest-position: 68%;
	--wave-duration: 21s;
	--wave-delay: -10s;
}

.wave-section__content {
	position: relative;
	z-index: 1;
	width: 100%;
	max-width: 90rem;
	min-width: 0;
	margin-inline: auto;
}

@media screen and (max-width: 540px) {
	.wave-section {
		--section-padding: var(--spacing-flex);
	}
}
</style>
