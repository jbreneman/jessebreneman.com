<template>
	<article class="project-card">
		<img
			class="project-card__image"
			:src="asset.placeholder"
			:srcset="asset.srcSet"
			alt=""
		/>
		<div class="project-card__content">
			<h3 class="project-card__heading" v-if="name">
				{{ name }}
			</h3>
			<p class="project-card__description" v-if="description">
				{{ description }}
			</p>
			<a class="project-card__link" :href="link" v-if="link">
				<!-- eslint-disable-next-line -->
				Visit project
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 100 100"
					class="project-card__arrow"
				>
					<path
						d="M10 50.005c.028.715.322 1.542.812 2.063l16 17c1.085.975 3.164 1.377 4.375.25 1.194-1.109 1.159-3.26-.03-4.375l-11.25-11.938H87a3 3 0 000-6H19.906l11.25-11.938c1.024-1.025 1.213-3.253.031-4.375-1.181-1.122-3.335-.764-4.375.25l-16 17A2.885 2.885 0 0010 50.006z"
						fill="currentColor"
					/>
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
	},
	computed: {
		asset() {
			return require(`~/assets/images/${this.image}`);
		}
	}
};
</script>

<style lang="scss" scoped>
$block: ".project-card";

#{$block} {
	position: relative;
	z-index: 0;
	min-height: 20vh;
	border-radius: 8px;
	overflow: hidden;
	display: flex;
	background-color: var(--grey-0);
	border: 1px solid var(--grey-200);
	box-shadow: 0 1px 2px rgba(black, 0.02), 0 2px 4px rgba(black, 0.02),
		0 4px 8px rgba(black, 0.02), 0 8px 16px rgba(black, 0.02),
		0 16px 32px rgba(black, 0.02), 0 32px 64px rgba(black, 0.02);

	&:hover {
		#{$block} {
			&__image {
				clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
			}

			&__content {
				&::before {
					opacity: 0.15;
				}
			}
		}
	}

	&__image {
		position: absolute;
		z-index: -1;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		clip-path: polygon(70% 0%, 100% 0%, 100% 100%, 80% 100%);
		transition: clip-path 0.24s ease;
	}

	&__content {
		position: relative;
		z-index: 0;
		width: 65%;
		height: auto;
		margin: 0.5rem;
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
			opacity: 0;
			transition: opacity 0.24s ease;
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

@media screen and (max-width: 540px) {
	#{$block} {
		&__image {
			clip-path: polygon(0% 80%, 100% 70%, 100% 100%, 0% 100%);
		}

		&__content {
			width: 100%;
			margin-bottom: calc(var(--spacing-flex) * 4);
		}
	}
}
</style>
