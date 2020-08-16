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
			<ul class="app-nav__list">
				<li class="app-nav__item">
					<a href="https://github.com/jbreneman" class="app-nav__link">
						<span class="visually-hidden">
							View my Github
						</span>
						<svg class="app-nav__icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
					</a>
				</li>
				<li class="app-nav__item">
					<a href="https://www.linkedin.com/in/jessebreneman/" class="app-nav__link">
						<span class="visually-hidden">
							View my LinkedIn
						</span>
						<svg class="app-nav__icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
					</a>
				</li>
			</ul>
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

	&__list {
		color: white;
		list-style: none;
		padding: 0;
		margin: 0;
		margin-top: var(--spacing-flex);
	}

	&__item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		& + & {
			margin-top: calc(var(--spacing-flex) / 4);
		}
	}

	&__link {
		color: inherit;
		transition: color .24s ease;

		&:hover {
			color: rgba(white, .75);
		}
	}

	&__icon {
		width: 2rem;
		height: 2rem;
	}

	&__background {
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: -1;
	}
}
</style>
