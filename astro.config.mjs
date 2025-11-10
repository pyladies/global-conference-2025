import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { autolinkConfig } from "./plugins/rehype-autolink-config";
import rehypeSlug from "rehype-slug";
import alpinejs from "@astrojs/alpinejs";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
	site: "https://2025.conference.pyladies.com",
	vite: {
		define: {
			__DATE__: `'${new Date().toISOString()}'`,
		},
	},
	integrations: [
		tailwind(),
		sitemap(),
		alpinejs(),
		icon(),
	],
	markdown: {
		rehypePlugins: [
			rehypeSlug,
			// This adds links to headings
			[rehypeAutolinkHeadings, autolinkConfig],
		],
	},
	i18n: {
		locales: ["en", "es"],
		defaultLocale: "en",
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: false,
		},
	}
});
