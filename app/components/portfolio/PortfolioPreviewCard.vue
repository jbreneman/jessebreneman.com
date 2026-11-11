<template>
	<article class="portfolio-preview-card" :class="{ 'portfolio-preview-card-inset': insetPreview }">
		<slot v-if="!insetPreview" name="preview">
			<div class="portfolio-preview-card-preview" :class="{ 'portfolio-preview-card-preview-paused': paused }">
				<div class="portfolio-preview-card-demo" aria-hidden="true">
					<slot />
				</div>
				<button
v-if="animated" class="portfolio-preview-card-pause" type="button"
					:aria-label="(paused ? 'Play ' : 'Pause ') + name + ' animation'"
					:title="(paused ? 'Play ' : 'Pause ') + name + ' animation'" @click="paused = !paused">
					<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
						<path
class="portfolio-preview-card-playback-icon"
							:class="{ 'portfolio-preview-card-playback-icon-play': paused }" :d="paused
								? 'M8 5L13.5 8.5L13.5 15.5L8 19Z M13.5 8.5L19 12L19 12L13.5 15.5Z'
								: 'M7 5L10 5L10 19L7 19Z M14 5L17 5L17 19L14 19Z'" fill="currentColor" />
					</svg>
				</button>
			</div>
		</slot>
		<div
class="portfolio-preview-card-content"
			:class="{ 'portfolio-preview-card-content-inset': insetPreview }">
			<div class="portfolio-preview-card-background" aria-hidden="true" />
			<slot v-if="insetPreview" name="preview" />
			<div class="portfolio-preview-card-details">
				<p v-if="eyebrow" class="portfolio-preview-card-eyebrow">{{ eyebrow }}</p>
				<h3 class="portfolio-preview-card-heading">{{ name }}</h3>
				<p class="portfolio-preview-card-description">{{ description }}</p>
				<a class="portfolio-preview-card-link animated-link" :href="link">
					{{ action }}
					<svg class="portfolio-preview-card-arrow" viewBox="0 0 24 24" aria-hidden="true">
						<path d="M4 12h16m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.5" />
					</svg>
				</a>
			</div>
		</div>
	</article>
</template>

<script>
export default {
	props: {
		name: { type: String, required: true },
		description: { type: String, required: true },
		link: { type: String, required: true },
		eyebrow: { type: String, required: false },
		action: { type: String, required: true },
		animated: { type: Boolean, default: true },
		insetPreview: { type: Boolean, default: false }
	},
	data() {
		return { paused: false };
	}
};
</script>

<style scoped>
.portfolio-preview-card {
	display: grid;
	grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
	align-items: center;
	gap: max(1.5rem, var(--spacing-flex) / 2);
}

.portfolio-preview-card-inset {
	display: block;
}

.portfolio-preview-card-content-inset {
	display: grid;
	grid-template-columns: minmax(0, 18rem) minmax(0, 1fr);
	align-items: center;
	gap: 1.5rem;
}

.portfolio-preview-card-details {
	min-width: 0;
}

.portfolio-preview-card-background {
	position: absolute;
	z-index: -1;
	inset: 0;
	border: 1px solid var(--grey-200);
	border-radius: 16px;
	background: var(--grey-0);
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02), 0 8px 16px rgba(0, 0, 0, 0.02), 0 32px 64px rgba(0, 0, 0, 0.02);
	pointer-events: none;
}

.portfolio-preview-card-preview {
	position: relative;
	min-width: 0;
	overflow: hidden;
	border: 1px solid var(--grey-200);
	border-radius: 16px;
	background: var(--grey-100);
}

.portfolio-preview-card-demo {
	display: grid;
	height: 360px;
	overflow: hidden;
}

.portfolio-preview-card-pause {
	position: absolute;
	right: 1rem;
	bottom: 1rem;
	display: grid;
	place-items: center;
	width: 44px;
	height: 44px;
	padding: 0;
	border: 1px solid var(--grey-200);
	border-radius: 4px;
	background: var(--grey-0);
	color: var(--grey-800);
	font: inherit;
	font-size: 0.75rem;
	cursor: pointer;

	& svg {
		width: 1.25rem;
		height: 1.25rem;
	}

	&:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 3px;
	}
}

.portfolio-preview-card-playback-icon {
	/* Matching path commands let the two bars warp into two halves of a triangle. */
	d: path("M7 5L10 5L10 19L7 19Z M14 5L17 5L17 19L14 19Z");
	transition: d 280ms cubic-bezier(0.4, 0, 0.2, 1);
}

.portfolio-preview-card-playback-icon-play {
	d: path("M8 5L13.5 8.5L13.5 15.5L8 19Z M13.5 8.5L19 12L19 12L13.5 15.5Z");
}

.portfolio-preview-card-preview-paused :deep(*),
.portfolio-preview-card-preview-paused :deep(*::before),
.portfolio-preview-card-preview-paused :deep(*::after) {
	animation-play-state: paused !important;
}

.portfolio-preview-card-content {
	position: relative;
	isolation: isolate;
	min-width: 0;
	padding: max(1.25rem, var(--spacing-flex) / 2);
}

.portfolio-preview-card-eyebrow {
	margin-bottom: var(--spacing-200);
	color: var(--grey-600);
	font-size: 0.75rem;
	font-weight: 700;
	letter-spacing: 0.12em;
	text-transform: uppercase;
}

.portfolio-preview-card-heading {
	font-size: clamp(1.25rem, 3vw, 1.5rem);
	font-weight: 400;
	line-height: 1.5;
	margin-bottom: var(--spacing-200);
}

.portfolio-preview-card-description {
	margin-bottom: var(--spacing-300);
	color: var(--grey-600);
	font-size: 1rem;
	line-height: 1.6;
}

.portfolio-preview-card-link {
	font-weight: 700;
	text-transform: uppercase;

	&:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 4px;
	}
}

.portfolio-preview-card-arrow {
	width: 1.25rem;
	margin-bottom: -4px;
}

@media screen and (max-width: 680px) {
	.portfolio-preview-card {
		grid-template-columns: minmax(0, 1fr);
		gap: 2px;
	}

	.portfolio-preview-card-content-inset {
		grid-template-columns: minmax(0, 1fr);
	}

	.portfolio-preview-card-demo {
		height: 300px;
	}
}

@media (prefers-reduced-motion: reduce) {
	.portfolio-preview-card-playback-icon {
		transition: none;
	}

	.portfolio-preview-card-pause {
		display: none;
	}
}
</style>
