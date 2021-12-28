<template>
	<div class="layout">
		<theme-button class="theme-button" />
		<app-nav />
		<Nuxt />
		<app-footer />
	</div>
</template>

<style lang="scss" scoped>
.layout {
	padding-left: var(--app-nav-width);
	background: linear-gradient(
		to right,
		var(--grey-100) var(--app-nav-width),
		var(--grey-0) var(--app-nav-width)
	);
}

.theme-button {
	position: fixed;
	top: var(--spacing-300);
	right: var(--spacing-300);
	z-index: 100;
}
</style>
