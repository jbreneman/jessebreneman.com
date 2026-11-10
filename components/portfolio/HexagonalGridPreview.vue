<template>
	<div class="hexagonal-grid-preview">
		<ul class="hexagonal-grid-preview__list">
			<li v-for="item in 30" :key="item" class="hexagonal-grid-preview__item">
				<div class="hexagonal-grid-preview__inside">List item</div>
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
/* Local adaptation of https://codepen.io/Chester/pen/vqbeRN.
 * Preserve the seven-column placement; scale spacing and type for the preview. */
$amount: 7;

.hexagonal-grid-preview {
	display: grid;
	align-content: start;
	padding: 1.5rem;
	background-image: linear-gradient(135deg, #90f7ec 10%, #32ccbc 100%);

	&__list {
		--counter: 1;
		display: grid;
		grid-template-columns: repeat(#{$amount}, minmax(0, 1fr) minmax(0, 2fr)) minmax(0, 1fr);
		grid-auto-rows: 1fr 1fr;
		gap: 0.5rem 0.75rem;
		width: 100%;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	&__item {
		position: relative;
		grid-column: 1 / span 3;
		grid-row: calc(var(--counter) + var(--counter)) / span 2;
		filter: drop-shadow(0 0 10px rgba(#444, 0.04));
		height: 0;
		padding-bottom: 90%;

		@for $i from 1 through $amount {
			&:nth-of-type(#{$amount}n + #{$i}) {
				grid-column: #{$i + $i - 1} / span 3;

				@if $i % 2 == 0 {
					grid-row: calc(var(--counter) + var(--counter) - 1) / span 2;
				}
			}
		}

		@for $i from 1 through 4 {
			&:nth-of-type(n + #{$i * $amount + 1}) {
				--counter: #{$i + 1};
			}
		}
	}

	&__inside {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		padding: 0 20%;
		clip-path: polygon(75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%, 25% 0);
		background: white;
		color: #111;
		font-size: clamp(0.45rem, 0.9vw, 0.8rem);
		line-height: 1.2;
		text-align: center;
	}
}

@media screen and (max-width: 540px) {
	.hexagonal-grid-preview {
		padding: 1rem;

		&__list {
			gap: 0.35rem;
		}
	}
}
</style>
