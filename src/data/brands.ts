/**
 * Marcas con las que Victor ha trabajado (tira de logos y logos de los casos).
 *
 * Logos: coloca el archivo en src/assets/logos/<slug>.(svg|png|webp|jpg).
 * Mientras no exista, se muestra el nombre en tipografía (nunca un logo imitado).
 * Antes de publicar, confirmar permiso de cada marca (docs/02-pendiente.md).
 */
export type Brand = {
  slug: string;
  name: string;
  sector: string;
  /** Slug del caso en src/data/cases.ts, si tiene caso publicado. */
  caseSlug?: string;
};

export const BRANDS: Brand[] = [
  { slug: 'tr-muebles', name: 'TR Muebles', sector: 'Mobiliario' },
  { slug: 'the-colchon-company', name: 'The Colchón Company', sector: 'Descanso', caseSlug: 'the-colchon-company' },
  { slug: 'farmacia-gambin', name: 'Farmacia Gambín', sector: 'Farmacia', caseSlug: 'farmacia-gambin' },
  { slug: 'beanywood', name: 'Beanywood', sector: 'Café' },
  { slug: '3rgonomics', name: '3rgonomics', sector: 'Accesorios gaming' },
];

export const brandForCase = (caseSlug: string) => BRANDS.find((b) => b.caseSlug === caseSlug);
