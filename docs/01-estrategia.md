# Web personal de Victor Chifoni — Estrategia previa a la implementación

> Documento de trabajo. Responde a los puntos 1–14 del brief antes de escribir código.
> Todo lo que depende de información que aún no tenemos está marcado como **[PENDIENTE]** y
> consolidado en [`02-pendiente.md`](./02-pendiente.md).

---

## 1. Auditoría de la web actual

**Estado encontrado:** el repositorio `Web-propia` estaba vacío y no se ha facilitado la URL de la web
actual. No hay nada que auditar técnicamente, así que la reconstrucción parte de cero.

**Qué conservar de cualquier versión anterior (cuando la tengamos):**

- URLs con tráfico o enlaces entrantes → redirecciones 301 hacia la nueva arquitectura.
- Fotografías profesionales de Victor.
- Textos con opiniones propias (no los descriptivos de servicios).

**[PENDIENTE]** URL de la web actual para mapear redirecciones.

## 2. LinkedIn y materiales

`linkedin.com/in/victorchifoni` está bloqueado por el proxy de red de este entorno. Solo es posible
leer el snippet público indexado:

| Dato público | Uso en la web |
|---|---|
| Titular: *Digital Marketing Strategist* | Se reencuadra como **Growth Partner** (el titular de LinkedIn debería actualizarse para coincidir) |
| Experiencia en **STIMULO Design Barcelona** | Sobre mí → trayectoria (a confirmar redacción y periodo) |
| Formación en **Tecnocampus** | Sobre mí → trayectoria (a confirmar titulación) |
| Ubicación: Palafolls (Barcelona) | "Con base en Barcelona. Trabajo con empresas de toda España." |

No se ha inventado nada más. Trayectoria detallada, fechas, fotografía y posts destacados quedan
como **[PENDIENTE]**: la sección "Sobre mí" está construida para recibirlos sin rediseñar.

## 3. Qué merece conservarse / qué se descarta

- **Se conserva:** el nombre como marca, LinkedIn como prueba de autoridad, los casos reales facilitados.
- **Se descarta:** cualquier lista plana de servicios, cualquier logo sin contexto, lenguaje de agencia,
  cifras sin periodo y papel definidos.

## 4. Referentes — patrones de calidad (no copiar)

Análisis basado en patrones conocidos de producto/consultoría premium, no en una navegación
exhaustiva hecha en esta sesión.

| Referente (tipo) | Patrón que aporta calidad | Cómo lo traducimos |
|---|---|---|
| SaaS de producto (Linear, Vercel, Stripe) | Tipografía enorme, muy poco color, la interfaz *es* la ilustración | Diagramas y mini-dashboards en lugar de imágenes stock |
| Consultores growth independientes (p. ej. perfiles tipo Elena Verna, Demand Curve, Marketing Examples) | La persona es la marca; opinión clara; casos con números y contexto | Hero con cara + una tesis; casos con "mi papel" explícito |
| Estudios premium (Instrument, Basic/Dept, Locomotive) | Ritmo de scroll, secciones con respiración, detalles de interacción | Reveals discretos, sección sticky en metodología, microinteracciones |
| Webs de IA empresarial serias | Explican *flujos*, no "magia" | Diagrama de workflow animado con pasos reales de negocio |

**Anti-patrones detectados** en webs de agencias y freelancers: grids de iconos de servicios, "+10 años
de experiencia", logos de clientes sin explicación, degradados morados para "IA", testimonios genéricos.

## 5. Sitemap

```
/                        Home (storytelling)
/casos                   Casos de crecimiento
/casos/[proyecto]        Case study individual
/capacidades             El sistema de crecimiento (capacidades agrupadas)
/ia-automatizacion       IA y automatización aplicada a la operación
/sobre-mi                Victor Chifoni
/contacto                Formulario cualificado + contacto directo
/insights                Análisis (preparado para SEO, con estado vacío digno)
/insights/[articulo]     Artículo
/gracias                 Confirmación de envío (fallback sin JS)
/404                     Página no encontrada
```

Se elige **/capacidades** frente a /servicios: "servicios" empuja a vender piezas sueltas;
"capacidades" encaja con "primero entiendo, después construimos lo necesario".

## 6. Wireframe de la home

