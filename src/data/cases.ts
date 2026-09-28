/**
 * Casos de crecimiento.
 *
 * Reglas (brief §21):
 * - Solo cifras facilitadas por Victor. Nada inventado.
 * - `publish: false` oculta el caso en toda la web hasta tener permiso/verificación.
 * - Los campos `pending` enumeran lo que falta; se muestran como marcas visibles
 *   de "pendiente" para que nadie publique un caso incompleto sin darse cuenta.
 */

export type Metric = {
  /** Valor numérico para el contador animado. */
  value?: number;
  prefix?: string;
  suffix?: string;
  /** Texto alternativo cuando la métrica no es numérica. */
  display?: string;
  label: string;
};

export type Case = {
  slug: string;
  client: string;
  sector: string;
  publish: boolean;
  /** H1 del caso (incluye el resultado). */
  title: string;
  /** Frase de una línea para tarjetas (no repite la cifra). */
  headline: string;
  summary: string;
  metric: Metric;
  period?: string;
  role?: string;
  areas: string[];
  context: string[];
  challenge: string[];
  approach: { title: string; body: string }[];
  result: string[];
  lesson?: string;
  pending: string[];
};

export const CASES: Case[] = [
  {
    slug: 'confor-de-inmuebles',
    client: 'Confor de Inmuebles',
    sector: 'Mobiliario · E-commerce',
    publish: true,
    title: 'Más de 300.000 € de facturación online en mobiliario.',
    headline: 'Vender mobiliario online, donde la confianza decide cada compra.',
    summary:
      'E-commerce de mobiliario, un producto de ticket medio-alto donde la decisión de compra es lenta y la confianza lo es todo.',
    metric: { value: 300000, prefix: '+', suffix: ' €', label: 'facturación durante el trabajo realizado' },
    areas: ['E-commerce', 'Mobiliario'],
    context: [
      'El mobiliario es una categoría exigente para vender online: tickets altos, comparación constante con la competencia y compradores que necesitan seguridad antes de pagar.',
    ],
    challenge: [
      'Convertir tráfico en pedidos rentables en una categoría donde el cliente compara mucho y tarda en decidir.',
    ],
    approach: [],
    result: ['Más de 300.000 € de facturación durante el periodo de trabajo.'],
    pending: [
      'Qué se hizo exactamente (acciones y decisiones clave)',
      'Periodo exacto del trabajo',
      'Papel exacto de Victor (qué hizo él, qué hizo el cliente, qué hicieron otros proveedores)',
      'Punto de partida (facturación o pedidos antes)',
      'Canales activados e inversión aproximada en medios',
      'Permiso del cliente para publicar nombre y cifra',
    ],
  },
  {
    slug: 'the-colchon-company',
    client: 'The Colchón Company',
    sector: 'Descanso · Venta online de sofás',
    publish: true,
    title: 'Más de 100.000 € en unos seis meses vendiendo sofás online.',
    headline: 'Captación de leads y venta online de un producto que se quiere ver antes de comprar.',
    summary:
      'Captación de leads y venta online de sofás: un producto que el cliente quiere ver, tocar y comparar antes de comprar.',
    metric: { value: 100000, prefix: '+', suffix: ' €', label: 'facturados en aproximadamente 6 meses' },
    period: 'Aproximadamente 6 meses',
    areas: ['Captación de leads', 'Adquisición', 'Venta online'],
    context: [
      'El sofá es una compra meditada. Buena parte de los clientes necesita hablar con alguien antes de decidir, así que el lead es tan importante como la venta directa.',
    ],
    challenge: [
      'Generar oportunidades de venta cualificadas y convertirlas, combinando venta online directa y captación de leads.',
    ],
    approach: [],
    result: ['Más de 100.000 € facturados en aproximadamente seis meses.'],
    pending: [
      'Qué se hizo exactamente en captación y en venta online',
      'Fechas exactas del periodo',
      'Papel exacto de Victor',
      'Número de leads y tasa de conversión de lead a venta',
      'Canales utilizados e inversión aproximada',
      'Permiso del cliente para publicar nombre y cifra',
    ],
  },
  {
    slug: 'farmacia-gambin',
    client: 'Farmacia Gambín',
    sector: 'Farmacia · Salud y bienestar',
    publish: true,
    title: 'Reactivar un e-commerce parado sin detener el negocio.',
    headline: 'Reconstruir la tienda sobre lo que ya existía, mientras la farmacia sigue vendiendo.',
    summary:
      'Una tienda online con actividad comercial prácticamente nula. En lugar de tirarla y empezar de cero, se está reconstruyendo sobre lo que ya existía.',
    metric: { display: 'Reactivada', label: 'la tienda online vuelve a vender, sin detener el negocio' },
    role: 'Reconstrucción de la tienda, estrategia digital, SEO, publicidad y conversión.',
    areas: ['E-commerce', 'SEO', 'Publicidad', 'Conversión', 'Estrategia'],
    context: [
      'El e-commerce existía, pero apenas tenía actividad comercial online. La farmacia seguía funcionando y no podía permitirse parar el canal para rehacerlo.',
    ],
    challenge: [
      'Recuperar un canal online sin destruir la infraestructura existente y sin detener la operación diaria de la farmacia.',
    ],
    approach: [
      {
        title: 'Reconstrucción progresiva',
        body: 'La tienda se mejora por capas sobre la infraestructura actual. Cada cambio sale a producción cuando está listo, sin un gran relanzamiento que obligue a parar.',
      },
      {
        title: 'Visibilidad orgánica',
        body: 'SEO de e-commerce en un sector regulado, donde el contenido debe ser útil, preciso y responsable.',
      },
      {
        title: 'Publicidad y conversión',
        body: 'Campañas para devolver tráfico con intención de compra y mejoras en la tienda para que ese tráfico termine en pedido.',
      },
    ],
    result: ['La tienda ha vuelto a generar ventas. El trabajo continúa.'],
    lesson: 'Mejorar un negocio mientras sigue funcionando. No hace falta romperlo para hacerlo crecer.',
    pending: [
      'Periodo (fecha de inicio)',
      'Métricas antes/después (pedidos, sesiones, facturación, visibilidad orgánica)',
      'Permiso del cliente para publicar nombre y datos',
    ],
  },
  {
    slug: 'optica-muralla',
    client: 'Óptica Muralla',
    sector: 'Óptica · Salud visual',
    publish: false,
    title: 'Nueva presencia digital para una óptica.',
    headline: 'Nueva presencia digital para una óptica.',
    summary: 'Participación en el desarrollo de su nueva web y presencia digital.',
    metric: { display: 'Nueva web', label: 'presencia digital' },
    areas: ['Desarrollo web', 'Conversión'],
    context: [],
    challenge: [],
    approach: [],
    result: [],
    pending: ['Confirmar que el proyecto puede mostrarse públicamente', 'Alcance del trabajo y resultados'],
  },
];

/**
 * Proyectos con creadores (Willyrex, Staxx, Lolito, Beanywood Café, Ergonomics…).
 * Ocultos hasta verificar exactamente qué se puede afirmar (brief §6).
 * No se muestran logos ni nombres para no insinuar endorsements inexistentes.
 */
export const CREATOR_PROJECTS = {
  publish: false,
  pending: [
    'Lista exacta de marcas/proyectos y relación contractual (¿cliente directo, agencia intermedia, colaboración?)',
    'Papel de Victor en cada uno',
    'Permiso para mencionarlos',
  ],
};

export const publishedCases = () => CASES.filter((c) => c.publish);
export const getCase = (slug: string) => CASES.find((c) => c.slug === slug && c.publish);
