import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const keynotes = defineCollection({ 
  loader: glob({ pattern: "**/*.md", base: "./src/content/keynotes" }),
  schema: z.object({
    name: z.string(),
    image: z.string(),
    url: z.string(),
    tagline: z.string(),
    social: z.object({
      linkedin: z.string().url().optional(),
      x: z.string().url().optional(),
      instagram: z.string().url().optional(),
      github: z.string().url().optional(),
      mastodon: z.string().url().optional(),
      bluesky: z.string().url().optional(),
    }).partial().optional(),
    order: z.number().optional(),
  }),
 });

export const collections = { keynotes };
