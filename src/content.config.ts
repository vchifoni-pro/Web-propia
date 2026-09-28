import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Insights: análisis sobre growth, e-commerce, publicidad, IA, automatización, CRO, SEO y negocio. */
const insights = defineCollection({
  // Los ficheros que empiezan por "_" (p. ej. _plantilla.md) no se publican.
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string().max(90),
    description: z.string().max(170),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    topic: z.enum(['Growth', 'E-commerce', 'Publicidad', 'IA', 'Automatización', 'CRO', 'SEO', 'Negocio']),
    draft: z.boolean().default(false),
  }),
});

export const collections = { insights };
