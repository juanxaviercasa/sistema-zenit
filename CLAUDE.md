@AGENTS.md

# CLAUDE.md — Sistema Zenit

Antes de trabajar en contenido matemático, lee `PROJECT_BRIEF.md` (visión, roadmap por
fases, molde pedagógico) y `CONTENT_PROGRESS.md` (qué está hecho, qué sigue).

## Qué es esto

Plataforma de preparación para el examen de admisión a la UNI. Empieza y se concentra
en **Matemática**; Ciencias y Aptitud Académica son pilares futuros — existen como rutas
y estructura de datos vacía, sin contenido inventado.

## Stack

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 · MDX (`@next/mdx`) + KaTeX
(`remark-math` / `rehype-katex`) para notación matemática · JSXGraph para visualización
interactiva 2D. Sin backend todavía (Supabase llega en la Fase 6 del `PROJECT_BRIEF.md`).

Tailwind v4 usa config por CSS: los tokens de diseño (paleta, tipografía) están en
`app/globals.css` bajo `@theme inline`, no en un `tailwind.config.js`.

## Jerarquía de 4 niveles

```
prueba (matematica | ciencias | aptitud-academica)
 └── área        (solo matemática tiene áreas con contenido: aritmética, álgebra, geometría, trigonometría)
      └── tema    (los 51 de docs/temario-oficial.txt)
           └── subtema  (el molde pedagógico de PROJECT_BRIEF.md §5)
```

- Datos: `lib/curriculum/` — `types.ts` (interfaces), `matematica.ts` (los 4 áreas y 51
  temas), `index.ts` (junta las 3 pruebas + funciones `getPrueba`/`getArea`/`getTema`/`getSubtema`).
  **Esta es la fuente de verdad de la navegación.** Un tema sin entradas en su array
  `subtemas` se muestra como "Contenido en desarrollo" — no como error.
- Rutas: `app/matematica/[area]/[tema]/[subtema]/page.tsx` importa dinámicamente el
  `.mdx` correspondiente. Un subtema solo es visitable cuando existe **a la vez**:
  1. su entrada en `lib/curriculum/matematica.ts` (dentro del array `subtemas` del tema), y
  2. su archivo en `content/matematica/<area>/<tema>/<subtema>.mdx`.

## Cómo añadir un subtema nuevo

1. Lee el tema exacto en `docs/temario-oficial.txt` (nunca de memoria — el contenido
   debe reflejar lo que pide la UNI, no una versión genérica).
2. Añade la entrada `{ slug, titulo }` al array `subtemas` del tema en
   `lib/curriculum/matematica.ts`.
3. Crea `content/matematica/<area>/<tema>/<subtema>.mdx` siguiendo el molde pedagógico
   de `PROJECT_BRIEF.md` §5 (objetivo, marco teórico, visualización interactiva,
   ejemplos resueltos, problemas propuestos, autoevaluación, errores frecuentes, conexiones).
   Usa `##` para cada sección del molde — el mapeo de estilos vive en `mdx-components.tsx`.
4. Fórmulas: LaTeX inline `$...$` y en bloque `$$...$$` (KaTeX vía remark-math/rehype-katex).
5. Visualización interactiva: componente cliente en `components/interactive/`, envuelto
   con `JSXGraphBoard` (`components/interactive/jsxgraph-board.tsx`) para 2D. Nunca un
   placeholder estático — tiene que ser manipulable.
6. Actualiza `CONTENT_PROGRESS.md` marcando el subtema/tema.

## Componentes interactivos

Nombrado descriptivo en español, terminado en lo que hacen — no genérico:
`components/interactive/punto-arrastrable-demo.tsx`, no `Widget1.tsx`. Un componente por
visualización; si dos subtemas comparten una construcción real (p. ej. "triángulo con
vértices arrastrables"), factoriza a un componente reusado por ambos en vez de duplicar.

## UI base

`components/ui/` — `Button`/`LinkButton`, `Card`/`CardLink`, `Badge`, `Container`. Reutilízalos
en vez de escribir clases de Tailwind sueltas para botones/tarjetas nuevos. Paleta:
`navy-*` (azul noche, marca/headers), `gold-*` (dorado, acento de logro/CTA), `surface`/
`background`/`border`/`foreground` (contenido), `success`/`warning`/`danger`/`info`
(semántico: dificultad, feedback de quiz). Tipografía: `font-serif` (Fraunces, títulos),
`font-sans` (Inter, cuerpo), `font-mono` (código/valores numéricos).

## Convenciones de commits

Un commit por subtema o tema completado, mensaje descriptivo en español, p. ej.:
`content(geometria): añade subtema "congruencia de triángulos"`. No mezclar contenido
matemático con cambios de infraestructura en el mismo commit.
