// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync } from 'node:fs';
import { SITE } from './src/config/site.ts';

// /insights se marca noindex mientras no haya artículos publicados: tampoco va al sitemap.
const hasInsights = readdirSync('./src/content/insights').some((f) => f.endsWith('.md') && !f.startsWith('_'));

export default defineConfig({
  site: SITE.url,
  trailingSlash: 'never',
  build: { format: 'file' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/gracias') && !page.includes('/404') && (hasInsights || !page.includes('/insights')),
      i18n: { defaultLocale: 'es', locales: { es: 'es-ES' } },
    }),
  ],
});
