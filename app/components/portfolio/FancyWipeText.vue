<template>
	<span ref="text" class="fancy-wipe" :class="{ 'fancy-wipe-playing': playing, 'fancy-wipe-gradient': gradient }">
		<span class="fancy-wipe-text" @animationend="finish">{{ text }}</span>
		<span class="fancy-wipe-color" aria-hidden="true">{{ text }}</span>
		<span class="fancy-wipe-blur" aria-hidden="true">{{ text }}</span>
	</span>
</template>

<script>
export default {
	props: {
		text: { type: String, required: true },
		gradient: { type: Boolean, default: false }
	},
	data() {
		return { playing: false };
	},
	mounted() {
		this.motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
		if (this.motionPreference.matches || !('IntersectionObserver' in window)) return;
		this.observer = new IntersectionObserver(entries => {
			if (!entries.some(entry => entry.isIntersecting)) return;
			this.playing = !this.motionPreference.matches;
			this.observer.disconnect();
		}, { threshold: 0 });
		this.observer.observe(this.$refs.text);
	},
	beforeUnmount() {
		if (this.observer) this.observer.disconnect();
	},
	methods: {
		finish() { this.playing = false; }
	}
};
</script>

<style scoped>
/* Adapted from Jesse Breneman's Fancy wipe:
 * https://codepen.io/Chester/pen/LYKWMxO
 * The original's three masks run once on entry, using the site's theme colors.
 */

.fancy-wipe {
	display: inline-grid;
	max-width: 100%;
	vertical-align: bottom;

	& > span {
		grid-area: 1/1;
		min-width: 0;
	}
}

.fancy-wipe-text {
	color: inherit;
}

.fancy-wipe-gradient .fancy-wipe-text,
.fancy-wipe-color,
.fancy-wipe-blur {
	background: linear-gradient(115deg, var(--gradient));
	background-clip: text;
	-webkit-text-fill-color: transparent;
}

.fancy-wipe-color,
.fancy-wipe-blur {
	visibility: hidden;
	pointer-events: none;
	user-select: none;
}

@supports (mask-image: linear-gradient(black, transparent)) {
	@media (prefers-reduced-motion: no-preference) {
		.fancy-wipe-playing {
			& > span {
				mask-mode: luminance;
				mask-size: 300% 100%;
				/* Start at the text edge rather than traveling through empty mask space. */
				mask-position: 82.5% 0;
				animation: fancy-wipe-in 0.64s cubic-bezier(0.45, 0, 0.55, 1) both;
			}

			& .fancy-wipe-text {
				mask-image: linear-gradient(to right, white 45%, black 55%);
			}

			& .fancy-wipe-color {
				visibility: visible;
				mask-image: linear-gradient(to right, black 45%, white 50%, black 52.5%);
			}

			& .fancy-wipe-blur {
				visibility: visible;
				mask-image: linear-gradient(to right, black 45%, white 52.5%, black 55%);
				filter: blur(10px);
			}
		}
	}
}

.dark-mode .fancy-wipe-gradient .fancy-wipe-text {
	background: none;
	-webkit-text-fill-color: currentColor;
}

@keyframes fancy-wipe-in {
	from {
		mask-position: 82.5% 0;
	}

	to {
		mask-position: 17.5% 0;
	}
}
</style>
