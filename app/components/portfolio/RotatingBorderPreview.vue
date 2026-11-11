<template>
	<div class="rotating-border-preview">
		<div class="rotating-border-preview-border">Rotating border</div>
	</div>
</template>

<style scoped>
/* Local adaptation of https://codepen.io/Chester/pen/QPoyjN */

.rotating-border-preview {
	display: grid;
	place-items: center;
	padding: 2rem 1.5rem 4rem;
}

.rotating-border-preview-border {
	position: relative;
	isolation: isolate;
	display: grid;
	place-items: center;
	width: min(100%, 400px);
	height: 240px;
	overflow: hidden;
	border-radius: 10px;
	padding: 2rem;
	font-size: clamp(1rem, 2vw, 1.5rem);
	font-weight: 700;
	text-align: center;

	&::before {
		content: "";
		position: absolute;
		z-index: -2;
		left: -50%;
		top: -100%;
		width: 200%;
		height: 300%;
		background-color: #399953;
		background-repeat: no-repeat;
		background-size: 50% 50%;
		background-position: 0 0, 100% 0, 100% 100%, 0 100%;
		background-image: linear-gradient(#399953, #399953), linear-gradient(#fbb300, #fbb300), linear-gradient(#d53e33, #d53e33), linear-gradient(#377af5, #377af5);
		animation: experiment-border-rotate 4s linear infinite;
	}

	&::after {
		content: "";
		position: absolute;
		z-index: -1;
		inset: 6px;
		border-radius: 5px;
		background: var(--grey-0);
	}
}

@keyframes experiment-border-rotate {
	to {
		transform: rotate(1turn);
	}
}

@media (prefers-reduced-motion: reduce) {
	.rotating-border-preview-border::before {
		animation: none;
		transform: rotate(30deg);
	}
}
</style>
