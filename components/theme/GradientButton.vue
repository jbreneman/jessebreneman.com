<template>
	<a class="gradient-button" :href="href">
		<span class="gradient-button__label">
			<span>{{ label }}</span>
			<span class="gradient-button__shimmer" aria-hidden="true">{{ label }}</span>
		</span>
		<svg class="gradient-button__arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
			<path d="M4 12h16m-6-6 6 6-6 6"
				fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</a>
</template>

<script>
export default {
	props: {
		href: { type: String, required: true },
		label: { type: String, required: true }
	}
};
</script>

<style scoped>
/* A button-sized take on https://codepen.io/Chester/pen/QPoyjN,
 * with the site's palette and interaction-triggered motion. */
@property --cta-angle {
	syntax: "<angle>";
	inherits: false;
	initial-value: 115deg;
}

.gradient-button {
	position: relative;
	isolation: isolate;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 0.875rem;
	min-height: 52px;
	max-width: 100%;
	padding: 0.875rem 1.375rem;
	border-radius: 12px;
	color: var(--grey-900);
	font: inherit;
	font-size: 1rem;
	font-weight: 700;
	line-height: 1.4;
	text-decoration: none;
}

.gradient-button::before,
.gradient-button::after {
	content: '';
	position: absolute;
	pointer-events: none;
	border-radius: inherit;
}

.gradient-button::before {
	z-index: -2;
	inset: 0;
	background: linear-gradient(115deg, var(--gradient));
	background: conic-gradient(from var(--cta-angle), var(--gradient), var(--primary));
}

.gradient-button::after {
	z-index: -1;
	inset: 2px;
	border-radius: 10px;
	background: var(--grey-0);
}

.gradient-button__label {
	display: inline-grid;
}

.gradient-button__label > span {
	grid-area: 1 / 1;
}

.gradient-button__shimmer {
	pointer-events: none;
	user-select: none;
	color: transparent;
	background: linear-gradient(110deg, transparent 35%, var(--primary) 45%, var(--secondary) 50%, transparent 60%);
	background-size: 300% 100%;
	background-position: 100% 0;
	background-clip: text;
	-webkit-background-clip: text;
}

.gradient-button__arrow {
	flex: 0 0 auto;
	width: 1.25rem;
	height: 1.25rem;
	transition: transform 220ms ease;
}

.gradient-button:focus-visible {
	outline: 2px solid var(--grey-900);
	outline-offset: 5px;
}

@media (prefers-reduced-motion: no-preference) {
	.gradient-button:is(:hover, :focus-visible)::before {
		animation: cta-border-turn 2.5s linear infinite;
	}

	.gradient-button:is(:hover, :focus-visible) .gradient-button__shimmer {
		animation: cta-text-shimmer 650ms ease-in-out both;
	}

	.gradient-button:is(:hover, :focus-visible) .gradient-button__arrow {
		transform: translateX(3px);
	}
}

@media (prefers-reduced-motion: reduce) {
	.gradient-button__arrow {
		transition: none;
	}
}

@keyframes cta-border-turn {
	to { --cta-angle: 475deg; }
}

@keyframes cta-text-shimmer {
	to { background-position: 0 0; }
}
</style>
