import { defineCollection, z } from 'astro:content';

const sponsorshipCollection = defineCollection({
  type: 'data',
  schema: z.object({
    tiers: z.array(z.object({
      name: z.string(),
      price: z.string(),
      slots: z.union([z.number(), z.string()]),
      popular: z.boolean(),
      soldout: z.boolean(),
      features: z.array(z.string()),
      button: z.object({
        text: z.string(),
        link: z.string(),
      }),
    })),
    attendees: z.array(z.object({
      position: z.string(),
      count: z.string(),
      percentage: z.string(),
    })),
    description: z.string(),
    downloadButton: z.string(),
    customSponsorshipTitle: z.string(),
    customSponsorshipBadge: z.string(),
    customSponsorshipDesc: z.string(),
    otherOptionsTitle: z.string(),
    chapterSponsorTitle: z.string(),
    chapterSponsorPrice: z.string(),
    chapterSponsorDesc: z.string(),
    chapterSponsorFeatures: z.array(z.string()),
    discussionSponsorTitle: z.string(),
    discussionSponsorPrice: z.string(),
    discussionSponsorDesc: z.string(),
    discussionSponsorFeatures: z.array(z.string()),
    attendeesTitle: z.string(),
    attendeesDesc: z.string(),
    quickStatsTitle: z.string(),
    quickStats: z.array(z.string()),
    benefitsTitle: z.string(),
    benefits: z.array(z.object({
      title: z.string(),
      text: z.string(),
    })),
    tableHeaders: z.object({
      position: z.string(),
      count: z.string(),
      percentage: z.string(),
    }),
  }),
});

const cocCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const sprintsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    project_url: z.string().url(),
    project_doc_url: z.string().url().optional(),
    level: z.string(),
    languages: z.string(),
  }),
});

const jobsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    company: z.string(),
    companyurl: z.string().url().optional(),
    salary: z.string().optional(),
    joburl: z.string().url().optional(),
    email: z.string().email().optional(),
    keywords: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'sponsorship': sponsorshipCollection,
  'coc': cocCollection,
  'sprints': sprintsCollection,
  'jobs': jobsCollection,
};
