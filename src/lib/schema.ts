import { SITE } from '../config/site';

/** Datos estructurados (schema.org). Un único grafo con @id enlazados. */

export const ids = {
  person: `${SITE.url}/#victor`,
  service: `${SITE.url}/#growth-partner`,
  website: `${SITE.url}/#website`,
};

export const abs = (path: string) => new URL(path, SITE.url).toString();

export const personNode = () => ({
  '@type': 'Person',
  '@id': ids.person,
  name: SITE.name,
  jobTitle: SITE.role,
  description:
    'Growth Partner para e-commerce y empresas high-ticket. Trabaja adquisición, conversión, retención, SEO, automatización e IA como un único sistema orientado a generar más negocio.',
  url: abs('/sobre-mi'),
  // PENDIENTE: añadir `image` cuando exista la fotografía profesional.
  sameAs: [SITE.linkedin],
  address: {
    '@type': 'PostalAddress',
    addressLocality: SITE.location.city,
    addressRegion: SITE.location.region,
    addressCountry: SITE.location.country,
  },
  knowsAbout: [
    'Growth marketing',
    'E-commerce',
    'Google Ads',
    'Meta Ads',
    'TikTok Ads',
    'Conversion rate optimization',
    'SEO',
    'Generative engine optimization',
    'Email marketing',
    'Marketing automation',
    'Inteligencia artificial aplicada a empresas',
    'n8n',
  ],
});

export const serviceNode = () => ({
  '@type': 'ProfessionalService',
  '@id': ids.service,
  name: `${SITE.name} — ${SITE.role}`,
  url: SITE.url,
  description: SITE.description,
  founder: { '@id': ids.person },
  employee: { '@id': ids.person },
  areaServed: { '@type': 'Country', name: 'España' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: SITE.location.city,
    addressCountry: SITE.location.country,
  },
  knowsLanguage: ['es'],
  sameAs: [SITE.linkedin],
});

export const websiteNode = () => ({
  '@type': 'WebSite',
  '@id': ids.website,
  url: SITE.url,
  name: SITE.name,
  inLanguage: 'es-ES',
  publisher: { '@id': ids.person },
});

export const breadcrumbNode = (items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Inicio', path: '/' }, ...items].map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
});

export const graph = (...nodes: object[]) => ({
  '@context': 'https://schema.org',
  '@graph': nodes,
});
