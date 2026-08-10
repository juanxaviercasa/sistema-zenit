export interface Subtema {
  slug: string;
  titulo: string;
}

export interface Tema {
  numero: number;
  slug: string;
  titulo: string;
  /** Aclaración opcional que amplía el título (p. ej. "incluye números complejos"). */
  nota?: string;
  subtemas: Subtema[];
}

export interface Area {
  slug: string;
  nombre: string;
  descripcion: string;
  temas: Tema[];
}

export type PruebaSlug = "matematica" | "ciencias" | "aptitud-academica";

export interface Prueba {
  slug: PruebaSlug;
  nombre: string;
  descripcion: string;
  /** false = pilar futuro, se muestra como "Próximamente" y no tiene áreas con contenido. */
  disponible: boolean;
  areas: Area[];
}
