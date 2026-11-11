<template>
	<div class="hexagonal-grid-preview">
		<ul class="hexagonal-grid-preview-list">
			<li v-for="item in 30" :key="item" class="hexagonal-grid-preview-item">
				<div class="hexagonal-grid-preview-inside">List item</div>
			</li>
		</ul>
	</div>
</template>

<style scoped>
/* Local adaptation of https://codepen.io/Chester/pen/vqbeRN.
 * Preserve the seven-column placement; scale spacing and type for the preview. */

.hexagonal-grid-preview {
	display: grid;
	align-content: start;
	padding: 1.5rem;
	background-image: linear-gradient(135deg, #90f7ec 10%, #32ccbc 100%);
}

.hexagonal-grid-preview-list {
	--counter: 1;
	display: grid;
	grid-template-columns: repeat(7, minmax(0, 1fr) minmax(0, 2fr)) minmax(0, 1fr);
	grid-auto-rows: 1fr 1fr;
	gap: 0.5rem 0.75rem;
	width: 100%;
	padding: 0;
	margin: 0;
	list-style: none;
}

.hexagonal-grid-preview-item {
	position: relative;
	grid-column: 1/span 3;
	grid-row: calc(var(--counter) + var(--counter))/span 2;
	filter: drop-shadow(0 0 10px rgba(68, 68, 68, 0.04));
	height: 0;
	padding-bottom: 90%;

	&:nth-of-type(7n + 1) {
		grid-column: 1/span 3;
	}

	&:nth-of-type(7n + 2) {
		grid-column: 3/span 3;
		grid-row: calc(var(--counter) + var(--counter) - 1)/span 2;
	}

	&:nth-of-type(7n + 3) {
		grid-column: 5/span 3;
	}

	&:nth-of-type(7n + 4) {
		grid-column: 7/span 3;
		grid-row: calc(var(--counter) + var(--counter) - 1)/span 2;
	}

	&:nth-of-type(7n + 5) {
		grid-column: 9/span 3;
	}

	&:nth-of-type(7n + 6) {
		grid-column: 11/span 3;
		grid-row: calc(var(--counter) + var(--counter) - 1)/span 2;
	}

	&:nth-of-type(7n + 7) {
		grid-column: 13/span 3;
	}

	&:nth-of-type(n + 8) {
		--counter: 2;
	}

	&:nth-of-type(n + 15) {
		--counter: 3;
	}

	&:nth-of-type(n + 22) {
		--counter: 4;
	}

	&:nth-of-type(n + 29) {
		--counter: 5;
	}
}

.hexagonal-grid-preview-inside {
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

@media screen and (max-width: 540px) {
	.hexagonal-grid-preview {
		padding: 1rem;
	}

	.hexagonal-grid-preview-list {
		gap: 0.35rem;
	}
}
</style>
