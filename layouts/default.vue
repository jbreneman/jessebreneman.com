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
}
</style>
