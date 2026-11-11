<template>
	<div class="wave-transition" aria-hidden="true" :style="{ backgroundColor: color }" />
</template>

<script>
export default {
	props: {
		color: {
			type: String,
			default: 'var(--grey-0)'
		}
	}
};
</script>

<style scoped>
.wave-transition {
	position: absolute;
	inset: auto 0 0;
	height: var(--wave-height, clamp(3rem, 8vw, 6rem));
	pointer-events: none;
	/* Static curve for browsers without shape() interpolation. */
	clip-path: ellipse(85% calc(20% + var(--wave-amplitude, 40%)) at 50% 100%);
}

@supports (clip-path: shape(from 0% 100%, line to 100% 100%, close)) {
	.wave-transition {
		/* Reflect the incoming handle at the join to keep both tangents aligned. */
		clip-path: shape(from 0% 100%, line to 0% 45%, curve to var(--wave-crest-position, 55%) 60% with 18% calc(50% - var(--wave-amplitude, 40%)) / calc(var(--wave-crest-position, 55%) - 16%) calc(50% + var(--wave-amplitude, 40%)), smooth to 100% 45% with 88% calc(50% + var(--wave-amplitude, 40%)), line to 100% 100%, close);
		animation: section-wave var(--wave-duration, 12s) ease-in-out var(--wave-delay, 0s) infinite;
	}
}

@keyframes section-wave {
	50% {
		clip-path: shape(from 0% 100%, line to 0% 60%, curve to var(--wave-crest-position, 55%) 45% with 18% calc(50% + var(--wave-amplitude, 40%)) / calc(var(--wave-crest-position, 55%) - 16%) calc(50% - var(--wave-amplitude, 40%)), smooth to 100% 60% with 88% calc(50% - var(--wave-amplitude, 40%)), line to 100% 100%, close);
	}
}

@media (prefers-reduced-motion: reduce) {
	.wave-transition {
		animation: none;
	}
}
</style>