```
┌──────────────────────────────────────────────────────────────┐
│ VC  Victor Chifoni           Casos Capacidades IA Sobre mí [Cuéntame tu negocio] │
├──────────────────────────────────────────────────────────────┤
│ 01 HERO                                                      │
│ Growth Partner · Barcelona                     ┌───────────┐ │
│ Me incorporo a tu empresa                      │  FOTO     │ │
│ para que genere más negocio.                   │  Victor   │ │
│ subtítulo (para quién + cómo)                  │ ┌───────┐ │ │
│ [Cuéntame tu negocio]  Ver resultados →        │ │sistema│ │ │
│                                                └─┴───────┴─┘ │
├──────────────────────────────────────────────────────────────┤
│ 02 PRUEBA   +300.000 € │ +100.000 € / ~6 m │ Canal reactivado │
├──────────────────────────────────────────────────────────────┤
│ 03 PROBLEMA "Probablemente no necesitas más marketing."      │
│    piezas aisladas (Ads · Web · CRM · Email · Ventas) → nadie ve el sistema │
├──────────────────────────────────────────────────────────────┤
│ 04 PROVEEDOR vs GROWTH PARTNER  (tabla comparativa)          │
├──────────────────────────────────────────────────────────────┤
│ 05 SISTEMA  [Adquisición→Conversión→Retención→Automatización→Datos→Crecimiento] │
│    nodo activo → panel con capacidades                       │
├──────────────────────────────────────────────────────────────┤
│ 06 CASOS  tarjetas grandes con métrica + contexto + mi papel │
├──────────────────────────────────────────────────────────────┤
│ 07 IA + AUTOMATIZACIÓN (sección oscura) workflow animado     │
├──────────────────────────────────────────────────────────────┤
│ 08 MÉTODO  título sticky │ 01 Entender … 05 Escalar          │
├──────────────────────────────────────────────────────────────┤
│ 09 SOBRE VICTOR  foto + historia + LinkedIn                  │
├──────────────────────────────────────────────────────────────┤
│ 10 FAQ (objeciones)                                          │
├──────────────────────────────────────────────────────────────┤
│ 11 CTA FINAL  foto + "Cuéntame cómo funciona tu negocio"     │
├──────────────────────────────────────────────────────────────┤
│ FOOTER                                                       │
└──────────────────────────────────────────────────────────────┘
```

## 7. Dirección visual

**"Modo noche"** (actualizado a petición de Victor): grafito profundo, texto marfil y un único color de
señal. Las bandas destacadas se elevan un tono sobre el fondo y un halo naranja muy sutil ilumina el hero.

| Token | Valor | Uso |
|---|---|---|
| `--paper` | `#0A0A09` | Fondo base |
| `--band` | `#111110` | Bandas destacadas |
| `--ink` | `#EDEAE3` | Texto (16,5:1 sobre fondo) |
| `--graphite` | `#9E9B92` | Texto secundario (7,1:1) |
| `--line` | `#262521` | Divisores, bordes del grid |
| `--signal` | `#FF5A26` | **Único acento.** CTA, datos clave, flujo activo (texto oscuro encima, 6,4:1) |

Reglas: el naranja señal nunca decora, siempre indica *acción* o *dato*. Nada de degradados de "IA".
La tecnología se ve en diagramas, flujos y datos monoespaciados.

## 8. Sistema tipográfico

- **Geist (variable)** — display y texto. Titulares 56–128 px, tracking negativo (−0.04em), peso 500.
- **Instrument Serif itálica** — solo para 1–2 palabras humanas por titular ("*negocio*", "*contigo*").
  Aporta la parte personal frente al tono tecnológico.
- **Geist Mono** — etiquetas, numeración de secciones, métricas, diagramas.

Escala fluida con `clamp()`: `--step--1` … `--step-6`. Autoalojadas, subconjunto latino, `font-display: swap`,
preload solo de Geist.

## 9. Tres conceptos de hero

| # | Titular | Subtítulo | Valoración |
|---|---|---|---|
| A | **No necesitas otra agencia.** Necesitas a alguien pensando en tu negocio contigo. | Growth Partner para e-commerce y empresas high-ticket. | Muy potente en diferenciación, pero define por negación; tarda más en decir *qué* hace. |
| B | **Me incorporo a tu empresa para que genere más negocio.** | Adquisición, conversión, automatización e IA trabajadas como un único sistema. Para e-commerce y empresas high-ticket que ya venden y quieren vender más. | **Elegido.** Quién (foto+nombre), qué (me incorporo), resultado (más negocio), para quién (subtítulo) en <5 s. |
| C | **Tu próximo Growth Partner.** Marketing, tecnología e IA con un único objetivo. | — | Claro para quien ya conoce el término; ambiguo para un propietario de clínica o concesionario. |

El concepto A no se pierde: se reutiliza como titular de la sección Proveedor vs Growth Partner.

## 10. Narrativa de la home

