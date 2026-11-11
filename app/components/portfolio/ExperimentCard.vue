<template>
	<portfolio-preview-card
:name="name" :description="description" :link="link" :animated="animated"
		action="Explore the demo &amp; source">
		<rotating-border-preview v-if="preview === 'rotating-border'" />
		<fancy-wipe-preview v-else-if="preview === 'fancy-wipe'" />
		<hexagonal-grid-preview v-else-if="preview === 'hexagonal-grid'" />
	</portfolio-preview-card>
</template>

<script>
const codepenPattern = /^https:\/\/codepen\.io\/([\w-]+)\/pen\/([\w-]+)\/?$/;

export default {
	props: {
		name: { type: String, required: true },
		description: { type: String, required: true },
		link: { type: String, required: true, validator: value => codepenPattern.test(value) },
		preview: { type: String, required: true, validator: value => ['rotating-border', 'fancy-wipe', 'hexagonal-grid'].includes(value) },
		animated: { type: Boolean, default: true }
	}
};
</script>
