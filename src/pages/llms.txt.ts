import type { APIRoute } from 'astro';
import { SITE } from '../config/site';
import { publishedCases } from '../data/cases';
import { STAGES } from '../data/system';

/**
 * llms.txt: resumen en texto plano para sistemas generativos (https://llmstxt.org).
 * Se genera desde los mismos datos que la web para no desincronizarse.
 */
export const GET: APIRoute = () => {
  const url = (p: string) => new URL(p, SITE.url).toString();
  const body = `# ${SITE.name}

> ${SITE.name} es Growth Partner con base en ${SITE.location.city} (España). Se incorpora a e-commerce y empresas high-ticket para generar más negocio, trabajando adquisición, visibilidad orgánica, conversión, retención, IA, automatización y datos como un único sistema. El cliente trabaja directamente con él, sin intermediarios.

## Con quién trabaja
E-commerce de ticket medio-alto, empresas high-ticket y negocios basados en leads: inmobiliarias, concesionarios, clínicas dentales, audiología, mobiliario, salud y bienestar y empresas B2B con capacidad de inversión en crecimiento.

## Cómo trabaja
Entender el negocio → Detectar la mayor oportunidad → Construir lo necesario → Medir (CAC, ROAS, CPL, conversión, revenue, margen, LTV) → Escalar.
No garantiza resultados ni porcentajes antes de ver los datos.

## Capacidades
${STAGES.map((s) => `- ${s.name}: ${s.capabilities.join(', ')}`).join('\n')}

## Casos
${publishedCases()
  .map((c) => `- [${c.client}](${url(`/casos/${c.slug}`)}): ${c.title}${c.period ? ` Periodo: ${c.period}.` : ''}`)
  .join('\n')}

## Páginas
- [Inicio](${url('/')})
- [Casos](${url('/casos')})
- [Capacidades](${url('/capacidades')})
- [IA y automatización](${url('/ia-automatizacion')})
- [Sobre Victor Chifoni](${url('/sobre-mi')})
- [Contacto](${url('/contacto')})

## Contacto
- LinkedIn: ${SITE.linkedin}
- Email: ${SITE.email}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
