import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const keynotes = defineCollection({ 
  loader: glob({ pattern: "**/*.md", base: "./src/content/keynotes" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    role: z.string(),
    org: z.string(),
    image: z.string(),
    description: z.string().optional(),
    social: z.object({
      linkedin: z.string().url().optional(),
      x: z.string().url().optional(),
      instagram: z.string().url().optional(),
      github: z.string().url().optional(),
      mastodon: z.string().url().optional(),
      bluesky: z.string().url().optional(),
    }).partial().optional(),
  }),
 });

export const collections = { keynotes };