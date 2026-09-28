# victorchifoni.com

Web personal de **Victor Chifoni — Growth Partner**.

> No contrato campañas. Me incorporo a tu negocio para ayudarte a generar más negocio.

- Estrategia, sitemap, dirección visual y decisiones: [`docs/01-estrategia.md`](docs/01-estrategia.md)
- Lo que falta antes de publicar: [`docs/02-pendiente.md`](docs/02-pendiente.md)

## Stack

- [Astro](https://astro.build) con salida estática: HTML sin JavaScript por defecto.
- CSS propio con tokens (`src/styles/global.css`), sin framework.
- Un script vanilla de ~2 KB gzip para interacciones (`src/scripts/main.ts`); el del formulario
  se carga solo en `/contacto`.
- Fuentes autoalojadas: Geist, Geist Mono e Instrument Serif (Fontsource).

## Comandos

| Comando | Qué hace |
|---|---|
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor local en `localhost:4321` |
| `npm run build` | Genera la web en `dist/` |
| `npm run preview` | Sirve `dist/` en local |
| `npm run check` | Comprobación de tipos y plantillas |
| `npm run check:placeholders` | Lista todo lo marcado como pendiente (falla si queda algo) |
| `node scripts/generate-assets.mjs` | Regenera favicon, iconos e imagen OpenGraph |

QA (con `npm run preview` levantado):

| Comando | Qué hace |
|---|---|
| `node qa/shots.mjs / /casos …` | Capturas a 390 y 1440 px en `qa/screenshots/` (`PARTS=1` las trocea) |
| `node qa/interactions.mjs` | Pruebas del menú, del sistema interactivo y del formulario |
| `node qa/overflow.mjs /ruta 360` | Detecta desbordamiento horizontal |
| `node qa/vitals.mjs` | LCP / CLS / tiempo bloqueado con CPU ×4 y red móvil |

## Dónde se edita cada cosa

| Contenido | Archivo |
|---|---|
| Nombre, dominio, email, LinkedIn, CTAs, navegación | `src/config/site.ts` |
| Casos (cifras, contexto, pendientes, visibilidad) | `src/data/cases.ts` |
| Sistema de crecimiento / capacidades | `src/data/system.ts` |
| Metodología, FAQ, comparativa proveedor vs partner | `src/data/content.ts` |
| Artículos de Insights | `src/content/insights/*.md` (plantilla: `_plantilla.md`) |
| Fotografías de Victor | `src/assets/victor/{hero,about,cta}.jpg` |

## Formulario

Define `PUBLIC_FORM_ENDPOINT` (ver `.env.example`) con un servicio que acepte POST JSON
(Formspree, Basin, Web3Forms…). Sin él, el formulario abre el cliente de correo con los datos
rellenados, así que nunca se pierde un contacto.

## SEO y búsqueda generativa

- Metadatos, canonical, OpenGraph y Twitter por página (`src/layouts/Base.astro`).
- Grafo JSON-LD: `WebSite`, `Person`, `ProfessionalService` en todas las páginas; `Service`,
  `Article`, `ProfilePage`, `ContactPage`, `ItemList` y `BreadcrumbList` donde corresponde (`src/lib/schema.ts`).
- `sitemap-index.xml`, `robots.txt` y `llms.txt` generados desde los mismos datos que la web.
- El FAQ usa `details/summary` semántico. No se marca como `FAQPage` porque Google restringe ese
  resultado enriquecido a sitios gubernamentales y sanitarios desde 2023.
- `/insights` es `noindex` y queda fuera del sitemap mientras no haya artículos publicados.

## Despliegue

Cualquier hosting estático (Netlify, Vercel, Cloudflare Pages): comando `npm run build`,
directorio `dist`. La página 404 se genera en `dist/404.html`.
