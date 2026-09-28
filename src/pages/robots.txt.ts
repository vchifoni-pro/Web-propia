import type { APIRoute } from 'astro';
import { SITE } from '../config/site';

// Se permite el acceso a buscadores y a sistemas de IA: el objetivo es que entiendan quién es Victor.
export const GET: APIRoute = () =>
  new Response(
    [
      'User-agent: *',
      'Allow: /',
      'Disallow: /gracias',
      '',
      `Sitemap: ${new URL('/sitemap-index.xml', SITE.url)}`,
      '',
    ].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
