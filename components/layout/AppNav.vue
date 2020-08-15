<template>
	<transition name="nav-in">
		<nav
			class="app-nav"
			v-if="mounted"
		>
			<nuxt-link
				class="app-nav__logo"
				to="/"
			>
				<span aria-hidden="true">
					J
				</span>
				<span class="visually-hidden">
					Go to homepage
				</span>
			</nuxt-link>
			<app-nav-animation class="app-nav__background" />
		</nav>
	</transition>
</template>

<script>
export default {
	data() {
		return {
			mounted: false
		};
	},
	mounted() {
		this.mounted = true;
	}
};
</script>

<style lang="scss" scoped>
$block: '.app-nav';

.nav-in-enter {
	transform: translate3d(-50%, 0, 0);
	opacity: 0;
}

.nav-in-enter-active {
	transition: transform .36s cubic-bezier(0.215, 0.61, 0.355, 1), opacity .48s cubic-bezier(0.215, 0.61, 0.355, 1);
}

#{$block} {
	position: fixed;
	left: 0;
	top: 0;
	width: var(--app-nav-width);
	height: 100%;
	background: linear-gradient(180deg, var(--primary) 0%, var(--secondary) 100%);

	&__logo {
		position: relative;
		width: 100%;
		height: var(--app-nav-width);
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		font-weight: 700;
		font-size: 3rem;
		text-decoration: none;
		transition: color .36s cubic-bezier(0.215, 0.61, 0.355, 1);
		user-select: none;

		&::after {
			content: '';
			position: absolute;
			left: 20%;
			top: 20%;
			width: 60%;
			height: 60%;
			background-size: cover;
			background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M10 50.005c.028.715.322 1.542.812 2.063l16 17c1.085.975 3.164 1.377 4.375.25 1.194-1.109 1.159-3.26-.03-4.375l-11.25-11.938H87a3 3 0 000-6H19.906l11.25-11.938c1.024-1.025 1.213-3.253.031-4.375-1.181-1.122-3.335-.764-4.375.25l-16 17A2.885 2.885 0 0010 50.006z' fill='white'/%3E%3C/svg%3E");
			transform: translate3d(20px, 0, 0) scale(.8);
			opacity: 0;
			transition: opacity .24s ease, transform .36s cubic-bezier(0.215, 0.61, 0.355, 1);
		}

		&:hover {
			color: rgba(white, .5);

			&::after {
				opacity: 1;
				transform: translate3d(0, 0, 0);
			}
		}
	}

	&__background {
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: -1;
	}
}
</style>
