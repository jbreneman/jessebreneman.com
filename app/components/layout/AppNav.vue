<template>
	<transition name="nav-in">
		<nav v-if="mounted" class="app-nav">
			<nuxt-link class="app-nav-logo" to="/" no-prefetch>
				<span aria-hidden="true">
					J
				</span>
				<span class="visually-hidden">
					Go to homepage
				</span>
			</nuxt-link>
			<ul class="app-nav-list">
				<li class="app-nav-item">
					<a href="https://github.com/jbreneman" class="app-nav-link">
						<span class="app-nav-dots" aria-hidden="true">
							<span v-for="dot in 3" :key="dot" class="app-nav-dot" />
						</span>
						<span class="app-nav-label">
							My Github
						</span>
						<!-- eslint-disable-next-line -->
						<svg class="app-nav-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true" focusable="false">
							<path
fill="currentColor"
								d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
						</svg>
					</a>
				</li>
				<li class="app-nav-item">
					<a href="https://www.linkedin.com/in/jessebreneman/" class="app-nav-link">
						<span class="app-nav-dots" aria-hidden="true">
							<span v-for="dot in 3" :key="dot" class="app-nav-dot" />
						</span>
						<span class="app-nav-label">
							My LinkedIn
						</span>
						<!-- eslint-disable-next-line -->
						<svg class="app-nav-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true" focusable="false">
							<path
fill="currentColor"
								d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
						</svg>
					</a>
				</li>
				<li class="app-nav-item">
					<a href="https://ninjarockstar.dev" class="app-nav-link">
						<span class="app-nav-dots" aria-hidden="true">
							<span v-for="dot in 3" :key="dot" class="app-nav-dot" />
						</span>
						<span class="app-nav-label">
							ninjarockstar.dev
						</span>
						<!-- eslint-disable-next-line -->
						<svg class="app-nav-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true" focusable="false">
							<path
fill="currentColor" fill-rule="evenodd"
								d="M0 0h24v24H0V0zm6.75 5.25v13.5h1.5V8.25l7.5 10.5h1.5V5.25h-1.5v10.5l-7.5-10.5h-1.5z" />
						</svg>
					</a>
				</li>
				<li class="app-nav-item">
					<a href="https://codepen.io/Chester" class="app-nav-link">
						<span class="app-nav-dots" aria-hidden="true">
							<span v-for="dot in 3" :key="dot" class="app-nav-dot" />
						</span>
						<span class="app-nav-label">
							My codepen experiments
						</span>
						<!-- eslint-disable-next-line -->
						<svg class="app-nav-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true" focusable="false">
							<path
fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 2L1 9v6l11 7 11-7V9L12 2zm0 0v6m0 8v6M1 9l11 7 11-7M1 15l11-7 11 7" />
						</svg>
					</a>
				</li>
			</ul>
			<app-nav-animation class="app-nav-background" />
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

<style scoped>
.nav-in-enter {
	transform: translate3d(-50%, 0, 0);
	opacity: 0;
}

.nav-in-enter-active {
	transition: transform 0.36s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.48s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.app-nav {
	position: fixed;
	z-index: 10;
	left: 0;
	top: 0;
	width: var(--app-nav-width);
	height: 100%;
	background: linear-gradient(180deg, var(--gradient));
}

.app-nav-logo {
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
	transition: color 0.36s cubic-bezier(0.215, 0.61, 0.355, 1);
	user-select: none;

	&::after {
		content: "";
		position: absolute;
		left: 20%;
		top: 20%;
		width: 60%;
		height: 60%;
		background-size: cover;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M10 50.005c.028.715.322 1.542.812 2.063l16 17c1.085.975 3.164 1.377 4.375.25 1.194-1.109 1.159-3.26-.03-4.375l-11.25-11.938H87a3 3 0 000-6H19.906l11.25-11.938c1.024-1.025 1.213-3.253.031-4.375-1.181-1.122-3.335-.764-4.375.25l-16 17A2.885 2.885 0 0010 50.006z' fill='white'/%3E%3C/svg%3E");
		transform: translate3d(20px, 0, 0) scale(0.8);
		opacity: 0;
		transition: opacity 0.24s ease, transform 0.36s cubic-bezier(0.215, 0.61, 0.355, 1);
	}

	&:hover {
		color: rgba(255, 255, 255, 0.5);
	}

	&:hover::after {
		opacity: 1;
		transform: translate3d(0, 0, 0);
	}
}

.app-nav-list {
	color: white;
	list-style: none;
	padding: 0;
	margin: 0;
	margin-top: var(--spacing-flex);
}

.app-nav-item {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	& + .app-nav-item {
		margin-top: calc(var(--spacing-flex) / 4);
	}
}

.app-nav-link {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	color: inherit;
	text-decoration: none;
	transition: color 0.24s ease;

	&:hover .app-nav-label,
	&:focus .app-nav-label {
		opacity: 1;
		transform: translate(0, -50%);
		pointer-events: auto;
		box-shadow: 0.25rem 0.25rem 0 var(--primary), 0.5rem 0.5rem 0 var(--secondary);
	}

	&:hover .app-nav-dot,
	&:focus .app-nav-dot {
		opacity: 1;
		transform: translate(0, -50%);
		box-shadow: 0.0625rem 0.0625rem 0 var(--primary), 0.125rem 0.125rem 0 var(--secondary);
		transition-delay: var(--dot-delay);
	}

	&:hover .app-nav-icon,
	&:focus .app-nav-icon {
		transform: translateX(-0.125rem) rotate(-6deg);
	}

	&:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 4px;
	}
}

