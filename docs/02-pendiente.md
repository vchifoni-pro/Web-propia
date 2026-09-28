# Información pendiente antes de publicar

La web está construida para no inventar nada (brief §21). Donde falta un dato hay una marca visible
**PENDIENTE** con borde discontinuo naranja. `npm run check:placeholders` las lista todas.

Ordenado por impacto en la confianza de un cliente potencial.

## 1. Fotografías de Victor (máxima prioridad)

La web está diseñada alrededor de tu cara. Sin fotos pierde gran parte de su fuerza.

Colócalas en `src/assets/victor/` con estos nombres: se optimizan (AVIF/WebP, tamaños responsivos) y
sustituyen al placeholder automáticamente, sin tocar código.

| Archivo | Dónde aparece | Qué foto |
|---|---|---|
| `hero.jpg` | Hero de la home | Retrato vertical 4:5, mirada a cámara, fondo neutro (gris/piedra). Luz natural. Sin traje de "consultor". Mínimo 1600 px de alto |
| `about.jpg` | Home "Sobre mí" y `/sobre-mi` | Trabajando: en una reunión, delante de una pizarra con un funnel, o con un dashboard. Real, no posado |
| `cta.jpg` | CTA final y contacto | Retrato cercano, expresión abierta. Es la foto de "hablemos" |

Evitar: fotos de stock, fondo de oficina genérica, brazos cruzados.

## 1b. Logos de clientes

Archivos en `src/assets/logos/` (SVG preferible, o PNG/WebP transparente). El nombre debe coincidir
con el slug de `src/data/brands.ts`: `tr-muebles`, `the-colchon-company`, `farmacia-gambin`,
`beanywood`, `3rgonomics`. Mientras falten, se muestra el nombre en tipografía.

- [ ] Confirmar si TR Muebles es el cliente del caso "Confor de Inmuebles" (+300.000 €). Si lo es,
      renombrar el caso y enlazarlo en `brands.ts` con `caseSlug`.
- [ ] Permiso de Beanywood y 3rgonomics para mostrar su logo.

## 2. Permisos de clientes

Antes de publicar, confirmar **por escrito** con cada cliente que puedes mostrar su nombre y la cifra.

- [ ] Confor de Inmuebles — nombre + "+300.000 €"
- [ ] The Colchón Company — nombre + "+100.000 € en ~6 meses"
- [ ] Farmacia Gambín — nombre + descripción del trabajo
- [ ] Óptica Muralla — **oculto** (`publish: false` en `src/data/cases.ts`) hasta confirmar
- [ ] Proyectos con creadores (Willyrex, Staxx, Lolito, Beanywood Café, Ergonomics…) — **ocultos**. Para mostrarlos
      hace falta: relación exacta (cliente directo / vía agencia / colaboración), tu papel concreto y permiso.
      No se usarán logos de creadores para no insinuar endorsements.

## 3. Datos de cada caso

Para cada caso, en `src/data/cases.ts`:

| Dato | Confor | Colchón Co. | Gambín |
|---|---|---|---|
| Periodo exacto (mes/año inicio – fin) | Falta | Falta (hay "~6 meses") | Falta inicio |
| Tu papel exacto (qué tú / qué cliente / qué otros) | Falta | Falta | Hay descripción |
| Punto de partida (facturación, pedidos, leads antes) | Falta | Falta | "Actividad casi nula" |
| Qué se hizo: 2–4 acciones o decisiones clave | Falta | Falta | Hay |
| Canales e inversión aproximada en medios | Falta | Falta | Falta |
| Métrica final y cómo se mide (Shopify, GA4, CRM…) | Hay cifra | Hay cifra | Falta (pedidos/mes) |
| Cita del cliente con nombre y cargo | Falta | Falta | Falta |
| Captura o imagen del proyecto | Falta | Falta | Falta |

## 4. Sobre mí / LinkedIn

LinkedIn no fue accesible desde el entorno de desarrollo. Del perfil público solo se obtuvo:
*Digital Marketing Strategist*, **STIMULO Design Barcelona**, **Tecnocampus**, Palafolls.

- [ ] Rol y periodo en STIMULO Design Barcelona (y cómo quieres contarlo)
- [ ] Titulación y año en Tecnocampus
- [ ] Otras etapas relevantes de tu trayectoria
- [ ] 2–3 publicaciones de LinkedIn con pensamiento propio (enlace)
- [ ] 1–3 recomendaciones de LinkedIn que se puedan citar
- [ ] Actualizar el titular de LinkedIn a "Growth Partner" para que coincida con la web

## 5. Configuración

| Qué | Dónde | Estado |
|---|---|---|
| Dominio definitivo | `src/config/site.ts` → `url` | Supuesto: `victorchifoni.com` |
| Email público | `src/config/site.ts` → `email` | Supuesto: `hola@victorchifoni.com` |
| Endpoint del formulario (Formspree, Basin, Web3Forms…) | Variable `PUBLIC_FORM_ENDPOINT` | Sin configurar → el formulario abre el correo con los datos |
| Enlace de agenda (Cal.com / Calendly) | `src/config/site.ts` → `bookingUrl` | Opcional |
| URL de la web anterior | — | Para mapear redirecciones 301 |

## 6. Decisiones de negocio a validar

- Rangos de facturación e inversión del formulario (`src/components/ContactForm.astro`).
  ¿Hay un mínimo por debajo del cual no tiene sentido hablar? Si lo hay, conviene decirlo en el FAQ.
- FAQ "¿Cuánto cuesta?": ¿quieres dar una referencia (p. ej. "proyectos desde X €/mes")? Filtra mejor.