1. **Quién y qué** — "Me incorporo a tu empresa para que genere más negocio."
2. **Por qué creerme** — tres resultados con contexto, no logos.
3. **Tu problema real** — "Probablemente no necesitas más marketing." Tienes piezas; nadie mira el sistema.
4. **Mi forma de trabajar** — proveedor vs Growth Partner. Hablas conmigo, no con un account.
5. **Qué puedo construir** — el sistema de crecimiento, con las capacidades dentro.
6. **Pruebas** — casos.
7. **Hacia dónde va** — IA y automatización: "El marketing trae oportunidades. Los sistemas hacen que puedas aprovecharlas."
8. **Cómo empezamos** — Entender → Detectar → Construir → Medir → Escalar.
9. **Quién soy** — Victor, cara, historia, LinkedIn.
10. **Objeciones** — FAQ.
11. **Siguiente paso** — "Cuéntame cómo funciona tu negocio." 30 minutos.

## 11. Pruebas sociales necesarias

Prioridad por impacto en confianza de un CEO/fundador:

1. **Casos con cifra + periodo + mi papel** (tenemos cifra en 2, falta periodo y papel exacto).
2. **Testimonio con nombre y cargo** de 2–3 clientes (vídeo corto ideal). Ninguno disponible → no se muestra ninguno.
3. **Capturas reales anonimizadas** (Shopify/GA4/Ads) que respalden cifras.
4. **Permiso explícito** de cada cliente para aparecer con nombre.
5. **Proyectos con creadores**: solo con descripción exacta del papel y permiso. Oculto hasta verificar.
6. LinkedIn: recomendaciones destacadas y 2–3 posts con pensamiento propio.

## 12. Información que falta para buenos case studies

Por cada caso: periodo exacto · papel exacto (qué hice yo / qué hizo el cliente / qué hicieron otros) ·
punto de partida (facturación, pedidos, CPL…) · canales activados · inversión en medios (rango) ·
métrica final y cómo se mide · decisión clave que cambió el resultado · permiso de publicación ·
imagen del proyecto · cita del cliente. Detalle en `02-pendiente.md`.

## 13. Animaciones e interacciones

Todas comunican algo; todas se desactivan con `prefers-reduced-motion`.

| Interacción | Qué comunica |
|---|---|
| Reveal de titulares por líneas | Ritmo de lectura; jerarquía |
| Contadores en cifras de casos | Que hay datos reales detrás (solo cifras verificadas) |
| Piezas aisladas → se conectan (Problema) | El valor está en la conexión, no en las piezas |
| Sistema de crecimiento: pulso recorriendo nodos + nodo seleccionable | El crecimiento es un flujo; cada capacidad tiene su lugar |
| Workflow IA: pasos que se activan en secuencia | Qué hace realmente la IA dentro de una empresa |
| Metodología con título sticky y barra de progreso | Proceso ordenado y con principio/fin |
| Hover en tarjetas de caso (métrica sube, flecha avanza) | Invitación a profundizar |
| Estados de formulario (validación inline, envío, éxito, error) | Cuidado y fiabilidad |

Descartado: cursor personalizado (reduce usabilidad), parallax pesado, partículas, WebGL.

## 14. Arquitectura técnica

- **Astro** (salida estática): HTML sin JS por defecto → Core Web Vitals excelentes. Un único script
  pequeño en vanilla TS para interacciones (IntersectionObserver, sin librerías de animación).
- **CSS propio con tokens** (sin framework): control total del sistema visual y peso mínimo.
- **Datos de casos** tipados en `src/data/cases.ts` con flags `publish` y marcas de pendiente.
- **Insights** como colección de contenido Markdown (`src/content/insights`), con esquema validado.
- **SEO**: componente `Seo` (title, description, canonical, OG, Twitter), JSON-LD por página
  (`Person`, `ProfessionalService`, `WebSite`, `Service`, `Article`, `BreadcrumbList`),
  `@astrojs/sitemap`, `robots.txt`, `llms.txt` para sistemas generativos.
  **No se usa `FAQPage`**: desde 2023 Google limita ese resultado enriquecido a sitios gubernamentales
  y sanitarios; el FAQ se marca con HTML semántico (`details/summary`), legible para buscadores y LLMs.
- **Formulario**: HTML válido sin JS (POST a endpoint configurable, p. ej. Formspree), mejorado con JS
  (validación, estados, envío asíncrono). Sin endpoint configurado, cae a `mailto:` con los datos rellenados.
- **Fuentes** autoalojadas vía Fontsource. **Imágenes** con `astro:assets` (AVIF/WebP, tamaños responsivos)
  cuando lleguen las fotografías.
- **QA**: `astro check`, build, script de detección de placeholders, capturas con Playwright en 390/768/1440 px.
