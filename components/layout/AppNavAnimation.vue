<template>
	<div
		class="nav-anim"
		aria-hidden="true"
	>
		<span
			class="nav-anim__bubble"
			v-for="i in 20"
			:key="i"
		></span>
	</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@use "sass:math";

$block: '.nav-anim';

@function randomNum($min, $max) {
  $rand: math.random();
  $randomNum: $min + math.floor($rand * (($max - $min) + 1));

  @return $randomNum;
}

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

#{$block} {
	width: 100%;
	height: 100%;

	&__bubble {
		position: absolute;
		bottom: 0;
		left: 50%;
		width: .5rem;
		height: .5rem;
		background-color: rgba(white, .5);
		border-radius: 50%;
		opacity: 0;
		animation: 6s fadeup linear infinite;

		@for $i from 1 through 31 {
			&:nth-of-type(#{$i}) {
				$size: math.random();
				animation-delay: #{math.div(randomNum(5, 200), 100)}s;
				animation-duration: #{math.div(randomNum(500, 1200), 100)}s;
				left: #{math.random(70) + 10 + '%'};
				width: #{$size}rem;
				height: #{$size}rem;
				background-color: rgba(white, math.div(randomNum(10, 50), 100));
			}
		}
	}
}
</style>