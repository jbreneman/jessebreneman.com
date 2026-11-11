<template>
	<div
		class="nav-anim"
		aria-hidden="true"
	>
		<span
			v-for="i in 20"
			:key="i"
			class="nav-anim-bubble"
		/>
	</div>
</template>

<script>
export default {

}
</script>

<style scoped>
@keyframes fadeup {
	0% {
		opacity: 1;
		transform: translate3d(0, 0, 0);
	}

	100% {
		transform: translate3d(0, -50vh, 0);
		opacity: 0;
	}
}

.nav-anim {
	width: 100%;
	height: 100%;
}

.nav-anim-bubble {
	position: absolute;
	bottom: 0;
	left: 50%;
	width: 0.5rem;
	height: 0.5rem;
	background-color: rgba(255, 255, 255, 0.5);
	border-radius: 50%;
	opacity: 0;
	animation: 6s fadeup linear infinite;

	&:nth-of-type(1) {
		animation-delay: 1.16s;
		animation-duration: 9.4s;
		left: 29%;
		width: 0.5050899751rem;
		height: 0.5050899751rem;
		background-color: rgba(255, 255, 255, 0.27);
	}

	&:nth-of-type(2) {
		animation-delay: 0.15s;
		animation-duration: 8.24s;
		left: 25%;
		width: 0.7714610036rem;
		height: 0.7714610036rem;
		background-color: rgba(255, 255, 255, 0.26);
	}

	&:nth-of-type(3) {
		animation-delay: 0.2s;
		animation-duration: 8.04s;
		left: 15%;
		width: 0.7066234457rem;
		height: 0.7066234457rem;
		background-color: rgba(255, 255, 255, 0.16);
	}

	&:nth-of-type(4) {
		animation-delay: 0.23s;
		animation-duration: 6.7s;
		left: 52%;
		width: 0.6433494511rem;
		height: 0.6433494511rem;
		background-color: rgba(255, 255, 255, 0.44);
	}

	&:nth-of-type(5) {
		animation-delay: 0.08s;
		animation-duration: 11.92s;
		left: 37%;
		width: 0.0464726912rem;
		height: 0.0464726912rem;
		background-color: rgba(255, 255, 255, 0.22);
	}

	&:nth-of-type(6) {
		animation-delay: 0.81s;
		animation-duration: 9.26s;
		left: 64%;
		width: 0.651808571rem;
		height: 0.651808571rem;
		background-color: rgba(255, 255, 255, 0.35);
	}

	&:nth-of-type(7) {
		animation-delay: 1.07s;
		animation-duration: 8.04s;
		left: 26%;
		width: 0.7998920714rem;
		height: 0.7998920714rem;
		background-color: rgba(255, 255, 255, 0.42);
	}

	&:nth-of-type(8) {
		animation-delay: 1.55s;
		animation-duration: 7.66s;
		left: 62%;
		width: 0.5384131128rem;
		height: 0.5384131128rem;
		background-color: rgba(255, 255, 255, 0.29);
	}

	&:nth-of-type(9) {
		animation-delay: 1.72s;
		animation-duration: 10.12s;
		left: 57%;
		width: 0.967831011rem;
		height: 0.967831011rem;
		background-color: rgba(255, 255, 255, 0.19);
	}

	&:nth-of-type(10) {
		animation-delay: 1.72s;
		animation-duration: 5.6s;
		left: 49%;
		width: 0.1931293236rem;
		height: 0.1931293236rem;
		background-color: rgba(255, 255, 255, 0.12);
	}

	&:nth-of-type(11) {
		animation-delay: 0.26s;
		animation-duration: 7.97s;
		left: 63%;
		width: 0.0413329613rem;
		height: 0.0413329613rem;
		background-color: rgba(255, 255, 255, 0.26);
	}

	&:nth-of-type(12) {
		animation-delay: 1.35s;
		animation-duration: 11.19s;
		left: 68%;
		width: 0.9618805978rem;
		height: 0.9618805978rem;
		background-color: rgba(255, 255, 255, 0.2);
	}

	&:nth-of-type(13) {
		animation-delay: 1.89s;
		animation-duration: 8.28s;
		left: 55%;
		width: 0.0634781633rem;
		height: 0.0634781633rem;
		background-color: rgba(255, 255, 255, 0.34);
	}

	&:nth-of-type(14) {
		animation-delay: 0.32s;
		animation-duration: 10.85s;
		left: 43%;
		width: 0.9792640754rem;
		height: 0.9792640754rem;
		background-color: rgba(255, 255, 255, 0.26);
	}

	&:nth-of-type(15) {
		animation-delay: 1.9s;
		animation-duration: 9.09s;
		left: 74%;
		width: 0.7056480469rem;
		height: 0.7056480469rem;
		background-color: rgba(255, 255, 255, 0.49);
	}

	&:nth-of-type(16) {
		animation-delay: 1.08s;
		animation-duration: 5.45s;
		left: 68%;
		width: 0.7727742161rem;
		height: 0.7727742161rem;
		background-color: rgba(255, 255, 255, 0.23);
	}

	&:nth-of-type(17) {
		animation-delay: 1.13s;
		animation-duration: 6.74s;
		left: 47%;
		width: 0.3644377149rem;
		height: 0.3644377149rem;
		background-color: rgba(255, 255, 255, 0.4);
	}

	&:nth-of-type(18) {
		animation-delay: 1.26s;
		animation-duration: 5.86s;
		left: 14%;
		width: 0.0245482563rem;
		height: 0.0245482563rem;
		background-color: rgba(255, 255, 255, 0.5);
	}

	&:nth-of-type(19) {
		animation-delay: 1.93s;
		animation-duration: 6.39s;
		left: 56%;
		width: 0.7649416962rem;
		height: 0.7649416962rem;
		background-color: rgba(255, 255, 255, 0.26);
	}

	&:nth-of-type(20) {
		animation-delay: 1.18s;
		animation-duration: 11.95s;
		left: 52%;
		width: 0.9646914776rem;
		height: 0.9646914776rem;
		background-color: rgba(255, 255, 255, 0.22);
	}
}
</style>