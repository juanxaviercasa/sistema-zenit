import { areasMatematica } from "./matematica";
import type { Area, Prueba, Tema } from "./types";

export type { Area, Prueba, Subtema, Tema, PruebaSlug } from "./types";

export const pruebas: Prueba[] = [
  {
    slug: "matematica",
    nombre: "Matemática",
    descripcion:
      "Aritmética, Álgebra, Geometría y Trigonometría — las 4 áreas del temario oficial UNI, con teoría, visualización interactiva y práctica de nivel de examen.",
    disponible: true,
    areas: areasMatematica,
  },
  {
    slug: "ciencias",
    nombre: "Ciencias",
    descripcion: "Física, Química y Biología del temario de admisión UNI.",
    disponible: false,
    areas: [],
  },
  {
    slug: "aptitud-academica",
    nombre: "Aptitud Académica",
    descripcion: "Razonamiento verbal y razonamiento matemático-abstracto.",
    disponible: false,
    areas: [],
  },
];

export function getPrueba(slug: string) {
  return pruebas.find((p) => p.slug === slug);
}

export function getArea(pruebaSlug: string, areaSlug: string) {
  const prueba = getPrueba(pruebaSlug);
  return prueba?.areas.find((a) => a.slug === areaSlug);
}

export function getTema(pruebaSlug: string, areaSlug: string, temaSlug: string) {
  const area = getArea(pruebaSlug, areaSlug);
  return area?.temas.find((t) => t.slug === temaSlug);
}

export function getSubtema(
  pruebaSlug: string,
  areaSlug: string,
  temaSlug: string,
  subtemaSlug: string
) {
  const tema = getTema(pruebaSlug, areaSlug, temaSlug);
  return tema?.subtemas.find((s) => s.slug === subtemaSlug);
}

export function countTemas(area: Area): number {
  return area.temas.length;
}

export function countSubtemasCompletos(tema: Tema): number {
  return tema.subtemas.length;
}
