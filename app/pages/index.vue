<template>
	<main id="portfolio" class="portfolio">
		<wave-section
class="portfolio__hero--intro" background="var(--grey-0)" next-background="var(--grey-100)"
			aria-labelledby="portfolio-heading">
			<template #background><portfolio-hero-waves /></template>
			<index-hero class="portfolio__intro" heading-id="portfolio-heading" />
		</wave-section>

		<wave-section
id="work" next-background="var(--portfolio-experiments-background)"
			aria-labelledby="work-heading">
			<h2 id="work-heading" class="portfolio__heading"><fancy-wipe-text text="Featured projects" gradient />
			</h2>
			<div class="portfolio__grid">
				<div v-for="project in projects" :key="project.name" class="portfolio__item">
					<project-card
:name="project.name" :image="project.image" :description="project.description"
						:link="project.link" />
					<dl v-if="hasStory(project)" class="portfolio__story">
						<template v-for="(text, field) in project.story" :key="field">
							<dt v-if="text">{{ field }}</dt>
							<dd v-if="text">{{ text }}</dd>
						</template>
					</dl>
				</div>
			</div>
		</wave-section>

		<wave-section
id="experiments" background="var(--portfolio-experiments-background)"
			next-background="var(--grey-100)" aria-labelledby="experiments-heading">
			<h2 id="experiments-heading" class="portfolio__heading">
				<fancy-wipe-text text="Experiments" gradient />
			</h2>
			<p class="portfolio__paragraph portfolio__description">Whenever I'm feeling like tinkering, I go to Codepen.
				Here's
				a few of my favorites!</p>
			<div class="portfolio__previews">
				<experiment-card
v-for="experiment in experiments" :key="experiment.link" :name="experiment.name"
					:description="experiment.description" :link="experiment.link" :preview="experiment.preview"
					:animated="experiment.animated" />
			</div>
			<div class="portfolio__more">
				<gradient-button :href="contact.codepen" label="Explore my CodePen" />
			</div>
		</wave-section>

		<wave-section
id="writing" background="var(--grey-100)" next-background="var(--grey-0)"
			aria-labelledby="writing-heading">
			<h2 id="writing-heading" class="portfolio__heading">
				<fancy-wipe-text text="Selected writing" gradient />
			</h2>
			<p class="portfolio__paragraph portfolio__description">I have a dev blog that I very occasionally update.
				Usually
				musings on CSS techniques, but covers frontend in general.</p>
			<div class="portfolio__previews">
				<portfolio-preview-card
v-for="entry in writing" :key="entry.link" class="portfolio__writing-row"
					inset-preview :name="entry.name" :description="entry.description" :link="entry.link"
					:action="entry.action" eyebrow="CSS article" :animated="false">
					<template #preview>
						<writing-card class="portfolio__article-card" :entry="entry" />
					</template>
				</portfolio-preview-card>
			</div>
			<div class="portfolio__more">
				<gradient-button :href="contact.blog" label="Explore ninjarockstar.dev" />
			</div>
		</wave-section>

		<wave-section
id="contact" background="var(--grey-0)" next-background="var(--grey-900)"
			aria-labelledby="contact-heading">
			<h2 id="contact-heading" class="portfolio__name"><fancy-wipe-text text="Contact" /></h2>
			<p class="portfolio__paragraph">
				Questions? Comments? Dying to hire me? Connect with me on <a :href="contact.linkedin">LinkedIn</a> or <a
					href="talk@jessebreneman.com">email me</a>.
			</p>
		</wave-section>
	</main>
</template>

<script>
import { projects, experiments, writing, contact } from '~~/content/portfolio';

export default {
	setup() {
		useSeoMeta({
			title: 'Jesse Breneman — Frontend / UI Portfolio',
			ogTitle: 'Jesse Breneman — Frontend / UI Portfolio',
			description: 'Frontend engineering, design systems, interface experiments, and CSS writing by Jesse Breneman.'
		});
	},
	data() {
		return {
			projects,
			experiments,
			contact,
			writing
		};
	},
	methods: {
		hasStory(project) {
			return Object.values(project.story).some(Boolean);
		}
	}
};
</script>

<style lang="scss" scoped>
@use "../assets/styles/autoload" as *;

/* Reuse the homepage's type mixins, spacing, gradient headings,
 * staggered three-column layout, and existing ProjectCard component. */
.portfolio {

	--portfolio-experiments-background: #ebebeb;

	@supports (background: color-mix(in srgb, white, black)) {
		--portfolio-experiments-background: color-mix(in srgb, var(--grey-100), black 4%);
	}

	&__name {
		@include heading-large;
		display: flex;
		flex-direction: column;
		margin-bottom: var(--spacing-300);
		max-width: 38rem;
	}

	&__paragraph {
		@include heading-small;
		color: var(--grey-600);
		max-width: 38rem;
	}

	&__heading {
		@include heading-large;
		display: inline;
		line-height: 1.18;
	}

	&__description {
		margin-top: var(--spacing-300);
	}

	&__grid {
		margin-top: var(--spacing-flex);
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: calc(var(--spacing-flex) / 2);
	}

	&__item {
		grid-column: 1 / span 2;
		min-width: 0;

		&:nth-of-type(even) {
			grid-column: 2 / span 2;
		}
	}

	&__previews {
		display: grid;
		gap: var(--spacing-flex);
		margin-top: var(--spacing-flex);
	}

	&__article-card {
		min-width: 0;
		width: min(100%, 18rem);
		justify-self: center;
	}

	& &__writing-row {
		width: min(100%, 50rem);
		margin-inline: 0;
	}

	&__links {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-300);
		margin-top: var(--spacing-300);
	}

	&__more {
		display: flex;
		justify-content: center;
		margin-top: calc(var(--spacing-700) * 2);
		margin-bottom: 0;
	}

	&__story {
		margin-top: var(--spacing-300);
	}

	&__story dt {
		font-weight: 700;
		text-transform: capitalize;
	}

	&__story dd {
		margin-bottom: var(--spacing-300);
	}

	a:not(.writing-card):not(.gradient-button) {
		@include link;
	}

	a:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 4px;
	}
}

@media screen and (max-width: 820px) {

	.portfolio__item,
	.portfolio__item:nth-of-type(even) {
		grid-column: 1 / span 3;
	}
}

@media (prefers-reduced-motion: reduce) {

	.portfolio :deep(*),
	.portfolio :deep(*::before),
	.portfolio :deep(*::after) {
		animation: none !important;
		transition: none !important;
	}
}
</style>
