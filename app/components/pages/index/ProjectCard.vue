<template>
	<article class="project-card">
		<div class="project-card__background">
			<NuxtImg class="project-card__placeholder" :src="`/images/${image}`" :width="10" :height="10" :quality="50" :modifiers="{ blur: 3 }" densities="1x" loading="lazy" alt="" />
			<NuxtImg class="project-card__image" :src="`/images/${image}`" sizes="sm:100vw md:85vw lg:60vw xl:60vw xxl:60vw" densities="1x 2x" loading="lazy" alt="" />
		</div>
		<div class="project-card__content">
			<h3 v-if="name" class="project-card__heading">
				{{ name }}
			</h3>
			<p v-if="description" class="project-card__description">
				{{ description }}
			</p>
			<a v-if="link" class="project-card__link" :href="link">
				<!-- eslint-disable-next-line -->
				Visit project
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="project-card__arrow">
					<path
						d="M10 50.005c.028.715.322 1.542.812 2.063l16 17c1.085.975 3.164 1.377 4.375.25 1.194-1.109 1.159-3.26-.03-4.375l-11.25-11.938H87a3 3 0 000-6H19.906l11.25-11.938c1.024-1.025 1.213-3.253.031-4.375-1.181-1.122-3.335-.764-4.375.25l-16 17A2.885 2.885 0 0010 50.006z"
						fill="currentColor" />
				</svg>
			</a>
		</div>
	</article>
</template>

<script>
export default {
	props: {
		name: {
			type: String,
			required: true
		},
		image: {
			type: String,
			required: true,
			validator: val =>
				[".jpg", ".png", ".gif", ".webm"].some(ext => val.includes(ext))
		},
		description: {
			type: String,
			required: false
		},
		link: {
			type: String,
			required: false,
			validator: val => val.includes("http")
		}
	}
};
</script>

<style lang="scss" scoped>
@use "../../../assets/styles/autoload" as *;

$block: ".project-card";

#{$block} {
	position: relative;
	z-index: 0;
	isolation: isolate;
	min-height: 20vh;
	display: flex;
	border: 1px solid transparent;

	&:hover,
	&:focus-within {
		#{$block} {
			&__background {
				top: -17px;
				right: -17px;
				bottom: -17px;
				left: -17px;
			}
		}
	}

	&__background {
		position: absolute;
		z-index: 0;
		top: -1px;
		right: -1px;
		bottom: -1px;
		left: -1px;
		pointer-events: none;
		transition: top 240ms ease, right 240ms ease, bottom 240ms ease,
			left 240ms ease;
		border-radius: 16px;
		overflow: hidden;
		background-color: var(--grey-0);
		box-shadow: 0 1px 2px rgba(black, 0.02), 0 2px 4px rgba(black, 0.02),
			0 4px 8px rgba(black, 0.02), 0 8px 16px rgba(black, 0.02),
			0 16px 32px rgba(black, 0.02), 0 32px 64px rgba(black, 0.02);

		&::after {
			content: "";
			position: absolute;
			z-index: 1;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			border: 1px solid var(--grey-200);
			border-radius: inherit;
		}
	}

	&__image,
	&__placeholder {
		position: absolute;
		z-index: 0;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	&__content {
		position: relative;
		z-index: 1;
		width: 75%;
		height: auto;
		margin: 2rem auto;
		padding: calc(var(--spacing-flex) / 2);

		&::before {
			content: "";
			position: absolute;
			z-index: -2;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(-45deg, var(--gradient));
			border-radius: 7px;
			opacity: 0.15;
			filter: blur(2px);
		}

		&::after {
			content: "";
			position: absolute;
			z-index: -1;
			left: 1px;
			top: 1px;
			width: calc(100% - 2px);
			height: calc(100% - 2px);
			background: var(--grey-0);
			border-radius: 6px;
		}
	}

	&__heading {
		@include heading-small;
		margin-bottom: var(--spacing-200);
	}

	&__description {
		font-size: 1rem;
		line-height: 1.6;
		color: var(--grey-600);
		margin-bottom: var(--spacing-300);
	}

	&__link {
		@include link;
		color: inherit;
		text-transform: uppercase;
		font-weight: 700;
	}

	&__arrow {
		width: 1.25rem;
		transform: rotate(0.5turn);
		margin-bottom: -3px;
	}
}

@media (prefers-reduced-motion: reduce) {
	#{$block}__background {
		transition: none;
	}
}

@media screen and (max-width: 540px) {
	#{$block} {
		&__content {
			width: calc(100% - 1rem);
			margin-top: 1rem;
			margin-bottom: calc(var(--spacing-flex) * 4);
		}
	}
}
</style>
