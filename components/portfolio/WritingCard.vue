<template>
	<a class="writing-card" :href="entry.link" :style="styles">
		<h3 class="writing-card__title">{{ entry.name }}</h3>
		<time class="writing-card__date" :datetime="entry.date">{{ formattedDate }}</time>
		<span class="writing-card__tags">{{ entry.keywords.join(', ') }}</span>
	</a>
</template>

<script>
export default {
	props: {
		entry: { type: Object, required: true }
	},
	computed: {
		styles() {
			return {
				'--background': this.entry.gradient,
				'--text-color': this.entry.textColor,
				'--color-1': this.entry.shadowColor
			};
		},
		formattedDate() {
			return new Date(this.entry.date + 'T12:00:00Z').toLocaleDateString('en-US', {
				year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
/* Card styles from ninjarockstar-v2/pages/index.vue. */
.writing-card {
	position: relative;
	z-index: 0;
	text-decoration: none;
	background: white;
	border-radius: 6px;
	padding: 1.5rem;
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
	overflow: hidden;
	transition: color 0.24s, box-shadow 0.36s ease-out;
	color: var(--text-color);
	box-shadow: 4px 4px 0 rgb(var(--color-1) / 0.1),
		8px 8px 0 rgb(var(--color-1) / 0.1);

	&::before {
		content: '';
		position: absolute;
		z-index: -1;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: var(--background);
	}

	&::after {
		content: '';
		position: absolute;
		z-index: -1;
		left: 1px;
		top: 1px;
		width: calc(100% - 2px);
		height: calc(100% - 2px);
		background: white;
		border-radius: 4px;
		transition: clip-path 0.24s;
		clip-path: circle(0% at 100% 100%);
	}

	&:hover,
	&:focus-visible {
		color: black;
		box-shadow: 0 0 0 rgb(var(--color-1) / 0.1), 0 0 0 rgb(var(--color-1) / 0.1);

		&::after {
			clip-path: circle(150% at 100% 100%);
		}
	}

	&:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 4px;
	}

	&__title {
		font-size: 1.5rem;
		font-weight: 400;
		margin-bottom: auto;
	}

	&__date {
		margin-top: 1rem;
		font-size: 1.125rem;
	}

	&__tags {
		font-size: 0.75rem;
		text-transform: uppercase;
		opacity: 0.75;
	}
}

@media (prefers-reduced-motion: reduce) {
	.writing-card,
	.writing-card::after {
		transition: none;
	}
}
</style>
