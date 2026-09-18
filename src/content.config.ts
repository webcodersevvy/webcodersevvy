import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    projectType: z.string(),
    services: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    year: z.string(),
    role: z.string(),
    featured: z.boolean().default(false),
    status: z.enum(["published", "draft"]).default("draft"),
    description: z.string(),
    deliverables: z.array(z.string()).default([]),
    evidence: z
      .array(z.object({ image: z.string(), alt: z.string(), caption: z.string() }))
      .default([]),
    placeholderNotes: z.string().optional(),
  }),
});

export const collections = { work };
