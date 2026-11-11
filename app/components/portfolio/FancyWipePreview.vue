<template>
	<div class="fancy-wipe-preview">
		<p v-for="word in words" :key="word" class="fancy-wipe-preview__word">
			<span class="fancy-wipe-preview__text">{{ word }}</span>
			<span class="fancy-wipe-preview__color" aria-hidden="true">{{ word }}</span>
			<span class="fancy-wipe-preview__blur" aria-hidden="true">{{ word }}</span>
		</p>
	</div>
</template>

<script>
export default {
	data() {
		return { words: ['Transference', 'Serendipitous', 'Ostentatious'] };
	}
};
</script>

<style lang="scss" scoped>
/* Local adaptation of https://codepen.io/Chester/pen/LYKWMxO.
 * Keep the original three masks, gradients, and 2.5s timing within this preview. */
.fancy-wipe-preview {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 2rem 1rem 4rem;
	background: #222;
	color: white;

	&__word {
		--wipe-colors: linear-gradient(90deg, #fff89a, #cdf2ca, #a2cdcd, #d1e8e4, #cab8ff, #ff7878, #ffc898);
		display: inline-grid;
		margin: 0;
		font-weight: 700;
		font-size: clamp(1.25rem, 3.2vw, 3rem);
		line-height: 1.5;

		&:nth-child(2) {
			--wipe-colors: linear-gradient(90deg, #4ec6f3, #e10fb4);
		}

		&:nth-child(3) {
			--wipe-colors: linear-gradient(90deg, #f00, #ff9a00, #d0de21, #4fdc4a, #3fdad8, #2fc9e2, #1c7fee, #5f15f2, #ba0cf8, #fb07d9, #f00);
		}

		> span {
			grid-area: 1 / 1;
			padding: 0.25rem;
		}
	}

	&__color,
	&__blur {
		visibility: hidden;
		background-image: var(--wipe-colors);
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
}

@supports (mask-image: linear-gradient(black, transparent)) {
	@media (prefers-reduced-motion: no-preference) {
		.fancy-wipe-preview {
			&__word > span {
				mask-mode: luminance;
				mask-size: 300% 100%;
				mask-position: 100% 0;
				animation: experiment-wipe-in 2.5s infinite cubic-bezier(0.45, 0, 0.55, 1);
			}

			&__text {
				mask-image: linear-gradient(to right, white 45%, black 55%);
			}

			&__color {
				visibility: visible;
				mask-image: linear-gradient(to right, black 45%, white 50%, black 52.5%);
			}

			&__blur {
				visibility: visible;
				mask-image: linear-gradient(to right, black 45%, white 52.5%, black 55%);
				filter: blur(10px);
			}
		}
	}
}

@keyframes experiment-wipe-in {
	to { mask-position: 0 0; }
}
</style>
