<template>
	<footer class="app-footer">
		<p class="app-footer__copyright">
			Copyright &copy; {{ year }} Jesse Breneman
		</p>
	</footer>
</template>

<script>
export default {
	data() {
		return {
			year: new Date().getFullYear()
		};
	}
};
</script>

<style lang="scss" scoped>
$block: ".app-footer";

#{$block} {
	// Paint after the preceding positioned section at the shared edge.
	position: relative;
	padding: var(--spacing-flex);
	background-color: var(--grey-900);
	color: var(--grey-0);
	text-align: center;

	&__copyright {
		margin-top: var(--spacing-200);
	}
}
</style>
