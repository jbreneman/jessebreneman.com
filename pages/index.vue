<template>
	<div class="index">
		<div class="index__hero">
			<h1 class="index__heading">
				<span class="index__eyebrow">
					Hey, I'm
				</span>
				Jesse Breneman
			</h1>
			<p class="index__subheading">
				I’m a UI developer focused on crafting a beautiful, accessible web.
			</p>
			<p class="index__paragraph">
				<!-- eslint-disable-next-line -->
				I like building things like design systems and component libraries. I’m that guy who thinks CSS isn’t <em>that</em> bad. I’m totally not a <a href="https://ninjarockstar.dev" class="index__link">ninja rockstar dev</a>.
			</p>
		</div>
	</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
$block: '.index';

#{$block} {
	height: 100%;
	padding: var(--spacing-flex);
	display: flex;
	justify-content: center;
	align-items: center;

	&__hero {
		max-width: 38rem;
	}

	&__heading {
		@include heading-large;
		display: flex;
		flex-direction: column;
		margin-bottom: var(--spacing-300);
	}

	&__eyebrow {
		@include heading-small;
		margin-bottom: calc(var(--spacing-100) * -1);
	}

	&__subheading {
		@include heading-medium;
		margin-bottom: var(--spacing-300);
	}

	&__paragraph {
		@include heading-small;
		color: var(--grey-800);
	}

	&__link {
		@include link;
	}
}
</style>
