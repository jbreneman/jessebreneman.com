// Empty case-study fields are editable and omitted from the rendered page.
export const projects = [
	{
		name: "Ninjarockstar.dev",
		image: "ninjarockstar.png",
		description: "My tech blog. Mostly CSS nerdery.",
		link: "https://ninjarockstar.dev",
		story: { problem: "", contribution: "", decision: "", outcome: "" },
	},
	{
		name: "My Virtual Kitchen",
		image: "myvirtualkitchen.png",
		description:
			"A web app for saving recipes and building your own cookbooks.",
		link: "https://myvirtual.kitchen",
		story: { problem: "", contribution: "", decision: "", outcome: "" },
	},
	{
		name: "Background Gradient Builder",
		image: "backgroundgradient.png",
		description:
			"An experimental app I built to generate complex gradients.",
		link: "https://background-gradient-builder.netlify.app/",
		story: { problem: "", contribution: "", decision: "", outcome: "" },
	},
	{
		name: "Painted Mare Studios",
		image: "paintedmarestudios.png",
		description: "A site I built for my wife to showcase her art.",
		link: "https://paintedmarestudios.com/",
		story: { problem: "", contribution: "", decision: "", outcome: "" },
	},
	{
		name: "Suggestmycolors",
		image: "suggestmycolors.png",
		description:
			"A project I keep rewriting to learn new stuff. Current iteration was written to learn React + Typescript.",
		link: "https://suggest.breneman.dev",
		story: { problem: "", contribution: "", decision: "", outcome: "" },
	},
];

export const experiments = [
	{
		name: "Rotating border",
		preview: "rotating-border",
		description:
			"Might be the first rotating border on the internet using this technique. All of the articles I've seen implementing a similar effect eventually point to this.",
		link: "https://codepen.io/Chester/pen/QPoyjN",
	},
	{
		name: "Fancy wipe",
		preview: "fancy-wipe",
		description:
			"This is based on a Google Gemini commercial I saw a while back. I like recreating effects using CSS.",
		link: "https://codepen.io/Chester/pen/LYKWMxO",
	},
	{
		name: "Hexagonal grid",
		preview: "hexagonal-grid",
		animated: false,
		description:
			"Hexagonal grids using CSS Grid was a white whale for me for a while. It's not perfect, but it's a fun implementation.",
		link: "https://codepen.io/Chester/pen/vqbeRN",
	},
];

export const writing = [
	{
		name: "Noisy gradients",
		date: "2025-11-06",
		keywords: ["css"],
		gradient:
			'url(\'data:image/svg+xml,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.2"/></feComponentTransfer></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)" /></svg>\'), linear-gradient(to top left, #5ee7df 0%,#b490ca 100%)',
		textColor: "white",
		shadowColor: "94 231 223",
		description:
			"Explains how to layer SVG noise over CSS gradients to get a grainy effect.",
		link: "https://ninjarockstar.dev/noisy-gradients/",
		action: "Read article",
	},
	{
		name: "Sliding tab indicators",
		date: "2023-11-27",
		keywords: ["css", "js"],
		gradient:
			"radial-gradient(ellipse at 100% 100%, #FF8F34 0%, transparent 50%), radial-gradient(ellipse at 70% 0, #FFFE40 0%, transparent 50%), radial-gradient(ellipse at 30% 100%, #FF82B8 0%, transparent 50%), radial-gradient(ellipse at 10% 0, #FF82B8 0%, transparent 50%), linear-gradient(#F6F4F2, #F6F4F2)",
		textColor: "black",
		shadowColor: "255 130 184",
		description:
			"A simple vanilla JS implementation of a sliding active indicator for tabbed navigation. Written after implementing a similar effect for my job at the time.",
		link: "https://ninjarockstar.dev/sliding-tab-indicators/",
		action: "Read article",
	},
	{
		name: "Animated gradients",
		date: "2025-05-25",
		keywords: ["css"],
		gradient:
			"linear-gradient(160deg, #009688, #00bcd4 50%, #E91E63 50%, #9c27b0)",
		textColor: "white",
		shadowColor: "0 150 136",
		description:
			"How to animate CSS gradients using just @property to directly change animation values.",
		link: "https://ninjarockstar.dev/animating-css-gradients/",
		action: "Read article",
	},
];

export const contact = {
	codepen: "https://codepen.io/Chester",
	linkedin: "https://www.linkedin.com/in/jessebreneman/",
	github: "https://github.com/jbreneman",
	blog: "https://ninjarockstar.dev/",
};