.app-nav-label {
	position: absolute;
	left: 100%;
	top: 50%;
	width: max-content;
	max-width: calc(100vw - var(--app-nav-width) - 2.25rem - 4px);
	margin-left: calc(1rem + 4px);
	padding: 0.625rem 1rem;
	background: var(--grey-0);
	color: var(--grey-900);
	font-size: clamp(1rem, 3vw, 1.25rem);
	font-weight: 700;
	line-height: 1.2;
	letter-spacing: -0.025em;
	box-shadow: 0 0 0 var(--primary), 0 0 0 var(--secondary);
	opacity: 0;
	transform: translate(-0.75rem, -50%) skewY(-4deg);
	transform-origin: left center;
	pointer-events: none;
	transition: opacity 0.16s ease, transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.32s ease;
	/* Bridge the gap so the label stays open when the pointer reaches it. */

	&::before {
		content: "";
		position: absolute;
		right: 100%;
		top: 0;
		width: calc(1rem + 4px);
		height: 100%;
	}
}

.app-nav-dots {
	--dot-step: calc((var(--app-nav-width) - 1.5rem) / 4 - .125rem);
	position: absolute;
	left: calc(100% + 1rem);
	top: 50%;
	width: 0;
	height: 0;
	pointer-events: none;
}

.app-nav-dot {
	position: absolute;
	top: 0;
	width: 5px;
	height: 5px;
	border-radius: 50%;
	background: white;
	box-shadow: 0 0 0 var(--primary), 0 0 0 var(--secondary);
	opacity: 0;
	transform: translate(-0.375rem, -50%) skewY(-4deg);
	transform-origin: left center;
	transition: opacity 0.16s ease, transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.32s ease;
	/* Start all dots at the icon, then send them to their individual positions. */

	&:nth-child(1) {
		--dot-delay: 0.025s;
		--dot-travel: calc(0 * var(--dot-step) - .75rem);
		right: calc(0.25rem + 2 * var(--dot-step));
	}

	&:nth-child(2) {
		--dot-delay: 0.05s;
		--dot-travel: calc(-1 * var(--dot-step) - .75rem);
		right: calc(0.25rem + 1 * var(--dot-step));
	}

	&:nth-child(3) {
		--dot-delay: 0.075s;
		--dot-travel: calc(-2 * var(--dot-step) - .75rem);
		right: calc(0.25rem + 0 * var(--dot-step));
	}
}

.app-nav-icon {
	width: 2rem;
	height: 2rem;
	transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}

.app-nav-background {
	position: absolute;
	bottom: 0;
	left: 0;
	z-index: -1;
}

@media (prefers-reduced-motion: no-preference) {
	.app-nav-link:hover .app-nav-dot,
	.app-nav-link:focus .app-nav-dot {
		animation: nav-dot-arrive 0.24s ease-out var(--dot-delay) both;
	}
}

@keyframes nav-dot-arrive {
	0% {
		opacity: 0;
		transform: translate(var(--dot-travel), 0.5rem) rotate(-24deg) scale(0.5);
	}

	20% {
		opacity: 1;
	}

	60% {
		transform: translate(0.125rem, -0.625rem) rotate(12deg) scale(1.1);
	}

	80% {
		transform: translate(0, 0.0625rem) rotate(-6deg);
	}

	100% {
		opacity: 1;
		transform: translate(0, -50%) rotate(0deg);
	}
}

@media (prefers-reduced-motion: reduce) {
	.app-nav-link,
	.app-nav-label,
	.app-nav-dot,
	.app-nav-icon {
		transition: none;
	}

	.app-nav-link:hover .app-nav-icon,
	.app-nav-link:focus .app-nav-icon {
		transform: none;
	}
}
</style>
