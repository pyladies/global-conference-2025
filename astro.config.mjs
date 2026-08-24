import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { autolinkConfig } from "./plugins/rehype-autolink-config";
import rehypeSlug from "rehype-slug";
import alpinejs from "@astrojs/alpinejs";
import icon from "astro-icon";
import { getSupportedLocales, defaultLang } from "./src/i18n/locales";

// https://astro.build/config
export default defineConfig({
	site: "https://2025.conference.pyladies.com",
	vite: {
		plugins: [tailwindcss()],
		define: {
			__DATE__: `'${new Date().toISOString()}'`,
		},
	},
	integrations: [
		sitemap(),
		alpinejs(),
		icon(),
	],
	markdown: {
		processor: unified({
			rehypePlugins: [
				rehypeSlug,
				// This adds links to headings
				[rehypeAutolinkHeadings, autolinkConfig],
			],
		}),
	},
	i18n: {
		locales: getSupportedLocales(),
		defaultLocale: defaultLang,
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: false,
		},
	}
});
