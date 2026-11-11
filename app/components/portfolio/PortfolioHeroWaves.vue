<template>
	<div class="hero-waves" aria-hidden="true">
		<div class="hero-waves-layers">
			<div class="hero-waves-wave" />
		</div>
	</div>
</template>

<style scoped>
/* Adapted from Chester's Pure CSS Waves: https://codepen.io/Chester/pen/xbGrEjV */

@property --portfolio-wave-color {
	syntax: "<color>";
	inherits: true;
	initial-value: #4ec6f3;
}

.hero-waves {
	position: absolute;
	inset: 0;
	pointer-events: none;
}

.hero-waves-layers {
	--portfolio-wave-color: var(--primary);
	position: absolute;
	inset: 0;
	pointer-events: none;
	opacity: 0.28;
	background: var(--primary);
	background: color-mix(in srgb, var(--portfolio-wave-color), black 15%);
	animation: portfolio-wave-color 20s ease-in-out infinite;
}

.hero-waves-wave {
	background: var(--primary);
	background: color-mix(in srgb, var(--portfolio-wave-color), black 8%);
	/* Curved fallback for browsers without clip-path: shape(). */
	clip-path: ellipse(85% 60% at 50% 100%);

	&,
	&::before,
	&::after {
		position: absolute;
		inset: 0;
	}

	&::before,
	&::after {
		content: '';
	}

	&::before {
		background: var(--primary);
		background: var(--portfolio-wave-color);
		clip-path: ellipse(85% 50% at 50% 100%);
	}

	&::after {
		background: var(--secondary);
		background: color-mix(in srgb, var(--portfolio-wave-color), white 18%);
		clip-path: ellipse(85% 40% at 50% 100%);
	}
}

@supports (clip-path: shape(from 0% 100%, line to 100% 100%, close)) {
	.hero-waves-wave {
		clip-path: shape(from 0% 100%, line to 0% 40%, arc by 50% 10% of 50% cw, arc by 50% 10% of 50%, line to 100% 100%, close);
		animation: portfolio-wave 10s ease-in-out infinite;

		&::before {
			clip-path: shape(from 0% 100%, line to 0% 50%, arc by 50% 10% of 80% cw, arc by 50% 10% of 80%, line to 100% 100%, close);
			animation: portfolio-wave-back 10s ease-in-out infinite;
		}

		&::after {
			clip-path: shape(from 0% 100%, line to 0% 60%, arc by 70% 15% of 100% cw, arc by 30% 15% of 100%, line to 100% 100%, close);
			animation: portfolio-wave-front 10s ease-in-out infinite;
		}
	}
}

@keyframes portfolio-wave-color {
	50% {
		--portfolio-wave-color: var(--secondary);
	}
}

@keyframes portfolio-wave {
	50% {
		clip-path: shape(from 0% 100%, line to 0% 42%, arc by 50% 10% of 45% cw, arc by 50% 10% of 45%, line to 100% 100%, close);
	}
}

@keyframes portfolio-wave-back {
	50% {
		clip-path: shape(from 0% 100%, line to 0% 48%, arc by 50% 10% of 70% cw, arc by 50% 10% of 70%, line to 100% 100%, close);
	}
}

@keyframes portfolio-wave-front {
	50% {
		clip-path: shape(from 0% 100%, line to 0% 61%, arc by 50% 15% of 92% cw, arc by 50% 15% of 92%, line to 100% 100%, close);
	}
}

@media (prefers-reduced-motion: reduce) {
	.hero-waves-layers,
	.hero-waves-wave,
	.hero-waves-wave::before,
	.hero-waves-wave::after {
		animation: none;
	}
}
</style>
