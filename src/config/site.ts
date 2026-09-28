/**
 * Configuración global del sitio.
 * Los valores marcados con PENDIENTE deben confirmarse antes de publicar
 * (ver docs/02-pendiente.md y `npm run check:placeholders`).
 */
export const SITE = {
  name: 'Victor Chifoni',
  role: 'Growth Partner',
  // PENDIENTE: confirmar dominio definitivo.
  url: 'https://victorchifoni.com',
  locale: 'es_ES',
  lang: 'es',
  description:
    'Victor Chifoni, Growth Partner. Me incorporo a e-commerce y empresas high-ticket para generar más negocio con adquisición, conversión, automatización e IA trabajadas como un único sistema.',
  // PENDIENTE: confirmar email público de contacto.
  email: 'hola@victorchifoni.com',
  linkedin: 'https://www.linkedin.com/in/victorchifoni/',
  location: { city: 'Barcelona', region: 'Cataluña', country: 'ES' },
  /** Enlace de agenda (Cal.com, Calendly…). Vacío = no se muestra. */
  bookingUrl: '',
  /** Endpoint del formulario. Se lee de PUBLIC_FORM_ENDPOINT. */
  formEndpoint: import.meta.env.PUBLIC_FORM_ENDPOINT ?? '',
} as const;

export const NAV = [
  { href: '/casos', label: 'Casos' },
  { href: '/capacidades', label: 'Capacidades' },
  { href: '/ia-automatizacion', label: 'IA y automatización' },
  { href: '/sobre-mi', label: 'Sobre mí' },
  { href: '/insights', label: 'Insights' },
] as const;

export const CTA = {
  primary: 'Cuéntame tu negocio',
  secondary: 'Ver resultados',
  submit: 'Quiero hablar de mi negocio',
} as const;
