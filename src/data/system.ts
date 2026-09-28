/** El sistema de crecimiento: capacidades agrupadas por la función que cumplen en el negocio. */

export type Stage = {
  id: string;
  index: string;
  name: string;
  question: string;
  outcome: string;
  capabilities: string[];
};

export const STAGES: Stage[] = [
  {
    id: 'adquisicion',
    index: '01',
    name: 'Adquisición',
    question: '¿Llegan las personas adecuadas a un coste que tu margen soporta?',
    outcome: 'Más oportunidades, con un coste de adquisición que tenga sentido para tu negocio.',
    capabilities: [
      'Google Ads',
      'Meta Ads',
      'TikTok Ads',
      'Publicidad en ChatGPT y nuevas plataformas',
      'Captación de leads',
      'Funnels',
      'Remarketing',
      'Optimización de campañas',
      'Creatividades orientadas a performance',
    ],
  },
  {
    id: 'visibilidad',
    index: '02',
    name: 'Visibilidad orgánica',
    question: '¿Te encuentran cuando buscan lo que vendes, también en buscadores con IA?',
    outcome: 'Un canal de adquisición que no se apaga cuando se apaga el presupuesto.',
    capabilities: [
      'SEO y SEO técnico',
      'SEO para e-commerce',
      'Arquitectura SEO',
      'Estrategia de contenidos',
      'Visibilidad en buscadores con IA (GEO / LLM SEO)',
    ],
  },
  {
    id: 'conversion',
    index: '03',
    name: 'Conversión',
    question: '¿Qué parte de ese tráfico acaba comprando o pidiendo información?',
    outcome: 'Que cada euro invertido en tráfico rinda más.',
    capabilities: [
      'CRO y experimentación',
      'Desarrollo web y e-commerce',
      'Landing pages',
      'UX/UI',
      'Fichas de producto',
      'Checkout',
      'Arquitectura de conversión',
      'Ofertas y estrategia de producto',
    ],
  },
  {
    id: 'retencion',
    index: '04',
    name: 'Retención',
    question: '¿Vuelve a comprar quien ya te compró? ¿Madura quien aún no está listo?',
    outcome: 'Más valor por cliente y menos dependencia de comprar tráfico nuevo.',
    capabilities: [
      'Email marketing',
      'Flujos post-compra',
      'Recuperación de carrito',
      'Lead nurturing',
      'Reactivación',
      'Segmentación',
      'Customer lifecycle',
    ],
  },
  {
    id: 'automatizacion',
    index: '05',
    name: 'IA y automatización',
    question: '¿Cuánto trabajo manual hay entre que entra una oportunidad y se cierra?',
    outcome: 'Que tu equipo aproveche las oportunidades que el marketing ya genera.',
    capabilities: [
      'Agentes de IA',
      'Clasificación de leads',
      'Automatización comercial y de atención',
      'Workflows con n8n y APIs',
      'Conexión entre herramientas',
      'Informes automáticos',
      'Sistemas internos a medida',
    ],
  },
  {
    id: 'datos',
    index: '06',
    name: 'Datos',
    question: '¿Sabes qué canal, producto y mensaje te hace ganar dinero de verdad?',
    outcome: 'Decisiones con margen y LTV delante, no solo con clics y ROAS.',
    capabilities: ['Medición y analítica', 'CAC, ROAS, CPL', 'Margen y LTV', 'Dashboards', 'Atribución'],
  },
];
