<template>
	<div class="layout">
		<app-nav />
		<Nuxt />
		<app-footer />
	</div>
</template>

<style lang="scss" scoped>
$block: '.layout';

#{$block} {
	padding-left: var(--app-nav-width);
	background: linear-gradient(to right, var(--grey-100) var(--app-nav-width), white var(--app-nav-width));
}
</style>
